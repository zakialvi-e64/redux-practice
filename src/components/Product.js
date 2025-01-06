import React from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { add } from "../store/cartSlice";
import { getProducts } from '../store/productSlice';
import statusCode from '../utils/statusCode';

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector(state => state.products);
  console.log({ status });

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === statusCode.LOADING) {
    return (
      <p>Loading...</p>
    )
  }

  if (status === statusCode.ERROR) {
    return (
      <Alert key={"danger"} variant='danger'>Something went wrong! Try again later</Alert>
    )
  }

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const cards = products.map(product => (
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
          <Button variant="primary" onClick={() => addToCart(product)} > Add To Cart</Button>
        </Card.Footer>
      </Card>
    </div >
  ));


  return (
    <>
      <h1>Products Dashboard</h1>

      <div className='row'>
        {cards}
      </div>

    </>
  )
}

export default Product