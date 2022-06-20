import React, { useEffect, useState } from "react";
import Router from "next/router";
import TableLayout from "../skeleton/TableLayout";
import SearchBar from "../components/SearchBar";
import { definitionsList } from "../const/definitions";
import Fonts from "../components/Fonts";
import Template from "../components/Template";
import { useAuth } from "../context/AuthUserContext";

const Definitions = () => {
  const [defList, setDefList] = useState(definitionsList);
  const [search, setSearch] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);

  const { authUser } = useAuth();

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const redirectIfUserNotLoggedIn = async () => {
    const router = Router;
    await sleep(2000);
    if (!authUser) router.push("/login");
  };

  useEffect(async () => {
    Fonts();
    //await redirectIfUserNotLoggedIn();
  }, []);

  useEffect(() => {
    setFilteredItems(() =>
      defList.filter(
        (item) =>
          item.alias.toUpperCase().includes(search.toUpperCase()) ||
          item.name.toUpperCase().includes(search.toUpperCase())
      )
    );
  }, [search, defList]);

  const handleSearchBar = (e) => {
    setSearch(() => e.target.value);
  };

  const handleDef = (e) => {
    const id = parseInt(e.target.getAttribute("name"));
    setDefList((previousState) =>
      previousState.map((def) => {
        if (def.id === id) {
          return { ...def, showDef: !def.showDef };
        }
        return def;
      })
    );
  };

  return (
    <>
      {authUser && (
        <Template tabTitle={"indicators"}>
          <section className="definitions">
            <SearchBar
              handleSearchBar={handleSearchBar}
              value={search}
              placeholder={"Indicador"}
            ></SearchBar>
            <TableLayout>
              <div className="definitions__list">
                {filteredItems.map((def) => {
                  return !def.showDef ? (
                    <div
                      className="definitions__list_item"
                      name={def.id}
                      key={def.id}
                      onMouseEnter={handleDef}
                    >
                      {def.alias}
                    </div>
                  ) : (
                    <div
                      className="definitions__list_item_desc"
                      name={def.id}
                      key={def.id}
                      onMouseLeave={handleDef}
                    >
                      <div className="">
                        <h3>{def.name}</h3>
                      </div>
                      {def.definition}
                    </div>
                  );
                })}
              </div>
            </TableLayout>

            <style jsx global>{`
              .definitions__list {
                display: flex;
                flex-wrap: wrap;
              }

              .definitions__list_item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid white;
                flex-basis: 45.8%;
                margin: 1% 1%;
                padding: 1%;
                height: 40vh;
                transition: 0.3s ease-out;
                font-size: 35px;
                cursor: pointer;
              }

              @media (max-width: 1440px) {
                .definitions__list_item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border: 1px solid white;
                  flex-basis: 45.8%;
                  margin: 1% 1%;
                  padding: 1%;
                  height: 40vh;
                  transition: 0.3s ease-out;
                  font-size: 35px;
                  cursor: pointer;
                }

                .definitions__list_item_desc {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border: 1px solid white;
                  flex-basis: 45.8%;
                  margin: 1% 1%;
                  padding: 1%;
                  height: 40vh;
                  font-size: 20px;
                  cursor: pointer;
                }
              }

              @media (min-width: 1441px) {
                .definitions__list_item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border: 1px solid white;
                  flex-basis: 20.8%;
                  margin: 1% 1%;
                  padding: 1%;
                  height: 40vh;
                  transition: 0.3s ease-out;
                  font-size: 35px;
                  cursor: pointer;
                }

                .definitions__list_item_desc {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border: 1px solid white;
                  flex-basis: 20.8%;
                  margin: 1% 1%;
                  padding: 1%;
                  height: 40vh;
                  font-size: 20px;
                  cursor: pointer;
                }
              }

              .definitions__list_item:hover {
                background-color: grey;
                cursor: pointer;
              }
            `}</style>
          </section>
        </Template>
      )}
    </>
  );
};

// render() {
//   const { definitionsList, search } = this.state;
//   let filteredItems = definitionsList.filter((item) =>
//   item.alias.toUpperCase().includes(search.toUpperCase()) ||
//   item.name.toUpperCase().includes(search.toUpperCase()))
// }
export default Definitions;
