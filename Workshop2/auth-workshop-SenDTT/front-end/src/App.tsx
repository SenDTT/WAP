import { useContext } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import { Context } from './Global'

function App() {
  const { isAuthenticated, logout, email } = useContext(Context);

  return (
    <div className='flex flex-col w-full mx-auto justify-center items-center mt-40'>
      <header className='text-3xl'>Welcome {email ? email : ''}</header>
      {isAuthenticated() && (
        <>
          <nav><Link to="/user">User</Link></nav>
          <nav><a onClick={() => logout()} >Logout</a></nav>
        </>
      )}

      <section>{isAuthenticated() ? <Outlet /> : (
        <>
          <nav><Link to="/login" >Login</Link></nav>
          <nav><Link to="/signup" >Signup</Link></nav>
        </>
      )}</section>
      <footer>All Rights Reserved</footer>
    </div>
  )
}

export default App
