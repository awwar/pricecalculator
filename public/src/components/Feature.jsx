import React, { Component } from 'react';

import { connect } from 'react-redux';
import { SuccessCard } from './dump/SuccessCard';


const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch({
        type: "addInputData",
        payload: data
    }),
    onDeclie: data => dispatch({
        type: "deleteInputData",
        payload: data
    })
});

const mapStateToProps = state => ({
    ...state,
    inputs: state.formState
});

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: `feature-${props.name}`,
            form: props.form,
            price: props.price,
            checktype: props.checktype,
            id: 'service-' + props.feature_id,
            description: props.description,
            price_type: props.price_type_id
        }
        this.Change = (ev) => {
            if (ev.target.value === "false") {
                this.props.onSubmit({
                    price: this.state.price,
                    price_type: this.state.price_type,
                    name: ev.target.name,
                    form: this.state.form,
                    id: ev.target.id
                })
            } else {
                this.props.onDeclie({
                    name: ev.target.name,
                })
            }

        };
    }

    setValue() {
        if (this.state.name in this.props.inputs.inputData) {
            if (this.state.id === this.props.inputs.inputData[this.state.name].id) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <SuccessCard description={this.state.description}>
                <input
                    value={this.setValue()}
                    checked={this.setValue()}
                    onChange={() => { }}
                    onClick={this.Change}
                    type={this.state.checktype}
                    name={this.state.name}
                    id={this.state.id}
                    className="success"
                />
                <span className="slider round"></span>
            </SuccessCard>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feature);