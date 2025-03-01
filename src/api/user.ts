import { IntroUser, OtherUser, SnsInfos, User, Notification, PostVerifyParams, PostVerifyResponse, PatchPasswordParams, PostVerifyCompareParams, PostLoginParams, PostRegisterParams, UserNotificationResponse } from "@/types/user";
import axios from "axios";

export const UserApi = {
  getUser: async (): Promise<User> => {
    // try { 
    //   const response = await axios.get(
    //     `http://localhost:8081/user`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("유저 정보 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      userId: 2,
      nickname: "응우옌성빈",
      description: "나는 날아오를거야",
      profilePath: "https://i.namu.wiki/i/e_8JjVOxkmbsOsV1oclnb_o3u0bPet7BKts882La2j_wPox4LKihPaeEHZgKqa0VAwh1AU6wy46DNXBIeQy_5w.webp",
      interestTags: [
        {
          tagId: 11,
          tagName: "태그1번",
        },
        {
          tagId: 22,
          tagName: "태그2번",
        },
      ],
      boardCount: 1111,
      newsCount: 2222,
      likeCount: 3333,
      commentCount: 5555,
    };
  },
  getOneUser: async (userId : number): Promise<OtherUser> => {
    // try { 
    //   const response = await axios.get(
    //     `http://localhost:8081/user/`+userId,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("유저 정보 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      userId: 2,
      nickname: "응우옌성빈",
      description: "나는 날아오를거야",
      profilePath: "https://i.namu.wiki/i/e_8JjVOxkmbsOsV1oclnb_o3u0bPet7BKts882La2j_wPox4LKihPaeEHZgKqa0VAwh1AU6wy46DNXBIeQy_5w.webp",
      followerCount: 851851,
      followingCount: 1,
      boardCount: 1111,
      newsCount: 2222,
      likeCount: 3333,
      commentCount: 5555,
      isPrivate: true,
    };
  },
  getIntroUser: async (): Promise<IntroUser> => {
    // throw new Error("Unauthorized Error");
    // try { 
    //   const response = await axios.get(
    //     `http://localhost:8081/user/intro`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("유저 정보 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      userId: 2,
      nickname: "김승용",
      email: "seungyong20@naver.com",
      profilePath: "https://avatars.githubusercontent.com/u/77449569?v=4",
    };
  },
  getSnsInfos: async (): Promise<SnsInfos> => {
    // try { 
    //   const response = await axios.get(
    //     `http://localhost:8081/user/sns`,  
    //     {
    //       withCredentials: true
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("유저 정보 가져오던 중 오류 발생:", error);
    //   throw error;
    // }
    return {
      userId: 2,
      email: "seungyong20@naver.com",
      snsInfos: [
        {
          snsKind: 1001,
          snsName: "github",
          isConnect: true
        },
        {
          snsKind: 1002,
          snsName: "google",
          isConnect: false
        },
        {
          snsKind: 1003,
          snsName: "naver",
          isConnect: false
        },
        {
          snsKind: 1004,
          snsName: "kakao",
          isConnect: true
        },
      ]
    }
  },
  // 사용자 정보 수정 눌렀을 때 호출
  updateUser: async (userData: {
    nickname: string;
    description: string;
    interestTags: string[];
  }) => {
    try {
      const response = await axios.patch(`localhost:8081/user`, userData,
          {
            withCredentials: true
          });
      return response.data;
    } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
      throw error;
    }
  },
  getNotification: async (): Promise<UserNotificationResponse> => {
    try {
      const response = await axios.get(
        `http://localhost:8081/user/notification`,  
        {
          withCredentials: true
        },
      );
      return response.data;
    } catch (error) {
      console.error("알림 상태 가져오기 중 오류 발생:", error);
      throw error;
    }
  },
  putNotification: async (
    noticeNotification: boolean,
    commentNotification: boolean,
    likeNotification: boolean,
    recommendNotification: boolean,
    followNotification: boolean,
    eventNotification: boolean
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/user/notification`,  
        {
          noticeNotification,
          commentNotification,
          likeNotification,
          recommendNotification,
          followNotification,
          eventNotification
        },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("알림 상태 변경 중 오류 발생:", error);
      throw error;
    }
  },
  getSocialSetting: async (
    sessionKey: string | undefined
  ) => {
    console.log(sessionKey);
    return {
      disableFollow: true,
      disableAccount: false,
      disableStoreSearch: true,
    }
  },
  patchSocialSetting: async (
    disableFollow: boolean,
    disableAccount: boolean,
    disableStoreSearch: boolean,
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/sns/setting`, 
        {
          disableFollow,
          disableAccount,
          disableStoreSearch
        },
        {withCredentials: true}
      );
      return response.data;
    } catch (error) {
      console.error("알림 상태 변경 중 오류 발생:", error);
      throw error;
    }
  },

  deleteSearchHistory: async() => {
    try {
      const response = await axios.put(
        `http://localhost:8081/user/history`, 
        {}, {withCredentials: true}
      );
      return response.data;
    } catch (error) {
      console.error("알림 상태 변경 중 오류 발생:", error);
      throw error;
    }
  },
  postVerify: async (sessionKey:string, { email }: PostVerifyParams): Promise<PostVerifyResponse> => {
    try {
      const response = await axios.post(`localhost:8081/user/verify`, 
        { 
          email:email // body임 
        },
        {
          withCredentials: true
        }
      );

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  postVerifyCompare: async ({email, verifyCode}: PostVerifyCompareParams): Promise<void> => {
    try {
      const response = await axios.post(`localhost:8081/user/verify`, 
        { 
          email:email,
          verifyCode: verifyCode
        },
        {
          withCredentials: true
        }
      );

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  patchPassword: async({password, randomKey}: PatchPasswordParams)=> {
    try {
      const response = await axios.patch(`localhost:8081/user/password`, 
        { 
          password:password,       
          randomKey:randomKey,
        },
        {
          withCredentials: true
        }
      );

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  
  login: async ({email, password}: PostLoginParams): Promise<void> => {
    try {
      const response = await axios.post(`localhost:8081/user/login`, 
        { 
          email:email,
          password: password
        },
        {withCredentials: true}
      );

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`localhost:8081/user/logout`, 
        {withCredentials: true}
      );

      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  postUser: async ({email, password, isEnableEvent, isEnableNotification}: PostRegisterParams): Promise<void> => {
    try {
      const response = await axios.post(`localhost:8081/user`, 
        { 
          email:email,
          password: password,
          isEnableEvent: isEnableEvent,
          isEnableNotification: isEnableNotification,
        },
        {
          withCredentials: true
        }
      );

      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "회원가입 API 요청 실패");
      throw new Error("회원가입 API 요청 실패");
    }
  },
  postCheckRandomKey: async (randomKey: string): Promise<void> => {
    try {
      const response = await axios.post(`localhost:8081/user/password/randomkey`, 
        { 
          randomKey:randomKey,
        },
        {
          withCredentials: true
        }
      );

      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "랜덤키 검사 API 요청 실패");
      throw new Error("랜덤키 검사 API 요청 실패");
    }
  },
};
