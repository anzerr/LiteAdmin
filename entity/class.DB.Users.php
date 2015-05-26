<?php

require_once dirname(__FILE__) . "/class.DB.php";

class DB_Users extends DB
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