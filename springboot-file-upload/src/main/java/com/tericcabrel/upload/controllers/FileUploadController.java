package com.tericcabrel.upload.controllers;

import com.tericcabrel.upload.responses.UploadResponse;
import com.tericcabrel.upload.services.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {

  private final FileStorageService fileStorageService;

  public FileUploadController(FileStorageService fileStorageService) {
    this.fileStorageService = fileStorageService;
  }

  @PostMapping("/upload")
  public ResponseEntity<UploadResponse> uploadFile(
      @RequestParam(name = "file", required = false) MultipartFile file,
      @RequestParam("fullName") String fullName,
      @RequestParam("dateOfBirth") String dateOfBirth
  ) {
      String fileName = fileStorageService.storeFile(file);

      UploadResponse uploadResponse = new UploadResponse(fileName, fullName, dateOfBirth);

      return ResponseEntity.ok().body(uploadResponse);
  }
}
