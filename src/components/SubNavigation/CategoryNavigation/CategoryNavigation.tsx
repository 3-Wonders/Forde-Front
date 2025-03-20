import styles from "./CategoryNavigation.module.scss";

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
        <li className={isActive === 1 || category == "news" ? styles.active : ""}>
          <a href={isOther ? `/other/activate?id=${userId}&category=news` : "/activate"}>뉴스</a>
        </li>
        <li className={isActive === 2 || category == "board" ? styles.active : ""}>
        <a href={isOther ? `/other/activate?id=${userId}&category=board` : "/activate"}>게시글</a>
        </li>
        <li className={isActive === 3 || category == "comment" ? styles.active : ""}>
        <a href={isOther ? `/other/activate?id=${userId}&category=comment` : "/activate"}>댓글</a>
        </li>
        <li className={isActive === 4 || category == "like" ? styles.active : ""}>
        <a href={isOther ? `/other/activate?id=${userId}&category=like` : "/activate"}>좋아요한 글</a>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNavigation;
