<?php

/*
 * Title: PostGIS to GeoJSON
 * Note : Generates geojson from postgis table
 *        Generates json from table
 *        Generates geojson from table with points
 *
 * Author: David Muthami
 * Contact: waruid@gmail.com
 * GitHub: www.spatialwise.com
 * 
 */

$conn = pg_connect("dbname='cso' host='localhost' port='5432' user='postgres' password='Q4jqt3ee9H'");
if (!$conn) {
    echo "An error occured during connection.\n";
    exit;
}

/*
 * SELECT 
  csoinformation.\"CSO_Name\", 
  csoinformation.\"Latitude\", 
  csoinformation.\"Longitude\", 
  csoinformation.\"CSO_ID\"
FROM 
  public.csoinformation 
  where public.csoinformation.\"Latitude\" notnull or 
  public.csoinformation.\"Longitude\" notnull;
 */
$result = pg_query($conn, "SELECT 
                            csoinformation.\"CSO_Name\", 
                            csoinformation.\"Latitude\", 
                            csoinformation.\"Longitude\", 
                            csoinformation.\"CSO_ID\"
                          FROM 
                            public.csoinformation 
                            where public.csoinformation.\"Latitude\" notnull or 
                            public.csoinformation.\"Longitude\" notnull;"
        ) or die("<font color='red'>Eeeek! Could not query</font>");
if (!$result) {
    echo "An error occured on the query.\n";
    exit;
}

/*
 * commented code below outputs json code directly from database query
 */
//$jsonn = buildJson($result);
//echo $jsonn;

/*
 * Lines below generate geojson for points
 */
$geojson = buildPointGeoJson($result);
echo $geojson;

/*
 * Function builds a json object
 */
function buildJson($result) {
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

    //print out the json encode
    return json_encode($rows);
}

/*
 * This functions builds point geojson
 * { "type": "MultiPoint",
 * "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
 *  }
 * Longitude value followed by Latitude value
 */
function buildPointGeoJson($result) {
    $b= '{ "type": "MultiPoint",' .
        '"coordinates": [';
    //loop through the array
    while ($row = pg_fetch_array($result)) {
        //build the points array dynamically       
        $b.= '['.$row['Longitude'] . ',' . $row['Latitude'] .']'. ',';
    }  
    //echo last column with a fake 0,0 coordinate
    $b.= '['.'0' . ',' . '0' . ']' . ']} ';
    
    return $b;
}

//Close all existing connections
pg_close($conn);
?>
