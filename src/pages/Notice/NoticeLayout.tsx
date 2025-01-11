import { useMemo } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import "./NoticeLayout.scss";

const SocialLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  return (
    <>
      {header}
      <div className="socialPageContainer">
        <div className="socialInner">
          <div className="socialLeftCard">
            <ul className="socialMenu">
              <li>
                소셜
              </li>
              <li className="active">
                알림
              </li>
            </ul>
          </div>

          <div className="socialCenterCard">
            <ul className="toggleList">
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  공지사항<br />
                </div>
                  공지사항 알림을 받겠습니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  댓글
                </div>
                  내가 쓴 글에 작성되는 댓글 알림을 받겠습니다..
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  좋아용<br />
                </div>
                  내가 쓴 글에 좋아요 알림을 받겠습니다..
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  추천 뉴스 / 게시글<br />
                </div>
                  Forde가 추천하는 뉴스와 게시글 알림을 받겠습니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  팔로우 뉴스 / 게시글<br />
                </div>
                  내가 팔로우한 사람의 뉴스와 게시글 알림을 받겠습니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  좋아용<br />
                </div>
                  Forde가 제공하는 이벤트성 알림을 받겠습니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
