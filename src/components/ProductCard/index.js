import {Link} from 'react-router-dom'

import './index.css'
import CartContext from '../../context/CartContext'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    <CartContext.Consumer>
      {value => {
        const {changeActiveProductId} = value

        const onClickingItem = () => {
          changeActiveProductId(id)
        }

        return (
          <li className="product-item">
            <Link
              to={`/products/${id}`}
              className="link-item"
              onClick={onClickingItem}
            >
              <img src={imageUrl} alt="product" className="thumbnail" />
              <h1 className="title">{title}</h1>
              <p className="brand">by {brand}</p>
              <div className="product-details">
                <p className="price">Rs {price}/-</p>
                <div className="rating-container">
                  <p className="rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default ProductCard
