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
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate and sanitize the data (replace this with your validation logic)
        $userName = isset($data['userName']) ? mysqli_real_escape_string($conn, $data['userName']) : null;
        $psword = isset($data['psword']) ? mysqli_real_escape_string($conn, $data['psword']) : null;

        if (checkLogin($userName, $psword, $conn)) {
            $_SESSION['user'] = $username;
            $response = ['success' => true];
        } else {
            $response = ['success' => false];
        }


    } else {
        $response = ['error' => 'Invalid request method!'];
    }
}


// Function to check username and password
function checkLogin($username, $password, $conn)
{
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        mysqli_stmt_close($stmt);
        return true; // Username and password match
    } else {
        mysqli_stmt_close($stmt);
        return false; // Username and password do not match
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;