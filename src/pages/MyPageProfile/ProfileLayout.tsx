import { useMemo } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";

import "./ProfileLayout.scss";

const ProfileLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  return (
    <>
      {header}
      <div className="profilePageContainer">
        <div className="profileInner">
          <div className="profileLeftCard">
            <ul className="menuList">
              <li className="active">
                {/* 아이콘 넣어야함  */}
                프로필
              </li>
              <li>
                {/* 아이콘 넣어야함  */}
                계정 관리
              </li>
              <li>
                {/* 아이콘 넣어야함  */}
                활동 내역
              </li>
            </ul>
          </div>

          <div className="profileCenterCard">
            <div className="profileImageWrapper">
              <img
                src="https://via.placeholder.com/120"
                alt="profile"
                className="profileImage"
              />
              <button className="cameraBtn">
                <i className="icon-camera" />
              </button>
            </div>
            <div className="formGroup">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                defaultValue="윤우엔띠엔"
                placeholder="윤우엔띠엔"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="description">자기 소개</label>
              <textarea id="description" placeholder="자신을 소개해보세요." rows={5}/>
            </div>
            <div className="formGroup">
              <label>관심 있는 태그</label>
              <input
                type="text"
                placeholder="주력 기술 또는 관심 있는 기술을 입력해보세요."
              />
              <div className="tags">
                <span>#java</span>
                <span>#jsp</span>
              </div>
            </div>
            <button className="saveBtn">저장</button>
          </div>

          <div className="profileRightCard">
            <h2 className="cardTitle">내 정보</h2>
            <div className="userHeader">
              <img
                src="https://via.placeholder.com/60"
                alt="User"
                className="userThumb"
              />
              <div className="userText">
                <h3 className="userName">윤우엔띠엔</h3>
                <p className="userDesc">
                  저는 백엔드 개발자가 되고싶은 <strong>윤우엔띠엔</strong>입니다.
                </p>
              </div>
            </div>
            <div className="userStatsGrid">
              <div className="statItem">
                <span className="statNumber">1,202</span>
                <span className="statLabel">게시글</span>
              </div>
              <div className="statItem">
                <span className="statNumber">4,505</span>
                <span className="statLabel">뉴스</span>
              </div>
              <div className="statItem">
                <span className="statNumber">12,202</span>
                <span className="statLabel">좋아요한 게시글</span>
              </div>
              <div className="statItem">
                <span className="statNumber">34</span>
                <span className="statLabel">댓글</span>
              </div>
            </div>
            <button className="shareBtn">공유하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
