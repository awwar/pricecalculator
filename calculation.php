<?php
header('Access-Control-Allow-Origin: *');
require_once "include/includs.php";

function selectPrices()
{
    $workstep = [];
    $basesql = "
        SELECT * FROM feature
        JOIN price_type
        ON price_type.price_type_id = feature.fk_price_type_id
        JOIN work_type
        ON work_type.work_type_id = feature.fk_work_type_id
        JOIN service
        ON service.service_id = feature.fk_service_id
        JOIN prod_step
        ON service.fk_prod_step_id = prod_step.prod_step_id
        ORDER BY prod_step_id
    ";
    $rez = query($basesql);
    foreach ($rez as $key => $value) {
        $type = $value["work_type_name"];
        $step = $value["prod_step_name"];
        $name = $value["name"];
        $workstep[$type]["cards"][$step][$name][] = $value;
    }
    return $workstep;
}

function selectTaxes($workstep)
{
    $basesql = "
        SELECT * FROM taxes
        JOIN work_type
        ON work_type.work_type_id = taxes.fk_work_type_id
    ";
    $rez = query($basesql);
    foreach ($rez as $key => $value) {
        $type = $value["work_type_name"];
        $workstep[$type]["taxes"] []= $value['taxes_coste'];
    }
    return $workstep;
}
$output = selectPrices();
$output = selectTaxes($output);
die(json_encode($output, JSON_NUMERIC_CHECK));
