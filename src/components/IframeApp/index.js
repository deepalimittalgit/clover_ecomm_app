import React, { Component} from 'react';
import './index.css';
import {
    Button,
    Paper,
    Divider,
} from '@material-ui/core';

const styles = {
    body: {
        fontFamily: 'Roboto, Open Sans, sans-serif',
        fontSize: '16px',
    },
    input: {
        fontSize: '13px',
        border: '1px solid #aaa',
        height: '50px',
        borderRadius: '10px',
        padding: '8px'
    },
    img: {
        right: '10px !important',
        top: '10px !important',
    }
};

class IframeApp extends Component {
    constructor(props) {
        super(props);
        debugger;
        const elements = window.clover.elements();

        this.state = {
            output: [],
        };
        this.state = {
            token: null,
            output: [],
            showUserInfo: false,
            customerId: '',
            user: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'John.Doe@corona.com'
            },
            card_expiry: '04/2022',
            card: {
                number: '4005562231212123',
                brand: 'VISA',
                cvv: '123',
                exp_month: '04',
                exp_year: '2022'
            }
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.cardNumber = elements.create('CARD_NUMBER', styles);
        this.cardDate = elements.create('CARD_DATE', styles);
        this.cardCvv = elements.create('CARD_CVV', styles);
        this.cardPostalCode = elements.create('CARD_POSTAL_CODE', styles);
    }

    componentDidMount() {
        const displayError = document.getElementById('card-errors');
        this.cardNumber.mount('#card-number');
        this.cardDate.mount('#card-date');
        this.cardCvv.mount('#card-cvv');
        this.cardPostalCode.mount('#card-postal-code');

        this.cardNumber.addEventListener('change', (event) => {
            displayError.textContent = event.error ? event.error.message : '';
        });
        this.cardDate.addEventListener('change', (event) => {
            displayError.textContent = event.error ? event.error.message : '';
        });
        this.cardCvv.addEventListener('change', (event) => {
            displayError.textContent = event.error ? event.error.message : '';
        });
        this.cardPostalCode.addEventListener('change', (event) => {
            displayError.textContent = event.error ? event.error.message : '';
        });
    }

    writeOutput(message) {
        this.setState({ output: [...this.state.output, message]});
    };

    generateMask(cardLast4) {
        return cardLast4.padStart(16, '*');
    }

    callCreateChargeAPI = async (response) => {
        const source = response.token;
        const card = response.card;

        this.writeOutput(`Charging Card '${this.generateMask(card.last4)}' for $25.00...`);

        // const source = this.state.showUserInfo ? this.state.customerId : this.state.token;
        const data = JSON.stringify({ source: source });

        const chargeResponse = await fetch('/api/createCharge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });

        const resp = await chargeResponse.json();
        if (chargeResponse.status !== 200) {
            throw Error(resp.message);
        }
        this.writeOutput(`Payment Success, Confirmation # is - ${resp.id}`);
        return resp;
    };

    clearOutput() {
        this.setState({output: []});
        const outputConsole = document.getElementById('output-area');
        outputConsole.innerHTML= "";
    }
    handleFormSubmit(event) {
        event.preventDefault();
        this.clearOutput();
        const displayError = document.getElementById('card-errors');

        this.writeOutput('Genarating Token (Using Encrypted Pan) ...');

        window.clover.createToken()
            .then((result) => {
                if (result.errors) {
                    Object.values(result.errors).forEach(function (value) {
                        displayError.textContent = value;
                    });
                } else {
                    this.writeOutput(`Token Id is -> ${result.token}`);
                }
                return result;
            })
            .then((resp) => this.callCreateChargeAPI(resp))
            .catch(err => console.log(err));
    }

    componentWillUnmount(){
        const cloverFooter = document.getElementsByClassName('clover-footer')[0];
        cloverFooter.parentNode.removeChild(cloverFooter);
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="flex justify-center mt-16">
                        <div id="card-errors" role="alert"></div>
                                {/*<div className="FormRow">*/}
                                {/*</div>*/}
                                {/*<div className="FormRow">*/}
                                {/*    <TextField id="card-date" className="field third-width" label="Expiration (MM/YYYY)" variant="filled" onChange={this.handleChange} defaultValue={this.state.card_expiry} />*/}
                                {/*    <TextField id="card-cvv" className="field third-width" label="CVV" variant="filled" onChange={this.handleChange} value={this.state.card.cvv} />*/}
                                {/*</div>*/}
                                {/*<FormControlLabel*/}
                                {/*    control={<Checkbox color="secondary" name="saveCard" value="yes" onChange={this.handleCheckbox} />}*/}
                                {/*    label="Save Card on File for next time"*/}
                                {/*/>*/}
                        <form id="payment-form" onSubmit={this.handleFormSubmit} clsss="form-container">
                            <fieldset className="FormGroup">
                                <div className="FormRow">
                                    <div id="card-number" className="field card-number"/>
                                </div>

                                <div className="FormRow">
                                    <div id="card-date" className="field third-width"/>
                                    <div id="card-cvv" className="field third-width"/>
                                    <div id="card-postal-code" className="field third-width"/>
                                </div>
                            </fieldset>
                            <Divider variant="middle" />
                            <Button type="button" variant="contained" size="large" onClick={() => this.props.backHandler()}>
                                Back
                            </Button>
                            <Button type="submit" variant="contained" color="primary" size="large">
                                Pay $25.00
                            </Button>
                        </form>
                    </div>
                    <Divider variant="middle" />
                    <div className="flex justify-center mt-16">
                        <Paper elevation={3} id="output-area">
                            {this.state.output.map((item, key) =>
                                <p key={key}>{item}</p>
                            )}
                        </Paper>
                    </div>
                </header>
            </div>
        );
    }
}


export default IframeApp;
