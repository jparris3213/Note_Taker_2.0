import { useRouter } from 'next/router';
import useSWR from 'swr';
import NoteForm from '../../components/NoteForm';

const fetcher = (url) =>
    fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditNote = () => {
    const router = useRouter()
    const { id } = router.query
    const {
        data: note,
        error,
        isLoading,
    } = useSWR(id ? `/api/notes/${id}` : null, fetcher)

    if (error) return <p>Failed to Load</p>
    if (isLoading) return <p>Loading...</p>
    if (!note ) return null

    const noteForm = {
        title: note.title,
        content: note.content,
    }

    return <NoteForm formId="edit-note-form" noteForm={noteForm} forNewNote={false} />
}

export default EditNote