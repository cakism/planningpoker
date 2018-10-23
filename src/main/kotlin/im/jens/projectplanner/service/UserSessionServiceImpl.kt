package im.jens.projectplanner.service

import im.jens.projectplanner.model.User
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Service
import java.util.concurrent.atomic.AtomicLong
import kotlin.IllegalArgumentException

@Service
@Scope("singleton")
class UserSessionServiceImpl : UserSessionService {

    private val log = LoggerFactory.getLogger(UserSessionServiceImpl::class.java)

    private var userIdPool = AtomicLong(0)

    private var activeSessions = mutableMapOf<String, User>()

    override fun connect(sessionId: String, user: User) {
        log.info("Connected user: ${user.name} with session id: $sessionId and userid ${user.id}")
        activeSessions[sessionId] = user
    }

    override fun createUser(username: String): User {
        val id = userIdPool.incrementAndGet()
        log.info("Creating user: $username with userid $id")
        return User(id, username)
    }

    override fun getUser(sessionId: String): User = activeSessions[sessionId]?: throw IllegalArgumentException("No user found with that sessionid")

    override fun disconnect(sessionId: String) {
        //TODO get user from list and remove all cast votes. But first save what users are in what polls to avoid having to check all of them for a user
        activeSessions.remove(sessionId)
        log.info("Disconnected user: ${activeSessions.getValue(sessionId)} with session: $sessionId")
    }
}