<%@ page language="java" import="java.util.*"  contentType="text/html;charset=UTF-8"%>
<jsp:include page="../check_logstate.jsp"/>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/oldLevel.css" />
<div id="oldLevelAddDiv">
	<form id="oldLevelAddForm" enctype="multipart/form-data"  method="post">
		<div>
			<span class="label">新旧程度名称:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="oldLevel_levelName" name="oldLevel.levelName" style="width:200px" />

			</span>

		</div>
		<div class="operation">
			<a id="oldLevelAddButton" class="easyui-linkbutton">添加</a>
			<a id="oldLevelClearButton" class="easyui-linkbutton">重填</a>
		</div> 
	</form>
</div>
<script src="${pageContext.request.contextPath}/OldLevel/js/oldLevel_add.js"></script> 
