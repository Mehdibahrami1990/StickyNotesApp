import Plus from '../../assets/icons/Plus';
import moment from 'moment'
import colors from '../../assets/colors.json';
import { useRef, useContext } from 'react';
import * as _ from "lodash";
import { db } from '../../configs/appwrite/databases';
import { NotesContextUser } from '../../context/NotesContextUser';

const AddButton = () => {
  const { setNotes } = useContext(NotesContextUser);
  const startingPos = useRef(10);
  const date = new Date();
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(_.sample(colors)),
      date: moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"),
      deadline:60
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
