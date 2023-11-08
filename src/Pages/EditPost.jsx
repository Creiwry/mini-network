import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms";
import { useCallback } from "react";


const EditPost = () => {
  const { id } = useParams();
  const url = `http://localhost:1337/api/posts/${id}?populate=*`;
  const urlDelete = `http://localhost:1337/api/posts/${id}`;
  const [ post, setPost ] = useState({data:{ attributes:{text: "", users_permissions_user: {id: null} }}})
  const navigate = useNavigate();
  const currentUser = useAtomValue(userAtom)

  const authCurrentUser = useCallback((post) => {
    if(post.users_permissions_user.data.id === currentUser.id) {
      return true
    } else {
      return false
    }
  }, [currentUser.id])

  const deletePost = (e) => {
    e.preventDefault();
    console.log(post)
    if (authCurrentUser(post.data.attributes)) {

      fetch(urlDelete, {
          method: 'delete', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
        })
      .then(response => response.json())
      .then(() => { 
          console.log("delete request sent")
          navigate("/home");
        })
      .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("You are not allowed to delete this post")
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
        console.log(data)
          if (authCurrentUser(data.data.attributes)) {
            setPost(data);
          } else {
            console.error("You are not allowed to edit this post")
            navigate("/home")
          }
      })
    .catch((error) => {
        console.error(error);
      });
  }, [url, authCurrentUser, navigate]);

  const updatePost = (e) => {
    e.preventDefault();
    const postInfo = {data:{ text: post.data.attributes.text, users_permissions_user: {id: currentUser.id} }}

    fetch(url, {
        method: 'put', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      body: JSON.stringify(postInfo),
      })
    .then(response => response.json())
    .then(() => { 
        navigate(-1);
      })
    .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    {post ? 
    <div className="flex flex-col">
      <h1>Edit Post</h1> 
      <form onSubmit={updatePost} className="flex flex-col m-2">
            <label>Text:</label>
        <textarea type="text" value={post.data.attributes.text} onChange={(e) => setPost({data:{ attributes:{text: e.target.value, users_permissions_user: {id: currentUser.id} }}})} />
        <button className="bg-rose-500 mt-3">Edit Post</button>
      </form>
      <button className="bg-rose-500 mt-3" onClick={deletePost}>Delete Post</button>
    </div>
      : <p>Loading</p>}
      </>
  )
}

export { EditPost }
