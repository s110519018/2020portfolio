$(window).scroll(function(e){
    // scrollTop 和上面距離
  //   沒有任何滑動
    if($(window).scrollTop() <=0){
     $(".explore,.navbar").addClass("at_top"); 
      
     //往下滑便黑色，到最上變白色
     
      $(".navbar").removeClass("bg-black");
    }
    else{
      $(".explore,.navbar").removeClass("at_top");
      $(".navbar").addClass("bg-black");
    
    }
    
  });
  //a標籤有被點擊
  $(document).on('click','a',function(event){
    //不要執行預設的動作
    // event.preventDefault(); 這裡註解掉才可以連到其他網站
    var target=$(this).attr("href");
    //滑到定位
    //平緩的滑過去
    $("html,body").animate({
      //offset().top距離最上面多少
      scrollTop: $(target).offset().top
    },500);
  });
  
  //專門讓花園鰻蘿蔔蹲的function
  //參數花園鰻的id,x座標
  function detect_fish(fish_id,x){
    //物體中央:左距+自己一半的寬度
    var fishplace=$(fish_id).offset().left+$(fish_id).width()/2;
    if(Math.abs(x-fishplace)<80)
      $(fish_id).css("bottom","0px");
    else
      $(fish_id).css("bottom","-80px")
  };


  //滑鼠移動事件
  $(window).mousemove(function(evt){
    //抓滑鼠在螢幕上位置
    var pagex=evt.pageX;
    var pagey=evt.pageY;
    
    //$("#section_about").offset().left代表#section_about和最左邊的距離，$("#section_about").offset().top代表#section_about網頁最上方的距離 
    var x=pagex-$("#section_about").offset().left
    var y=pagey-$("#section_about").offset().top

    //header區域
    //移動首頁的山位置，滑鼠往右20則山移動往左負一，但右邊會穿幫所以再往右50，用%當單位
    $(".mountain").css("transform","translateX("+(pagex/-20+100)/10+"%)")
    //about區域
    //X滑鼠在ABOUT區域內出現並跟隨滑鼠移動
    //判斷滑鼠是否在ABOUT區域
    //Y<0是在ABOUT區域之上，
    //$("#section_about").outerHeight()是代表#section_about這個區域的高度，當Y大於此時代表滑鼠在ABOUT區域之下的區域
    if(y<0 || y>$("#section_about").outerHeight())
      $("#cross").css("opacity",0);
    else
      $("#cross").css("opacity",1);

    //更動指標位置
    $("#cross").css("left",x+"px");
    $("#cross").css("top",y+"px");
    
    //獅子眼睛跟著滑鼠動
    //抓獅子的左右位置
    //獅子在整個頁面裡的相對位置+一半獅子本體寬度=獅子的正中心
    var lionplace=$("#lion").offset().left+$("#lion").width()/2;
    //抓獅子和最上方的距離
    var liontop=$("#lion").offset().top;
    
    //檔案路徑
    var img_url="../img/lion/";
  
    if(pagex<lionplace-50) //如果滑鼠在獅子左邊
      $("#lion").attr("src",img_url+"lion_left.svg")
    else if(pagex>lionplace+50) //如果滑鼠在獅子右邊
      $("#lion").attr("src",img_url+"lion_right.svg")
    else //如果滑鼠在獅子中間上面
      $("#lion").attr("src",img_url+"lion_top.svg")
    
    if (pagex<lionplace-50 && pagey<liontop) //如果滑鼠在獅子左邊而且上下滑鼠相對位置小於獅子(在獅子上面)
      $("#lion").attr("src",img_url+"lion_left_top.svg")
    if (pagex>lionplace+50 && pagey<liontop) //如果滑鼠在獅子右邊而且上下滑鼠相對位置小於獅子(在獅子上面)
      $("#lion").attr("src",img_url+"lion_right_top.svg")

    //更新about文字和氣球位置
    $(".r1text").css("transform","translateX("+(y/-5)/8+"%)")
    $(".r2text").css("transform","translateX("+(y/-10)/10+"%)")
    $(".r3text").css("transform","translateX("+(y/-12)/5+"%) rotate(-10deg)")
    $(".balloon_pink").css("transform","translateX("+(x/-5)/10+"%)")
    $(".balloon_yellow").css("transform","translateX("+(x/-16)/10+"%)")
    //contact區域
    //移動聯絡區的冰山位置，滑鼠往右20則山移動往左負一，但左邊會穿幫所以再往左50，用%當單位
    $(".mountain_contact").css("transform","translateX("+(pagex/-20-50)/10+"%)")
    //花園鰻蘿蔔蹲
    detect_fish("#fish_ig",pagex);
    detect_fish("#fish_fb",pagex);
    detect_fish("#fish_line",pagex);
});

//表單
$(document).ready(function() {
	$(".btn-send").click(function(event) {
    save();
    alert("Thanks for your message! :)");
    
    //不動
    $("html,body").animate({
      //offset().top距離最上面多少
      scrollTop: $("#header_index").offset().top
    },500);

	});
});

function save(){
	let postURL="https://script.google.com/a/stu.ntue.edu.tw/macros/s/AKfycbyOXvzL3tNJV_w8UDteihnUhykIrFhT8_BS7KWrbQ/exec";
	let param = new Object();
	param.method="write";
	param.userName=$("input[name='userName']").val();
	param.Email=$("input[name='Email']").val();
	param.Content=$("textarea[name='Content']").val();
	param.sheetUrl="https://docs.google.com/spreadsheets/d/1NeyiXS0sBXkvAN0olI-9RKbdRqHvnGRoTwqDmwMSGUQ/edit?usp=sharing";
	param.sheetTag="工作表1";
	$.post(postURL,param, function(data) {
		if(data.result =="success"){
			alert("成功");
			read();
		}else{
			alert("失敗");
		}
	});
}

function read(argument){
	
}




