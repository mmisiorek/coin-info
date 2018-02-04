import { Component } from 'react';
import PropTypes from 'prop-types';
import APIErrorMessage from './APIErrorMessage';
import MiningTimeByBlocks from './MiningTimeByBlocks';
import MiningTimeByTime from './MiningTimeByTime';
import * as miningTimeTypes from '../constants/miningTimeTypes';
import '../styles/MiningTimesList.css';

class MiningTimesList extends Component {
    render() {
        const list = this.props.miningTimes.map((miningTime, idx) => {
            switch (miningTime.type) {
            case miningTimeTypes.BY_BLOCKS:
                return (
                    <MiningTimeByBlocks
                        key={idx}
                        numberOfBlocks={miningTime.numberOfBlocks}
                        time={miningTime.time}
                        average={miningTime.average}
                        orderNumber={idx + 1}
                    />
                );
            case miningTimeTypes.BY_TIME:
                return (
                    <MiningTimeByTime
                        key={idx}
                        minutes={miningTime.minutes}
                        time={miningTime.time}
                        average={miningTime.average}
                        orderNumber={idx + 1}
                    />
                );
            case miningTimeTypes.API_ERROR:
                return (
                    <APIErrorMessage
                        key={idx}
                        message={miningTime.message}
                        orderNumber={idx + 1}
                    />
                );
            default:
                return (
                    <div />
                );
            }
        });

        return (
            <div className="MiningTimesList">
                {list}
            </div>
        );
    }
}

MiningTimesList.propTypes = {
    miningTimes: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                numberOfBlocks: PropTypes.number.isRequired,
                time: PropTypes.number.isRequired,
                average: PropTypes.number.isRequired,
            }),
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                minutes: PropTypes.number.isRequired,
                time: PropTypes.number.isRequired,
                average: PropTypes.number.isRequired,
            }),
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired,
            }),
        ]),
    ).isRequired,
};

export default MiningTimesList;
