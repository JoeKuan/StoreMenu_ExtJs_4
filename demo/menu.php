<?php

$result['success'] = true;

if (intval($_POST['demo']) === 2) {

  session_start();
  if (!isset($_SESSION['demo2'])) {
		$result['root'][] = array( 'config' => array ('id' => '2A', 'text' => 'Menu 2A', 'xtype' => 'menucheckitem'));
		$result['root'][] = array( 'config' => array ('xtype' => 'menuseparator' ));
		$result['root'][] = array( 'id' => '2C', 'text' => 'Menu 2C');
    $_SESSION['demo2'] = $result;
  } else {
    $result = $_SESSION['demo2'];
  }

  // Operation
  switch ($_POST['op']) {
  case 'reset':
    $result['root'] = array();
		$result['root'][] = array( 'config' => array ('id' => '2A', 'text' => 'Menu 2A', 'xtype' => 'menucheckitem'));
		$result['root'][] = array( 'config' => array ('xtype' => 'menuseparator' ));
		$result['root'][] = array( 'id' => '2C', 'text' => 'Menu 2C');
    break;
  case 'add':
    $result['root'][] = array('id' => 'demo2_' . count($result['root']), 'text' => $_POST['name']);
    break;
  case 'remove':
    $tmp = array();
    foreach ($result['root'] as $entry) {
      if ($_POST['name'] != $entry['text']) {
        $tmp[] = $entry;
      }
    }
    $result['root'] = $tmp;
    break;
  }
  $_SESSION['demo2'] = $result;

} else if (intval($_GET['demo']) == 3) {

  $result['rows'][] = array('menuId' => '3A', 'name' => 'Menu 3A', 
                            'sm' => array(array('menuId' => '3A-1', 'name' => 'Submenu 3A-1', 'smHandler' => 'submenu3A1'),
                                              array('menuId' => '3A-2', 'name' => 'Submenu 3A-2', 'smHandler' => 'submenuCommon')));
  $result['rows'][] = array('menuId' => '3B', 'name' => 'Menu 3B',
                            'sm' => array(array('menuId' => '3B-1', 'name' => 'Submenu 3B-1', 'smHandler' => 'submenu3B1'),
                                              array('menuId' => '3B-2', 'name' => 'Submenu 3B-2', 'smHandler' => 'submenuCommon')));
  
} else {
		$result['root'][] = array( 'id' => '1A', 'text' => 'Menu 1A');
		$result['root'][] = array( 'id' => '1B', 'text' => 'Menu 1B', 'iconCls' => 'calendar');
		$result['root'][] = array( 'id' => '1C', 'text' => 'Menu 1C');
}

echo json_encode($result);
?>
