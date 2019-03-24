import React, { Component } from 'react';
import { connect } from "react-redux";
import { CollapseCard } from './dump/CollapseCard';
import Card from './Card';

const mapDispatchToProps = dispatch => ({
    addTaxes: data => dispatch({
        type: "addTaxes",
        payload: data
    })
});

const mapStateToProps = state => ({
    ...state,
    isshow: state.formState.formId
});


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formId: props.formId,
            cards: props.cards,
            taxes: props.taxes,
            name: props.name,
            inputs: {}
        };
        this.props.addTaxes({
            formId: this.state.formId,
            data: this.state.taxes
        })
    }

    render() {
        var titles = Object.keys(this.state.cards);
        var cards = Object.values(this.state.cards)
        return (
            <CollapseCard
                title={this.state.name}
                isshow={this.props.isshow === this.state.formId}
                id={`cardcollapse${this.state.formId}`}
            >
                {
                    cards.map((value, index) => {
                        return <Card
                            key={index}
                            title={titles[index]}
                            services={value}
                            form={this.state.formId}
                        ></Card>
                    })
                }
            </CollapseCard>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);