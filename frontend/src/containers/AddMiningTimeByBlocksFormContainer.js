import { connect } from 'react-redux';
import $ from 'jquery';
import { addMiningTimeByBlocks, addAPIError, setMiningTimeByBlocksFormError } from '../actions/index';
import AddMiningTimeByBlocksForm from '../components/AddMiningTimeByBlocksForm';
import getGetAverageMiningTimeByBlocksPromise from '../api/averageMiningTimeByBlocks';
import { isIntegerNumeric, getCurrentTimestamp } from '../utils';

const mapStateToProps = state => ({
    errors: state.miningTimeByBlocksFormErrors,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (e) => {
        e.preventDefault();
        const numberOfBlocks = $(e.target).find('input[name="value"]').val();

        if (isIntegerNumeric(numberOfBlocks)) {
            const numberOfBlocksInt = Number.parseInt(numberOfBlocks, 10);

            getGetAverageMiningTimeByBlocksPromise(numberOfBlocksInt).then((data) => {
                dispatch(
                    addMiningTimeByBlocks(numberOfBlocksInt, getCurrentTimestamp(), data.average),
                );
            }, (err) => {
                dispatch(addAPIError(err.message));
            });
        } else {
            dispatch(setMiningTimeByBlocksFormError([`The value ${numberOfBlocks} is incorrect.`]));
        }
    },
});

const AddMiningTimeByBlocksFromContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddMiningTimeByBlocksForm);

export default AddMiningTimeByBlocksFromContainer;
