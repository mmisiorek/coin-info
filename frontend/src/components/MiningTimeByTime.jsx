import { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils';
import '../styles/MiningTimeByTime.css';

class MiningTimeByTime extends Component {
    render() {
        return (
            <p className="MiningTimeByTime">
                {this.props.orderNumber}) Mining time in period
                &nbsp;of last <span className="data data-minutes">{this.props.minutes}</span> minutes
                &nbsp;at <span className="data data-time">{timestampToString(this.props.time)}</span>
                &nbsp;was: <span className="data data-average">{this.props.average}</span>
            </p>
        );
    }
}

MiningTimeByTime.propTypes = {
    minutes: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    average: PropTypes.number.isRequired,
    orderNumber: PropTypes.number.isRequired,
};

export default MiningTimeByTime;
