import React, { useState } from "react";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import useStore from "../hooks/store";

const Comment = ({ comment, canReply, commentId }) => {
  const {deleteReply,addReply, editComment, deleteComment, editReply } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    canReply ? editComment(comment.id, newText) : editReply(commentId, comment.id, newText);
    setIsEditing(false);
  };

  const handleReply = () => {
    addReply(comment.id, replyName, replyText);
    setReplyName("");
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 my-4 bg-white shadow-md">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={`https://avatar.iran.liara.run/public?username=${comment.name}`}
            alt="dp.img"
            className="h-10 w-10"
          />
          <div className="ml-3 ">
            <p className="text-lg  font-semibold text-gray-800">
              {comment.name}
            </p>
            {isEditing ? (
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className=" text-gray-700 text-lg">{comment.text}</p>
            )}
            <div className="flex gap-6 mt-4">
              {canReply && (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                >
                  {isReplying ? (
                    "Cancel"
                  ) : (
                    <AiOutlineMessage className="h-5 w-5 text-gray-600  hover:text-blue-600 transition-colors" />
                  )}
                </button>
              )}
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                >
                  <MdOutlineModeEdit className="h-5 w-5 text-gray-600  hover:text-blue-600 transition-colors" />
                </button>
              )}
              <button
                onClick={() => !canReply ? deleteReply(commentId, comment.id)  :  deleteComment(comment.id)}
              >
                <MdDeleteOutline className="h-5 w-5 text-gray-600  hover:text-red-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{comment.date}</p>
      </div>

      {isReplying && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          />
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleReply}
            className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Reply
          </button>
        </div>
      )}

      {/* Render replies */}
      {comment.replies && (
        <div className="mt-4 ml-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              canReply={false}
              commentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
