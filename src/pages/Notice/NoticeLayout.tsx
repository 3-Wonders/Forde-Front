import { useEffect, useMemo, useState, useCallback } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import { UserApi } from "@/api/user";
import "./NoticeLayout.scss";

const NOTIFICATION_ITEMS = [
  { id: 1, title: "공지사항", desc: "공지사항 알림을 받겠습니다." },
  { id: 2, title: "댓글", desc: "내가 쓴 글에 작성되는 댓글 알림을 받겠습니다." },
  { id: 3, title: "좋아요", desc: "내가 쓴 글에 좋아요 알림을 받겠습니다." },
  { id: 4, title: "추천 뉴스 / 게시글", desc: "Forde가 추천하는 뉴스와 게시글 알림을 받겠습니다." },
  { id: 5, title: "팔로우 뉴스 / 게시글", desc: "내가 팔로우한 사람의 뉴스와 게시글 알림을 받겠습니다." },
  { id: 6, title: "이벤트 알림", desc: "Forde가 제공하는 이벤트성 알림을 받겠습니다." }
];

// 디바운스 함수
function useDebounce(callback, delay) {
  const [timer, setTimer] = useState(null);

  const debouncedFunction = useCallback((...args) => {
    if (timer) clearTimeout(timer);
    
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimer(newTimer);
    
    return () => {
      if (newTimer) clearTimeout(newTimer);
    };
  }, [callback, delay, timer]);

  return debouncedFunction;
}

const NoticeLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();
  const [notifications, setNotifications] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [pendingToggles, setPendingToggles] = useState<Record<number, boolean>>({});
  
  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  // API 호출 함수
  const updateNotificationsApi = async (updatedNotifications: boolean[]) => {
    try {
      await UserApi.putNotification(
        updatedNotifications[1],
        updatedNotifications[2],
        updatedNotifications[3],
        updatedNotifications[4],
        updatedNotifications[5],
        updatedNotifications[6]
      );
      
      // API 호출 성공 시 pending 상태 초기화
      setPendingToggles({});
    } catch (error) {
      console.error("알림 상태 변경 중 오류 발생:", error);
      
      // 오류 발생 시 상태 롤백
      setNotifications(prev => {
        const rollback = { ...prev };
        Object.keys(pendingToggles).forEach(id => {
          rollback[id] = !pendingToggles[id];
        });
        return rollback;
      });
      
      setPendingToggles({});
    }
  };

  // 디바운스된 API 호출
  const debouncedApiCall = useDebounce(updateNotificationsApi, 1000);

  // 초기 알림 설정 불러오기
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const notificationData = await UserApi.getNotification();

        const mappings = [
          { id: 1, key: 'noticeNotification' },
          { id: 2, key: 'commentNotification' },
          { id: 3, key: 'likeNotification' },
          { id: 4, key: 'recommendNotification' },
          { id: 5, key: 'followNotification' },
          { id: 6, key: 'eventNotification' }
        ];

        const initialNotifications: Record<number, boolean> = {};
        mappings.forEach(({ id, key }) => {
          initialNotifications[id] = notificationData[key];
        });
        
        setNotifications(initialNotifications);
      } catch (error) {
        console.error("알림 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 토글 변경 시 디바운스 API 호출
  const handleToggle = (notificationId: number) => {
    // 새로운 상태 계산
    const newState = !notifications[notificationId];
    
    // 새로운 전체 상태 객체 생성
    const updatedNotifications = {
      ...notifications,
      [notificationId]: newState
    };
    
    // UI 먼저 업데이트
    setNotifications(updatedNotifications);
    
    // 대기 중인 토글 상태 업데이트
    setPendingToggles(prev => ({
      ...prev,
      [notificationId]: newState
    }));
    
    // 디바운스된 API 호출
    debouncedApiCall(updatedNotifications);
  };

  // 대기 중인 토글이 있는지 확인
  const hasPendingToggles = Object.keys(pendingToggles).length > 0;

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
            {isLoading ? (
              <div className="loading">알림 설정을 불러오는 중...</div>
            ) : (
              <>
                {hasPendingToggles && (
                  <div className="savingIndicator"></div>
                )}
                <ul className="toggleList">
                  {NOTIFICATION_ITEMS.map(({ id, title, desc }) => {
                    const isPending = id in pendingToggles;
                    
                    return (
                      <li key={id}>
                        <div className="toggleDescText">
                          <div className="toggleTitleText">{title}</div>
                          {desc}
                        </div>
                        <label className={`toggleSwitch ${isPending ? 'pending' : ''}`}>
                          <input
                            type="checkbox"
                            checked={notifications[id] || false}
                            onChange={() => handleToggle(id)}
                          />
                          <span className="slider" />
                          {isPending && <span className="togglePending"></span>}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeLayout;
