import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleClickDelete = () => {
    startDeletingEvent();
  };
  return (
    hasEventSelected && (
      <button className="btn btn-danger fab-danger" onClick={handleClickDelete}>
        <i className="fas fa-trash-alt"></i>
      </button>
    )
  );
};
