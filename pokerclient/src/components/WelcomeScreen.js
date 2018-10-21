import {Component} from "react";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import { Link } from 'react-router-dom'

class WelcomeScreen extends Component {
    render() {
        const {classes} = this.props
        const JoinLink = props => <Link to="/join" {...props} />
        const CreateLink = props => <Link to="/create" {...props} />
        return (
            <div>
                <header className="App-header">
                    <h1 className="App-title">Planning Poker</h1>
                    <Button variant="contained" component={CreateLink} raised color='primary' className="actionbtn">
                        Create
                    </Button>
                    <Button variant="contained" component={JoinLink} raised color='primary' className="actionbtn">
                        Join
                    </Button>
                </header>
            </div>
        );
    }
}

export default WelcomeScreen