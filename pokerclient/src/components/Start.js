import {Component} from "react";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import { Link } from 'react-router-dom'

class Start extends Component {
    render() {
        const JoinLink = props => <Link to="/join" {...props} />
        const CreateLink = props => <Link to="/create" {...props} />
        return (
            <div>
                <header className="App-header">
                    <h1 className="App-title">Planning Poker</h1>
                    <Button variant="contained" component={CreateLink} color='primary' className="actionbtn">
                        Create
                    </Button>
                    <hr/>
                    <Button variant="contained" component={JoinLink} color='primary' className="actionbtn">
                        Join
                    </Button>
                </header>
            </div>
        );
    }
}

export default Start