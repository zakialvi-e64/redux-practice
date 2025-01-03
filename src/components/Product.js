import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { add } from "../store/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    };

    getProducts();
  }, []);

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