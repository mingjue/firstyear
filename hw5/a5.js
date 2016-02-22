//read the data
var obj;
function clickFun(){
	Readata();
	me();
}
function Readata(){
	$.ajax({
		type:"POST",
		url:"data.json",
		data:"json",
		async:false,
		success:function(output){
			obj = $.parseJSON(output);
		}
	});
}
//get the json data


function me(){
	var count = 0;
	for(var i = 0; i<obj.length;i++){
		if(obj[i].level == "0")
		{
			var id = obj[i].id;
			$("#level1").append("<div style = \"background-color :hsl(" + count*120+",100%,40%)\" onclick = \"addLevel("+id+")\">" + obj[i].value +"</div>");
			$("#level1 div").css("height","100px");
			count++;
		}
	}
}

function addLevel(pid){
	var level = 0;
	for (var i = 0; i < obj.length; i++) {
		var checkId = obj[i].father;
		if(checkId == pid){
			level = obj[i].level;
			break;
		}
	}
	remove(level);
	for (var i = 0; i < obj.length; i++) {
		if(obj[i].father == pid){
			var id = obj[i].id;
			switch(obj[i].level){

			case "2":
			$("#col2").append("<div onclick = \"addLevel("+id+")\">" + obj[i].value +"</div>");
			break;

			case "3" :
			$("#col3").append("<div onclick = \"addLevel("+id+")\">" + obj[i].value +"</div>");

			break;

			case "4":
			$("#col4").append("<div onclick = \"addLevel("+id+")\">" + obj[i].value +"</div>");
			break;

			case "5":
			$("#col5").append("<div onclick = \"addLevel("+id+")\">" + obj[i].value +"</div>");
			break;

			default:
			}
		}
	}
}

function remove(level){
			switch(level){
			case '2':
			$("#col2 div").remove();
			$("#col3 div").remove();
			$("#col4 div").remove();
			$("#col5 div").remove();
			break;
			case '3':
			$("#col3 div").remove();
			$("#col4 div").remove();
			$("#col5 div").remove();
			break;

			case '4':
			$("#col4 div").remove();
			$("#col5 div").remove();
			break;

			case '5':
			$("#col5 div").remove();
			break;
			default:
			}
		}

