# GitHub 연동을 통한 Vercel 배포 가이드 (상세 버전)

이 가이드는 GitHub와 Vercel을 연동하여 프로젝트를 무료로 배포하는 전체 과정을 단계별로 설명합니다.

---

## 📋 전체 과정 요약

1. GitHub 계정 생성 (없는 경우)
2. GitHub에 저장소(Repository) 생성
3. 로컬 프로젝트를 GitHub에 업로드
4. Vercel 계정 생성 및 GitHub 연동
5. Vercel에서 프로젝트 배포
6. 배포 완료 및 확인

---

## 1단계: GitHub 계정 준비

### 1-1. GitHub 계정이 있는 경우
- 다음 단계로 진행하세요.

### 1-2. GitHub 계정이 없는 경우
1. https://github.com 접속
2. 우측 상단 "Sign up" 클릭
3. 이메일, 비밀번호, 사용자명 입력
4. 이메일 인증 완료
5. 계정 생성 완료

---

## 2단계: GitHub에 저장소(Repository) 생성

### 2-1. 새 저장소 만들기
1. GitHub에 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository" 선택
   (또는 https://github.com/new 직접 접속)

### 2-2. 저장소 설정
- **Repository name**: 원하는 이름 입력 (예: `gwangju-restaurants`)
- **Description**: 설명 입력 (선택사항, 예: "광주광역시 서구 음식점 추천 앱")
- **Public / Private**: 
  - **Public** 선택 (무료로 사용 가능)
  - Private도 가능하지만 Vercel 무료 플랜과 연동 가능
- **README, .gitignore, license**: 
  - ❌ **체크하지 않기** (이미 프로젝트에 파일들이 있으므로)
- **"Create repository" 버튼** 클릭

### 2-3. 저장소 생성 완료
- 빈 저장소 페이지가 나타납니다.
- 다음 단계를 위한 URL을 복사해두세요 (예: `https://github.com/사용자명/gwangju-restaurants.git`)

---

## 3단계: 로컬 프로젝트를 GitHub에 업로드

### 3-1. Git 설치 확인
터미널(명령 프롬프트 또는 PowerShell)에서 확인:

```bash
git --version
```

**Git이 설치되어 있지 않은 경우:**
- Windows: https://git-scm.com/download/win 에서 다운로드
- 설치 후 터미널 재시작

### 3-2. 프로젝트 디렉토리로 이동
프로젝트 폴더에서 터미널을 열거나, 다음 명령어로 이동:

```bash
cd "F:\상기관련\AI관련\251225_(서적)CursorAI_30가지프로그램만들기(박현규 저)\20_Recommended_Restaurant_List_by_API"
```

### 3-3. Git 저장소 초기화 (처음인 경우)
프로젝트에 Git이 초기화되어 있지 않은 경우:

```bash
git init
```

### 3-4. 모든 파일 추가
```bash
git add .
```

### 3-5. 첫 커밋 (Commit) 생성
```bash
git commit -m "Initial commit: 광주 서구 음식점 추천 앱"
```

**커밋이 실패하는 경우 (이름/이메일 설정 필요):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
그 후 다시 `git commit` 실행

### 3-6. GitHub 저장소 연결
GitHub에서 생성한 저장소 URL을 사용:

```bash
git remote add origin https://github.com/사용자명/저장소이름.git
```

**예시:**
```bash
git remote add origin https://github.com/yourusername/gwangju-restaurants.git
```

### 3-7. GitHub에 코드 업로드 (Push)
```bash
git branch -M main
git push -u origin main
```

**GitHub 인증:**
- 사용자명과 비밀번호(또는 Personal Access Token) 입력 요청
- **Personal Access Token 사용 권장** (2021년 8월부터 비밀번호 인증 불가)
  - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - "Generate new token" 클릭
  - Note: "Vercel Deployment" 등 설명 입력
  - Expiration: 원하는 기간 선택
  - Scopes: `repo` 체크
  - "Generate token" 클릭
  - **토큰 복사** (한 번만 보여줌!)
  - 비밀번호 대신 이 토큰 사용

### 3-8. 업로드 확인
1. GitHub 저장소 페이지 새로고침
2. 모든 파일이 표시되는지 확인
3. 완료! ✅

---

## 4단계: Vercel 계정 생성 및 GitHub 연동

### 4-1. Vercel 접속
https://vercel.com 접속

### 4-2. 계정 생성/로그인
1. 우측 상단 "Sign Up" 또는 "Log In" 클릭
2. **"Continue with GitHub"** 선택 (GitHub 계정으로 로그인)
3. GitHub 로그인 페이지로 리디렉션
4. GitHub 계정 정보 입력 및 로그인
5. "Authorize Vercel" 버튼 클릭 (Vercel이 GitHub에 접근 허용)
6. Vercel 대시보드로 이동

---

## 5단계: Vercel에서 프로젝트 배포

### 5-1. 새 프로젝트 추가
1. Vercel 대시보드에서 **"Add New..."** 또는 **"New Project"** 버튼 클릭
2. GitHub 저장소 목록이 표시됨

### 5-2. 저장소 선택
1. 방금 업로드한 저장소 찾기
2. 저장소 이름 옆의 **"Import"** 버튼 클릭

### 5-3. 프로젝트 설정
프로젝트 설정 페이지가 나타납니다:

**Project Name:**
- 자동으로 저장소 이름이 입력됨
- 원하면 변경 가능

**Framework Preset:**
- 자동으로 "Vite" 감지됨 (변경 불필요)

**Root Directory:**
- "./" (기본값, 변경 불필요)

**Build Command:**
- 자동으로 `npm run build` 설정됨 (확인)

**Output Directory:**
- 자동으로 `dist` 설정됨 (확인)

**Install Command:**
- 자동으로 `npm install` 설정됨 (확인)

**Environment Variables:**
- 현재 프로젝트는 환경 변수 없이도 작동함
- 필요시 나중에 추가 가능

### 5-4. 배포 시작
1. 모든 설정 확인
2. 하단의 **"Deploy"** 버튼 클릭

### 5-5. 빌드 및 배포 진행
- 빌드 로그가 실시간으로 표시됨
- 약 1-2분 정도 소요
- 진행 상황 확인 가능:
  - Installing dependencies...
  - Building...
  - Deploying...
  - Success! ✅

---

## 6단계: 배포 완료 및 확인

### 6-1. 배포 완료
1. "Congratulations!" 메시지와 함께 배포 완료
2. 배포된 사이트 URL 확인 (예: `gwangju-restaurants.vercel.app`)

### 6-2. 사이트 확인
1. 제공된 URL 클릭하여 사이트 접속
2. 정상 작동 확인:
   - ✅ 페이지가 로드되는지
   - ✅ 음식점 데이터가 표시되는지
   - ✅ 검색 기능이 작동하는지
   - ✅ 지도 버튼이 작동하는지

### 6-3. 커스텀 도메인 (선택사항)
- Vercel 대시보드 → 프로젝트 → Settings → Domains
- 원하는 도메인 추가 가능 (무료)

---

## 🔄 자동 재배포 설정

### 기본 설정
- **이미 자동 재배포가 활성화되어 있습니다!**
- GitHub에 코드를 푸시할 때마다 자동으로 재배포됩니다.

### 재배포 테스트
1. 로컬에서 코드 수정
2. 커밋 및 푸시:
   ```bash
   git add .
   git commit -m "코드 수정 설명"
   git push
   ```
3. Vercel 대시보드에서 자동 재배포 확인
4. 몇 분 후 사이트에 반영됨

---

## 📱 배포된 사이트 공유하기

배포가 완료되면:
- URL을 복사하여 누구와도 공유 가능
- 모바일에서도 정상 작동
- 무료로 영구 사용 가능 (Vercel 무료 플랜)

---

## 🔧 문제 해결

### Git 관련 오류

**"git: command not found"**
- Git이 설치되지 않음
- https://git-scm.com/download/win 에서 설치

**"fatal: not a git repository"**
- Git 저장소가 초기화되지 않음
- `git init` 실행

**"error: failed to push"**
- Personal Access Token 사용 확인
- GitHub 저장소 URL 확인

### Vercel 배포 오류

**빌드 실패**
- Vercel 대시보드의 "Deployments" 탭에서 로그 확인
- 일반적인 원인:
  - `package.json`의 빌드 스크립트 오류
  - 의존성 설치 실패
  - 환경 변수 누락

**사이트가 작동하지 않음**
- 브라우저 콘솔(F12)에서 오류 확인
- API 키가 올바른지 확인
- CORS 오류인지 확인

**도메인 접속 불가**
- 배포가 완료될 때까지 몇 분 대기
- Vercel 대시보드에서 배포 상태 확인

---

## 💡 유용한 팁

1. **프로젝트 관리**
   - Vercel 대시보드에서 모든 배포 이력 확인 가능
   - 이전 버전으로 롤백 가능

2. **환경 변수 사용**
   - Settings → Environment Variables에서 API 키 등 관리
   - 코드에 직접 포함하지 않고 관리 가능

3. **프리뷰 배포**
   - Pull Request를 생성하면 자동으로 프리뷰 URL 생성
   - 프로덕션 배포 전 테스트 가능

4. **알림 설정**
   - Settings → Git에서 배포 알림 설정 가능

---

## ✅ 체크리스트

배포 전 확인사항:
- [ ] GitHub 계정 생성/로그인 완료
- [ ] GitHub 저장소 생성 완료
- [ ] 로컬 코드를 GitHub에 푸시 완료
- [ ] Vercel 계정 생성/로그인 완료
- [ ] Vercel에서 GitHub 저장소 Import 완료
- [ ] 배포 성공 및 사이트 접속 확인
- [ ] 모든 기능 정상 작동 확인

---

## 🎉 완료!

축하합니다! 프로젝트가 성공적으로 배포되었습니다.

이제 전 세계 누구나 접속할 수 있는 웹사이트가 되었습니다!

**배포된 사이트 URL:** `https://your-project-name.vercel.app`
