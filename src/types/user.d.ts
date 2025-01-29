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
