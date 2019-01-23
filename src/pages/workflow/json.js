export const workflowProperties = [{
  group:'基本配置',
  label:'流程名称',
  value:''
},{
  group:'基本配置',
  label:'流程key',
  value:''
},{
  group:'权限配置',
  label:'权限配置',
  value:''
},{
  group:'权限配置',
  label:'状态',
  value:'已发布'
}]

export const graphNodes = [{
  label:'开始',
  type:'start'
},{
  label:'任务',
  type:'task'
},{
  label:'结束',
  type:'end'
},{
  label:'异常',
  type:'error'
}]

export const initGraph = function(){
  graph.setConnectable(true);
  graph.setAutoSizeCells(true);
  graph.graphHandler.guidesEnabled = true;
  
  var oldGetPreferredSizeForCell = graph.getPreferredSizeForCell;
  graph.getPreferredSizeForCell = function(cell){
    var result = oldGetPreferredSizeForCell.apply(this, arguments);
    if (result != null){
      var label = cell.getAttribute('label');
      function cLength(str){
        var array = [0,0];
        var len = 0;
        for ( var i = 0; i < str.length; i++) {
          var a = str.charAt(i);
          if (a.match(/[^\x00-\xff]/ig) != null) {
            array[0] += 1;
          } else {
            array[1] += 1;
          }
        }
        return array;
      } 
      var lengthArray = cLength(label);
      var extWidth = lengthArray[0]*15.5+lengthArray[1]*8.2;
      result.width = Math.max(96, 36+extWidth);
    }
    return result;
  };
  
  graph.addListener(mxEvent.LABEL_CHANGED, function(sender, evt){
    var cell = evt.getProperty('cell');
    showProperties(cell);
    var isVertex = graph.model.isVertex(cell);
    if(isVertex){
      if(!cell.getAttribute('isSymbol')){
        var edges = cell.edges;
        for(var i in edges){
          var edge = edges[i];
          if(edge.target == cell){
            edge.setAttribute('label','to '+cell.getAttribute('label'));
          }
        }
        var model = graph.getModel();
        var size = graph.getPreferredSizeForCell(cell);
        var geometry = model.getGeometry(cell);
        geometry.width = size.width;
        geometry.height = size.height;
      }
    }
  });
  
  graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt){
    var edge = evt.getProperty('edge');
    var source = evt.getProperty('source');
    var terminal = evt.getProperty('terminal');
    if(!source && terminal){
      edge.setAttribute('label','to '+terminal.getAttribute('label'));
    }
  });
  graph.selectionModel.addListener(mxEvent.CHANGE, function(sender, evt){
    // var added = evt.getProperty('added');
    // var removed = evt.getProperty('removed');
    // var propertyPanel = $('#eastPanel');
    // var model = graph.getModel();
    // model.beginUpdate();
    // try{
    //   var workflow = editor.graph.model.getCell(0);
    //   if($('#wc_workflowKey')[0]){
    //     workflowPropertyUpdate(workflow);
    //   }
    //   if(added.length==1){
    //     eval(added[0].getAttribute('nodeType')+'PropertyUpdate(added[0])');
    //   }
    //   if(removed && removed.length==1){
    //     propertyPanel.panel('options').onLoad = function(){showProperties(removed[0]);};
    //     var nodeType = removed[0].getAttribute('nodeType');
    //     if(nodeType){
    //       propertyPanel.panel('setTitle',removed[0].getAttribute('propertyTitle'));
    //       propertyPanel.panel('refresh','../../../ext/mxgraph/pages/'+nodeType+'.jsp');
    //     }
    //   }else{
    //     propertyPanel.panel('options').onLoad = function(){showProperties(workflow);};
    //     propertyPanel.panel('setTitle',workflow.getAttribute('propertyTitle'));
    //     propertyPanel.panel('refresh','../../../ext/mxgraph/pages/workflow.jsp');
    //     curCell = workflow;
    //   }
    //   graph.refresh();
    // }catch(e){
    //   alert(e);
    // }finally{
    //   model.endUpdate();
    // }
  });
  
  // new mxOutline(graph, $('#outline')[0]);
  
  // workflowId = $.getParam('workflowId');
  // if(workflowId){
  //   $.ajax({
  //     dataType:'xml',
  //     url:contextPath+'/workflow!getGraphXml.action',
  //     data:{'param.workflowId':workflowId},
  //     success:function(data){
  //       editor.readGraphModel(data.documentElement);
  //       showProperties(editor.graph.model.getCell(0));
  //     },
  //     error:function(){
  //       alert('流程数据加载失败！');
  //     }
  //   });
  // }
}

export const initToolbar = function(){
  var start = editor.getTemplate('start');
  var end = editor.getTemplate('end');
  var error = editor.getTemplate('error');
  var task = editor.getTemplate('task');
  
  var nodes = document.querySelectorAll('.graphElement');

  var mxCells = [
    new mxCell(start.value, start.geometry, start.style),
    new mxCell(task.value, task.geometry, task.style),
    new mxCell(end.value, end.geometry, end.style),
    new mxCell(error.value, error.geometry, error.style)
  ];
  
  var installDrag = function(index){
    var cells = [mxCells[index]];
    cells[0].vertex = true;
    
    var funct = function(graph, evt, target, x, y){
      cells = graph.getImportableCells(cells);
      if (cells.length > 0){
        var validDropTarget = (target != null)?graph.isValidDropTarget(target, cells, evt) : false;
        var select = null;
        if (target != null && !validDropTarget && graph.getModel().getChildCount(target) == 0 && graph.getModel().isVertex(target) == cells[0].vertex){
          graph.getModel().setStyle(target, style);
          select = [target];
        }else{
          if (target != null && !validDropTarget){
            target = null;
          }
          if (graph.isSplitEnabled() && graph.isSplitTarget(target, cells, evt)){
            graph.splitEdge(target, cells, null, x, y);
            select = cells;
          }else{
            cells = graph.getImportableCells(cells);
            if (cells.length > 0){
              select = graph.importCells(cells, x, y, target);
            }
          }
        }
        
        if (select != null && select.length > 0){
          graph.scrollCellToVisible(select[0]);
          graph.setSelectionCells(select);
        }
      }
    };

    var dragPreview = document.createElement('div');
    dragPreview.className = 'drop-no';
    dragPreview.innerHTML = '<img src="'+nodes[index].src+'" width="48" height="48"/><div class="icon-drop"></div>'
    var ds = mxUtils.makeDraggable(nodes[index], graph, funct, dragPreview, -5, -5,graph.autoscroll, true,true);
    var graphContainer = document.querySelector('.graph-container')
    ds.dragEnter = function(){
      document.querySelector('.drop-no').className = 'drop-yes'
    };
    ds.dragExit = function(){
      document.querySelector('.drop-yes').className = 'drop-no'
    };
  };
  
  for(var i=0;i<mxCells.length;i++){
    installDrag(i);
  }
}