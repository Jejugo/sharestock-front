import { useState, useContext, useEffect } from "react";
import { signOut, getAuth } from "@firebase/auth";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SubjectIcon from "@mui/icons-material/Subject";
import TableChartIcon from "@mui/icons-material/TableChart";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PaidIcon from '@mui/icons-material/Paid';

import Router from "next/router";
import { useAuth } from "../context/AuthUserContext";

const Navbar = (props) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const { authUser, authLoading } = useAuth();
  const auth = getAuth();

  const handleSignout = async () => {
    await signOut(auth);
    const router = Router;
    router.push("/login");
  };

  const handleNavbarOpen = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setLoggedUser(authUser?.email);
  }, [authUser]);

  return (
    <section>
      <nav className={isNavbarOpen ? "navbar" : "navbar--close"}>
        <div className="navbar__close" onClick={handleNavbarOpen}>
          CLOSE
        </div>
        <ul className="navbar__wrap">
          {loggedUser ? (
            <>
              <li className="navbar__item">
                <a
                  href="#"
                  className="navbar__item_link"
                  onClick={handleSignout}
                >
                  Sign out
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="navbar__item">
                <a href="/login" className="navbar__item_link">
                  Login
                </a>
              </li>
              <li className="navbar__item">
                <a href="/signup" className="navbar__item_link">
                  Signup
                </a>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar__wrap">
          <li className="navbar__item">
            <a href="/dashboard" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <DashboardOutlinedIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Dashboard' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/goals" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <FactCheckIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Metas' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/strategy" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <ManageSearchOutlinedIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Estratégia' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/invest" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <PaidIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Aportar' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/indicators" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <TableChartIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Indicadores' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/my-assets" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <FactCheckIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Meus Ativos' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <TipsAndUpdatesIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Dicas' }</h4>
              </div>
            </a>
          </li>
          <li className="navbar__item">
            <a href="/definitions" className="navbar__item_link">
              <div className="navbar__item_wrap">
                <SubjectIcon />
                <h4 className="navbar__item_text">{ isNavbarOpen && 'Definições' }</h4>
              </div>
            </a>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          height: 100%;
          left: 0;
          width: 15%;
          padding: 20px 0;
          background-color: #ddd;
          display: flex;
          flex-direction: column;
          transition: 1s ease;
          overflow: auto;
        }

        .navbar--close {
          position: fixed;
          height: 100%;
          left: 0;
          width: 5%;
          padding: 20px 0;
          background-color: #ddd;
          display: flex;
          align-items: space-between;
          flex-direction: column;
          overflow: auto;
          transition: 1s ease;
        }

        .navbar--close a {
          color: black;
        }

        .navbar__close {
          color: black;
          text-align: center;
          margin: 20px;
        }

        .navbar a {
          color: #000;
        }

        .navbar__wrap {
          display: flex;
          flex-direction: column;
          list-style: none;
          margin: 0;
          margin-bottom: 10%;
        }

        .navbar__item {
          flex-basis: auto;
          margin: 0 30px 20px 0;
          font-size: 20px;
          text-align: center;
        }

        .navbar__item_text {
          margin: 10px;
        }

        .navbar__item_wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }


        .navbar__item_wrap:hover {
          color: grey;
        }

        .navbar__item_link {
          text-decoration: none;
          color: white;
          text-align: center;
        }
      `}</style>
    </section>
  );
};
export default Navbar;
