<?php

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

if (!empty($data)) {

    // Email information
    $admin_email = "admin@lila.su";
    $email = "sarva@lila.su";
    $name = $data['name'];
    $phone = $data['phone'];
    $name_place = $data['name_place'];

    //send email
    mail($admin_email, "Новый отзыв", "Имя: $name\n\rТелефон: $phone\n\rМесто: $name_place", "From:" . $email);

    echo json_encode(['status' => 'ok']);
}