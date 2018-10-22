package im.jens.projectplanner.service

import im.jens.projectplanner.model.User

interface UserSessionService {

    fun connect(sessionId: String, username: String): User

    fun disconnect(sessionId: String)


}