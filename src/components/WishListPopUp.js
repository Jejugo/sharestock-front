import React, { useEffect, useState, useContext } from 'react';
import { WishListContext } from '../context/WishList';
import { useAuth } from '../context/AuthUserContext';
import Firestore from '../firebase/Firestore';

const WishListPopUp = () => {
	const [visible, setVisible] = useState(false);
	const { wishList, setWishList } = useContext(WishListContext);
	const { authUser } = useAuth();

	useEffect(() => {
		let timeout;
		if (wishList.length) {
			setVisible(true);
			timeout = setTimeout(() => setVisible(false), 3000);
		} else setVisible(false);

		return () => clearTimeout(timeout);
	}, [wishList]);

	useEffect(async () => {
		const data = await Firestore().getAllItems({
			collection: 'watchlist',
			id: authUser.uid,
		});
		if (data && data.shares) {
			setWishList(data.shares);
		}
	}, []);

	const removeItem = async (e, item) => {
		e.preventDefault();
		try {
			setWishList(previousState =>
				previousState.filter(previousItem => previousItem !== item),
			);
			await Firestore().removeFromArray({
				collection: 'watchlist',
				id: authUser.uid,
				item,
			});
		} catch (err) {
			console.error(err);
			setWishList(previousState => [...previousState, item]);
		}
	};

	return (
		<>
			<ul className={visible ? 'wishListPopUp' : 'wishListPopUp--hidden'}>
				<li className="wishListPopUp__text wishListPopUp__dropdownTitle">
					{' '}
          Wish List{' '}
				</li>
				{wishList &&
          wishList.map(wishItem => (
          	<div>
          		<li onClick={e => removeItem(e, wishItem)}>
          			<p className="wishListPopUp__text wishListPopUp__text_item">
          				{wishItem}
          				<span> - </span>
          			</p>
          		</li>
          	</div>
          ))}
			</ul>
			{!visible && (
				<button onClick={() => setVisible(true)} className="btn__showWishList">
          Show Wish List
				</button>
			)}
			<style jsx global>{`
        .wishListPopUp {
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
        .wishListPopUp__text {
          color: black;
          padding: 5px;
          margin: 0;
        }
        .wishListPopUp__text_item:hover {
          background-color: black;
          color: white;
        }
        .wishListPopUp__dropdownTitle {
          padding: 10px;
          background-color: #eee;
          margin: 0;
        }
        .wishListPopUp--hidden {
          opacity: 0;
        }
        .btn__showWishList {
          position: fixed;
          bottom: 0;
          right: 0;
          color: blue;
          padding: 10px;
          width: 200px;
        }
      `}</style>
		</>
	);
};

export default WishListPopUp;
