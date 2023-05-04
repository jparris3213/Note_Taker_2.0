import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Note from '../models/Note'

const Index = ({notes}) => (

    <>
    {notes.map((note) => (
        <div key={note._id}>
            <div className="card">
                <h2>{note.title}</h2>
                <div className='main-content'>
                    <p>{note.content}</p>
                    <div className="btn-container">
              <Link href="/[id]/edit" as={`/${note._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${note._id}`} legacyBehavior>
                <button className="btn view">View</button>
                </Link>
            </div>
                </div>
        </div>
        </div>
    ))}
    </>
)

export async function getServerSideProps() {
    await dbConnect()

    const result = await Note.find({})
    const notes = result.map((doc) => {
        const note = doc.toObject()
        note._id = note._id.toString()
        return note
    })

    return {props: { notes: notes}}
}

export default Index