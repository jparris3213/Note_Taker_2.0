"use client"
// import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote'
import { useState, useEffect } from 'react'

// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'


/* async function getNotes() {

  
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');
  const res = await fetch('https://localhost:3001/api/notes/', { cache: 'no-store' });
  const data = await res.json();
  return data?.items as any[];
} */

const NotesPage = async () => {
  const [note, setNote] = useState([""])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/notes/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNote(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!note) return <p>No Notes data</p>


  //const notes = await getNotes();

  return(
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {note?.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </div>
     
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content} = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
      </div>
    </Link>
  );
}


export default NotesPage;