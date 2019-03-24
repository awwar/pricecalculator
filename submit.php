<?php
header('Access-Control-Allow-Origin: *');
require_once "include/includs.php";

$form = json_decode($_POST['form']);
$data = (array)json_decode($_POST['data']);
validate($form);
$service = selectFeature($data);
sendMail($form, $service);

function fillData($data)
{
    foreach ($data as $key => $value) {
        $message .= "<tr style='background: #82b7f5;'><td><strong>$value->name</strong> </td><td>Цена: $value->price$value->addition Описание: $value->description</td></tr>";
    }
    return $message;
}

function sendMail($form, $data)
{
    $to = $form->Email;
    $subject = 'Заказ на видеосъемку';
    
    $headers  = "From: " . strip_tags($form->Email) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($form->Email) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    
    $message = '<html><body>';
    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
    $message .= "<tr style='background: #eee;'><td><strong>Имя:</strong> </td><td>" . strip_tags($form->Name) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>Почта:</strong> </td><td>" . strip_tags($form->Email) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>Телефон</strong> </td><td>" .$form->Phone . "</td></tr>";
    $message .= fillData($data);
    $message .= "</table>";
    $message .= "</body></html>";
    
    mail($to, $subject, $message, $headers);
    success("Мы приняли сообщение к рассмотрению!");
}

function selectFeature($data)
{
    $service = [];
    $servids = [];
    $basesql = "
        SELECT feature.feature_id,feature.description,feature.price,price_type.addition,service.name,prod_step.prod_step_name FROM feature
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
    $i = 0;
    foreach ($data as $key => $value) {
        $int = preg_replace("/service-(\d.*)/", "$1", $key);
        if($int == 0){
            continue;
        }
        $i++;
        $servids []= (int)$int;
    }

    if($i == 0){
        error('Вы ничего не выбрали');
    }

    $rez = query($basesql);

    foreach ($rez as $key => $value) {
        if (in_array((int)$value['feature_id'], $servids)) {
            $service[$value['feature_id']] = (object)$value;
        }
    }
    return $service;
}

function validate($form){
    $form = (array)$form;
    if(empty($form)){
        error("Вы ввели не все данные",["Name","Email","Phone"]);
    }

    $errors = array_diff_key(["Name" => 0,"Email" => 0,"Phone" => 0], $form);
    
    foreach ($form as $key => $value) {

        if(mb_strlen($value) < 4){
            $errors[] = $key;
        }
    }

    if(!empty($errors)){
        error("Вы ввели не все данные", $errors);
    }
}
