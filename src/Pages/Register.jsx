import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms";

const Register = () => {
  const [ pending, setPending ] = useState(false)
  const [ setError] = useState('');
  const [ email, setEmail] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const setUser = useSetAtom(userAtom)
  const signUpUrl = 'http://localhost:1337/api/auth/local/register';
  const navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    const userInfo = { username: username, email: email, password: password}
    setPending(true);

    fetch(signUpUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(data => {
        Cookies.set('token', data.jwt);
        setUser(data.user)
        setPending(false);
        navigate('/home');
    })
    .catch(err => {
        setPending(false);
        setError(err.message);
      })
  }

  return (
  <>
      <div className="log-in">
        <form onSubmit={signUpUser} className="flex flex-col">
          <label>Username:</label>
          <input 
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email:</label>
          <input 
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            <label>Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {!pending && <button>Register</button>}
            {pending && <button>Processing</button>}
        </form>
      </div>
  </>

  )
}

export { Register }
