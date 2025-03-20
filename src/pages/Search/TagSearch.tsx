import { useSearchParams } from 'react-router-dom';
import { BoardApi } from "@/api/board";
import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const TagSearch = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('tag') || ''; // keyword === tag
  const count = 5;
  return (
    <InfinityScrollBoard 
      queryKey={["tagBoards", count, keyword]} 
      fetchFunction={BoardApi.fetchRecentBoardAndNewsWithTag}
      keyword={keyword}
      count={count} 
    /> 
  );
};

export default TagSearch;
