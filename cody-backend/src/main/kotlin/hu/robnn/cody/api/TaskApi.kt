package hu.robnn.cody.api

import hu.robnn.cody.model.Response
import hu.robnn.cody.model.UserDTO
import hu.robnn.cody.model.tasks.Solution
import hu.robnn.cody.model.tasks.TaskDTO
import hu.robnn.cody.model.tasks.TaskRequest
import hu.robnn.cody.model.tasks.TaskEvaluationResponse
import hu.robnn.cody.service.TaskService
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.http.HttpResponse
import io.micronaut.http.MutableHttpResponse
import io.micronaut.http.annotation.Controller
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

@Controller("/task")
@Secured(SecurityRule.IS_AUTHENTICATED)
class TaskApi(private val taskService: TaskService,
              @Named(TaskExecutors.IO) executorService: ExecutorService) {

    private val scheduler: Scheduler

    init {
        scheduler = Schedulers.fromExecutorService(executorService)
    }

    @Post
    @Secured("admin")
    fun createTask(taskRequest: TaskRequest): Publisher<MutableHttpResponse<Response<Any>>> {
        return Mono.fromCallable<MutableHttpResponse<Response<Any>>> {
            taskService.createTask(taskRequest)
            HttpResponse.created(Response())
        }.subscribeOn(scheduler)
    }

    @Post("/listTasks")
    fun listTasks(pageable: Pageable): Publisher<MutableHttpResponse<Response<Page<TaskDTO>>>> {
        return Mono.fromCallable {
            val listTasks = taskService.listTasks(pageable)
            HttpResponse.ok(Response(response = listTasks))
        }.subscribeOn(scheduler)
    }

    @Post("/solution")
    fun postSolution(solution: Solution): Publisher<MutableHttpResponse<Response<TaskEvaluationResponse>>> {
        return Mono.fromCallable {
            val evaluationResult = taskService.evaluateSolution(solution)
            HttpResponse.ok(Response(response = evaluationResult))
        }.subscribeOn(scheduler)
    }
}