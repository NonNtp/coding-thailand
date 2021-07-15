import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AboutPage = () => {
	const [version, setVersion] = useState('')

	const getData = async () => {
		const resp = await axios.get('https://api.codingthailand.com/api/version')
		setVersion(resp.data.data.version)
	}
	useEffect(() => {
		getData()
	}, [])

	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-md-12'>
					<h3>About Page</h3>
					{version && <p>Backend API Version : {version} </p>}
				</div>
			</div>
		</div>
	)
}

export default AboutPage
