"use client"
import { FormEvent } from 'react'


const CreateNote = () => {


  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const data = {
      title: form.title as string,
      content: form.content.value as string,
    }

    // Send the form data to our API and get a response.
    const response = await fetch("https://localhost:3001/api/notes/", {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    return result
  }

  
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        name = 'title'
        id = 'title'
      />
      <textarea
        placeholder="Content"
        name = 'content'
        id='content'
      />
      <button type="submit">
        Create note
      </button>
    </form>
    </div>
    
    );
    
  }

export default CreateNote