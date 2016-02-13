/**
 * 
 */
/*$('#dg').datagrid({
    url:'ItemManageBO',
    columns:[[
        {field:'imName',title:'Code',width:100},
        {field:'imTypeDisplay',title:'Name',width:100}
    ]]
});*/

$(function(){
	$('#dg').datagrid({
		title:'Editable DataGrid',
		iconCls:'icon-edit',
		width:660,
		height:250,
		singleSelect:true,
		idField:'itemid',
		url:'datagrid_data.json',
		columns:[[
			{field:'itemid',title:'Item ID',width:60},
			{field:'productid',title:'Product',width:100,
				formatter:function(value){
					for(var i=0; i<products.length; i++){
						if (products[i].productid == value) return products[i].name;
					}
					return value;
				},
				editor:{
					type:'combobox',
					options:{
						valueField:'productid',
						textField:'name',
						data:products,
						required:true
					}
				}
			},
			{field:'listprice',title:'List Price',width:80,align:'right',editor:{type:'numberbox',options:{precision:1}}},
			{field:'unitcost',title:'Unit Cost',width:80,align:'right',editor:'numberbox'},
			{field:'attr1',title:'Attribute',width:150,editor:'text'},
			{field:'status',title:'Status',width:50,align:'center',
				editor:{
					type:'checkbox',
					options:{
						on: 'P',
						off: ''
					}
				}
			},
			{field:'action',title:'Action',width:70,align:'center',
				formatter:function(value,row,index){
					if (row.editing){
						var s = '<a href="#" onclick="saverow(this)">Save</a> ';
						var c = '<a href="#" onclick="cancelrow(this)">Cancel</a>';
						return s+c;
					} else {
						var e = '<a href="#" onclick="editrow(this)">Edit</a> ';
						var d = '<a href="#" onclick="deleterow(this)">Delete</a>';
						return e+d;
					}
				}
			}
		]],
		onBeforeEdit:function(index,row){
			row.editing = true;
			updateActions(index);
		},
		onAfterEdit:function(index,row){
			row.editing = false;
			updateActions(index);
		},
		onCancelEdit:function(index,row){
			row.editing = false;
			updateActions(index);
		}
	});
});
function updateActions(index){
	$('#dg').datagrid('updateRow',{
		index: index,
		row:{}
	});
}