import React from 'react'
import { Helmet } from 'react-helmet'

const TabName = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

TabName.defaultProps = {
  title: 'Welcome To FoodHub',
  keywords: 'Food, Cheaper, Waste, Groceries',
  description: 'We help reduce food waste',
}

export default TabName
