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
import { EditPost } from './Pages/EditPost'
import { NewPost } from './Pages/NewPost'

function App() {


  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/post/:id' element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          } />
          <Route path='/post/:id/edit' element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          } />
          <Route path='/posts/new' element={
            <PrivateRoute>
              <NewPost />
            </PrivateRoute>
          } />
          <Route path="/users/:id" element={
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
