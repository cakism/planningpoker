package im.jens.projectplanner.service

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.User
import im.jens.projectplanner.model.Vote

interface TaskSessionService {

    fun registerNewTask(host: User, pollName: String, text: String?): PlanningTask

    fun getAllVotes(taskId: Long): Collection<CastVote>

    fun registerVote(taskId: Long, vote: Vote, user: User): CastVote

    fun getTask(joinCode: String): PlanningTask
}