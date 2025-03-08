import { ChildCommentList, ParentCommentList, PostChildCommentRequest } from "@/types/comment";
import axios from "axios";

export const CommentApi = {
  fetchParentComments: async (boardId: number, page: number, count: number): Promise<ParentCommentList> => {
    console.log("Fetch parent comments : ", boardId, page, count);
    // try{
    //   const response = await axios.get(
    //     `http://localhost:8081/board/`+boardId+`/comment?page=` + page + `&count=` + count,
    //     { withCredentials : true }
    //   );

    //   return response.data;
    // } catch( error ) {
    //   console.log(" 댓글 가져오기 중 에러 : "  + error );
    //   throw error;
    // } 
    return {
      comments: [
        {
          commentId: 1,
          content: "comment1",
          uploader: {
            userId: 1,
            nickname: "user1",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: true,
          createdTime: "2024-08-24 14:23:00",
        },
        {
          commentId: 2,
          content: "comment2",
          uploader: {
            userId: 2,
            nickname: "user2",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: true,
          createdTime: "2024-08-14 14:23:00",
        },
        {
          commentId: 3,
          content: "comment3",
          uploader: {
            userId: 3,
            nickname: "user3",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: false,
          createdTime: "2024-08-01 14:23:00",
        },
        {
          commentId: 4,
          content: "comment4",
          uploader: {
            userId: 4,
            nickname: "user4",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: false,
          createdTime: "2023-07-01 14:23:00",
        },
        {
          commentId: 5,
          content: "comment5",
          uploader: {
            userId: 5,
            nickname: "user5",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: false,
          createdTime: "2021-06-01 14:23:00",
        },
      ],
      total: 16,
    };
  },

  postParentComment: async (boardId: number, userIds : number[], content: string): Promise<any> => {
    try{
      const response = await axios.post(
        `http://localhost:8081/board/`+boardId+`/comment`,
        { userIds: userIds,
          content: content,
        },
        { withCredentials : true }
      );

      return response.data;
    } catch( error ) {
      console.log(" 댓글 작성 중 에러 : "  + error );
      throw error;
    } 
  },

  updateParentComment: async (boardId: number, commentId: number, userIds : number[], content: string): Promise<any> => {
    try{
      const response = await axios.patch(
        `http://localhost:8081/board/`+boardId+`/comment/`+commentId,
        { userIds: userIds,
          content: content,
        },
        { withCredentials : true }
      );

      return response.data;
    } catch( error ) {
      console.log(" 댓글 수정 중 에러 : "  + error );
      throw error;
    } 
  },

  deleteParentComment: async (boardId: number, commentId: number): Promise<any> => {
    try{
      const response = await axios.delete(
        `http://localhost:8081/board/`+boardId+`/comment/`+commentId,
        { withCredentials : true }
      );

      return response.data;
    } catch( error ) {
      console.log(" 댓글 삭제 중 에러 : "  + error );
      throw error;
    } 
  },


  fetchChildComments: async (
    boardId: number,
    commentId: number,
    page: number,
    count: number,
  ): Promise<ChildCommentList> => {
    console.log("Fetch child comments : ", boardId, commentId, page, count);
    // try{
    //   const response = await axios.get(
    //     `http://localhost:8081/board/`+boardId+`/comment/` + commentId +`?page=` + page + `&count=` + count,
    //     { withCredentials : true }
    //   );

    //   return response.data;
    // } catch( error ) {
    //   console.log(" 자식 댓글 가져오기 중 에러 : "  + error );
    //   throw error;
    // } 
    return {
      comments: [
        {
          commentId: 11,
          content: "child comment1",
          uploader: {
            userId: 1,
            nickname: "user1",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          createdTime: "2024-08-27 14:23:00",
        },
        {
          commentId: 12,
          content: "child comment2",
          uploader: {
            userId: 2,
            nickname: "user2",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          createdTime: "2024-08-14 14:23:00",
        },
      ],
      total: 16,
    };
  },

  postChildComment: async (requestData: PostChildCommentRequest, boardId: number, commentId: number, content: string): Promise<any> => {
    try{
      const response = await axios.post(
        `http://localhost:8081/board/`+boardId+`/comment/` + commentId,
        { requestData },
        { withCredentials : true }
      );

      return response.data;
    } catch( error ) {
      console.log(" 대댓글 작성 중 에러 : "  + error );
      throw error;
    } 
  },

};
