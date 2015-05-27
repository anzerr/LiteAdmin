<?php
	require_once dirname(__FILE__) . "/entity/class.Core.php";
	(new Jinx\Entity\Core(dirname(__FILE__)))->load()->run();
?>