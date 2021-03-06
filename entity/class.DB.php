<?php

namespace Jinx\Entity;

class DB
{
	protected static $_pdo;
	protected static $_table;
	
	public function __construct($pdo, $table = "")
	{
		self::$_pdo = $pdo;
		self::$_table = $table;
	}
	
	public function query($sql)
	{
		return $this->_pdo->query($sql);
	}
		
	public function exec($sql) 
	{
		return $this->_pdo->exec($sql);
	}
		
	public function prepare($sql)
	{
		return $this->_pdo->prepare($sql);
	}

	public function lastInsertId()
	{
		return $this->_pdo->lastInsertId($this->_table . "_id_seq");
	}

	public function getObject($where = array())
	{
		$sql = "SELECT * FROM " . $this->_table . " WHERE id = " . $where['id'] . ";";
		if ($req = $this->query($sql))
		{
			return $req;
		}
		return false;
	}

	public function getObjects($where = array())
	{
		$sql = $sql = "SELECT * FROM " . $this->_table . ";";
		if ($req = $this->query($sql))
		{
			return $req;
		}
		return false;
	}
}
 
?>