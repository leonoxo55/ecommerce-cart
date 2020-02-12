import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Products.scss';

export default function Products (props) {

    const { products: { result ,loading, error} } = props

    return (
        <Container>
            <Row>
                {loading || !result ?
                    'Cargando'
                : result.map((product, index) =>(
                    <Product product={product} key={index} />
                ))}
            </Row>
        </Container>
    );
}

function Product (props) {
    const {product} = props;


    return('algo');
}
    
