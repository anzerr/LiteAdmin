<?php

namespace Jinx\Controller;

use \Jinx\Entity as Entity;

Class Database extends Entity\BaseController {
	
	public function query($arg) {
		if (isset($arg['query']) && !empty($arg['query'])) {
			$pdo = new Entity\MyPDO('mysql:host=localhost;dbname=' . ((isset($arg['database'])) ? $arg['database'] : ''), 'root', '');
			$query = $pdo->prepare($arg['query']);
			$query->execute();
			$result = $query->fetchAll(Entity\MyPDO::FETCH_ASSOC);
			$names = array();
			$data = array();
			foreach ($result as $key => $value) {
				$d = array();
				foreach ($value as $k => $v) {
					if ($key == 0 && !in_array($k, $names)) {
						$names[] = $k;
					}
					$d[] = $v;
				}
				$data[] = $d;
			}
			
			$a = array('from', 'update');
			$f = null;
			foreach ($a as $v) {
				preg_match("/" . $v . "\s[^\s]+[\s;]/i", $arg['query'], $m);
				if (count($m) >= 1) {
					$f = explode(" ", $m[0])[1];
					if (substr($f, -1) == ';') {
						$f = substr($f, 0, -1);
					}
					break;
				}
			}
			
			echo json_encode(array(
				"name" => $names, 
				"data" => $data, 
				"info" => array(
					"table" => ($f != null) ? $f : '',
				),
			));
		} else {
			echo 'null';
		}
	}
}