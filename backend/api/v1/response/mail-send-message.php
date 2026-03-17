<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';

// dotenv
require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
// dotenv

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Token validation
// require_once 'tmf-auth-validate-token.php';
// validateToken();

// Read JSON POST input
$input = json_decode(file_get_contents("php://input"), true);

// $input = [
//     "sender_id" => 1,
//     "receiver_id" => 1,
//     "message" => "Hello, this is a test message",
//     "subject" => "Test Message",
//     "delivery_type"=> "unicast"
// ];

//Broadcast to a Ward
// $input = [
//     "sender_id" => 1,
//     "message" => "Hello, this is a Ward broadcast message",
//     "subject" => "Ward Message",
//     "delivery_type"=> "multicast", //"unicast" ,//"brodcast"
//     "targets"      => [
//         "ward_id" => 1100  // Replace with the ID of the ward you want to target
//     ]
// ];

// //Broadcast to an LGA
// $input = [
//     "sender_id" => 1,
//     "message" => "LGA broadcast message",
//     "subject" => "LGA Update",
//     "delivery_type"=> "multicast",
//     "targets" => [
//         "lga_id" => 473  // The ID of the LGA
//     ]
// ];

// //Broadcast to a State
// $input = [
//     "sender_id" => 1,
//     "message" => "State broadcast message",
//     "subject" => "State Update",
//     "delivery_type"=> "multicast",
//     "targets" => [
//         "state_id" => 7  // The ID of the state
//     ]
// ];

// //Broadcast to a Zone
// $input = [
//     "sender_id" => 1,
//     "message" => "Zone broadcast message",
//     "subject" => "Zone Update",
//     "delivery_type"=> "multicast",
//     "targets" => [
//         "zone_id" => 1  // The ID of the zone
//     ]
// ];




// VALIDATION
if (!isset($input['sender_id']) || empty($input['sender_id'])) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "sender_id is required"
    ]);
    exit();
}

if (!isset($input['message']) || empty(trim($input['message']))) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "message is required"
    ]);
    exit();
}

$sender_type = $input['sender_type'];

// INSERT MESSAGE
$result = $response->createMessage(
    $input['sender_id'],               // sender_id
    $input['sender_type'] ?? 'user',   // sender_type
    $input['receiver_id'] ?? null,     // receiver_id
    $input['receiver_type'] ?? null,   // receiver_type
    $input['message'],                 // message
    $input['delivery_type'] ?? 'unicast', // delivery_type
    $input['subject'] ?? null           // subject
);


// INVALID USER
if ($result === "INVALID_USER") {
    http_response_code(404);
    echo json_encode([
        "status" => false,
        "message" => "User not found"
    ]);
    exit();
}

// SUCCESSFUL INSERT
if (is_array($result) && $result["status"] === true) {
    http_response_code(201);
    echo json_encode([
        "status" => true,
        "message" => "Message sent successfully",
        "message_id" => $result["message_id"]
    ]);
    exit();
}

// FAILED INSERT
http_response_code(500);
echo json_encode([
    "status" => false,
    "message" => "Failed to send message"
]);
exit();
?>
