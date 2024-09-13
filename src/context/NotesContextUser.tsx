import { createContext} from 'react';
import { useState, useEffect } from 'react';
import Spinner from '../assets/icons/Spinner';
import { db } from '../configs/appwrite/databases';

type ContextProviderProps = {
  children?: React.ReactNode;
};
type contextDataProps = {
  notes: undefined;
};
export const NotesContextUser = createContext<contextDataProps | null>(null);

const NotesProvider = ({ children }: ContextProviderProps) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState();

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.document);
    setLoading(false);
  };
  const contextData = {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
  };

  return (
    <NotesContextUser.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NotesContextUser.Provider>
  );
};

export default NotesProvider;
