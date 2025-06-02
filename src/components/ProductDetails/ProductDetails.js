import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/' + productKey)
      .then(res => res.json())
      .then(data => {
        setProduct({
          key: data.id.toString(),
          name: data.title,
          price: data.price,
          img: data.thumbnail, // və ya img: data.images[0]
          seller: data.brand,
          ...data
        });
      });
  }, [productKey]);

  return (
    <div>
      <h1>Product details</h1>
      {product && <Product showAddToCart={false} product={product}></Product>}
    </div>
  );
};

export default ProductDetails;