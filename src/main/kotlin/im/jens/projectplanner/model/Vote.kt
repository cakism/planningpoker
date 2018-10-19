package im.jens.projectplanner.model

import java.io.Serializable

data class Vote(val user: User, val points: String): Serializable


//TODO validate input votes to predefined set?
/*
enum class Point(val points: Double) {
    ZERO(0.0), HALF(0.5), ONE(1.0), TWO(2.0), THREE(3.0), FIVE(5.0), EIGHT(8.0), THIRTEEN(13.0);
}*/
