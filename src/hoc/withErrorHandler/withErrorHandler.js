import React, { Component } from "react";

import Modal from "./../../components/UI/Modal/Modal";
import Aux from "./../Auxilary";

const wiithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
        error: null
    }

    constructor(props) {
        super(props);
        this.reqIterceptor = axios.interceptors.request.use(req => {
            this.setState({ error: null });

            return req;
        });
        this.resIterceptor = axios.interceptors.response.use(res => res, err => {
            this.setState({ error: err });
        });
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.reqIterceptor);
        axios.interceptors.response.eject(this.resIterceptor);
    }

    errorConfirmedHandler = () => {
        this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} hide={this.errorConfirmedHandler}>
            { this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default wiithErrorHandler;
