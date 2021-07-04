package com.tericcabrel.hotel.models.dtos;

import com.tericcabrel.hotel.constraints.BirthDate;
import com.tericcabrel.hotel.models.User;
import java.util.Date;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern.Flag;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterUserDto {
  @NotEmpty(message = "The full name is required.")
  @Size(min = 2, max = 100, message = "The length of full name must be between 2 and 100 characters.")
  private String fullName;

  @NotEmpty(message = "The email address is required.")
  @Email(message = "The email address is invalid.", flags = { Flag.CASE_INSENSITIVE })
  private String email;

  @NotNull(message = "The date of birth is required.")
  @BirthDate(message = "The birth date must be greater or equal than 18")
  @Past(message = "The date of birth must be in the past.")
  private Date dateOfBirth;

  @NotEmpty(message = "The gender is required.")
  private String gender;

  @Valid
  @NotNull(message = "The address is required.")
  private AddressDto address;

  public User toUser() {
    return new User()
        .setName(fullName)
        .setEmail(email.toLowerCase())
        .setBirthDate(dateOfBirth)
        .setGender(gender)
        .setAddress(address.toAddress());
  }
}
