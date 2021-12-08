import React, { useRef, useState } from 'react';

const notes = require('./../notes.json');
const Note = ({id, text, deleteNoteHandler}) => {
  const [postText, setPostText] = useState(text);
  const [isEditable, setIsEditable] = useState(false);
  const tags = useRef([]);
  const textChangeHandler = (e) => {
    tags.current = [];
    e.target.value.split(' ').forEach((word) => {
        if (word.includes("#")){
          const position = word.indexOf('#');
          if (!tags.current.includes(word.substring(position))){
            tags.current.push(word.substring(position));    
          }
        }
      });
    setPostText(e.target.value);
  }
  const saveChangesHandler = () => {
    notes.posts[notes.posts.findIndex((post) => post.id === id)].text = postText;
    setIsEditable(false);
  }
  return (
    <div className="note">
      <div className="note__header">
        {
          isEditable
            ? <img src="./assets/checkmarkWhite.png" alt="submit" onClick = {saveChangesHandler} />
            : <img src="./assets/editIconWhite.png" alt="edit" onClick = {() => setIsEditable(true)} />
        }
        <img src="./assets/crossIconWhite.png" alt="cross" onClick={() => deleteNoteHandler(id)} />
      </div>
      <div className="note__body">
        {
        isEditable
        ? <textarea value={postText} onChange={textChangeHandler} />
        : <p>
          {
            (postText || '').split(' ').map((word) => {
              if (word.includes("#")){
                const position = word.indexOf('#');
                if (!tags.current.includes(word.substring(position))){
                  tags.current.push(word.substring(position));    
                }
                return (
                  <>
                    {word.substring(0, position)}
                    <span>{`${word.substring(position)} `}</span>
                  </>
                );
              }
              return `${word} `;
            })
          }
        </p>
        }
        <div>
          {
            tags.current.map((tag) => <span key={tag} className="tag">{tag}</span>)
          }
        </div>
      </div>
    </div>
  );
};

export default Note;
