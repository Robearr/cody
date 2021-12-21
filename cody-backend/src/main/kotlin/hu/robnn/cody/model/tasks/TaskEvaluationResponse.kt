package hu.robnn.cody.model.tasks

data class TaskEvaluationResponse(val compilerResultOutput: String? = null,
                                  val compilerResultError: String? = null,
                                  val evaluations: List<Evaluation> = mutableListOf())

data class Evaluation(val testName: String? = null,
                      val testDescription: String? = null,
                      val evaluationIsOk: Boolean = true,
                      val evaluationOutput: String? = null,
                      val evaluationForTiming: Boolean = false,
                      val evaluationTime: Long? = null)