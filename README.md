# MINI-SNS 📝  
### _미니 SNS 프로젝트_

이 프로젝트는 최신 기술 스택을 실험하기 위해 제작된 작은 CRUD 프로젝트입니다.  
실무에서 사용하지 않는 기술들을 직접 적용해보며, 추후 실무 프로젝트 도입 여부를 판단하고 가이드를 얻기 위한 목적을 가지고 있습니다.  
이 프로젝트는 vercel을 통해 아래의 링크에 배포되었습니다.  

https://login-beta-roan.vercel.app/

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

---

## 💡 배운 점 & 기술적 인사이트 (Learnings & Insights)

🔹 서버 액션: 빠르고 간편하지만, 클라이언트와 서버 코드가 혼재되어 큰 규모 프로젝트에는 비효율적일 수 있음.  
🔹 next_cache: Next.js의 강력한 캐싱 기능은 프론트에서 자체적으로 수행 가능하며, 백엔드와 분리된 전략 수립이 매력적이지만 러닝커브 존재.  
🔹 서버 컴포넌트: 리액트 훅 사용 불가, 서버에서 HTML을 생성해 클라이언트로 전달하며 성능 최적화에 유리. 클라이언트 컴포넌트 내 사용 시 제한 사항 존재.  
🔹 프리즈마: Node.js에서 강력한 DB 추상화 제공, 소규모 풀스택 앱에 적합하지만 보안 고려 필요.  
🔹 useOptimistic: 리액트 19 이상에서 정식 지원, 서버 응답이 느릴 때 UX 개선에 효과적.  

---

## 🔧 향후 개선점 (Improvements)

🚧 좋아요 클릭 문제  
좋아요를 빠르게 연속 클릭하면 표기된 숫자가 비정상적으로 변경되는 문제 발생  
상태 동기화 및 디바운싱 적용 필요  

🚧 리스트 플레이스홀더 처리 부족  
데이터 로딩 중 플레이스홀더 UI가 없어 사용자 경험이 좋지 않음  
Skeleton UI 추가 고려  

🚧 코드 정리 필요  
빠르게 개발하면서 일부 코드가 정리되지 않았지만 소기의 프로젝트 목적은 달성했기에 추가작업은 안 할 예정  