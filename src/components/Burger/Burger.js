import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])]
                .map((__dirname, i) => {
                    return <BurgerIngredient key={i + ingKey} type={ingKey} />
                });
        });

    const errorBurgerMsg = <p>Please start adding ingredients</p>;
    const ingCount = ingredients.reduce((sum, current) => { return sum + current.length }, 0);
    const burgerBody = !ingCount ? errorBurgerMsg : ingredients;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {burgerBody}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;