$(document).ready(function() {
	$('#locationBtn').on('click', function() {
		if (!navigator.geolocation) {
			alert("지원하지 않는 브라우저 입니다.");
			return;
		}
		navigator.geolocation.getCurrentPosition (function(pos) {
			var latitude = pos.coords.latitude; // 위도
			var longitude = pos.coords.longitude; // 경도
			addLocation(latitude, longitude);
		});
	});
});

function addLocation(latitude, longitude) {
	$.ajax({
		type : "GET",
        	url : "https://script.google.com/macros/s/AKfycbyU8GSUExQma8iaXt4mhA_Z7yG1U-mKxhLC8d_89pFO_nbyrthN0bn5VZfzy3ASF7r_/exec",
		data : {
            		"cmd" : "add",
			"timestamp" : getDateTime(),
			"latitude" : latitude,
			"longitude" : longitude,
			"agent" : navigator.userAgent.toLowerCase()
		},
		complete : function() {
			openMap(latitude, longitude);
		}
	});
}

function getDateTime() {
	var date = new Date();
	var year = getNumberStr(date.getFullYear());
	var month = getNumberStr(date.getMonth() + 1);
	var day = getNumberStr(date.getDate());
	var hour = getNumberStr(date.getHours());
	var minute = getNumberStr(date.getMinutes());
	var second = getNumberStr(date.getSeconds());
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function getNumberStr(number) {
	if (number < 10)
		return "0" + number;
	return number;
}

function openMap(latitude, longitude) {
	if (latitude == null || longitude == null)
		return;
	open('https://m.map.naver.com?lat=' + latitude + '&lng=' + longitude);
}
