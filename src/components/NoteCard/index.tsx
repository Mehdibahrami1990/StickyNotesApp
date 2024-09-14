import { useEffect, useRef, useState, useContext } from 'react';
import {
  setNewOffset,
  autoGrow,
  setZIndex,
  bodyParser,
} from '../../utilities/utils';
import { db } from '../../configs/appwrite/databases';
import Spinner from '../../assets/icons/Spinner.jsx';
import DeleteButton from '../../common/UI/DeleteButton';
import { NotesContextUser } from '../../context/NotesContextUser';
import Timer from '../../common/UI/Timer';
const NoteCard = ({ note }: any) => {
  // console.log('mehdi');
  const mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  const [timeLift, setTimeLift] = useState<number | null>(null);
  const { setSelectedNote } = useContext(NotesContextUser);
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef<number | null>(null);

  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const date = bodyParser(note.date);
  const deadline: number = bodyParser(note.deadline);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  const mouseDown = (e) => {
    if (e.target.className === 'card-header') {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      setZIndex(cardRef.current);

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = async () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData('position', newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    console.log('Save data called:', payload);
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      console.log('Timer started');
      saveData('body', textAreaRef.current!.value);
    }, 2000);
  };
  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: timeLift !== 0 ? colors.colorBody : '#F44336',
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{
          backgroundColor: timeLift !== 0 ? colors.colorHeader : '#F44336',
        }}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          autoFocus={true}
          onKeyUp={handleKeyUp}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          disabled={timeLift === 0}
        ></textarea>
        {timeLift !== 0 ? (
          <span
            style={{ color: '#000', display: 'flex', alignItems: 'center' }}
          >
            {'Expiration Time'} :{' '}
            <Timer sec={deadline} TimeLift={setTimeLift} />
          </span>
        ) : (
          <span
            style={{
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            This Sticky note has been expired !!! 😕😔
          </span>
        )}
        <span style={{ color: '#000' }} className="date">
          {date}
        </span>
      </div>
    </div>
  );
};
// This note has expired

export default NoteCard;
