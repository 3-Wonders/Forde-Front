import { useCallback, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

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
import { TagApi } from "@/api/tag"; // 태그 API 추가
import { Chip} from "@mui/material";

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
  
  // 태그 검색 관련 상태 추가
  const [isTagMode, setIsTagMode] = useState<boolean>(false);
  const [tagKeyword, setTagKeyword] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [showTagDropdown, setShowTagDropdown] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // 태그 검색 쿼리 추가
  const { data: tagResults, isLoading: isTagLoading } = useQuery({
    queryKey: ["tagSearch", tagKeyword],
    queryFn: async () => {
      return await TagApi.fetchSearchTags(tagKeyword);
    },
    enabled: isTagMode && tagKeyword.length > 0,
    staleTime: 1000 * 60, // 1분
  });

  // 컴포넌트 마운트 시 검색 내역 로드
  useEffect(() => {
    if (isLocalHistory) {
      setSearchHistory(getSearchHistory());
    }
  }, [isLocalHistory]);

  // 검색창 외부 클릭 시 검색 기록 및 태그 드롭다운 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        setShowTagDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearch = useCallback(() => {
    if (selectedTag) {
      // 태그 검색 실행
      navigate(`/search/tag?tag=${selectedTag.tagName}`, { preventScrollReset: false });
      
      // 검색 기록 저장 (isLocalHistory가 true일 때만)
      if (isLocalHistory) {
        const newHistory = saveSearchHistory(`#${selectedTag.tagName}`);
        setSearchHistory(newHistory);
      }
    } else if (keyword.trim()) {
      // 일반 검색 실행
      navigate(`/search?keyword=${keyword}`, { preventScrollReset: false });
      
      // 검색 기록 저장 (isLocalHistory가 true일 때만)
      if (isLocalHistory) {
        const newHistory = saveSearchHistory(keyword);
        setSearchHistory(newHistory);
      }
    }
    
    // 검색 후 상태 초기화
    setShowHistory(false);
    setShowTagDropdown(false);
  }, [keyword, selectedTag, navigate, isLocalHistory]);

  const handleChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 태그 모드 검사 및 전환
    if (value === "#" && !isTagMode) {
      setIsTagMode(true);
      setTagKeyword("");
      setShowTagDropdown(true);
      setKeyword("#");
      return;
    }
    
    // 태그 모드인 경우
    if (isTagMode) {
      // 태그 모드에서 # 삭제 시 태그 모드 해제
      if (!value.startsWith("#")) {
        setIsTagMode(false);
        setSelectedTag(null);
        setKeyword(value);
        return;
      }
      
      // 태그 선택 후 추가 입력 시도하면 태그 삭제
      if (selectedTag && value.length > selectedTag.tagName.length + 1) {
        setIsTagMode(false);
        setSelectedTag(null);
        setKeyword(value);
        return;
      }
      
      // 태그 검색어 업데이트
      if (!selectedTag) {
        setTagKeyword(value.substring(1));
        setKeyword(value);
        setShowTagDropdown(true);
      }
      return;
    }
    
    // 일반 모드
    setKeyword(value);
  }, [isTagMode, selectedTag]);

  const handleRemoveTag = useCallback(() => {
    setSelectedTag(null);
    setIsTagMode(false);
    setKeyword("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

    // 태그 선택 핸들러 수정
  const handleSelectTag = useCallback((tag: any) => {
    setSelectedTag(tag);
    setKeyword(""); // 입력창 비우기 (태그 선택 시 입력창 비움)
    setShowTagDropdown(false);
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
    alert("logout");
    logout();
  }, [logout]);

  const handleSearchFocus = useCallback(() => {
    if (isTagMode) {
      setShowTagDropdown(true);
    } else if (isLocalHistory && searchHistory.length > 0) {
      setShowHistory(true);
    }
  }, [isLocalHistory, searchHistory, isTagMode]);

  const handleSelectHistory = useCallback((term: string) => {
    setShowHistory(false);
    
    // 태그 검색 기록 선택 시
    if (term.startsWith('#')) {
      const tmpTag = {
        tagId: 0,
        tagName: term.substring(1)
      };
      
      setSelectedTag(tmpTag);
      setIsTagMode(true);
      navigate(`/search/tag?tag=${term.substring(1)}`, { preventScrollReset: false });
    } else {
      setKeyword(term);
      navigate(`/search?keyword=${term}`, { preventScrollReset: false });
    }
    
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
          <label className={`${classes.inputBox} ${selectedTag ? classes.hasTag : ''}`} htmlFor="search">
            {selectedTag && (
              <Chip 
                label={`#${selectedTag.tagName}`}
                onDelete={handleRemoveTag}
                variant="outlined"
                size="small"
              />
            )}
            <input
              id="search"
              ref={inputRef}
              type="text"
              placeholder={isTagMode ? "검색어 입력 시 태그 검색이 취소됩니다" : "검색어 입력"}
              value={keyword}
              onChange={handleChangeKeyword}
              onKeyDown={handleKeyDownEnter}
              onFocus={handleSearchFocus}
              autoComplete="off"
              className={`${isTagMode && !selectedTag ? classes.tagInput : ""} ${selectedTag ? classes.hiddenInput : ""}`}
            />
            <img src={SearchSvg} alt="검색 아이콘" onClick={handleClickSearchIcon} width={18} height={18} />
          </label>
            {/* 태그 검색 드롭다운 */}
            {isTagMode && showTagDropdown && !selectedTag && (
              <div className={classes.tagDropdown}>
                <div className={classes.tagHeader}>
                  <span>태그 검색</span>
                </div>
                <ul className={classes.tagList}>
                  {isTagLoading ? (
                    <li className={classes.loadingItem}>태그 검색 중...</li>
                  ) : tagResults?.tags && tagResults.tags.length > 0 ? (
                    tagResults.tags.map((tag) => (
                      <li 
                        key={tag.tagId} 
                        className={classes.tagItem}
                        onClick={() => handleSelectTag(tag)}
                      >
                        <span className={classes.tagText}>#{tag.tagName}</span>
                      </li>
                    ))
                  ) : (
                    <li className={classes.emptyItem}>검색 결과가 없습니다</li>
                  )}
                </ul>
              </div>
            )}
            
            {/* 검색 기록 드롭다운 */}
            {!isTagMode && isLocalHistory && showHistory && searchHistory.length > 0 && (
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
