import { IntroUser, OtherUser, SnsInfos, User, Notification, PostVerifyParams, PostVerifyResponse, PatchPasswordParams, PostVerifyCompareParams, PostLoginParams, PostRegisterParams, UserNotificationResponse, UsersMentionResponse, MentionUser } from "@/types/user";
import axios from "axios";

export const UserApi = {
  getUser: async (): Promise<User> => {
    try { 
      const response = await axios.get(
        `http://localhost:8080/user`,  
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("유저 정보 가져오던 중 오류 발생:", error);
      throw error;
    }
  },
  getOneUser: async (userId : number): Promise<OtherUser> => {
    try { 
      const response = await axios.get(
        `http://localhost:8080/user/`+userId,  
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("유저 정보 가져오던 중 오류 발생:", error);
      throw error;
    }

  },
  getIntroUser: async (): Promise<IntroUser> => {
    // throw new Error("Unauthorized Error");
    try { 
      const response = await axios.get(
        `http://localhost:8080/user/intro`,  
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error("유저 정보 가져오던 중 오류 발생:", error);
      throw error;
    }

  },
  getSnsInfos: async (): Promise<SnsInfos> => {
    try { 
      const response = await axios.get(
        `http://localhost:8080/user/account`,  
        {
          withCredentials: true
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("유저 정보 가져오던 중 오류 발생:", error);
      throw error;
    }
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
    interestTags: number[];
  }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/user`, userData,
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
        `http://localhost:8080/user/notification`,  
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
        `http://localhost:8080/user/notification`,  
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
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/sns`, 
        {withCredentials: true}
      );
      return response.data;
    } catch (error) {
      console.error("알림 상태 가져오기 중 오류 발생:", error);
      throw error;
    }
  },
  patchSocialSetting: async (
    disableFollow: boolean,
    disableAccount: boolean,
    disableStoreSearch: boolean,
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/user/sns/setting`, 
        {
          disableFollow: disableFollow,
          disableAccount: disableAccount
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
  postVerify: async ({ email }: PostVerifyParams): Promise<PostVerifyResponse> => {
    try {
      console.log("요청1:");
      const response = await axios.post(`http://localhost:8080/user/verify`, 
        { 
          email:email // body임 
        },
        {
          withCredentials: true
        }
      );

      const postVerifyResponse: PostVerifyResponse = {
        success: false
      }
      
      if (response.status == 204){
        postVerifyResponse.success = true;
      }

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return postVerifyResponse;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  postVerifyCompare: async ({email, verifyCode}: PostVerifyCompareParams): Promise<void> => {
    try {
      const response = await axios.post(`http://localhost:8080/user/verify/compare`, 
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
  postVerifyCompareForPassowrd: async ({email, verifyCode}: PostVerifyCompareParams): Promise<boolean> => {
    try {
      const response = await axios.post(`http://localhost:8080/user/verify/compare/password`, 
        { 
          email:email,
          verifyCode: verifyCode
        },
        {
          withCredentials: true
        }
      );
      const isSuccess = response.status == 204 ? true : false;
      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return isSuccess;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  patchEmailWithVerify: async ({email, verifyCode}: PostVerifyCompareParams): Promise<void> => {
    try {
      const response = await axios.patch(`http://localhost:8080/user/verify/compare`, 
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
        throw new Error(error.message || "이메일 변경 API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  patchPassword: async({password, randomKey}: PatchPasswordParams)=> {
    try {
      const response = await axios.patch(`http://localhost:8080/user/password`, 
        { 
          password:password,       
          randomKey:randomKey,
        },
        {
          withCredentials: true
        }
      );

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return response;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  
  login: async ({email, password}: PostLoginParams): Promise<any> => {
    try {
      const response = await axios.post(`http://localhost:8080/user/login`, 
        { 
          email:email,
          password: password
        },
        {withCredentials: true}
      );

      // 응답 데이터 형식이 success와 message를 포함한다고 가정
      return response.data;
    } catch (error) {
      if( error instanceof Error){
        return error;
      }
      throw new Error("API 요청 실패");
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`http://localhost:8080/user/logout`, 
        {withCredentials: true}
      );

      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
  postUser: async ({email, password, isEnableEvent, isEnableNotification}: PostRegisterParams): Promise<any> => {
    try {
      const response = await axios.post(`http://localhost:8080/user`, 
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
      console.log(response);
      return response;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "회원가입 API 요청 실패");
      throw new Error("회원가입 API 요청 실패");
    }
  },
  postCheckRandomKey: async (email: string, randomKey: string): Promise<any> => {
    try {
      const response = await axios.post(`http://localhost:8080/user/password/randomkey`, 
        { 
          email: email,
          randomKey:randomKey,
        },
        {
          withCredentials: true
        }
      );

      return response;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "랜덤키 검사 API 요청 실패");
      throw new Error("랜덤키 검사 API 요청 실패");
    }
  },
  getMentionUsers: async (nickname: string): Promise<UsersMentionResponse> => {
    try {
      console.log(`멘션 검색 요청: ${nickname}`);
      
      // API 서버 사용 불가로 인한 임시 더미 데이터 사용
      // 실제 API가 복구되면 아래 주석 처리된 코드를 다시 활성화하세요
      const response = await axios.get(`http://localhost:8080/user/mention?nickname=`+nickname,
        {
          withCredentials: true
        }
      );
      return response.data;

    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "멘션 유저 호출 실패");
      throw new Error("멘션 유저 요청 실패");
    }
  },
  postFollowing: async (userId: number): Promise<UsersMentionResponse> => {
    try {
      const response = await axios.post(`http://localhost:8080/user/following/`+ userId, {},
        {
          withCredentials: true
        }
      );
      return response.data;
    
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "팔로우 호출 실패");
      throw new Error("팔로우 요청 실패");
    }
  },
  deleteFollowing: async (userId: number): Promise<UsersMentionResponse> => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/following/`+ userId,
        {
          withCredentials: true
        }
      );
      return response.data;
    
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "팔로우 호출 실패");
      throw new Error("팔로우 요청 실패");
    }
  },
  postFollowingAccept: async (notificationId: number): Promise<UsersMentionResponse> => {
    try {
      const response = await axios.post(`localhost:8081/user/following/accept/`+ notificationId,
        {
          withCredentials: true
        }
      );
      return response.data;
    
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "팔로우 호출 실패");
      throw new Error("팔로우 요청 실패");
    }
  },
  deleteUser: async (): Promise<boolean> => {
    try {
      const response = await axios.delete(`localhost:8080/user`, 
        {
          withCredentials: true
        }
      );

      return response.status == 204;
    } catch(error){
      if (error instanceof Error)
        throw new Error(error.message || "계정 삭제 실패");
      throw new Error("계정 삭제 실패");
    }
  },
};
