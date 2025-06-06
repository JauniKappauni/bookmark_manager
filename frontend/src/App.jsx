import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

const api = "http://localhost:3002/api/bookmarks"

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const fetchBookmarks = async() => {
    const res = await axios.get(api)
    setBookmarks(res.data)
  }

  useEffect(() => {
    fetchBookmarks()
  }, []);

  const addBookmark = async (e) => {
    e.preventDefault();
    console.log("Adding:", title, url)
    await axios.post(api, { title, url });
    setTitle("");
    setUrl("");
    fetchBookmarks();
  };
  const deleteBookmark = async (id) => {
    await axios.delete(`${api}/${id}`)
    fetchBookmarks()
  };

  return (
    <>
    <form onSubmit={addBookmark}>
      <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
      <input type="url" onChange={(e) => setUrl(e.target.value)}></input>
      <input type="submit" value="Add"></input>
    </form>

    <ul>
        {bookmarks.map((bm) => (
          <li key={bm.id}>
            <a href={bm.url} target="_blank">{bm.title}</a>
            <button onClick={() => deleteBookmark(bm.id)}>Delete</button>
          </li>
        ))}
    </ul>
      </>
  )
}

export default App
