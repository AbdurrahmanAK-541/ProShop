import axios from 'axios' //use it to make the request to upload a file/image
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, productUpdate } from '../actions/productsActions'
//import { EDIT_USER_RESET } from '../constants/userConstants'
import { Link } from 'react-router-dom'
import { UPDATE_PRODUCT_RESET } from '../constants/productConstants'

const EditProductScreen = ({ match, history }) => {
  const productID = match.params.id
  //use match to get the UserID and put it in a variable.
  const [name, setName] = useState('') //set to an empty string by default
  const [price, setPrice] = useState(0) //set to 0 by default
  const [priceBefore, setPriceBefore] = useState(0) //set to 0 by default
  const [image, setImage] = useState('') //set to an empty string by default
  const [brand, setBrand] = useState('') //set to an empty string by default
  const [category, setCategory] = useState('') //set to an empty string by default
  const [description, setDescription] = useState('') //set to an empty string by default
  const [countInStock, setCountInStock] = useState('') //set to an empty string by default
  const [uploadingFile, setUploadingFile] = useState(false) //set to an empty string by default

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const updateProduct = useSelector((state) => state.updateProduct)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successfullyUpdated,
  } = updateProduct
  //get loading error etc but already have it from the productDetails ==> rename it.

  useEffect(() => {
    //check for the successfulEdit of the user before because if we can edit then we want to reset the user/edit state then
    //redirect to the userList once it has been updated.

    if (successfullyUpdated) {
      dispatch({ type: UPDATE_PRODUCT_RESET })
      history.push('/admin/productList')
    } else {
      if (!product.name || product._id !== productID) {
        //check if the product doesnt exist or if the product id is not equal to the productID that is coming from the url
        dispatch(listProductDetails(productID))
        //dipatch .. that takes in the productID
      } else {
        //if the product does exist then set the following fields..
        setName(product.name)
        setPriceBefore(product.priceBefore)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, history, product, productID, successfullyUpdated]) //passing in the dependencies.
  //pass in the user to the useEffect dependencies so that it updates

  const uploadingFileHandler = async (e) => {
    const File = e.target.files[0]
    const formData = new FormData()
    formData.append('image', File)
    setUploadingFile(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploadingFile(false)
    } catch (error) {
      console.error(error)
      setUploadingFile(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      productUpdate({
        _id: productID,
        name,
        priceBefore,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
    //_id object object will contain form fields coming from the component state
  }

  return (
    <>
      <Link to='/admin/productList' className='btn btn-dark my-3'>
        Back
      </Link>
      <FormContainer>
        <h1>Edit Products</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>errorUpdate</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>User name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='priceBefore'>
              <Form.Label>Price Before</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price before'
                value={priceBefore}
                onChange={(e) => setPriceBefore(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Input Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadingFileHandler}
              ></Form.Control>
              {uploadingFile && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Input brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              className='justify-content-center mt-3'
              type='submit'
              variant='primary'
            >
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProductScreen
