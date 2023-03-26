package com.tericcabrel.consumer.configs;

import com.tericcabrel.consumer.listeners.UserRegisteredListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class RabbitMQConfig {
    @Bean
    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory, MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();

        container.setConnectionFactory(connectionFactory);
        container.setMessageListener(listenerAdapter);

        container.setQueueNames("user-registration");

        return container;
    }

    @Bean
    MessageListenerAdapter listenerAdapter(UserRegisteredListener listener) {
        return new MessageListenerAdapter(listener, "onMessageReceived");
    }
}
