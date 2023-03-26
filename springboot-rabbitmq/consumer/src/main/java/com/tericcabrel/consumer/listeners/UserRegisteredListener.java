package com.tericcabrel.consumer.listeners;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tericcabrel.consumer.dtos.UserRegisteredPayload;
import org.springframework.stereotype.Component;

@Component
public class UserRegisteredListener {
    public void onMessageReceived(String message) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        TypeReference<UserRegisteredPayload> mapType = new TypeReference<>() {};
        UserRegisteredPayload payload = objectMapper.readValue(message, mapType);

        System.out.println("Message received");
        System.out.println("User full name:    " + payload.fullName());
        System.out.println("Email Address:     " + payload.emailAddress());
        System.out.println("Confirmation code: " + payload.confirmationCode());

        // TODO send an email using the data
    }
}
