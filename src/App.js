import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state

    const itemAlreadyInCart = cartList.some(
      eachItem => eachItem.id === product.id,
    )
    return itemAlreadyInCart
      ? this.setState({
          cartList: cartList.map(eachItem => {
            if (eachItem.id === product.id) {
              return {
                ...eachItem,
                quantity: eachItem.quantity + product.quantity,
              }
            }
            return {...eachItem}
          }),
        })
      : this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state

    return quantity === 0
      ? this.setState({cartList: cartList.filter(item => item.id !== id)})
      : this.setState({
          cartList: cartList.map(eachItem => {
            if (eachItem.id === id) {
              return {...eachItem, quantity}
            }
            return {...eachItem}
          }),
        })
  }

  incrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity}
        }
        return {...eachItem}
      }),
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
