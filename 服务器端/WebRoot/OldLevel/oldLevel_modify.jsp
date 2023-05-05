<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<jsp:include page="../check_logstate.jsp"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/oldLevel.css" />
<div id="oldLevel_editDiv">
	<form id="oldLevelEditForm" enctype="multipart/form-data"  method="post">
		<div>
			<span class="label">新旧程度id:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="oldLevel_levelId_edit" name="oldLevel.levelId" value="<%=request.getParameter("levelId") %>" style="width:200px" />
			</span>
		</div>

		<div>
			<span class="label">新旧程度名称:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="oldLevel_levelName_edit" name="oldLevel.levelName" style="width:200px" />

			</span>

		</div>
		<div class="operation">
			<a id="oldLevelModifyButton" class="easyui-linkbutton">更新</a> 
		</div>
	</form>
</div>
<script src="${pageContext.request.contextPath}/OldLevel/js/oldLevel_modify.js"></script> 
