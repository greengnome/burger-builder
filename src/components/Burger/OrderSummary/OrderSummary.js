import React, { Component } from 'react';

import Aux from './../../../hoc/Auxilary';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {

    // this could be a stateless component
    componentDidUpdate() {
        console.log('[Order Summary will update]');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igKey, i) => {
                return (
                    <li key={igKey + i}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                {this.props.ingredients[igKey]}
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
                <strong>Total Price: {this.props.price.toFixed(2)}</strong>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.cancelPurchasing} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.continuePurchasing} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;