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
        $previous = isset($data['previous']) ? mysqli_real_escape_string($conn, $data['previous']) : null;
        $c_stock = isset($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;
        $id = isset($data['id']) ? mysqli_real_escape_string($conn, $data['id']) : null;

        // Check if all required fields are present
        if ($previous !== null && $stock !== null && $id !== null) {
            // Prepare and bind the statement for updating
            $query = "UPDATE stock SET foreign_id = ?, c_stock = ? WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);

            $t_stock = $previous + $c_stock;
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
?>