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
      <ul className="navbar__wrap">
        <li className="navbar__item"><a href="/login" className="navbar__item_link">Login</a></li>
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

export default Navbar
