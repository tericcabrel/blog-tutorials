package com.soccer.mongo.listeners;

import com.soccer.mongo.models.Team;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MongoListener extends AbstractMongoEventListener<Team> {
  @Override
  public void onBeforeConvert(BeforeConvertEvent<Team> event) {
    super.onBeforeConvert(event);

    Date dateNow = new Date();

    event.getSource().setCreatedAt(dateNow);
    event.getSource().setUpdatedAt(dateNow);
  }
}
