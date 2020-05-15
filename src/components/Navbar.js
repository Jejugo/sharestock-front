import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router';

const Navbar = (props) => (
  <section className="container">
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
      </ul>
    </nav>

  <style jsx>{`
    .navbar{
      height: 60px;
      background-color: #201F1F;
      margin: 0;
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
      font-size: 20px;
    }

    .navbar__item_link{
      text-decoration: none;
      color: white;
    }
  `}</style>
  </section>
)

export default Navbar
