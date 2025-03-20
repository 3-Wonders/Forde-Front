import { useEffect, useMemo, useState, useCallback } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import "./SocialLayout.scss";
import { UserApi } from "@/api/user";
import useAppStore from "@/stores/useAppStore"; // 전역 상태 관리 추가
import { debounce } from 'lodash'; // 디바운스를 위해 lodash 추가



// 검색 내역 관련 유틸리티 함수 추가
const clearSearchHistory = () => {
  localStorage.removeItem('searchHistory');
};

const SocialLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();
  const [disableFollow, setDisableFollow] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false);
  const [disableStoreSearch, setDisableStoreSearch] = useState(false);
  
  // 전역 상태에서 isLocalHistory 가져오기
  const { isLocalHistory, setIsLocalHistory } = useAppStore();

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const data = await UserApi.getSocialSetting();
        console.log("Acc : " + data.privateAccount);
        console.log("fol : " + data.disableFollow);
        setDisableAccount(data.privateAccount);
        setDisableFollow(data.disableFollow);
      
      } catch (error) {
        console.error("설정 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchSetting();
  }, []);

  // 1초 디바운스 걸기
  const debouncedApiCall = useCallback(
    debounce(async (follow, account, storeSearch) => {
      try {
        await UserApi.patchSocialSetting(follow, account, storeSearch);
        console.log("설정이 성공적으로 업데이트되었습니다.");
      } catch (error) {
        console.error("설정 업데이트 중 오류 발생:", error);
      }
    }, 1000), // 1초 디바운스
    []
  );

  const handleToggle = async (settingType: "follow" | "account" | "storeSearch") => {
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
      
      // 전역 상태의 isLocalHistory도 함께 업데이트 ( 마찬가지로 반대값 )
      setIsLocalHistory(!updatedStoreSearch);
    }

    debouncedApiCall(updatedFollow, updatedAccount, updatedStoreSearch);
  };

  const handleRemove = async() => {
    try {
      clearSearchHistory();
      
      alert("검색 기록이 삭제되었습니다.");
    } catch (error) {
      console.error("검색 기록 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      {header}
      <div className="socialPageContainer">
        <div className="socialInner">
          <div className="socialLeftCard">
            <ul className="socialMenu">
              <a href="/setting"><li className="active">
                소셜
              </li></a>
              <a href="/notice"><li>
                알림
              </li></a>
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
                    검색 기록 저장<br />
                  </div>
                  검색 기록을 저장하고 검색창에 표시합니다.
                </div>
                <label className="toggleSwitch">
                  <input 
                    type="checkbox" 
                    checked={!disableStoreSearch} 
                    onChange={() => handleToggle("storeSearch")}
                  />
                  <span className="slider" />
                </label>
              </li>
              <li>
                <div className="toggleDescText">
                  <div className="toggleTitleText">
                    검색 기록 삭제<br />
                  </div>
                  저장된 모든 검색 기록을 삭제합니다.
                </div>
                <button 
                  className="btnDelete" 
                  onClick={handleRemove}
                  disabled={disableStoreSearch} // 검색 기록 저장이 비활성화된 경우 버튼도 비활성화
                >
                  기록 삭제
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLayout;
