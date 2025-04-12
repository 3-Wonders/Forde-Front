// import { selector } from "recoil";

// import { IntroUser } from "@/types/user";

// import { UserApi } from "@/api/user";

// export const getIntroUser = selector({
//   key: "getUserIntro",
//   get: async (): Promise<IntroUser | null> => {
//     return await UserApi.getIntroUser();
//   },
// });
// recoil/user/selectors.ts
import { selector } from "recoil";
import { userState, userRefreshTriggerState } from "./atoms";
import { UserApi } from "@/api/user";
import { IntroUser } from "@/types/user";

export const getIntroUser = selector<IntroUser | null>({
  key: "getIntroUser",
  get: async ({ get }) => {
    // 리프레시 트리거 값을 가져와서 의존성으로 사용
    get(userRefreshTriggerState);
    
    try {
      // 현재 저장된 사용자 정보
      const currentUser = get(userState);
      
      // 사용자 정보가 없거나 리프레시가 필요한 경우 API 호출
      const response = await UserApi.getIntroUser();
      return response;
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      return null;
    }
  },
});
