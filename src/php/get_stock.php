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
    // Fetch data from the items table
    $itemsQuery = "SELECT id, name ,itemCode sku FROM items";
    $itemsResult = mysqli_query($conn, $itemsQuery);
    $itemsData = mysqli_fetch_all($itemsResult, MYSQLI_ASSOC);

    // Fetch stock data from the stock table
    $stockQuery = "SELECT foreign_id, c_stock FROM stock";
    $stockResult = mysqli_query($conn, $stockQuery);
    $stockData = mysqli_fetch_all($stockResult, MYSQLI_ASSOC);

    // Combine data from both tables based on id/foreign_id
    $combinedData = [];

    foreach ($itemsData as $item) {
        $combinedItem = $item;
        $stockItem = array_values(array_filter($stockData, function ($stock) use ($item) {
            return $stock['foreign_id'] == $item['id'];
        }));

        $combinedItem['stock'] = $stockItem ? $stockItem[0]['c_stock'] : null;
        $combinedData[] = $combinedItem;
    }

    // Return the combined data as JSON response
    echo json_encode(['data' => $combinedData], JSON_UNESCAPED_UNICODE);
}

/*
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

    $query = "SELECT * FROM stock";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $response = ['data' => $data];
    } else {
        $response = ['error' => 'Error retrieving data from the database'];
    }
}

echo json_encode($response);*/
exit
    ?>