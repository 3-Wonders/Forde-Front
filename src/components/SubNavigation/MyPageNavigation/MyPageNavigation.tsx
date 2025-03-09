import "./MyPageNavigation.scss"

type MyPageNavigationProps = {
  isActive?: number;
};


import ProfileIcon from "@/assets/profile-mypage.svg"
import AccountIcon from "@/assets/account.svg"
import ActiveIcon from "@/assets/active.svg"

const MyPageNavigation = ({ isActive }: MyPageNavigationProps) => {
  return (
    <div className="leftCard">
      <ul className="menuList">
        <a href="/profile"><li className={isActive === 1 ? "active" : ""}>
        <img src={ProfileIcon} alt={`아이콘`} width={28} height={28} />
        프로필</li></a>
        <a href="/account"><li className={isActive === 2 ? "active" : ""}>
        <img src={AccountIcon} alt={`아이콘`} width={28} height={28} />
        계정 관리</li></a>
        <a href="/activate"><li className={isActive === 3 ? "active" : ""}>
        <img src={ActiveIcon} alt={`아이콘`} width={28} height={28} />
        활동 내역</li></a>
      </ul>
    </div>
  );
};

export default MyPageNavigation;
