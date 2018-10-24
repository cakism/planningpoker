package im.jens.projectplanner.model

import java.io.Serializable

data class User(val id: Long, val name: String): Serializable
data class UserDTO(val username: String): Serializable