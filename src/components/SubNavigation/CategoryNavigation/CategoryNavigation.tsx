import styles from "./CategoryNavigation.module.scss";

type CategoryNavigationProps = {
  isActive?: number;
};

const CategoryNavigation = ({ isActive }: CategoryNavigationProps) => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.menuList}>
        <li className={isActive === 1 ? styles.active : ""}>
          <a href="/activate">뉴스</a>
        </li>
        <li className={isActive === 2 ? styles.active : ""}>
          <a href="/activate/board">게시글</a>
        </li>
        <li className={isActive === 3 ? styles.active : ""}>
          <a href="/activate/comment">댓글</a>
        </li>
        <li className={isActive === 4 ? styles.active : ""}>
          <a href="/activate/like">좋아요한 글</a>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNavigation;
