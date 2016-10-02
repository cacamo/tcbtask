var cityTab = document.getElementsByClassName("top_sp2")[0];//切换城市
var city = document.getElementsByClassName("city")[0];//城市框
var city_colse = document.getElementsByClassName("city_colse")[0];//关闭切换城市框
cityTab.onclick = function(){
	city.style.display = "block";
}
city_colse.onclick = function(e){
	e.stopPropagation();
	city.style.display = "none";
}

// 客户服务
var p_elem = document.getElementsByClassName("li_p1")[0];
var li_elem = document.getElementsByClassName("li5")[0];
li_elem.onmouseover = function(){
	p_elem.style.display = "block";
}
li_elem.onmouseout = function(){
	p_elem.style.display = "none";
}
//轮播
var lunbo_content = document.getElementsByClassName("lunbo_content")[0];
var ctrl_item = document.getElementsByClassName("ctrl_item");
//console.log(ctrl_item);
var start = 0;
var index = 1;
setTimeout(function(){lunbo_content.time = setInterval(move,1)},3000);
function move(){
	start -= 10;
	if (start % 1200 == 0 || start == 0) {
		clearInterval(lunbo_content.time);
		for(var j=0;j<ctrl_item.length;j++){
				ctrl_item[j].style.background="#fff";
			}	
			ctrl_item[index].style.background="#333";

			index++;

			if(index==ctrl_item.length){
				index=0;
		}
		setTimeout(function(){
			lunbo_content.time = setInterval(move,1);
				//index++;
				
					//
		},3000)
		if (start == -4800) {
			start = 0;
		}
	}
	lunbo_content.style.left = start + "px";
}


// 进入店铺
var list_item = document.getElementsByClassName("list_item");
for(var i = 0;i < list_item.length;i++){
	list_item[i].onmouseover = a_block;
	list_item[i].onmouseout = a_none;
}
function a_block(){
	this.childNodes[7].style.display = "block";
}
function a_none(){
	this.childNodes[7].style.display = "none";
}

//地图
var map_btn = document.getElementsByClassName("map_div")[0];
var map = document.getElementById("gdMap");
var close_map = document.getElementsByClassName("close_map")[0];
var model = document.getElementById("model");
var mapContent = document.getElementById("map_content");
var mapaPage = mapContent.getElementsByTagName("a");
close_map.onclick = function(){
	map.style.display = "none";
	model.style.display = "none";
}

//var baseUrl = "http://10.3.156.242:8080/myapp/data/1.json";
var listItem = document.getElementsByClassName("list_item");


var mapLatitude = new Array();
var mapLongitude = new Array();
var mapshopname = new Array();
var mapmain = new Array();
var mapaddr = new Array();
var mapshopaddr = new Array();
var shoppic = new Array();
var shopscore = new Array();
var x,y,star=0;
var num = 1;
var n=0;
	
window.onload = function(){
	 $.getJSON("http://10.3.156.242:3300/datas/1?callback=?",mapJsonp);

}
			
		$(document).ready(function() {
			 		
			//var baseUrl = "http://10.3.156.242:8080/myapp/data/1.json";
			$(".map_div").on('click',function(e){
				e.preventDefault();
				$("#gdMap").css({"display":"block"});
				$("#model").css({"display":"block"});
				$.getJSON("http://10.3.156.242:3300/datas/1?callback=?",mapJsonp);				

			});	

			$(".page_a").on('click', function(event) {
					event.preventDefault();
					//console.log(marker);
					
					$(".page_a").css("background","white").css("color","#999").css("border","1px solid #d6d6d6");
					$(this).css("background","#FC6621").css("color","white").css("border","1px solid #FC6621");;
					num = $(this).text();
					$.getJSON("http://10.3.156.242:3300/datas/"+ num + "?callback=?",mapJsonp);	


			});
		});		




		function mapJsonp(data){
			var obj = data["shop_data"];
			obj.forEach(function(e,index){

				for(var p in e){
					if(p=="map_latitude"){
						mapLatitude.push(e[p]);					
					}
					if(p=="map_longitude"){
						mapLongitude.push(e[p]);
					}
					if(p=="shop_name"){
						mapshopname.push(e[p]);
					}
					if(p=="main"){
						mapmain.push(e[p]);
					}
					if(p=="addr"){
						mapaddr.push(e[p]);
					}
					if(p=="shop_addr"){
						mapshopaddr.push(e[p]);
					}
					if(p=="shop_ico"){
						shoppic.push(e[p]);

					}
					if(p=="shop_score"){
						shopscore.push(e[p]);
					}
				}		
			});

		obj.forEach(function(elem,index){	
					$(".imgpic").eq(index).attr("src",elem.shop_ico);
					$(".namecont").eq(index).text(elem.shop_name);
					$(".desc").eq(index).text(elem.shop_desc);
					$(".addr").eq(index).text(elem.addr);					
		})


			////////地图
			var map = new AMap.Map('map_content',{
		            resizeEnable: true,
		            zoom: 10,
		            center: [116.39,39.9]
       			});
			
			
			for(var i=0;i<obj.length;i++){
				x = mapLatitude[i];
				y = mapLongitude[i];
				var info = new AMap.InfoWindow({				
					offset:new AMap.Pixel(x,y),
					size:new AMap.Size(230,0)
				});

				marker = new AMap.Marker({
					position:[y,x],
				});
				marker.setMap(map);
				map.setFitView();
				var circle = new AMap.Circle({
					center:[y,x],
					redius:100,
					fillOpacity:0.1,
					fillColor:'#09f',
					strokeColor:'#09f',
					strokeWeight:1

				})
				circle.setMap(map);


				marker.content = '<div class="title">' + mapshopname[i] +'</div><div class="content">主营：'+mapmain[i]+'</div><div class="content">地址：'
				+mapaddr[i]+'</div><div class="footer">进入店铺<a href=\"' +mapshopaddr[i] +'\"></a></div>';
				
				function markerClick(e){
				info.setContent(e.target.content);
				info.open(map,e.target.getPosition());
				}
				marker.on('click',markerClick);
			}	
			setMap(null);
		}

