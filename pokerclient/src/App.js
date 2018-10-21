import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

class App extends Component {
    render() {
        const {classes} = this.props
        return (
            <WelcomeScreen/>
        );
    }
}



export default App;
