import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { RequestBoard } from "@/types/board";

import PostForm from "@/components/PostForm/PostForm";
import { BoardApi } from "@/api/board";
import { TagApi } from "@/api/tag";

const Update = () => {
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const params = useParams<{ boardId: string }>();
  const boardId: number = useMemo(() => {
    return params.boardId ? +params.boardId : 0;
  }, [params]);
  console.log(boardId);
  const handlePost = useCallback(async (request: RequestBoard, thumbnailAction?: string) => {
    console.log(request);
    
    // TODO: Tags는 Tag[] 형태로 들어옵니다. => 따로 처리해주세요.

    const newTagIds: number[] = [];
    if(request.tags && request.tags.length > 0){      

      for(const tag of request.tags ){
        try {
          const response = await TagApi.fetchSearchTags(tag.tagName);
          if (response.tags && response.tags.length > 0) {
            newTagIds.push(response.tags[0].tagId); // 첫 번째 태그의 ID 추가
          }
        } catch (error) {
          console.error('태그 검색 중 오류 발생:', error);
        }
      }
      setTagIds(newTagIds);
    }

    BoardApi.fetchBoardUpdate(boardId, {
      boardType: request.boardType,
      title: request.title,
      content: request.content,
      thumbnail: request.thumbnail instanceof File ? request.thumbnail : undefined,
      thumbnailAction: thumbnailAction != null ? thumbnailAction : "KEEP", // default를 keep으로 설정
      tagIds: newTagIds,
      imageIds: request.imageIds ?? []
    })

    // NOTE: 성공 시
    setPostSuccess(true);
  }, []);

  return <PostForm postSuccess={postSuccess} onPost={handlePost} boardId={boardId} />;
};

export default Update;
