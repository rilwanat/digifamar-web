<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();

$response = new Response($db);

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Read input
$input = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($input['user_id']) || empty(trim($input['user_id']))) {
    http_response_code(400);
    echo json_encode([
        "status"  => false,
        "message" => "user_id is required"
    ]);
    exit();
}

$user_id = $input['user_id'];
$user_type = $input['user_type'];

// Fetch grouped messages
$result = $response->getMessages($user_id, $user_type);

// User not found
if ($result === "INVALID_USER") {
    http_response_code(404);
    echo json_encode([
        "status"  => false,
        "message" => "User not found"
    ]);
    exit();
}

// DB or query failure
if (!is_array($result)) {
    http_response_code(500);
    echo json_encode([
        "status"  => false,
        "message" => "Error fetching messages"
    ]);
    exit();
}

// Respond success
http_response_code(200);
echo json_encode([
    "status"  => true,
    "message" => "Success",
    "data"    => [
        "inbox"        => $result["inbox"] ?? [],
        "sent"         => $result["sent"] ?? [],
        "all"          => $result["all"] ?? [],
        "count_inbox"  => $result["count_inbox"] ?? 0,
        "count_sent"   => $result["count_sent"] ?? 0,
        "count_all"    => $result["count_all"] ?? 0
    ]
]);
?>
