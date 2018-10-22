import React from 'react'
import '../css/common.css'
import {CSSTransitionGroup} from 'react-transition-group'

class Poker extends React.Component {

    constructor(props) {
        super(props);
        const {createdPoll} = props.location.state
        this.state = {
            host: '',
            pollName: '',
            pollDescription: '',
            createdPoll: createdPoll
        }
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
                    The poker app will go here, it has joincode: ${this.state.createdPoll.joinCode}
                </div>
            </CSSTransitionGroup>
        )
    }
}

export default Poker