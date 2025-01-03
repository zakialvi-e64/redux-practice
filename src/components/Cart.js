import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart);

  const removeFromCart = (productId) => {
    dispatch(remove(productId));
  };


  const cards = cartProducts.map(product => (
    <div className='col-md-3' style={{ marginBottom: "10px" }}>
      <Card style={{ width: '18rem' }} key={product.id} className='h-100'>
        <div className='text-center'>
          <Card.Img variant="top" src={product.images[0]} style={{ width: "100px", height: "130px" }} />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>PKR {product.price}</Card.Text>
        </Card.Body>

        <Card.Footer style={{ backgroundColor: "white" }}>
          <Button variant="danger" onClick={() => removeFromCart(product.id)}> Remove</Button>
        </Card.Footer>
      </Card>
    </div >
  ));
  return (
    <>
      <h1>Cart</h1>

      <div className='row'>
        {cards}
      </div>

    </>
  )
}

export default Cart