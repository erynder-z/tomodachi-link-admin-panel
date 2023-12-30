import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns/format';
import { useState } from 'react';
import {
  MdOutlineModeComment,
  MdThumbUpOffAlt,
  MdThumbDownOffAlt,
} from 'react-icons/md';
import PostCommentSection from '../PostCommentSection/PostCommentSection';
import ConfirmationOverlay from '../ConfirmationOverlay/ConfirmationOverlay';
import { handleFetchErrors } from '../../utilities/handleFetchErrors';
import { displaySuccessInfo } from '../../utilities/displaySuccessInfo';
import { displayErrorInfo } from '../UserNotification/displayErrorInfo';
import useInfoCard from '../../hooks/useInfoCard';

type SinglePostProps = {
  token: string | null;
};

export default function SinglePost({ token }: SinglePostProps) {
  const { setInfo } = useInfoCard();
  const location = useLocation();
  const navigate = useNavigate();
  const postData = location?.state?.postData;

  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!postData) {
    return (
      <div className="p-4">
        <p>No post data available.</p>
      </div>
    );
  }

  const { _id, text, createdAt, comments, reactions, gifUrl } = postData;
  const { firstName, lastName, userpic } = postData.owner;

  const date = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
  const userImage = userpic?.data;
  const postImage = postData?.image?.data;
  const postVideoID = postData?.embeddedVideoID;

  const handleShowCommentsClick = () =>
    setShowCommentSection(!showCommentSection);

  const handleDeleteClick = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/api/v1/admin/post/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) handleFetchErrors(response, setInfo);

      displaySuccessInfo(setInfo, 'Post deleted!', '🗑️');
    } catch (err: unknown) {
      displayErrorInfo(setInfo, 'Unable to delete post!', '👻');
    } finally {
      setShowConfirmation(false);
      navigate('/posts');
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <section className="flex justify-between gap-2">
        <div className="flex gap-2 font-bold">
          <img
            loading="lazy"
            className="w-8 h-8 object-cover rounded-full"
            src={`data:image/png;base64,${userImage}`}
            alt="User avatar"
          />{' '}
          {firstName} {lastName}
        </div>
        <div>{date}</div>
      </section>
      <section className="text-xs">post id: {_id}</section>
      <article>{text}</article>
      {postImage && (
        <div className="flex justify-center">
          <img
            loading="lazy"
            className="w-fit h-auto object-cover cursor-pointer"
            src={`data:image/png;base64,${postImage}`}
            alt="User uploaded image"
          />
        </div>
      )}
      {gifUrl && (
        <div className="flex justify-center">
          <img
            loading="lazy"
            className="w-fit h-auto object-cover"
            src={gifUrl}
            alt="User uploaded gif"
          />
        </div>
      )}
      {postVideoID && (
        <div className="flex flex-col text-xs h-auto w-full">
          <div className="relative h-0 overflow-hidden w-3/4 pb-youtube mx-auto">
            <iframe
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              title={`YouTube Video ${postVideoID}`}
              src={`https://www.youtube.com/embed/${postVideoID}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <div className="flex justify-around">
        <button
          onClick={handleShowCommentsClick}
          className="flex justify-center items-center gap-1"
        >
          <MdOutlineModeComment /> {comments?.length}
        </button>
        <div className="flex justify-center items-center gap-1">
          <MdThumbUpOffAlt /> {reactions?.positive}
        </div>
        <div className="flex justify-center items-center gap-1">
          <MdThumbDownOffAlt /> {postData?.reactions?.negative}
        </div>
      </div>
      {showCommentSection && (
        <PostCommentSection
          comments={comments}
          handleShowCommentsClick={handleShowCommentsClick}
        />
      )}
      <button
        onClick={handleDeleteClick}
        className="w-full bg-red-500 hover:bg-red-600 text-neutral-50 p-2"
      >
        Delete post
      </button>
      {showConfirmation && (
        <ConfirmationOverlay
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
}
