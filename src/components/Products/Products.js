import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Loading from '../Loading';
import Product from '../Product';

import './Products.scss';

export default function Products (props) {

    const { products: { result ,loading, error} } = props

    return (
        <Container>
            <Row>
                {loading || !result 
                ? <Loading />
                : result.map((product, index) =>(
                    <Product product={product} key={index} />
                ))}
            </Row>
        </Container>
    );
}