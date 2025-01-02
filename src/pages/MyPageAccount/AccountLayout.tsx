import { useMemo } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import "./AccountLayout.scss";

import GithubIcon from "@/assets/github.svg";
import GoogleIcon from "@/assets/google-color.svg";
import NaverIcon from "@/assets/naver.svg";
import KakaoIcon from "@/assets/kakao.svg";

const AccountLayout = () => {
  const tabletSize = 992;
  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabletSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabletSize]);

  return (
    <>
      {header}
      <div className="accountPageContainer">
        <div className="accountInner">
          <div className="accountLeftCard">
            <ul className="menuList">
              <li>
                프로필
              </li>
              <li className="active">
                계정 관리
              </li>
              <li>
                활동 내역
              </li>
            </ul>
          </div>

          <div className="accountCenterCard">
            <div className="sectionHeader">이메일</div>
            <div className="formGroup">
              <input
                id="emailInput"
                type="text"
                defaultValue="User02@naver.com"
                placeholder="이메일 주소"
              />
              <button className="btnChange">이메일 변경</button>
            </div>

            <div className="sectionHeader">소셜계정 연동</div>
            <div className="socialGroup">
              <ul className="socialList">
                <li className="github">
                  <div className="socialItem">
                    <img
                      src={GithubIcon}
                      alt="Github"
                    />
                    <span>Github</span>
                  </div>
                  <button className="btnSocial connect">연동</button>
                </li>
                <li className="google">
                  <div className="socialItem">
                    <img
                      src={GoogleIcon}
                      alt="Google"
                    />
                    <span>Google</span>
                  </div>
                  <button className="btnSocial disconnect">연동 해제</button>
                </li>
                <li className="naver">
                  <div className="socialItem">
                    <img
                      src={NaverIcon}
                      alt="Naver"
                    />
                    <span>Naver</span>
                  </div>
                  <button className="btnSocial connect">연동</button>
                </li>
                <li className="kakao">
                  <div className="socialItem">
                    <img
                      src={KakaoIcon}
                      alt="Kakao"
                    />
                    <span>Kakao</span>
                  </div>
                  <button className="btnSocial connect">연동</button>
                </li>
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
                <input type="checkbox" />
                계정 삭제에 관한 절차를 읽었으며, 이에 동의 합니 다.
              </label>
              <button className="btnDelete">계정 삭제</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
