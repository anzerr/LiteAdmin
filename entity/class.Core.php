<?php

namespace Jinx\Entity;

use \Jinx\Controller as Controller;

class Core
{
	private $baseDir;
	
	private function getFiles($dir) {
		$files = array();
		foreach ($dir as $value) {
			$dh  = opendir($this->baseDir . '/' . $value);
			while (false !== ($filename = readdir($dh))) {
				if ($filename !== '.' and $filename !== '..') {
					$files[] = str_replace('//', '/', $this->baseDir .'/'. $value .'/'. $filename);
				}
			}
		}
		return ($files);
	}
	
	private function initController($name) {
		try {
			$str = 'Jinx\\Controller\\' . $name; 
			return (new $str($this->baseDir));
		} catch (Exception $e) {
			return (null);
		}
	}
	
	public function __construct($dir) {
		$this->baseDir = str_replace('\\', '/', $dir);
		return ($this);
	}

	public function load() {
		foreach ($this->getFiles(array('entity', 'model', 'controller')) as $value) {
			require_once $value;
		}
		return ($this);
	}
	
	public function run() {
		if (($json = json_decode(file_get_contents('php://input'), true)) === null) {
			$json = array('c' => 'database', 'a' => 'index');
		}
		$cont = $this->initController((isset($json['c'])) ? $json['c'] : 'database');
		if ($cont !== null) {
			$action = (isset($json['a']) && is_callable(array($cont, $json['a']))) ? $json['a'] : 'index';
			$cont->$action((isset($json['p'])) ? $json['p'] : null);
		}
	}
}
 
?>