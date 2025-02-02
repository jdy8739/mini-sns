# MINI-SNS 📝  
### _미니 SNS 프로젝트_

이 프로젝트는 최신 기술 스택을 실험하기 위해 제작된 작은 CRUD 프로젝트입니다.  
실무에서 사용하지 않는 기술들을 직접 적용해보며, 추후 실무 프로젝트 도입 여부를 판단하고 가이드를 얻기 위한 목적을 가지고 있습니다.  

---

## 🎯 **프로젝트 목표 (Goals)**  

✅ **서버 액션과 API 요청 방식의 차이 이해**  
✅ **서버 컴포넌트와 클라이언트 컴포넌트의 차이 분석**  
✅ **ORM을 활용한 프론트엔드 서버와 데이터베이스 연결**  
✅ **`next_cache`를 이용한 응답 결과 캐싱 및 최적화**  
✅ **`useOptimistic` 훅을 사용한 낙관적 업데이트 처리**  

---

## ✨ **주요 기능 (Features)**  

🔹 **회원가입 & 로그인**: 폼 검증 및 올바르지 않은 입력값에 대한 UI 처리  
🔹 **포스트 및 댓글 관리**: 생성 및 삭제 기능 지원  
🔹 **좋아요 기능**: 포스트 및 댓글에 대한 좋아요 추가/삭제  
🔹 **인가 시스템**: 쿠키 기반 인증을 활용한 삭제 권한 관리  

---

## 🛠 **기술 스택 (Tech Stack)**  

- **[Next.js](https://nextjs.org/)** - 서버 액션, DB 연결, SSR, 캐싱 지원  
- **[React](https://react.dev/)** - 클라이언트 UI 상태 관리 및 훅 사용  
- **[Prisma](https://www.prisma.io/)** - ORM을 통한 DB 연결  
- **[Iron-session](https://github.com/vvo/iron-session)** - 쿠키 기반 인증 및 인가 처리  
- **[next_cache](https://nextjs.org/docs/app/api-reference/functions/cache)** - DB 조회 결과 캐싱  
- **[Zod](https://zod.dev/)** - 폼 데이터 검증  
- **[Tailwind CSS](https://tailwindcss.com/)** - 스타일링 및 UI 구현  

---

## 🚀 **설치 및 실행 방법 (Installation & Setup)**  

이 프로젝트를 실행하려면 **Node.js 20 이상**이 필요합니다.  
아래 명령어를 실행하여 프로젝트를 로컬에서 실행할 수 있습니다.  

```sh
# 의존성 설치
npm install

# Prisma 초기화 및 마이그레이션
npx prisma init
npx prisma migrate dev

# 개발 서버 실행
npm run dev
```

## Link

이 프로젝트는 vercel을 통해 아래의 링크에 배포되었습니다.

https://login-beta-roan.vercel.app/