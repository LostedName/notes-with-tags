import React, { useState } from "react";
import NewNotePopup from "./Components/NewNotePopup";
import Note from "./Components/Note";
const jsonNotes = require('./notes.json');

const App = () => {
  const [notes, setNotes] = useState(jsonNotes.posts);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [filter, setFilter] = useState('');
  const cancelAddingHandler = () => {
    setIsPopupOpened(false);
  }
  const addNoteHandler = (text) => {
    jsonNotes.posts.push(
      {
        id: (+jsonNotes.posts[jsonNotes.posts.length - 1]?.id || 0) + 1,
        text,
      }
    );
    setNotes([...jsonNotes.posts]);
    setIsPopupOpened(false);
  }
  const deleteNoteHandler = (id) => {
    jsonNotes.posts = jsonNotes.posts.filter((note) => note.id !== id);
    setNotes(notes.filter((note) => note.id !== id));
  }
  const filterHandler = () => {
    if (filter === ''){
      setNotes(jsonNotes.posts);
      return;
    }
    setNotes(jsonNotes.posts.filter((note) => {
      const words = (note.text || '').split(' ');
      for (let word of words){
        if (word.includes("#")){
          const position = word.indexOf('#');
          if (word.substring(position).toLowerCase() === filter.toLowerCase()) return true;
        }
      }
      return false;
    }));
  }
  return (
    <>
      <NewNotePopup
        isOpened={isPopupOpened}
        addHandler={addNoteHandler}
        cancelHandler={cancelAddingHandler}
      />
      <header>
        <h1>
          Note with tags
        </h1>
      </header>
      <div className="content">
        <div className="content__form">
          <button onClick={() => setIsPopupOpened(true)}>
            Add new
          </button>
          <div>
            <input
              type="text"
              placeholder="Tag"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button onClick={filterHandler}>
              Filter tags
            </button>
          </div>
        </div>
        <div className="content__notes">
          {
            notes.map((post) => (
              <Note
                key={post.id}
                id={post.id}
                text={post.text}
                deleteNoteHandler={deleteNoteHandler}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
