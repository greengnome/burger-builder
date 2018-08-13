import React, { Component } from 'react';

import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true });

    axios.get('orders.json').then(res => {
        console.log(res.data);
        const fetchedOrders = [];
        for (let i in res.data) {
          fetchedOrders.push({
            ...res.data[i],
            id: i
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      }).catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {

    let orders = <Spinner />;

    if (!this.state.loading) {
      orders = (
        <div>
    {this.state.orders.map(order => (
      <Order 
        key={order.id} 
        ingredients={order.ingredients}
        price={+order.price}/>
    ))}
        </div>
      );
    }

    console.log(this.state.orders)
    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);