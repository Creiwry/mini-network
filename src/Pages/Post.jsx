import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"

const Post = () => {
  const { id } = useParams();
  const fetchUrl = `http://localhost:1337/api/posts/${id}?populate=*`;
  const [ post, setPost ] = useState({});

  useEffect(() => {
    fetch(fetchUrl, {
        method: 'get', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
    .then(response => {
        if(!response.ok){
          console.log("Error!")
        } else {
          return response.json()
        }
      }) 
    .then(data => { 
        console.log(data)
        setPost(data.data.attributes);
      })
    .catch((error) => {
        console.error(error);
      });
  }, [fetchUrl]);

  return (
  <div>
      <h1>Hello</h1>
      <h3>{post.text}</h3>
      <Link to={`/post/${id}/edit`}>Edit Post</Link>

  </div>
  )
}

export { Post }
