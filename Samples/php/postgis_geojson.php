<?php

/**
 * Title: PostGIS to GeoJSON
 * Notes: Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author: Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub: https://github.com/bmcbride/PHP-Database-GeoJSON
 */
# Connect to PostgreSQL database
//$conn = new PDO('pgsql:host=localhost;dbname=cso;port=5432','dmuthami','Q4jqt3ee9H');

$conn = pg_connect("dbname='cso' host='localhost' port='5432' user='postgres' password='Q4jqt3ee9H'")
        or die("<font color='red'>Eeeek! Could not connect to cso satabase</font>");

# Build SQL SELECT statement and return the geometry as a GeoJSON element
//$sql = 'SELECT *, public.ST_AsGeoJSON(public.ST_Transform((the_geom),4326)) as geojson FROM csoinformation';
$sql = 'SELECT *, public.ST_AsGeoJSON(public.ST_Transform((geom),4326)) as geojson FROM county';

# Try query or error
//$rs = $conn->query($sql);

$rs = pg_query($conn, $sql) or die("<font color='red'>Eeeek! Could not query</font>");
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
    'type' => 'FeatureCollection',
    'features' => array()
);

# Loop through rows to build feature arrays
//$arr = pg_fetch_array($result, $row_counter, PGSQL_ASSOC)
$row_counter = 0;
while ($row = pg_fetch_array($rs, $row_counter, PGSQL_ASSOC)) {
    $properties = $row;
    # Remove geojson and geometry fields from properties
    unset($properties['geojson']);
    unset($properties['geom']);
    $feature = array(
        'type' => 'Feature',
        'geometry' => json_decode($row['geojson'], true),
        'properties' => $properties
    );
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
    $row_counter++;
}

header('Content-type: application/json');
echo json_encode($geojson, JSON_NUMERIC_CHECK);
$conn = NULL;
?>
