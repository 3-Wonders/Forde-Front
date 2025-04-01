import { Tag } from "./tag";

export type User = {
  userId: number;
  nickname: string;
  description: string;
  profilePath: string;
  interestedTags: Tag[];
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
  isFollowing: boolean;
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

export interface UserNotificationResponse {
  userId: number;
  noticeNotification: boolean;
  commentNotification: boolean;
  likeNotification: boolean;
  recommendNotification: boolean;
  followNotification: boolean;
  eventNotification: boolean;
}


export interface SocialSetting {
  disableFoolow: boolean;
  disableAccount: boolean;
  disableStoreSearch: boolean;
}

export interface PostVerifyResponse {
  success: boolean;
}

export interface PostVerifyParams {
  email: string;
}
export interface PostVerifyCompareParams {
  email: string;
  verifyCode: string;
}

export interface PostLoginParams {
  email: string;
  password: string;
}

export interface PatchPasswordParams {
  password: string;
  randomKey: string;
}

export interface PostRegisterParams {
  email: string;
  password: string;
  isEnableNotification: boolean;
  isEnableEvent: boolean;
}

export interface MentionUser  {
  nickname: string;
  userId: number;
  profilePath: string;
}

export interface UsersMentionResponse  {
  users: MentionUser[];
}

