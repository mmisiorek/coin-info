import { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AddMiningTimeByBlocksForm.css';

class AddMiningTimeByBlocksForm extends Component {
    render() {
        const list = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);

        return (
            <form
                className="AddMiningTimeByBlocksForm"
                onSubmit={this.props.onSubmit}
            >
                <label htmlFor="value">
                    <span className="text">Check average block mining time in in last number of blocks: </span>
                    <input type="text" name="value" placeholder="For example 200" />
                </label>
                <input type="submit" value="Submit" />
                <div className="errors">
                    <ul>
                        {list}
                    </ul>
                </div>
            </form>
        );
    }
}

AddMiningTimeByBlocksForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddMiningTimeByBlocksForm;
