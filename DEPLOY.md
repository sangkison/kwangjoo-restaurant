# 프로젝트 배포 가이드

이 프로젝트를 무료로 배포하는 방법을 안내합니다.

## 🚀 추천 배포 플랫폼

### 1. Vercel (가장 추천 ⭐)

Vercel은 React 프로젝트 배포에 가장 적합하고 간단합니다.

#### 배포 방법

**방법 A: Vercel CLI 사용**

1. Vercel CLI 설치
```bash
npm install -g vercel
```

2. 프로젝트 디렉토리에서 배포
```bash
vercel
```

3. 첫 배포 시 설정
   - 프로젝트 이름 입력 (선택사항)
   - 배포 위치 선택
   - 모든 설정을 기본값으로 두면 됩니다

4. 프로덕션 배포
```bash
vercel --prod
```

**방법 B: GitHub 연동 (더 쉬움) ⭐ 추천**

자세한 단계별 가이드는 **[GITHUB_DEPLOY_GUIDE.md](./GITHUB_DEPLOY_GUIDE.md)** 파일을 참고하세요!

간단 요약:
1. GitHub에 코드 업로드
   - GitHub 저장소 생성
   - 코드 커밋 및 푸시

2. Vercel 웹사이트에서 배포
   - https://vercel.com 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 자동으로 빌드 및 배포 설정 감지
   - "Deploy" 클릭

3. 완료!
   - 배포 완료 후 URL이 생성됩니다 (예: `your-project.vercel.app`)
   - 코드를 푸시할 때마다 자동으로 재배포됩니다

---

### 2. Netlify

Netlify도 매우 간단하고 무료입니다.

#### 배포 방법

**방법 A: Netlify CLI 사용**

1. Netlify CLI 설치
```bash
npm install -g netlify-cli
```

2. 로그인
```bash
netlify login
```

3. 배포
```bash
netlify deploy
```

4. 프로덕션 배포
```bash
netlify deploy --prod
```

**방법 B: 드래그 앤 드롭**

1. 빌드 먼저 실행
```bash
npm run build
```

2. Netlify 웹사이트 접속
   - https://app.netlify.com 접속
   - "Add new site" → "Deploy manually"
   - `dist` 폴더를 드래그 앤 드롭

**방법 C: GitHub 연동**

1. GitHub에 코드 업로드
2. Netlify 웹사이트에서 GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. "Deploy site" 클릭

---

### 3. GitHub Pages

GitHub Pages는 무료이지만 설정이 조금 복잡합니다.

#### 배포 방법

1. `vite.config.js` 수정 (이미 설정되어 있음)
2. GitHub Actions 사용 (권장) 또는 `gh-pages` 패키지 사용

---

## 📝 배포 전 체크리스트

- [ ] `npm run build`가 성공적으로 실행되는지 확인
- [ ] `dist` 폴더가 생성되는지 확인
- [ ] 로컬에서 `npm run preview`로 빌드 결과 확인
- [ ] API 키가 코드에 포함되어 있는지 확인 (현재 상태로 문제없음)

## 🔧 빌드 테스트

배포 전에 로컬에서 빌드를 테스트하세요:

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🌐 배포 후 확인사항

1. 사이트가 정상적으로 로드되는지 확인
2. API 호출이 정상적으로 작동하는지 확인
3. 검색 기능이 작동하는지 확인
4. 지도 버튼이 작동하는지 확인
5. 반응형 디자인이 제대로 작동하는지 확인

## 💡 팁

- **Vercel**이 가장 간단하고 React 프로젝트에 최적화되어 있습니다
- GitHub와 연동하면 코드를 푸시할 때마다 자동으로 재배포됩니다
- 무료 플랜으로도 충분히 사용할 수 있습니다
- 커스텀 도메인도 무료로 연결 가능합니다

## ❓ 문제 해결

### CORS 오류
- 공공데이터 API는 CORS를 지원하므로 문제없습니다

### 빌드 실패
- `node_modules` 폴더 삭제 후 `npm install` 다시 실행
- Node.js 버전 확인 (v16 이상 권장)

### 배포 후 API 오류
- API 키가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인
