<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$conn = pg_connect("dbname='cso' host='localhost' port='5432' user='postgres' password='Q4jqt3ee9H'");
if (!$conn) {
    echo "An error occured during connection.\n";
    exit;
}

$result = pg_query($conn, "select * from csoinformation") or die("<font color='red'>Eeeek! Could not query</font>");
if (!$result) {
    echo "An error occured on the query.\n";
    exit;
}

if (pg_num_rows($result) == 0) {
    echo "0 records";
} else {
    print "<table border=1>\n";
    print "<tr><td><b>CSO_ID</b></td><td><b>CSO_Name</b></td></tr>";
    while ($row = pg_fetch_array($result)) {
        echo "<td>", $row['CSO_ID'], "</td><td>", $row['CSO_Name'], "</td></tr>\n";
    }
    echo "</table>\n";
}

//Creat json object
//pg_fetch_assoc($result)
//$arr = pg_fetch_array($result, 0, PGSQL_NUM);
//echo json_encode($arr); 
//$data = pg_query("SELECT category1,category2 FROM help ORDER BY category1");
$row_counter = 0;
while ($arr = pg_fetch_array($result, $row_counter, PGSQL_ASSOC)) {
    $rows[] = $arr;
    $row_counter++;
}
echo json_encode($rows);

//Close all existing connections
pg_close($conn);
?>
