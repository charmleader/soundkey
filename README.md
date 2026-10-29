# Soundkey · 소리 조율기

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
