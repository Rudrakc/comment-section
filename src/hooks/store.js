import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      comments: [],
      addComment: (name, text) =>
        set((state) => ({
          comments: [
            ...state.comments,
            {
              id: Date.now(),
              name,
              text,
              date: new Date().toLocaleString(),
              replies: [],
            },
          ].sort((a, b) => new Date(b.date) - new Date(a.date)),
        })),
      deleteComment: (id) =>
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== id),
        })),
      editComment: (id, newText) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === id ? { ...comment, text: newText } : comment
          ),
        })),
      addReply: (commentId, name, text) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: Date.now(),
                      name,
                      text,
                      date: new Date().toLocaleString(),
                    },
                  ].sort((a, b) => new Date(b.date) - new Date(a.date)),
                }
              : comment
          ),
        })),
      deleteReply : (commentId, replyId) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.filter((reply) => reply.id !== replyId),
                }
              : comment
          ),
        })),
      editReply: (commentId, replyId, newText) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === replyId ? { ...reply, text: newText } : reply
                  ),
                }
              : comment
          ),
        })), 
    }),
    {
      name: "comments-storage", // unique name for localStorage
    }
  )
);

export default useStore;
