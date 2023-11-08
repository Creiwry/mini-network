import { useState } from "react";
import { useEffect } from "react";
import { PostList } from "../Components/PostList";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const url = `http://localhost:1337/api/posts?populate[0]=users_permissions_user`
  const [ posts, setPosts ] = useState([]);

  const getData = async () => {
    fetch(url, {
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
        setPosts(data.data);
      })
    .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getData();
  }, [setPosts]);

  return (
    <div>
      { posts ? <PostList posts={posts} />
        : <p>No posts</p>
    }
      <Link to="/posts/new">New Post</Link>
    </div>
  )
}

export { Home }
