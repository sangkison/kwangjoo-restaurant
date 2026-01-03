# 광주광역시 서구 음식점 추천 리스트 (React 버전)

공공데이터포털 API를 활용한 음식점 정보 React 웹 애플리케이션입니다.

## 주요 기능

- React 기반의 모던한 웹 애플리케이션
- 공공데이터포털 API를 통해 광주광역시 서구 음식점 **모든 데이터**를 로딩
- 초기에는 **3열 4행 (12개)**만 표시
- **더 보기** 버튼을 클릭하면 12개씩 추가로 표시
- 반응형 웹 디자인 (데스크톱: 3열, 태블릿: 2열, 모바일: 1열)
- 현대적인 UI/UX 디자인

## 프로젝트 구조

```
├── src/
│   ├── App.jsx          # 메인 React 컴포넌트
│   ├── App.css          # App 컴포넌트 스타일
│   ├── main.jsx         # React 진입점
│   └── index.css        # 전역 스타일
├── index.html           # HTML 템플릿
├── package.json         # 프로젝트 설정 및 의존성
├── vite.config.js       # Vite 설정
└── README.md           # 프로젝트 설명
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` (또는 표시된 주소)로 접속하세요.

### 3. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 4. 빌드 미리보기

```bash
npm run preview
```

## 사용 기술

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구 및 개발 서버
- **CSS3** - 스타일링 (Grid, Flexbox, Gradient)

## API 정보

- 데이터: 광주광역시 서구 음식점 상세설명
- API Base URL: api.odcloud.kr/api
- API 엔드포인트: /3083730/v1/uddi:6b8d6f79-21df-434b-aca1-d1c4477b3835

## 주요 기능 설명

### 데이터 로딩
- 앱이 시작되면 API를 통해 모든 음식점 데이터를 로딩합니다.
- 여러 페이지에 걸쳐 데이터가 있을 경우 자동으로 모든 페이지를 순차적으로 가져옵니다.

### 표시 방식
- 초기 로딩 시 12개 (3열 × 4행)만 표시
- "더 보기" 버튼을 클릭하면 12개씩 추가로 표시
- 모든 데이터를 표시하면 "더 보기" 버튼이 사라지고 완료 메시지 표시

### 반응형 디자인
- 데스크톱 (1024px 이상): 3열 그리드
- 태블릿 (768px ~ 1024px): 2열 그리드
- 모바일 (768px 미만): 1열 그리드

## 배포하기

이 프로젝트를 무료로 배포할 수 있습니다! 자세한 배포 가이드는 [DEPLOY.md](./DEPLOY.md)를 참고하세요.

### 빠른 배포 (Vercel - 추천)

1. GitHub에 코드 업로드
2. https://vercel.com 접속
3. GitHub 계정으로 로그인
4. "Add New Project" → 저장소 선택 → "Deploy"
5. 완료! 🎉

## 참고사항

- API 키는 코드에 포함되어 있습니다. 실제 프로덕션 환경에서는 환경 변수로 관리하는 것을 권장합니다.
- CORS 정책 때문에 로컬 개발 서버를 통해 실행해야 합니다 (`npm run dev`).
- 배포 플랫폼: Vercel, Netlify, GitHub Pages 등 무료 플랫폼 사용 가능

## 기존 버전 (Vanilla JavaScript)

기존의 Vanilla JavaScript 버전 파일들:
- `index-old.html` - 기존 HTML 파일 (백업)
- `script.js` - 기존 JavaScript 파일
- `style.css` - 기존 CSS 파일