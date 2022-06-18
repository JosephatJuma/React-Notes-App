import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Header } from "./componets/Header";
import { SideBar } from "./componets/SideBar";
import { Display } from "./componets/Display";
import { Form } from "./componets/Form";
import { Footer } from "./componets/Footer";
import { useEffect } from "react";
import apiRequest from "./apiRequest";
import Fontawesome from "@fortawesome/react-fontawesome";
const API_UIRL = "http://localhost:8000/notes";
export const App = () => {
  const [notes, setNotes] = useState([]);
  const [adding, setAdding] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedNote, setSelectedNote] = useState({});
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [classSelected, setClassSelected] = useState("");
  const change = (id) => {
    setIsSelected(!isSelected);
    setClassSelected("");
    //console.log(isSelected);
  };
  useEffect(() => {
    fetch(API_UIRL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNotes(data);
      });
  }, []);
  const deleteNote = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete note " + id + "?"
    );
    if (confirm == true) {
      const listNotes = notes.filter((note) => note.id !== id);
      setNotes(listNotes);

      const deleteOptions = { method: "DELETE" };
      const reqUrl = `${API_UIRL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
      //window.alert("Note Deleted Successfully");
      setDeleteMsg("Note Deleted Successfully");
      setIsSelected(!isSelected);
    }
  };
  const selectNote = async (note) => {
    setSelectedNote(note);
    //console.log(note);
    //return note;
    setText(note.text);
    setTitle(note.title);
    setDate(note.date);
    setId(note.id);
    //console.log(text);
    setIsSelected(false);
    setDeleteMsg("");
    //setAdding(false);
    setClassSelected("selected");
    if (adding == true) {
      alert("Discard to view another note!");
      const discard = window.confirm(" Do want to discard?");
      if (discard == true) {
        setAdding(!adding);
      }
    }
  };
  return (
    <div className="app">
      <Header
        appName="React Note Book"
        add={adding}
        onAdd={() => setAdding(!adding)}
      />
      <main>
        <SideBar
          notes={notes}
          changeisSelected={selectNote}
          onAdd={() => setAdding(!adding)}
          adding={adding}
          onDelete={deleteNote}
          change={change}
          className={classSelected}
        />
        <div className="display">
          {!adding ? (
            <>
              <div className="title-bar">
                {!isSelected == true ? (
                  <>
                    <div>TITLE: {title}</div>
                    <div className="div">DATE MODIFIED: {date}</div>
                    <div>
                      <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="delete-icon"
                        onClick={() => deleteNote(id)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h1>SELECT NOTE</h1>
                  </>
                )}
              </div>
              <div className="main-display">
                {!isSelected ? (
                  <div>
                    <Display text={text} />
                  </div>
                ) : (
                  <div>
                    <h2>
                      {deleteMsg ? (
                        <>{deleteMsg}</>
                      ) : (
                        <>Selected notes will appear here</>
                      )}
                    </h2>{" "}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Form
                onAdd={setNotes}
                notes={notes}
                api_url={API_UIRL}
                cancel={() => setAdding(!adding)}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default App;
