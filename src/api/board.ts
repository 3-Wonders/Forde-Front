import { Board, BoardListWithType, DraftBoard, DraftBoardList, RequestBoardPost, RequestBoardUpdate, UpdateBoardDetail } from "@/types/board";

import Bitcoin from "@assets/bitcoin.png";
import axios from "axios";
// import axios from "axios";

export const BoardApi = {
  fetchRecentBoardAndNews: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    
    try { 
      const response = await axios.get(
        `http://localhost:8080/recent?page=`+page+`&count=`+count,  
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("이것 저것 가져오던 중 오류 발생:", error);
      throw error;
    }

    // TODO: 최근 뉴스 또는 게시글 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "최근 뉴스 또는 게시글 가져오기",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentBoards;
  },
  fetchRecentNews: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    try { 
      const response = await axios.get(
        `http://localhost:8080/news`,  
        {
          params: { page, count },
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("최신 뉴스를 가져오던 중 오류 발생:", error);
      throw error;
    }

    // TODO: 최근 뉴스를 불러오는 API 호출 
    const recentNews: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "뉴스를 사용한 프로젝트 구성",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentNews;
  },
  fetchRecentBoards: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);


    try { 
      const response = await axios.get(
        `http://localhost:8080/board`,  
        {
          params: { page, count },
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("최신 게시글를 가져오던 중 오류 발생:", error);
      throw error;
    }

    // TODO: 최근 게시글 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "비트코인을 사용한 프로젝트 구성",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentBoards;
  },
  fetchRecentFollowingBoards: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    try { 
      const response = await axios.get(
        `http://localhost:8080/board/following`,  
        {
          params: { page, count },
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("최신 게시글를 가져오던 중 오류 발생:", error);
      throw error;
    }

    // TODO: 팔로잉 게시글 또는 뉴스 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "팔로잉 뉴스 또는 게시글 가져오기",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentBoards;
  },
  fetchRecommendBoards: async () => {
    
    // try { 주석 풀어서 테스트해야함.
    //   const response = await axios.get(
    //     `http://localhost:8081/news/recommended`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("추천 게시글을 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      boards: [
        {
          boardId: 1,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "비극 속에서 한 사업을 매각하고 다른 사업을 확장하기",
          nickname: "User_01",
        },
        {
          boardId: 2,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "창업자로서의 정신 건강과 커뮤니티의 중요성 및 컨디션 관리를 어떻게 하는 게 좋을까?",
          nickname: "User_02",
        },
        {
          boardId: 3,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "1년 만에 비트코인으로 월 수익 $8,500",
          nickname: "User_03",
        },
        {
          boardId: 4,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "2024년 정신 건강과 부트스트래핑을 통한 창업",
          nickname: "User_04",
        },
        {
          boardId: 5,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "백엔드 개발자로 살아가는 방법",
          nickname: "User_05",
        },
        {
          boardId: 6,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "커뮤니티를 잘 사용하는 사람과 못 사용하는 사람의 차이점",
          nickname: "User_06",
        },
      ],
    };
  },
  fetchPopularBoards: async () => {
    
    // try { 주석 풀어서 테스트해야함.
    //   const response = await axios.get(
    //     `http://localhost:8081/board/popular`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("추천 게시글을 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      boards: [
        {
          boardId: 1,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "비극 속에서 한 사업을 매각하고 다른 사업을 확장하기",
          nickname: "User_01",
        },
        {
          boardId: 2,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "창업자로서의 정신 건강과 커뮤니티의 중요성 및 컨디션 관리를 어떻게 하는 게 좋을까?",
          nickname: "User_02",
        },
        {
          boardId: 3,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "1년 만에 비트코인으로 월 수익 $8,500",
          nickname: "User_03",
        },
        {
          boardId: 4,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "2024년 정신 건강과 부트스트래핑을 통한 창업",
          nickname: "User_04",
        },
        {
          boardId: 5,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "백엔드 개발자로 살아가는 방법",
          nickname: "User_05",
        },
        {
          boardId: 6,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "커뮤니티를 잘 사용하는 사람과 못 사용하는 사람의 차이점",
          nickname: "User_06",
        },
      ],
    };
  },
  fetchBoardDetail: async (boardId: number): Promise<Board> => {
    console.log("fetch Board Detail : ", boardId);

    // try { 
    //   const response = await axios.get(
    //     `http://localhost:8081/board/`+boardId,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("특정 게시글을 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      boardId: 1,
      boardType: "N",
      title: "비트코인을 사용한 프로젝트 구성",
      content: `<div class="toastui-editor-contents" style="overflow-wrap: break-word;"><p data-nodeid="1">개발을 하다 보면 비슷한 기능을 반복해서 만드는 일이 많습니다.<br>
특히 안드로이드 앱 개발에서 새로운 기능을 추가할 때마다 패키지 구조를 만들고, 필요 파일을 하나씩 추가하는 일은 꽤 귀찮고 비효율적입니다.<br>
하지만 Gradle을 사용하면 이런 작업을 자동화할 수 있습니다.<br>
한 번 세팅해 두면 클릭 몇 번으로 기능 추가가 끝나니, 시간이 절약되는 것은 물론 실수도 줄어듭니다.<br>
오늘은 <strong data-nodeid="68">Gradle을 활용해 안드로이드 기능을 자동 생성하는 방법</strong>을 소개하겠습니다.</p>
<h2 data-nodeid="2" id="_1740166856713_597184">Gradle을 사용한 기능 자동화란?</h2>
<p data-nodeid="3">Gradle은 빌드 자동화 도구로 알려져 있지만, 사실 스크립트를 통해 다양한 작업을 자동화할 수 있습니다.<br>
예를 들어 <strong data-nodeid="77">Feature Module</strong>을 만드는 작업도 Gradle에서 정의한 커스텀 작업으로 간단하게 처리할 수 있습니다.</p>
<p data-nodeid="4">여기서 Feature Module이란 안드로이드에서 기능을 독립적으로 분리해서 관리하는 모듈로, <strong data-nodeid="87">MVVM 패턴</strong>이나 <strong data-nodeid="88">클린 아키텍처</strong>를 적용할 때 유용합니다.</p>
<h3 data-nodeid="5" id="_1740166856713_781229">왜 자동화가 필요할까?</h3>
<ul data-nodeid="6">
<li data-nodeid="7">
<p data-nodeid="8"><strong data-nodeid="94">반복 업무 감소</strong>: 매번 동일한 구조를 수작업으로 만들 필요가 없습니다.</p>
</li>
<li data-nodeid="9">
<p data-nodeid="10"><strong data-nodeid="99">일관성 유지</strong>: 팀원들이 동일한 구조와 패턴을 따르도록 강제할 수 있습니다.</p>
</li>
<li data-nodeid="11">
<p data-nodeid="12"><strong data-nodeid="104">시간 절약</strong>: 자동화 덕분에 개발자들은 더 중요한 일에 집중할 수 있습니다.</p>
</li>
</ul>
<hr data-nodeid="13">
<h2 data-nodeid="14" id="_1740166856713_86022">Gradle 설정 및 Feature Module 자동 생성하기</h2>
<h3 data-nodeid="15" id="_1740166856713_205901">1. Gradle Task 추가하기</h3>
<p data-nodeid="16">먼저 프로젝트의 <strong data-nodeid="114"><code data-nodeid="109" data-backticks="1">build.gradle</code></strong> 파일에 새로운 Task를 추가합니다.<br>
이 Task는 새로운 모듈(기능)을 생성하는 역할을 합니다.</p>
<p data-nodeid="17">아래는 간단한 예시 코드입니다.</p>
<pre data-nodeid="18" class=" language-gradle"><code data-language="gradle" class=" language-gradle">// Root 레벨 build.gradle
import org.apache.tools.ant.taskdefs.condition.Os

def featureName = project.hasProperty('featureName') ? project.featureName : 'default'

task createFeature {
    doLast {
        def featurePath = "./features/feature-$featureName}"
        def mainSrcPath = "$featurePath}/src/main"
        
        println "Creating Feature Module: $featureName}"
        
        // 디렉토리 구조 생성
        mkdir "$mainSrcPath}/java"
        mkdir "$mainSrcPath}/res/layout"
        mkdir "$mainSrcPath}/res/values"
        
        // 기본 build.gradle 파일 생성
        def buildFile = file("$featurePath}/build.gradle")
        buildFile.text = """
            apply plugin: 'com.android.library'

            android {
                compileSdkVersion 34

                defaultConfig {
                    minSdkVersion 21
                    targetSdkVersion 34
                    versionCode 1
                    versionName "1.0"
                }

                buildTypes {
                    release {
                        minifyEnabled false
                    }
                }
            }

            dependencies {
                implementation project(':app')
            }
        """
        println "Feature Module \${featureName} 생성이 완료되었습니다."
    }
}
</code></pre>
<p data-nodeid="19">위 스크립트는 다음을 자동으로 수행합니다.</p>
<ol data-nodeid="20">
<li data-nodeid="21">
<p data-nodeid="22"><strong data-nodeid="121"><code data-nodeid="118" data-backticks="1">features/feature-&lt;name&gt;</code></strong> 경로에 새로운 디렉토리를 생성합니다.</p>
</li>
<li data-nodeid="23">
<p data-nodeid="24"><code data-nodeid="122" data-backticks="2">src/main</code> 안에 기본 폴더 구조를 만듭니다.</p>
</li>
<li data-nodeid="25">
<p data-nodeid="26"><code data-nodeid="124" data-backticks="1">build.gradle</code> 파일을 추가하고 기본 설정을 작성합니다.</p>
</li>
</ol>
<hr data-nodeid="27">
<h3 data-nodeid="28" id="_1740166856713_125216">2. Task 실행하기</h3>
<p data-nodeid="29">Gradle Task를 실행할 때는 명령어에 <code data-nodeid="128" data-backticks="1">-P</code> 옵션을 사용해 모듈 이름을 전달합니다.</p>
<p data-nodeid="30">터미널에서 다음 명령어를 입력하세요:</p>
<pre data-nodeid="31" class=" language-bash"><code data-language="bash" class=" language-bash">./gradlew createFeature -PfeatureName=profile
</code></pre>
<p data-nodeid="32">이 명령어를 실행하면 <code data-nodeid="132" data-backticks="1">features/feature-profile</code>이라는 폴더에 자동으로 새로운 모듈이 생성됩니다.</p>
<hr data-nodeid="33">
<h3 data-nodeid="34" id="_1740166856714_878719">3. 새로 생성된 모듈 확인하기</h3>
<p data-nodeid="35">Gradle Task 실행이 끝난 후 프로젝트 구조를 확인하면 다음과 같은 결과를 볼 수 있습니다:</p>
<pre data-nodeid="36"><code>project-root/
│
├── features/
│   └── feature-profile/
│       ├── build.gradle
│       └── src/
│           └── main/
│               ├── java/
│               ├── res/
│               │   ├── layout/
│               │   └── values/
</code></pre>
<p data-nodeid="37">이제 추가적인 수정 없이 바로 모듈을 사용할 준비가 완료되었습니다.</p>
<hr data-nodeid="38">
<h2 data-nodeid="39" id="_1740166856714_204671">커스터마이징 및 확장하기</h2>
<p data-nodeid="40">위 예제는 기본적인 구조만을 자동화했지만, 더 복잡한 작업도 가능합니다. 예를 들어,</p>
<ul data-nodeid="41">
<li data-nodeid="42">
<p data-nodeid="43"><strong data-nodeid="143">Activity/Fragment 자동 추가</strong>: 기본 클래스 파일을 생성하는 작업을 Task에 추가할 수 있습니다.</p>
</li>
<li data-nodeid="44">
<p data-nodeid="45"><strong data-nodeid="148">템플릿 코드 삽입</strong>: 모듈마다 공통으로 들어가는 코드를 자동으로 작성합니다.</p>
</li>
<li data-nodeid="46">
<p data-nodeid="47"><strong data-nodeid="155">Dependencies 관리</strong>: 자주 사용하는 라이브러리를 <code data-nodeid="153" data-backticks="1">build.gradle</code>에 미리 추가해 둡니다.</p>
</li>
</ul>
<p data-nodeid="48">예를 들어 Activity 파일을 추가하는 예제는 다음과 같습니다.</p>
<pre data-nodeid="49" class=" language-gradle"><code data-language="gradle" class=" language-gradle">def activityFile = file("}/java/Feature$featureName}Activity.kt")
activityFile.text = """
    package com.example.feature.}

    import android.os.Bundle
    import androidx.appcompat.app.AppCompatActivity

    class Feature.capitalize()}Activity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_)
        }
    }
"""
</code></pre>
<hr data-nodeid="50">
<h2 data-nodeid="51" id="_1740166856714_410217">결론: 반복 작업은 Gradle에 맡기세요</h2>
<p data-nodeid="52">반복적인 작업은 개발자의 시간을 낭비하고 실수를 유발할 수 있습니다. Gradle의 커스텀 Task 기능을 활용하면 코드 한 줄 작성 없이 새로운 모듈을 생성할 수 있고, 팀 내 일관된 개발 환경을 유지할 수 있습니다.</p>
<p data-nodeid="53">처음 설정할 때는 조금 시간이 걸릴 수 있지만, 한 번 설정해 두면 개발 생산성이 크게 올라갈 것입니다.</p>
<p data-nodeid="54"><strong data-nodeid="165">"자동화는 귀찮음을 없애는 첫걸음입니다."</strong></p>
</div>`,
      thumbnail: null,
      tags: [
        { tagId: 1, tagName: "finace" },
        { tagId: 2, tagName: "bitcoin" },
      ],
      isLike: false,
      uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
      viewCount: 1651324,
      likeCount: 366545,
      commentCount: 30,
      createdTime: "2024-08-17 12:30:45",
    };
  },
  fetchBoardDetailByUpdate: async (boardId: number): Promise<UpdateBoardDetail> => {
    console.log("fetch Board Detail : ", boardId);
    // try { 
    //   const response = await axios.get(
    //     `http://localhost:8081/board/`+boardId, 
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("특정 게시글을 가져오던던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      boardId: 1,
      boardType: "N",
      title: "비트코인을 사용한 프로젝트 구성",
      content: `<h3 style="margin-left: 0px !important">알고리즘 테스트 1에 대한 설명입니다.</h3><p style="margin-left: 0px !important">이번 알고리즘은 굉장히 쉬운 산수 문제입니다.</p><p style="margin-left: 0px !important">두 수를 입력받고 두 수의 합을 출력하면 되는 문제입니다.</p><p style="margin-left: 0px !important">예를 들어, 1 + 1은 2라는 결과 값이 나오면 됩니다.</p><p style="margin-left: 0px !important">테스트 케이스는 다음과 같습니다.</p><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important"><strong>입력</strong></p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important"><strong>출력</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">1,1</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">2</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">2,3</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">5</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,5</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">9</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,2</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">6</p></td></tr></tbody></table><hr><p style="margin-left: 0px !important">숫자를 입력받기 위해서는 Scanner를 사용하면 됩니다.</p><pre><code class="language-java">import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
  }
}</code></pre><p style="margin-left: 0px !important">주의하실 점은 <u>import</u>를 꼭 해줘야 하는 겁니다!</p><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">바로 정답을 보겠습니다.</p>
<pre><code class="language-java">import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
    int b = s.nextInt();
    System.out.println(a + b);
  }
}</code></pre>`,
      thumbnail: Bitcoin,
      tags: [
        { tagId: 1, tagName: "finace" },
        { tagId: 2, tagName: "bitcoin" },
      ],
      imageIds: [1, 2, 3],
      createdTime: "2024-08-17 12:30:45",
    };
  },
  fetchDraftBoards: async (): Promise<DraftBoardList> => {
    
    // try { 
    //   const response = await axios.post(
    //     `http://localhost:8081/draft,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("특정 게시글을 임시저장 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      drafts: [
        {
          draftId: 1,
          boardType: "N",
          title: null,
          content: `<h3 style="margin-left: 0px !important">알고리즘 테스트 1에 대한 설명입니다.</h3><p style="margin-left: 0px !important">이번 알고리즘은 굉장히 쉬운 산수 문제입니다.</p><p style="margin-left: 0px !important">두 수를 입력받고 두 수의 합을 출력하면 되는 문제입니다.</p><p style="margin-left: 0px !important">예를 들어, 1 + 1은 2라는 결과 값이 나오면 됩니다.</p><p style="margin-left: 0px !important">테스트 케이스는 다음과 같습니다.</p><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important"><strong>입력</strong></p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important"><strong>출력</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">1,1</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">2</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">2,3</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">5</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,5</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">9</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,2</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">6</p></td></tr></tbody></table><hr><p style="margin-left: 0px !important">숫자를 입력받기 위해서는 Scanner를 사용하면 됩니다.</p><pre><code class="language-java">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
  }
}</code></pre><p style="margin-left: 0px !important">주의하실 점은 <u>import</u>를 꼭 해줘야 하는 겁니다!</p><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">바로 정답을 보겠습니다.</p><pre><code class="language-java">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
    int b = s.nextInt();

    System.out.println(a + b);
  }
}</code></pre>`,
          thumbnail: null,
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          imageIds: null,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          draftId: 2,
          boardType: "B",
          title: "타이틀",
          content: null,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          tags: null,
          imageIds: [1, 2, 3],
          createdTime: "2024-08-15 09:30:45",
        },
      ],
    };
  },
  likeBoard: async (boardId: number) => {
    console.log("like", boardId);
    
    // try { 
    //   const response = await axios.post(
    //     `http://localhost:8081/board/`+boardId+`/like`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("특정 게시글을 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
  },
  unLikeBoard: async (boardId: number) => {
    console.log("unlike", boardId);
    
    // try { 
    //   const response = await axios.delete(
    //     `http://localhost:8081/board/`+boardId+`/like`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("특정 게시글을 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
  },
  fetchBoardDetailByDelete: async (boardId: number) => {
    console.log("delete", boardId);
    
    try { 
      const response = await axios.delete(
        `http://localhost:8081/board/`+boardId,  
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("특정 게시글을 삭제하던 중 오류 발생:", error);
      throw error;
    }
  },

  fetchBoardUpdate: async (boardId: number, updateData: RequestBoardUpdate): Promise<UpdateBoardDetail> => {
    console.log("fetch Board Detail : ", boardId);
    try { 
      const response = await axios.patch(
        `http://localhost:8081/board/`+boardId, 
        {
          boardType: updateData.boardType,
          title: updateData.title,
          content: updateData.content,
          tagIds: updateData.tagIds,
          thumbnail: updateData.thumbnail,
          thumbnailAction: updateData.thumbnailAction,
          imageIds: updateData.imageIds
        },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("특정 게시글을 업데이트 하던 중 오류 발생:", error);
      throw error;
    }
  },

  postBoard: async (postData: RequestBoardPost): Promise<any> => {
    try { 
      const response = await axios.post(
        `http://localhost:8081/board/`, 
        {
          boardType: postData.boardType,
          title: postData.title,
          content: postData.content,
          tagIds: postData.tagIds,
          thumbnail: postData.thumbnail,
          imageIds: postData.imageIds
        },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("특정 게시글을 업데이트 하던 중 오류 발생:", error);
      throw error;
    }
  },

  getDraft: async () : Promise<DraftBoardList> => {
    try{
      const response = await axios.get(
        `http://localhost:8081/draft/`,
        { withCredentials: true },
      );
      return response.data;
    } catch(er) {
      console.log(" 임시저장 게시글 가져오기 중 에러 발생 : " + er );
      throw er;
    }
  },

  postDraft: async (postData : RequestBoardPost) : Promise<any> => {
    try{
      const response = await axios.post(
        `http://localhost:8081/draft/`, 
        {
          boardType: postData.boardType,
          title: postData.title,
          content: postData.content,
          tagIds: postData.tagIds,
          thumbnail: postData.thumbnail,
          imageIds: postData.imageIds
        },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch(er) {
      console.log(" 임시저장 게시글 저장 중 에러 발생 : " + er );
      throw er;
    }
  },

  updateDraft: async (draftId: number, updateData: RequestBoardUpdate): Promise<any> => {
    try { 
      const response = await axios.patch(
        `http://localhost:8081/draft/`+draftId, 
        {
          boardType: updateData.boardType,
          title: updateData.title,
          content: updateData.content,
          tagIds: updateData.tagIds,
          thumbnail: updateData.thumbnail,
          thumbnailAction: updateData.thumbnailAction,
          imageIds: updateData.imageIds
        },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("임시 저장 업데이트 하던 중 오류 발생:", error);
      throw error;
    }
  },
  
  deleteDraft: async (draftId: number) => {
    try { 
      const response = await axios.delete(
        `http://localhost:8081/draft/`+draftId,  
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("임시 저장글을 삭제하던 중 오류 발생:", error);
      throw error;
    }
  },
};
