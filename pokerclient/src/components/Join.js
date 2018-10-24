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
        this.handleJoin = this.handleJoin.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleJoin = event => {
        //Todo : input check
        const newUser = {username: this.state.username};
        const baseUrl = window.location.protocol + '//'+ window.location.hostname +":8080";
        axios.post(baseUrl+'/createuser', newUser)
            .then(response => {
                if (response.status === 200) {

                    console.log('Got successful response from createuser: ' + JSON.stringify(response.data));
                    this.setState({user: response.data, toPoker: true})

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { toPoker, joinCode, user } = this.state
        if (toPoker) {
            return (
                <Redirect to={{pathname: '/poker', state: {joinCode: joinCode, user: user}}}/>)
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