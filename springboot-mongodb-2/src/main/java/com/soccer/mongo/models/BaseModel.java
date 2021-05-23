package com.soccer.mongo.models;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Setter
@Getter
public abstract class BaseModel {
  @MongoId(FieldType.OBJECT_ID)
  protected String id;

  protected Date createdAt;

  protected Date updatedAt;
}
