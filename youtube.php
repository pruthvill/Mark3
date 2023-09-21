<?php

$playlistId = 'PL4A-P6Ov1Tu35O0cLw1GrPniRxqLLK1oE';
$apiKey = 'AIzaSyAdTIS9SxB_LEVDbI0b_Z0QwV3w5K9uXUk';
$maxResults = 50;

$api_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults={$maxResults}&playlistId={$playlistId}&key={$apiKey}";
$playlist_json = file_get_contents($api_url);

if ($playlist_json === false) {
    die('Failed to fetch playlist data from the API.');
}

$playlist_data = json_decode($playlist_json, true);

if (!$playlist_data || !isset($playlist_data['items'])) {
    die('No valid data found in the playlist API response.');
}

$videoIds = [];
foreach ($playlist_data['items'] as $item) {
    $videoIds[] = $item['snippet']['resourceId']['videoId'];
}
$videoIdsString = implode(',', $videoIds);

$videos_api_url = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id={$videoIdsString}&key={$apiKey}";
$videos_json = file_get_contents($videos_api_url);

if ($videos_json === false) {
    die('Failed to fetch video data from the API.');
}

$videos_data = json_decode($videos_json, true);

if (!$videos_data || !isset($videos_data['items'])) {
    die('No valid data found in the videos API response.');
}

$videoDetails = [];
foreach ($videos_data['items'] as $video) {
    $videoDetails[$video['id']] = $video;
}

// Now you can use $videoDetails to work with the video data.
?>
