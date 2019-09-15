import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from './dump/Alert';

const mapDispatchToProps = dispatch => ({
    addTaxes: data => dispatch({
        type: "addTaxes",
        payload: data
    })
});

const mapStateToProps = state => ({
    ...state,
    inputData: state.formState.inputData,
    formId: state.formState.formId
});

class SubmitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            msg: {
                type: null,
                show: false,
                message: []
            }
        };
    }

    submitForm(ev) {
        ev.preventDefault();
        var data = { ...this.state };
        delete data.msg;
        var type = "warning"
        var inputForm = this.props.inputData;
        var msg = [];
        var mailregular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phoneregular = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

        if ((data.name === null) || data.name.length < 4) {
            msg.push("Имя не может быть короче 4 символов!");
        }

        if ((data.email === null) || data.email.length < 6) {
            msg.push("Почта не может быть короче 6 символов!");
        } else if (false === mailregular.test(String(data.email).toLowerCase())) {
            msg.push("Кажется это не почтовый адрес!");
        }

        if ((data.phone === null) || data.phone.length < 8) {
            msg.push("Телефон не может быть короче 8 символов!");
        } else if (false === phoneregular.test(String(data.phone))) {
            msg.push("Кажется это не номер телефона!");
        }

        var outForm = {}


        for (var key in inputForm) {
            var value = inputForm[key];
            if (+value.form === +this.props.formId) {
                outForm[value.id] = value.price;
            }
        }
        if (Object.keys(outForm).length === 0) {
            msg.push("Вы ничего не выбрали!");
        }
        if (msg.length === 0) {
            fetch('http://priceclaculate/submit.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body:
                    `form=${JSON.stringify({
                        Email: data.email,
                        Name: data.name,
                        Phone: data.phone
                    })}&data=${JSON.stringify(outForm)}`


            })
                .then(res => res.json())
                .then(
                    (result) => this.showAlert("success", [result.notifi]),
                    (error) => this.showAlert("warning", [error.notifi]),
                )
        } else {
            this.showAlert(type, msg);
        }


    }

    showAlert(type, msg) {
        this.setState({
            msg: {
                type: type,
                show: true,
                message: msg
            }
        })
    }

    render() {
        return ([

            <Alert
                key="0"
                type={this.state.msg.type}
                show={this.state.msg.show}
                message={this.state.msg.message}
            />,
            <form method="post" id="submitform">
                <div className="form-group">
                    <input
                        key="NameInput"
                        type="text"
                        name="Name"
                        onChange={(ev) => { this.state.name = ev.target.value }}
                        className="form-control"
                        placeholder="Имя" />
                </div>
                <div className="form-group">
                    <input
                        key="EmailInput"
                        type="email"
                        name="Email"
                        onChange={(ev) => { this.state.email = ev.target.value }}
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Почта" />
                </div>
                <div className="form-group">
                    <input
                        key="PhoneInput"
                        type="phone"
                        name="Phone"
                        onChange={(ev) => { this.state.phone = ev.target.value }}
                        className="form-control"
                        placeholder="Номер телефона" />
                </div>
                <button key="SubmitInput" type="submit" onClick={this.submitForm.bind(this)} className="btn btn-primary">Отправить</button>
            </form>
        ])
    }
} export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitForm);