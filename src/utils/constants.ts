export const NotificationTypeInfo = {
  NOTICE: "1001",
  COMMENT: "1002",
  LIKE: "1003",
  FOLLOW: "1004",
  RECOMMEND: "1005",
  EVENT: "1006",
} as const;

export const SnsKindEnum = {
  KAKAO: "1001",
  NAVER: "1002",
  GOOGLE: "1003",
  GITHUB: "1004",
} as const;

export const SnsNameEnum = {
  KAKAO: "kakao",
  NAVER: "naver",
  GOOGLE: "google",
  GITHUB: "github",
} as const;


export type SnsKind = (typeof SnsKindEnum)[keyof typeof SnsKindEnum];

export const SessionStorageKey = {
  SUCCESS_REDIRECT_STATE: "SUCCESS_REDIRECT_STATE",
  FAILED_REDIRECT_STATE: "FAILED_REDIRECT_STATE",
};

export const ErrorCode = {
  // 400: Bad Request
  BAD_REQUEST: "B40000",
  EXPIRED_VERIFIED_EMAIL: "B40001",
  NOT_MATCHED_VERIFIED_CODE: "B40002",
  BROKEN_IMAGE: "B40003",
  EXPIRED_RANDOM_KEY: "B40004",
  NOT_FOUND_RANDOM_KEY: "B40005",
  TOO_MANY_DRAFT: "B40006",
  BAD_REQUEST_TAG: "B40007",
  BAD_REQUEST_IMAGE: "B40008",
  INVALID_MENTION: "B40009",
  INVALID_SOCIAL_TYPE: "B40010",
  NOT_QUESTION_BOARD: "B40011",
  BAD_REQUEST_ALREADY_ADOPTED: "B40012",
  CAN_NOT_LOG_MY_BOARD: "B40013",
  ALREADY_FOLLOW: "B40014",
  NOT_NOTIFICATION_TYPE_FOLLOW: "B40015",

  // 401: Unauthorized
  NOT_MATCHED_LOGIN_INFO: "U40101",
  EXPIRED_COOKIE: "U40102",
  BLANK_COOKIE: "U40103",

  // 403: Forbidden
  DELETED_USER: "F40301",
  NOT_VERIFIED_USER: "F40302",
  DISABLED_FOLLOWING: "F40303",
  PRIVATE_ACCOUNT: "F40304",
  NOT_MATCHED_BOARD_UPLOADER: "F40305",
  NOT_MATCHED_COMMENT_UPLOADER: "F40306",
  NOT_MATCHED_DRAFT: "F40307",
  NOT_MATCHED_COMMENT_BOARD: "F40308",
  DELETED_COMMENT: "F40309",
  NOT_MATCHED_RANDOM_KEY: "F40310",

  // 404: Not Found
  NOT_FOUND_USER: "N40401",
  NOT_FOUND_VERIFIED_EMAIL: "N40402",
  NOT_FOUND_BOARD: "N40403",
  NOT_FOUND_COMMENT: "N40404",
  NOT_FOUND_SNS_ID: "N40405",
  NOT_FOUND_SNS_ACCOUNT: "N40406",
  NOT_FOUND_SNS_PROFILE: "N40407",
  NOT_FOUND_SNS_NAME: "N40408",
  NOT_FOUND_DRAFT: "N40409",
  NOT_FOUND_NOTIFICATION: "N40410",
  NOT_FOUND_FOLLOW: "N40411",

  // 409: Conflict
  DUPLICATED_NICKNAME: "C40901",
  DUPLICATED_EMAIL: "C40902",
  DUPLICATED_SNS_ACCOUNT: "C40903",
  ALREADY_ADOPTED_COMMENT: "C40904",

  // 500: Internal Server Error
  INTERNAL_SERVER_ERROR: "I50000",
  ERROR_EMAIL_SENDER: "I50001",
  ERROR_FILE_UPLOAD: "I50002",
  ERROR_REDIS: "I50003"
} as const;

// 타입 안전성을 위한 타입 정의
export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];

// 에러 코드에 따른 메시지 정의
export const ErrorMessage: Record<ErrorCodeType, string> = {
  // 400: Bad Request
  B40000: "잘못된 요청입니다. 필수 정보를 확인해주세요.",
  B40001: "인증 시간이 만료된 이메일입니다.",
  B40002: "인증 번호가 일치하지 않습니다.",
  B40003: "이미지가 깨져있거나 존재하지 않습니다.",
  B40004: "변경 시간이 만료된 랜덤키입니다.",
  B40005: "해당 랜덤키가 존재하지 않습니다.",
  B40006: "임시 저장 글은 최대 10개까지만 가능합니다.",
  B40007: "잘못된 태그 입력입니다.",
  B40008: "잘못된 이미지 입력입니다.",
  B40009: "내용 안에 멘션의 정보가 존재하지 않습니다.",
  B40010: "지원하지 않는 SNS 형식입니다.",
  B40011: "질문 게시글이 아닙니다.",
  B40012: "채택된 댓글은 삭제할 수 없습니다.",
  B40013: "자신의 게시글에는 로그를 남길 수 없습니다.",
  B40014: "이미 팔로우된 유저입니다.",
  B40015: "팔로우 타입의 알림이 아닙니다.",

  // 401: Unauthorized
  U40101: "이메일 또는 비밀번호가 일치하지 않습니다.",
  U40102: "유효하지 않은 쿠키 또는 토큰입니다.",
  U40103: "쿠키 또는 토큰이 없습니다.",

  // 403: Forbidden
  F40301: "삭제된 사용자입니다.",
  F40302: "이메일 인증되지 않은 사용자입니다.",
  F40303: "팔로잉 요청이 막혀있습니다.",
  F40304: "비공개 계정입니다.",
  F40305: "게시글 작성자가 아닙니다.",
  F40306: "댓글 작성자가 아닙니다.",
  F40307: "다른 사용자의 임시 저장을 요청할 수 없습니다.",
  F40308: "해당 게시글의 댓글이 아닙니다.",
  F40309: "삭제된 댓글입니다.",
  F40310: "랜덤키가 일치하지 않습니다.",

  // 404: Not Found
  N40401: "사용자가 존재하지 않습니다.",
  N40402: "인증을 요청한 이메일이 존재하지 않습니다.",
  N40403: "게시글이 존재하지 않습니다.",
  N40404: "댓글이 존재하지 않습니다.",
  N40405: "SNS ID가 존재하지 않습니다.",
  N40406: "SNS 정보가 존재하지 않습니다.",
  N40407: "SNS 사용자 프로필 정보가 존재하지 않습니다.",
  N40408: "SNS 사용자 이름이 존재하지 않습니다.",
  N40409: "임시 저장이 존재하지 않습니다.",
  N40410: "알림이 존재하지 않습니다.",
  N40411: "팔로우가 되어있지 않습니다.",

  // 409: Conflict
  C40901: "이미 사용 중인 닉네임입니다.",
  C40902: "이미 사용 중인 이메일입니다.",
  C40903: "이미 연결된 SNS 계정입니다.",
  C40904: "이미 채택된 답변이 존재합니다.",

  // 500: Internal Server Error
  I50000: "서버 오류가 발생했습니다.",
  I50001: "이메일 전송 중 오류가 발생했습니다.",
  I50002: "파일 업로드 중 오류가 발생했습니다.",
  I50003: "Redis 오류가 발생했습니다."
};

