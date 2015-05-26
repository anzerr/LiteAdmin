<?php
	require_once "conf.php";

	$users = $pdo->users->getObjects();

	while ($user = $users->fetchObject())
	{
		$id = $user->id;
		echo $id;
		echo "\n";
	}

	die();
?>