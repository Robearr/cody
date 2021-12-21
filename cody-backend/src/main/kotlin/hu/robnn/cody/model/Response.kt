package hu.robnn.cody.model

class Message(val code: String? = null,
              val translated: String? = null)

class Response<RESPONSE_TYPE>(val messages: List<Message> = mutableListOf(),
                              val response: RESPONSE_TYPE? = null)