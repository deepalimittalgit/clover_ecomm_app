import React, { Component} from 'react';
import './index.css';
import {
    Button,
    Typography,
    Divider,
} from '@material-ui/core';
import IframeApp from "../IframeApp";
import SDKApp from "../SDKApp"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iframeapp: false,
            sdkapp: false
        };
    }

    buttonHandler = e => {
        e.preventDefault();
        this.setState({iframeapp: false, sdkapp:false});
        switch (e.target.parentNode.id) {
            case 'iframe':
                this.setState({iframeapp: true});
                break;
            case 'sdk':
                this.setState({sdkapp: true});
                break;
            default:
                console.log('.');
        }
    };
    backFunctionHandler = () => {
        this.setState({
            iframeapp: false,
            sdkapp:false
        });
    };

    render() {
        return (
            <div className="App">
                <Typography variant="h4" gutterBottom>
                    Deepali's Book Shop
                </Typography>

                { !this.state.iframeapp && !this.state.sdkapp && (
                    <header className="App-header">
                        <Divider variant="middle" />
                        <div className="flex justify-center mt-16">
                            <Button variant="contained" id="iframe" color="primary" size="large" onClick={this.buttonHandler}>
                                Pay with iFrame SDK
                            </Button>
                            <Button variant="contained" id="sdk" color="primary" size="large" onClick={this.buttonHandler}>
                                Pay with Node SDK
                            </Button>
                        </div>
                    </header>
                )}
                { this.state.iframeapp && <IframeApp backHandler={this.backFunctionHandler}/>}
                { this.state.sdkapp && <SDKApp backHandler={this.backFunctionHandler}/>}
            </div>
        );
    }
}

export default Home;
