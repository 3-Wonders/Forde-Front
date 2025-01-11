import { useMemo } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import "./SocialLayout.scss";

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
              <li className="active">
                소셜
              </li>
              <li>
                알림
              </li>
            </ul>
          </div>

          <div className="socialCenterCard">
            <ul className="toggleList">
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  팔로우 차단<br />
                </div>
                  다른 사람의 팔로우 요청을 받지 않겠습니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  비공개 계정
                </div>
                  다른 사람에게 계정을 공개하지 않습니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  검색 기록<br />
                </div>
                  검색 기록을 저장합니다.
                </div>
                <label className="toggleSwitch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider" />
                </label>
              </li>
              <li>
              <div className="toggleDescText">
                <div className="toggleTitleText">
                  검색 기록 삭제<br />
                </div>
                  검색 기록을 삭제합니다.
                </div>
                <button className="btnDelete">기록 삭제</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
