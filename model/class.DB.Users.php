<?php

namespace Jinx\Model;

class DB_Users extends \Jinx\Entity\DB
{
	public function __construct($pdo, $table = "users")
	{
		parent::__construct($pdo, $table);
	}
	
	public function getObjectById($id)
	{
		$where = array();
		$where['id'] = $id;
		return $this->getObject($where);
	}
}

?>