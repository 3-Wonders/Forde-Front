import { IntroUser, SnsInfos } from "@/types/user";

export const UserApi = {
  getIntroUser: async (): Promise<IntroUser> => {
    // throw new Error("Unauthorized Error");
    return {
      userId: 2,
      nickname: "김승용",
      email: "seungyong20@naver.com",
      profilePath: "https://avatars.githubusercontent.com/u/77449569?v=4",
    };
  },
  getSnsInfos: async (): Promise<SnsInfos> => {
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
  logout: async () => {
    console.log("logout");
  },
};
