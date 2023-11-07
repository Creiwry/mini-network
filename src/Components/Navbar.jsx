import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userAtom } from "../atoms";
import { RESET } from "jotai/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom)

  const signOut = () => {
    Cookies.remove('token')
    setUser(RESET);
    navigate('/signIn')
  }

  return (
  <div className="navbar sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border border-solid py-6 bg-transparent border-transparent">
      <div className="sm:flex ml-auto pr-4 items-center gap-4 hidden">
        <Link to='/signIn'>Sign In</Link>
        <Link to='/register'>Register</Link>
        <Link to='/home'>Home</Link>
        <Link to='/me'>My Profile</Link>
        <button onClick={signOut}>Sign Out</button>
      </div>
  </div>
  )
}

export { Navbar }
