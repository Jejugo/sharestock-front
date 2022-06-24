import { useState, useContext, useEffect } from 'react'; 
import { signOut, getAuth } from "@firebase/auth";
import Router from 'next/router'
import { useAuth } from '../context/AuthUserContext'

const Navbar = (props) => {
  const [loggedUser, setLoggedUser] = useState('')
  const [ isNavbarOpen, setIsNavbarOpen] = useState(true)
  const { authUser, authLoading } = useAuth()
  const auth = getAuth()

  const handleSignout = async () => {
    await signOut(auth)
    const router = Router;
    router.push(
      '/login'
    );
  }

  const handleNavbarOpen = () => {
    setIsNavbarOpen(prevState => !prevState)
  }

  useEffect(() => {
    setLoggedUser(authUser?.email)
  }, [authUser])


return (
  <section>
    <nav className={isNavbarOpen ? 'navbar' : 'navbar--close'}>
      <div className="navbar__close" onClick={handleNavbarOpen}>CLOSE</div>
      <ul className="navbar__wrap">
        {
          loggedUser ? (
            <>
            <li className="navbar__item"><a className="navbar__item_link">{loggedUser.split('@')[0]}</a></li>
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
      <ul className="navbar__wrap">
        <li className="navbar__item">
          <a href="/" className="navbar__item_link">Dicas</a>
        </li>
        <li className="navbar__item">
          <a href='/definitions' className="navbar__item_link">Definições</a>
        </li>
        <li className="navbar__item">
          <a href="/indicators" className="navbar__item_link">Indicadores</a>
        </li>
        <li className="navbar__item">
          <a href='/strategy' className="navbar__item_link">Estratégia</a>
        </li>
      </ul>
    </nav>

  <style jsx>{`
    .navbar{
      position: fixed;
      height: 100%;
      left: 0;
      width: 15%;
      padding: 20px 0;
      background-color: #ddd;
      display: flex;
      flex-direction: column;
      transition: 1s ease;
    }

    .navbar--close{
      position: fixed;
      height: 100%;
      left: 0;
      width: 5%;
      padding: 20px 0;
      background-color: #ddd;
      display: flex;
      align-items: space-between;
      flex-direction: column;
      transition: 1s ease;
    }

    .navbar__close{

    }

    .navbar a {
      color: #000;
    }

    .navbar__wrap{
      display: flex;
      flex-direction: column;
      list-style: none;
      margin: 0;
    }

    .navbar__item{
      flex-basis: auto;
      margin: 0 30px 20px 0;
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
