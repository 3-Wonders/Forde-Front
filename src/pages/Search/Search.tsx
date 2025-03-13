import { useSearchParams } from 'react-router-dom';
import { BoardApi } from "@/api/board";
import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const count = 5;

  return (
    <InfinityScrollBoard 
      queryKey={["searchBoards", count, keyword]} // keyword를 쿼리키에 포함시켜 키워드 변경 시 재요청
      fetchFunction={BoardApi.fetchRecentBoardAndNewsWithKeyword}
      keyword={keyword}
      count={count} 
    /> 
  );
};

export default Search;
