import { BoardApi } from "@/api/board";

import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const Daily = () => {
  const count = 5;

  return (
    <InfinityScrollBoard
      queryKey={["recentBoards", count]}
      fetchFunction={BoardApi.fetchNewsDaily}
      count={count}
    />
  );
};

export default Daily;
