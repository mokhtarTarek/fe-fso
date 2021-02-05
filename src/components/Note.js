
import React from 'react'
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
export default Note;
/*
--li element has the css classname note, that is used 
to access the comp in our test





*/
