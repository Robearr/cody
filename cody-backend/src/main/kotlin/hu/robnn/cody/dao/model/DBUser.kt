package hu.robnn.cody.dao.model

import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import jakarta.persistence.Column
import javax.validation.constraints.NotNull

@MappedEntity("cd_users")
class DBUser {
    @Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    var id: Long? = null

    var uuid: String? = null

    @Column(name = "full_name")
    var fullName: String? = null

    var email: String? = null

    @NotNull
    var username: String? = null
}