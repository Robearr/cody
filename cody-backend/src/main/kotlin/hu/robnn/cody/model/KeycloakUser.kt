package hu.robnn.cody.model

import io.micronaut.core.annotation.Introspected

@Introspected
data class KeycloakUser(var email: String? = null,
                   var username: String? = null,
                   var roles: List<String> = listOf())