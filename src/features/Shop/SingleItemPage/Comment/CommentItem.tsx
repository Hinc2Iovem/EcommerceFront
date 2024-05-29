import { EyeOff, User } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentTypes } from "../../../../types/CommentTypes";
import { updateCommentLikes } from "./commentQueries";
import dislike from "../../../../assets/images/Shop/comment/dislike.svg";
import like from "../../../../assets/images/Shop/comment/like.svg";
import useGetUser from "../../../../hooks/Profile/useGetUser";
import FormatBigNumbers from "../../../../utilities/FormatBigNumbers";
import useGetReactedComment from "../../../../hooks/Comment/useGetReactedComment";
import SubCommentForm from "./SubComment/SubCommentForm";
import SubComment from "./SubComment/SubComment";
import useGetAllSubComments from "../../../../hooks/SubComment/useGetAllSubComments";

export default function CommentItem({
  _id,
  amountOfDisLikes,
  amountOfLikes,
  text,
  userId,
}: CommentTypes) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState("");

  const [showReplies, setShowReplies] = useState(false);
  const subComments = useGetAllSubComments({ commentId: _id });
  const user = useGetUser({ userId });
  const id: string = localStorage.getItem("userId") as string;

  const [currentAmountOfLikes, setCurrentAmountOfLikes] =
    useState(amountOfLikes);
  const [currentAmountOfDisLikes, setCurrentAmountOfDisLikes] =
    useState(amountOfDisLikes);

  const reactedComment = useGetReactedComment({ commentId: _id, userId });
  const [currentLiked, setCurrentLiked] = useState(reactedComment?.isLiked);

  useEffect(() => {
    setCurrentLiked(reactedComment?.isLiked);
  }, [reactedComment?.isLiked]);

  const handleLike = () => {
    if (reactedComment) {
      if (!currentLiked) {
        setCurrentLiked(true);
        setCurrentAmountOfLikes((prev) => (prev += 1));
        setCurrentAmountOfDisLikes((prev) => (prev -= 1));
        updateCommentLikes({
          commentId: _id,
          isLiked: true,
          userId: id,
        });
      }
    } else {
      setCurrentAmountOfLikes((prev) => (prev += 1));
      updateCommentLikes({
        commentId: _id,
        isLiked: true,
        userId: id,
      });
    }
  };
  const handleDisLike = () => {
    if (reactedComment) {
      if (currentLiked) {
        setCurrentLiked(false);
        setCurrentAmountOfLikes((prev) => (prev -= 1));
        setCurrentAmountOfDisLikes((prev) => (prev += 1));
        updateCommentLikes({
          commentId: _id,
          isLiked: false,
          userId: id,
        });
      }
    } else {
      setCurrentAmountOfDisLikes((prev) => (prev += 1));
      updateCommentLikes({
        commentId: _id,
        isLiked: false,
        userId: id,
      });
    }
  };

  return (
    <section className="mb-[2rem]">
      <div className="flex flex-col gap-[.5rem] relative">
        <div className="flex items-center">
          <User />
          <h3>{user.username}</h3>
        </div>
        <p>{text}</p>
        <div className="w-fit flex gap-[1rem] items-center">
          <div className="flex items-center gap-[.3rem] text-[1.4rem] font-medium">
            <p>{FormatBigNumbers(currentAmountOfLikes)}</p>
            <button
              onClick={handleLike}
              className={`${
                currentLiked ? "shadow-md rounded-full" : ""
              } p-[.5rem] hover:scale-[1.01] active:scale-[0.98]`}
            >
              <img src={like} alt="Like" />
            </button>
          </div>
          <div className="flex items-center gap-[.3rem] text-[1.4rem] font-medium">
            <p>{FormatBigNumbers(currentAmountOfDisLikes)}</p>
            <button
              onClick={handleDisLike}
              className={`${
                currentLiked ? "" : "shadow-md rounded-full"
              } p-[.5rem] hover:scale-[1.01] active:scale-[0.98]`}
            >
              <img src={dislike} alt="Dislike" />
            </button>
          </div>
          <button
            onClick={() => setShowReplyForm((prev) => !prev)}
            className="w-fit text-gray-700 hover:text-black transition-all text-[1.5rem] font-medium"
          >
            reply
          </button>
        </div>
        <div className={`${subComments.length ? "" : "hidden"}`}>
          <button
            onClick={() => setShowReplies(true)}
            className={`${
              showReplies ? "hidden" : ""
            } absolute bottom-[-2.5rem] text-gray-600 hover:text-gray-800 transition-all`}
          >
            See Replies
          </button>
          <button
            onClick={() => setShowReplies(false)}
            className={`${
              showReplies ? "" : "hidden"
            } absolute bottom-[-3rem] left-[-.5rem] text-gray-600 hover:text-gray-800 transition-all`}
          >
            <EyeOff />
          </button>
        </div>
      </div>
      <SubCommentForm
        setShowReplyForm={setShowReplyForm}
        showReplyForm={showReplyForm}
        setReply={setReply}
        reply={reply}
        commentId={_id}
        userId={id}
      />
      {subComments.length > 0 &&
        subComments?.map((sc) => (
          <SubComment key={sc._id} {...sc} showSubComment={showReplies} />
        ))}
    </section>
  );
}
