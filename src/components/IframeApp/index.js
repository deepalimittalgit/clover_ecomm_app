import React, { Component} from 'react';
import './index.css';
import { Button } from '@material-ui/core';

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
        const elements = window.clover.elements();

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
        const cloverFooter = document.getElementsByClassName('clover-footer')[0];
        if (cloverFooter){
            cloverFooter.style.display = "none";
        }
    }

    generateMask(cardLast4) {
        return cardLast4.padStart(16, '*');
    }

    callCreateChargeAPI = async (response) => {
        const source = response.token;
        const card = response.card;
        this.props.outputHandler(`Charging Card '${this.generateMask(card.last4)}' for $25.00...`);

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
        this.props.outputHandler(`Payment Success, Confirmation # is - ${resp.id}`);
        return resp;
    };

    // clearOutput() {
    //     this.setState({output: []});
    //     const outputConsole = document.getElementById('output-area');
    //     outputConsole.innerHTML= "";
    // }
    handleFormSubmit(event) {
        event.preventDefault();
        this.props.outputHandler(null, true);

        const displayError = document.getElementById('card-errors');

        this.props.outputHandler('Genarating Token (Using Encrypted Pan) ...');

        window.clover.createToken()
            .then((result) => {
                if (result.errors) {
                    Object.values(result.errors).forEach(function (value) {
                        displayError.textContent = value;
                    });
                } else {
                    this.props.outputHandler(`Token Id is -> ${result.token}`);
                }
                return result;
            })
            .then((resp) => this.callCreateChargeAPI(resp))
            .catch(err => console.log(err));
    }
    componentWillUnmount(){
        const cloverFooter = document.getElementsByClassName('clover-footer')[0];
        cloverFooter && cloverFooter.parentNode.removeChild(cloverFooter);
    }
    render() {
        return (
            <div className="App" id="iframeapp">
                <div id="card-errors" role="alert"/>
                <div className="flex justify-center mt-16">
                    <form id="payment-form" noValidate autoComplete="off">
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
                    </form>

                    <Button type="button" variant="contained" size="large" onClick={() => this.props.backHandler()}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" size="large" onClick={this.handleFormSubmit}>
                        Pay $25.00
                    </Button>
                </div>
            </div>
        );
    }
}


export default IframeApp;
