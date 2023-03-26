package com.tericcabrel.consumer.dtos;

public record UserRegisteredPayload (String fullName, String emailAddress, int confirmationCode) {

}
