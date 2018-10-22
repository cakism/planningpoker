import {Switch, Route} from 'react-router-dom'
import Poker from './Poker'
import React from "react";
import {CSSTransitionGroup} from 'react-transition-group'
import '../css/common.css'
import TextField from "@material-ui/core/TextField/TextField";

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            host: '',
            pollName: '',
            pollDescription: ''
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
            "host": this.state.first_name,
            "pollName": this.state.last_name,
            "pollDescription": this.state.email
        };
        axios.post('localhost:8080/create', newPoll)
            .then(function (response) {
                console.log(response);
                if (response.data.code === 200) {
                    console.log("Got successful response");
                    var loginscreen = [];
                    loginscreen.push(<Login parentContext={this}/>);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

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
                        onChange={this.handleChange('pollname')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="poll-description"
                        label="Poll description"
                        multiline
                        rowsMax="4"
                        value={this.state.pollDescription}
                        onChange={this.handleChange('polldescription')}
                        margin="normal"
                        helperText="Optional"
                        variant="outlined"
                    />

                </div>
            </CSSTransitionGroup>
        )
    }
}

export default Create