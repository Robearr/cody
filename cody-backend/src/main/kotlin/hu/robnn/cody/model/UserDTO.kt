package hu.robnn.cody.model

import java.util.*

data class UserDTO(val uuid: UUID = UUID.randomUUID(),
                   val email: String? = null,
                   val username: String? = null,
                   val fullName: String? = null)