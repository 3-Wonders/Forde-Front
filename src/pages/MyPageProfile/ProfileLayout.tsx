import { useEffect, useMemo, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";

import "./ProfileLayout.scss";

import { UserApi } from "@/api/user";

import MyPageNavigation from "@/components/SubNavigation/MyPageNavigation/MyPageNavigation";
import { List } from "@mui/material";

const ProfileLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  const [nickname, setNickName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePath, setProfilePath] = useState("");
  const [interestTags, setInterestTags] = useState<Record<string, string>>({});
  const [boardCount, setBoardCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [newTag, setNewTag] = useState(""); // 입력한 새 태그 값

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserApi.getUser();
        console.log(userData);
        setNickName(userData.nickname);
        setDescription(userData.description);
        setProfilePath(userData.profilePath);
        setBoardCount(userData.boardCount);
        setNewsCount(userData.newsCount);
        setLikeCount(userData.likeCount);
        setCommentCount(userData.commentCount);

        const tags: Record<string, string> = {};
        if (userData.interestedTags.length > 0)
          for (const tag of userData.interestedTags) {
            tags[tag.tagName] = tag.tagName;
          }

        setInterestTags(tags);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생", error);
      }
    };

    fetchUserData();
  }, []);

  const handleTagInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      const tagValue = newTag.trim();
      if (interestTags[tagValue]) {
        alert("이미 추가된 태그입니다.");
        setNewTag("");
        return;
      }

      try {
        // await UserApi.PostTag({ tagName: tagValue }); // API 호출
        setInterestTags((prevTags) => ({
          ...prevTags,
          [tagValue]: tagValue,
        }));
        setNewTag(""); // 입력창 초기화 해주는게 맞겠지?
      } catch (error) {
        console.error("태그 추가 중 오류 발생", error);
      }
    }
  };

  // 저장 버튼 클릭 시 API 호출
  const handleSave = async () => {
    try {
      await UserApi.updateUser({
        nickname,
        description,
        interestTags: [1]
      });
      alert("프로필이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {header}
      <div className="profilePageContainer">
        <div className="profileInner">
          
        <MyPageNavigation isActive={1} />

          <div className="profileCenterCard">
            <div className="profileImageWrapper">
              <img
                src={profilePath}
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
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="description">자기 소개</label>
              <textarea 
                id="description" 
                placeholder="자신을 소개해보세요." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </div>
            <div className="formGroup">
              <label>관심 있는 태그</label>
              <input
                type="text"
                placeholder="주력 기술 또는 관심 있는 기술을 입력해보세요."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagInput}
              />
              <div className="tags">
                {Object.values(interestTags).map((tag, index) => (
                  <span key={index}>#{tag}</span>
                ))}
              </div>
            </div>
            <button className="saveBtn" onClick={handleSave}>저장</button>
          </div>

          <div className="profileRightCard">
            <h2 className="cardTitle">내 정보</h2>
            <div className="userHeader">
              <img
                src={profilePath}
                alt="User"
                className="userThumb"
              />
              <div className="userText">
                <h3 className="userName">{nickname}</h3>
                <p className="userDesc">
                  {description}
                </p>
              </div>
            </div>
            <div className="userStatsGrid">
              <div className="statItem">
                <span className="statNumber">{boardCount}</span>
                <span className="statLabel">게시글</span>
              </div>
              <div className="statItem">
                <span className="statNumber">{newsCount}</span>
                <span className="statLabel">뉴스</span>
              </div>
              <div className="statItem">
                <span className="statNumber">{likeCount}</span>
                <span className="statLabel">좋아요한 게시글</span>
              </div>
              <div className="statItem">
                <span className="statNumber">{commentCount}</span>
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
