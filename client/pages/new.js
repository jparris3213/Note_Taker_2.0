import NoteForm from '../components/NoteForm'


const NewNote = () => {
    const noteForm = {
        title: '',
        content: '',
    }
    

    return <NoteForm noteId="add-note-form" noteForm={noteForm} />
}

export default NewNote