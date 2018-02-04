import { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/APIErrorMessage.css';

class APIErrorMessage extends Component {
    render() {
        return (
            <p className="APIErrorMessage">
                {this.props.orderNumber}) There was an API error:
                <span className="data data-message">{this.props.message}</span>
            </p>
        );
    }
}

APIErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    orderNumber: PropTypes.number.isRequired,
};

export default APIErrorMessage;
