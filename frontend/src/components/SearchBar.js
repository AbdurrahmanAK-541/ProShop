import React, { useState } from 'react'
//bringing in useState because the keywords are needed that are part of the component state
import { Form } from 'react-bootstrap'

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  //define the component state which will be keyword representing the keyword
  //keyword will passed in the form and set it to the useState.
  //useState will have a default of an empty string

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  //'Keyword.trim' = remove any white space
  //search and then will be redirected to a page plus the keyword used to describe the product
  //if nothing is added, redirect to the homePage

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search For Products...'
        className='mr-sm-2 ml-sm-5'
        //margin rigth on small screens -> size 2 .... margin left on small screens size 5
        FcSearch
      ></Form.Control>
      {/*outline success == green outline and the search bar will have a padding of 2*/}
    </Form>
  )
}

export default SearchBar
