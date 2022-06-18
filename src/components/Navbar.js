import { useState, useContext, useEffect } from 'react'; 
import { signOut, getAuth } from "@firebase/auth";
import Router from 'next/router'
import { useAuth } from '../context/AuthUserContext'

const auth = getAuth()

const Navbar = (props) => {
  const [loggedUser, setLoggedUser] = useState('')
  const { authUser, authLoading } = useAuth()

  const handleSignout = async () => {
    await signOut(auth)
    const router = Router;
    router.push(
      '/login'
    );
  }

  useEffect(() => {
    setLoggedUser(authUser?.email)
  }, [authUser])


return (
  <section>
    <nav className="navbar">
      <ul className="navbar__wrap">
        <li className="navbar__item">
          <a href="/" className="navbar__item_link">Como começar</a>
        </li>
        <li className="navbar__item">
          <a href='/indicators' className="navbar__item_link">Indicadores</a>
        </li>
        <li className="navbar__item">
          <a href="/shares" className="navbar__item_link">Ativos</a>
        </li>
        <li className="navbar__item">
          <a href='/good-indicators' className="navbar__item_link">Atrativos</a>
        </li>
        <li className="navbar__item">
          <a href='/strategy' className="navbar__item_link">Estratégia</a>
        </li>
      </ul>
      <ul className="navbar__wrap">
        {
          loggedUser ? (
            <>
            <li className="navbar__item"><a className="navbar__item_link">{loggedUser}</a></li>
            <li className="navbar__item"><a href="#" className="navbar__item_link" onClick={handleSignout}>Sign out</a></li>
            </>
          ) : (
            <>
            <li className="navbar__item"><a href="/login" className="navbar__item_link">Login</a></li>
            <li className="navbar__item"><a href="/signup" className="navbar__item_link">Signup</a></li>
            </>
          )
        }
      </ul>
    </nav>

  <style jsx>{`
    .navbar{
      height: 60px;
      background-color: #ddd;
      padding: 0 5%;
      opacity: 1;
      display: flex;
      justify-content: space-between;
    }

    .navbar a {
      color: #000;
    }

    .navbar__wrap{
      display: flex;
      list-style: none;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      margin: 0;
    }

    .navbar__item{
      flex-basis: auto;
      margin: 0 30px 0 0;
      font-size: 20px;
    }

    .navbar__item_link{
      text-decoration: none;
      color: white;
    }
  `}</style>
  </section>
)
  }
export default Navbar
