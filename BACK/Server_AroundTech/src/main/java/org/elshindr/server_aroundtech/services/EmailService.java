package org.elshindr.server_aroundtech.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

        @Autowired
        private final JavaMailSender emailSender;
        private final TemplateEngine templateEngine;

        @Autowired
        public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
                this.emailSender = mailSender;
                this.templateEngine = templateEngine;
        }

        public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
                MimeMessage mimeMessage = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

                try {
                        helper.setTo(to);
                        helper.setSubject(subject);
                        String htmlContent = templateEngine.process(templateName, context);
                        helper.setText(htmlContent, true);
                        emailSender.send(mimeMessage);
                } catch (MessagingException e) {
                        // Handle exception
                        System.out.println(e.getCause());
                }
        }
}
