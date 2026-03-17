<?php

// Set CORS headers for preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}

// Set CORS headers for actual POST request
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

// Handle login endpoint -> ask-login-user.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if email and password are provided
    if (!empty($data->email) && !empty($data->password)) {

        $authToken = $response->checkIfUserCredentialsIsValid($data->email, $data->password);

        if ($authToken) {


            $userData = $response->ReadUser($data->email);

            // User authentication successful, return authentication token
            http_response_code(200);
            echo json_encode(array("status" => true, "message" => "Login successful.", "token" => $authToken, "userData" => $userData));
        } else {
            // User authentication failed
            http_response_code(400);
            echo json_encode(array(
                "status" => false,
                "message" => "You entered an invalid email or password.",

            ));
        }
    } else {
        // Incomplete login data provided
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Login data is incomplete."));
    }
}
