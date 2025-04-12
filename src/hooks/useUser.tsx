import { useCallback } from "react";
import { Loadable, useRecoilValueLoadable, useSetRecoilState, useRecoilValue } from "recoil";
import { userState, userRefreshTriggerState } from "@/recoil/user/atoms";
import { getIntroUser } from "@/recoil/user/selectors";

import { IntroUser, PostLoginParams } from "@/types/user";

import { UserApi } from "@/api/user";

const useUser = () => {
  const userLoadable: Loadable<IntroUser | null> = useRecoilValueLoadable(getIntroUser);
  const isLoaded: boolean = userLoadable.state === "hasValue";
  const error: { message: string | null; isError: boolean } =
    userLoadable.state === "hasError"
      ? { message: userLoadable.contents, isError: true }
      : { message: null, isError: false };
  const user: IntroUser | null = userLoadable.state === "hasValue" ? userLoadable.contents : null;

  const setUser = useSetRecoilState(userState);

  const setRefreshTrigger = useSetRecoilState(userRefreshTriggerState);

  // 사용자 정보 리프레시 함수
  const refreshUser = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [setRefreshTrigger]);

  // 로그인 함수
  const login = useCallback(async (credentials: PostLoginParams) => {
    try {
      const response = await UserApi.login(credentials);
      // 로그인 성공 후 사용자 정보 리프레시
      refreshUser();
      return response;
    } catch (error) {
      throw error;
    }
  }, [refreshUser]);

  // 로그아웃 함수
  const logout = useCallback(async () => {
    try {
      await UserApi.logout();
      setUser(null);
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  }, [setUser]);

  return {
    user,
    isLoaded,
    error,
    login,
    logout,
    refreshUser,
  };
};

export default useUser;
