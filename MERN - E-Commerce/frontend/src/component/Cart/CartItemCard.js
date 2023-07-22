import "./CartItemCard.css"
import {Link} from "react-router-dom"
import React from 'react'

const CartItemCard = ({item,deleteItemsCart}) => {
  return (
    <div className="CartItemCard">
    <img src={item.image} alt="pic" />

    <div>
    <Link to={`/product/${item.product}`}>{item.name}</Link>
    <span>{`Price :${item.price}`}</span>
    <p onClick={()=> deleteItemsCart(item.product)}>Remove</p>
    </div>
        </div>
  )
}

export default CartItemCard