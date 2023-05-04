import clientPromise from "../lib/mongodb";
import CreateNote from "./CreateNote";
import Link from 'next/link';

export default function Notes({ notes }) {
    return (
        <div>
            <h1>Notes of All Time</h1>
            <CreateNote />
            <ul>
                {notes.map((note) => (
                    <li>
                        <h2>{note.title}</h2>
                        <h3>{note.content}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("notetaker2");

        const notes = await db
            .collection("notes")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { notes: JSON.parse(JSON.stringify(notes)) },
        };
    } catch (e) {
        console.error(e);
    }
}