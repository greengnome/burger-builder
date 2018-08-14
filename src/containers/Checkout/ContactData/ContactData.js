import React, { Component } from 'react';
import axios from './../../../axios-orders';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Aux from './../../../hoc/Auxilary';
import classes from './ContactData.css';
import Input from './../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: this._generateFormConfig('input', 'text', 'Your Name'),
            street: this._generateFormConfig('input', 'text', 'Street'),
            zipCode: this._generateFormConfig('input', 'text', 'ZIP Code'),
            country: this._generateFormConfig('input', 'text', 'Country'),
            email: this._generateFormConfig('input', 'email', 'Your E-Mail'),
            deliveryMethod: this._generateFormConfig('select', 'select', 'Your Name', null, [
                { value: 'fastest', displayName: 'Fastest' }, 
                { value: 'normal', displayName: 'Normal' }
            ])
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const ordersToServer = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData

        }
        axios
            .post('/orders.json', ordersToServer)
            .then(resp => {
                console.log(resp);
                this.setState({ loading: false });
                this.props.history.replace('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
    }

    _generateFormConfig (elementType = 'input', type = 'text', placeholder = '', value = '', options = []) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
                options: elementType.toLowerCase() === 'select' ?  options : null
            },
            value: value,
            validation: {
                required: true
            },
            valid: false
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '';
        }

        // if(rules.minLength) {
        //     isValid = value.length >= rules.minLength;
        // }

        return isValid;
    }

    inputChangedHandler = (e, inputType) => {
        const orderFormUpdated = {
            ...this.state.orderForm
        };
        const updatedElement = {
            ...orderFormUpdated[inputType]
        };
        updatedElement.value = e.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        orderFormUpdated[inputType] = updatedElement; 
        console.log(updatedElement.valid);
        this.setState({ orderForm: orderFormUpdated })
    }

    render() {
        const orderElementsArray = [];
        let content = <Spinner />;
        for (let key in this.state.orderForm) {
            orderElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        if (!this.state.loading) {
            content = (
                <Aux>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {orderElementsArray.map(orderFormElement => {
                            return <Input
                                key={orderFormElement.id} 
                                elementType={orderFormElement.config.elementConfig.type}
                                elementConfig={orderFormElement.config.elementConfig} 
                                value={orderFormElement.value} 
                                changed={(e) => this.inputChangedHandler(e, orderFormElement.id)}/>;
                        })}
                        <Button btnType="Success">ORDER</Button>
                    </form>
                </Aux>
            );
        }

        return (
            <div className={classes.ContactData}>
                {content}
            </div>
        )
    }
}

export default ContactData;