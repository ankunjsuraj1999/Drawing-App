$(function(){
    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });
    /*
    // learning canvas
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    //draw aline
    //declaring new path
    context.beginPath();

    //det line width
    context.lineWidth = 40;
    //set line color
    context.strokeStyle = '#42e565';
    //set cap to the line(round, square,.....)
    context.lineCap = 'round';
    //set line joint style
    context.lineJoin = "round";
    //position the context point i.e.., start point
    context.moveTo(50,50);

    //drawing a line from starting position to new point
    context.lineTo(200,200);
    context.lineTo(400,50);
    //make line
    context.stroke();
    */

    //code for drawing app
    var paint = false;
    var paint_erase = "paint";
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext('2d');
    var container = $("#container");
    var mouse = {x:0, y:0};
    if(localStorage.getItem("imgcanvas")!= null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0,0);
        }
        img.src = localStorage.getItem("imgcanvas");
    }
    //loading code

    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    container.mousedown(function(e){
        paint = true;
        //window.alert(paint);
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color
                ctx.strokeStyle = $("#paintcolor").val();
            }else{
                //color white
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    container.mouseup(function(){
        paint = false;
    });
    container.mouseleave(function(){
        paint = false;
    });



    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("erasemode");
    });

    //localstorage, sessionstorage
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgcanvas",canvas.toDataURL());
            //window.alert(localStorage.getItem("imgcanvas"));
        }else{
            window.alert("your browser does not support local storage");
    
        }
    });

    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("erasemode");
    });

    $("#paintcolor").change(function(){
        $("#circle").css("background-color", $(this).val());
    })

    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

});