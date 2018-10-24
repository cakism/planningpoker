package im.jens.projectplanner.service

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.User
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Service
import java.util.*
import java.util.concurrent.atomic.AtomicLong
import kotlin.streams.asSequence

@Service
@Scope("singleton")
class TaskSessionServiceImpl : TaskSessionService {


    private val log = LoggerFactory.getLogger(TaskSessionServiceImpl::class.java)

    private var taskIdPool: AtomicLong = AtomicLong(0)
    private val taskRepo: MutableMap<Long, PlanningTask> = mutableMapOf()

    private fun getJoinCode(): String {
        val source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return Random().ints(4, 0, source.length)
                .asSequence()
                .map(source::get)
                .joinToString("")
    }

    override fun registerNewTask(host: User, pollName: String, text: String?): PlanningTask {
        val task = PlanningTask(taskIdPool.incrementAndGet(), getJoinCode(), host, pollName, text)
        log.info("Registering new task with id ${task.id}, joincode: ${task.joinCode} and pollname: $pollName")
        taskRepo[task.id] = task
        return task
    }

    override fun getTask(joinCode: String): PlanningTask {
        return taskRepo.values.single { it.joinCode == joinCode }
    }

    override fun registerVote(taskId: Long, vote: String, user: User): Set<CastVote>? {
        val castVote = CastVote(user, vote)
        taskRepo[taskId]?.votes?.apply {
            removeIf { it == castVote }
            add(castVote)
        }
        return taskRepo[taskId]?.votes
    }
}
