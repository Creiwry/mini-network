import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const userUrl = 'http://localhost:1337/api/users/me'
  const url = `http://localhost:1337/api/posts/`;
  const [ post, setPost ] = useState('')
  const [ user, setUser ] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetch(userUrl, {
        method: 'get', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
    .then(response => response.json())
    .then(data => { 
        setUser(data.id);
      })
    .catch((error) => {
        console.error(error);
      });
  }, []);

  const updatePost = (e) => {
    e.preventDefault();
    const postInfo = {data:{ text: post, user: user }}

    fetch(url, {
        method: 'post', 
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
      <h1>New Post</h1> 
      <form onSubmit={updatePost} className="flex flex-col m-2">
            <label>Text:</label>
        <textarea type="text" value={post ?? ''} onChange={(e) => setPost(e.target.value)} />
        <button className="bg-rose-500 mt-3">Edit Post</button>
      </form>
    </div>
  )
}

export { NewPost }
