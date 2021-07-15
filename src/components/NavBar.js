import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { updateProfile } from '../redux/actions/AuthAction'
import { useSelector, useDispatch } from 'react-redux'
//import { UserStoreContext } from '../context/UserContext'
const NavBar = () => {
	// const [profile, setProfile] = useState(null)
	//const userStore = useContext(UserStoreContext)
	// const getProfile = () => {
	// 	const profileValue = JSON.parse(localStorage.getItem('profile'))
	// 	if (profileValue) {
	// 		setProfile(profileValue)
	// 	}
	// }
	// useEffect(() => {
	// 	console.log('use Effect Navbar')
	// 	getProfile()
	// }, [])

	// const getProfile = () => {
	// 	const profileValue = JSON.parse(localStorage.getItem('profile'))
	// 	if (profileValue) {
	// 		userStore.updateProfile(profileValue)
	// 	}
	// }
	// useEffect(() => {
	// 	console.log('use Effect Navbar')
	// 	getProfile()
	//eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])
	const history = useHistory()
	const profileRedux = useSelector((state) => state.AuthReducer.profile)
	const total = useSelector((state) => state.CartReducer.total)
	const dispatch = useDispatch()
	const getProfile = () => {
		const profileValue = JSON.parse(localStorage.getItem('profile'))
		if (profileValue) {
			dispatch(updateProfile(profileValue))
		}
	}
	useEffect(() => {
		getProfile()
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('profile')
		history.replace('/')
		// history.go(0)
		//userStore.updateProfile(null)
		dispatch(updateProfile(null))
	}
	return (
		<>
			<Navbar bg='success' expand='lg' variant='dark'>
				<NavLink className='navbar-brand' to='/' exact>
					<img
						src='./logo192.png'
						width='30'
						height='30'
						className='d-inline-block align-top'
						alt='React Bootstrap logo'
					/>{' '}
					RedCats
				</NavLink>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<NavLink className='nav-link' to='/' exact activeClassName='active'>
							Home
						</NavLink>
						<NavLink className='nav-link' to='/about' activeClassName='active'>
							About
						</NavLink>
						<NavLink className='nav-link' to='/cart' activeClassName='active'>
							สินค้า {total} ชิ้น
						</NavLink>
						<NavLink
							className='nav-link'
							to='/product'
							activeClassName='active'
						>
							Product
						</NavLink>
						<NavDropdown
							title='Workshop (Pagination+CRUD)'
							id='basic-nav-dropdown'
						>
							<NavDropdown.Item onClick={() => history.replace('/hospital')}>
								Hospital (Pagination)
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={() => history.replace('/category')}>
								Category (CRUD)
							</NavDropdown.Item>
						</NavDropdown>
						<NavLink className='nav-link' to='/upload' activeClassName='active'>
							Upload
						</NavLink>
						<NavLink className='nav-link' to='/member' activeClassName='active'>
							Member
						</NavLink>
						<NavLink className='nav-link' to='/chart' activeClassName='active'>
							Chart
						</NavLink>
					</Nav>
					{/* {userStore.profile ? (
						<span className='navbar-text text-white'>
							Welcome {userStore.profile.name}
							<button className='btn-border btn-danger ml-2' onClick={logout}>
								Log out
							</button>
						</span>
					) : (
						<Nav>
							<NavLink
								className='nav-link'
								to='/register'
								activeClassName='active'
							>
								Register
							</NavLink>
							<NavLink
								className='nav-link'
								to='/login'
								activeClassName='active'
							>
								Login
							</NavLink>
						</Nav>
					)} */}
					{/* redux */}
					{profileRedux ? (
						<span className='navbar-text text-white'>
							Welcome {profileRedux.name}
							<button className='btn-border btn-danger ml-2' onClick={logout}>
								Log out
							</button>
						</span>
					) : (
						<Nav>
							<NavLink
								className='nav-link'
								to='/register'
								activeClassName='active'
							>
								Register
							</NavLink>
							<NavLink
								className='nav-link'
								to='/login'
								activeClassName='active'
							>
								Login
							</NavLink>
						</Nav>
					)}
				</Navbar.Collapse>
			</Navbar>
		</>
	)
}

export default NavBar
