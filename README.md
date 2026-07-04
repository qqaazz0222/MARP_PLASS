# MARP_PLASS

DGU PLASS 연구실 발표 슬라이드용 Marp 템플릿.

## 구조

```
.
├── template.md       # 슬라이드 소스
├── themes/plass.css  # 커스텀 Marp 테마
├── assets/           # 로고, 배경 이미지
└── package.json
```

## 설치

```bash
npm install
```

## 사용법

```bash
npm run watch       # template.md 변경 감지 후 재빌드
npm run dev          # 미리보기 서버 실행
npm run server       # 현재 디렉토리를 Marp 서버로 실행
npm run build:html   # dist/template.html 생성
npm run build:pdf    # dist/template.pdf 생성
```

## 테마

`theme: plass` 로 `themes/plass.css` 적용. 슬라이드별 클래스:

- `lead` — 표지, 마무리 슬라이드
- `toc` — 목차 슬라이드
- `content` — 본문 슬라이드
