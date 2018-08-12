import React from 'react';

import classes from './SideDrawer.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Aux from './../../../hoc/Auxilary';
import Backdrop from './../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    const closedSideDrawer = [classes.SideDrawer, classes.Close];
    const openedSideDrawer = [classes.SideDrawer, classes.Open];
    const attachedClasses = props.open ? openedSideDrawer : closedSideDrawer;

    return (
        <Aux>
            <Backdrop 
                show={props.open} 
                hide={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;
