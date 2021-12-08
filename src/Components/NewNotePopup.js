import React, { useState } from 'react';

const NewNotePopup = ({
  isOpened,
  addHandler,
  cancelHandler,
}) => {
  const [newNoteText, setNewNoteText] = useState('');
  return (
    <div className={`new_post_popup ${isOpened ? 'active' : ''}`}>
      <form className="new_post_popup__form">
        <h3>
          Adding new note
        </h3>
        <textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Note text..."
        />
        <div>
          <button onClick={(e) => {e.preventDefault();addHandler(newNoteText);setNewNoteText('');}}>
            Add
          </button>
          <button onClick={(e) => {e.preventDefault();cancelHandler();}}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewNotePopup;
