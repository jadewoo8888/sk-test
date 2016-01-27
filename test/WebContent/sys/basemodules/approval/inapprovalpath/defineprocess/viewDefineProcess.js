$(function(){
	
	init();
});

//初始化
function init(){

	Ajax.service('InApprovalProcessBO','findById',[pk],
			function(result){
		      
		     $.each(result,function(id,value){
		    	 $("#"+id).val(value);

		    	 if(id=='isCanPoint'){
		    		
		    		 switch (value) {
					case '1':
						
						$("#"+id).val("单选");
						break;
					case '2':
						$("#"+id).val("多选");
						break;
					default:
						$("#"+id).val("否");
						break;
					}
		    	 } if( id=='isCanNode' || id=='isCanReadAll' || id=='isCanEnd'||id=='isNotOpinion'){

		    		 switch (value) {
					case '1':
						
						$("#"+id).val("是");
						break;
					default:
					       
						$("#"+id).val("否");
						break;
					}
		    	 } if(id=='pdBeCanApproveUnAgree'){
		    		 switch (value) {
					case '1':
						$("#"+id).val("退回到上一审批人");
						break;
					case '2':
						$("#"+id).val("退回到申请人");
						break;
					case '3':
						$("#"+id).val("结束审批");
						break;
					case '4':
						$("#"+id).val("退回到指定节点");
						break;	
					case '5':
						$("#"+id).val("继续下一级审批");
						break;
					default:
						$("#"+id).val("否");
						break;
					}
		    	 } if(id=='approvalRole'){
		    		 switch (value) {
					case '1':
						$("#"+id).val("经办人");
						break;
					case '2':
						$("#"+id).val("审核人");
						break;
					case '3':
						$("#"+id).val("核准人");
						break;
					default:
						$("#"+id).val("否");
						break;
					}
		    	 }if(id=='nextCondition'){
		    	     switch (value) {
					case '1':
						$("#"+id).val("End");
						break;
					case '2':
						$("#"+id).val("Other");
						break;
					default:
						$("#"+id).val("NoCondition");
						break;
					}
		    	 }else{
		    		 
		    	 }
		     });
		
	});
}