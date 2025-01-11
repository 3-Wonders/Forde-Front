import "./MyPageNavigation.scss"

type MyPageNavigationProps = {
  isActive?: number;
};

const MyPageNavigation = ({ isActive }: MyPageNavigationProps) => {
  return (
    <div className="leftCard">
      <ul className="menuList">
        <li className={isActive === 1 ? "active" : ""}>프로필</li>
        <li className={isActive === 2 ? "active" : ""}>계정 관리</li>
        <li className={isActive === 3 ? "active" : ""}>활동 내역</li>
      </ul>
    </div>
  );
};

export default MyPageNavigation;
