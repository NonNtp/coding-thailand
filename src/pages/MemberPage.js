import React from 'react'
//import { UserStoreContext } from '../context/UserContext'\
import { useSelector } from 'react-redux'
const MemberPage = () => {
	//const userStore = useContext(UserStoreContext)
	const profileRedux = useSelector((state) => state.AuthReducer.profile)
	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-md-12'>
					<h3>Member Page</h3>
					{/* {userStore.profile ? (
						<p>
							Welcome Mr. {userStore.profile.name} Email :{' '}
							{userStore.profile.email}
						</p>
					) : null} */}
					{profileRedux ? (
						<p>
							Welcome Mr. {profileRedux.name} Email : {profileRedux.email}
						</p>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default MemberPage
