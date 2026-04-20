package rs.ac.metropolitan.socialmediamanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class InstagramService {

    @Value("${instagram.access.token}")
    private String accessToken;

    @Value("${instagram.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map getProfile() {
        String url = apiUrl + "/me?fields=id,username,account_type,media_count&access_token=" + accessToken;
        return restTemplate.getForObject(url, Map.class);
    }

    public Map getMedia() {
        String url = apiUrl + "/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count&access_token=" + accessToken;
        return restTemplate.getForObject(url, Map.class);
    }

    public Map getNotifications() {
        String mediaUrl = apiUrl + "/me/media?fields=id,timestamp,like_count,comments_count,comments{text,timestamp,username}&access_token=" + accessToken;
        return restTemplate.getForObject(mediaUrl, Map.class);
    }
}