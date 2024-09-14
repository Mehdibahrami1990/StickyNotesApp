import {NotesPage} from "./constants/index.jsx"
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
     <ToastContainer
        style={{
          marginTop: "80px",
          textAlign: "center",
          width: "auto",
          fontFamily: "IRANSans",
          zIndex: "99999",
        }}
      />
      <div id="app">
        <NotesPage/>
      </div>
    </>
  );
}

export default App;
