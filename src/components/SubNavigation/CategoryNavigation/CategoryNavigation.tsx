import styles from "./CategoryNavigation.module.scss";

import { NavLink } from "react-router-dom";

type CategoryNavigationProps = {
  isActive?: number;
  isOther?: boolean;
  userId?: number;
  category?: string;
};

const CategoryNavigation = ({ isActive, isOther, userId, category }: CategoryNavigationProps) => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.menuList}>
        <li className={isActive === 1 || category === "news" ? styles.active : ""}>
          <NavLink 
            to={isOther ? `/other/activate?id=${userId}&category=news` : "/activate"}
            className={({ isActive }) => isActive ? styles.active : ""}
          >
            뉴스
          </NavLink>
        </li>
        <li className={isActive === 2 || category === "board" ? styles.active : ""}>
          <NavLink 
            to={isOther ? `/other/activate?id=${userId}&category=board` : "/activate/board"}
            className={({ isActive }) => isActive ? styles.active : ""}
          >
            게시글
          </NavLink>
        </li>
        <li className={isActive === 3 || category === "comment" ? styles.active : ""}>
          <NavLink 
            to={isOther ? `/other/activate?id=${userId}&category=comment` : "/activate/comment"}
            className={({ isActive }) => isActive ? styles.active : ""}
          >
            댓글
          </NavLink>
        </li>
        <li className={isActive === 4 || category === "like" ? styles.active : ""}>
          <NavLink 
            to={isOther ? `/other/activate?id=${userId}&category=like` : "/activate/like"}
            className={({ isActive }) => isActive ? styles.active : ""}
          >
            좋아요한 글
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNavigation;
