<?php
header('Content-Type: application/json');
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
        $number = isset($data['number']) ? mysqli_real_escape_string($conn, $data['number']) : null;
        $item = isset($data['item']) ? mysqli_real_escape_string($conn, $data['item']) : null;
        $code = isset($data['code']) ? mysqli_real_escape_string($conn, $data['code']) : null;
        $stock = isset($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;

        // Check if all required fields are present
        if ($number !== null && $item !== null && $code !== null && $stock !== null) {


            // Prepare and bind the statement for insertion
            $query = "INSERT INTO items (number, name, code, stock) VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);

            // Assuming 'number' is an integer, adjust the data type accordingly
            $number = (int) $number;

            // Bind parameters
            mysqli_stmt_bind_param($stmt, "issi", $number, $item, $code, $stock);

            // Execute the statement
            $result = mysqli_stmt_execute($stmt);



            if ($result) {
                $response = ['message' => 'New item added successfully'];
            } else {
                $response = ['error' => 'Error adding new item to the database'];
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

echo json_encode($response);
exit;
?>