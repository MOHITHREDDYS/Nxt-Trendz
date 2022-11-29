import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onClickingRemoveAll = () => {
        removeAllCartItems()
      }

      let totalPrice = 0
      cartList.forEach(item => {
        totalPrice += item.price * item.quantity
      })

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-button"
                  onClick={onClickingRemoveAll}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="checkout-container">
                  <div className="total-items-price-container">
                    <h1 className="order-total">
                      Order Total:{' '}
                      <span className="total-price">Rs {totalPrice}/-</span>
                    </h1>
                    <p className="items-total">
                      {cartList.length} {cartList.length > 1 ? 'items' : 'item'}{' '}
                      in cart
                    </p>
                  </div>
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
