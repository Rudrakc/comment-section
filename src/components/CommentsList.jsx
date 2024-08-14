import React, { useState } from "react";
import Comment from "./Comment";
import useStore from "../hooks/store";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const CommentsList = () => {
  const { comments, addComment } = useStore();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSubmit = () => {
    if (!name || !text) {
      alert("Please enter both name and comment");
      return;
    }
    addComment(name, text);
    setName("");
    setText("");
  };

  return (
    <div className="w-full max-h-screen p-4 min-h-screen bg-gray-50  flex justify-around">
      <div className="w-1/3 flex flex-col justify-center items-center max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comment</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[330px] p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Comment
          </button>
        </div>
      </div>
      {/* Add a feature of sorting through date in asc and desc */}
      <div className="flex mt-12">
        <div className="max-h-screen overflow-y-auto  scrollbar-hide">
          {sortOrder === "desc"
            ? comments.map((comment) => (
                <Comment key={comment.id} comment={comment} canReply={true} />
              ))
            : comments.map((x, i, arr) => {
                let current = arr[arr.length - 1 - i];
                return (
                  <Comment key={current.id} comment={current} canReply={true} />
                );
              })}
          {}
        </div>
        <div
          className="mt-6 ml-4 rounded-full bg-gray-300 h-[28px] w-[28px] flex justify-center items-center"
          onClick={() => {
            setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
          }}
        >
          {sortOrder === "desc" ? <FaArrowUp /> : <FaArrowDown />}
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
