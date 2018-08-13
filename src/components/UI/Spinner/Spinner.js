import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => {
    return (
        <div style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
            <div className={classes.Loader}>
                Loading...
            </div>
        </div>
    );
};

export default spinner;