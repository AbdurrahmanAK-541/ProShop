import React from 'react'
import { Pagination } from 'react-bootstrap'
//import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
//import { LinkContainer } from 'react-router-bootstrap'

//Will take in props as it needs to know the page, pages, keywords , and
//will also be put on the adminProductList => need to know user's status = false by default
const Paging = ({ page, pages, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            {/*{x+1} = the page that is currently displayed. */}
            {/* active = displays a black box around the current page number*/}
          </Link>
        ))}
      </Pagination>
    )
  )
}

export default Paging
