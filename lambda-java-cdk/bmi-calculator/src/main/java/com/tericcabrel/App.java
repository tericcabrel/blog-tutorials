package com.tericcabrel;

import java.util.HashMap;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class App implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    static Logger logger = LoggerFactory.getLogger(App.class);

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent input, final Context context) {
        Map<String, String> responseHeaders = new HashMap<>();
        responseHeaders.put("Content-Type", "application/json");

        logger.info(input.getBody());

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(responseHeaders);

        String output = String.format("{ \"message\": \"hello world\" }");

        return response
            .withStatusCode(200)
            .withBody(output);
    }
}
