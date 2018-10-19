package im.jens.projectplanner.model

import java.io.Serializable

data class PlanningTask(val id: Long, val joinCode: String, val host: User, val pollName: String, val text: String?) : Serializable {
    val votes: MutableList<CastVote> = mutableListOf()
}