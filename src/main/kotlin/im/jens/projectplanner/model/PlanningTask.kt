package im.jens.projectplanner.model

import com.fasterxml.jackson.annotation.JsonCreator
import java.io.Serializable

data class PlanningTask(val id: Long, val joinCode: String, val host: User, val pollName: String, val text: String?) : Serializable {
    val votes: MutableList<CastVote> = mutableListOf()
}

data class PlanningTaskDTO @JsonCreator constructor(val host: String, val pollName: String, val text: String?)