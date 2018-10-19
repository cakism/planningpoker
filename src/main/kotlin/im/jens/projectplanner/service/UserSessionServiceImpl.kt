package im.jens.projectplanner.service

import im.jens.projectplanner.model.User
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Service
import java.util.concurrent.atomic.AtomicLong

@Service
@Scope("singleton")
class UserSessionServiceImpl : UserSessionService {

    private val log = LoggerFactory.getLogger(UserSessionServiceImpl::class.java)

    private var userIdPool = AtomicLong(0)

    private var activeSessions = mutableMapOf<String, User>()
    override fun connect(sessionId: String, username: String): User {
        val user = User(userIdPool.incrementAndGet(), username)
        log.info("Connected user: $username with session id: $sessionId")
        activeSessions.putIfAbsent(sessionId, user)
        return user
    }

    override fun disconnect(sessionId: String) {
        val sessionUser =
        log.info("Disconnected user: ${activeSessions.getValue(sessionId)} with session: $sessionId")
    }
}