import { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AddMiningTimeByTimeForm.css';

class AddMiningTimeByTimeForm extends Component {
    render() {
        const errors = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);

        return (
            <form
                className="AddMiningTimeByTimeForm"
                onSubmit={this.props.onSubmit}
            >
                <label htmlFor="value">
                    <span className="text">Check average block mining time in number of minutes: </span>
                    <input type="text" name="value" placeholder="For example 60" />
                </label>
                <input type="submit" value="Submit" />
                <div className="errors">
                    <ul>
                        {errors}
                    </ul>
                </div>
            </form>
        );
    }
}

AddMiningTimeByTimeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddMiningTimeByTimeForm;
