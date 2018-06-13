$(function(){
	//左侧拖拽至画布
	var moveTag = '',
		title,
		move = false,
		$canvas = $('.canvas'),
		tarDivPos = {x1: 0, y1: 0, x2: 0, y2: 0},     //目标对象的四个坐标
		initDiv,    //新建的元素
		tagLeft,
		tagTop,
		e = e || window.event,
		attrCotrol = {
			bgpicture:{
		        attrName:'背景图片',
		        attrLabel:'<button class="btn" id="upLoad">上传图片</button>'
		    },
		    showmode:{
		        attrName:'显示模式',
		        attrLabel:'<select class="select" id="bgStatus">'
					+'<option value="1">正常</option>'
					+'<option value="2">拉伸</option>'
					+'<option value="3">平铺</option>'
					+'<option value="4">无图片</option>'
					+'</select>'
		    },
		    bjcolor:{
		        attrName:'正常背景色',
		        attrLabel:'<input type="text" id="i_bjcolor"/>'
		    },
		    bgScroll:{
		        attrName:'背景滚动条',
		        attrLabel:'<select class="select" id="bgScroll">'
						+'<option value="hidden">无</option>'
						+'<option value="auto">有</option>'
					+'</select>'
		    },
		    tagtext:{
		        attrName:'文本',
		        attrLabel:'<input type="text" class="input" id="textVal" />'
		    },
		    deviceid:{
		        attrName:'设备',
		        attrLabel:'<select class="select" id="i_deviceid">'
						+'<option value="">请选择</option>'
					+'</select>'
		    },
		    slaveIndex:{
		        attrName:'从机',
		        attrLabel:'<select class="select" id="i_slaveIndex">'
						+'<option value="">请选择</option>'
					+'</select>'
		    },
		    dataPoint:{
		        attrName:'数据点',
		        attrLabel:'<select class="select" id="i_dataPoint">'
						+'<option value="">请选择</option>'
					+'</select>'
		    },
		    alarmbjcolor:{
		        attrName:'告警背景色',
		        attrLabel:'<input type="text" id="i_alarmbjcolor" />'
		    },
		    devlink:{
		        attrName:'链接地址',
		        attrLabel:'<input type="text" class="input" id="linkVal" />'
		    }
		},
		styleControl = {
			bgSize:{
				attrName:'背景大小',
				attrLabel:'<select class="select" id="bgSize">'
						+'<option value="1">自定义尺寸</option>'
						+'<option value="2">web常用尺寸(1366*768)</option>'
						+'<option value="3">大尺寸(1920*1080)</option>'
						+'<option value="4">中等尺寸(1440*900)</option>'
						+'<option value="5">小尺寸(1024*768)</option>'
					+'</select>'
			},
		    fontFamily:{
		        attrName:'文本字体',
		        attrLabel:'<select id="i_fontFamily" name="fontFamily">'+
		        '<option value="Arial">Arial</option>'+
		        '<option value="Tahoma">Tahoma</option>'+
		        '<option value="Verdana">Verdana</option>'+
		        '<option value="SimSun">宋体</option>'+
		        '<option value="Microsoft Yahei">微软雅黑</option>'+
		        '<option value="STHeiti">华文黑体</option>'+
		        '<option value="Heiti SC">黑体-简</option>'+
		        '<option value="FangSong">仿宋</option>'+
		        '<option value="KaiTi">楷体</option>'+
		        '</select>'
		    },
		    fontWeight:{
		        attrName:'文本粗细',
		        attrLabel:'<select id="i_textWeight" name="fontWeight">'+
		        '<option value="normal">正常</option>'+
		        '<option value="bold">粗体</option>'+
		        '</select>'
		    },
		    fontSize:{
		        attrName:'文本大小',
		        attrLabel:'<input type="text" id="i_fontSize" class="input0" name="fontSize" value="14">px'
			},
			fontColor:{
		        attrName:'文本颜色',
		        attrLabel:'<input type="text" id="i_fontColor" class="input0" name="fontColor">'
		    },
		    textAlign:{
		        attrName:'文本位置',
		        attrLabel:'<select id="i_textAlign" name="textAlign">'+
		        '<option value="0">左上</option>'+
		        '<option value="1">中上</option>'+
		        '<option value="2">右上</option>'+
		        '<option value="3">左中</option>'+
		        '<option value="4">居中</option>'+
		        '<option value="5">右中</option>'+
		        '<option value="6">左下</option>'+
		        '<option value="7">中下</option>'+
		        '<option value="8">右下</option>'+
		        '</select>'
			},
		    textWidth:{
		        attrName:'宽度',
		        attrLabel:'<input type="text" id="i_w" class="input0" name="w">px'
		    },
		    textHeight:{
		        attrName:'高度',
		        attrLabel:'<input type="text" id="i_h" class="input0" name="h">px'
		    },
		    borderWidth:{
		        attrName:'边框宽度',
		        attrLabel:'<input type="text" id="borderWidth" />px'
		    },
		    borderType:{
		        attrName:'边框样式',
		        attrLabel:'<select class="select" id="borderType">'
						+'<option value="solid">实线</option>'
						+'<option value="dashed">虚线</option>'
						+'<option value="dotted">点状线</option>'
					+'</select>'
		    },
		    borderColor:{
		        attrName:'边框颜色',
		        attrLabel:'<input type="text" id="i_bordercolr" />'
		    },
		    borderRadius:{
		        attrName:'圆角',
		        attrLabel:'<input type="text" id="borderRadius" />px'
		    }
		};
	//声明属性样式设置项
	var bgStyle ='<tr><td class="fontTxt i_attrName">'+styleControl.textWidth.attrName+'：</td>'
			+'<td>'+styleControl.textWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textHeight.attrName+'：</td>'
			+'<td>'+styleControl.textHeight.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.bgSize.attrName+'：</td>'
			+'<td>'+styleControl.bgSize.attrLabel+'</td></tr>',
		textAttr = '<tr><td class="fontTxt i_attrName">'+attrCotrol.tagtext.attrName+'：</td>'
			+'<td>'+attrCotrol.tagtext.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.deviceid.attrName+'：</td>'
			+'<td>'+attrCotrol.deviceid.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.slaveIndex.attrName+'：</td>'
			+'<td>'+attrCotrol.slaveIndex.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.dataPoint.attrName+'：</td>'
			+'<td>'+attrCotrol.dataPoint.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
			+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.alarmbjcolor.attrName+'：</td>'
			+'<td>'+attrCotrol.alarmbjcolor.attrLabel+'</td></tr>',
		bgAttr = '<tr><td class="fontTxt i_attrName">'+attrCotrol.bgpicture.attrName+'：</td>'
			+'<td>'+attrCotrol.bgpicture.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.showmode.attrName+'：</td>'
			+'<td>'+attrCotrol.showmode.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
			+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.bgScroll.attrName+'：</td>'
			+'<td>'+attrCotrol.bgScroll.attrLabel+'</td></tr>',
		textStyle = '<tr><td class="fontTxt i_attrName">'+styleControl.fontFamily.attrName+'：</td>'
			+'<td class="fontTxt">'+styleControl.fontFamily.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.fontWeight.attrName+'：</td>'
			+'<td class="fontTxt">'+styleControl.fontWeight.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.fontSize.attrName+'：</td>'
			+'<td class="fontTxt">'+styleControl.fontSize.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName fontColor">'+styleControl.fontColor.attrName+'：</td>'
			+'<td class="fontTxt">'+styleControl.fontColor.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textAlign.attrName+'：</td>'
			+'<td class="fontTxt">'+styleControl.textAlign.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textWidth.attrName+'：</td>'
			+'<td>'+styleControl.textWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textHeight.attrName+'：</td>'
			+'<td>'+styleControl.textHeight.attrLabel+'</td></tr>',
		linkAttr = '<tr><td class="fontTxt i_attrName">'+attrCotrol.tagtext.attrName+'：</td>'
			+'<td>'+attrCotrol.tagtext.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+attrCotrol.devlink.attrName+'：</td>'
			+'<td>'+attrCotrol.devlink.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
			+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>',
		imgStyle = '<tr><td class="fontTxt i_attrName">'+styleControl.textWidth.attrName+'：</td>'
			+'<td>'+styleControl.textWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textHeight.attrName+'：</td>'
			+'<td>'+styleControl.textHeight.attrLabel+'</td></tr>',
		circleStyle = '<tr><td class="fontTxt i_attrName">'+styleControl.borderWidth.attrName+'：</td>'
			+'<td>'+styleControl.borderWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.borderType.attrName+'：</td>'
			+'<td>'+styleControl.borderType.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName bordercolor">'+styleControl.borderColor.attrName+'：</td>'
			+'<td>'+styleControl.borderColor.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textWidth.attrName+'：</td>'
			+'<td>'+styleControl.textWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textHeight.attrName+'：</td>'
			+'<td>'+styleControl.textHeight.attrLabel+'</td></tr>',
		bjColor = '<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
			+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>',
		squareStyle = '<tr><td class="fontTxt i_attrName">'+styleControl.borderRadius.attrName+'：</td>'
			+'<td>'+styleControl.borderRadius.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.borderWidth.attrName+'：</td>'
			+'<td>'+styleControl.borderWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.borderType.attrName+'：</td>'
			+'<td>'+styleControl.borderType.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName bordercolor">'+styleControl.borderColor.attrName+'：</td>'
			+'<td>'+styleControl.borderColor.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textWidth.attrName+'：</td>'
			+'<td>'+styleControl.textWidth.attrLabel+'</td></tr>'
			+'<tr><td class="fontTxt i_attrName">'+styleControl.textHeight.attrName+'：</td>'
			+'<td>'+styleControl.textHeight.attrLabel+'</td></tr>';
	//颜色选择渲染
	function getColor(obj,classNane){
		$(obj).spectrum({
			allowEmpty:true,
			color: "#fff",
			showInput: true,
			containerClassName: classNane,
			showInitial: true,
			showPalette: true,
			showSelectionPalette: true,
			showAlpha: true,
			maxPaletteSize: 10,
			preferredFormat: "hex",
			cancelText: "取消",
			chooseText: "确定"
		});
	}
	//正常背景色
	function normalBgColor(obj,obj1){
		getColor('#i_bjcolor','full-spectrum');
		$('.bjcolor').siblings().find('.sp-preview-inner').css('background-color',$(obj).css('background-color'));
		$('.bjcolor').siblings().find('.sp-preview-inner').css('background-color',$(obj).find(obj1).css('background-color'));
		$('.full-spectrum .sp-choose').on('click',function(){
			if($('.drag-active').length == 0){
				$('.canvas').css('background-color',$('#i_bjcolor').siblings().find('.sp-preview-inner').css('background-color'));
			}else{
				if($('.drag-active').children().hasClass('circle') || $('.drag-active').children().hasClass('square')){
					$('.drag-active .circle').css('background-color',$('#i_bjcolor').siblings().find('.sp-preview-inner').css('background-color'));
					$('.drag-active .square').css('background-color',$('#i_bjcolor').siblings().find('.sp-preview-inner').css('background-color'));
				}else{
					$('.drag-active').css('background-color',$('#i_bjcolor').siblings().find('.sp-preview-inner').css('background-color'));
				}
			}
		})
	}
	//文本颜色
	function textColor(obj){
		getColor('#i_fontColor','styleColor');
		$('.fontColor').siblings().find('.sp-preview-inner').css('background-color',$(obj).find('p').css('color'));
		$('.styleColor .sp-choose').on('click',function(){
			$('.drag-active p').css('color',$('#i_fontColor').siblings().find('.sp-preview-inner').css('background-color'));
		})
	}
	//边框颜色
	function borderColor(obj,obj1){
		getColor('#i_bordercolr','bordercolr-spectrum');
		$('.bordercolor').siblings().find('.sp-preview-inner').css('background-color',$(obj).find(obj1).css('border-color'));
		$('.bordercolr-spectrum .sp-choose').on('click',function(){
			$('.drag-active div').css('border-color',$('#i_bordercolr').siblings().find('.sp-preview-inner').css('background-color'));
		})
	}
	//阻止浏览器的默认事件
	document.body.ondrop = function (event) {  
        event.preventDefault();  
        event.stopPropagation();  
    } 
	$('.tool-li').on('mousedown',function(e){
		if($(this).attr('title') == '文本'){
			moveTag = '<p>文本</p>';
		}else if($(this).attr('title') == '链接'){
			moveTag = '<p>链接</p>';
		}else if($(this).attr('title') == '圆形'){
			moveTag = '<div class="circle"></div>';
		}else if($(this).attr('title') == '矩形'){
			moveTag = '<div class="square"></div>';
		}else if($(this).attr('title') == '指令'){
			moveTag = '<p class="send-btn">发送</p>';
		}else{
			moveTag=$(this).html();
		}
		title = $(this).attr('title');
        move = true;
        return false;
	})
	$(document).mousemove(function(e){
		if (!move) { 
			
		}else {
			//目标对象的四个坐标
			tarDivPos.x1 = $canvas.offset().left;
			tarDivPos.y1 = $canvas.offset().top;
			tarDivPos.x2 = $canvas.offset().left + $canvas.innerWidth();
			tarDivPos.y2 = $canvas.offset().top + $canvas.innerHeight();
			if(e.pageX >= tarDivPos.x1 && e.pageX <= tarDivPos.x2 && e.pageY >= tarDivPos.y1 && e.pageY <= tarDivPos.y2){
				tagLeft = e.pageX - $('.tool-box ').width() - 10;
				tagTop = e.pageY - 100;
				len = $('.drag').length + 100;
				if(title == '文本' || title == '链接'){
					initDiv = '<div class="drag drag-active" data-index="' + len +'" name="' + title +'" style="height:40px; line-height:40px; position: absolute; left:'+tagLeft+'px; top:'+ tagTop +'px; z-index:'+ len +'">'+ moveTag +'</div>';
				}else if(title == '指令'){
					initDiv = '<div class="drag drag-active" data-index="' + len +'" name="' + title +'" style="height:30px; line-height:30px; position: absolute; left:'+tagLeft+'px; top:'+ tagTop +'px; z-index:'+ len +'">'+ moveTag +'</div>';
				}else{
					initDiv = '<div class="drag drag-active" data-index="' + len +'" name="' + title +'" style="height:100px; position: absolute; left:'+tagLeft+'px; top:'+ tagTop +'px; z-index:'+ len +'">'+ moveTag +'</div>';
				}
			}
		}
	}).mouseup(function(e) {
		if(e.pageX >= tarDivPos.x1 && e.pageX <= tarDivPos.x2 && e.pageY >= tarDivPos.y1 && e.pageY <= tarDivPos.y2){
			$canvas.find('.drag').removeClass('drag-active');
			$canvas.append(initDiv);  //拖拽至指定区域
			$('#element').val(title);
			if(title !== ''){
				$('#eleSelect').append("<option data-index='"+ len + "' value='"+ title + "'>" + title + "</option>");
				$('#eleSelect').val(title);
			}
			//控制不同控件显示不同的属性样式设置
			if($('.drag-active').attr('name') == '文本'){
			    $(".attrSetting table").html(textAttr);
			    $(".cssSetting table").html(textStyle);
			    $('#textVal').val('文本');
				$('#i_w').val($('.drag-active').width());
                $('#i_h').val($('.drag-active').height());
                $('#i_textAlign').val(4);
			}else if($('.drag-active').attr('name') == '链接'){
				$(".attrSetting table").html(linkAttr);
			    $(".cssSetting table").html(textStyle);
			    $('#i_w').val($('.drag-active').width());
                $('#i_h').val($('.drag-active').height());
			    $('#textVal').val('链接');
			}else if($('.drag-active').attr('name') == '图片'){
				//属性设置项
				attrStr = '';
		    	$.each(attrCotrol,function(name,item) {
		    		attrStr +='<tr><td class="fontTxt i_attrName">'+item.attrName+'：</td>'+
			        	'<td>'+item.attrLabel+'</td></tr>';
			    	if(name == 'bjcolor'){
			    		return false;
			    	}
			    })
		    	$(".attrSetting table").html(attrStr);
			    $(".cssSetting table").html(imgStyle);
			    $('#i_w').val($('.drag-active').width());
                $('#i_h').val($('.drag-active').height());
			}else if($('.drag-active').attr('name') == '圆形'){
			    $(".attrSetting table").html(bjColor);
			    $(".cssSetting table").html(circleStyle);
			    $('#i_w').val($('.drag-active').width());
                $('#i_h').val($('.drag-active').height());
			}else if($('.drag-active').attr('name') == '矩形'){
			    $(".attrSetting table").html(bjColor);
			    $(".cssSetting table").html(squareStyle);
			    $('#i_w').val($('.drag-active').width());
                $('#i_h').val($('.drag-active').height());
			}else{
				if($('.drag').length > 0){
					attrStr = '';
		    		$(".attrSetting table").html(attrStr);
		    		$(".cssSetting table").html(imgStyle);
		    		$('#i_w').val($('.drag-active').width());
	                $('#i_h').val($('.drag-active').height());
				}
			}
			normalBgColor();  //正常背景色
		    getColor('#i_alarmbjcolor','alarmbjcolor-spectrum');   //告警背景色
			textColor();     //文本颜色
			borderColor();   //边框颜色
			$('#borderRadius').on('change',function(){
				$('.drag-active .square').css('border-radius',$(this).val() + 'px');
			})
			//放大缩小
			$('.drag-active').resizable({
				//拖拽停止后，改变文本宽度高度的值
	            onStopResize : function() {
	            	$('#i_w').val($(this).width());
	                $('#i_h').val($(this).height());
	            }
	        })
			$('.drag-active').draggable();
		}
		title = '';
        move = false;
        initDiv = '';
    })
	//画布内部操作
	$('.canvas').on({
		click: function(){
			$(this).addClass('drag-active').siblings().removeClass('drag-active');
			$(this).resizable({
				//拖拽停止后，改变文本宽度高度的值
                onStopResize : function() {
                	$('#i_w').val($(this).width());
                    $('#i_h').val($(this).height());
                }
            })
			$('#element').val($(this).attr('name'));
			$('#eleSelect').val($(this).attr('name'));
			if($(this).attr('name') == '文本'){
				$(".attrSetting table").html(textAttr);
				$(".cssSetting table").html(textStyle);
				$('#textVal').val($(this).find('p').text());
				if($(this).find('p').css('font-weight') == 400){   //文本粗细
					$('#i_textWeight').val('normal');     
				}else{
					$('#i_textWeight').val('bold'); 
				}
				$('#i_fontFamily').val($(this).find('p').css('font-family'));     //文本字体
				$('#i_fontSize').val(parseInt($(this).find('p').css('font-size')));   //文本大小 
				$('#i_w').val($(this).width());
				$('#i_h').val($(this).height());
				normalBgColor(this);   //正常背景色
				textColor(this);     //文本颜色
		    }else if($(this).attr('name') == '链接'){
				$(".attrSetting table").html(linkAttr);
			    $(".cssSetting table").html(textStyle);
				$('#textVal').val($(this).find('p').text());
				if($(this).find('p').css('font-weight') == 400){   //文本粗细
					$('#i_textWeight').val('normal');     
				}else{
					$('#i_textWeight').val('bold'); 
				}
				$('#i_fontFamily').val($(this).find('p').css('font-family'));     //文本字体
				$('#i_fontSize').val(parseInt($(this).find('p').css('font-size')));   //文本大小
				$('#i_w').val($(this).width());
				$('#i_h').val($(this).height());
				normalBgColor(this);   //正常背景色
				textColor(this);     //文本颜色
		    }else if($(this).attr('name') == '图片'){
		    	attrStr = '<tr><td class="fontTxt i_attrName">'+attrCotrol.bgpicture.attrName+'：</td>'
					+'<td>'+attrCotrol.bgpicture.attrLabel+'</td></tr>'
					+'<tr><td class="fontTxt i_attrName">'+attrCotrol.showmode.attrName+'：</td>'
					+'<td>'+attrCotrol.showmode.attrLabel+'</td></tr>'
					+'<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
					+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>'
			    $(".attrSetting table").html(attrStr);
			    $(".cssSetting table").html(imgStyle);
			    $('#i_w').val($(this).width());
				$('#i_h').val($(this).height());
				normalBgColor(this);   //正常背景色
		    }else if($(this).attr('name') == '圆形'){
			    $(".attrSetting table").html(bjColor);
			    $(".cssSetting table").html(circleStyle);
			    $('#borderWidth').val(parseInt($(this).find('.circle').css('border-width')));
			    $('#borderType').val($(this).find('.circle').css('border-style'));
			    $('#i_w').val($(this).width());
			    $('#i_h').val($(this).height());
			    normalBgColor(this,'.circle');   //正常背景色
			    borderColor(this,'.circle');      //边框颜色
		    }else if($(this).attr('name') == '矩形'){
			    $(".attrSetting table").html(bjColor);
			    $(".cssSetting table").html(squareStyle);
			    $('#borderRadius').val(parseInt($(this).find('.square').css('border-radius')));
			    $('#borderWidth').val(parseInt($(this).find('.square').css('border-width')));
			    $('#borderType').val($(this).find('.square').css('border-style'));
			    $('#i_w').val($(this).width());
			    $('#i_h').val($(this).height());
			    normalBgColor(this,'.square');   //正常背景色
			    borderColor(this,'.square');      //边框颜色
		    }else{
		    	attrStr = '';
		    	$(".attrSetting table").html(attrStr);
				$(".cssSetting table").html(imgStyle);
				$('#i_w').val($(this).width());
			    $('#i_h').val($(this).height());
		    }
		    getColor('#i_alarmbjcolor','alarmbjcolor-spectrum');  //告警背景色
			//矩形圆角设置
			$('#borderRadius').on('change',function(){
				$('.drag-active .square').css('border-radius',$(this).val() + 'px');
			})
            //点击获取当前文本位置
			var align = $(this).find('p').css('text-align');
			var top = $(this).find('p').css('padding-top');
            var h=($(this).height() -20);
            var h1=Math.floor(h /2 );
            if(align == 'left' && top == '0px'){
                $('#i_textAlign').val(0);
            }  else if (align == 'center' && top == '0px'){
                $('#i_textAlign').val(1);
			} else if (align == 'right' && top == '0px'){
                $('#i_textAlign').val(2);
			} else if (align == 'left' && top == ''+h1+'px' ){
                $('#i_textAlign').val(3);
            } else if (align == 'center' && top == ''+h1+'px'){
                $('#i_textAlign').val(4);
            } else if (align == 'right' && top == ''+h1+'px'){
                $('#i_textAlign').val(5);
            } else if (align == 'left' && top == ''+h+'px'){
                $('#i_textAlign').val(6);
            } else if (align == 'center' && top == ' '+h+'px'){
                $('#i_textAlign').val(7);
            } else if (align == 'right' && top == ''+h+'px'){
                $('#i_textAlign').val(8);
            }
		}
	},'.drag')
	$('.canvas').on('click',function(){
		if($('.drag-active').length == 0){
			$('#eleSelect').val('背景');
		}
		if($('.drag-active').length == 0 && $('.drag').length > 0){
    		attrStr = '';
    		styleStr = '';
	    	if($('.drag').length == 0 || $('.drag-active').length == 0){
	    		//属性设置项
		    	attrStr = '<tr><td class="fontTxt i_attrName">'+attrCotrol.bgpicture.attrName+'：</td>'
					+'<td>'+attrCotrol.bgpicture.attrLabel+'</td></tr>'
					+'<tr><td class="fontTxt i_attrName">'+attrCotrol.showmode.attrName+'：</td>'
					+'<td>'+attrCotrol.showmode.attrLabel+'</td></tr>'
					+'<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
					+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>'
			    $(".attrSetting table").html(attrStr);
			    $(".cssSetting table").html(bgStyle);
			    $('#i_w').val($('.canvas').width());
				$('#i_h').val($('.canvas').height());
				normalBgColor(this);   //正常背景色
		    }
    	}
	});
	//删除画布内元素
	$('.delBtn').on('click',function(){
		var dataIndex = $('.drag-active').attr('data-index');
		if($('.drag-active').length == 0){
			layer.alert('背景不可删除');
		}else{
			$('.drag-active').remove();
			$('#eleSelect').val('背景');
			$("#eleSelect  option[data-index="+ dataIndex +"]").remove();
		}
	})
	//置顶
	var zIndex = [];
	function sortNumber(a, b){return a - b}
	function getZindex(){
		zIndex = [];
		for (var i = 0; i< $('.drag').length; i++) {
			zIndex.push($($('.drag')[i]).css('z-index'));
		}
		return zIndex;
	}
	$('#toTop').on('click',function(){
		getZindex();
		$('.drag-active').css('z-index',zIndex.sort(sortNumber)[zIndex.length - 1] + 1);
	})
	//置底
	$('#toBottom').on('click',function(){
		getZindex();
		$('.drag-active').css('z-index',zIndex.sort(sortNumber)[0] - 1);
	})
	//上移一层
	$('#moveUp').on('click',function(){
		if($('.drag').length>=2){
			var area0 = {a: $('.drag-active').offset().left, b: $('.drag-active').offset().left + $('.drag-active').width(), c: $('.drag-active').offset().top, d: $('.drag-active').offset().top + $('.drag-active').height()};
			var Zindex0 = [],
				m = $('.drag-active').css('z-index'),
				n;
			for(var i = 0; i< $('.drag').length - 1; i++){
				x1 = $($('.drag').not('.drag-active')[i]).offset().left;
				x2 = $($('.drag').not('.drag-active')[i]).offset().left + $($('.drag')[i]).width();
				y1 = $($('.drag').not('.drag-active')[i]).offset().top;
				y2 = $($('.drag').not('.drag-active')[i]).offset().top + $($('.drag')[i]).height();
				if(x1>=area0.a && x1<=area0.b && y1>=area0.c && y1<=area0.d || x2>=area0.a && x2<=area0.b && y1>=area0.c && y1<=area0.d || x1>=area0.a && x1<=area0.b && y2>=area0.c && y2<=area0.d || x2>=area0.a && x2<=area0.b && y2>=area0.c && y2<=area0.d || area0.a>=x1 && area0.a<=x2 && area0.c>=y1 && area0.c<=y2 && area0.b>=x1 && area0.b<=x2 && area0.c>=y1 && area0.c<=y2 && area0.a>=x1 && area0.a<=x2 && area0.d>=y1 && area0.d<=y2 && area0.b>=x1 && area0.b<=x2 && area0.d>=y1 && area0.d<=y2){
					if($($('.drag').not('.drag-active')[i]).css('z-index') > m){
						Zindex0.push($($('.drag').not('.drag-active')[i]).css('z-index'));
					}
				}
			}
			n = Zindex0.sort(sortNumber)[0];
			$('.drag-active').css('z-index',n);
			$('.drag').not('.drag-active').css('z-index',n).css('z-index',m);
		}
	})
	//下移一层
	$('#moveDown').on('click',function(){
		if($('.drag').length>=2){
			var area0 = {a: $('.drag-active').offset().left, b: $('.drag-active').offset().left + $('.drag-active').width(), c: $('.drag-active').offset().top, d: $('.drag-active').offset().top + $('.drag-active').height()};
			var Zindex0 = [],
				Zindex1 = [],
				m = $('.drag-active').css('z-index'),
				n;
			for(var i = 0; i< $('.drag').length - 1; i++){
				x1 = $($('.drag').not('.drag-active')[i]).offset().left;
				x2 = $($('.drag').not('.drag-active')[i]).offset().left + $($('.drag')[i]).width();
				y1 = $($('.drag').not('.drag-active')[i]).offset().top;
				y2 = $($('.drag').not('.drag-active')[i]).offset().top + $($('.drag')[i]).height();
				if(x1>=area0.a && x1<=area0.b && y1>=area0.c && y1<=area0.d || x2>=area0.a && x2<=area0.b && y1>=area0.c && y1<=area0.d || x1>=area0.a && x1<=area0.b && y2>=area0.c && y2<=area0.d || x2>=area0.a && x2<=area0.b && y2>=area0.c && y2<=area0.d || area0.a>=x1 && area0.a<=x2 && area0.c>=y1 && area0.c<=y2 && area0.b>=x1 && area0.b<=x2 && area0.c>=y1 && area0.c<=y2 && area0.a>=x1 && area0.a<=x2 && area0.d>=y1 && area0.d<=y2 && area0.b>=x1 && area0.b<=x2 && area0.d>=y1 && area0.d<=y2){
					if($($('.drag').not('.drag-active')[i]).css('z-index') < m){
						Zindex0.push($($('.drag').not('.drag-active')[i]).css('z-index'));
					}
				}
			}
			n = Zindex0.sort(sortNumber)[zIndex.length - 1];
			$('.drag-active').css('z-index',n);
			$('.drag').not('.drag-active').css('z-index',n).css('z-index',m);
		}
	})
	//复制控件
	$('#copyBtn').on('click',function(){
		var copyDiv = $('.drag-active').clone(),
			top = parseInt($('.drag-active').css('top'));
		if($('.drag-active').length == 0){
			layer.alert('背景不可复制');
		}else{
			$(copyDiv).css('top', top + $('.drag-active').height() + 30);
			$('.drag-active').removeClass('drag-active');
			$canvas.append(copyDiv); 
		}
	});
	//上传图片
	var loadstr='<div class="p20">'
				+'<input type="text" class="input" name="fileText" id="fileText" placeholder="请选择文件" value=""  />'
				+'<button class="btn relative mt20" id="uploadFile">选择文件'
				+'<input name="file" class="file" id="file" type="file" accept="image/*">'
				+'</button>'
			+'</div>',
		objURL = '';
	$('.attrSetting').on('click','#upLoad',function(){
		layer.open({
			type: 1,
			title: '图片上传',
		  	area: ['290px', '220px'], //宽高
		  	content: loadstr,
		  	btn: ['确定', '取消'],
		  	btnAlign: 'c',
		  	success: function(layero, index){
		  		$('#file').on('change',function(){				
					function getObjectURL(file) {  
			            var url = null;  
			            if (window.createObjcectURL != undefined) {  
			                url = window.createOjcectURL(file);  
			            } else if (window.URL != undefined) {  
			                url = window.URL.createObjectURL(file);  
			            } else if (window.webkitURL != undefined) {  
			                url = window.webkitURL.createObjectURL(file);  
			            }  
			            return url;  
			        }  
			        objURL = getObjectURL(this.files[0]); //这里的objURL就是input file的真实路径  
			        $('#fileText').val(objURL);
				})
			},
			yes: function(index, layero){
			    if($('#fileText').val() == ''){
					alert('仅支持jpg、gif、png、svg格式且大小为2M以内的图片！');
					layer.close(index);
				}else if($('#fileText').val() !== '' && $('.drag-active').length == 0){
					$('.canvas').css('background','#fff url('+ objURL +') center no-repeat');
					layer.close(index);
				}else if($('#fileText').val() !== '' && $('.drag-active').length == 1){
					$('.drag-active img').attr('src',objURL);
					layer.close(index);
				}
			}
		});
	});
	//显示模式
	$('.attrSetting').on('change','#bgStatus',function(){
		if($('.drag-active').length == 0){
			if($(this).val() == 1){
				$('.canvas').css('background','#fff url('+ objURL +') center no-repeat');
			}else if($(this).val() == 2){
				$('.canvas').css({
					'background-image':'url('+ objURL +')',
					'background-position':'center',
					'background-repeat':'no-repeat',
					'background-size':'100% 100%'
				});
			}else if($(this).val() == 3){
				$('.canvas').css('background','#fff url('+ objURL +') center repeat');
			}else{
				$('.canvas').css('background','#fff');
			}
		}else{
			if($(this).val() == 1){
				$('.drag-active').html('<img src="'+ objURL +'" />');
				$('.drag-active img').attr('src',objURL);
			}else if($(this).val() == 2){
				$('.drag-active').html('');
				$('.drag-active').css({
					'background-image':'url('+ objURL +')',
					'background-position':'center',
					'background-repeat':'no-repeat',
					'background-size':'100% 100%'
				});
			}else if($(this).val() == 3){
				$('.drag-active').html('');
				$('.drag-active').css('background','#fff url('+ objURL +') center repeat');
			}else{
				$('.drag-active').html('');
				$('.drag-active').css('background','');
			}
		}
	})
	$(window).load(function(){
		//背景滚动条
		$('#bgScroll').on('change',function(){
			$('.canvas-bg').css('overflow',$(this).val());
		})
		normalBgColor();   //正常背景色
		//文本修改
	    $('.attrSetting').on('change','#textVal',function(){
	    	$('.drag-active p').text($(this).val());
	    })
	    getColor('#i_alarmbjcolor','alarmbjcolor-spectrum'); //告警背景色
	    //链接地址
	    $('.attrSetting').on('change','#linkVal',function(){
	    	var linkval = $(this).val(),
	    		str = $('.drag-active p').text();
	    	$('.drag-active p').attr('src',linkval);
	    })
	})
	//背景大小
	$('.cssSetting').on('change','#bgSize',function(){
		if($(this).val() == 1){
			$('#i_w').parent().parent().show();
			$('#i_h').parent().parent().show();
			$('#i_w').val($('.canvas').width());
			$('#i_h').val($('.canvas').height());
		}else if($(this).val() == 2){
			$('#i_w').parent().parent().hide();
			$('#i_h').parent().parent().hide();
		}else if($(this).val() == 3){
			$('#i_w').parent().parent().hide();
			$('#i_h').parent().parent().hide();
			$('.canvas').css({
				'width':'1920px',
				'height':'1080px',
				'overflow':'auto'
			})
		}else if($(this).val() == 4){
			$('#i_w').parent().parent().hide();
			$('#i_h').parent().parent().hide();
			$('.canvas').css({
				'width':'1440px',
				'height':'900px',
				'overflow':'auto'
			})
		}else{
			$('#i_w').parent().parent().hide();
			$('#i_h').parent().parent().hide();
			$('.canvas').css({
				'width':'1024px',
				'height':'768px',
				'overflow':'auto'
			})
		}
	})
	//宽高设置
	$('.cssSetting').on('change','#i_w',function(){
		if($('.drag-active').length == 0){
			$('.canvas').width($(this).val());
		}else{
			$('.drag-active').width($(this).val());
		}
	})
	$('.cssSetting').on('change','#i_h',function(){
		if($('.drag-active').length == 0){
			$('.canvas').height($(this).val());
		}else{
			$('.drag-active').height($(this).val());
		}
	})
	//图层区域操作
	$('#eleSelect').on('change',function(){
		var dataIndex = $(this).find("option:selected").attr("data-index");
		$('#element').val($(this).val());
		$(".drag[data-index='"+ dataIndex +"']").addClass('drag-active').siblings().removeClass('drag-active');
		if($(this).val() == '背景'){
			$('.drag').removeClass('drag-active');
			$('#element').val('');
		    $(".attrSetting table").html(bgAttr);
		    $(".cssSetting table").html(bgStyle);
		    $('#i_w').val($('.canvas').width());
			$('#i_h').val($('.canvas').height());
			normalBgColor('.canvas');   //正常背景色
		}else if($(this).val() == '文本'){
			$(".attrSetting table").html(textAttr);
			$(".cssSetting table").html(textStyle);
			$('#textVal').val($('.drag-active').find('p').text());
			if($(this).find('p').css('font-weight') == 400){   //文本粗细
				$('#i_textWeight').val('normal');     
			}else{
				$('#i_textWeight').val('bold'); 
			}
			$('#i_fontFamily').val($('.drag-active').find('p').css('font-family'));     //文本字体
			$('#i_fontSize').val(parseInt($('.drag-active').find('p').css('font-size')));   //文本大小 
			$('#i_w').val($('.drag-active').width());
			$('#i_h').val($('.drag-active').height());
			normalBgColor('.drag-active');   //正常背景色
			textColor('.drag-active');     //文本颜色
		}else if($(this).val() == '链接'){
			$(".attrSetting table").html(linkAttr);
		    $(".cssSetting table").html(textStyle);
			$('#textVal').val($('.drag-active').find('p').text());
			if($(this).find('p').css('font-weight') == 400){   //文本粗细
				$('#i_textWeight').val('normal');     
			}else{
				$('#i_textWeight').val('bold'); 
			}
			$('#i_fontFamily').val($('.drag-active').find('p').css('font-family'));     //文本字体
			$('#i_fontSize').val(parseInt($('.drag-active').find('p').css('font-size')));   //文本大小 
			$('#i_w').val($('.drag-active').width());
			$('#i_h').val($('.drag-active').height());
			normalBgColor('.drag-active');   //正常背景色
			textColor('.drag-active');     //文本颜色
		}else if($(this).val() == '图片'){
			attrStr = '<tr><td class="fontTxt i_attrName">'+attrCotrol.bgpicture.attrName+'：</td>'
					+'<td>'+attrCotrol.bgpicture.attrLabel+'</td></tr>'
					+'<tr><td class="fontTxt i_attrName">'+attrCotrol.showmode.attrName+'：</td>'
					+'<td>'+attrCotrol.showmode.attrLabel+'</td></tr>'
					+'<tr><td class="fontTxt i_attrName bjcolor">'+attrCotrol.bjcolor.attrName+'：</td>'
					+'<td>'+attrCotrol.bjcolor.attrLabel+'</td></tr>'
		    $(".attrSetting table").html(attrStr);
		    $(".cssSetting table").html(imgStyle);
		    $('#i_w').val($('.drag-active').width());
			$('#i_h').val($('.drag-active').height());
			normalBgColor('.drag-active');   //正常背景色
		}else if($(this).val() == '圆形'){
			$(".attrSetting table").html(bjColor);
		    $(".cssSetting table").html(circleStyle);
		    $('#borderWidth').val(parseInt($('.drag-active').find('.circle').css('border-width')));
		    $('#borderType').val($('.drag-active').find('.circle').css('border-style'));
		    $('#i_w').val($('.drag-active').width());
		    $('#i_h').val($('.drag-active').height());
		    normalBgColor('.drag-active','.circle');   //正常背景色
		    borderColor('.drag-active','.circle');      //边框颜色
		}else if($(this).val() == '矩形'){
			$(".attrSetting table").html(bjColor);
		    $(".cssSetting table").html(squareStyle);
		    $('#borderRadius').val(parseInt($('.drag-active').find('.square').css('border-radius')));
		    $('#borderWidth').val(parseInt($('.drag-active').find('.square').css('border-width')));
		    $('#borderType').val($('.drag-active').find('.square').css('border-style'));
		    $('#i_w').val($('.drag-active').width());
		    $('#i_h').val($('.drag-active').height());
		    normalBgColor('.drag-active','.square');   //正常背景色
		    borderColor('.drag-active','.square');      //边框颜色
		}else{
			attrStr = '';
	    	$(".attrSetting table").html(attrStr);
			$(".cssSetting table").html(imgStyle);
			$('#i_w').val($('.drag-active').width());
		    $('#i_h').val($('.drag-active').height());
		}
	    getColor('#i_alarmbjcolor','alarmbjcolor-spectrum');   //告警背景色
	})
	//工具箱展开折叠
	$('.panelActive i').attr('class','fa fa-angle-down');
	$('.panelBox').on('click','.panel .panelHead',function(){
		if($(this).parent().hasClass("panelActive")){
			$(this).parent().removeClass('panelActive');
			$('.panel i').not('.panelActive').attr('class','fa fa-angle-right');
		}else{
			$(this).parent().addClass('panelActive').siblings().removeClass('panelActive');
			$('.panel i').not('.panelActive').attr('class','fa fa-angle-right');
			$('.panelActive i').attr('class','fa fa-angle-down');
		}
	})
	//文本样式修改
	$('.cssSetting').on('change','#i_fontFamily',function(){
        $('.drag-active').find('p').css('font-family',$('#i_fontFamily').val());
	})
	$('.cssSetting').on('change','#i_textWeight',function(){
        $('.drag-active').find('p').css('font-weight',$('#i_textWeight').val());
	})
	$('.cssSetting').on('change','#i_fontSize',function(){
        $('.drag-active').find('p').css('font-size',$('#i_fontSize').val() + 'px');
	})
    //圆形、方形属性样式修改
    $('.cssSetting').on('change','#borderWidth',function(){
    	var n = $(this).val();
    	$('.drag-active div').css({'border-width': n + 'px' , 'width' : 'calc(100% - ' + parseFloat(n)*2 + 'px)'});
    })
    $('.cssSetting').on('change','#borderType',function(){ 
    	$('.drag-active div').css('border-style',$(this).val());
    })
    //文本位置
    $('.cssSetting').on('change','#i_textAlign',function(){
    	var h=($('.drag-active').height() -20);
    	var h1=Math.floor(($('.drag-active').height() -20)/2 );
        if($(this).val() == 0){
            $('.drag-active p').css({'text-align':'left','padding-top':'0'});
		} else if($(this).val() == 1){
            $('.drag-active p').css({'text-align':'center','padding-top':'0'});
		} else if($(this).val() == 2){
            $('.drag-active p').css({'text-align':'right','padding-top':'0'});
		} else if($(this).val() == 3){
            $('.drag-active p').css({'text-align':'left','padding-top':''+ h1 +'px'});
        } else if($(this).val() == 4){
            $('.drag-active p').css({'text-align':'center','padding-top':''+ h1 +'px'});
		} else if($(this).val() == 5){
            $('.drag-active p').css({'text-align':'right','padding-top':''+ h1 +'px'});
        } else if($(this).val() == 6){
            $('.drag-active p').css({'text-align':'left','padding-top':''+ h +'px'});
        } else if($(this).val() == 7){
            $('.drag-active p').css({'text-align':'center','padding-top':''+ h +'px'});
        } else if($(this).val() == 8){
            $('.drag-active p').css({'text-align':'right','padding-top':''+ h +'px'});
        }
    })
    //设置属性和样式切换
	$('.setting-item').on('click',function(){
		$(this).addClass('setting-active').siblings().removeClass('setting-active');
		$('.settingBox .setting-detail').eq($(this).index()).fadeIn(100).siblings().hide();
	})
    var attrStr = '',
    	styleStr = '';
    //背景属性样式设置项
    if($('.drag').length == 0){
	    $(".attrSetting table").html(bgAttr);
	    $(".cssSetting table").html(bgStyle);
	    $('#i_w').val($('.canvas').width());
		$('#i_h').val($('.canvas').height());
    }
})