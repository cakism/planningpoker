package im.jens.projectplanner.service

import im.jens.projectplanner.model.User

interface UserSessionService {

    fun connect(sessionId: String, user: User)

    fun createUser(username: String): User

    fun disconnect(sessionId: String)


    fun getUser(sessionId: String): User
}