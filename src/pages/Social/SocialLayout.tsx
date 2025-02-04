import { useEffect, useMemo, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import "./SocialLayout.scss";
import { UserApi } from "@/api/user";
import Cookies from "js-cookie"; // 쿠키에서 sessionKey 가져오는 넘인데 왜자꾸 빨간줄이 뜨지? -> 찾아봐야함

const SocialLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();
  const [disableFollow, setDisableFollow] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false);
  const [disableStoreSearch, setDisableStoreSearch] = useState(false);

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);


  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const sessionKey = Cookies.get("sessionKey"); // 쿠키에서 sessionKey 가져오기
        const data = await UserApi.getSocialSetting(sessionKey);
       
        setDisableAccount(data.disableAccount);
        setDisableFollow(data.disableFollow);
        setDisableStoreSearch(data.disableStoreSearch);


      } catch (error) {
        console.error("설정 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchSetting();
  }, []);

   const handleToggle = async (settingType: "follow" | "account" | "storeSearch") => {
    try {
      const sessionKey = Cookies.get("sessionKey");
      if (!sessionKey) {
        console.error("세션 키 없음");
        return;
      }

      let updatedFollow = disableFollow;
      let updatedAccount = disableAccount;
      let updatedStoreSearch = disableStoreSearch;

      if (settingType === "follow") {
        updatedFollow = !disableFollow;
        setDisableFollow(updatedFollow);
      } else if (settingType === "account") {
        updatedAccount = !disableAccount;
        setDisableAccount(updatedAccount);
      } else if (settingType === "storeSearch") {
        updatedStoreSearch = !disableStoreSearch;
        setDisableStoreSearch(updatedStoreSearch);
      }

      await UserApi.patchSocialSetting(sessionKey, updatedFollow, updatedAccount, updatedStoreSearch);
    } catch (error) {
      console.error("설정 업데이트 중 오류 발생:", error);
    }
  };

  const handleRemove = async() => {
    
    const sessionKey = Cookies.get("sessionKey");
    if (!sessionKey) {
      console.error("세션 키 없음");
      return;
    }

    UserApi.deleteSearchHistory(sessionKey);

  };

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
                  <input type="checkbox" checked={disableFollow} onChange={() => handleToggle("follow")}/>
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
                  <input type="checkbox" checked={disableAccount} onChange={() => handleToggle("account")} />
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
                  <input type="checkbox" checked={disableStoreSearch} onChange={() => handleToggle("storeSearch")}/>
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
                <button className="btnDelete" onClick={() => handleRemove()} >기록 삭제</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
