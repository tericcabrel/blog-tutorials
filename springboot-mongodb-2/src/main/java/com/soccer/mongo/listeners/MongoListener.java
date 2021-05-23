package com.soccer.mongo.listeners;

import com.soccer.mongo.models.BaseModel;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MongoListener extends AbstractMongoEventListener<BaseModel> {
  @Override
  public void onBeforeConvert(BeforeConvertEvent<BaseModel> event) {
    super.onBeforeConvert(event);

    Date dateNow = new Date();

    event.getSource().setCreatedAt(dateNow);
    event.getSource().setUpdatedAt(dateNow);
  }
}
