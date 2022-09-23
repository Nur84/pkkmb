var timer;
    var timer_info;
	var endinfo = 0;
    
	// fungsi untuk merestart progress dan info sync
    function starttimer() {
		endinfo = 0;	
		$("#loading").hide(5);
		
		getMsg();
		getInfo();
		
    }
    
	// fungsi untuk menjalankan proses sinkronisasi
    function start() {
        $('#progress_div').html('');
        $('#progress_div').show();
        $('#progressbar_div').show();
		$('#info_sinkronisasi').html('');
		$('#info_sinkronisasi').hide();
		
        $('.btn_start').attr('disabled', 'disabled');
		starttimer();
		
        $.ajax({
            type: "POST",
            url: 'http://192.168.1.15:8082/sync/start',
            success: function(ret){
				try
				{
					retjson = $.parseJSON(ret);
					msg = retjson.msg;
					if (retjson.status){
						$("#loading").show(5);
						isEnd(msg, retjson.status);
					}else{
						isEnd(ret, '0');
					}
				}catch(e){
					isEnd(ret, '0');
				}
			},
            error: function(obj,err) {
				if(obj.status != 0){
					isEnd(err,0);
				}
			}
        });
    }
	
	// untuk mendapatkan pesan dan prosentase progress selama sinkronisasi berjalan
    var last_msg = '';    
    function getMsg(){
		var iend = endinfo;
		if(iend==1)
			return true;
		
        ajaxurl = "http://192.168.1.15:8082/sync/msg"; 
        $.ajax({
			beforeSend: function(){
				last_msg = last_msg+' . ';
				$("#progress_div").show();
				$("#progress_div").html(last_msg);
			},
            url: ajaxurl,
            success: function(ret){
				try
				{
					retjson = $.parseJSON(ret);
					msg = retjson.msg;
					if (retjson.status != ''){
						
					}else {
						progress(retjson.percent)
						if (msg == '.') {
							last_msg = ' '+last_msg+' ';
							$("#progress_div").html(last_msg);
						}else{
							last_msg = msg;
							$("#progress_div").html(last_msg);
						}
					}
				}catch(e){
					last_msg = ret;
					$("#progress_div").html(last_msg);
				}

                $("#progress_div").scrollTop($("#progress_div")[0].scrollHeight);
				
				getMsg();
            },
            error: function(obj,err) {
				
				getMsg();
            }
        });
    }

	// untuk mengupdate progress bar
	function progress(percent){
		if(percent){
			$("#progressbar").show();
			$("#progressbar").css("width",percent+"%");
			$("#progressbar").html(percent+"%");
		}
	}

	// digunakan ketika sinkronisasi selesai atau berhenti
	function isEnd(msg, status){
		$("#loading").hide(5);			
		$('#progress_div').html('');
		$("#progress_div").hide();
		$("#progressbar_div").hide();
		
		endinfo = 1;
		
		
		if(status=='0' && msg=='_updateversi_'){
			updateVersi();
			return;
		}else if(status=='0' && msg=='_restart_'){
			start();
			return;
		}else if(status=='0' && msg=='_push_'){
			push();
			return;
		}
		
		$('.btn_start').removeAttr('disabled');
		last_msg = '';
		if(status=='0'){
			$("#info_sinkronisasi").attr('class','alert alert-danger');
		}else{
			progress(100);
			$("#info_sinkronisasi").attr('class','alert alert-info');
		}
		$("#info_sinkronisasi").show(20);
		$("#info_sinkronisasi").html(msg);
	}
	
	// fungsi untuk melakukan OTA di sync
	function updateVersi(){
		
        starttimer();
		
        $.ajax({
            type: "POST",
            url: 'http://192.168.1.15:8082/sync/update_versi',
            success: function(ret){
				try
				{
					retjson = $.parseJSON(ret);
					msg = retjson.msg;
					if (retjson.status){
						$("#loading").show(5);
						isEnd(msg, retjson.status);
					}else{
						isEnd(ret, '1');
					}
				}catch(e){
					isEnd(ret, '1');
				}
			},
            error: function(obj,err) {
				if(obj.status != 0){
					isEnd(err,0);
				}
			}
        });
	}
	
	// fungsi untuk mendapat informasi data yang dikirim maupun diambil
	function getInfo(){
		var iend = endinfo;
		
        ajaxurl = "http://192.168.1.15:8082/sync/info"; 
        $.ajax({
			data : {end:iend},
            url: ajaxurl,
            success: function(ret){
				$("#infodata").html(ret);
				
				if(iend!=1){
					getInfo();
				}
            },
            error: function(obj,err) {
				if(iend!=1){
					getInfo();
				}
			}
        });
	}