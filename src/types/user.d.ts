import { Tag } from "./tag";

export type User = {
  userId: number;
  nickname: string;
  description: string;
  profilePath: string;
  interestTags: Tag[];
  boardCount: number;
  newsCount: number;
  likeCount: number;
  commentCount: number;
};

export type OtherUser = {
  userId: number;
  nickname: string;
  description: string;
  profilePath: string;
  followerCount: number;
  followingCount: number;
  boardCount: number;
  newsCount: number;
  likeCount: number;
  commentCount: number;
  isPrivate: boolean;
};

export type SnsInfo = {
  snsKind: number;
  snsName: string;
  isConnect: boolean;
}

export type IntroUser = Pick<User, "userId" | "nickname" | "profilePath"> & {
  email: string;
};

export type Uploader = Pick<User, "userId" | "nickname" | "profilePath">;

export type SnsInfos = Pick<User, "userId"> & {
  email: string;
  snsInfos: SnsInfo[];
};

export interface Notification {
  notificationId: number;
  title: string;
  description: string;
  isEnabled: boolean;
}

export interface SocialSetting {
  disableFoolow: boolean;
  disableAccount: boolean;
  disableStoreSearch: boolean;
}

export interface PostVerifyResponse {
  success: boolean;
  message: string;
}

export interface PostVerifyParams {
  email: string;
}

export interface PatchPasswordParams {
  password: string;
  randomKey: string;
}