import React, { useContext } from 'react'
import ProductCard from '../../components/product-card/product-card.component';
import './shop.styles.scss'; 
import { ProductContext } from '../../contexts/products.context';

const Shop = () => {
    const { products } = useContext(ProductContext); 
  return (
    <div className='products-container'>
        {products.map((product) =>(
            <div key={product.id}>
                <ProductCard key={product.id} product={product} />
            </div>
        ))}
    </div>
  )
}

export default Shop; 