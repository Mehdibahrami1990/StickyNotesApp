import { useContext } from "react";
import { NoteCard, AddNote } from "../constants/index.jsx";
import { NotesContextUser } from "../context/NotesContextUser";
const NotesPage = () => {
  // console.log("pp")
  const { notes } = useContext(NotesContextUser);
  return (
    <div>
      {notes?.map((note:any) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <AddNote />
    </div>
  );
};

export default NotesPage;
