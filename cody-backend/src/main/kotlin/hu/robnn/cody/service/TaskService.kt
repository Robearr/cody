package hu.robnn.cody.service

import hu.robnn.cody.model.tasks.*
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import kotlin.random.Random

@Singleton
class TaskService {
    companion object {
        //TODO csak hogy legyen teszt output
        private val mapOfTasks = mutableMapOf<String, TaskRequest>()
        private val debugExceptions = mutableListOf("""
            Exception in thread "main" java.lang.NoClassDefFoundError: graphics/shapes/Square
                at Main.main(Main.java:7)
            Caused by: java.lang.ClassNotFoundException: graphics.shapes.Square
                at java.net.URLClassLoader{'$'}1.run(URLClassLoader.java:366)
                at java.net.URLClassLoader{'$'}1.run(URLClassLoader.java:355)
                at java.security.AccessController.doPrivileged(Native Method)
                at java.net.URLClassLoader.findClass(URLClassLoader.java:354)
                at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
                at sun.misc.Launcher.AppClassLoader.loadClass(Launcher.java:308)
                at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
                ... 1 more
        """.trimIndent(),
        """
            java.lang.RuntimeException: 
              at android.app.ActivityThread.performLaunchActivity (ActivityThread.java:2984)
              at android.app.ActivityThread.handleLaunchActivity (ActivityThread.java:3045)
              at android.app.ActivityThread.handleRelaunchActivity 
            (ActivityThread.java:4978)
              at android.app.ActivityThread.-wrap21 (ActivityThread.java)
              at android.app.ActivityThreadH.handleMessage (ActivityThread.java:1648)
              at android.os.Handler.dispatchMessage (Handler.java:102)
              at android.os.Looper.loop (Looper.java:154)
              at android.app.ActivityThread.main (ActivityThread.java:6781)
              at java.lang.reflect.Method.invoke (Native Method)
              at com.android.internal.os.ZygoteInit.MethodAndArgsCaller.run 
            (ZygoteInit.java:1520)
              at com.android.internal.os.ZygoteInit.main (ZygoteInit.java:1410)
        """.trimIndent())
        private val debugOutput = mutableListOf("""
            Hello world!
        """.trimIndent(),
        """
            2 + 2 = 4
        """.trimIndent())
        private val debugCompilationOutput = mutableListOf("""
            Compiled successfully
        """.trimIndent())
        private val debugCompilationError = mutableListOf("""
            prog.java:14: error: cannot find symbol
                        + sum);
                          ^
              symbol:   variable sum
              location: class MisspelledVar
            1 error
        """.trimIndent(),
        """
            prog.java:8: error: ';' expected
                    System.out.println("Welcome to " + s)
                                                         ^
            1 error
        """.trimIndent())
    }

    fun createTask(taskRequest: TaskRequest) {
        //TODO
        if (taskRequest.taskName == null) {
            return
        }
        mapOfTasks[taskRequest.taskName] = taskRequest
        return
    }

    fun listTasks(pageable: Pageable): Page<TaskDTO> {
        //TODO
        return Page.of(mapOfTasks.values.map { TaskDTO(it.taskName, it.taskDescription, it.classes) }, pageable,
                mapOfTasks.size.toLong())
    }

    fun evaluateSolution(solution: Solution): TaskEvaluationResponse {
        if (solution.taskName == null) {
            return TaskEvaluationResponse()
        }
        val taskRequest = mapOfTasks[solution.taskName] ?: return TaskEvaluationResponse()
        val isErroneousCompile = Random.nextBoolean()
        return if (isErroneousCompile)  {
            TaskEvaluationResponse(null, debugCompilationError[(0 until debugCompilationError.size).random()])
        } else {
            val isOkEvaluation = Random.nextBoolean()
            val test = taskRequest.tests.firstOrNull()
            if (!isOkEvaluation) {
                TaskEvaluationResponse(debugCompilationOutput[(0 until debugCompilationOutput.size).random()],
                        null, mutableListOf(Evaluation(test?.className ?: "RandomTest", test?.testDescription,
                        isOkEvaluation, debugExceptions[(0 until debugExceptions.size).random()])))
            } else {
                TaskEvaluationResponse(debugCompilationOutput[(0 until debugCompilationOutput.size).random()],
                        null, mutableListOf(Evaluation(test?.className ?: "RandomTest", test?.testDescription,
                        isOkEvaluation, debugOutput[(0 until debugOutput.size).random()])))
            }
        }
    }
}