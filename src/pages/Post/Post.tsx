import { useCallback, useState } from "react";

import { RequestBoard } from "@/types/board";

import PostForm from "@/components/PostForm/PostForm";
import { BoardApi } from "@/api/board";
import { TagApi } from "@/api/tag";

const Post = () => {
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const handlePost = useCallback(async (request: RequestBoard) => {
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
    }
    BoardApi.postBoard({
      boardType: request.boardType,
      title: request.title,
      content: request.content,
      thumbnail: request.thumbnail instanceof File ? request.thumbnail : undefined,
      tagIds: newTagIds,
      imageIds: request.imageIds ?? []
    })

    // NOTE: 성공 시
    setPostSuccess(true);
  }, []);

  return <PostForm postSuccess={postSuccess} onPost={handlePost} />;
};

export default Post;

