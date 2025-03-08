import { Notifications } from "@/types/notification";
import axios from "axios";

export const NotificationApi = {
  getNotifications: async ({ page, count }: { page: number; count: number }) => {
    console.log("notifications", page, count);
    
    try {
      const response = await axios.get(`http://localhost:8080/notification?page=`+page+`&count=`+count, 
        {withCredentials: true}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
    
    const notifications: Notifications = {
      notifications: [
        {
          notificationId: 1,
          notificationType: "1001",
          sender: {
            userId: 1,
            username: "user1",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 1,
            title: "공지사항 제목 1",
          },
          isRead: false,
          createdTime: "2024-08-14 10:52:00",
        },
        {
          notificationId: 2,
          notificationType: "1002",
          sender: {
            userId: 2,
            username: "user2",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 2,
            title: "비트코인 지금 사야할 때인가? 가장 중요한 지표 알려드리겠습니다.",
          },
          isRead: false,
          createdTime: "2024-07-03 10:52:00",
        },
        {
          notificationId: 3,
          notificationType: "1003",
          sender: {
            userId: 3,
            username: "user3",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 3,
            title: "개발자의 필수 역량",
          },
          isRead: true,
          createdTime: "2023-08-14 10:52:00",
        },
        {
          notificationId: 4,
          notificationType: "1004",
          sender: {
            userId: 4,
            username: "user4",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 4,
            title: "개발자의 필수 역량",
          },
          isRead: true,
          createdTime: "2023-08-14 10:52:00",
        },
        {
          notificationId: 5,
          notificationType: "1005",
          sender: {
            userId: 5,
            username: "user5",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 5,
            title: "개발자의 필수 역량",
          },
          isRead: true,
          createdTime: "2023-08-14 10:52:00",
        },
      ],
      total: 11,
    };

    return notifications;
  },
  getUnReadCount: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notification/following/count`, 
        {withCredentials: true}
      );
      console.log("uRC : " + response.data.unReadCount);
      return response.data.unReadCount;
    } catch (error) {
      if( error instanceof Error)
        throw new Error(error.message || "API 요청 실패");
      throw new Error("API 요청 실패");
    }
  },
};
