import React, { useState, useEffect,useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from "./components/LoginForm";
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'
const App = () => {
  //-------------------------------------FIRST RENDER-------------------------------------------------------------------
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()
//--------------------------------FETCH NOTES AND LOCAL STORAGE-------------------------------------------------------
  //fetch notes
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  //fetch token : win local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  //-----------------------------------------HELPER FUNCTION------------------------------------------------------------
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log( username, password)
    try {
      //Sending body:   { username: 'Spartacus', password: 'Sparta' }
      const user = await loginService.login({
        username, password
      })//simplification if prop and value have the same name
      //response with user = {username,password,token}
      //local storage is a key,value db
      //a JS object (user) can be parsed using JSONstringify methode
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')//reset input
      setPassword('')//reset input

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)//delete msg after 5 seconds
      }, 5000);

    }
  }
  const loginForm = () =>
  (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const noteForm = () => (

    <Togglable buttonLabel="new Note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>

  )
  //--------------------------------------FUNCTION RELATED TO EVENTS--------------------------------------------
  
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  //FILTER NOTES

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  //--------------------------------------------------JSX--------------------------------------------------------------
  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {/*conditionaly render helper components */}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name}logged-in</p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App 