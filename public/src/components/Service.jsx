import React, { Component } from 'react';
import Feature from './Feature';
import { Block } from './dump/Block';

class Service extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            features: props.features,
            form: props.form,
        }
    }

    render() {
        var features = Object.values(this.state.features)
        var name = features[0].feature_id;
        return (
            <Block title={this.state.title}>
                {features.map((value, index) => {
                    return <Feature
                        key={value.feature_id}
                        description={value.description}
                        price={value.price}
                        price_type_id={value.price_type_id}
                        feature_id={value.feature_id}
                        form={this.props.form}
                        name={name}
                        checktype={(this.state.features.length > 1) ? 'radio' : 'checkbox'}
                    />
                })}
            </Block>
        )
    }
}

export default Service;