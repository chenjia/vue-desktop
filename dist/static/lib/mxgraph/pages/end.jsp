<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>结束</title>
</head>
<body>
	<form id="endConfigForm">
		<table class="workflow-config-table" width="100%">
			<tr height="50">
				<td width="35%" align="right">
					<label for="ec_label"><span class="required">*</span>节点名称：</label>
				</td>
				<td width="65%">
					<input id="ec_label" name="label" data-options="required:true,tipPosition:'left',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
				</td>
			</tr>
		</table>
	</form>
	<script type="text/javascript">
		function endPropertyInit(cell){
			var xmlObj = cell.getValue().attributes;
			var obj = {};
			for (var j = 0; j < xmlObj.length; j++) {
				var attr = xmlObj.item(j);
				obj[attr.nodeName] = attr.nodeValue;
			}
			$('#endConfigForm').form('load',obj);
		}
		
		function endPropertyUpdate(cell){
			cell.setAttribute('label',$('#ec_label').val());
		}
	</script>
</body>
</html>