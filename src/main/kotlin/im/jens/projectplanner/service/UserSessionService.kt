package im.jens.projectplanner.service

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.User

interface UserSessionService {

    fun connect(sessionId: String, user: User)

    fun disconnect(sessionId: String)


}