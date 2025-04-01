import { useMemo } from "react";
import { BoardApi } from "@/api/board";
import useWindowSize from "@/hooks/useWindowSize";
import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import React, { useState, useEffect } from "react";
import classes from "./OtherActiveLayout.module.scss";
import { UserApi } from "@/api/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryNavigation from "@/components/SubNavigation/CategoryNavigation/CategoryNavigation";

const ActivateLayout = () => {
  const tabeltSize = 992;
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const category = searchParams.get('category') || "news";

  // idParam이 없으면 즉시 리다이렉트
  useEffect(() => {
    if (!idParam) {
      navigate("/");
    }

  }, [idParam, navigate]);

  // idParam이 있을 때만 렌더링 진행
  if (!idParam) return null;

  // idParam을 바로 숫자로 변환하여 사용
  const userId = parseInt(idParam, 10);

  const header = useMemo(() => {
    return width > tabeltSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabeltSize]);

  const count = 5;

  const [isFollowing, setIsFollowing] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [nickname, setNickName] = useState("");
  const [description, setDescription] = useState("");
  const [boardCount, setBoardCount] = useState(0);
  const [profilePath, setProfilePath] = useState("");
  const [newsCount, setNewsCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleFollowClick = async () => {
    setIsAnimated(true);
    if (isFollowing) {
      await UserApi.deleteFollowing(userId);
    } else {
      await UserApi.postFollowing(userId);
    }
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    if (isAnimated) {
      const timer = setTimeout(() => {
        setIsAnimated(false);
      }, 400); // 애니메이션 시간(0.4s)에 맞춤
      return () => clearTimeout(timer);
    }
  }, [isAnimated]);

  // userId가 유효할 때만 사용자 정보를 가져옴
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserApi.getOneUser(userId);
        console.log(userData);
        setNickName(userData.nickname);
        setDescription(userData.description);
        setProfilePath(userData.profilePath);
        setBoardCount(userData.boardCount);
        setNewsCount(userData.newsCount);
        setLikeCount(userData.likeCount);
        setCommentCount(userData.commentCount);
        setFollowerCount(userData.followerCount);
        setFollowingCount(userData.followingCount);
        setIsPrivate(userData.isPrivate);
        setIsFollowing(userData.isFollowing);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // userId가 변경될 때마다 실행

  // 방법 1: 변수에 할당하여 사용
  const renderContent = () => {
    switch(category) {
      case 'board':
        return <InfinityScrollBoard 
          queryKey={["userBoards", count]}
          fetchFunction={BoardApi.fetchUserBoards}
          count={count}
          userId={userId}
        />;
      case 'comment':
        return <InfinityScrollBoard 
          queryKey={["userComment", count]}
          fetchFunction={BoardApi.fetchUserComments}
          count={count}
          userId={userId}
        />;
      case 'like':
        return <InfinityScrollBoard 
          queryKey={["userLikes", count]}
          fetchFunction={BoardApi.fetchUserLikes}
          count={count}
          userId={userId}
        />;
      case 'news':
        return <InfinityScrollBoard 
          queryKey={["userNews", count]}
          fetchFunction={BoardApi.fetchUserNews}
          count={count}
          userId={userId}
        />;
      default:
        return <InfinityScrollBoard 
          queryKey={["userNews", count]}
          fetchFunction={BoardApi.fetchUserNews}
          count={count}
          userId={userId}
        />;
    }
  };

  return (
    <>
      {header}
      <div className={classes.layout}>
        <div className={classes.left}>
          {/* <MyPageNavigation isActive={3} /> */}
        </div>
        <main className={classes.main}>
          <CategoryNavigation isOther={true} userId={userId} category={category}/>
          {renderContent()}
        </main>

        <div className={classes.right}>
          <div className={classes.profileRightCard}>
            <div className={classes.userHeader}>
              <img
                src={profilePath}
                alt="User"
                className={classes.userThumb}
              />
              <div className={classes.userText}>
                <h3 className={classes.userName}>{nickname}</h3>
                <p className={classes.userDesc}>
                  {description}
                </p>
              </div>
            </div>
            <div className={classes.userStatsGrid}>
              <div className={classes.statItem}>
                <span className={classes.statNumber}>{!isPrivate ? followerCount : "비공개"}</span>
                <span className={classes.statLabel}>팔로워</span>
              </div>
              <div className={classes.statItem}>
                <span className={classes.statNumber}>{!isPrivate ? followingCount : "비공개"}</span>
                <span className={classes.statLabel}>팔로잉</span>
              </div>
              <div className={classes.statItem}>
                <span className={classes.statNumber}>{!isPrivate ? boardCount : "비공개"}</span>
                <span className={classes.statLabel}>게시글</span>
              </div>
              <div className={classes.statItem}>
                <span className={classes.statNumber}>{!isPrivate ? newsCount : "비공개"}</span>
                <span className={classes.statLabel}>뉴스</span>
              </div>
              <div className={classes.statItem}>
                <span className={classes.statNumber}>{!isPrivate ? likeCount : "비공개"}</span>
                <span className={classes.statLabel}>좋아요한 게시글</span>
              </div>
              <div className={classes.statItem}>
                <span className={classes.statNumber}>{!isPrivate ? commentCount : "비공개"}</span>
                <span className={classes.statLabel}>댓글</span>
              </div>
            </div>
            <button
              className={`
                ${isFollowing ? classes.followingBtn : classes.followBtn}
                ${isAnimated ? classes.animated : ""}
              `}
              onClick={handleFollowClick}
            >
              {isFollowing ? "팔로잉" : "팔로우"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateLayout;
