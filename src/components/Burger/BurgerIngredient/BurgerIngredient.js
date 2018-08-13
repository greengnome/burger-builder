import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css'

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div title="bread-bottom" className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div title="bread-top" className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div title="meat" className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div title="cheese" className={classes.Cheese}></div>;
                break;
            case ('salad'):
                ingredient = <div title="salad" className={classes.Salad}></div>;
                break;
            case ('bacon'):
                ingredient = <div title="bacon" className={classes.Bacon}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;