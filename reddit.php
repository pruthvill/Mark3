<?php

$clientId = 'tiZwlLAtKfuMzru4RhGRqQ';
$clientSecret = 'pDboIP88BRaLOXFa48FuxmWAVcraVg';
$username = 'pruthvil';
$password = 'bikac.56';

$userAgent = 'web:my_reddit_app:v1.0 (by /u/' . $username . ')';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.reddit.com/api/v1/access_token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
    'grant_type' => 'password',
    'username' => $username,
    'password' => $password,
    'scope' => 'history'
)));
curl_setopt($ch, CURLOPT_USERPWD, $clientId . ':' . $clientSecret);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'User-Agent: ' . $userAgent
));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode != 200) {
    die("Error fetching access token: " . $response);
}

$responseData = json_decode($response, true);
$accessToken = $responseData['access_token'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://oauth.reddit.com/user/' . $username . '/saved');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $accessToken,
    'User-Agent: ' . $userAgent
));

$savedPosts = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode != 200) {
    die("Error fetching saved posts: " . $savedPosts);
}

$savedData = json_decode($savedPosts, true);

?>
