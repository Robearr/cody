package hu.robnn.cody.model.tasks

import java.util.*

class Solution(val uuid: String = UUID.randomUUID().toString(),
               val username: String? = null,
               val taskName: String? = null,
               val taskUuid: String? = null,
               val solutionClasses: List<Class> = mutableListOf())