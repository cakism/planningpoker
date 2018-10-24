package im.jens.projectplanner.service

import im.jens.projectplanner.model.CastVote
import im.jens.projectplanner.model.PlanningTask
import im.jens.projectplanner.model.User

interface TaskSessionService {

    fun registerNewTask(host: User, pollName: String, text: String?): PlanningTask

    fun registerVote(taskId: Long, vote: String, user: User): Set<CastVote>?

    fun getTask(joinCode: String): PlanningTask
}