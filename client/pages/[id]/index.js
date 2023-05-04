import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Note from '../../models/Note'

/* Allows you to view note card info and delete note card*/
const NotePage = ({ note }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const noteID = router.query.id

    try {
      await fetch(`/api/notes/${noteID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the note.')
    }
  }

  return (
    <div key={note._id}>
      <div className="card">
        <img src={note.image_url} />
        <h5 className="pet-name">{note.title}</h5>
        <div className="main-content">
          <p className="pet-name">{note.title}</p>
          <p>{note.content}</p>


          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${note._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const note = await Note.findById(params.id).lean()
  note._id = note._id.toString()

  return { props: { note } }
}

export default NotePage
