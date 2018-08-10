import React from 'react';

import Aux from './../../../hoc/Auxilary';
import Button from './../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return (
                <li key={igKey + i}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button clicked={props.cancelPurchasing} btnType="Danger">CANCEL</Button>
            <Button clicked={props.continuePurchasing} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;