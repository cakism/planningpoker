import {Switch, Route} from 'react-router-dom'
import Poker from './Poker'
import React from "react";
import { CSSTransitionGroup } from 'react-transition-group'
import '../css/common.css'

const Join = () => {
    return (
        <CSSTransitionGroup
            transitionName="baseTransition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <div>
                The screen to join a poll will go here
            </div>
        </CSSTransitionGroup>
    )
}

export default Join