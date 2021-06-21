package com.tericcabrel.hotel.models.dtos;

import com.tericcabrel.hotel.models.Address;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Pattern.Flag;
import lombok.Data;

@Data
public class AddressDto {
  @NotBlank(message = "The country is required.")
  private String country;

  @NotBlank(message = "The city is required.")
  private String city;

  @NotBlank(message = "The Zip code is required.")
  @Pattern(regexp = "^\\d{1,5}$", flags = { Flag.CASE_INSENSITIVE, Flag.MULTILINE }, message = "The Zip code is invalid.")
  private String zipCode;

  @NotBlank(message = "The street name is required.")
  private String street;

  private String state;

  public Address toAddress() {
    return new Address()
        .setCountry(country)
        .setCity(city)
        .setZipCode(zipCode)
        .setStreet(street)
        .setState(state);
  }
}
