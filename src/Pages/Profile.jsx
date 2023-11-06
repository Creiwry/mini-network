import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const url = 'http://localhost:1337/api/users/me'
  const [ profileInfo, setProfileInfo ] = useState({});

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

  return ( 
    <div className="flex flex-col">
      <h1>Profile</h1> 
      <h3>{profileInfo.username}</h3>
      <h3>{profileInfo.email}</h3>
      <p>{profileInfo.description}</p>
      <Link to="/edit_me">Edit Profile</Link>
    </div>
  )
}

export { Profile }
