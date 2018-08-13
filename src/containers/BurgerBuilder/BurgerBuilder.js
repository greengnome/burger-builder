import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class Burgerbuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseble: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json').then(res => {
            this.setState({ ingredients: res.data })
        }).catch(err => {
            this.setState({error: true})
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
            purchaseble: true
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        
        if(oldCount === 0) return;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceAddition;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    hideModalHadler = () => {
        this.setState({ purchasing: false })
    }

    updatePurchaseState (ingredients) {
        if(!ingredients) return
        let res = 0;
        for(let key in ingredients) {
            res += ingredients[key];
        }
        
        this.setState({
            purchaseble: res > 0
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search:  '?' + queryString

        });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    
    render() {

        const disabledInfo = {...this.state.ingredients};
        let summary = <Spinner />;
        if(this.state.loading) {
            summary = <Spinner />;
        };

        for (let ing in disabledInfo) { 
            disabledInfo[ing] = disabledInfo[ing] <= 0; 
        }

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can`t be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            summary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    continuePurchasing={this.purchaseContinueHandler}
                    cancelPurchasing={this.purchaseCancelHandler}
                    price={this.state.totalPrice} />
            );

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchaseble}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
        }


        return (
            <Aux>
                <Modal hide={this.hideModalHadler} show={this.state.purchasing}>
                    {summary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(Burgerbuilder, axios);