<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS. POST');
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

        $previous = isset ($data['previous']) ? mysqli_real_escape_string($conn, $data['previous']) : null;
        $c_stock = isset ($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;
        $id = isset ($data['id']) ? mysqli_real_escape_string($conn, $data['id']) : null;
        $f_id = isset ($data['fid']) ? mysqli_real_escape_string($conn, $data['fid']) : null;
        $source = isset ($data['source']) ? mysqli_real_escape_string($conn, $data['source']) : null;
        $date = isset ($data['date']) ? mysqli_real_escape_string($conn, $data['date']) : null;
        $time = isset ($data['time']) ? mysqli_real_escape_string($conn, $data['time']) : null;

        // $t_stock = (int) $previous - (int) $c_stock;

        $query = "UPDATE shopItems SET cStock = cStock - ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $c_stock, $id);

        // Execute the statement
        $result = mysqli_stmt_execute($stmt);
        if ($result) {
            $direc = 'OUT';
            $query = "INSERT INTO shop_history(foreign_id, stock_quantity, direction, date, time, source) VALUES (?, ?, ?,?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "iissss", $f_id, $c_stock, $direc, $date, $time, $source);

            $result = mysqli_stmt_execute($stmt);
            if ($result) {
                $response = ['message' => 'Stock issued successfully'];
            } else {
                $response = ['error' => 'Error issuing stock'];
            }

            // Close the statement
            mysqli_stmt_close($stmt);
        } else {
            $response = ['error' => 'Error'];
        }

    } else {
        $response = ['error' => 'Invalid request method'];
    }
}

echo json_encode(['data' => $response], JSON_UNESCAPED_UNICODE);