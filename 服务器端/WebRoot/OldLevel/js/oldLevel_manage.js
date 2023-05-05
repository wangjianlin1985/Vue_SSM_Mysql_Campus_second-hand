var oldLevel_manage_tool = null; 
$(function () { 
	initOldLevelManageTool(); //建立OldLevel管理对象
	oldLevel_manage_tool.init(); //如果需要通过下拉框查询，首先初始化下拉框的值
	$("#oldLevel_manage").datagrid({
		url : 'OldLevel/list',
		fit : true,
		fitColumns : true,
		striped : true,
		rownumbers : true,
		border : false,
		pagination : true,
		pageSize : 5,
		pageList : [5, 10, 15, 20, 25],
		pageNumber : 1,
		sortName : "levelId",
		sortOrder : "desc",
		toolbar : "#oldLevel_manage_tool",
		columns : [[
			{
				field : "levelId",
				title : "新旧程度id",
				width : 70,
			},
			{
				field : "levelName",
				title : "新旧程度名称",
				width : 140,
			},
		]],
	});

	$("#oldLevelEditDiv").dialog({
		title : "修改管理",
		top: "50px",
		width : 700,
		height : 515,
		modal : true,
		closed : true,
		iconCls : "icon-edit-new",
		buttons : [{
			text : "提交",
			iconCls : "icon-edit-new",
			handler : function () {
				if ($("#oldLevelEditForm").form("validate")) {
					//验证表单 
					if(!$("#oldLevelEditForm").form("validate")) {
						$.messager.alert("错误提示","你输入的信息还有错误！","warning");
					} else {
						$("#oldLevelEditForm").form({
						    url:"OldLevel/" + $("#oldLevel_levelId_edit").val() + "/update",
						    onSubmit: function(){
								if($("#oldLevelEditForm").form("validate"))  {
				                	$.messager.progress({
										text : "正在提交数据中...",
									});
				                	return true;
				                } else { 
				                    return false; 
				                }
						    },
						    success:function(data){
						    	$.messager.progress("close");
						    	console.log(data);
			                	var obj = jQuery.parseJSON(data);
			                    if(obj.success){
			                        $.messager.alert("消息","信息修改成功！");
			                        $("#oldLevelEditDiv").dialog("close");
			                        oldLevel_manage_tool.reload();
			                    }else{
			                        $.messager.alert("消息",obj.message);
			                    } 
						    }
						});
						//提交表单
						$("#oldLevelEditForm").submit();
					}
				}
			},
		},{
			text : "取消",
			iconCls : "icon-redo",
			handler : function () {
				$("#oldLevelEditDiv").dialog("close");
				$("#oldLevelEditForm").form("reset"); 
			},
		}],
	});
});

function initOldLevelManageTool() {
	oldLevel_manage_tool = {
		init: function() {
		},
		reload : function () {
			$("#oldLevel_manage").datagrid("reload");
		},
		redo : function () {
			$("#oldLevel_manage").datagrid("unselectAll");
		},
		search: function() {
			$("#oldLevel_manage").datagrid("load");
		},
		exportExcel: function() {
			$("#oldLevelQueryForm").form({
			    url:"OldLevel/OutToExcel",
			});
			//提交表单
			$("#oldLevelQueryForm").submit();
		},
		remove : function () {
			var rows = $("#oldLevel_manage").datagrid("getSelections");
			if (rows.length > 0) {
				$.messager.confirm("确定操作", "您正在要删除所选的记录吗？", function (flag) {
					if (flag) {
						var levelIds = [];
						for (var i = 0; i < rows.length; i ++) {
							levelIds.push(rows[i].levelId);
						}
						$.ajax({
							type : "POST",
							url : "OldLevel/deletes",
							data : {
								levelIds : levelIds.join(","),
							},
							beforeSend : function () {
								$("#oldLevel_manage").datagrid("loading");
							},
							success : function (data) {
								if (data.success) {
									$("#oldLevel_manage").datagrid("loaded");
									$("#oldLevel_manage").datagrid("load");
									$("#oldLevel_manage").datagrid("unselectAll");
									$.messager.show({
										title : "提示",
										msg : data.message
									});
								} else {
									$("#oldLevel_manage").datagrid("loaded");
									$("#oldLevel_manage").datagrid("load");
									$("#oldLevel_manage").datagrid("unselectAll");
									$.messager.alert("消息",data.message);
								}
							},
						});
					}
				});
			} else {
				$.messager.alert("提示", "请选择要删除的记录！", "info");
			}
		},
		edit : function () {
			var rows = $("#oldLevel_manage").datagrid("getSelections");
			if (rows.length > 1) {
				$.messager.alert("警告操作！", "编辑记录只能选定一条数据！", "warning");
			} else if (rows.length == 1) {
				$.ajax({
					url : "OldLevel/" + rows[0].levelId +  "/update",
					type : "get",
					data : {
						//levelId : rows[0].levelId,
					},
					beforeSend : function () {
						$.messager.progress({
							text : "正在获取中...",
						});
					},
					success : function (oldLevel, response, status) {
						$.messager.progress("close");
						if (oldLevel) { 
							$("#oldLevelEditDiv").dialog("open");
							$("#oldLevel_levelId_edit").val(oldLevel.levelId);
							$("#oldLevel_levelId_edit").validatebox({
								required : true,
								missingMessage : "请输入新旧程度id",
								editable: false
							});
							$("#oldLevel_levelName_edit").val(oldLevel.levelName);
							$("#oldLevel_levelName_edit").validatebox({
								required : true,
								missingMessage : "请输入新旧程度名称",
							});
						} else {
							$.messager.alert("获取失败！", "未知错误导致失败，请重试！", "warning");
						}
					}
				});
			} else if (rows.length == 0) {
				$.messager.alert("警告操作！", "编辑记录至少选定一条数据！", "warning");
			}
		},
	};
}
