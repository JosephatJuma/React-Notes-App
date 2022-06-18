export const Header = ({ appName, add, onAdd }) => {
  return (
    <header>
      <div className="nav">
        <div className="app-name">
          <h2>{appName}</h2>
        </div>
        <div className="nav-links">
          <ul>
            <li>About us</li>
            <li>Contact</li>
            <li>Learn More</li>
            <li>
              {!add ? (
                <button
                  className="add-btn"
                  onClick={onAdd}
                  style={{ backgroundColor: "blue" }}
                >
                  Add Note
                </button>
              ) : (
                <button
                  className="add-btn"
                  onClick={onAdd}
                  style={{ backgroundColor: "red" }}
                >
                  Discard
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
