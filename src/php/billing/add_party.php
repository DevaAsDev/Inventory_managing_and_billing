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
        $name = isset($data['name']) ? mysqli_real_escape_string($conn, $data['name']) : null;
        $mNumber = isset($data['number']) ? mysqli_real_escape_string($conn, $data['number']) : null;
        $place = isset($data['place']) ? mysqli_real_escape_string($conn, $data['place']) : null;
        $fName = isset($data['FName']) ? mysqli_real_escape_string($conn, $data['FName']) : null;
        $accont = isset($data['aNumber']) ? mysqli_real_escape_string($conn, $data['aNumber']) : null;
        $ifsi = isset($data['ifsi']) ? mysqli_real_escape_string($conn, $data['ifsi']) : null;
        $branch = isset($data['branch']) ? mysqli_real_escape_string($conn, $data['branch']) : null;
        $holder = isset($data['holder']) ? mysqli_real_escape_string($conn, $data['holder']) : null;
        $date = isset($data['date']) ? mysqli_real_escape_string($conn, $data['date']) : null;
        $code = isset($data['code']) ? mysqli_real_escape_string($conn, $data['code']) : null;
        $gstin = isset($data['gstin']) ? mysqli_real_escape_string($conn, $data['gstin']) : null;


        // Check if all required fields are present
        if ($name !== null && $mNumber !== null) {
            // Prepare and bind the statement for updating
            $query = "INSERT INTO party (name, number, place, fname, account, ifsi, branch, holder, date, code, gstin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
            $stmt = mysqli_prepare($conn, $query);
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "sississssss", $name, $mNumber, $place, $fName, $accont, $ifsi, $branch, $holder, $date, $code, $gstin);
            // Execute the statement
            $result = mysqli_stmt_execute($stmt);
            if ($result) {
                $response = ['data' => 'Party added successfully'];
            } else {
                $response = ['error' => 'Invalid operation'];
            }
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