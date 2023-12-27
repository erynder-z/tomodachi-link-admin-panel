import { CommentType } from '../../types/commentTypes';
import CommentItem from './CommentItem/CommentItem';
import { MdExpandMore } from 'react-icons/md';
type CommentListProps = {
  comments?: CommentType[];
  onToggleListButtonClick: () => void;
};

export default function CommentList({
  comments = [],
  onToggleListButtonClick,
}: CommentListProps) {
  const commentItems = comments.map((comment) => (
    <CommentItem key={comment._id} commentDetails={comment} />
  ));

  const hasComments = commentItems.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="ml-auto h-full flex items-center rotate-on-hover cursor-pointer hover:text-highlight dark:hover:text-highlightDark transition-all"
        onClick={onToggleListButtonClick}
      >
        <MdExpandMore size="1.25em" className="hover:animate-squish" />
      </div>
      {hasComments ? (
        commentItems
      ) : (
        <span className="text-xs font-bold">No comments yet!</span>
      )}
    </div>
  );
}
