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
        $bId = isset ($data['bId']) ? mysqli_real_escape_string($conn, $data['bId']) : null;
        $pName = isset ($data['pName']) ? mysqli_real_escape_string($conn, $data['pName']) : null;

        $pNumber = isset ($data['pNumber']) ? mysqli_real_escape_string($conn, $data['pNumber']) : null;
        $discount = isset ($data['discount']) ? mysqli_real_escape_string($conn, $data['discount']) : null;
        $paid = isset ($data['paid']) ? mysqli_real_escape_string($conn, $data['paid']) : null;
        $pType = isset ($data['pType']) ? mysqli_real_escape_string($conn, $data['pType']) : null;
        $remarks = isset ($data['remarks']) ? mysqli_real_escape_string($conn, $data['remarks']) : null;
        $totalAmout = isset ($data['totalAmout']) ? mysqli_real_escape_string($conn, $data['totalAmout']) : null;

        $date = isset ($data['date']) ? mysqli_real_escape_string($conn, $data['date']) : null;
        $time = isset ($data['time']) ? mysqli_real_escape_string($conn, $data['time']) : null;

        // Check if all required fields are present
        if ($bId !== null) {


            // Prepare and bind the statement for updating
            $query = "INSERT INTO sales (bId, pName, pNumber, totalAmount, discount, received, pType, remarks, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "sssdddssss", $bId, $pName, $pNumber, $totalAmout, $discount, $paid, $pType, $remarks, $date, $time);
            // Execute the statement
            $result = mysqli_stmt_execute($stmt);
            if ($result) {

                if (isset ($data['items'])) {
                    // Get the array of items
                    $items = $data['items'];

                    // Process each item
                    foreach ($items as $item) {
                        // Extract item properties
                        //$itemId = isset($item['id']) ? $item['id'] : null;
                        $itemName = isset ($item['name']) ? $item['name'] : null;
                        $foreignId = isset ($item['foreign_id']) ? $item['foreign_id'] : null;
                        $itemCode = isset ($item['itemCode']) ? $item['itemCode'] : null;
                        $quantity = isset ($item['quantity']) ? $item['quantity'] : null;
                        $sku = isset ($item['sku']) ? $item['sku'] : null;
                        $sprice = isset ($item['sprice']) ? $item['sprice'] : null;
                        $unit = isset ($item['unit']) ? $item['unit'] : null;
                        $total = isset ($item['total']) ? $item['total'] : null;

                        // Perform database operations for each item
                        $querys = "INSERT INTO salesList (bId, name, foreign_id, itemCode, quantity, sku, price, unit, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
                        $stmt = mysqli_prepare($conn, $querys);
                        mysqli_stmt_bind_param($stmt, "ssisdsdsd", $bId, $itemName, $foreignId, $itemCode, $quantity, $sku, $sprice, $unit, $total);
                        // Execute the statement
                        $result = mysqli_stmt_execute($stmt);
                        if ($result) {
                            $queryf = "UPDATE shopItems SET cStock = cStock - ? WHERE foreign_id = ?";
                            $stmt = mysqli_prepare($conn, $queryf);

                            $temp = (int) $quantity;
                            // Bind parameters
                            mysqli_stmt_bind_param($stmt, "ii", $temp, $foreignId);
                            // Execute the statement
                            $result = mysqli_stmt_execute($stmt);
                            if ($result) {
                                $direc = 'SALES';
                                $source = "CUSTOMER";
                                $query = "INSERT INTO shop_history(foreign_id, stock_quantity, direction, date, time, source) VALUES (?, ?, ?,?, ?, ?)";
                                $stmt = mysqli_prepare($conn, $query);
                                mysqli_stmt_bind_param($stmt, "iissss", $foreignId, $temp, $direc, $date, $time, $source);

                                $result = mysqli_stmt_execute($stmt);
                                if ($result) {
                                    $response = ['message' => 'sales added successfully'];
                                } else {
                                    $response = ['error' => 'Something went wrong!'];
                                }

                                // Close the statement
                                mysqli_stmt_close($stmt);
                            } else {
                                $response = ['error' => 'Error'];
                            }
                            //$result ? $response = ['message' => 'sales added successfully'] : $response = ['error' => 'Failed to add sales'];

                        } else {
                            $response = ['error' => 'Failed to add sales'];
                        }
                    }

                }

            } else {
                $response = ['error' => 'Invalid operation'];
            }


        } else {
            $response = ['error' => 'Invalid or incomplete data received'];
        }

    } else {
        $response = ['error' => 'Invalid request method'];
    }

}

echo json_encode($response);
exit;