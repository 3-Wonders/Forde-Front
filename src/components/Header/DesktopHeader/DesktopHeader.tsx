import { useCallback, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeSvg from "@assets/home.svg";
import NewsSvg from "@assets/news.svg";
import BoardSvg from "@assets/board.svg";
import FollowSvg from "@assets/follow.svg";
import SearchSvg from "@assets/search.svg";
import UserPlusSvg from "@assets/user-plus.svg";
import AccountSvg from "@assets/profile.svg";
import LogoutSvg from "@assets/logout.svg";
import SettingSvg from "@assets/setting.svg";
import DeleteSvg from "@assets/new.svg"; // 삭제 아이콘 임시 땜빵

import classes from "./DesktopHeader.module.scss";

import Notification from "@/features/Notification/Notification";

import Modal from "@/components/Modal/Modal";

import useUser from "@/hooks/useUser";
import useAppStore from "@/stores/useAppStore";
import { BoardApi } from "@/api/board";

// 검색 내역 관련 유틸리티 함수들
const getSearchHistory = (): string[] => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : [];
};

const saveSearchHistory = (searchTerm: string) => {
  if (!searchTerm.trim()) return [];
  
  const history = getSearchHistory();
  const filteredHistory = history.filter(item => item !== searchTerm);
  const newHistory = [searchTerm, ...filteredHistory].slice(0, 10);
  
  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  return newHistory;
};

const removeSearchItem = (searchTerm: string) => {
  const history = getSearchHistory();
  const newHistory = history.filter(item => item !== searchTerm);
  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  return newHistory;
};

const clearSearchHistory = () => {
  localStorage.removeItem('searchHistory');
  return [];
};

const DesktopHeader = () => {
  const { user, logout } = useUser();
  const router = useLocation();
  const navigate = useNavigate();
  const { isLocalHistory } = useAppStore(); // 전역 상태에서 isLocalHistory 가져오기
  
  const [keyword, setKeyword] = useState<string>("");
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시 검색 내역 로드
  useEffect(() => {
    if (isLocalHistory) {
      setSearchHistory(getSearchHistory());
    }
  }, [isLocalHistory]);

  // 검색창 외부 클릭 시 검색 기록 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearch = useCallback(() => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`, { preventScrollReset: false });
      
      
      // 검색 기록 저장 (isLocalHistory가 true일 때만)
      if (isLocalHistory) {
        const newHistory = saveSearchHistory(keyword);
        setSearchHistory(newHistory);
      }
      
      setShowHistory(false);
    }
  }, [keyword, navigate, isLocalHistory]);

  const handleChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const handleKeyDownEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch();
      }
    },
    [onSearch],
  );

  const handleClickSearchIcon = useCallback(() => {
    onSearch();
  }, [onSearch]);

  const handleProfile = useCallback(() => {
    setIsOpenProfile((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpenProfile(false);
  }, []);

  const handleLogout = useCallback(() => {
    // setIsOpenProfile(false);
    logout();
  }, [logout]);

  const handleSearchFocus = useCallback(() => {
    if (isLocalHistory && searchHistory.length > 0) {
      setShowHistory(true);
    }
  }, [isLocalHistory, searchHistory]);

  const handleSelectHistory = useCallback((term: string) => {
    setKeyword(term);
    setShowHistory(false);
    navigate(`/search?keyword=${term}`, { preventScrollReset: false });
    
    // 선택한 검색어를 최상단으로 이동
    if (isLocalHistory) {
      const newHistory = saveSearchHistory(term);
      setSearchHistory(newHistory);
    }
  }, [navigate, isLocalHistory]);

  const handleRemoveHistoryItem = useCallback((e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    if (isLocalHistory) {
      const newHistory = removeSearchItem(term);
      setSearchHistory(newHistory);
    }
  }, [isLocalHistory]);

  const handleClearHistory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocalHistory) {
      clearSearchHistory();
      setSearchHistory([]);
    }
  }, [isLocalHistory]);

  return (
    <header className={classes.header}>
      <div className={classes.center}>
        <Link to={"/"} className={classes.logo}>
          <img src="/logo.svg" alt="로고 이미지" width={36} height={36} />
          <span className={classes.title}>Knowledge</span>
        </Link>
        <nav className={classes.nav}>
          <div className={classes.btnBox}>
            <Link to={"/"} className={`${classes.navItem} ${router.pathname === "/" && classes.active}`}>
              <img src={HomeSvg} alt="홈 아이콘" width={22} height={22} />
            </Link>
            <Link to={"/news"} className={`${classes.navItem} ${router.pathname === "/news" && classes.active}`}>
              <img src={NewsSvg} alt="뉴스 아이콘" width={22} height={22} />
            </Link>
            <Link to={"/board"} className={`${classes.navItem} ${router.pathname === "/board" && classes.active}`}>
              <img src={BoardSvg} alt="게시판 아이콘" width={22} height={22} />
            </Link>
            <Link to={"/follow"} className={`${classes.navItem} ${router.pathname === "/follow" && classes.active}`}>
              <img src={FollowSvg} alt="팔로우 게시판 아이콘" width={22} height={22} />
            </Link>
          </div>
          <div className={classes.searchContainer} ref={searchInputRef}>
            <label className={classes.inputBox} htmlFor="search">
              <input
                id="search"
                type="text"
                placeholder="검색어 입력"
                value={keyword}
                onChange={handleChangeKeyword}
                onKeyDown={handleKeyDownEnter}
                onFocus={handleSearchFocus}
                autoComplete="off"
              />
              <img src={SearchSvg} alt="검색 아이콘" onClick={handleClickSearchIcon} width={18} height={18} />
            </label>
            
            {/* 검색 기록 드롭다운 */}
            {isLocalHistory && showHistory && searchHistory.length > 0 && (
              <div className={classes.historyDropdown}>
                <div className={classes.historyHeader}>
                  <span>최근 검색어</span>
                  <button 
                    className={classes.clearHistoryBtn} 
                    onClick={handleClearHistory}
                  >
                    전체 삭제
                  </button>
                </div>
                <ul className={classes.historyList}>
                  {searchHistory.map((term, index) => (
                    <li 
                      key={index} 
                      className={classes.historyItem}
                      onClick={() => handleSelectHistory(term)}
                    >
                      <span className={classes.historyText}>{term}</span>
                      <button 
                        className={classes.removeHistoryBtn}
                        onClick={(e) => handleRemoveHistoryItem(e, term)}
                      >
                        <img src={DeleteSvg} alt="삭제" width={14} height={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
        <div className={classes.btnBox}>
          {user ? (
            <>
              <Link to="/post" className={classes.postBtn}>
                글쓰기
              </Link>
              <Notification />
              <div className={classes.profileBox}>
                <button className={classes.profile} onClick={handleProfile}>
                  <img src={user.profilePath} alt="유저 프로필 이미지" width={36} height={36} />
                </button>
                <Modal isOpen={isOpenProfile} onClose={handleClose}>
                  <div className={classes.profileModal}>
                    <div className={classes.top}>
                      <img
                        src={user.profilePath}
                        alt="유저 프로필 이미지"
                        width={40}
                        height={40}
                        className={classes.profile}
                      />
                      <div className={classes.userInfo}>
                        <div className={classes.username}>{user.nickname}</div>
                        <div className={classes.email}>{user.email}</div>
                      </div>
                    </div>
                    <div className={classes.linkBox}>
                      <Link to={"/account"} className={classes.link}>
                        <img src={AccountSvg} alt="계정 아이콘" />
                        <span>내 정보</span>
                      </Link>
                      <button className={classes.link} onClick={handleLogout}>
                        <img src={LogoutSvg} alt="로그아웃 아이콘" />
                        <span>로그아웃</span>
                      </button>
                      <div className={classes.line} />
                      <Link to={"/setting"} className={classes.link}>
                        <img src={SettingSvg} alt="설정 아이콘" />
                        <span>설정</span>
                      </Link>
                    </div>
                  </div>
                </Modal>
              </div>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className={classes.signupBtn}>
                  <img src={UserPlusSvg} alt="회원가입 아이콘" width={14} height={14} />
                  <span>회원가입</span>
                </button>
              </Link>
              <Link to="/login">
                <button className={classes.loginBtn}>로그인</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
