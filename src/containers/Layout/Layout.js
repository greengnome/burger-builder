import React, { Component } from 'react';

import classes from './Layout.css';
import Aux from '../../hoc/Auxilary';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    
    sideDraweCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    showSideDrawerHadler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar showSideDrawer={this.showSideDrawerHadler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDraweCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;
