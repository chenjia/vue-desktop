<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>开始</title>
</head>
<body>
	<form id="startConfigForm">
		<table class="workflow-config-table" width="100%">
			<tr height="50">
				<td width="35%" align="right">
					<label for="sc_label"><span class="required">*</span>节点名称：</label>
				</td>
				<td width="65%">
					<input id="sc_label" name="label" data-options="required:true,tipPosition:'left',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
				</td>
			</tr>
		</table>
	</form>
	<script type="text/javascript">
		function startPropertyInit(cell){
			var xmlObj = cell.getValue().attributes;
			var obj = {};
			for (var j = 0; j < xmlObj.length; j++) {
				var attr = xmlObj.item(j);
				obj[attr.nodeName] = attr.nodeValue;
			}
			$('#startConfigForm').form('load',obj);
		}
		
		function startPropertyUpdate(cell){
			cell.setAttribute('label',$('#sc_label').val());
		}
	</script>
</body>
</html>