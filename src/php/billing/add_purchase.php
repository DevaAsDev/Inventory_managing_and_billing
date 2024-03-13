<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$server = 'localhost';
$username = 'id21857504_inventorymanager';
$password = 'Inventory1234@';
$dbname = 'id21857504_inventory';

$conn = mysqli_connect($server, $username, $password, $dbname);

if (!$conn) {
    $response = ['error' => 'Unable to connect to the database'];
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate and sanitize the data (replace this with your validation logic)
        $item = isset($data['item']) ? mysqli_real_escape_string($conn, $data['item']) : null;
        $stock = isset($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;
        $id = isset($data['id']) ? mysqli_real_escape_string($conn, $data['id']) : null;

    } else {
        $response = ['error' => 'Invalid request method'];
    }

}

echo json_encode($response);
exit;