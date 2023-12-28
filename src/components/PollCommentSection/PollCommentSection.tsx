import { useState } from 'react';
import PollCommentButton from './PollCommentButton/PollCommentButton';
import { CommentType } from '../../types/commentTypes';
import CommentList from '../CommentList/CommentList';

type PollCommentSectionProps = {
  comments: CommentType[] | undefined;
};

export default function PollCommentSection({
  comments,
}: PollCommentSectionProps) {
  const [showCommentSection, setShouldCommentSectionShow] =
    useState<boolean>(false);

  const numberOfComments = comments?.length;

  const handleShowCommentsClick = () => {
    setShouldCommentSectionShow(!showCommentSection);
  };

  return (
    <div className="flex flex-col w-full">
      <PollCommentButton
        handleShowCommentsClick={handleShowCommentsClick}
        numberOfComments={numberOfComments}
      />
      {showCommentSection && (
        <div className="flex flex-col">
          <CommentList
            comments={comments}
            onToggleListButtonClick={handleShowCommentsClick}
          />
        </div>
      )}
    </div>
  );
}
