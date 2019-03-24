<?php

    class config
    {
        public static $dbuser = "root";
        public static $dbpass = "root";
        public static $dbname = "services";
    }
    

    function query($query)
    {
        $mysqli = new mysqli("localhost", config::$dbuser, config::$dbpass, config::$dbname);
        
        if ($mysqli->connect_errno) {
            error('Неожиданное завершение сценария!');
        }

        $query = $mysqli->query($query);
        $rezult = [];
        while ($row = $query->fetch_assoc()) {
            $rezult []= $row;
        }
        $mysqli->close();
        return $rezult;
    }

    function error($msg, $data = [])
    {
        http_response_code(500);
        die(json_encode([
            'notifi' => $msg,
            'data' => $data
        ]));
    }

    function success($msg)
    {
        http_response_code(200);
        die(json_encode([
            'notifi' => $msg
        ]));
    }