import { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils';
import '../styles/MiningTimeByBlocks.css';

class MiningTimeByBlocks extends Component {
    render() {
        return (
            <p className="MiningTimeByBlocks">
                {this.props.orderNumber}) Mining time for number
                &nbsp;of last blocks <span className="data data-number-of-blocks">{this.props.numberOfBlocks}</span>
                &nbsp;at <span className="data data-time">{timestampToString(this.props.time)}</span>
                &nbsp;was: <span className="data data-average">{this.props.average}</span>
            </p>
        );
    }
}

MiningTimeByBlocks.propTypes = {
    numberOfBlocks: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    average: PropTypes.number.isRequired,
    orderNumber: PropTypes.number.isRequired,
};

export default MiningTimeByBlocks;
