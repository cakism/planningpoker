import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Start from './Start'
import Join from './Join'
import Create from './Create'
import Poker from './Poker'


const Content = () =>{
    return(
        <Switch>
            <Route exact path="/" component={Start}/>
            <Route path="/join" component={Join}/>
            <Route path="/create" component={Create}/>
            <Route path="/poker" component={Poker}/>
        </Switch>
    )
}

export default Content