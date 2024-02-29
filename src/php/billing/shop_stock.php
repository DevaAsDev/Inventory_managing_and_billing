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
        $id = isset($data['id']) ? mysqli_real_escape_string($conn, $data['id']) : null;
        $c_stock = isset($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;
        $mrp = isset($data['mrp']) ? mysqli_real_escape_string($conn, $data['mrp']) : null;
        $price = isset($data['price']) ? mysqli_real_escape_string($conn, $data['price']) : null;
        $date = isset($data['date']) ? mysqli_real_escape_string($conn, $data['date']) : null;
        $time = isset($data['time']) ? mysqli_real_escape_string($conn, $data['time']) : null;
        $foreign_id = isset($data['foreign_id']) ? mysqli_real_escape_string($conn, $data['foreign_id']) : null;
        $source = isset($data['source']) ? mysqli_real_escape_string($conn, $data['source']) : null;

        if ($id !== null && $c_stock !== null) {
            // Prepare and bind the statement for updating
            $query = "UPDATE shopItems SET cStock = ?, mrp = ?, sprice = ? WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);

            //$t_stock = (int) $previous - (int) $c_stock;
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "iiii", $c_stock, $mrp, $price, $id);

            // Execute the statement
            $result = mysqli_stmt_execute($stmt);
            if ($result) {
                $direc = 'IN';
                $query = "INSERT INTO sHOP_history(foreign_id, stock_quantity, direction, date, time, source) VALUES (?, ?, ?,? , ?, ?)";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, "iiss", $foreign_id, $c_stock, $direc, $data, $time, $source);

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
echo json_encode(['data' => $response], JSON_UNESCAPED_UNICODE);