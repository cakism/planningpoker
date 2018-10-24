import {Redirect} from 'react-router-dom'
import React from "react";
import {CSSTransitionGroup} from 'react-transition-group'
import '../css/common.css'
import TextField from "@material-ui/core/TextField/TextField";
import axios from 'axios'
import Button from "@material-ui/core/Button/Button";


class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            joinCode: '',
            user: '',
            toPoker: false
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleJoin = event => {
        var self = this
        //Todo : input check
        let newUser = {username: this.state.username}
        axios.post('http://localhost:8080/createuser', newUser)
            .then(function (response) {
                if (response.status === 200) {

                    console.log('Got successful response from createuser: ' + JSON.stringify(response.data));
                    self.setState({user: response.data, toPoker: true})

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        if (this.state.toPoker === true) {
            return (
                <Redirect to={{pathname: '/poker', state: {joinCode: this.state.joinCode, user: this.state.user}}}/>)
        }

        return (
            <CSSTransitionGroup
                transitionName="baseTransition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>

                <h1 className="center">Join a planning poker poll</h1>
                <div className="centercolumn">
                    <TextField
                        required
                        id="username"
                        label="Your name"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="joincode"
                        label="Poll join code"
                        value={this.state.joinCode}
                        onChange={this.handleChange('joinCode')}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" color='primary'
                            className="actionbtn" onClick={this.handleJoin}>
                        Join poll
                    </Button>
                </div>
            </CSSTransitionGroup>
        )
    }
}

export default Join