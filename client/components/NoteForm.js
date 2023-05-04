import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const NoteForm = ({ noteId, noteForm, forNewNote = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: noteForm.title,
    content: noteForm.content,
    //eactions: noteForm.reactions,
  });

  /* PUT Method */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/notes/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update note");
    }
  };

  //POST Method//
  const postData = async (form) => {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add pet");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained" ? target.checked : target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const formValidate = () => {
    let err = {};
    if (!form.title) err.title = "Title is required";
    if (!form.content) err.content = "Content Required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewNote ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={noteId} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          maxLength="20"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">Content</label>
        <input
          type="text"
          maxLength="120"
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => {
          <li key={index}>{err}</li>;
        })}
      </div>
    </>
  );
};

export default NoteForm;
