import React from 'react'
import '../css/common.css'
import {CSSTransitionGroup} from 'react-transition-group'
import SockJsClient from 'react-stomp';

class Poker extends React.Component {

    constructor(props) {
        super(props);
        const {joinCode, username} = props.location.state;
        this.state = {
            username: username,
            joinCode: joinCode,
            poll: ''
        };

        //TODO const msgDestinationBaseUrl = '/vote/' + this.state.joinCode + "."; god damn scope shit
    }

    componentDidMount() {
        console.log('Loaded poker room with base joincode:' + this.state.joinCode)
    }

    connectUser = (username) => {
        this.clientRef.sendMessage('/vote/' + this.state.joinCode  + '.join', username)
    }

    castVote = (points) => {
        this.clientRef.sendMessage('/vote/' + this.state.joinCode  + '.join', points)
    };


    handleJoins = (poll) => {
        // show poll members, pollname, etc.
    };

    render() {

        const baseUrl = "http://localhost:8080/app";
        console.log("Using baseUrl: " + baseUrl);
        return (
            <CSSTransitionGroup
                transitionName="baseTransition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>

                <SockJsClient url={baseUrl} topics={[this.state.joinCode + '.joins']}
                              onMessage={(msg) => {
                                  console.log(msg);
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}
                              onConnect={() => {
                                  this.setState({clientConnected: true});
                                  this.connectUser("test")
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false})
                              }}/>

                <div>
                    The poker app will go here, it has joincode: ${this.state.joinCode}
                </div>
            </CSSTransitionGroup>
        )
    }
}

export default Poker