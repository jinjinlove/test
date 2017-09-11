$(function () {

    var img = $(".list li");
    var size = img.size();
 
    //生成小圆点
    var _LiHtml='';
    for(var i=0;i< size;i++){
        _LiHtml+=' <li> </li>';
    }
    $(".fp-num-box").append(_LiHtml);
 
    //初始状态
    var num = $(".fp-num-box li");
    img.eq(0).addClass("show");
    num.eq(0).addClass("active").siblings().removeClass("active");
    var t = setInterval( move,3000);
    //主函数
    function move(){
        var i = $(".fp-num-box li.active").index();
        i++;
        // console.log(i);
        if(i>=size){
            i=0;
        }else if(i<=0){
            i=size;
        }
        img.eq(i).attr("class","show right");
        img.eq(i-1).attr("class","hides right");
        num.eq(i).addClass("active").siblings().removeClass("active");
    }
    //圆点点击
    num.click(function () {
        clearInterval(t);
        var index = $(".fp-num-box li.active").index();
        var i = $(this).index();
        //点击已激活左侧
        if(index>i){
            img.eq(i).attr("class","show left");
            img.eq(index).attr("class","hides left");
        //点击已激活右侧
        }else if(index < i){
            img.eq(i).attr("class","show right");
            img.eq(index).attr("class","hides right");
        }else{
        }
        num.eq(i).addClass("active").siblings().removeClass("active");
        t = setInterval(move,3000);
    });
});