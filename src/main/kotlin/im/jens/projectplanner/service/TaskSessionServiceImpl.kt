package im.jens.projectplanner.service

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.User
import org.slf4j.LoggerFactory
import java.util.*
import java.util.concurrent.atomic.AtomicLong
import kotlin.streams.asSequence

class TaskSessionServiceImpl : TaskSessionService {


    private val log = LoggerFactory.getLogger(this::class.java)

    private var taskIdPool: AtomicLong = AtomicLong(0)
    private val taskRepo: MutableMap<PlanningTask, MutableList<CastVote>> = mutableMapOf()

    private fun getJoinCode(): String {
        val source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return Random().ints(4, 0, source.length)
                .asSequence()
                .map(source::get)
                .joinToString("")
    }

    override fun registerNewTask(host: User, pollName: String, text: String): PlanningTask {
        val task = PlanningTask(taskIdPool.incrementAndGet(), getJoinCode(), host, pollName, text)
        taskRepo[task] = mutableListOf()
        return task
    }

    override fun getTask(joinCode: String): PlanningTask {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getAllVotes(taskId: Long): Collection<CastVote> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun registerVote(taskId: Long, vote: CastVote) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }


}