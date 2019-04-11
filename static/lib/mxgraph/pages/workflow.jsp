<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流程配置</title>
</head>
<body>
	<form id="workflowConfigForm">
		<div class="easyui-accordion" data-options="fit:true,border:false" >
			<div title="基本信息" data-options="iconCls:'icon-basicinfo'" class="property-form">
				<table class="workflow-config-table" width="100%">
					<tr>
						<td align="right">
							<span class="required">*</span>
							<label for="wc_workflowKey">流程标识：</label>
						</td>
						<td>
							<input id="wc_workflowKey" name="workflowKey" data-options="required:true,tipPosition:'left',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="required">*</span>
							<label for="wc_name">流程名称：</label>
						</td>
						<td>
							<input id="wc_name" name="label" data-options="required:true,tipPosition:'left',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="required">*</span>
							<label for="wc_version">流程版本：</label>
						</td>
						<td>
							<input id="wc_version" name="version" data-options="required:true,tipPosition:'left',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="required">*</span>
							<label for="wc_status">流程状态：</label>
						</td>
						<td>
							<select id="wc_status" name="status" onblur="formPropertyUpdate();" style="width:152px;">
								<option value="1">开启</option>
								<option value="0">关闭</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="wc_memo">流程描述：</label>
						</td>
						<td>
							<textarea id="wc_memo" name="memo" data-options="validType:'username[4,32]'" class="easyui-validatebox searchbox" style="width:150px;height:60px;"></textarea>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</form>
	<script type="text/javascript">
		function workflowPropertyInit(cell){
			var xmlObj = cell.getValue().attributes;
			var obj = {};
			for (var j = 0; j < xmlObj.length; j++) {
				var attr = xmlObj.item(j);
				obj[attr.nodeName] = attr.nodeValue;
			}
			$('#workflowConfigForm').form('load',obj);
		}
		
		function workflowPropertyUpdate(cell){
			cell.setAttribute('workflowKey',$('#wc_workflowKey').val());
			cell.setAttribute('label',$('#wc_name').val());
			cell.setAttribute('version',$('#wc_version').val());
			cell.setAttribute('status',$('#wc_status').val());
			cell.setAttribute('memo',$('#wc_memo').val());
		}
		$('#workflowConfigForm').css({height:($(document).height()-31)+'px','overflow-y':'auto'});
	</script>
</body>
</html>