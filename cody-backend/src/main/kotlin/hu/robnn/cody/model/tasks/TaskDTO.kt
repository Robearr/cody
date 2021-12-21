package hu.robnn.cody.model.tasks

data class TaskDTO(val taskName: String? = null,
                   val taskDescription: String? = null,
                   val classes: List<Class> = mutableListOf(),)