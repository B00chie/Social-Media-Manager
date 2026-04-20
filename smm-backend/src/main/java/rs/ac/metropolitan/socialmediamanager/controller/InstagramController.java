package rs.ac.metropolitan.socialmediamanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import rs.ac.metropolitan.socialmediamanager.service.InstagramService;

import java.util.Map;

@RestController
@RequestMapping("/api/instagram")
@CrossOrigin(origins = "http://localhost:5173")
public class InstagramController {

    @Autowired
    private InstagramService instagramService;

    @GetMapping("/profile")
    public ResponseEntity<Map> getProfile() {
        return ResponseEntity.ok(instagramService.getProfile());
    }

    @GetMapping("/media")
    public ResponseEntity<Map> getMedia() {
        return ResponseEntity.ok(instagramService.getMedia());
    }

    @GetMapping("/notifications")
    public ResponseEntity<Map> getNotifications() {
        return ResponseEntity.ok(instagramService.getNotifications());
}
}