
Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'Ext.ux.menu': './'
    }
});

Ext.require('Ext.ux.menu.StoreMenu');

Ext.onReady(function() {
    
    Ext.define('Menu', {
        extend: 'Ext.data.Model',
        // We put 'config' as well as 'id' and 'text', so that
        // we can switch specific menu option or menuitem option
        fields: [ 'id', 'text', 'iconCls', 'config' ]
    });

    /***********************************************
     * Setup for StoreMenu demo 1
     ***********************************************/
    var menustore1 = Ext.create('Ext.data.Store', {
        model: 'Menu',
        proxy: {
            type: 'ajax',
            url: 'demo/menu.php',
            reader: {
                type: 'json',
                root: 'root'
            }
        }
    });

    var menu1 = Ext.create('Ext.ux.menu.StoreMenu', {
        store: menustore1,
        plain: true,
        itemsHandler: function(item, evt) {
            Ext.example.msg("First Menu Store", "You click on item with id " + item.id); 
        }
    });

    /***********************************************
     * Setup for StoreMenu demo 2
     ***********************************************/
    var menustore2 = Ext.create('Ext.data.Store', {
        model: 'Menu',
        proxy: {
            type: 'ajax',
            url: 'demo/menu.php',
            actionMethods : {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'root',
            }
        }
    });

    var menu2 = Ext.create('Ext.ux.menu.StoreMenu', {
        store: menustore2,
        plain: true,
        itemsHandler: function(item, evt) {
            Ext.example.msg("Second Menu Store", "You click on item with id " + item.id); 
        },
        offset: 3,
        items: [{
            text: 'Add menu',
            id: 'static1',
            handler: function(item) {
                var win = Ext.create('Ext.window.Window', {
                    title: 'Add menu',
                    modal: true,
                    id: 'addForm',
                    items: [{
                        xtype: 'form',
                        frame: true,
                        items: [{
                            xtype: 'hidden',
                            name: 'op',
                            value: 'add'
                        }, {
                            xtype: 'hidden',
                            name: 'demo',
                            value: 2
                        }, {
                            xtype: 'label',
                            html: '<b>This will send an Ajax request to store a menu entry</b>',
                        }, {
                            xtype: 'tbspacer',
                            height: '8px'
                        }, {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: 'Menu Name',
                            name: 'name'
                        }],
                        buttons: [{
                            text: 'Add',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    Ext.Ajax.request({
                                        url: 'demo/menu.php',
                                        params: form.getFieldValues(),
                                        success: function(response) {
                                            var result = Ext.decode(response.responseText);
                                            // Do something
                                            win.close();
                                        }
                                    });
                                }
                            }
                        }, {
                            text: 'Cancel',
                            handler: function() {
                                win.close();
                            }
                        }]
                    }]
                });
                win.show();
            }
        }, {
            text: 'Remove menu',
            id: 'static2',
            handler: function(item) {
                var win = Ext.create('Ext.window.Window', {
                    title: 'Remove menu',
                    modal: true,
                    items: [{
                        xtype: 'form',
                        frame: true,
                        id: 'removeForm',
                        items: [{
                            xtype: 'hidden',
                            name: 'op',
                            value: 'remove'
                        }, {
                            xtype: 'hidden',
                            name: 'demo',
                            value: 2
                        }, {
                            xtype: 'label',
                            html: '<b>This will send an Ajax request to remove a menu entry</b>',
                        }, {
                            xtype: 'tbspacer',
                            height: '8px'
                        }, {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: 'Menu Name',
                            name: 'name'
                        }],
                        buttons: [{
                            text: 'Remove',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    Ext.Ajax.request({
                                        url: 'demo/menu.php',
                                        params: form.getFieldValues(),
                                        success: function(response) {
                                            var result = Ext.decode(response.responseText);
                                            // Do something
                                            win.close();
                                        }
                                    });
                                }
                            }
                        }, {
                            text: 'Cancel',
                            handler: function() {
                                win.close();
                            }
                        }]
                    }]
                });
                win.show();
            }
        }, {
            text: 'Reset',
            handler: function() {
                Ext.Ajax.request({
                    url: 'demo/menu.php',
                    params: { demo: 2, op: 'reset' },
                    success: function(response) {
                        var result = Ext.decode(response.responseText);
                        // Do something
                    }
                });
            }
        }]
    });

    // Get different set of menu with config
    menu2.setParams({ demo: 2 });

    /***********************************************
     * Setup for StoreMenu demo 3
     ***********************************************/
    Ext.define('Menu3', {
        extend: 'Ext.data.Model',
        // We put 'config' as well as 'id' and 'text', so that
        // we can switch specific menu option or menuitem option
        fields: [ 'menuId', 'name', 'sm' ]
    });

    var menu3 = Ext.create('Ext.ux.menu.StoreMenu', {
        model: 'Menu3',
        url: 'demo/menu.php',
        nameField: 'name',
        idField: 'menuId',
        menuField: 'sm',
        params: {
            demo: 3
        },
        root: 'rows',
        method: 'GET',
        smHandlers: {
            submenu3A1: function() {
                Ext.example.msg("Third Menu Store", "This is submenu handler specific for menu 3A-1"); 
            },
            submenuCommon: function(item) {
                Ext.example.msg("Third Menu Store", "Common submenu handler for " + item.id); 
            }
        }
    });

    menu3.setSubMenuHandler('submenu3B1', function() {
        Ext.example.msg("Third Menu Store", "This is submenu handler specific for menu 3B-1"); 
    });

    var win = Ext.create('Ext.window.Window', {
        height: 380,
        width: 450,
        closable: false,
        title: 'Menu Store for ExtJs 4 (' + Ext.getVersion().version + ')',
        tbar: [{
            menu: menu1,
            // Important: Since 4.2.1, the rendering only occurs when the items option
            // is not empty which won't subsequently call the store load method. 
            // Need to use showEmptyMenu option to force it.
            showEmptyMenu: true,
            text: 'Menu Demo 1'
        }, {
            menu: menu2,
            text: 'Menu Demo 2'
        }, {
            menu: menu3,
            showEmptyMenu: true,
            text: 'Menu Demo 3'            
        }]
    });

    win.show();
});
