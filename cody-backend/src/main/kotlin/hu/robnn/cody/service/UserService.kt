package hu.robnn.cody.service

import hu.robnn.cody.dao.repository.UserRepository
import hu.robnn.cody.mapper.UserMapper
import hu.robnn.cody.model.UserDTO
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Inject
import jakarta.inject.Singleton


@Singleton
class UserService(@Inject private val userRepository: UserRepository,
                  @Inject private val userMapper: UserMapper) {

    fun saveUser(user: UserDTO): UserDTO {
        val username = user.username
        val findUserByUsername = userRepository.findUserByUsername(username!!)
        val map = userMapper.map(user, findUserByUsername)
        userRepository.save(map)
        return user

    }

    fun findUser(username: String?): UserDTO? {
        if (username == null) {
            return null
        }
        val findUserByUsername = userRepository.findUserByUsername(username) ?: return null
        return userMapper.map(findUserByUsername)
    }

    fun listUsers(pageable: Pageable): Page<UserDTO> {
        return userRepository.findAll(pageable).map { userMapper.map(it) }
    }
}