import { CommentType } from '../../types/commentTypes';
import CommentList from '../CommentList/CommentList';

type PostCommentSectionProps = {
  comments: CommentType[] | undefined;
  handleShowCommentsClick: () => void;
};

export default function PostCommentSection({
  comments,

  handleShowCommentsClick,
}: PostCommentSectionProps) {
  const onToggleListButtonClick = () => handleShowCommentsClick();

  return (
    <div className="flex flex-col gap-4">
      <CommentList
        comments={comments}
        onToggleListButtonClick={onToggleListButtonClick}
      />
    </div>
  );
}
