package im.jens.projectplanner.model

import java.io.Serializable
import java.time.LocalDateTime

data class CastVote(
        val user: User, val points: String, val time: LocalDateTime = LocalDateTime.now()

): Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CastVote

        if (user.id != other.user.id) return false

        return true
    }

    override fun hashCode(): Int {
        return user.id.hashCode()
    }
}