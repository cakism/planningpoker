package im.jens.projectplanner.model

import java.io.Serializable
import java.time.LocalDateTime

data class CastVote(
        val from: User, val points: String, val time: LocalDateTime = LocalDateTime.now()
): Serializable