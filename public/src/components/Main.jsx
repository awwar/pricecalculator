import React, { Component } from 'react';
import Form from './Form';
import SwitchButton from './SwitchButton';
import Counter from './Counter';
import SubmitForm from './SubmitForm';


class Main extends Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            forms: [],
            buttons: []
        };
    }
    datasset(result) {
        var items = result;
        var buttons = [];
        var forms = [];
        var c = 0;
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                var item = items[key];
                forms.push(
                    <Form
                        key={++c}
                        formId={c}
                        name={key}
                        cards={item.cards}
                        taxes={item.taxes}
                    />
                );

                buttons.push(
                    <SwitchButton
                        key={c}
                        number={c}
                        title={key}
                    />
                )
            };
        }
        this.setState({
            buttons: buttons,
            forms: forms,
        })
    }
    componentDidMount() {
        fetch("http://priceclaculate/calculation.php")
            .then(res => res.json())
            .then(
                (result) => {
                    try {                        
                        this.datasset(result);
                    } catch (error) {
                        console.log(error);
                    }
                },
                (error) => console.log(error)
            )
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-toggleable-md fixed-top bg-inverse navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Калькулятор цены</a>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <main>
                            {/*<div className="lds-dual-ring loader" />*/}
                            <div className="calcbody">
                                <p id="switchbuttons">
                                    {this.state.buttons}
                                </p>
                                <div id="formsplace">
                                    {this.state.forms}
                                </div>
                            </div>
                        </main>
                        <nav className="sidebar">
                            <Counter />
                            <SubmitForm />
                        </nav>
                    </div>
                </div>
            </div>


        )
    }
}

export default Main;