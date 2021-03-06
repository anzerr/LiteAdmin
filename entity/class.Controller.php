<?php

namespace Jinx\Entity;

class BaseController {
	
	public function __construct($dir) {
		$this->baseDir = str_replace('\\', '/', $dir);
		return ($this);
	}
	
	public function index() {
		echo file_get_contents($this->baseDir . '/public/index.html');
	}
}
