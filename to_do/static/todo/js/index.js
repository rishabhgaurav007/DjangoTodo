$(document).on("ready", function(){
			//function to get the csrf token which is to be attached as header to the ajax request
			function getCookie(c_name) {
				if(document.cookie.length > 0) {
					c_start = document.cookie.indexOf(c_name + "=");
					if(c_start != -1) {
						c_start = c_start + c_name.length + 1;
						c_end = document.cookie.indexOf(";", c_start);
						if(c_end == -1) c_end = document.cookie.length;
						return unescape(document.cookie.substring(c_start,c_end));
					}
				}
				return "";
			}
			function csrfSafeMethod(method) {
				// these HTTP methods do not require CSRF protection
				return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
			}
			$(".add_btn").click(function(e){
				var text = document.getElementById("id_text").value;
				var csrftoken = getCookie('csrftoken');
				$.ajax({
					url: 'add',
					data : {
						'text': text,
					},
					type: 'post',
					cache: false,
					beforeSend: function(xhr, settings){
						console.log("sending");
						if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
							xhr.setRequestHeader("X-CSRFToken", csrftoken);
						}
					},
					success: function(data){
						console.log("added");
						$("#todo_list").load(" #todo_list");
					}
				});
			});

			$(".delete_comp").click(function(e){
				var csrftoken = getCookie('csrftoken');
				$.ajax({
					url: 'deletecomplete',
					cache: false,
					beforeSend: function(xhr, settings){
						console.log("deleting");
						if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
							xhr.setRequestHeader("X-CSRFToken", csrftoken);
						}
					},
					success: function(data){
						console.log("added");
						$("#todo_list").load(" #todo_list");
					}
				});
			});

			$(".delete_all").click(function(e){
				var csrftoken = getCookie('csrftoken');
				$.ajax({
					url: 'deleteall',
					cache: false,
					beforeSend: function(xhr, settings){
						console.log("deleting");
						if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
							xhr.setRequestHeader("X-CSRFToken", csrftoken);
						}
					},
					success: function(data){
						console.log("added");
						$("#todo_list").load(" #todo_list");
					}
				});
			});
		});