import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
//import { UserStoreContext } from '../context/UserContext'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../redux/actions/AuthAction'
const schema = yup.object().shape({
	email: yup
		.string()
		.required('กรุณากรอกอีเมล')
		.email('รูปแบบอีเมล์ไม่ถูกต้อง'),
	password: yup
		.string()
		.required('กรุณากรอกรหัสผ่าน')
		.min(4, 'รหัสผ่านต้อง 4 ตัวขึ้นไป '),
})
const LoginPage = () => {
	const history = useHistory()
	const { addToast } = useToasts()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	//const userStore = useContext(UserStoreContext)
	const dispatch = useDispatch()
	const onSubmit = async (data) => {
		try {
			const apiUrl = 'https://api.codingthailand.com/api/login'
			const resp = await axios.post(apiUrl, {
				email: data.email,
				password: data.password,
			})

			localStorage.setItem('token', JSON.stringify(resp.data))
			// get profile
			const urlProfile = 'https://api.codingthailand.com/api/profile'
			const respProfile = await axios.get(urlProfile, {
				headers: {
					Authorization: 'Bearer ' + resp.data.access_token,
				},
			})
			// console.log(respProfile.data.data.user)
			localStorage.setItem(
				'profile',
				JSON.stringify(respProfile.data.data.user)
			)
			addToast('เข้าระบบเรียบร้อยแล้ว', {
				appearance: 'success',
			})
			// history.replace('/')
			// history.go(0)

			// update profile context
			const profileValue = JSON.parse(localStorage.getItem('profile'))
			// userStore.updateProfile(profileValue) // context
			// call action
			dispatch(updateProfile(profileValue))
			history.replace('/')
		} catch (error) {
			addToast(error.response.data.message, {
				appearance: 'error',
			})
		}
	}

	return (
		<Container className='mt-4'>
			<Row>
				<Col xs={12} md={8}>
					<h1>Login Page</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								{...register('email')}
								className={`form-control ${errors.email ? 'is-invalid' : ''}`}
							/>
							{errors.email && (
								<Form.Control.Feedback type='invalid'>
									{errors.email.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								{...register('password')}
								className={`form-control ${
									errors.password ? 'is-invalid' : ''
								}`}
							/>
							{errors.password && (
								<Form.Control.Feedback type='invalid'>
									{errors.password.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>
						<Button variant='primary' type='submit'>
							Log in
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage
