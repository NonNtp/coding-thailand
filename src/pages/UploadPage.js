import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg']
const UploadPage = () => {
	const { addToast } = useToasts()
	const history = useHistory()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const onSubmit = (data) => {
		try {
			let fileUpload = data.picture[0]
			const reader = new FileReader()
			reader.readAsDataURL(fileUpload)
			reader.onload = async (e) => {
				let base64Image = e.target.result
				const urlApi = 'https://api.codingthailand.com/api/upload'
				const resp = await axios.post(urlApi, {
					picture: base64Image,
				})

				addToast(resp.data.data.message, {
					appearance: 'success',
				})
				//console.log(resp.data.data.url)
				history.replace('/')
			}
		} catch (error) {
			addToast(JSON.stringify(), {
				appearance: 'error',
			})
		}
	}

	return (
		<Container className='mt-4'>
			<Row>
				<Col md={4}>
					<h1>Upload Page</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='form-group'>
							<label htmlFor='exampleFormControlFile1'>
								Example file input
							</label>
							<input
								type='file'
								className={`form-control-file ${
									errors.picture ? 'is-invalid' : ''
								}`}
								name='picture'
								id='exampleFormControlFile1'
								{...register('picture', {
									required: 'Please Choose picture',
									validate: {
										checkFileType: (value) => {
											return (
												value && SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
											)
										},
									},
								})}
							/>
							{errors.picture && errors.picture.type === 'required' && (
								<span className='text-danger'>กรุณาเลือกไฟล์ภาพก่อน</span>
							)}
							{errors.picture && errors.picture.type === 'checkFileType' && (
								<span className='text-danger'>
									ไฟล์ภาพรองรับเเค่ .jpeg , .jpg
								</span>
							)}
						</div>
						<button className='btn btn-primary' type='submit'>
							Upload...
						</button>
					</form>
				</Col>
			</Row>
		</Container>
	)
}

export default UploadPage
