import { useEffect, useState, useContext } from 'react'
import { WishListContext } from '../context/WishList';

const WishListPopUp = () => {

    const [visible, setVisible] = useState(false)
    const { wishList, setWishList } = useContext(WishListContext);

    useEffect(() => {
        if(wishList.length) {
            setVisible(true)
            const timeout = setTimeout(() => setVisible(false), 3000)
        }
        else setVisible(false)

        return () => clearTimeout(timeout)
    }, [wishList])

    const removeItem = (e, item) => {   
        e.preventDefault()
        setWishList((previousState) => previousState.filter(previousItem => previousItem.Papel !== item.Papel))
    }

    return (
        <>
            <ul className={visible ? "wishListPopUp" : "wishListPopUp--hidden"}>
            <li className="wishListPopUp__text wishListPopUp__dropdownTitle"> Wish List </li>
            { wishList.map(wishItem => (
                <div>
                <li onClick={(e) => removeItem(e, wishItem)}><p className="wishListPopUp__text wishListPopUp__text_item">{wishItem.Papel}<span> - </span></p></li>
                </div>
            ))} 
            </ul>
            { !visible && (<button onClick={() => setVisible(true)} className="btn__showWishList">Show Wish List</button>) }
            <style jsx global>{`
                .wishListPopUp{
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    background-color: #eee;
                    max-height: 250px;
                    overflow-y: auto;
                    width: 200px;
                    transition: 0.5s ease;
                    list-style: none;
                    padding: 10px 0;
                    margin: 0;
                }
                .wishListPopUp__text{
                    color: black;
                    padding: 5px;
                    margin: 0;
                }
                .wishListPopUp__text_item:hover{
                    background-color: black;
                    color: white;
                }
                .wishListPopUp__dropdownTitle{
                    padding: 10px;
                    background-color: #eee;
                    margin: 0;
                }
                .wishListPopUp--hidden{
                   opacity: 0;
                }
                .btn__showWishList{
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    color: blue;
                    padding: 10px;
                    width: 200px;
                }
            `}</style>
        </>
    )
}

export default WishListPopUp