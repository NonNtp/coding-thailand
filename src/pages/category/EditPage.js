import React, { useCallback, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
  name: yup.string().required('กรุณากรอกชื่อ'),
})

const EditPage = () => {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const apiUrl = 'https://api.codingthailand.com/api/category'
    const resp = await axios.put(apiUrl, {
      id: id,
      name: data.name,
    })
    alert(resp.data.message)
    history.replace('/category')
  }

  const { id } = useParams()
  const getData = useCallback(async () => {
    const resp = await axios.get(
      `https://api.codingthailand.com/api/category/${id}`
    )
    setValue('name', resp.data.name)
  }, [id, setValue])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Container className='mt-4'>
      <Row>
        <Col xs={12} md={8}>
          <h1>Create Page</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='name'>
              <Form.Label>Category News</Form.Label>
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
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default EditPage
