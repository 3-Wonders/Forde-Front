import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./CommentForm.module.scss";

import FormButton from "../FormButton/ForumButton";

import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import MentionEditor from "../MentionEditor/MentionEditor";

type CommentFormProps = {
  initialContent?: string;
  className?: string;
  onSubmit: (content: string, userIds: number[]) => void;
};

const CommentForm = ({ initialContent = "", className, onSubmit }: CommentFormProps) => {
  const { user } = useUser();
  const { showToast, ToastElement } = useToast();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>(initialContent);
  // 멘션된 사용자 ID를 저장할 상태 추가
  const [mentionedUserIds, setMentionedUserIds] = useState<number[]>([]);

  const isDisabled = useMemo(() => content.trim() === "", [content]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isDisabled) {
        showToast.error("댓글을 입력해주세요.");
        return;
      }
      if (!user) {
        navigate(`/login?redirect=${window.location.pathname}`);
      }

    
      console.log('댓글 제출:', {
        content: content.trim(),
        mentionedUserIds
      });
      // 멘션된 사용자 ID를 함께 전달
      onSubmit(content.trim(), mentionedUserIds);
      setContent("");
      setMentionedUserIds([]); // 제출 후 초기화
    },
    [isDisabled, user, content, mentionedUserIds, showToast, onSubmit, navigate],
  );

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  // 멘션된 사용자 ID 변경 처리 함수
  const handleMentionUsersChange = useCallback((userIds: number[]) => {
    setMentionedUserIds(userIds);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`${classes.form} ${className}`}>
      {ToastElement}
      <MentionEditor 
        onChange={handleChange} 
        isVisibleToolbar={false} 
        placeholder="댓글"
        onMentionUsersChange={handleMentionUsersChange}
      />
      <FormButton text="댓글 쓰기" isDisabled={isDisabled} />
    </form>
  );
};

export default CommentForm;
