import React, { Component } from 'react';
import Service from './Service';
import { HeadTitleBlock } from './dump/HeadTitleBlock';


class Card extends Component {
    constructor(props) {
        super()
        this.state = {
            title: props.title,
            services: props.services,
            form: props.form
        }
    }
    render() {
        var titles = Object.keys(this.state.services);
        var services = Object.values(this.state.services)
        return (
            <HeadTitleBlock title={this.state.title}>
                {services.map((value, index) => {
                    return <Service
                        key={index}
                        title={titles[index]}
                        features={value}
                        form={this.state.form}
                    />
                })}
            </HeadTitleBlock>
        )
    }
}

export default Card;