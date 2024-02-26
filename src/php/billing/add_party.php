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
        $Name = isset($data['name']) ? mysqli_real_escape_string($conn, $data['name']) : null;
        $mNumber = isset($data['number']) ? mysqli_real_escape_string($conn, $data['number']) : null;
        $place = isset($data['place']) ? mysqli_real_escape_string($conn, $data['place']) : null;
        $fName = isset($data['FName']) ? mysqli_real_escape_string($conn, $data['FName']) : null;
        $accont = isset($data['aNumber']) ? mysqli_real_escape_string($conn, $data['aNumber']) : null;
        $ifsi = isset($data['ifsi']) ? mysqli_real_escape_string($conn, $data['ifsi']) : null;
        $branch = isset($data['branch']) ? mysqli_real_escape_string($conn, $data['branch']) : null;
        $holder = isset($data['holder']) ? mysqli_real_escape_string($conn, $data['holder']) : null;


        // Check if all required fields are present
        if ($name !== null && $mNumber !== null) {
            // Prepare and bind the statement for updating
            $query = "UPDATE stock SET c_stock = ? WHERE foreign_id = ?";
            $stmt = mysqli_prepare($conn, $query);

            $t_stock = (int) $previous + (int) $c_stock;
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "ii", $t_stock, $id);

            // Execute the statement
            $result = mysqli_stmt_execute($stmt);

            if ($result) {
                $direc = 'IN';
                $query = "INSERT INTO stock_history(foreign_id, stock_quantity, direction, date, time, source) VALUES (?, ?, ?,CURDATE(), NOW(), ?)";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, "iiss", $id, $c_stock, $direc, $from);

                $result = mysqli_stmt_execute($stmt);
                if ($result) {
                    $response = ['message' => 'Stock updated successfully'];
                } else {
                    $response = ['error' => 'Error updating stock to the database'];
                }

                // Close the statement
                mysqli_stmt_close($stmt);
            } else {
                $response = ['error' => 'Error updating stock in the database'];
            }

        } else {
            $response = ['error' => 'Invalid or incomplete data received'];
        }

    } else {
        $response = ['error' => 'Invalid request method'];
    }
}