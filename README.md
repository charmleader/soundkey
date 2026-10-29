# Soundkey v1.2 · 제작자 참리더

## 기타 조율기 추가 버전

`guitar.html`은 부채꼴/직선 표시를 선택할 수 있는 기타 조율기입니다. `index.html`의 기존 반음계 조율기도 유지합니다. 두 페이지 모두 제작자 **참리더**를 표시합니다.

- 표준 조율: **6번 E2 – 5번 A2 – 4번 D3 – 3번 G3 – 2번 B3 – 1번 E4**.
- 줄 그림에서 직접 줄을 선택합니다. 그림의 위쪽은 굵은 6번 줄, 아래쪽은 가는 1번 줄입니다.
- 개방현을 연주하면 선택한 줄의 목표 주파수와 비교해 조이기/풀기를 안내합니다. 실제 검출된 음과 옥타브도 표시합니다.
- ±5센트는 맞는 음으로 표시합니다. 차이가 300센트를 넘으면 조이기/풀기 대신 선택한 줄을 확인하도록 안내합니다. 바늘은 ±50센트에서 끝에 머물지만 실제 차이는 숫자로 표시합니다.
- 기타마다 줄감개의 위치와 조이는 회전 방향이 다르므로 시계/반시계 방향을 고정해 안내하지 않습니다. 조금씩 조절하고 과도하게 팽팽해지면 멈추세요.
- 굵은 6번 E2와 가는 1번 E4는 다른 목표음입니다. 가장 가까운 반음에 맞추는 기존 조율기와 달리 선택한 줄을 기준으로 비교합니다.

게시 후 기타 버전 주소: https://charmleader.github.io/soundkey/guitar.html

### 티스토리 v1.2 삽입

티스토리 글의 HTML 모드에 `tistory-embed.html` 내용을 붙여넣으세요. 부모 페이지가 마이크를 차단하면 새 창 링크로 열어야 합니다. 삽입 높이는 블로그 스킨에 맞춰 조정할 수 있고, 내용이 길면 iframe 안에서 스크롤됩니다.

```html
<iframe src="https://charmleader.github.io/soundkey/guitar.html"
  title="참리더 기타 조율기 v1.2" allow="microphone"
  style="display:block;width:100%;height:1500px;border:0;border-radius:20px;"></iframe>
<p style="text-align:center;"><a href="https://charmleader.github.io/soundkey/guitar.html"
  target="_blank" rel="noopener">🎸 참리더 기타 조율기 v1.2 새 창에서 열기</a></p>
```

### v1.2 검증

별도 의존성 없이 `node --test tests/tuner.test.cjs`로 13개 회귀 테스트를 실행합니다.

Chromium에서 기타 6개 줄의 목표음과 ±20센트 조절 방향, 옥타브 오류 안내, 12개 합성 기타 파형의 음정 검출(44.1/48 kHz, 3센트 이내), 표시 전환, 마이크 켜기/끄기(가상 장치), 기존 화면 링크, 320–1280px 레이아웃을 검증했습니다. 실제 휴대폰 마이크와 티스토리 게시 환경은 별도 확인이 필요합니다.

---


휴대폰·PC 마이크를 이용한 반음계 조율기입니다. 외부 라이브러리나 서버가 필요 없는 `index.html` 하나로 작동합니다. Musicca의 코드를 복사하지 않고 Web Audio API로 구현했습니다.

- A4 = 440 Hz, 음 이름·옥타브·주파수·센트 차이 표시
- 단일 음 분석, 약 55–1600 Hz. 화음·시끄러운 환경에서는 정확도가 떨어질 수 있습니다.
- 마이크 소리를 녹음하거나 전송하지 않습니다.
- 화면을 떠나면 마이크를 해제합니다.
- 권한 요청 중에는 진행 안내와 취소 버튼을 표시하며, 늦게 허용된 요청을 취소한 경우에도 마이크를 해제합니다.
- 다운로드한 파일을 직접 열면 HTTPS 접속 안내를 표시합니다.

## 실행

배포는 HTTPS가 필요합니다. 휴대폰에서는 최신 Safari/Chrome을 사용하고 ‘마이크 켜기’를 눌러 권한을 허용하세요. 로컬 개발은 저장소 폴더에서 `python3 -m http.server 8081 --bind 127.0.0.1`로 실행합니다. localhost는 개발 목적으로 마이크를 허용하지만, 휴대폰에서 HTTP LAN IP로 접속하면 보통 허용되지 않습니다.

## GitHub Pages로 게시

`index.html`을 GitHub 저장소의 main 브랜치 루트에 올린 뒤 Settings → Pages → Deploy from a branch → main / (root)를 선택합니다. 게시 후 제공되는 HTTPS 주소로 접속하세요. GitHub 요금제에 따라 비공개 저장소의 Pages 사용이 제한될 수 있습니다.

## 티스토리

티스토리 편집기나 스킨 정책이 script/iframe을 제거하거나 마이크 권한을 제한할 수 있으므로 HTML을 본문에 붙여넣는 것만으로 작동을 보장할 수 없습니다. 먼저 HTTPS에 조율기를 게시한 다음, 글의 HTML 모드에서 아래와 같이 iframe을 삽입하세요. 주소는 실제 게시 주소로 바꿉니다.

```html
<iframe src="https://charmleader.github.io/soundkey/"
  title="소리 조율기" allow="microphone"
  style="width:100%;height:850px;border:0;border-radius:20px;"></iframe>
<p><a href="https://charmleader.github.io/soundkey/" target="_blank" rel="noopener">조율기 새 창에서 열기</a></p>
```

위 주소는 예상 주소이며 실제 게시되었다는 뜻은 아닙니다. 부모 페이지의 Permissions-Policy 또는 티스토리의 필터링이 마이크를 차단하면 iframe의 `allow`만으로 해제할 수 없습니다. 이 경우 새 창 링크를 사용하세요. 게시 후 반드시 실제 티스토리 글과 iPhone/Android에서 권한 허용·거부, 음정 표시, 마이크 끄기를 확인하세요.

## 마이크 문제 해결

1. 파일 미리보기나 file:// 주소 대신 게시된 HTTPS 주소를 Safari/Chrome에서 직접 여세요.
2. 브라우저 사이트 설정에서 마이크 권한을 허용하세요.
3. 권한 요청이 끝나지 않으면 요청 취소 후 다시 누르세요.
4. 티스토리 iframe 또는 앱 내 브라우저에서 차단되면 외부 브라우저의 새 창에서 여세요.

브라우저 권한과 부모 페이지 정책은 HTML 코드에서 강제로 해제할 수 없습니다.
