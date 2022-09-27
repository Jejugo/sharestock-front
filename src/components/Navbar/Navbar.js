import React, { useState, useEffect } from 'react';
import { signOut, getAuth } from '@firebase/auth';
import navbarConfig from '../../const/navbarConfig';
import * as S from './styles';
import Router from 'next/router';
import { useAuth } from '../../context/AuthUserContext';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = ({ isNavbarOpen, setIsNavbarOpen }) => {
	const [loggedUser, setLoggedUser] = useState('');
	const { authUser } = useAuth();
	const auth = getAuth();

	const handleSignout = async () => {
		await signOut(auth);
		const router = Router;
		router.push('/login');
	};

	useEffect(() => {
		setLoggedUser(authUser?.email);
	}, [authUser]);

	return (
		<section>
			<S.Navigation isNavbarOpen={isNavbarOpen}>
				<S.NavigationIcon
					onClick={() => setIsNavbarOpen(previousState => !previousState)}
				>
					{' '}
					{isNavbarOpen ? <CloseIcon /> : <MenuOpenIcon />}{' '}
				</S.NavigationIcon>

				<S.NavbarItemList>
					{loggedUser ? (
						<>
							<S.NavbarItem>
								<a
									href="#"
									className="navbar__item_link"
									onClick={handleSignout}
								>
									<ExitToAppIcon />
									<h4 className="navbar__item_text">
										{isNavbarOpen && 'Signout'}
									</h4>
								</a>
							</S.NavbarItem>
						</>
					) : (
						<>
							<S.NavbarItem>
								<a href="/login" className="navbar__item_link">
                  Login
								</a>
							</S.NavbarItem>
							<S.NavbarItem>
								<a href="/signup" className="navbar__item_link">
                  Signup
								</a>
							</S.NavbarItem>
						</>
					)}
				</S.NavbarItemList>
				<S.NavbarItemList>
					{navbarConfig.map((item, index) => (
						<S.NavbarItem key={index}>
							<a href={item.href} key={index}>
								<S.NavbarItemWrap>
									<item.icon />
									<h4>{isNavbarOpen && item.text}</h4>
								</S.NavbarItemWrap>
							</a>
						</S.NavbarItem>
					))}
				</S.NavbarItemList>
			</S.Navigation>
		</section>
	);
};
export default Navbar;
