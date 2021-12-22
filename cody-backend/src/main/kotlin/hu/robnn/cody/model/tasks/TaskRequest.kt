package hu.robnn.cody.model.tasks

data class TaskRequest(
        val taskName: String? = null,
        val taskDescription: String? = null,
        val taskForLanguages: List<TaskForLanguage> = mutableListOf())

data class TaskForLanguage(val language: ProgrammingLanguage? = null,
                           val classes: List<Class> = mutableListOf(),
                           val tests: List<Test> = mutableListOf())

enum class ProgrammingLanguage {
    JAVA,
    KOTLIN,
    JAVASCRIPT,
}


open class Class(val className: String? = null,
                 val classSource: String? = null)

class Test(className: String?,
           classSource: String?,
           val testDescription: String?,
           val methodToCall: String? = null,
           val methodParams: Map<String, Any?> = mutableMapOf(),
           val timingTest: Boolean = false) : Class(className, classSource)