(function($) {
  $(document).ready(function(){
    $(".key").click(function(event) {
    	onKey($(this).data("key"));
    });
  });
})(window.jQuery);

var inputMode = null;
inputActive();
function onKey(valString){
	console.log(valString);

	if(valString == 'del'){
		del();
		return;
	}

	if(valString == 'ac'){
		$('#input-lat').html('');
		$('#input-lng').html('');
		$('#input-other').html('');
		inputMode = null;
		inputActive();
		return;
	}

	if(valString == 'back'){
		var val = getModeval();
		var result = val.substr( 0, val.length-1 );
		autoSepalator(result)
		return;
	}

	if(valString == 'lat'){
		if(inputMode == null){
			$('#input-lat').html($('#input-other').html());
			$('#input-other').html('');
		}
		inputMode = "lat";
		inputActive();
		return;
	}

	if(valString == 'lng'){
		if(inputMode == null){
			$('#input-lng').html($('#input-other').html());
			$('#input-other').html('');
		}
		inputMode = "lng";
		inputActive();
		return;
	};

	if(valString == 'n'){
		inputMode = null;
		inputActive();
		return;
	}

	if(valString == '='){
		return;
	}

	if(valString == '-'){
		var val = getModeval();
		if(inputMode == "lat" || inputMode == "lng"){
			if(val.substr(0,1) == "-"){
				setModeVal(val.slice(1));
				return;
			}else{
				setModeVal("-" + val);
				return;
			}
		}
		setModeVal(val+"-");
		return;
	}

	if(valString == '.'){
		var val = getModeval() + '.';
		autoSepalator(val);
		return;
	}

	if(inputMode == 'lat'){
		$('#input-lat').html($('#input-lat').html() + valString);
		return;
	}

	if(inputMode == 'lng'){
		$('#input-lng').html($('#input-lng').html() + valString);
		return;
	}

	if(inputMode == null){
		$('#input-other').html($('#input-other').html() + valString);
		return;
	}
}

function autoSepalator(val){
	//console.log(val);
	var s = val.split(/[\.°'"]/);
	if(s.length == 3){
		if(parseInt(s[1],10) >= 60 || parseInt(s[2],10) >= 60){
			var d = s[0] + "." + s[1] + "." + s[2];
			setModeVal(d);
			return;
		}
		var d = s[0] + "°" + s[1] + "'" + s[2];
		setModeVal(d);
		return;
	}
	if(s.length == 4){
		if(parseInt(s[1],10) >= 60 || parseInt(s[2],10) >= 60 || parseInt(s[3],10) >= 100){
			var d = s[0] + "." + s[1] + "." + s[2] + "." + s[3];
			setModeVal(d);
			return;
		}
		var d = s[0] + "°" + s[1] + "'" + s[2] + '"' + s[3];
		setModeVal(d);
		return;
	}
	if(s.length >= 5){
		if(parseInt(s[1],10) >= 60 || parseInt(s[2],10) >= 60 || parseInt(s[3],10) >= 100){
			var d = s[0] + "." + s[1] + "." + s[2] + "." + s[3];
			setModeVal(d);
			return;
		}
		var d = s[0] + "°" + s[1] + "'" + s[2] + '"' + s[3] + "." + s[4];
		setModeVal(d);
		return;
	}

	setModeVal(s.join('.'));
}

function getModeval(){
	if(inputMode == "lat"){
		return $('#input-lat').html();
	}else if(inputMode == "lng"){
		return $('#input-lng').html();
	}else{
		return $('#input-other').html();
	}
}

function setModeVal(val){
	if(inputMode == "lat"){
		$('#input-lat').html(val);
	}else if(inputMode == "lng"){
		$('#input-lng').html(val);
	}else{
		$('#input-other').html(val);
	}
}

function del(){
	if(inputMode == "lat"){
		$('#input-lat').html('');
	}else if(inputMode == "lng"){
		$('#input-lng').html('');
	}else{
		$('#input-other').html('');
	}
}

function inputActive(){
	if(inputMode == "lat"){
		$('.col-lat').addClass('active');
		$('.col-lng').removeClass('active');
		$('.col-other').removeClass('active');
	}else if(inputMode == "lng"){
		$('.col-lat').removeClass('active');
		$('.col-lng').addClass('active');
		$('.col-other').removeClass('active');
	}else{
		$('.col-lat').removeClass('active');
		$('.col-lng').removeClass('active');
		$('.col-other').addClass('active');
	}
}