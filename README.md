 <img src="https://capsule-render.vercel.app/api?type=waving&color=0:16213E,10:0F3460,30:533483,75:5B2A86,100:E94560&height=100&section=header&text=&fontSize=0" width="100%"/>
<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=500&pause=10000&color=58A6FF&center=true&random=false&width=435&lines=NextJS-CRUD" alt="Typing SVG" />
  </a>
  <br>

  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
</div>
<br>

## Overview
- 해당 프로젝트는 복습의 목적으로 Next.js 프레임워크와 NoSQL 데이터베이스인 MongoDB를 활용하여 만든 간단한 CRUD(Create, Read, Update, Delete) 웹 사이트입니다. 서버에서 동적으로 HTML을 생성하는 SSR(Server-Side Rendering) 방식과 이를 통한 검색 엔진 최적화(SEO)의 이점을 생각해보며 제작했습니다. 
<br>

## Features
  <details>
    <summary><b>메인 페이지</b></summary>
    <br>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/d604744f-0846-49c1-a2e7-a2b54173c78a" width="45%"/>
    <br>
    <p> - 빠른 페이지 이동을 위한 네비게이션 기능</p>
    <p> - 쿠키를 활용한 Dark/Light 모드</p>
    <p> - 미들웨어를 활용하여 최초 접속시 Dark/Light 사용자 설정 감지 및 적용</p>
    <p> - 회원가입/로그인 빠른이동
    <p> - 로그인 중일 시 로그아웃 버튼
    <p> - ThreeJS를 활용해 glb모델에 마우스로 카메라 조작이 가능하도록 OrbitControls를 적용</p>
    <hr>
  </details>
  
  <details>
    <summary><b>회원가입/로그인</b></summary>
    <br>
    <p><b># 회원가입 페이지</b></p>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/2a1c97fc-5bc5-49ec-ac85-5bfa85803501" width="45%"/>
    <br>
    <p> - 아이디/비밀번호/닉네임 유효성검사
    <p> - 아이디 중복검사</p>
    <p> - Bcrypt + Salt 기능을 활용한 비밀번호 해싱</p>
    <br>
    <p><b># 로그인 페이지</b></p>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/32e2158c-5472-4fcf-b975-54ff016fc573" width="45%"/>
    <br>
    <p> - NextAuth 라이브러리를 활용한 JWT토큰 방식의 로그인기능 (개발 당시 라이브러리 Refresh-Token 버그로 Access-Token만 적용된 상태)</p>
    <p> - 일반회원, 소셜회원, Admin(슈퍼계정)으로 권한 분류</p>
    <p> - 회원가입한 일반회원 로그인기능</p>
    <p> - 다양한 소셜로그인(카카오, 네이버, 구글, 깃헙)을 통한 간편 회원가입 및 로그인기능</p>
    <p> - [회원기능]이 필요한 요청에 대해 session체크 함수를 만들어 미들웨어로 활용</p>
    <hr>
  </details>
  
  <details>
    <summary><b>게시판</b></summary>
    <br>
    <p><b># 글 리스트 페이지</b></p>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/c644437e-3486-4918-9c6c-8acba8167d1f" width="45%"/>
    <br>
    <p> - 제목, 작성자명 표시</p>
    <p> - 좋아요/싫어요 개수, 댓글 개수, 사진 업로드 개수 간단 표시</p>
    <br>
    <p><b># 글 작성/수정 페이지 [회원기능]</b></p>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/89f9371f-7ba9-49c5-92bb-16eafdc8c5ac" width="45%"/>
    <br>
    <p> - 배열을 활용한 이미지 핸들링(이미지 추가/삭제)</p>
    <p> - AWS S3를 활용한 다중 이미지 업로드</p>
    <p> - S3 Presigned URL 기능을 활용하여 클라이언트에서 S3로 직접 업로드 (서버 요청 최소화)</p>
    <br>
    <p><b># 글 내용 조회 페이지 [회원기능]</b></p>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/7d9a6f2b-2f01-45c6-8bfd-7074dcb540a4" width="45%"/>
    <br>
    <p> - 본인 또는 Admin계정 게시물 삭제/수정</p>
    <p> - 좋아요/싫어요 기능 (계정당 각 게시글에 대해 좋아요 또는 싫어요 하나만 선택 가능)</p>
    <p> - 게시글 삭제시 게시글, S3에 업로드된 사진, 좋아요/싫어요, 댓글이 모두 삭제되도록 Foreign key 기능과 유사하게 구현 (게시글ID를 활용해 연관 기능에 대해 컬렉션을 매핑함) </p>
    <br>
    <p><b># 댓글 [회원기능]</b></p>
    <img src="https://github.com/JK0201/NextJS-CRUD/assets/124655981/1f16a464-81b0-4642-8335-b3fb06372691" width="45%"/>
    <br>
    <p> - 게시글 별 간단한 댓글 기능</p>
    <hr>
  </details>
  <br>
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:16213E,10:0F3460,30:533483,75:5B2A86,100:E94560&height=40&section=footer&text=&fontSize=0" width="100%"/>
