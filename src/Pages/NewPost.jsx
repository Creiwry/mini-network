import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms";

const NewPost = () => {
  const url = `http://localhost:1337/api/posts?populate=*`;
  const [ post, setPost ] = useState('')
  const user = useAtomValue(userAtom) 
  const navigate = useNavigate();

  const updatePost = (e) => {
    e.preventDefault();
    const postInfo = {data:{ text: post, users_permissions_user: { id: user.id } }}

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
        navigate(`/users/${user.id}`);
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
        <button className="bg-rose-500 mt-3">Post</button>
      </form>
    </div>
  )
}

export { NewPost }
