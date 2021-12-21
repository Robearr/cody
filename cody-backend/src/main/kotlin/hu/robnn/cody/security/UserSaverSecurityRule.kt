package hu.robnn.cody.security

import hu.robnn.cody.model.UserDTO
import hu.robnn.cody.service.UserService
import io.micronaut.http.HttpRequest
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecuredAnnotationRule
import io.micronaut.security.rules.SecurityRuleResult
import io.micronaut.security.token.RolesFinder
import io.micronaut.web.router.RouteMatch
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.reactivestreams.Publisher
import reactor.core.publisher.Mono

/**
 * Persists the user from the JWT token if the User is not present, and the token validation, and Secured annotation
 * validation is ok.
 */
@Singleton
class UserSaverSecurityRule(rolesFinder: RolesFinder) : SecuredAnnotationRule(rolesFinder) {

    companion object {
        private val ORDER = SecuredAnnotationRule.ORDER - 100
    }

    @Inject
    lateinit var userService: UserService

    override fun check(request: HttpRequest<*>?, routeMatch: RouteMatch<*>?,
                       authentication: Authentication?): Publisher<SecurityRuleResult> {
        val check = super.check(request, routeMatch, authentication)
        Mono.from(check).subscribe {
            if (it == SecurityRuleResult.ALLOWED) {
                val username = authentication?.attributes?.get("username") as String?
                val email = authentication?.attributes?.get("email") as String?
                val fullName = authentication?.attributes?.get("name") as String?
                val findUser = userService.findUser(username)
                if (findUser == null && username != null) {
                    userService.saveUser(UserDTO(email = email, username = username, fullName = fullName))
                }
            }
        }

        return check
    }

    override fun getOrder(): Int {
        return ORDER
    }
}