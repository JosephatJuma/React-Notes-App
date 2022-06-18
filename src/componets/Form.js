import { useState } from "react";
import apiRequest from "../apiRequest";

export const Form = ({ onAdd, notes, api_url, adding, add, cancel }) => {
  let myDate = new Date();
  let day = myDate.getDay();
  let month = myDate.getMonth();
  let year = myDate.getFullYear();
  let hour = myDate.getHours();
  let minutes = myDate.getMinutes();
  let secs = myDate.getSeconds();

  let milsecs = myDate.getMilliseconds();
  var date =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minutes +
    ":" +
    secs +
    ":" +
    milsecs;
  const [title, setTitle] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [text, setText] = useState("");

  const saveNote = async (note) => {
    if (!title) {
      alert("Title must be sent!");
      adding(add);
    } else {
      const confirm = window.confirm("Are would you like to save the note?");
      if (confirm == true) {
        const id = notes.length ? notes[notes.length - 1].id + 1 : 1;
        const newNote = {
          id,
          title,
          text,
          date,
        };
        const listNotes = [...notes, newNote];
        //setNotes(listNotes);
        onAdd(listNotes);

        const postOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        };
        const result = await apiRequest(api_url, postOptions);
        if (result) setFetchError(result);
      }
    }
  };
  return (
    <>
      <form onSubmit={saveNote}>
        <label htmlFor="title">
          <h2>TITLE</h2>
        </label>
        <div className="form-control">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label htmlFor="Text">
          <h2>TYPE TEXT HERE</h2>
        </label>
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
        ></textarea>
        <input type="submit" name="btn" className="submit" value="Sava" />
      </form>
      <ul>
        <li onClick={cancel}>Discard</li>
        <li>New Line</li>
        <li>Imojis</li>
        <li>Copy</li>
        <li>Back Space</li>
      </ul>
    </>
  );
};
