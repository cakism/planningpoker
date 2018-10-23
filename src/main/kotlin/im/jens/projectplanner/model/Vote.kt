package im.jens.projectplanner.model

import com.fasterxml.jackson.annotation.JsonCreator
import java.io.Serializable

data class Vote (val points: String): Serializable

