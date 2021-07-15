import React, { useState, useRef, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import { Spinner, Table } from 'react-bootstrap'
import axios from 'axios'
const pageSize = 10
const HospitalPage = () => {
	const [hospital, setHospital] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const cancelToken = useRef(null)
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const getData = async (page) => {
		try {
			setLoading(true)
			const resp = await axios.get(
				`https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
				{
					cancelToken: cancelToken.current.token,
				}
			)
			setHospital(resp.data.data)
			setTotal(resp.data.meta.pagination.total)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		cancelToken.current = axios.CancelToken.source()
		getData(page)

		return () => {
			cancelToken.current.cancel()
		}
	}, [page])

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
	const handlePageChange = (pageNumber) => {
		setPage(pageNumber)
	}
	return (
		<>
			<div className='container'>
				<div className='row mt-4'>
					<div className='col-md-12'>
						<h1>Hospital Page</h1>
						<Table striped bordered hover size='sm'>
							<thead>
								<tr>
									<th>Id</th>
									<th>Code</th>
									<th>Hospital</th>
								</tr>
							</thead>
							<tbody>
								{hospital.map((h, index) => {
									return (
										<tr key={h.id}>
											<td>{h.id}</td>
											<td>{h.code}</td>
											<td>{h.h_name}</td>
										</tr>
									)
								})}
							</tbody>
						</Table>{' '}
						<br />
						<Pagination
							activePage={page}
							itemsCountPerPage={pageSize}
							totalItemsCount={total}
							pageRangeDisplayed={15}
							onChange={handlePageChange}
							itemClass='page-item'
							linkClass='page-link'
							prevPageText='prev'
							nextPageText='next'
							firstPageText='first'
							lastPageText='last'
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default HospitalPage
