import React from 'react'
import '../css/common.css'
import { CSSTransitionGroup } from 'react-transition-group'

const Poker = () => {
    return (
        <CSSTransitionGroup
            transitionName="baseTransition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <div>
                The poker app will go here
            </div>
        </CSSTransitionGroup>
    )
}

export default Poker