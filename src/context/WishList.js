import React, { createContext, useState } from 'react';

export const WishListContext = createContext({});

const WishListProvider = ({ children }) => {
	const [wishList, setWishList] = useState([]);

	return (
		<WishListContext.Provider value={{ wishList, setWishList }}>
			{children}
		</WishListContext.Provider>
	);
};

export default WishListProvider;
