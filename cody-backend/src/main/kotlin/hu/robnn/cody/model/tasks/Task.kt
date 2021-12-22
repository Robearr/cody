package hu.robnn.cody.model.tasks

import java.util.*

data class Task(val uuid: String = UUID.randomUUID().toString(),
                val taskName: String? = null,
                val taskDescription: String? = null,
                val taskForLanguages: List<TaskForLanguage> = mutableListOf())