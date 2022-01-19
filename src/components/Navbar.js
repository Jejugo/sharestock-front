const Navbar = (props) => (
  <>
  <section className="navbar-container">
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
</section>
  <style jsx>{`
    .navbar{
      height: 60px;
      background-color: #ddd;
      margin: 0;
      opacity: 1;
    }

    .navbar a {
      color: #000;
    }

    .navbar__wrap{
      display: flex;
      list-style: none;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      margin: 0;
    }

    .navbar__item{
      flex-basis: 10em;
      font-size: 20px;
    }

    .navbar__item_link{
      text-decoration: none;
      color: white;
    }
  `}</style>
  </>
)

export default Navbar
