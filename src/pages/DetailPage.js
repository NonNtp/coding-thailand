import React, { useEffect, useRef, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Spinner, Card, CardDeck, Button } from 'react-bootstrap'
import axios from 'axios'
const DetailPage = () => {
	const { id, title } = useParams()
	const history = useHistory()
	const [detail, setDetail] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const cancelToken = useRef(null)
	const getData = async (id) => {
		try {
			setLoading(true)
			const resp = await axios.get(
				'https://api.codingthailand.com/api/course/' + id,
				{
					cancelToken: cancelToken.current.token,
				}
			)
			setDetail(resp.data.data)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		cancelToken.current = axios.CancelToken.source()
		getData(id)

		return () => {
			cancelToken.current.cancel()
		}
	}, [id])

	if (loading === true) {
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
			</div>
		)
	}
	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-md-12'>
					<h3>Detail Page</h3>
					<p>
						{' '}
						{title} [{id}]
					</p>
					<Button
						variant='secondary'
						className='mb-4'
						onClick={() => history.goBack()}
					>
						Back
					</Button>{' '}
					<div className='row'>
						{detail.length > 0 ? (
							<CardDeck>
								{detail.map((d, index) => {
									return (
										<div className='col-md-4' key={d.id}>
											<Card className='shadow-sm mb-4'>
												<Card.Body>
													<Card.Title>{d.ch_title}</Card.Title>
													<Card.Text>{d.ch_dateadd}</Card.Text>
												</Card.Body>
											</Card>
										</div>
									)
								})}
							</CardDeck>
						) : (
							<p className='mx-auto'>No details</p>
						)}
					</div>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default DetailPage
