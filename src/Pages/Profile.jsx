import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostList } from "../Components/PostList";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams()
  const url = `http://localhost:1337/api/users/${id}`
  const postUrl = `http://localhost:1337/api/posts?populate=*&filters[users_permissions_user][id][$eq]=${id}`
  const [ profileInfo, setProfileInfo ] = useState({});
  const [ posts, setPosts ] = useState([])

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
        setProfileInfo(data);
      })
    .catch((error) => {
        console.error(error);
      });
  }, [url]);


  useEffect(() => {
    fetch(postUrl, {
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
  }, [postUrl, setPosts]);

  return ( 
    <div className="flex flex-col">
      <h1>Profile</h1> 
      <h3>{profileInfo.username}</h3>
      <h3>{profileInfo.email}</h3>
      <p>{profileInfo.description}</p>
      <Link to="/edit_me">Edit Profile</Link>
      <PostList posts={posts} />
    </div>
  )
}

export { Profile }
