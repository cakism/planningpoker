import React from 'react'
import '../css/common.css'
import {CSSTransitionGroup} from 'react-transition-group'
import SockJsClient from 'react-stomp';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import TextField from "@material-ui/core/TextField/TextField";

class Poker extends React.Component {

    constructor(props) {
        super(props);
        const {joinCode, user} = props.location.state;
        this.state = {
            user: user,
            joinCode: joinCode,
            points: '',
            poll: '',
            castVotes: []
        };
    }

    componentDidMount() {
        console.log('Loaded poker room with base joincode:' + this.state.joinCode)
    }

    connectUser = (user) => {
        this.clientRef.sendMessage('/vote/' + this.state.joinCode + '.join', JSON.stringify(user))
    };

    castVote = (event) => {
        const points = event.target.value;
        this.setState({[event.target.name]: points});
        console.log("Got new vote event with " + points + " points");
        this.clientRef.sendMessage('/vote/' + this.state.joinCode + '.vote', points)
    };

    handleIncomingMsgs = (msg, topic) => {
        console.log('msg from topic: ' + topic);
        if (topic.endsWith('.joins')) {
            this.handleJoins(msg)
        } else if (topic.endsWith('.votes')) {
            this.handleVotes(msg)
        }
    };

    handleJoins = (latestPoll) => {
        const filteredVotes = this.filterMyVote(Array.from(latestPoll.votes));
        this.setState({poll: latestPoll, castVotes: filteredVotes});
        console.log("Poll updated: " + JSON.stringify(latestPoll))
    };

    filterMyVote = (incomingVotes) => {
        console.log("Votes pre-filter: " + JSON.stringify(incomingVotes));
        const votesWithoutMine = incomingVotes.filter((value, index, array) => {
            return value.user.id !== this.state.user.id
        });
        console.log("Without my vote: " + JSON.stringify(votesWithoutMine));
        return votesWithoutMine
    };

    handleVotes = (msg) => {
        const filteredVotes = this.filterMyVote(Array.from(msg));
        this.setState({castVotes: filteredVotes});


    };

    render() {
        const { joinCode, user, poll, castVotes } = this.state


        const baseUrl = window.location.protocol + '//'+ window.location.hostname +":8080/app";
        console.log("Starting with baseurl: "+baseUrl)
        return (
            <CSSTransitionGroup
                transitionName="baseTransition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>

                <SockJsClient url={baseUrl}
                              topics={['/topic/' + joinCode + '.joins', '/topic/' + joinCode + '.votes']}
                              onMessage={this.handleIncomingMsgs}
                              ref={(client) => {
                                  this.clientRef = client
                              }}
                              onConnect={() => {
                                  this.setState({clientConnected: true});
                                  this.connectUser(this.state.user)
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false})
                              }}/>

                <div className='root'>
                    <PokerPoll joinCode={joinCode} poll={poll}/>
                    <div id="me">
                        <p>{user.name} </p>
                        <p className="small">(That´s you)</p>
                        <FormControl className='pointselector'>
                            <Select
                                onChange={this.castVote}
                                value={this.state.points}
                                displayEmpty
                                name="points">
                                <MenuItem value="" disabled>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>Zero</MenuItem>
                                <MenuItem value={0.5}>1/2</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                            </Select>
                            <FormHelperText>Points</FormHelperText>
                        </FormControl>
                        <PokerVoteList castVotes={castVotes}/>
                    </div>
                </div>
            </CSSTransitionGroup>
        )
    }
}

function PokerPoll(props) {
    return (
        <div>
            <TextField
                id="joincode"
                label="Room join code"
                value={props.joinCode}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <h2>{props.poll.pollName}</h2>
            <h3>{props.poll.pollDescription}</h3>
        </div>
    )
}

const PokerVoteList = ({castVotes}) => {

    const pokerFace = castVotes.map((vote) => {
        return (<PokerMember user={vote.user} key={vote.user.id} points={vote.points}/>)
    });
    return (<div className="votegrid">{pokerFace}</div>);

};

const PokerMember = ({user, points}) => {
    return (
        <span className="castvote" id={user.id}>
            <h4>{user.name}</h4>
            {points}
        </span>
    )
};

//TODO typechecking with proptypes
export default Poker