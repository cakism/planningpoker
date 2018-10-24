import {Redirect} from 'react-router-dom'
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
        this.handleCreate = this.handleCreate.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCreate = event => {
        const { host, pollName, pollDescription } = this.state;
        console.log("values", host, pollName, pollDescription);
        //Todo input check
        const newPoll = {
            "host": host,
            "pollName": pollName,
            "pollDescription": pollDescription
        };
        const baseUrl = window.location.protocol + '//' + window.location.hostname + ":8080";
        axios.post(baseUrl + '/create', newPoll)
            .then(response => {
                if (response.status === 200) {

                    console.log('Got successful response, got ' + JSON.stringify(response.data));
                    this.setState({createdPoll: response.data, toPoker: true})

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const {toPoker, createdPoll, host, pollName, pollDescription} = this.state;
        if (toPoker) {
            return (
                <Redirect to={{pathname: '/poker', state: {joinCode: createdPoll.joinCode, user: createdPoll.host}}}/>)
        }

        return (
            <CSSTransitionGroup
                transitionName="baseTransition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>

                <div className="centercolumn">
                    <h1>Create a new poll</h1>
                    <TextField
                        required
                        id="username"
                        label="Your name"
                        value={host}
                        onChange={this.handleChange('host')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="poll-name"
                        label="Poll name"
                        value={pollName}
                        onChange={this.handleChange('pollName')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="poll-description"
                        label="Poll description"
                        multiline
                        rowsMax="4"
                        value={pollDescription}
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