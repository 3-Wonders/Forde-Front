
import { useMemo } from "react";


import { BoardApi } from "@/api/board";

import useWindowSize from "@/hooks/useWindowSize";
import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import React, { useState,useEffect  } from "react";

import classes from "./OtherActiveLayout.module.scss";

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
                  src="https://monthly.chosun.com/up_fd/Mdaily/2017-09/bimg_thumb/2017042000056_0.jpg"
                  alt="User"
                  className={classes.userThumb}
                />
                <div className={classes.userText}>
                  <h3 className={classes.userName}>윤우엔띠엔</h3>
                  <p className={classes.userDesc}>
                    저는 백엔드 개발자가 되고싶은 <strong>윤우엔띠엔</strong>입니다.
                  </p>
                </div>
              </div>
              <div className={classes.userStatsGrid}>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>865,250</span>
                  <span className={classes.statLabel}>팔로워</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>1</span>
                  <span className={classes.statLabel}>팔로잉</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>1,202</span>
                  <span className={classes.statLabel}>게시글</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>4,505</span>
                  <span className={classes.statLabel}>뉴스</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>12,202</span>
                  <span className={classes.statLabel}>좋아요한 게시글</span>
                </div>
                <div className={classes.statItem}>
                  <span className={classes.statNumber}>34</span>
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