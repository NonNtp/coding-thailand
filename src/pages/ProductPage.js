import React, { useEffect, useRef, useState } from 'react'
import { Table, Image, Badge, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { BsEyeFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/actions/CartAction'
const ProductPage = () => {
	const [product, setProduct] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const cancelToken = useRef(null)
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.CartReducer.cart)
	const total = useSelector((state) => state.CartReducer.total)
	const getData = async () => {
		try {
			setLoading(true)
			const resp = await axios.get(
				'https://api.codingthailand.com/api/course',
				{
					cancelToken: cancelToken.current.token,
				}
			)
			setProduct(resp.data.data)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		cancelToken.current = axios.CancelToken.source()
		getData()

		return () => {
			cancelToken.current.cancel()
		}
	}, [])

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
	const addCart = (p) => {
		const product = {
			id: p.id,
			name: p.title,
			price: p.view,
			qty: 1,
		}
		// call action
		dispatch(addToCart(product, cart))
	}
	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-md-12'>
					<h3>Product Page {total > 0 && `ซื้อแล้ว ${total} ชิ้น`}</h3>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>id</th>
								<th>Title</th>
								<th>Detail</th>
								<th>Date</th>
								<th>Views</th>
								<th>Picture</th>
								<th>Tools</th>
							</tr>
						</thead>
						<tbody>
							{product.map((p, index) => {
								return (
									<tr key={p.id}>
										<td>{p.id}</td>
										<td>{p.title}</td>
										<td>{p.detail}</td>
										<td>
											{format(new Date(p.date), 'dd MMM yyyy', { locale: th })}
										</td>
										<td>
											<Badge variant='success'>{p.view}</Badge>
										</td>
										<td>
											<Image
												src={p.picture}
												thumbnail
												alt={p.title}
												width={100}
											/>
										</td>
										<td>
											<Link to={`/detail/${p.id}/title/${p.title}`}>
												<BsEyeFill />
											</Link>
											<button
												className='btn btn-outline-success ml-3'
												onClick={() => addCart(p)}
											>
												หยิบใส่ตะกร้า
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	)
}

export default ProductPage
