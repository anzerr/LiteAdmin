<?php

namespace Jinx\Controller;

use \Jinx\Entity as Entity;

Class Database extends Entity\BaseController {
	
	public function query($arg) {
		if (isset($arg['query']) && !empty($arg['query'])) {
			$error = array();
			try {
				$pdo = new Entity\MyPDO($arg['connect']['sql'] . ';dbname=' . ((isset($arg['database'])) ? $arg['database'] : ''), $arg['connect']['user'], $arg['connect']['pwd']);
				$pdo->setAttribute(Entity\MyPDO::ATTR_ERRMODE, Entity\MyPDO::ERRMODE_EXCEPTION);
				$pdo->setAttribute(Entity\MyPDO::ATTR_EMULATE_PREPARES, false);
				$query = $pdo->prepare($arg['query']);
				$query->execute();
				$result = $query->fetchAll(Entity\MyPDO::FETCH_ASSOC);
			} catch(\Exception $e) {
				$error[] = $e->getMessage();
			}
			
			$names = array();
			$data = array();
			if (count($error) == 0) {
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
			}
			
			$a = array('from', 'update', 'table');
			$f = null;
			foreach ($a as $v) {
				preg_match("/" . $v . "\s[^\s]+[\s;]?/i", $arg['query'], $m);
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
				"error" => $error,
			));
		} else {
			echo 'null';
		}
	}
}