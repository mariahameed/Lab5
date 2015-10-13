var characters = new Array(3);

characters[0] = document.getElementById("character");
characters[1] = document.getElementById("character1");
characters[2] = document.getElementById("character2");

var ground    = document.getElementById("ground");

var direction=1;

var max=320;
var min=200;
var lives = 5, gameOver=0, score=0;

for(i=0 ; i<3 ; i++)
{
	characters[i].style.top = min + parseInt(Math.random()*max)+ "px" ;
	characters[i].style.height = "40px";
}

document.onkeydown = checkKey;

function checkKey(e) {


    //e = e || window.event;
    if (e.keyCode == '38' && gameOver==0 && parseInt(ground.style.top)>200) {
	   ground.style.top = parseInt(ground.style.top) - 6 +'px';
	   //alert(aeroplane.style.top);
    }
    else if (e.keyCode == '40' && gameOver==0 ) {
	   ground.style.top = parseInt(ground.style.top) + 6 +'px';
		//alert(aeroplane.style.top);
    }
    else if (e.keyCode == '37' && gameOver==0) {
	   ground.style.left = "-50px";
    }
    else if (e.keyCode == '39' && gameOver==0) {
	   ground.style.left = "+50px";
    }
}

//For every 33ms (about 30fps)
setInterval(function(){
    
    //Get the height and position of the player
    var charTop = new Array(3),
	charHeight = new Array(3), 
	charLeft= new Array(3), 
	charWidth= new Array(3);
	
	for(i=0 ; i<3 ; i++)
	{
		charTop[i] = parseInt(characters[i].style.top);
        charHeight[i] = parseInt(characters[i].style.height);
		charLeft[i] = parseInt(characters[i].style.left);
        charWidth[i] = parseInt(characters[i].style.width);
	}
	
	var aeroTop    = parseInt(ground.style.top),
        aeroHeight = parseInt(ground.style.height);

    var aeroLeft    = parseInt(ground.style.left),
        aeroWidth = parseInt(ground.style.width);
    //and the top of the ground
    var groundTop = parseInt(ground.style.top);
    
	for(i=0 ; i<3 ; i++)
	{
		if(gameOver == 0)
		{
			charLeft[i] -= (5+i);
		}
		
		if(charLeft[i]<0- charWidth[i])
		{
			charLeft[i] = 1300;
			characters[i].style.top = min + parseInt(Math.random()*max) + "px";
			score = score+5;
		}

		if(parseInt(characters[i].style.top)< min + parseInt(Math.random()*40))
		{
			direction=1;
		}
		
		if(parseInt(characters[i].style.top)> 460 + parseInt(Math.random()*40))
		{
			direction=-1;
		}
		
		if(i==2)
			characters[i].style.top =  parseInt(characters[i].style.top) + direction + "px";
		
		pos = aeroLeft+aeroWidth-40;
		if(charLeft[i]<pos && (charTop[i]<aeroTop+aeroHeight && charTop[i]+charHeight[i]>aeroTop))
		{
	//		characters[i];.style.top  = "500px";
			lives = lives -1;
			charLeft[i]= 1300;
			characters[i].style.top = min + parseInt(Math.random()*max) + "px";
		}
			
		if(lives<=0)
		{
			document.getElementById("gameOver").style.display = "block";
			gameOver = 1;
		}
		//If the characters[i];'s bottom is hitting the ground,
		//Stop moving
		//Set the characters[i];'s final position    
		characters[i].style.left = charLeft[i] + "px";
		
	}
	document.getElementById("life").innerHTML = "Lives: " + lives;
	document.getElementById("gameScore").innerHTML = "Score: "+score;
	document.getElementById("gameScore1").innerHTML = "Score: "+score;
	
},33);