package im.jens.projectplanner.controller

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.User
import im.jens.projectplanner.model.Vote
import im.jens.projectplanner.service.TaskSessionServiceImpl
import im.jens.projectplanner.service.UserSessionServiceImpl
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
class VotingController {

    private val log = LoggerFactory.getLogger(VotingController::class.java)

    @Autowired
    private lateinit var taskSessionService: TaskSessionServiceImpl

    @Autowired
    private lateinit var userSessionService: UserSessionServiceImpl

    @RequestMapping("/create")
    fun createPoll(host: String, pollName: String, text: String? = ""): PlanningTask {
        val user = userSessionService.connect("test", host) //TODO change sessionid to var for host?
        val planningTask = taskSessionService.registerNewTask(user, pollName, text)
        return planningTask
    }


    @MessageMapping("/{poll}.vote")
    @SendTo("/topic/{pollCode}.votes")
    fun vote(@DestinationVariable("pollCode") pollCode: String, vote: Vote): CastVote? {
        return try {
            val task = taskSessionService.getTask(pollCode) //throws exception if no task is found for pollcode
            taskSessionService.registerVote(task.id, vote)
        } catch (e: Exception) {
            null
        }
    }

    @MessageMapping("/{poll}.join")
    @SendTo("/topic/{poll}.joins")
    fun join(@DestinationVariable("pollCode") pollCode: String, username: String): PlanningTask? {
        return try {
            taskSessionService.getTask(pollCode) //throws exception if no task is found for pollcode
        } catch (e: Exception) {
            null
        }
    }


}