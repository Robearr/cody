package hu.robnn.cody.http

import hu.robnn.cody.model.KeycloakUser
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import io.micronaut.http.client.annotation.Client
import io.micronaut.http.client.multipart.MultipartBody
import org.reactivestreams.Publisher


@Header(name = "User-Agent", value = "cody-backend")
@Client("keycloak")
interface KeycloakApiHttpClient {
    /**
     * curl -v --data "client_secret=YOUR_SECRET9&client_id=product-
    app&username=user&token=YOUR_TOKEN"
    http://localhost:8080/auth/realms/springdemo/protocol/openid-
    connect/token/introspect
     */
    @Post("/auth/realms/Alma/protocol/openid-connect/token/introspect", produces = [MediaType.APPLICATION_FORM_URLENCODED])
    fun getUser(client_id: String,
                client_secret: String,
                token: String): Publisher<KeycloakUser>

}