package hu.robnn.cody.model.tasks

data class TaskRequest(
        val taskName: String? = null,
        val taskDescription: String? = null,
        val classes: List<Class> = mutableListOf(),
        val tests: List<Test> = mutableListOf()
)

open class Class(val className: String? = null,
                 val classSource: String? = null)

class Test(className: String?,
           classSource: String?,
           val testDescription: String?,
           val methodToCall: String? = null,
           val methodParams: Map<String, Any?>,
           val timingTest: Boolean = false) : Class(className, classSource)