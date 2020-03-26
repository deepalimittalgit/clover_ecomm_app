import React, {Component} from 'react';
import './index.css';
import classNames from "classnames";
import {
    Button,
    Typography,
    Divider, Paper,
} from '@material-ui/core';
import IframeApp from "../IframeApp";
import SDKApp from "../SDKApp"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iframeapp: false,
            sdkapp: false,
            output: [],
        };
    }
    resetStates = () => {
        this.setState({iframeapp: false, sdkapp: false, output: []});
    };

    buttonHandler = e => {
        e.preventDefault();
        this.resetStates();

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
        this.resetStates();
    };

    clearOutput = () => {
        this.setState({output: []});
        const outputConsole = document.getElementById('output-area');
        outputConsole.innerHTML= "";
    };

    outputHandler = (message, clear = false) => {
        if(clear) {
            this.clearOutput();
        }
        message && this.setState({ output: [...this.state.output, message]});
    };

    render() {
        return (
            <div className="App">
                <div id="page-container" className="full-bleed" role="main">
                    <div id="top-header-container">
                        <Typography variant="h4" gutterBottom>
                            Clover Ecommerce Demo Application
                        </Typography>
                    </div>
                    <div id="main-body-container">
                        <div className="leftSection">
                            <div className="introduction">
                                <p className="title">Welcome to Clover Ecommerce</p>
                                <ul>
                                    <li>
                                        Clover provides different ways to integrate with the E-Commerce services.
                                        This is a demonstration on how to consume clover ecommerce platform using
                                        Card Tokenization process.
                                    </li>
                                    <li>
                                        The simplest integrations rely on a Clover-hosted iframe tokenizer, See the &nbsp;
                                        <a target="_blank" rel="noopener noreferrer" href={'https://docs.clover.com/clover-platform/docs/ecommerce-integration-types#section-iframe-and-api'}>iframe</a>
                                        &nbsp; documentation for more information.
                                    </li>

                                    <li>
                                        Clover also provides Node SDK to allow quick integration with the E-Commerce API.
                                        For more information refer the &nbsp;
                                        <a target="_blank" rel="noopener noreferrer" href={'https://www.npmjs.com/package/clover-ecomm-sdk'}>Node SDK</a>
                                        &nbsp; usage.
                                    </li>
                                    <li>Thank you! Please&nbsp;
                                        <a target="_blank" rel="noopener noreferrer" href={'mailto:deepali.mittal@clover.com?subject=Questions regarding Clover sample Application.'}>contact me</a>
                                        &nbsp;for any questions</li>
                                </ul>

                            </div>
                        </div>
                        <div className="rightSection">
                            {!this.state.iframeapp && !this.state.sdkapp && (
                                <div className="App-header">
                                    <Button variant="contained" id="iframe" color="primary" size="large"
                                            onClick={this.buttonHandler}>
                                        Pay with iFrame SDK
                                    </Button>
                                    <Button variant="contained" id="sdk" color="primary" size="large"
                                            onClick={this.buttonHandler}>
                                        Pay with Node SDK
                                    </Button>
                                </div>
                            )}
                            {this.state.iframeapp && <IframeApp backHandler={this.backFunctionHandler} outputHandler={this.outputHandler}/>}
                            {this.state.sdkapp && <SDKApp backHandler={this.backFunctionHandler} outputHandler={this.outputHandler}/>}
                        </div>
                    </div>
                    {(this.state.iframeapp || this.state.sdkapp) && (
                        <div id="console-header">
                            <Divider variant="middle" />
                            <h2>Console Output</h2>
                        </div>
                    )}
                    <div id="output-container" className={classNames({
                        blackColor: this.state.iframeapp || this.state.sdkapp,
                        mainColor: (!this.state.iframeapp && !this.state.sdkapp)
                    })}>
                        { (this.state.iframeapp || this.state.sdkapp) && (
                        <Paper elevation={3} id="output-area">
                            {this.state.output.map((item, key) =>
                                <p key={key}>{item}</p>
                            )}
                        </Paper>
                        )}
                    </div>
                </div>
            </div>
    );
    }
    }

    export default Home;
