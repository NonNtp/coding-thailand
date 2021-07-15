import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVersion } from '../redux/actions/AuthAction'
const Footer = () => {
	const dispatch = useDispatch()
	const version = useSelector((state) => state.AuthReducer.version)
	useEffect(() => {
		dispatch(updateVersion())
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<footer className='container'>
				<p>
					&copy; RedCats Company 2017- {new Date().getFullYear()} API Version :{' '}
					{version}
				</p>
			</footer>
		</>
	)
}

export default Footer
