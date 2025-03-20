import { BoardApi } from "@/api/board";

import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const Monthly = () => {
  const count = 5;

  return (
    <InfinityScrollBoard
      queryKey={["recentBoards", count]}
      fetchFunction={BoardApi.fetchNewsMonths}
      count={count}
    />
  );
};

export default Monthly;
