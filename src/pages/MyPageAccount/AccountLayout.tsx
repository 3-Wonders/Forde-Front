import { useCallback, useEffect, useMemo, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import "./AccountLayout.scss";

import GithubIcon from "@/assets/github.svg";
import GoogleIcon from "@/assets/google-color.svg";
import NaverIcon from "@/assets/naver.svg";
import KakaoIcon from "@/assets/kakao.svg";

import { UserApi } from "@/api/user";

import MyPageNavigation from "@/components/SubNavigation/MyPageNavigation/MyPageNavigation";
import { SnsNameEnum } from "@/utils/constants";
import { useLocation } from "react-router-dom";

import { SessionStorageKey } from "@/utils/constants";

const AccountLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  const [email, setEmail] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, boolean>>({});


  const [newEmail, setNewEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const googleClientId: string = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID, []);
  const googleRedirectUri: string = useMemo(() => import.meta.env.VITE_GOOGLE_REDIRECT_URI, []);

  
  const location = useLocation();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserApi.getIntroUser();
        const userSnsData = await UserApi.getSnsInfos();
        setEmail(userData.email);
        const links: Record<string, boolean> = {};
        for (const sns of userSnsData.snsInfos) {
          links[sns.snsName.toLowerCase()] = sns.isConnect;
        }
  
        setSocialLinks(links);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEmailChange = async () => {
    try {
      // await updateEmail(newEmail);
      alert("이메일이 변경되었습니다.");
      setEmail(newEmail);
      setNewEmail("");
    } catch (error) {
      alert("이메일 변경 실패 :: "+error);
    }
  };

    const handleGoogle = useCallback(() => {
  
      sessionStorage.setItem(SessionStorageKey.FAILED_REDIRECT_STATE, location.pathname);
  
      const googleUrl = googleRedirectUri;
  
      window.location.href = googleUrl;
    }, [googleClientId, googleRedirectUri, location.pathname]);

  const handleSocialLink = async (snsName: string) => {
    try {
      const isConnect = socialLinks[snsName];
  
      if (isConnect) {
        // await unlinkSocialAccount(snsKind);
        alert(`${snsName} 연동 해제`);
      } else {
        // await linkSocialAccount(snsKind);
        switch (snsName) {
          case SnsNameEnum.KAKAO:
            handleGoogle();
            break;
          case SnsNameEnum.NAVER:
            handleGoogle();
            break;
          case SnsNameEnum.GOOGLE:
            handleGoogle();
            break;
          case SnsNameEnum.GITHUB:
            handleGoogle();
            break;
        }
        alert(`${snsName} 연동 완료`);
      }
  
      // setSocialLinks((prev) => ({
      //   ...prev,
      //   [snsName]: { ...prev[snsName], isConnect: !isConnect },
      // }));
    } catch (error) {
      alert(`${snsName} 연동 처리 중 오류 :: ` + error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!agreed) {
      alert("계정 삭제에 동의해야 합니다.");
      return;
    }

    try {
      setIsDeleting(true);
      // await deleteAccount();
      alert("계정이 삭제되었습니다.");
      // 로그아웃 또는 리디렉션 처리
    } catch (error) {
      alert("계정 삭제 실패 :: " + error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {header}
      <div className="accountPageContainer">
        <div className="accountInner">
        <MyPageNavigation isActive={2} />

          <div className="accountCenterCard">
            <div className="sectionHeader">이메일</div>
            <div className="formGroup">
              <input
                id="emailInput"
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={email || "이메일 주소"}
              />
              <button className="btnChange" onClick={handleEmailChange}>이메일 변경</button>
              </div>
            
            <div className="sectionHeader">소셜계정 연동</div>
            <div className="socialGroup">
              <ul className="socialList">
                {["github", "google", "naver", "kakao"].map((provider) => (
                  <li key={provider} className={provider}>
                    <div className="socialItem">
                      <img src={
                        provider === "github" ? GithubIcon :
                        provider === "google" ? GoogleIcon :
                        provider === "naver" ? NaverIcon : KakaoIcon
                      } alt={provider} />
                      <span>{provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
                    </div>
                    <button
                      className={`btnSocial ${socialLinks[provider] ? "disconnect" : "connect"}`}
                      onClick={() => handleSocialLink(provider)}
                    >
                      {socialLinks[provider] ? "연동 해제" : "연동"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sectionHeader">계정 삭제</div>
            <div className="deleteBox">
              <p className="deleteDesc">
                회원 탈퇴일부터 계정 정보(아이디/이메일/닉네임)는<br/>
                <a className="secureRule" href="#">개인정보 보호방침</a>에 따라 60일간 보관되며, 60일 경과된 후에는 모든 개인 정보는 삭제됩니다.<br/><br/>
                작성된 게시물은 삭제되지 않으며, 익명으로 처리 후 Forde 소유가 됩니다.
              </p>
              <label className="agreeLabel">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                계정 삭제에 관한 절차를 읽었으며, 이에 동의합니다.
              </label>
              <button className="btnDelete" onClick={handleDeleteAccount} disabled={isDeleting}>
                {isDeleting ? "삭제 중..." : "계정 삭제"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
