# MARP_PLASS

DGU PLASS 연구실 발표 슬라이드용 Marp 템플릿.

## 구조

```
.
├── template.md            # 슬라이드 소스
├── themes/plass.css       # 커스텀 Marp 테마
├── assets/                # 로고, 배경 이미지
├── engine.js              # 각주 문법 지원용 커스텀 Marp 엔진
├── .marprc.yml            # Marp CLI 설정 (엔진, 테마 경로)
├── scripts/build_pptx.py  # template.md 구성을 .pptx로 포팅하는 스크립트
├── requirements.txt        # build_pptx.py 의존성
└── package.json
```

## 설치

```bash
npm install
pip install -r requirements.txt   # pptx 빌드 시에만 필요
```

## 사용법

```bash
npm run watch       # template.md 변경 감지 후 재빌드
npm run dev          # 미리보기 서버 실행
npm run server       # 현재 디렉토리를 Marp 서버로 실행
npm run build:html   # dist/template.html 생성
npm run build:pdf    # dist/template.pdf 생성
npm run build:pptx   # dist/template.pptx 생성 (python-pptx 포팅본)
```

## 테마

`theme: plass` 로 `themes/plass.css` 적용. 슬라이드별 클래스:

- `lead` — 표지, 마무리 슬라이드
- `toc` — 목차 슬라이드
- `content-col1` / `content-col2` / `content-col3` / `content-col4` — 본문 슬라이드 (리스트 1~4단)
- `content-img1` / `content-img2` / `content-img3` / `content-img4` — 본문 + 이미지 슬라이드 (이미지 1~4단)
- `content-table` — 본문 + 표 슬라이드
- `invert` — 다크 배경 보조 클래스

## 각주

슬라이드 아무 곳에 다음처럼 한 줄 추가하면 슬라이드 하단에 각주로 렌더링됨 (일반 마크다운 뷰어에서는 숨겨진 링크 참조로 처리되어 보이지 않음):

```markdown
[//]: # "각주 내용"
```

## pptx 포팅

`scripts/build_pptx.py` 는 `template.md`/`plass.css` 레이아웃을 python-pptx 코드로 근사 재현한 것. CSS의 flex/grid 레이아웃을 pptx 절대 좌표로 변환한 것이라 Marp 출력과 픽셀 단위로 동일하진 않음. 새 슬라이드가 필요하면 `scripts/build_pptx.py`의 `add_content_slide` / `add_image_slide` / `add_table_slide` / `add_lead_slide` / `add_toc_slide` 헬퍼를 이용해 `build_demo()`를 수정.
