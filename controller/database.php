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
			echo json_encode($result);
		} else {
			echo 'null';
		}
	}
}