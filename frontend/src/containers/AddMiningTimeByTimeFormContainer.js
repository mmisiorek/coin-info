import { connect } from 'react-redux';
import $ from 'jquery';
import { addMiningTimeByTime, addAPIError, setMiningTimeByTimeFormError } from '../actions/index';
import AddMiningTimeByTimeForm from '../components/AddMiningTimeByTimeForm';
import getGetAverageMiningTimeByTypePromise from '../api/averageMiningTimeByTime';
import { isIntegerNumeric, getCurrentTimestamp } from '../utils';

const mapStateToProps = state => ({
    errors: state.miningTimeByTimeFormErrors,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (e) => {
        e.preventDefault();
        const minutes = $(e.target).find('input[name="value"]').val();

        if (isIntegerNumeric(minutes)) {
            const minutesInt = Number.parseInt(minutes, 10);

            getGetAverageMiningTimeByTypePromise(minutesInt).then((data) => {
                dispatch(
                    addMiningTimeByTime(minutesInt, getCurrentTimestamp(), data.average),
                );
            }, (err) => {
                dispatch(addAPIError(err.message));
            });
        } else {
            dispatch(setMiningTimeByTimeFormError([`The value ${minutes} is incorrect.`]));
        }
    },
});

const AddMiningTimeByTimeFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddMiningTimeByTimeForm);

export default AddMiningTimeByTimeFormContainer;
