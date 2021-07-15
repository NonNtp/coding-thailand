import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { clearAllCart } from '../redux/actions/CartAction'
import { useHistory } from 'react-router-dom'
const Cartage = () => {
	const cart = useSelector((state) => state.CartReducer.cart)
	const total = useSelector((state) => state.CartReducer.total)
	const dispatch = useDispatch()
	const history = useHistory()
	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-md-12'>
					<h3>Cart Page ซื้อไปแล้ว {total} ชิ้น</h3>
					<button
						className='btn btn-danger mb-3'
						onClick={() => {
							dispatch(clearAllCart())
						}}
					>
						ลบสินค้าทั้งหมด
					</button>
					<button
						className='btn btn-info mb-3 ml-4'
						onClick={() => {
							history.push('/pdf')
						}}
					>
						รายงาน PDF
					</button>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Index</th>
								<th>Password</th>
								<th>Name</th>
								<th>Price</th>
								<th>Total</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((c, index) => {
								return (
									<tr key={c.id}>
										<td>{index}</td>
										<td>{c.id}</td>
										<td>{c.name}</td>
										<td>{c.price}</td>
										<td>{c.qty}</td>
										<td>{c.price * c.qty}</td>
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

export default Cartage
