# CSS
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
<style>
	body {
		font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
		font-size:12px;
	}
	div.tab {
		height: 50px;
		width: 100%;
		margin: 0 0 1px 0;
	}
	#nav2 {
		height: 0px;
		width: 100%;
	}
	#header {
		height:15%;
		width: 100%;
		margin:0 0 10px 0; 
		float:left;
		font-size:12px;
		border-bottom:1px solid #DDDDDD;
	}
	#left {
		height:500px;
		width: 25%;
		background-color: #E5EECC;
		margin:0 0 10px 0;
		float:left;
	}
	#right {
		height:500px;
		width:75%;
		background-color:#8FCD7E;
		margin:0 0 10px 0;
		float:right;
		position:relative;
		left:5px;
	}
	#footer {
		height:100px;
		width:100%;
		background-color: #96B97D;
		float:left;
	}
	
	div.tab button {
		height:40px;
		display:block;
		position:relative;
		float:left;
		text-align: center;
		text-decoration: none;
		line-height: 40px;
		padding: 0px 10px 0px 10px;
		color: #337AB7;
		border: none;
	}
	.tablinks:active {
		border:1px solid #9DBFF6;
		color:#23527C;
	}
	
	.tablinks:hover {
		background-color: #EEEEEE;
		border-radius: 5px 5px 0 0;
		border-bottom: 0.05em solid #DDDDDD;
		color:#2352A1;
	}
	.tablinks.active {
		border-radius: 5px 5px 0 0;
		border-top:1px solid #DDDDDD;
    	border-right:1px solid #DDDDDD;
    	border-left:1px solid #DDDDDD;
		color:black;
		background-color: white;
		border-bottom:none;
	}
	.btn-info {
		background-color:#5BC0DE;
		height: 35px;
		border: none;
		border-radius: 4px;
		text-align: center;
		color: white;
		padding:0 20px 0 20px;
	}
	.btn-info:hover {
		background-color:#31B0D5;
	}

</style>
</head>

<body>
	<div id="header">
		<div class="tab">
			<button onclick="open(event,'extent-t')" class="tablinks">Extent | Zoom</button>
			<button onclick="open(event,'shape-t')" class="tablinks">Draw Shape</button>
			<button onclick="open(event,'symbol-t')" class="tablinks" id="defaultOpen">Draw Symbol</button>
			<button onclick="open(event,'pin-t')" class="tablinks">Draw Pin</button>
			<button onclick="open(event,'shapes-t')" class="tablinks">WKT Shapes</button>
			<button onclick="open(event,'controls-t')" class="tablinks">Controls Visibility</button>
			<button onclick="open(event,'gps-t')" class="tablinks">GPS</button>
			<button onclick="open(event,'oyhers-t')" class="tablinks">Others</button>
		</div>
		<div id="nav2"></div>
		<div id="extent-t" class="tabcontent">
			<button class="btn-info">Zoom to all shapes</button>
			<select></select>
			<button class="btn-info">Set zoom and center</button>
			<input>
			<button class="btn-info">Set extent</button>
		</div>
		<div id="shape-t"></div>
		<div id="symbol-t"></div>
		<div id="pin-t"></div>
		<div id="shapes-t"></div>
		<div id="controls-t"></div>
		<div id="gps-t"></div>
		<div id="others-t"></div>
		
	 </div>
	<script>
		function openCity(evt, cityName) {
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablinks");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" active", "");
			}
			document.getElementById(cityName).style.display = "block";
			evt.currentTarget.className += " active";
		}
		document.getElementById("defaultOpen").click();
	</script>
	<div id="main">
		<div id="left"></div>
		<div id="right"></div>
	</div>
	
	<div id="footer"></div>
</body>
</html>
