import React, { useState, useEffect, createContext } from "react";
import Spinner from "../assets/icons/Spinner";
import { db } from "../configs/appwrite/databases";
import { contextDataProps } from "./type";
import { toast } from "react-toastify";
type ContextProviderProps = {
  children?: React.ReactNode;
};

export const NotesContextUser = createContext({} as contextDataProps);

const NotesProvider = ({ children }: ContextProviderProps) => {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState();

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
    // console.log("oo", response);
    if (response.total === 0) {
      setLoading(false);
      const notify = () => toast.warning("There is no Sticky Note 😕",{
        position: "top-center",
      });
      notify();
    }
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            margin:"auto",
            backgroundColor: "#9bd1de"
          }}
        >
          <Spinner size="50" />
        </div>
      ) : (
        children
      )}
    </NotesContextUser.Provider>
  );
};

export default NotesProvider;
