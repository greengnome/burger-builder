import React, { Component } from 'react';
import axios from './../../../axios-orders';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Aux from './../../../hoc/Auxilary';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const ordersToServer = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kirill Gladkov',
                address: {
                    street: 'test street',
                    zipCode: '43425',
                    Country: 'Israel'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'

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

    render() {

        let content = <Spinner />;
        if (!this.state.loading) {
            content = (
                <Aux>
                    <h4>Enter your Contact Data</h4>
                    <form>
                        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                        <input className={classes.Input} type="text" name="street" placeholder="Street" />
                        <input className={classes.Input} type="text" name="zip" placeholder="ZIP Code" />
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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