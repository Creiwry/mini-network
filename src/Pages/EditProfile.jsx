import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms";

const EditProfile = () => {
  const fetchUrl = 'http://localhost:1337/api/users/me'
  const [ profileInfo, setProfileInfo ] = useState({});
  const [ description, setDescription] = useState(profileInfo.description)
  const [ username, setUsername ] = useState(profileInfo.username)
  const putUrl = `http://localhost:1337/api/users/${profileInfo.id}`
  const navigate = useNavigate();
  const currentUser = useAtomValue(userAtom)

  const authCurrentUser = () => {
    if(profileInfo.id === currentUser.id) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {

      fetch(fetchUrl, {
          method: 'get', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
        })
      .then(response => response.json())
      .then(data => { 
          if (authCurrentUser) {
            setProfileInfo(data);
          } else {
            console.error("You are not allowed to edit this profile")
          }
        })
      .catch((error) => {
          console.error(error);
        });
  }, [authCurrentUser]);

  const updateProfile = (e) => {
    e.preventDefault();
    const profileInfo = { username: username, description: description }

    fetch(putUrl, {
        method: 'put', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      body: JSON.stringify(profileInfo),
      })
    .then(response => response.json())
    .then(data => { 
          if (authCurrentUser) {
            setProfileInfo(data);
          } else {
            console.error("You are not allowed to edit this profile")
          }
        navigate(`/users/${currentUser.id}`);
      })
    .catch((error) => {
        console.error(error);
      });
  };

  return ( 
    <div className="flex flex-col">
      <h1>Edit Profile</h1> 
      <form onSubmit={updateProfile} className="flex flex-col m-2">
            <label>Username:</label>
        <input type="text" value={username ?? ''} onChange={(e) => setUsername(e.target.value)} />
            <label>Description:</label>
        <input type="text" value={description ?? ''} onChange={(e) => setDescription(e.target.value)} />
        <button className="bg-rose-500 mt-3">Edit Profile</button>
      </form>
    </div>
  )
}

export { EditProfile }
