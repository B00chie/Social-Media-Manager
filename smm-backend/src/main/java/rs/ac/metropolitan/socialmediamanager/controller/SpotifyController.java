package rs.ac.metropolitan.socialmediamanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.metropolitan.socialmediamanager.service.SpotifyService;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/spotify")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class SpotifyController {

    @Autowired
    private SpotifyService spotifyService;

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect(spotifyService.getAuthUrl());
    }

    @GetMapping("/callback")
    public void callback(@RequestParam String code, HttpServletResponse response) throws IOException {
        spotifyService.exchangeCode(code);
        response.sendRedirect("http://localhost:5173/dashboard");
    }

    @GetMapping("/current-track")
    public ResponseEntity<Map> getCurrentTrack() {
        return ResponseEntity.ok(spotifyService.getCurrentTrack());
    }

    @GetMapping("/recent-tracks")
    public ResponseEntity<Map> getRecentTracks() {
        return ResponseEntity.ok(spotifyService.getRecentTracks());
    }

    @GetMapping("/status")
    public ResponseEntity<Map> getStatus() {
        return ResponseEntity.ok(Map.of("connected", spotifyService.isConnected()));
    }
}