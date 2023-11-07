import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostList } from "./PostList";
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms";

const Profile = () => {
  const url = 'http://localhost:1337/api/users/me'
  const currentUser = useAtomValue(userAtom)
  const postUrl = `http://localhost:1337/api/posts?populate=*&filters[users_permissions_user][id][$eq]=${currentUser.id}`
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
  }, []);

  const getData = async () => {
    const response = await fetch(postUrl)
    .then(response => response.json());
    setPosts(response.data);
  }

  useEffect(() => {
    getData();
  }, [setPosts]);

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
