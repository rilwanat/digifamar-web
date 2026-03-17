<?php

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}

// CORS + JSON headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Validate and get farmer ID from URL param
    $farmer_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($farmer_id <= 0) {
        http_response_code(400);
        echo json_encode([
            "status" => false,
            "message" => "Invalid or missing farmer ID."
        ]);
        exit();
    }

    try {
        $result = $response->ReadFarmerById($farmer_id);

        if ($result && count($result) > 0) {
            http_response_code(200);
            echo json_encode([
                "status" => true,
                "data" => $result
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => false,
                "message" => "Farmer not found."
            ]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => false,
            "message" => "Server error: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => false, "message" => "Method not allowed."]);
}

?>
