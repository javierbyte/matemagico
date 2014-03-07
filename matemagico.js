	var userRes = 0;
	var realRes = 0;

	var started = 0;

	var oldO = 3;
	var currentO = 0;
	var currentPower = 0;
	var maxPower = 0;

	var newOp = '';
	var n0 = 0;
	var n1 = 0;
	var level = 0;

	var time = 100;
	var ok = 0;

	var running = "";

	function generateOp() {
  		level = currentPower/10 + Math.floor( (currentPower/100 + 1) * (currentPower/100 + 1) * (currentPower/100 + 1) ) - 1;
  		level = Math.floor( level * .8);
  		switch( Math.floor(Math.random()*4) )  {
  			case 0:
  				n0 = Math.floor(Math.random()*(level*2.5)+1.5)+1;
				n1 = Math.floor(Math.random()*(level*2.5)+1.5)+1;
				if (n0 === n1) n0 = Math.floor(Math.random()*(level*2))+1;
  				newOp = n0 + '+' + n1;
  				break;
  			case 1:
  				n1 = Math.floor(Math.random()*(level*2))+1;
				n0 = n1 + Math.floor(Math.random()*(level*2))+2;
  				newOp = n0 + '-' + n1;
  				break;
  			case 2:
  				n0 = Math.floor(Math.random()*(level))+2;
				n1 = Math.floor(Math.random()*(level))+2;
  				newOp = n0 + '*' + n1;
  				break;
  			case 3:
				n1 = Math.floor(Math.random()*(level*.5))+2;
				n0 = n1 * Math.floor( Math.random() * (level+2) + 2);
  				newOp = n0 + '/' + n1;
  				break;
  		}
	}

(function($) {
	$powerOn = $('#powerOn');
	$mate = $('#mate');
	$res = $('#res');
	$puntaje = $('#puntaje');

	function setO(n) {
		$mate.attr('class', 'c'+n);
	}

	function setPower(n) {
		if(n) {
			currentPower += (100-currentPower)/20 + 2;
			if(currentPower > maxPower) {
				maxPower = Math.floor(currentPower);
				$("#maxpower").html(maxPower).css("top",(100-maxPower) + "%");

			}
		} else {
			currentPower -= 2;
			if(currentPower < 0) currentPower = 0;
		}
		$powerOn.css('height', 100-currentPower + '%');
	}

	function stop() {
		time = 0;
		window.clearInterval(running);
		$res.blur();
		$('#msj').html('¡Buen juego!<br>Llegaste a un nivel máximo de <b>' + maxPower + '</b>.<br><br>Resolviste un total de <b>' + ok + '</b> problemas.<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fjavierbyte&amp;width&amp;height=62&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=679659815401286" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:62px;width:200px" allowTransparency="true"></iframe><iframe src="//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2FJavierKraken&amp;width&amp;height=65&amp;colorscheme=light&amp;layout=box_count&amp;show_faces=false&amp;appId=752192951474466" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:65px;width:100px" allowTransparency="true"></iframe><div class="c">.</div>');
		$('#btnJugar').html('Jugar otra vez');
		$('#btnFacebook').removeClass('no').attr('href','http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://javierbyte.com/app/matemagico/&p[images][0]=http://javierbyte.com/app/matemagico/facebook.jpg&p[title]=Llegué al nivel ' + maxPower + ' en matemágico.&p[summary]=Y resolví ' + ok + ' problemas, ¿crees ser más inteligente que yo?');
		$('.windowcenter').css('display','block');
	}

	function start() {
		started = 1;
		running = setInterval(function() {
			setPower(0);
			time-=4;
			if(time<0) stop();
			$puntaje.css('top', (90-time*.9) + '%');
		},1000);
	}

	function win(n) {
		oldO = currentO;
		currentO = (currentO + 1) % 4;
  		setO(currentO);
  		setPower(n);
  		realRes = eval($('#o'+currentO).text());
  		$res.val('');

  		if(n) {
  			ok++;
  			$puntaje.html("<p>"+ok+"</p>");
  		}

  		generateOp();
  		$('#o'+oldO+' p').html(newOp);
	}

	realRes = eval($('#o0').text());
	$(window).on( "keyup keydown", function() {
		userRes = $res.val();
  		if(realRes == userRes) {
  			if(started === 0) start();
  			win(1);
  		}
  		else if (userRes == '00') win(0);
	});

	generateOp();
	$('#o0 p').html(newOp);
	generateOp();
	$('#o1 p').html(newOp);
	generateOp();
	$('#o2 p').html(newOp);
	generateOp();
	$('#o3 p').html(newOp);
	realRes = eval($('#o0').text());

})(jQuery);

function play() {
	running = "";
	userRes = 0;
	started = 0;
	currentPower = 0;
	maxPower = 0;
	newOp = '';
	level = 0;
	time = 100;
	ok = 0;

	generateOp();
	$('#o0 p').html(newOp);
	generateOp();
	$('#o1 p').html(newOp);
	generateOp();
	$('#o2 p').html(newOp);
	generateOp();
	$('#o3 p').html(newOp);
	realRes = eval($('#o'+currentO).text());

	$powerOn.css('height', 100-currentPower + '%');
	$("#maxpower").html(maxPower).css("top",(100-maxPower) + "%");
	$puntaje.html("<p>"+ok+"</p>");
	$puntaje.css('top', (90-time*.9) + '%');

	$('.windowcenter').css('display','none');
	$res.val('');
	$('#res').focus();
}