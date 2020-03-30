function addLocation() {
	if (!navigator.geolocation) {
		alert("다른 브라우저로 접속해라.");
		return;
	}
	navigator.geolocation.getCurrentPosition (function(pos) {
		var latitude = pos.coords.latitude; // 위도
		var longitude = pos.coords.longitude; // 경도
		$.ajax({
			type: "GET",
			url : "https://script.google.com/macros/s/AKfycbxiuSuCSGmawBUPdmprTqcViQQO0dukeHLLQaqeQjMaJ6D1r4Y/exec",
			data: {
				"timestamp" : getDateTime(),
				"latitude" : latitude,
				"longitude" : longitude,
				"agent" : navigator.userAgent.toLowerCase()
			},
			success : function() {
				setLocation();
			}
		});
	});
}

function getDateTime() {
	var date = new Date();
	return date.getFullYear() + ". " + (date.getMonth() + 1) + ". " + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function setLocation() {
	var key = '1mVzwpD6O_SuX1aX_JQTTCWyYY9NjODfMjV5u1t29e7w';
	var worksheet = '1';
	$.googleSheetToJSON(key, worksheet).done(function(rows) {
		setLocationTitle();
		setLocationContents(rows);
	});
}

function setLocationTitle() {
	$("#location").append($('<tr/>')
		.append($('<th/>', { html : '시각' }))
		.append($('<th/>', { html : '위도' }))
		.append($('<th/>', { html : '경도' }))
	);
}

function setLocationContents(rows) {
	rows.reverse();
	for (var row of rows) {
		if (row['agent'].indexOf(navigator.userAgent.toLowerCase()) > 0)
			continue;
		$("#location").append($('<tr/>')
			.append($('<td/>', { html : row['timestamp'], align : 'center' }))
			.append($('<td/>', { html : row['latitude'] }))
			.append($('<td/>', { html : row['longitude'] }))
		);
	}
}
