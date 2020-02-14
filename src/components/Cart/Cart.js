import React, { Fragment, useState } from 'react';
import {Button} from 'react-bootstrap';
import {ReactComponent as CartEmpty} from '../../assets/svg/cart-empty.svg';
import {ReactComponent as CartFull} from '../../assets/svg/cart-full.svg';

import './Cart.scss';

export default function Cart(props){

    const {productCart} = props;

    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0; 

    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = 'scroll';
    }

    return (
        <Fragment>
            <Button variant='link' className='cart' >
                {productCart && productCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
                
            </Button>
            <div className='cart-content' style={{width: widthCartContent}}>
                Todos mis productos
            </div>
        </Fragment>
    );
}