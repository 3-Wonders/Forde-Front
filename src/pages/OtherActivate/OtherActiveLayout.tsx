
import { useMemo } from "react";


import { BoardApi } from "@/api/board";

import useWindowSize from "@/hooks/useWindowSize";
import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import React, { useState,useEffect  } from "react";

import classes from "./OtherActiveLayout.module.scss";

import { UserApi } from "@/api/user";
const ActivateLayout = () => {
  const tabeltSize = 992;

  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabeltSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabeltSize]);

  const count = 5;

  const [isFollowing, setIsFollowing] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleFollowClick = () => {
    setIsAnimated(true);
    if ( isFollowing ){
      UserApi.postFollowing(1); // userId 받아와야함
    } else {
      UserApi.deleteFollowing(1);
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

    const [nickname, setNickName] = useState("");
    const [description, setDescription ] = useState("");
    const [boardCount, setBoardCount ] = useState(0);
    const [profilePath, setProfilePath] = useState("");
    const [newsCount, setNewsCount ] = useState(0);
    const [likeCount, setLikeCount ] = useState(0);
    const [commentCount, setCommentCount ] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isPrivate, setIsPrivate] = useState(false);
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userData = await UserApi.getOneUser(1);
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
  
          } catch (error) {
            console.error("사용자 정보를 불러오는 중 오류 발생", error);
          }
        };
    
        fetchUserData();
      }, []);

  return (
    <>
      {header}
      <div className={classes.layout}>
        <div className={classes.left}>
          {/* <MyPageNavigation isActive={3} /> */}
        </div>
        <main className={classes.main}>
            <InfinityScrollBoard
                queryKey={["recentBoards", count]}
                fetchFunction={BoardApi.fetchRecentBoardAndNews}
                count={count}
            />
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
                  <span className={classes.statNumber}>{isPrivate ? followerCount : "비공개"}</span>
                  <span className={classes.statLabel}>팔로워</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>{isPrivate ? followingCount : "비공개"}</span>
                  <span className={classes.statLabel}>팔로잉</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>{isPrivate ? boardCount : "비공개"}</span>
                  <span className={classes.statLabel}>게시글</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>{isPrivate ? newsCount : "비공개"}</span>
                  <span className={classes.statLabel}>뉴스</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>{isPrivate ? likeCount : "비공개"}</span>
                  <span className={classes.statLabel}>좋아요한 게시글</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>{isPrivate ? commentCount : "비공개"}</span>
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