<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$server = 'localhost';
$username = 'id21857504_inventorymanager';
$password = 'Inventory1234@';
$dbname = 'id21857504_inventory';

$conn = mysqli_connect($server, $username, $password, $dbname);

if (!$conn) {
    $response = ['error' => 'Unable to connect to the database'];
} else {
    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Assuming the frontend sends data in JSON format
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate and sanitize the data (replace this with your validation logic)
        $item = isset($data['item']) ? mysqli_real_escape_string($conn, $data['item']) : null;
        $stock = isset($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;
        $id = isset($data['id']) ? mysqli_real_escape_string($conn, $data['id']) : null;

        // Check if all required fields are present
        if ($item !== null && $stock !== null && $id !== null) {
            // Prepare and bind the statement for updating
            $query = "UPDATE items SET name = ?, cStock = ? WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);


            $id = (int) $id;


            // Bind parameters
            mysqli_stmt_bind_param($stmt, "sii", $item, $stock, $id);

            // Execute the statement
            $result = mysqli_stmt_execute($stmt);

            if ($result) {
                $response = ['message' => 'Item updated successfully'];
            } else {
                $response = ['error' => 'Error updating item in the database'];
            }

            // Close the statement
            mysqli_stmt_close($stmt);

        } else {
            $response = ['error' => 'Invalid or incomplete data received'];
        }
    } else {
        $response = ['error' => 'Invalid request method'];
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
