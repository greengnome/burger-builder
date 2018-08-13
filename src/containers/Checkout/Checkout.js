import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: 4
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = this.state.totalPrice;;

        for (let param of query.entries()) {
            if(param[0] !== 'price') {
                ingredients[param[0]] = +param[1];
            } else {
                price = param[1];
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    onCheckoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    onCheckoutCanceled={this.onCheckoutCanceledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler} 
                    ingredients={this.state.ingredients} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData 
                                        ingredients={this.state.ingredients} 
                                        price={this.state.totalPrice} 
                                        {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;