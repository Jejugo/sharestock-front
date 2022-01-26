import { useEffect, useState } from 'react'

const WishListPopUp = ({ wishList, setWishList }) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(wishList.length)
            setVisible(true)
        else
            setVisible(false)
    }, [wishList])

    const removeItem = (e, item) => {
        e.preventDefault()
        setWishList((previousState) => previousState.filter(previousItem => previousItem.Papel !== item.Papel))
    }

    return (
        <ul className={visible ? "wishListPopUp" : "wishListPopUp--hidden"}>
        { wishList.map(wishItem => (
            <div>
            <li onClick={(e) => removeItem(e, wishItem)}>{wishItem.Papel}<span> - </span></li>
            </div>
        ))} 
        <style jsx global>{`
            .wishListPopUp{
                position: fixed;
                bottom: 0;
                right: 0;
                background-color: blue;
                max-height: 250px;
                overflow-y: auto;
                width: 300px;
                transition: 0.5s ease;
            }
            .wishListPopUp__text{
                color: white;
            }
            .wishListPopUp--hidden{
                position: fixed;
                bottom: -200px;
                transition: 1s ease;
            }
        `}</style>
        </ul>
    )
}

export default WishListPopUp