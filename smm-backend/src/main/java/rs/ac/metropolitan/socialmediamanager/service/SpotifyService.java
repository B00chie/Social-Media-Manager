package rs.ac.metropolitan.socialmediamanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Service
public class SpotifyService {

    @Value("${spotify.client.id}")
    private String clientId;

    @Value("${spotify.client.secret}")
    private String clientSecret;

    @Value("${spotify.redirect.uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();

    private String accessToken = null;

    public String getAuthUrl() {
        return "https://accounts.spotify.com/authorize" +
            "?client_id=" + clientId +
            "&response_type=code" +
            "&redirect_uri=" + redirectUri +
            "&scope=user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played";
    }

    public void exchangeCode(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String credentials = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
        headers.set("Authorization", "Basic " + credentials);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", code);
        body.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(
            "https://accounts.spotify.com/api/token", request, Map.class
        );

        if (response.getBody() != null) {
            this.accessToken = (String) response.getBody().get("access_token");
        }
    }

    public Map getCurrentTrack() {
        if (accessToken == null) return Map.of("error", "Not connected");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.spotify.com/v1/me/player/currently-playing",
                HttpMethod.GET, entity, Map.class
            );
            return response.getBody() != null ? response.getBody() : Map.of("playing", false);
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }

    public Map getRecentTracks() {
        if (accessToken == null) return Map.of("error", "Not connected");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.spotify.com/v1/me/player/recently-played?limit=5",
                HttpMethod.GET, entity, Map.class
            );
            return response.getBody() != null ? response.getBody() : Map.of();
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }

    public boolean isConnected() {
        return accessToken != null;
    }
}