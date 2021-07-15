import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import * as yup from 'yup'
import axios from 'axios'
const schema = yup.object().shape({
	name: yup.string().required('กรุณากรอกชื่อ'),
	email: yup
		.string()
		.required('กรุณากรอกอีเมล')
		.email('รูปแบบอีเมล์ไม่ถูกต้อง'),
	password: yup
		.string()
		.required('กรุณากรอกรหัสผ่าน')
		.min(4, 'รหัสผ่านต้อง 4 ตัวขึ้นไป '),
})
const RegisterPage = () => {
	const history = useHistory()
	const { addToast } = useToasts()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data) => {
		try {
			const apiUrl = 'https://api.codingthailand.com/api/register'
			const resp = await axios.post(apiUrl, {
				name: data.name,
				email: data.email,
				password: data.password,
			})
			addToast(resp.data.message, {
				appearance: 'success',
			})
			history.replace('/login')
		} catch (error) {
			addToast(error.response.data.errors.email[0], {
				appearance: 'error',
			})
		}
	}

	return (
		<Container className='mt-4'>
			<Row>
				<Col xs={12} md={8}>
					<h1>Register Page</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId='name'>
							<Form.Label>ชื่อ-สกุล</Form.Label>
							<Form.Control
								type='text'
								{...register('name')}
								className={`form-control ${errors.name ? 'is-invalid' : ''}`}
							/>
							{errors.name && (
								<Form.Control.Feedback type='invalid'>
									{errors.name.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>
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
							สมัครสมาชิก
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default RegisterPage
