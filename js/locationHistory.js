$(document).ready(function() {
	$.ajax({
		type: "GET",
        url : "https://script.google.com/macros/s/AKfycbyU8GSUExQma8iaXt4mhA_Z7yG1U-mKxhLC8d_89pFO_nbyrthN0bn5VZfzy3ASF7r_/exec",
		data: {
			"cmd" : "get"
		},
        success : function(rows) {
			setLocationHistoryTitle();
			setLocationHistoryContents(rows);
		}
	});
});

function setLocationHistoryTitle() {
	$("#locationHistory").append($('<tr/>')
		.append($('<th/>', { html : '시각' }))
		.append($('<th/>', { html : '위도' }))
		.append($('<th/>', { html : '경도' }))
		.append($('<th/>', { html : '지도' }))
	);
}

function setLocationHistoryContents(rows) {
	rows.reverse();
	for (var row of rows) {
		$("#locationHistory").append($('<tr/>', {})
			.append($('<td/>', { html : row['timestamp'], align : 'center' }))
			.append($('<td/>', { html : getSummaryLocation(row['latitude']) }))
			.append($('<td/>', { html : getSummaryLocation(row['longitude']) }))
			.append($('<td/>', { align : 'center', html : 
				$('<button/>', {
					class : 'btn btn-success',
					style : 'height : 20px; line-height : 8px;',
					onclick : "javascript:openMap(" + row['latitude'] + ", " + row['longitude'] + ");",
					text : '확인'
				})
			}))
		);
	}
}

function getSummaryLocation(value) {
	return value.substring(0, value.indexOf('.') + 4);
}

function openMap(latitude, longitude) {
	if (latitude == null || longitude == null)
		return;
	location.href = 'https://m.map.naver.com?lat=' + latitude + '&lng=' + longitude;
}
