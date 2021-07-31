package com.tericcabrel.mail.controllers;

import com.tericcabrel.mail.models.User;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@RestController
public class UserController {
  private static final String TEMPLATE_NAME = "registration";
  private static final String SPRING_LOGO_IMAGE = "templates/images/spring.png";
  private static final String PNG_MIME = "image/png";
  private static final String MAIL_SUBJECT = "Registration Confirmation";

  private final Environment environment;

  private final JavaMailSender mailSender;

  private final TemplateEngine htmlTemplateEngine;

  public UserController(Environment environment, JavaMailSender mailSender, TemplateEngine htmlTemplateEngine) {
    this.environment = environment;
    this.mailSender = mailSender;
    this.htmlTemplateEngine = htmlTemplateEngine;
  }

  @PostMapping("/register")
  public ResponseEntity<Object> register(@RequestBody User user)
      throws MessagingException, UnsupportedEncodingException {

    // TODO save user in the database here

    String confirmationUrl = "generated_confirmation_url";
    String mailFrom = environment.getProperty("spring.mail.properties.mail.smtp.from");
    String mailFromName = environment.getProperty("mail.from.name", "Identity");

    final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
    final MimeMessageHelper email;
    email = new MimeMessageHelper(mimeMessage, true, "UTF-8");

    email.setTo(user.getEmail());
    email.setSubject(MAIL_SUBJECT);
    email.setFrom(new InternetAddress(mailFrom, mailFromName));

    final Context ctx = new Context(LocaleContextHolder.getLocale());
    ctx.setVariable("email", user.getEmail());
    ctx.setVariable("name", user.getName());
    ctx.setVariable("springLogo", SPRING_LOGO_IMAGE);
    ctx.setVariable("url", confirmationUrl);

    final String htmlContent = this.htmlTemplateEngine.process(TEMPLATE_NAME, ctx);

    email.setText(htmlContent, true);

    ClassPathResource clr = new ClassPathResource(SPRING_LOGO_IMAGE);

    email.addInline("springLogo", clr, PNG_MIME);

    mailSender.send(mimeMessage);

    Map<String, String> body = new HashMap<>();
    body.put("message", "User created successfully.");

    return new ResponseEntity<>(body, HttpStatus.OK);
  }
}
