<?php

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
		$a = file_get_contents('php://input');
		var_dump(json_encode($a));
		var_dump(json_decode($a));
	}
}
 
?>