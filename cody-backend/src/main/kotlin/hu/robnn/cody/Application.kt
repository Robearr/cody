package hu.robnn.cody

import io.micronaut.runtime.Micronaut.*
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info

@OpenAPIDefinition(
		info = Info(
				title = "Cody backend application",
				version = "0.1",
				description = "Cody API"
		)
)
object Application {

	@JvmStatic
	fun main(args: Array<String>) {
		build()
				.args(*args)
				.packages("hu.robnn")
				.start()
	}
}


