package com.soccer.mongo.models;

import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "players")
@Accessors(chain = true)
@NoArgsConstructor
@Data
public class Player {
  @MongoId(FieldType.OBJECT_ID)
  private String id;

  @Indexed
  private String name;

  private Date birthDate;

  @Indexed
  @Field(targetType = FieldType.STRING)
  private PlayerPosition position;

  private Date contractEndDate;

  private Date createdAt;

  private Date updatedAt;
}
