import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const url = `http://localhost:1337/api/posts/${id}`;
  const [ post, setPost ] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, {
        method: 'get', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
    .then(response => response.json())
    .then(data => { 
        setPost(data.data.attributes.text);
      })
    .catch((error) => {
        console.error(error);
      });
  }, []);

  const updatePost = (e) => {
    e.preventDefault();
    const postInfo = {data:{ text: post }}

    fetch(url, {
        method: 'put', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      body: JSON.stringify(postInfo),
      })
    .then(response => response.json())
    .then(data => { 
        setPost(data);
        navigate('/me');
      })
    .catch((error) => {
        console.error(error);
      });
  };

  return ( 
    <div className="flex flex-col">
      <h1>Edit Post</h1> 
      <form onSubmit={updatePost} className="flex flex-col m-2">
            <label>Text:</label>
        <textarea type="text" value={post ?? ''} onChange={(e) => setPost(e.target.value)} />
        <button className="bg-rose-500 mt-3">Edit Post</button>
      </form>
    </div>
  )
}

export { EditPost }
