package im.jens.projectplanner.controller

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.PlanningTaskDTO
import im.jens.projectplanner.model.Vote
import im.jens.projectplanner.service.TaskSessionServiceImpl
import im.jens.projectplanner.service.UserSessionServiceImpl
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.Header
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class VotingController {

    private val log = LoggerFactory.getLogger(VotingController::class.java)

    @Autowired
    private lateinit var taskSessionService: TaskSessionServiceImpl

    @Autowired
    private lateinit var userSessionService: UserSessionServiceImpl

    @RequestMapping("/create", method = arrayOf(RequestMethod.GET))
    fun createPoll(@Header("simpSessionId") sessionId: String, newPoll: PlanningTaskDTO): PlanningTask {
        val user = userSessionService.connect(sessionId, newPoll.host) //TODO change sessionid to var for host?
        log.info("Accepting new task...")
        return taskSessionService.registerNewTask(user, newPoll.pollName, newPoll.text)
    }


    @MessageMapping("/{poll}.vote")
    @SendTo("/topic/{pollCode}.votes")
    fun vote(@Header("simpSessionId") sessionId: String,
             @DestinationVariable("pollCode") pollCode: String,
             vote: Vote): CastVote? {
        return try {
            val task = taskSessionService.getTask(pollCode) //throws exception if no task is found for pollcode
            taskSessionService.registerVote(task.id, vote) //Returns castVote
        } catch (e: Exception) {
            null
        }
    }

    @MessageMapping("/{poll}.join")
    @SendTo("/topic/{poll}.joins")
    fun join(@Header("simpSessionId") sessionId: String,
             @DestinationVariable("pollCode") pollCode: String,
             username: String): PlanningTask? {
        return try {
            taskSessionService.getTask(pollCode) //throws exception if no task is found for pollcode
        } catch (e: Exception) {
            null
        }
    }


}