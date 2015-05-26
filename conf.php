<?php

include dirname(__FILE__) . "/entity/class.MyPDO.php";

$pdo = new MyPDO('mysql:host=localhost;dbname=mypma', 'pma', '1234');
