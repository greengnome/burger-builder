import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import Burger from './../../components/Burger/Burger';

class Burgerbuilder extends Component {
    
    render() {
        return (
            <Aux>
                <Burger></Burger>
                <div>Build Controls</div>
            </Aux>
        );
    }
}
export default Burgerbuilder;