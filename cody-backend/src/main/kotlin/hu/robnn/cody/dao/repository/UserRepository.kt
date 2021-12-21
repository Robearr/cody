package hu.robnn.cody.dao.repository

import hu.robnn.cody.dao.model.DBUser
import io.micronaut.data.annotation.Query
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository

@JdbcRepository(dialect = Dialect.H2)
interface UserRepository : PageableRepository<DBUser, Long> {

    @Query("SELECT * FROM cd_users WHERE username = :username LIMIT 1", nativeQuery = true)
    fun findUserByUsername(username: String): DBUser?
}