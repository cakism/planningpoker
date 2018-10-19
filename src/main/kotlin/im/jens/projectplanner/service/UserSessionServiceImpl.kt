package im.jens.projectplanner.service

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.User
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Service

@Service
@Scope("singleton")
class UserSessionServiceImpl : UserSessionService {

    private val log = LoggerFactory.getLogger(this::class.java)

    private var activeSessions = mutableMapOf<String, User>()
    override fun connect(sessionId: String, user: User) {
        log.info("Connected user: ${user.name} with session id: $sessionId")
        activeSessions.putIfAbsent(sessionId, user)

    }

    override fun disconnect(sessionId: String) {
        val sessionUser =
        log.info("Disconnected user: ${activeSessions.getValue(sessionId)} with session: $sessionId")
    }
}