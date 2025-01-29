import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import classes from "./CommentInput.module.scss";

// 예제 사용자 데이터
const users = [
  { id: "1", display: "John Doe" },
  { id: "2", display: "Jane Smith" },
  { id: "3", display: "Alice Johnson" },
];

const CommentInput = () => {
  const [comment, setComment] = useState("");

  const handleChange = (value: string) => {
    setComment(value);
  };

  const handleSubmit = () => {
    alert(`댓글 내용: ${comment}`);
    setComment(""); // 댓글 작성 후 초기화
  };

  return (
    <div className={classes.commentInputContainer}>
      <MentionsInput
        value={comment}
        onChange={(e) => handleChange(e.target.value)}
        
        placeholder="댓글을 입력하세요..."
        style={{
          control: {
            fontSize: "1rem",
            padding: "0.5rem",
          },
          highlighter: {
            overflow: "hidden",
          },
          input: {
            margin: 0,
          },
          suggestions: {
            list: {
              backgroundColor: "#1E252B",
              border: "1px solid #ccc",
              borderRadius: "4px",
              zIndex: 2
            },
            item: {
              padding: "0.5rem",
              borderBottom: "1px solid #eee",
              "&focused": {
                backgroundColor: "#007bff",
              },
            },
          },
        }}
      >
        <Mention
          trigger="@"
          data={users}
          className={classes.mention}
        />
      </MentionsInput>
      <button onClick={handleSubmit} className={classes.submitButton}>
        댓글 작성
      </button>
    </div>
  );
};

export default CommentInput;
