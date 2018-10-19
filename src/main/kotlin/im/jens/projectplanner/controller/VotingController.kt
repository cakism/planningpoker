package im.jens.projectplanner.controller

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.User
import im.jens.projectplanner.model.Vote
import im.jens.projectplanner.service.TaskSessionService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.RequestMapping
import java.time.LocalDateTime

class VotingController {

    private val log = LoggerFactory.getLogger(this::class.java)

    @Autowired
    private lateinit var taskSessionService: TaskSessionService

    @MessageMapping("/{poll}.vote")
    @SendTo("/topic/{poll}.votes")
    fun vote(@DestinationVariable("poll") poll: String, vote: Vote): CastVote {
        //Todo check user is in session storage and vote within acceptable range?

        return CastVote(vote.user, vote.points)
    }

    @RequestMapping("/create")
    //@SendTo("/topic/{poll}")
    fun createPoll(host: User, pollName: String, text: String = ""): PlanningTask {
        val planningTask = PlanningTask(taskSessionService.getNextTaskId(), host, pollName, text)

        return planningTask
    }

}