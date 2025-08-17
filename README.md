[ 작성 중... ]
# 📖 개발자를 위한 우리들의 리그 FORDE


<br>

## 프로젝트 소개

- 업게 선배,후배,동기들의 다양하고도 깊이 있는 꿀팁등을 공유할 수 있는 웹 사이트 입니다.
- 다양한 알고리즘 문제 풀이를 시도해볼 수 있고, 의견을 나눌 수 있습니다.
- 나의 문제 풀이 실력을 뽐내보세요.

<br>

## 사용 방법 ❤



<br>

## 팀원 구성 👨‍👩‍👦‍👦

<div align="center">

| **윤성빈** | **김승용** | **한정석** |
| :------: |  :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/22989582?v=4" height=150 width=150> <br/> @dbstjdqls14](https://github.com/dbstjdqls14) | [<img src="https://avatars.githubusercontent.com/u/44765636?v=4" height=150 width=150> <br/> @seungyong](https://github.com/seungyong) | [<img src="https://avatars.githubusercontent.com/u/115478278?s=96&v=4" height=150 width=150> <br/> @JeongseokHan](https://github.com/JeongseokHan) |
</div>

<br>

## 1. 개발 환경

- Front-end : <img src="https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=white" alt="HTML" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" /> <img src="https://img.shields.io/badge/Material--UI-0081CB?logo=mui&logoColor=white" alt="Material-UI" />
- Back-end : <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" alt="Redis" /> <img src="https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white" alt="MariaDB" />
- 버전 및 이슈관리 : <img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white" alt="GitHub" />
- 협업 툴 : <img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /> <img src="https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white" alt="Notion" />
- 디자인 : <img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white" alt="Figma" />
<br>

## 2. 개발 참고
### 디자인 (Figma)
[![Figma](https://img.shields.io/badge/Figma-바로가기-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/SyLQbiI27XWiREpgiUvELC/Forde?node-id=0-1&p=f&t=babcilcjtHasAAS3-0)

### 명세서 및 이슈 관리 (Notion)
[![Notion](https://img.shields.io/badge/Notion-바로가기-000000?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/Forde-1689c40a19d0804fbb76d4f8f47dc021)

<br>

## 2. 채택한 개발 기술과 브랜치 전략

### React
- 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI 구성 요소를 개발하여 개발 효율성을 높였습니다.
- Virtual DOM을 활용한 효율적인 렌더링으로 사용자 경험을 최적화하였습니다.
- TypeScript와 함께 사용하여 타입 안정성을 확보하고 개발 과정에서의 오류를 사전에 방지하였습니다.
- Recoil을 통한 전역 상태 관리로 컴포넌트 간 데이터 공유를 효율적으로 처리하였습니다.
    
### Spring
- Spring Boot를 활용하여 빠른 개발 환경 구축과 자동 설정을 통해 개발 생산성을 향상시켰습니다.
- Spring Security를 통해 인증/인가 시스템을 구현하고 보안성을 강화하였습니다.
- JPA/Hibernate를 사용하여 객체 관계 매핑을 통해 데이터베이스 작업을 효율적으로 처리하였습니다.
- RESTful API 설계 원칙을 따라 클라이언트와의 통신을 표준화하였습니다.

### Redis
- JWT의 Refresh Token을 관리하기 위해 사용하였습니다.
  - RTR(Refresh Token Rotation) 기법을 사용하기 위해 읽기, 쓰기가 빠른 인메모리 데이터베이스를 채택하였습니다.
- 세션 관리 및 캐싱을 통해 애플리케이션 성능을 향상시켰습니다.
- 실시간 알림 시스템의 임시 데이터 저장소로 활용하여 빠른 응답 속도를 구현하였습니다.

 
<br>

### 브랜치 전략
<br>

- 처음에는 Front-end와 Back-end의 브랜치를 격리하는 전략을 사용하였습니다.
  - 각 개인 브랜치는 다음과 같은 명명 규칙을 지정하였습니다.
    - [부모_브랜치명]-[브랜치_생성날짜]-[이름_이니셜]
- 웹 프로토타입을 만든 후 기능 별로 브랜치 전략을 변경하였습니다.
  - develop : 모든 기능을 총괄하는 브랜치입니다.
  - develop-작업자-일자 : 담당자별 작업 브랜치입니다.


초반 브랜치 전략은 다음 링크에서 자세히 확인하실 수 있습니다.
<br /> <br />
[![Notion](https://img.shields.io/badge/Notion-Github_전략-000000?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/Github-5798cdad8ac34b18bd3f0c14e299911d)
<br>

## 3. 프로젝트 구조 (Forde 폴더 기준)

```
Forde-Backend/
│
├── 📄 build.gradle                 # Gradle 빌드 설정
├── 📄 README.md                    # 프로젝트 문서
├── 📄 settings.gradle              # Gradle 프로젝트 설정
│
├── 📂 src/
│   ├── 📂 main/
│   │   ├── 📂 java/com/project/forde/
│   │   │   ├── 📄 FordeApplication.java        # 메인 애플리케이션 클래스
│   │   │   │
│   │   │   ├── 📂 annotation/                  # 커스텀 어노테이션
│   │   │   │   ├── ExtractUserId.java
│   │   │   │   └── UserVerify.java
│   │   │   │
│   │   │   ├── 📂 aspect/                      # AOP 관련 클래스
│   │   │   │   ├── ExtractUserIdAspect.java
│   │   │   │   ├── FileCleanupAspect.java
│   │   │   │   ├── LoginLogAspect.java
│   │   │   │   └── UserVerifyAspect.java
│   │   │   │
│   │   │   ├── 📂 batch/                       # 배치 처리 관련
│   │   │   │   └── 📂 csv/
│   │   │   │       ├── CSVJobConfig.java
│   │   │   │       ├── CSVWriterHelper.java
│   │   │   │       ├── 📂 board/
│   │   │   │       ├── 📂 log/
│   │   │   │       └── 📂 user/
│   │   │   │
│   │   │   ├── 📂 config/                      # 설정 클래스
│   │   │   │   ├── FirebaseConfig.java
│   │   │   │   ├── RedisConfig.java
│   │   │   │   ├── WebConfig.java
│   │   │   │   └── WebSecurityConfig.java
│   │   │   │
│   │   │   ├── 📂 controller/                  # REST API 컨트롤러
│   │   │   │   ├── ActivityLogController.java
│   │   │   │   ├── AppUserController.java
│   │   │   │   ├── BoardController.java
│   │   │   │   ├── CommentController.java
│   │   │   │   ├── LikeController.java
│   │   │   │   ├── NotificationController.java
│   │   │   │   └── ... (기타 컨트롤러들)
│   │   │   │
│   │   │   ├── 📂 dto/                         # 데이터 전송 객체
│   │   │   │   ├── 📂 appuser/
│   │   │   │   ├── 📂 board/
│   │   │   │   ├── 📂 comment/
│   │   │   │   ├── 📂 notification/
│   │   │   │   └── ... (기능별 DTO 패키지)
│   │   │   │
│   │   │   ├── 📂 entity/                      # JPA 엔티티
│   │   │   │   ├── AppUser.java
│   │   │   │   ├── Board.java
│   │   │   │   ├── Comment.java
│   │   │   │   ├── Notification.java
│   │   │   │   ├── Tag.java
│   │   │   │   ├── ... (기타 엔티티들)
│   │   │   │   └── 📂 composite/               # 복합키 클래스
│   │   │   │
│   │   │   ├── 📂 exception/                   # 예외 처리
│   │   │   │   ├── CustomException.java
│   │   │   │   ├── ErrorCode.java
│   │   │   │   ├── ErrorResponse.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   │
│   │   │   ├── 📂 interceptor/                 # HTTP 인터셉터
│   │   │   │   ├── AuthenticationInterceptor.java
│   │   │   │   └── SessionInterceptor.java
│   │   │   │
│   │   │   ├── 📂 mapper/                      # MapStruct 매퍼
│   │   │   │   ├── AppUserMapper.java
│   │   │   │   ├── BoardMapper.java
│   │   │   │   ├── CommentMapper.java
│   │   │   │   └── ... (기타 매퍼들)
│   │   │   │
│   │   │   ├── 📂 repository/                  # JPA Repository
│   │   │   │   ├── AppUserRepository.java
│   │   │   │   ├── BoardRepository.java
│   │   │   │   ├── CommentRepository.java
│   │   │   │   ├── NotificationRepository.java
│   │   │   │   └── ... (기타 Repository들)
│   │   │   │
│   │   │   ├── 📂 service/                     # 비즈니스 로직
│   │   │   │   ├── AppUserService.java
│   │   │   │   ├── BoardService.java
│   │   │   │   ├── CommentService.java
│   │   │   │   ├── NotificationService.java
│   │   │   │   ├── FileService.java
│   │   │   │   └── ... (기타 서비스들)
│   │   │   │
│   │   │   ├── 📂 type/                        # 열거형 타입
│   │   │   │   ├── BoardTypeEnum.java
│   │   │   │   ├── LogTypeEnum.java
│   │   │   │   ├── NotificationTypeEnum.java
│   │   │   │   └── SocialTypeEnum.java
│   │   │   │
│   │   │   ├── 📂 util/                        # 유틸리티 클래스
│   │   │   │   ├── Constants.java
│   │   │   │   ├── FileStore.java
│   │   │   │   ├── PasswordUtils.java
│   │   │   │   ├── RedisStore.java
│   │   │   │   └── UserStore.java
│   │   │   │
│   │   │   └── 📂 validation/                  # 유효성 검증
│   │   │       ├── EnumValue.java
│   │   │       ├── EnumValueValidator.java
│   │   │       └── FileValidator.java
│   │   │
│   │   └── 📂 resources/
│   │       ├── 📄 application.properties       # 애플리케이션 설정
│   │       ├── 📄 firebase.json               # Firebase 설정
│   │       └── 📂 static/
│   │           └── index.html
│   │
│   └── 📂 test/                               # 테스트 코드
│       ├── 📂 java/com/project/forde/
│       │   ├── FordeBackendApplicationTests.java
│       │   ├── 📂 board/
│       │   ├── 📂 boardImage/
│       │   ├── 📂 like/
│       │   └── 📂 view/
│       └── 📂 resources/
│           └── logback-test.xml
│
└── 📂 output/                                 # CSV 출력 파일
    ├── activity_log.csv
    ├── board_log.csv
    ├── comment_log.csv
    ├── like_log.csv
    └── user_log.csv
```

```
Forde-Frontend/
│  App.module.scss
│  App.tsx
│  index.scss
│  main.tsx
│  project_structrue.txt
│  vite-env.d.ts
│  
├─api
│      board.ts
│      comment.ts
│      index.ts
│      notification.ts
│      tag.ts
│      user.ts
│      
├─assets
│      사용한 이미지들.
│      
├─components
│  ├─BoardItem
│  │      BoardItem.module.scss
│  │      BoardItem.tsx
│  │      
│  ├─CenterTitle
│  │      CenterTitle.module.scss
│  │      CenterTitle.tsx
│  │      
│  ├─CommentForm
│  │      CommentForm.module.scss
│  │      CommentForm.tsx
│  │      
│  ├─Dialog
│  │      Dialog.module.scss
│  │      Dialog.tsx
│  │      
│  ├─Draft
│  │      Draft.module.scss
│  │      Draft.tsx
│  │      
│  ├─DragAndDrop
│  │      DragAndDrop.module.scss
│  │      DragAndDrop.tsx
│  │      
│  ├─Editor
│  │  │  Editor.module.scss
│  │  │  Editor.tsx
│  │  │  
│  │  ├─EditorDialog
│  │  │      EditorDialog.module.scss
│  │  │      EditorDialog.tsx
│  │  │      
│  │  ├─TableDialog
│  │  │      TableDialog.module.scss
│  │  │      TableDialog.tsx
│  │  │      
│  │  └─Toolbar
│  │          Toolbar.module.scss
│  │          Toolbar.tsx
│  │          
│  ├─EditorViewer
│  │      EditorViewer.tsx
│  │      
│  ├─EnterInformation
│  │      EnterInformation.module.scss
│  │      EnterInformation.tsx
│  │      
│  ├─FormButton
│  │      FormButton.module.scss
│  │      FormButton.tsx
│  │      ForumButton.tsx
│  │      
│  ├─Header
│  │  ├─DesktopHeader
│  │  │      DesktopHeader.module.scss
│  │  │      DesktopHeader.tsx
│  │  │      
│  │  └─MobileHeader
│  │          MobileHeader.module.scss
│  │          MobileHeader.tsx
│  │          
│  ├─MentionEditor
│  │      CommentInput.module.scss
│  │      MentionEditor.tsx
│  │      
│  ├─Modal
│  │      Modal.module.scss
│  │      Modal.tsx
│  │      
│  ├─PostForm
│  │      PostForm.module.scss
│  │      PostForm.tsx
│  │      
│  ├─Select
│  │      Select.tsx
│  │      
│  ├─Skeleton
│  │  ├─BoardDetail
│  │  │      SkeletonBoardDetail.tsx
│  │  │      
│  │  └─BoardItem
│  │          SkeletonBoardItem.tsx
│  │          
│  ├─SubNavigation
│  │  ├─BoardNavigation
│  │  │      BoardNavigation.module.scss
│  │  │      BoardNavigation.tsx
│  │  │      
│  │  ├─CategoryNavigation
│  │  │      CategoryNavigation.module.scss
│  │  │      CategoryNavigation.tsx
│  │  │      
│  │  ├─Link
│  │  │      Link.module.scss
│  │  │      Link.tsx
│  │  │      
│  │  ├─MyPageNavigation
│  │  │      MyPageNavigation.scss
│  │  │      MyPageNavigation.tsx
│  │  │      
│  │  ├─NewsNavigation
│  │  │      NewsNavigation.tsx
│  │  │      
│  │  └─TagNavigation
│  │          TagNavigation.tsx
│  │          
│  ├─Tag
│  │      Tag.module.scss
│  │      Tag.tsx
│  │      
│  └─Toast
│          Toast.tsx
│          
├─features
│  ├─Comment
│  │  │  Comment.module.scss
│  │  │  Comment.tsx
│  │  │  
│  │  ├─ChildComment
│  │  │      ChildComment.module.scss
│  │  │      ChildComment.tsx
│  │  │      
│  │  ├─CommentItem
│  │  │      CommentItem.module.scss
│  │  │      CommentItem.tsx
│  │  │      
│  │  └─ParentComment
│  │          ParentComment.tsx
│  │          
│  ├─InfinityScrollBoard
│  │      InfinityScrollBoard.tsx
│  │      
│  ├─LikeButton
│  │      LikeButton.module.scss
│  │      LikeButton.tsx
│  │      
│  ├─Notification
│  │      Notification.module.scss
│  │      Notification.tsx
│  │      
│  ├─Sns
│  │      Sns.module.scss
│  │      Sns.tsx
│  │      
│  └─TagSelect
│          TagSelect.tsx
│          
├─hooks
│      useDialogCloseBoundary.tsx
│      useInfinityScroll.tsx
│      useToast.tsx
│      useUser.tsx
│      useWindowSize.tsx
│      
├─layouts
│  ├─Aside
│  │      AsideLayout.module.scss
│  │      AsideLayout.tsx
│  │      
│  ├─Auth
│  │      AuthLayout.module.scss
│  │      AuthLayout.tsx
│  │      
│  ├─Center
│  │      CenterLayout.module.scss
│  │      CenterLayout.tsx
│  │      
│  ├─EmailVerify
│  │      EmailVerifyLayout.module.scss
│  │      EmailVerifyLayout.tsx
│  │      
│  ├─Input
│  │      InputLayout.module.scss
│  │      InputLayout.tsx
│  │      
│  └─Main
│          MainLayout.module.scss
│          MainLayout.tsx
│          
├─pages
│  ├─Board
│  │      Board.tsx
│  │      
│  ├─BoardDetail
│  │      BoardDetail.module.scss
│  │      BoardDetail.tsx
│  │      
│  ├─Callback
│  │      Callback.tsx
│  │      
│  ├─Daily
│  │      Daily.tsx
│  │      
│  ├─EmailChange
│  │      EmailChange.tsx
│  │      
│  ├─EmailChangeVerify
│  │      EmailChangeVerify.tsx
│  │      
│  ├─EmaillVerify
│  │      EmailVerify.module.scss
│  │      EmailVerify.tsx
│  │      
│  ├─EmailVerifyCode
│  │      EmailVerifyCode.tsx
│  │      
│  ├─Follow
│  │      Follow.tsx
│  │      
│  ├─Login
│  │      Login.tsx
│  │      
│  ├─Main
│  │      Main.tsx
│  │      
│  ├─Monthly
│  │      Monthly.tsx
│  │      
│  ├─MyPageAccount
│  │      AccountLayout.scss
│  │      AccountLayout.tsx
│  │      
│  ├─MyPageActivateComments
│  │      ActiveCommentLayout.module.scss
│  │      ActiveCommentLayout.tsx
│  │      
│  ├─MyPageActivateLikes
│  │      ActiveLikeLayout.module.scss
│  │      ActiveLikeLayout.tsx
│  │      
│  ├─MyPageActive
│  │      ActiveLayout.module.scss
│  │      ActiveLayout.tsx
│  │      
│  ├─MyPageActiveBoard
│  │      ActiveBoardLayout.module.scss
│  │      ActiveBoardLayout.tsx
│  │      
│  ├─MyPageProfile
│  │      ProfileLayout.scss
│  │      ProfileLayout.tsx
│  │      
│  ├─News
│  │      News.tsx
│  │      
│  ├─Notice
│  │      NoticeLayout.scss
│  │      NoticeLayout.tsx
│  │      
│  ├─OtherActivate
│  │      OtherActiveLayout.module.scss
│  │      OtherActiveLayout.tsx
│  │      
│  ├─PasswordEdit
│  │      PasswordEdit.tsx
│  │      
│  ├─PasswordFind
│  │      PasswordFind.tsx
│  │      
│  ├─PasswordVerify
│  │      PassowrdVerify.tsx
│  │      
│  ├─Post
│  │      Post.tsx
│  │      
│  ├─Register
│  │      Register.tsx
│  │      
│  ├─Search
│  │      Search.tsx
│  │      TagSearch.tsx
│  │      
│  ├─Social
│  │      SocialLayout.scss
│  │      SocialLayout.tsx
│  │      
│  └─Update
│          Update.tsx
│          
├─recoil
│  └─user
│          atoms.ts
│          selectors.ts
│          
├─routes
│      router.tsx
│      
├─stores
│      useAppStore.tsx
│      
├─styles
│      mui.scss
│      tiptap.scss
│      _mixin.scss
│      _variable.scss
│      
├─types
│      board.d.ts
│      comment.d.ts
│      index.d.ts
│      notification.d.ts
│      react.d.ts
│      tag.d.ts
│      user.d.ts
│      
└─utils
        codeBlockIndent.ts
        constants.ts
        doc.ts
        indent.ts
        number.ts
        pagination.ts
        tag.ts
        validation.ts
        youtubeResize.ts
        

```

<br>

## 4. 역할 분담


### 윤성빈
- **프론트엔드 페이지 구축**
  - React/TypeScript 기반 웹 애플리케이션 구축
  - 컴포넌트 아키텍처 개발
- **상태 관리 및 라우팅**
  - Recoil을 활용한 전역 상태 관리
  - React Router 기반 페이지 라우팅 시스템
  - 사용자 세션 및 인증 상태 관리
- **API 연동 및 데이터 처리**
  - 백엔드 REST API 통신 구현
  - Axios를 통한 HTTP 요청 처리
  - 에러 핸들링 및 로딩 상태 관리
- **사용자 경험 최적화**
  - 무한 스크롤 및 페이지네이션 구현
  - 실시간 알림 UI 연동 (SSE)

### 한정석
- **사용자 인증 및 계정 관리**
  - 로그인/로그아웃, 회원가입
  - 소셜 로그인 (Google, Naver, Kakao, Github)
  - 이메일 인증 및 비밀번호 관리
- **사용자 프로필 관리**
  - 개인정보 조회/수정
  - 프로필 사진 및 소셜 설정
  - 팔로우/팔로잉 기능
- **알림 시스템**
  - 알림 조회 및 관리
- **보안 및 세션 관리**
  - JWT 토큰 기반 인증 시스템
  - 사용자 권한 관리 및 접근 제어

### 김승용 ( 팀장 )
- **프론트엔드 개발**
  - React/TypeScript 기반 웹 애플리케이션 구축 ( 메인 일부,로그인,코드작성 부분 등 )
  - 컴포넌트 아키텍처 설계 및 개발 ( 게시글 리스트, 댓글 등 컴포넌트 기초 설계 )
- **콘텐츠 관리**
  - 게시글 CRUD (작성, 조회, 수정, 삭제)
  - 댓글 및 대댓글 시스템
  - 임시저장 기능
- **뉴스 및 피드 시스템**
  - 최신/일일/월간 뉴스 조회
  - 메인화면 추천 콘텐츠
  - 팔로잉 기반 개인화 피드
- **검색 및 태그 시스템**
  - 통합 검색 기능
  - 태그 관리 및 검색
  - 인기 태그 조회
- **상호작용 기능**
  - 좋아요 시스템
  - 게시글 조회수 및 체류시간 추적
- **전체 디자인 설계**


## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2025-02-01 ~ 2025-04-16
- UI 구현 : -
- 기능 구현 : -

<br>

### 작업 관리

- Notion을 통해 API 명세서, 페이지 명세서 등 공통 작업을 작성하였습니다.
- 주간회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 회의록을 작성하였습니다.
- 개인별 또는 팀별 일정을 작성하여 마감일을 지켰습니다.
- 오류 보고 및 수정은 Notion의 언급 기능을 사용하여 소통하였습니다.

<br>


## 6. 페이지별 기능
### 6-1. 회원가입
### 6-2. 로그인
### 6-3. 메인 페이지
### 6-4. 메인 페이지 - 좌측 사이드 메뉴
### 6-5. 메인 페이지 - 우측 사이드 메뉴
### 6-6. 메인 페이지 - 알림 확인
### 6-7. 게시글 작성 
### 6-8. 게시글 상세 확인
### 6-9. 게시글 댓글
### 6-10. 게시글 대댓글
### 6-11. 마이페이지 - 기초 정보 수정
### 6-12. 마이페이지 - 연동 정보 
### 6-13. 마이페이지 - 알림 정보
### 6-14. 마이페이지 - 타 유저 정보

## 7. 개선 목표

- 
