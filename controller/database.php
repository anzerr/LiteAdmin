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
			echo json_encode(array("names" => $names, "data" => $data));
		} else {
			echo 'null';
		}
	}
}