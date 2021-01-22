let code = ""
jqueryElem = $("#clickMe")
var singleClickTimer = 0;
jqueryElem.click(function(e){
    if (e.detail == 1) {
        singleClickTimer = setTimeout(function(){
            code+='.'
            $("input.clicked").val(code);
        },250);
    }
});
function textSpeak()
{
    var txt=document.getElementById("inp").value;
    document.getElementById("disp").innerHTML=txt;
    var t1=txt;
    tts(t1);
}
function tts(t1)
{
    var kar=t1;
    responsiveVoice.speak(kar,"UK English Female",{rate:0.8,volume:2});
}
jqueryElem.dblclick(function(e){
    clearTimeout(singleClickTimer);
    code+='-'
    $("input.clicked").val(code);
});
jqueryElem.mouseup(function(e){
    e.preventDefault();
    if (e.which == 3){
        code+=' '
        $("input.clicked").val(code+'|');
    }
});
$("input[type=submit]").click(function (e){
    e.preventDefault();
    $("input.clicked").val("")
    axios.post('/api/get', {"braille": code}).then((response)=>{
        $('.cont').html(response["data"]);
        tts(response["data"]);
    }, (error)=>{
        $('.cont').html("Nothing exists for such morse");
    });
    code = ""
});
