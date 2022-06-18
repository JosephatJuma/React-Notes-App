import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const SideBar = ({
  notes,
  changeisSelected,
  onAdd,
  adding,
  change,
  className,
  onDelete,
}) => {
  return (
    <div className="side-bar">
      <div className="top">
        <h1>ALL NOTES</h1>
      </div>

      <ul>
        {notes &&
          notes.map((note) => (
            <li
              onClick={() => changeisSelected(note)}
              onDoubleClick={change}
              key={note.id}
              className={changeisSelected && className}
            >
              <div className="details">
                {note.id}
                <br />
                {note.title}
              </div>

              <div className="del-icon">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => onDelete(note.id)}
                />
              </div>
            </li>
          ))}
        <li
          style={
            !adding ? { backgroundColor: "blue" } : { backgroundColor: "red" }
          }
          onClick={onAdd}
          className="btn"
        >
          {adding ? <>Cancel Adding</> : <>Add a new note</>}
        </li>
      </ul>
    </div>
  );
};
