type ConfirmationOverlayProps = {
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
};

export default function ConfirmationOverlay({
  handleConfirmDelete,
  handleCancelDelete,
}: ConfirmationOverlayProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-md">
        <p>Are you sure?</p>
        <div className="flex gap-4 mt-4">
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
