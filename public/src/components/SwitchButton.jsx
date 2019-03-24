import React, { Component } from 'react';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
    onClick: ev => dispatch({
        type: "switchForm",
        payload: ev
    })
});

class SwitchButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: props.number,
            title: props.title
        };
        this.Click = ev => this.props.onClick(this.state.number);
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.Click}
                type="button"
                id={"cardbutton" + this.state.number}
            >
                {this.state.title}
            </button>
        )
    }
}

export default connect(
    (state) => ({ ...state }),
    mapDispatchToProps
)(SwitchButton);