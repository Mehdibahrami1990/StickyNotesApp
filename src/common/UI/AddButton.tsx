import Plus from '../../assets/icons/Plus';
import colors from '../../assets/colors.json';
import { useRef, useContext } from 'react';
import { db } from '../../configs/appwrite/databases';
import { NotesContextUser } from '../../context/NotesContextUser';

type AddButtonProps = {
  setNotes?: string[];
  onClick: () => Promise<void>;
  styles: string;
};

const AddButton: React.FC<AddButtonProps> = () => {
  const { setNotes } = useContext(NotesContextUser);
  const startingPos = useRef(10);
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };

    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState) => [response, ...prevState]);
  };
  return (
    <div id='add-btn' onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
