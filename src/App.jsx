import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Register } from './Pages/Register'
import { SignIn } from './Pages/SignIn'
import { Home } from './Pages/Home'
import { PrivateRoute } from './Components/ProtectedRoute'
import { Profile } from './Pages/Profile'
import { Navbar } from './Components/Navbar'
import { EditProfile } from './Pages/EditProfile'
import { Post } from './Pages/Post'

function App() {


  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path="/me" element={
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
          } />
          <Route path="/edit_me" element={
            <PrivateRoute>
                <EditProfile />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
