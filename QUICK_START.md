# 빠른 시작 가이드 (GitHub + Vercel)

가장 빠르게 배포하는 방법을 3단계로 정리했습니다.

## ⚡ 3단계로 배포하기

### 1️⃣ GitHub에 코드 업로드

```bash
# 프로젝트 폴더에서 실행
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/사용자명/저장소이름.git
git branch -M main
git push -u origin main
```

**GitHub 저장소 생성:**
- https://github.com/new 접속
- Repository name 입력
- Public 선택
- Create repository 클릭

### 2️⃣ Vercel에 배포

1. https://vercel.com 접속
2. "Sign Up" → "Continue with GitHub"
3. "Add New Project" 클릭
4. 저장소 선택 → "Import"
5. "Deploy" 클릭

### 3️⃣ 완료! 🎉

몇 분 후 배포 완료! URL로 접속 가능합니다.

---

**더 자세한 설명이 필요하신가요?**
→ [GITHUB_DEPLOY_GUIDE.md](./GITHUB_DEPLOY_GUIDE.md) 파일을 참고하세요!
