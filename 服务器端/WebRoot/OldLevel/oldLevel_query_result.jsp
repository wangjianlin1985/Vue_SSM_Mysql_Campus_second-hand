<%@ page language="java"  contentType="text/html;charset=UTF-8"%>
<jsp:include page="../check_logstate.jsp"/> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/oldLevel.css" /> 

<div id="oldLevel_manage"></div>
<div id="oldLevel_manage_tool" style="padding:5px;">
	<div style="margin-bottom:5px;">
		<a href="#" class="easyui-linkbutton" iconCls="icon-edit-new" plain="true" onclick="oldLevel_manage_tool.edit();">修改</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-delete-new" plain="true" onclick="oldLevel_manage_tool.remove();">删除</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-reload" plain="true"  onclick="oldLevel_manage_tool.reload();">刷新</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-redo" plain="true" onclick="oldLevel_manage_tool.redo();">取消选择</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-export" plain="true" onclick="oldLevel_manage_tool.exportExcel();">导出到excel</a>
	</div>
	<div style="padding:0 0 0 7px;color:#333;">
		<form id="oldLevelQueryForm" method="post">
		</form>	
	</div>
</div>

<div id="oldLevelEditDiv">
	<form id="oldLevelEditForm" enctype="multipart/form-data"  method="post">
		<div>
			<span class="label">新旧程度id:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="oldLevel_levelId_edit" name="oldLevel.levelId" style="width:200px" />
			</span>
		</div>
		<div>
			<span class="label">新旧程度名称:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="oldLevel_levelName_edit" name="oldLevel.levelName" style="width:200px" />

			</span>

		</div>
	</form>
</div>
<script type="text/javascript" src="OldLevel/js/oldLevel_manage.js"></script> 
