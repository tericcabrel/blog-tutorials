package com.tericcabrel.upload.responses;

public class UploadResponse {
  private final String fileName;
  private final String fullName;
  private final String dateOfBirth;

  public UploadResponse(String fileName, String fullName, String dateOfBirth) {
    this.fileName = fileName;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
  }

  public String getDateOfBirth() {
    return dateOfBirth;
  }

  public String getFileName() {
    return fileName;
  }

  public String getFullName() {
    return fullName;
  }
}
