$(function() {
	var Olist = $('#sec-list');
	var Ofilter = $('#sec-list').find('.filter');
	var Olist = $('#sec-list').find('.list');
	var Acate = Olist.find('.cate');
	var listData = []
	//获取json数据
	$.ajax({
		type: 'GET',
		url: 'json/cate.json',
		dataType: 'json',
		success: function(data) {
			listData = data;
			htmlData(data);
			initFilter();
		}

	});



	//点击按钮触发事件 核心内容
	$('.filter').on('click', "li", function() {
	  $('li').find('a').removeClass('is-active');
	    $(this).find('a').addClass('is-active');
		var switct = $(this).text().trim();
		console.log(switct);
		var newList = []

		for(var i = 0; i < listData.length; i++) {
			
			for(var j = 0; j < listData[i].cate.length; j++) {
				if(listData[i].cate[j] == switct) {
					newList.push(listData[i])
				}
			}
		}
		if(switct == "all") {
			htmlData(listData);
			$('.item').fadeToggle(1000);
		} else {
			htmlData(newList);			
			$('.item').fadeToggle(1000);
		}

	});

	function initFilter() {
		var cateList = [];
		var Call = '<li><a href="#" class="is-active">all</a></li>'; //all按钮
		var tempList = [];
		for(var i = 0; i < listData.length; i++) {
			var Cate = '';
			for(var j = 0; j < listData[i].cate.length; j++) {
				if(tempList.indexOf(listData[i].cate[j]) == -1) {
					tempList.push(listData[i].cate[j]);
					cateList.push('<li><a href="#">' + listData[i].cate[j] + '</a></li>');
				}

			}

		}
		Ofilter.html(Call + cateList);
		$('.item').css("display","block");
	}

	function htmlData(data) {
		if(data.length) {
			var arr = [];
			var jsons = {};
			var Cfilter = '';
			var Call = '';
			var Clist = '';
			//主内容从json中获取

			for(var i = 0; i < data.length; i++) {
				var Cate = '';

				for(var j = 0; j < data[i].cate.length; j++) {

					Cate += '<li>' + data[i].cate[j] + '</li>';
				}

				Clist += '<li class="item">' +
					'<p class="photo"><img src="img/' + data[i].thumb + '" alt=""></p>' +
					'<p class = "title" >' + data[i].title + ' </p>' +
					'<p class = "description" >' + data[i].description + ' </p>' +
					'<ul class="cate">' + Cate + '</ul>' +
					'</li>'
				Olist.html(Clist);
			}
			$('.item').css("display","none");
		}
	}

});