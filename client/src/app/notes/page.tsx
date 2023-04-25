"use client"
// import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote'
import React, { useState, useEffect } from 'react'

// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'


async function getNotes() {

  
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');
  const res = await fetch('/api/notes/', { cache: 'no-store' });
  const data = await res.json();
  console.log(data)
  return data
} 

const NotesPage = async () => {
  

  const [notes, setNote] = useState(null)
  const [isLoading, setLoading] = useState(false)
  

  await useEffect(() => {
    setLoading(true)
    fetch('/api/notes/', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNote(data)
        setLoading(false)
      }).catch((err) => console.error(err))
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!notes) return <p>No Notes data</p>
 


  return(
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </div>
     
    </div>
  );
}

function Note({ note }: any) {
  const { _id, title, content} = note || {};

  return (
    <Link href={`/api/notes/${_id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
      </div>
    </Link>
  );
}


export default NotesPage;