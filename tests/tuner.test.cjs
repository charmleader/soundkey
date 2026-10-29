const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the script shipped in the standalone HTML, without dependencies.
function loadTuner() {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, {
      textContent: '', className: '', style: {}, dataset: {},
      addEventListener() {}, replaceChildren() {}, append() {},
    });
    return elements.get(id);
  };
  const marker = dataset => ({dataset, attributes: {}, setAttribute(name,value) {this.attributes[name]=value;}});
  const segments = Array.from({length:13},(_,i)=>marker({segment:String(i)}));
  const pegs = Array.from({length:6},(_,i)=>marker({peg:String(i+1)}));
  const window = { addEventListener() {}, location: { href: 'https://example.test/guitar.html' } };
  window.self = window.top = window;
  const context = vm.createContext({
    window, location: { protocol: 'https:' },
    document: {
      getElementById: element, querySelectorAll: selector => selector === '[data-segment]' ? segments : selector === '[data-peg]' ? pegs : [], addEventListener() {},
      createTextNode: text => ({ textContent: text }), createElement: () => ({}),
    },
    setTimeout, clearTimeout,
  });
  const html = fs.readFileSync(path.join(__dirname, '..', 'guitar.html'), 'utf8');
  vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
  return { run: code => vm.runInContext(code, context), element, segments, pegs };
}

// Standard concert-pitch open strings, from low E2 to high E4.
const targets = [[6, 82.406889], [5, 110], [4, 146.832384],
  [3, 195.997718], [2, 246.941651], [1, 329.627557]];

for (const [number, hz] of targets) {
  test(`string ${number}: correct pitch and tighten/loosen guidance`, () => {
    const { run, element } = loadTuner();
    run(`selectString(${number}); render(${hz})`);
    assert.match(element('status').textContent, /음정이 맞아요/);
    for (const cents of [-20, 20]) {
      run(`render(${hz * 2 ** (cents / 1200)})`);
      assert.match(element('status').textContent, cents < 0 ? /조이세요/ : /푸세요/);
      assert.equal(parseInt(element('cents').textContent), cents);
    }
    run(`render(${hz * 2})`);
    assert.match(element('status').textContent, /먼저 확인/);
    assert.doesNotMatch(element('status').textContent, /조이세요|푸세요/);
  });
  test(`string ${number}: waveform detection at 44.1 and 48 kHz`, () => {
    const { run } = loadTuner();
    for (const rate of [44100, 48000]) {
      const pitch = run(`detectPitch(Float32Array.from({length:4096}, (_,i) =>
        .3*Math.sin(2*Math.PI*${hz}*i/${rate}) +
        .1*Math.sin(4*Math.PI*${hz}*i/${rate})), ${rate})`);
      assert.ok(pitch && Math.abs(1200 * Math.log2(pitch / hz)) < 3);
    }
  });
}

test('low E and high E are distinct targets; silence does not produce a note', () => {
  const { run, element } = loadTuner();
  run('selectString(6); render(329.627557)');
  assert.match(element('status').textContent, /먼저 확인/);
  run('selectString(1); render(329.627557)');
  assert.match(element('status').textContent, /음정이 맞아요/);
  assert.equal(run('detectPitch(new Float32Array(4096),48000)'), null);
});

test('segmented fan and headstock show the selected string and pitch direction', () => {
  const {run,segments,pegs}=loadTuner();
  run('selectString(2); render(246.941651)');
  assert.equal(pegs.filter(p=>p.attributes.class==='head-wire selected').length,1);
  assert.equal(pegs[1].attributes.class,'head-wire selected');
  assert.equal(segments[6].attributes.class,'fan-segment active tuned');
  run('render(246.941651 * 2 ** (-50/1200))');
  assert.equal(segments[0].attributes.class,'fan-segment active');
  run('render(246.941651 * 2 ** (50/1200))');
  assert.equal(segments[12].attributes.class,'fan-segment active');
  run('clearReading()');
  assert.ok(segments.every(s=>s.attributes.class==='fan-segment'));
});
