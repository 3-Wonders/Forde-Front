import { useCallback } from "react";
import classes from "./comment.module.scss";
import CommentForm from "@/components/CommentForm/CommentForm";
import ParentComment from "./ParentComment/ParentComment";
import { CommentApi } from "@/api/comment";

type CommentProps = {
  boardId: number;
};

const Comment = ({ boardId }: CommentProps) => {
  const handleSubmit = useCallback(
    async (content: string) => {
      const responseStatus = await CommentApi.postParentComment(boardId, [], content);

      if(responseStatus === 201){
        // 페이지 새로고침
        window.location.reload();
      }
    },
    [boardId],
  );

  return (
    <div className={classes.comment} id="comment">
      <CommentForm onSubmit={handleSubmit} />
      <ParentComment />
    </div>
  );
};

export default Comment;
