import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Poker from './Poker'
import React from "react";
import {CSSTransitionGroup} from 'react-transition-group'
import '../css/common.css'
import TextField from "@material-ui/core/TextField/TextField";
import axios from 'axios'
import Button from "@material-ui/core/Button/Button";

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            host: '',
            pollName: '',
            pollDescription: '',
            createdPoll: '',
            toPoker: false
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCreate = event => {

        console.log("values", this.state.host, this.state.pollName, this.state.pollDescription);
        //To be done:check for empty values before hitting submit
        var self = this;
        var newPoll = {
            "host": this.state.host,
            "pollName": this.state.pollName,
            "pollDescription": this.state.pollDescription
        };
        axios.post('http://localhost:8080/create', newPoll)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {

                    console.log('Got successful response, got ' + response.data);
                    self.setState({createdPoll: response.data, toPoker: true})
                    /*var loginscreen = [];
                    loginscreen.push(<Login parentContext={this}/>);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });*/

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { toPoker, createdPoll } = this.state
        if (toPoker === true) {
            console.log("In redirect..");
            return (<Redirect to={{pathname: '/poker', state: {createdPoll: createdPoll}}}/>)
        }
        //const StartAppLink = props => <Link to={{pathname: '/poker', state: {createdPoll: this.state.createdPoll}}}>Create poll</Link>;

        return (
            <CSSTransitionGroup
                transitionName="baseTransition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>

                <div>
                    <h1>Create a new poll</h1>
                    <TextField
                        required
                        id="username"
                        label="Name"
                        value={this.state.host}
                        onChange={this.handleChange('host')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="poll-name"
                        label="Poll name"
                        value={this.state.pollName}
                        onChange={this.handleChange('pollName')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="poll-description"
                        label="Poll description"
                        multiline
                        rowsMax="4"
                        value={this.state.pollDescription}
                        onChange={this.handleChange('pollDescription')}
                        margin="normal"
                        helperText="Optional"
                        variant="outlined"
                    />
                    <Button variant="contained" color='primary'
                            className="actionbtn" onClick={this.handleCreate}>
                        Create poll
                    </Button>
                </div>
            </CSSTransitionGroup>
        )
    }
}

export default Create