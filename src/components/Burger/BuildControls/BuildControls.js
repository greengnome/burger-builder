import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    const ctrs = controls.map(
            ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
            )
        );
    
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{Math.round(+props.price * 100) / 100}</strong></p>
            {ctrs}
            <button 
                onClick={props.ordered} 
                disabled={!props.purchasable} 
                className={classes.OrderButton}>ORDER NOW</button>
        </div>
    );
};

export default buildControls;