<?php

/**
 * Title: PostGIS to GeoJSON
 * Notes: Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author: David Muthami
 * Contact: bryanmcbride.com
 * GitHub: url
 */
# Connect to PostgreSQL database
//$conn = new PDO('pgsql:host=localhost;dbname=cso;port=5432','dmuthami','Q4jqt3ee9H');

$conn = pg_connect("dbname='cso' host='localhost' port='5432' user='postgres' password='Q4jqt3ee9H'")
        or die("<font color='red'>Eeeek! Could not connect to cso satabase</font>");

# Build SQL SELECT statement and return the geometry as a GeoJSON element
//$sql = 'SELECT *, public.ST_AsGeoJSON(public.ST_Transform((the_geom),4326)) as geojson FROM csoinformation';
$sql = 'SELECT county, public.ST_AsGeoJSON(public.ST_Transform((geom),4326)) as geojson FROM county;';

# Try query or error
//$rs = $conn->query($sql);

$rs = pg_query($conn, $sql) or die("<font color='red'>Eeeek! Could not query</font>");
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array

$geojson = build_geojson($rs);
echo $geojson;

//header('Content-type: application/json');
//echo json_encode($geojson, JSON_NUMERIC_CHECK);
// Close database connection
pg_close($conn);
$conn = NULL;

/*
 * Generates a GeoJSON file directly from PostgreSQL
 */

function build_geojson($rs) {
    $geojson = array(
        'type' => 'FeatureCollection',
        'features' => array()
    );
    while ($row = pg_fetch_assoc($rs)) {

        $properties = array();

        foreach ($row as $key => $val) {

            if ($key != 'geojson') {

// array_push($properties,$key,$val);

                $properties[$key] = $val;
            };
        };

        $feature = array(
            'type' => 'Feature',
            'properties' => $properties,
            'geometry' => json_decode($row['geojson'], true),
        );

// Add feature array to feature collection array

        array_push($geojson['features'], $feature);
    }
//header('Content-type: application/json',true);

    return json_encode($geojson);
}

?>
