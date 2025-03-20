import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

import { BoardListWithType, BoardWithType } from "@/types/board";

import useInfinityScroll from "@/hooks/useInfinityScroll";

import BoardItem from "@/components/BoardItem/BoardItem";
import SkeletonBoardItem from "@/components/Skeleton/BoardItem/SkeletonBoardItem";

import { getNextPagination } from "@/utils/pagination";

interface InfinityScrollBoardProps {
  count: number;
  queryKey: QueryKey;
  fetchFunction: (params: { page: number; count: number; keyword?: string, userId?: number; }) => Promise<BoardListWithType>;
  keyword?: string;
  userId?: number;
}
const InfinityScrollBoard = ({ queryKey, fetchFunction, count, keyword, userId }: InfinityScrollBoardProps) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<BoardListWithType>({
    queryKey,
    initialData: undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return getNextPagination({
        itemLength: allPages.length,
        count,
        total: lastPage.total,
        page: lastPageParam as number,
      });
    },
    queryFn: async ({ pageParam: page = 1 }) => {
      return await fetchFunction({ page: page as number, count, keyword, userId });
    },
  });

  const endRef = useRef<HTMLDivElement>(null);

  // queryKey가 배열인지 확인하고 첫 번째 요소가 "userComment"인지 확인
  const isUserCommentQuery = Array.isArray(queryKey) && queryKey[0] === "userComment";

  useInfinityScroll(endRef, () => {
    if (isLoading || isFetching || !hasNextPage) return;
    fetchNextPage();
  });

  return (
    <>
      {!isLoading ? (
        <>
          {data &&
            data.pages.map((pages: BoardListWithType) =>
              pages.boards.map((item: BoardWithType) => (
                <Box key={item.boardId} sx={{ marginBottom: '1rem' }}>
                  <BoardItem board={item} to={`/board/${item.boardId}`} />
                  {isUserCommentQuery && item.comment && (
                    <Box 
                      sx={{ 
                        mt: 1, 
                        ml: 2, 
                        p: 1.5, 
                        borderLeft: '3px solid #ff7b00',
                        backgroundColor: 'rgba(255, 123, 0, 0.05)',
                        borderRadius: '0 4px 4px 0'
                      }}
                      dangerouslySetInnerHTML={{ __html: item.comment }}
                    />
                  )}
                </Box>
              )),
            )}
        </>
      ) : (
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"1.25rem"}>
          {Array(count)
            .fill(0)
            .map((_, idx) => (
              <SkeletonBoardItem key={idx} />
            ))}
        </Box>
      )}
      <div ref={endRef} />
    </>
  );
};

export default InfinityScrollBoard;
