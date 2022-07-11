package com.tericcabrel.springbootcaching.configs;

import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@EnableRedisRepositories(value = "com.tericcabrel.springbootcaching.repositories")
public class RedisConfiguration {
    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        RedisProperties properties = redisProperties();
        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();

        configuration.setHostName(properties.getHost());
        configuration.setPort(properties.getPort());

        return new LettuceConnectionFactory(configuration);
    }

    @Bean
    public RedisTemplate<byte[], byte[]> redisTemplate() {
        RedisTemplate<byte[], byte[]> template = new RedisTemplate<>();

        template.setConnectionFactory(redisConnectionFactory());

        return template;
    }

    @Bean
    @Primary
    public RedisProperties redisProperties() {
        return new RedisProperties();
    }
}
