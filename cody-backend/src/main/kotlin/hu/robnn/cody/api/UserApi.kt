package hu.robnn.cody.api

import hu.robnn.cody.model.Response
import hu.robnn.cody.model.UserDTO
import hu.robnn.cody.service.UserService
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.http.HttpResponse
import io.micronaut.http.MutableHttpResponse
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Post
import io.micronaut.scheduling.TaskExecutors
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import jakarta.inject.Named
import org.reactivestreams.Publisher
import reactor.core.publisher.Mono
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers
import java.util.concurrent.ExecutorService


@Controller("/user")
@Secured(SecurityRule.IS_AUTHENTICATED)
class UserApi(private val userService: UserService,
              @Named(TaskExecutors.IO) executorService: ExecutorService) {

    private val scheduler: Scheduler

    init {
        scheduler = Schedulers.fromExecutorService(executorService)
    }

    @Post("/listUsers")
    @Secured("admin")
    fun listUsers(pageable: Pageable): Publisher<MutableHttpResponse<Response<Page<UserDTO>>>> {
        return Mono.fromCallable {
            val listUsers = userService.listUsers(pageable)
            HttpResponse.ok(Response(response = listUsers))
        }.subscribeOn(scheduler)
    }

    @Get("/{username}")
    fun getUser(@PathVariable("username") username: String): Publisher<MutableHttpResponse<Response<UserDTO>>> {
        return Mono.fromCallable {
            val user = userService.findUser(username)
            if (user == null) {
                HttpResponse.notFound()
            } else {
                HttpResponse.ok(Response(response = user))
            }
        }.subscribeOn(scheduler)
    }
}