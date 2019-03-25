<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>任务</title>
</head>
<body>
	<form id="taskConfigForm">
		<div class="easyui-accordion" data-options="fit:true,border:false" >
			<div title="基本信息" data-options="iconCls:'icon-basicinfo'" class="property-form">
				<table class="workflow-config-table" width="100%">
					<tr height="50">
						<td align="right">
							<span class="required">*</span>
							<label for="tc_label">任务名称：</label>
						</td>
						<td width="65%">
							<input id="tc_label" name="label" data-options="required:true,tipPosition:'bottom',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_form">业务表单：</label>
						</td>
						<td>
							<input id="tc_formText" name="formText" value="无表单" data-options="required:true,tipPosition:'bottom',validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
							<input type="hidden" id="tc_form" name="form"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span class="required">*</span>
							<label for="tc_assignerType">参与类型：</label>
						</td>
						<td>
							<select id="tc_assignerType" name="assignerType" style="width:152px;">
								<option value="0">流程发起人</option>
								<option value="1">指定人员</option>
								<option value="2">指定机构</option>
								<option value="3">指定部门</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_assigner">处理人：</label>
						</td>
						<td>
							<input id="tc_assignerText" name="assignerText" readonly="readonly" data-options="validType:'length[0,256]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
							<input id="tc_assignerId" name="assignerId" data-options="validType:'length[0,256]'" class="easyui-validatebox searchbox" type="hidden" maxlength="100"/>
						</td>
					</tr>
					<tr>
						<td align="right" height="80">
							<label for="tc_memo">任务描述：</label>
						</td>
						<td>
							<textarea id="tc_memo" name="memo" data-options="validType:'username[4,32]'" class="easyui-validatebox searchbox" style="width:150px;height:60px;"></textarea>
						</td>
					</tr>
				</table>
			</div>
			<div title="权限" data-options="iconCls:'icon-key'" style="padding:10px;">
				<table class="workflow-config-table" width="100%">
					<tr>
						<td align="right">
							<label for="tc_isTakeback">允许取回：</label>
						</td>
						<td>
							<input type="checkbox" id="tc_isTakeback" name="isTakeback"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_isDelegate">允许委派：</label>
						</td>
						<td>
							<input type="checkbox" id="tc_isDelegate" name="isDelegate"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_isUpload">上传附件：</label>
						</td>
						<td>
							<input type="checkbox" id="tc_isUpload" name="isUpload"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_isAdvice">必填意见：</label>
						</td>
						<td>
							<input type="checkbox" id="tc_isAdvice" name="isAdvice"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_isSendback">允许退回：</label>
						</td>
						<td>
							<input type="checkbox" id="tc_isSendback" name="isSendback"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_sendbackWay">退回方式：</label>
						</td>
						<td>
							<select id="tc_sendbackWay" name="sendbackWay" style="width:152px;">
								<option value="1">退至来源</option>
								<option value="2">退至上一步</option>
								<option value="3">退至历史步骤</option>
								<option value="4">退至指定步骤</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label>退回对象：</label>
						</td>
						<td>
							<input id="tc_sendbackTargetText" readonly="readonly" name="sendbackTargetText" data-options="validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
							<input id="tc_sendbackTargetId" name="sendbackTargetId" type="hidden"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_isCheck">允许传阅：</label>
						</td>
						<td>
							<input type="checkbox" id="tc_isCheck" name="isCheck"/>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label for="tc_checkTarget">传阅对象：</label>
						</td>
						<td>
							<input id="tc_checkTarget" name="checkTarget" data-options="validType:'username[4,32]'" class="easyui-validatebox searchbox" type="text" maxlength="100"/>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</form>
	<script type="text/javascript">
		$('#taskConfigForm').css({height:$(document).height()-35,'overflow-y':'auto'});
		
		$('#tc_assignerType').combobox({
			onChange:function(newValue, oldValue){
				$('#tc_assignerId').val('');
				$('#tc_assignerText').val('');
			},
			onSelect:function(record){
				var value = record.value;
				if(value==0){
					$('#tc_assignerId').val('0');
				}else if(value==1){
					Selector.showUserSelector($('#tc_assignerId'),$('#tc_assignerText'),true);
				}else if(value==2){
					Selector.showOrganizationSelector($('#tc_assignerId'),$('#tc_assignerText'),true);
				}else if(value==3){
					Selector.showDepartmentSelector($('#tc_assignerId'),$('#tc_assignerText'),true);
				}
			}
		});
		
		$('#tc_sendbackWay').combobox({
			onChange:function(newValue, oldValue){
			},
			onSelect:function(record){
				var value = record.value;
				if(value==3){
					
				}else{
					$('#tc_sendbackTarget').val('');
				}
			}
		});
		
		function taskPropertyInit(cell){
			var xmlObj = cell.getValue().attributes;
			var obj = {};
			for (var j = 0; j < xmlObj.length; j++) {
				var attr = xmlObj.item(j);
				obj[attr.nodeName] = attr.nodeValue;
			}
			$('#taskConfigForm').form('load',obj);
			if(obj.isTakeback==1){
				$('#tc_isTakeback').attr('checked','checked');
			}
			if(obj.isDelegate==1){
				$('#tc_isDelegate').attr('checked','checked');
			}
			if(obj.isUpload==1){
				$('#tc_isUpload').attr('checked','checked');
			}
			if(obj.isAdvice==1){
				$('#tc_isAdvice').attr('checked','checked');
			}
			if(obj.isSendback==1){
				$('#tc_isSendback').attr('checked','checked');
				$('#tc_sendbackWay').combo('setValue',obj.sendbackWay);
			}
			Lxt.Selector.formDatagridSelector({valueId:'tc_form',textId:'tc_formText',value:obj.form});
			Selector.remindRuleSelector({id:'tc_remindRule',valueId:'tc_remindRule',textId:'tc_remindRuleText',multiple:false,required:true});
			
		}
		
		function taskPropertyUpdate(cell){
			cell.setAttribute('label',$('#tc_label').val());
			cell.setAttribute('memo',$('#tc_memo').val());
			cell.setAttribute('form',$('#tc_form').val());
			cell.setAttribute('assignerType',$('#tc_assignerType').combo('getValue'));
			cell.setAttribute('assignerId',$('#tc_assignerId').val());
			/*
			cell.setAttribute('remindRuleId',$('#tc_remindRule').val());
			cell.setAttribute('remindRuleText',$('#tc_remindRuleText').val());
			cell.setAttribute('handlerText',$('#tc_handlerText').val());
			var isTakebackValue = $('#tc_isTakeback').attr('checked')=='checked'?1:0;
			var isDelegateValue = $('#tc_isDelegate').attr('checked')=='checked'?1:0;
			var isUploadValue = $('#tc_isUpload').attr('checked')=='checked'?1:0;
			var isAdviceValue = $('#tc_isAdvice').attr('checked')=='checked'?1:0;
			var isSendbackValue = $('#tc_isSendback').attr('checked')=='checked'?1:0;
			var isCheck = $('#tc_isCheck').attr('checked')=='checked'?1:0;
			cell.setAttribute('isTakeback',isTakebackValue);
			cell.setAttribute('isDelegate',isDelegateValue);
			cell.setAttribute('isUpload',isUploadValue);
			cell.setAttribute('isAdvice',isAdviceValue);
			cell.setAttribute('isSendback',isSendbackValue);
			cell.setAttribute('sendbackWay',$('#tc_sendbackWay').combo('getValue'));
			cell.setAttribute('sendbackTargetId',$('#tc_sendbackTargetId').val());
			cell.setAttribute('sendbackTargetText',$('#tc_sendbackTargetText').val());
			cell.setAttribute('isCheck',isCheck);
			cell.setAttribute('checkTarget',$('#tc_checkTarget').val());
			*/
		}
	</script>
</body>
</html>