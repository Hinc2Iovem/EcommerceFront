import { EyeOff, User } from "lucide-react";
import { SubCommentTypes } from "../../../../../types/SubCommentTypes";
import dislike from "../../../../../assets/images/Shop/comment/dislike.svg";
import like from "../../../../../assets/images/Shop/comment/like.svg";
import useGetUser from "../../../../../hooks/Profile/useGetUser";
import { useEffect, useState } from "react";
import { updateSubCommentLikes } from "./subCommentQueries";
import useGetReactedSubComment from "../../../../../hooks/SubComment/useGetReactedSubComment";
import FormatBigNumbers from "../../../../../utilities/FormatBigNumbers";
import SubCommentForm from "./SubCommentForm";
import useGetAllSubComments from "../../../../../hooks/SubComment/useGetAllSubComments";

export type SubCommentComponentTypes = {
  showSubComment: boolean;
} & SubCommentTypes;

export default function SubComment({
  _id,
  amountOfDisLikes,
  amountOfLikes,
  text,
  userId,
  showSubComment,
}: SubCommentComponentTypes) {
  const user = useGetUser({ userId });

  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [currentAmountOfLikes, setCurrentAmountOfLikes] =
    useState(amountOfLikes);
  const [currentAmountOfDisLikes, setCurrentAmountOfDisLikes] =
    useState(amountOfDisLikes);

  const reactedComment = useGetReactedSubComment({ subCommentId: _id, userId });
  const [currentLiked, setCurrentLiked] = useState(reactedComment?.isLiked);

  const subComments = useGetAllSubComments({ commentId: _id });

  useEffect(() => {
    setCurrentLiked(reactedComment?.isLiked);
  }, [reactedComment?.isLiked]);

  const [reply, setReply] = useState("");

  const handleLike = () => {
    if (reactedComment) {
      if (!currentLiked) {
        setCurrentLiked(true);
        setCurrentAmountOfLikes((prev) => (prev += 1));
        setCurrentAmountOfDisLikes((prev) => (prev -= 1));
        updateSubCommentLikes({
          subCommentId: _id,
          isLiked: true,
          userId: user._id,
        });
      }
    } else {
      setCurrentAmountOfLikes((prev) => (prev += 1));
      updateSubCommentLikes({
        subCommentId: _id,
        isLiked: true,
        userId: user._id,
      });
    }
  };
  const handleDisLike = () => {
    if (reactedComment) {
      if (currentLiked) {
        setCurrentLiked(false);
        setCurrentAmountOfLikes((prev) => (prev -= 1));
        setCurrentAmountOfDisLikes((prev) => (prev += 1));
        updateSubCommentLikes({
          subCommentId: _id,
          isLiked: false,
          userId: user._id,
        });
      }
    } else {
      setCurrentAmountOfDisLikes((prev) => (prev += 1));
      updateSubCommentLikes({
        subCommentId: _id,
        isLiked: false,
        userId: user._id,
      });
    }
  };

  return (
    <section
      className={`${
        showSubComment ? "" : "hidden"
      } mb-[1rem] ml-[2rem] mt-[1rem]`}
    >
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
        userId={user._id}
      />
      {subComments.length > 0 &&
        subComments?.map((sc) => (
          <SubComment key={sc._id} {...sc} showSubComment={showReplies} />
        ))}
    </section>
  );
}
