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
    $lats_id = fetchLatestIDFromDatabase($conn) + 1;
    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Assuming the frontend sends data in JSON format
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate and sanitize the data (replace this with your validation logic)
        $item = isset($data['item']) ? mysqli_real_escape_string($conn, $data['item']) : null;
        // $code = isset($data['code']) ? mysqli_real_escape_string($conn, $data['code']) : null;
        $code = 1000 + fetchLatestIDFromDatabase($conn) + 1;
        $stock = isset($data['stock']) ? mysqli_real_escape_string($conn, $data['stock']) : null;

        // Check if all required fields are present
        if ($item !== null && $code !== null && $stock !== null) {


            $generatedID = generateUniqueID($conn);

            // Prepare and bind the statement for insertion
            $query = "INSERT INTO items (name, itemCode, cStock, sku) VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);

            // Bind parameters
            mysqli_stmt_bind_param($stmt, "ssis", $item, $code, $stock, $generatedID);

            // Execute the statement
            $result = mysqli_stmt_execute($stmt);



            if ($result) {
                $query = "INSERT INTO stock(foreign_id, c_stock) VALUES (?, ?)";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, "ii", $lats_id, $stock);

                // Execute the statement
                $result = mysqli_stmt_execute($stmt);
                if ($result) {
                    $response = ['message' => 'New item added successfully'];
                } else {
                    $response = ['error' => 'Error adding new item to the database'];
                }

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


function generateUniqueID($conn)
{
    // Get current date and time components
    $year = date('Y');
    $month = date('m');
    $day = date('d');
    $hour = date('H');
    $minute = date('i');
    $second = date('s');
    $latestID = fetchLatestIDFromDatabase($conn) + 1;

    // Concatenate components and add padding
    $baseID = intval($year . $month . $day . $hour . $minute . $second . $latestID);

    // Add more uniqueness with uniqid
    $uniqid = uniqid('', true);

    // Combine the base ID and uniqid
    $combinedID = $baseID . $uniqid;

    // Ensure the length is 10 digits by adding leading zeros
    $paddedID = str_pad($combinedID, 10, '0', STR_PAD_LEFT);

    // Truncate the ID to fit into an INT parameter
    $truncatedID = intval(substr($paddedID, 0, 10));

    $combinedID1 = $truncatedID . $latestID;
    return $combinedID1;
}

// Function to fetch the latest ID from the database
function fetchLatestIDFromDatabase($conn)
{
    $query = "SELECT MAX(id) AS latestID FROM items";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $latestID = $row['latestID'];
        return $latestID;
    } else {
        return 1;
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
?>