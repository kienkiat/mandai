import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
