import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms";

const EditPost = () => {
  const { id } = useParams();
  const url = `http://localhost:1337/api/posts/${id}?populate=*`;
  const [ post, setPost ] = useState('')
  const navigate = useNavigate();
  const currentUser = useAtomValue(userAtom)

  const authCurrentUser = (post) => {
    if(post.users_permissions_user.data.id === currentUser.id) {
      return true
    } else {
      return false
    }
  }

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
          if (authCurrentUser(data.data.attributes)) {
            setPost(data.data.attributes.text);
          } else {
            console.error("You are not allowed to edit this post")
            navigate("/home")
          }
      })
    .catch((error) => {
        console.error(error);
      });
  }, [url]);

  const updatePost = (e) => {
    e.preventDefault();
    const postInfo = {data:{ text: post, users_permissions_user: {id: currentUser.id} }}

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
          if (authCurrentUser(data.data.attributes)) {
            setPost(data);
          } else {
            console.error("You are not allowed to edit this profile")
          }
        navigate(-1);
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
