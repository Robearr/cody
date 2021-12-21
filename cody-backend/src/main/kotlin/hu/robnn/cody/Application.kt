package hu.robnn.cody

import io.micronaut.runtime.Micronaut.*
fun main(args: Array<String>) {
	build()
	    .args(*args)
		.packages("hu.robnn")
		.start()
}

