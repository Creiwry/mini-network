import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [ identifier, setIdentifier] = useState('')
  const [ password, setPassword ] = useState('')
  const [ pending, setPending ] = useState(false)
  const signUpUrl = 'http://localhost:1337/api/auth/local/';
  const navigate = useNavigate();

  const signInUser = (e) => {
    e.preventDefault();
    const userInfo = { identifier, password }
    console.log(userInfo);
    setPending(true);


    fetch(signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(data => {
      Cookies.set('token', data.jwt);
      console.log(data.jwt);
      setPending(false);
      navigate('/home');
    })
  }

  return (
  <>
      <div className="log-in">
        <form onSubmit={signInUser} className="flex flex-col m-2">
          <label>User name or email:</label>
          <input 
            required
            type="text"
            value={identifier}
            onChange={(e)=> setIdentifier(e.target.value)}
          />
            <label>Password</label>
          <input
            required
            type="text"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
            {!pending && <button className="bg-rose-500 mt-3">Sign In</button>}
            {pending && <button className="bg-gray mt-3">Processing</button>}
        </form>
      </div>
  </>
  )
}

export { SignIn }
