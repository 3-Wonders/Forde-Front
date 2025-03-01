import { useEffect, useMemo, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import { UserApi } from "@/api/user";
import Cookies from "js-cookie"; // 쿠키에서 sessionKey 가져오는 넘인데 왜자꾸 빨간줄이 뜨지? -> 찾아봐야함

import "./NoticeLayout.scss";

const NoticeLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();
  const [notifications, setNotifications] = useState<Record<number, boolean>>({});

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  // 초기 알림 설정 불러오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationData = await UserApi.getNotification();

        const data = [
          {
            notificationId: 1,
            title: "공지사항",
            description: "공지사항 알림을 받겠습니다.",
            isEnabled: notificationData.noticeNotification
          },
          {
            notificationId: 2,
            title: "댓글",
            description: "내가 쓴 글에 작성되는 댓글 알림을 받겠습니다.",
            isEnabled: notificationData.commentNotification
          },
          {
            notificationId: 3,
            title: "좋아요",
            description: "내가 쓴 글에 좋아요 알림을 받겠습니다.",
            isEnabled: notificationData.likeNotification
          },
          {
            notificationId: 4,
            title: "추천 뉴스 / 게시글",
            description: "Forde가 추천하는 뉴스와 게시글 알림을 받겠습니다.",
            isEnabled: notificationData.recommendNotification
          },
          {
            notificationId: 5,
            title: "팔로우 뉴스 / 게시글",
            description: "내가 팔로우한 사람의 뉴스와 게시글 알림을 받겠습니다.",
            isEnabled: notificationData.followNotification
          },
          {
            notificationId: 6,
            title: "이벤트성 알림",
            description: "Forde가 제공하는 이벤트성 알림을 받겠습니다.",
            isEnabled: notificationData.eventNotification
          }
        ];
        const initialNotifications: Record<number, boolean> = {};
        data.forEach((item: { notificationId: number; isEnabled: boolean }) => {
          initialNotifications[item.notificationId] = item.isEnabled;
        });
        setNotifications(initialNotifications);
      } catch (error) {
        console.error("알림 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchNotifications();
  }, []);

  // 토글 변경 시 API 호출
  const handleToggle = async (notificationId: number) => {
    try {
      const sessionKey = Cookies.get("sessionKey"); // 쿠키에서 sessionKey 가져오기
      if (!sessionKey) {
        console.error("세션 키 없음");
        return;
      }

      const newState = !notifications[notificationId]; // 토글 반전 시키기
      await setNotifications((prev) => ({ ...prev, [notificationId]: newState }));

      await UserApi.putNotification(
        notifications[1],
        notifications[2],
        notifications[3],
        notifications[4],
        notifications[5],
        notifications[6]
      );
    } catch (error) {
      console.error("알림 상태 변경 중 오류 발생:", error);
    }
  };

  return (
    <>
      {header}
      <div className="socialPageContainer">
        <div className="socialInner">
          <div className="socialLeftCard">
            <ul className="socialMenu">
              <li>소셜</li>
              <li className="active">알림</li>
            </ul>
          </div>

          <div className="socialCenterCard">
            <ul className="toggleList">
              {[
                { id: 1, title: "공지사항", desc: "공지사항 알림을 받겠습니다." },
                { id: 2, title: "댓글", desc: "내가 쓴 글에 작성되는 댓글 알림을 받겠습니다." },
                { id: 3, title: "좋아요", desc: "내가 쓴 글에 좋아요 알림을 받겠습니다." },
                { id: 4, title: "추천 뉴스 / 게시글", desc: "Forde가 추천하는 뉴스와 게시글 알림을 받겠습니다." },
                { id: 5, title: "팔로우 뉴스 / 게시글", desc: "내가 팔로우한 사람의 뉴스와 게시글 알림을 받겠습니다." },
                { id: 6, title: "이벤트 알림", desc: "Forde가 제공하는 이벤트성 알림을 받겠습니다." }
              ].map(({ id, title, desc }) => (
                <li key={id}>
                  <div className="toggleDescText">
                    <div className="toggleTitleText">{title}</div>
                    {desc}
                  </div>
                  <label className="toggleSwitch">
                    <input
                      type="checkbox"
                      checked={notifications[id] || false}
                      onChange={() => handleToggle(id)}
                    />
                    <span className="slider" />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeLayout;
