import React, { useContext } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Spinner } from 'react-bootstrap'
import { UserStoreContext } from '../context/UserContext'

const HomePage = () => {
	// const { isLoading, error, data , isFetching } = useQuery('getData', () =>
	//     fetch('https://api.codingthailand.com/api/news?page=1').then(res =>
	//         res.json()
	//     )
	// )

	const userStore = useContext(UserStoreContext)
	const query = useQuery('getData', () => {
		const controller = new AbortController()
		const signal = controller.signal

		const promise = fetch('https://api.codingthailand.com/api/news?page=1', {
			method: 'get',
			signal: signal,
		}).then((res) => res.json())

		promise.cancel = () => controller.abort()
		return promise
	})
	const { isLoading, error, data, isFetching } = query
	if (isLoading === true) {
		return (
			<div className='text-center mt-5'>
				<Spinner animation='border' variant='primary' />
			</div>
		)
	}
	if (error) {
		return (
			<div className='text-center mt-5 text-danger'>
				<p>{error.response.data.message}</p>
				<p>{JSON.stringify(error)}</p>
			</div>
		)
	}
	return (
		<>
			<main role='main'>
				<div className='jumbotron'>
					<div className='container'>
						{userStore.profile ? (
							<h1 className='display-3'>Welcome Mr.{userStore.profile.name}</h1>
						) : (
							<h1 className='display-3'>Welcome Everyone</h1>
						)}
						<p>
							My name is RedCats I'm an front-end Developer on University in
							thailand
						</p>
						<p>
							<Link
								className='btn btn-primary btn-lg'
								role='button'
								to='/product'
							>
								{' '}
								<BsFillHeartFill color='red' /> Products »
							</Link>
						</p>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='mx-auto text-center'>
							{isFetching ? 'Updating' : null}
						</div>
						{data.data.map((news, index) => {
							return (
								<div className='col-md-4' key={news.id}>
									<h2>{news.topic}</h2>
									<p>{news.detail}</p>
									<p>Category : {news.name}</p>
								</div>
							)
						})}
					</div>
					<hr />
				</div>
			</main>
		</>
	)
}

export default HomePage
