package im.jens.projectplanner.controller

import com.fasterxml.jackson.annotation.JsonCreator
import im.jens.projectplanner.model.*
import im.jens.projectplanner.service.TaskSessionServiceImpl
import im.jens.projectplanner.service.UserSessionServiceImpl
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.*
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class VotingController {

    private val log = LoggerFactory.getLogger(VotingController::class.java)

    @Autowired
    private lateinit var taskSessionService: TaskSessionServiceImpl

    @Autowired
    private lateinit var userSessionService: UserSessionServiceImpl

    @RequestMapping("/create", method = [RequestMethod.POST])
    fun createPoll(@RequestBody newPoll: PlanningTaskDTO): PlanningTask {
        val user = userSessionService.createUser(newPoll.host)
        return taskSessionService.registerNewTask(user, newPoll.pollName, newPoll.pollDescription)
    }

    @RequestMapping("/createuser", method = [RequestMethod.POST])
    fun createUser(@RequestBody username: String): User {
        return userSessionService.createUser(username)
    }


    @MessageMapping("/{pollCode}.vote")
    @SendTo("/topic/{pollCode}.votes")
    fun vote(@Header("simpSessionId") sessionId: String,
             @DestinationVariable("pollCode") pollCode: String,
             @Payload vote: Vote): CastVote? {
        log.info("Received vote from room $pollCode with ${vote.points} from session: $sessionId")
        return try {
            val task = taskSessionService.getTask(pollCode) //throws exception if no task is found for pollcode
            val user = userSessionService.getUser(sessionId) //throws exception if no user if found for sessionid
            taskSessionService.registerVote(task.id, vote, user) //Returns castVote
        } catch (e: Exception) {
            log.error("Error while trying to cast vote: $e")
            null
        }
    }

    @MessageMapping("/{pollCode}.join")
    @SendTo("/topic/{pollCode}.joins")
    fun join(@Header("simpSessionId") sessionId: String,
             @DestinationVariable("pollCode") pollCode: String,
             @Payload username: String): PlanningTask? {
        log.info("User joined with username: $username")
        return try {
            val planningTask = taskSessionService.getTask(pollCode) //throws exception if no task is found for pollcode
            val user = userSessionService.createUser(username)
            userSessionService.connect(sessionId, user)
            planningTask
        } catch (e: NoSuchElementException) {
            log.error("Error while trying to join user to poker room: $e")
            null
        } catch (e: Exception) {
            null
        }
    }


}