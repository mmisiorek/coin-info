import { connect } from 'react-redux';
import MiningTimesList from '../components/MiningTimesList';

const mapStateToProps = state => ({
    miningTimes: state.miningTimes,
});

const mapDispatchToProps = () => ({});

const MiningTimesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MiningTimesList);

export default MiningTimesListContainer;
