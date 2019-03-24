import React, { Component } from 'react';
import { connect } from "react-redux";


const mapStateToProps = state => ({
    ...state,
    counter: state.counterState.count,
    inputs: state.formState.inputData,
    formId: state.formState.formId,
    taxes: state.formState.taxes
});

class Counter extends Component {
    constructor() {
        super();

        this.state = {};
    }
    counter() {
        var coste = 0;
        var procents = 0;
        for (const key in this.props.inputs) {
            if (this.props.inputs.hasOwnProperty(key)) {
                const element = this.props.inputs[key];

                if (+element.form !== +this.props.formId) {
                    continue;
                }
                if ([1, 2, 4, 7].includes(+element.price_type)) {
                    coste += +element.price * ((element.state) ? -1 : 1);
                }
                if (+element.price_type === 3) {
                    procents += +element.price;
                }
            }
        }
        if (this.props.taxes.hasOwnProperty(this.props.formId)) {
            this.props.taxes[this.props.formId].forEach(element => {
                procents += +element;
            });
        }
        coste += +coste * (+procents / 100);

        return coste;
    }
    render() {
        return (
            <div className="countbody">
                <span className="counter" >{this.counter()}</span>
                <span>Рублей</span>
            </div>
        )
    }
}


export default connect(mapStateToProps)(Counter);