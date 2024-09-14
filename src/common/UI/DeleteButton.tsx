import { useContext } from "react";
import { NotesContextUser } from "../../context/NotesContextUser.js";
import Trash from "../../assets/icons/Trash.jsx";
import { db } from "../../configs/appwrite/databases.js";

// type DeleteButtonProps = {
//   handleDelete: () => void;
//   noteId: string;
// }

const DeleteButton = ({noteId}:any) => {
  const { setNotes } = useContext(NotesContextUser);
  const handleDelete = async () => {
    db.notes.delete(noteId);
    setNotes((prevState) =>
      prevState.filter((note) => note.$id !== noteId)
    );
  };
  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};
export default DeleteButton;
