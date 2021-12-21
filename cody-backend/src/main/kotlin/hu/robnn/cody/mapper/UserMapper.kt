package hu.robnn.cody.mapper

import hu.robnn.cody.dao.model.DBUser
import hu.robnn.cody.model.UserDTO
import jakarta.inject.Singleton
import java.util.*

@Singleton
class UserMapper {
    fun map(user: UserDTO, target: DBUser?): DBUser {
        val realTarget = target ?: DBUser()
        realTarget.uuid = user.uuid.toString()
        realTarget.username = user.username
        realTarget.fullName = user.fullName
        realTarget.email = user.email
        return realTarget
    }

    fun map(user: DBUser): UserDTO {
        return UserDTO(UUID.fromString(user.uuid), user.email, user.username, user.fullName)
    }
}