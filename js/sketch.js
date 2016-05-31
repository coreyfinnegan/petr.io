var cells = [];
var aliveA = 2;
var aliveB = 2;
var start = true;

function isInArray(days, day) {
    return days.indexOf(day.toLowerCase()) > -1;
}

function setup() {
	var cnv = createCanvas(1366,768);
	var x = (windowWidth - width) / 2;
  	var y = (windowHeight - height) / 2;
  	cnv.position(x, y);
	frameRate(60);
	background(200);
	cells.push(new Cell("a", createVector(341,384), "bacteria", color(61, 144, 183, 100)));
	cells.push(new Cell("b", createVector(1025,384), "bacteria", color(197, 41, 41, 100)));
	for (var i = cells.length-1; i >= 0; i--) {
		cells.push(cells[i].mitosis());
		cells.push(cells[i].mitosis());
		cells.splice(i, 1);
		if (isInArray(cells[i].abilities, "infect")){
					console.log(cells[i].team + " has infect ability");
				}
	}
}

function draw() {
	if (scoreA == 1 && scoreB == 0 && start == true) {
		location.reload();
	}
	if (scoreB == 1 && scoreA == 0 && start == true) {
		location.reload();
	}
	if (aliveA == 0 && start == false) {
		console.log("A team wins!")
		noLoop();
		var winner = "Computer";
		var score = String(aliveB);
		select('#teamwin').html(winner + " won with a cell score of " + score +".")
	}
	else if (aliveB == 0 && start == false) {
		console.log("B team wins!")
		noLoop();
		var winner = "You";
		var score = String(aliveA);
		select('#teamwin').html(winner + " won with a cell score of " + score +".")
	}
	else {
		start = false;
	}
	console.log(start)
	background('#222');
	fill('#222');
	noStroke();
	ellipse(0.5*width, 0.5*height, width, height);
	var scoreA = select("#ascore")
	var scoreB = select("#bscore")
	alive = cells.length;
	scoreA.html(String(aliveA));
	scoreB.html(String(aliveB));
	for (var i = cells.length-1; i >=0; i--) {
		//cells.push(cells[i].mitosis());
		//cells.push(cells[i].mitosis());
		//cells.splice(i, 1);
		cells[i].deplete();
		if (cells[i].lifetime < 0) {
			if (cells[i].team == "a") {
				aliveA += -1;
			}
			else {
				aliveB += -1;
			}
			cells.splice(i, 1);	
			break;
		}
		var cd = dist(cells[i].pos.x, cells[i].pos.y, 0.5*width, 0.5*height)+0.5*cells[i].r
		var chance = floor(random(cells[i].chance));
		//var chance = floor(random(25));
		console.log(cells[i].chance);
		console.log(chance);
		
		if (cells[i].pos.y > height || cells[i].pos.y < 0 || cells[i].pos.x < 0 || cells[i].pos.x > width) {
			if (cells[i].team == "a") {
				aliveA += -1;
			}
			else {
				aliveB += -1;
			}
			cells.splice(i, 1);	
			break;
		}
		//if (cd > 0.5*width) {
			//if (cells[i].team == "a") {
				//aliveA += -1;
			//}
			//else {
				//aliveB += -1;
			//}
			//cells.splice(i, 1);	
			//break;
		//}

		if (chance==2 && (aliveA+aliveB) < 150) {
			if (cells[i].team=="a") {
				aliveA += 1;
			}
			else {
				aliveB += 1;
			}
			//console.log("Chance = 2!")
			cells.push(cells[i].mitosis());
			cells.push(cells[i].mitosis());
			cells.splice(i, 1);
		}
		//if (cells[i].pos.x<0 || cells[i].pos.y<0) {
		//	if (cells[i].team == "a") {
		//		aliveA += -1;
		//	}
		//	else {
		//		aliveB += -1;
		//	}
		//	cells.splice(i, 1);	
		//}
		cells[i].move();
		cells[i].show();
		
		if (cells[i].contact()) {
			if (cells[i].big == false && cells[i].cankill && cells[i].breed != "virus") {
				if (cells[i].team == "a") {
					aliveA += -1;
				}
				else {
					aliveB += -1;
				}
				cells.splice(i, 1);	
			}
			else if (cells[i].breed == "virus" || (aliveA + aliveB) > 150) {
				cells.push(cells[i].mitosis());
				cells.push(cells[i].mitosis());
				cells.splice(i, 1);
			}
			
		}
	}
}

//function mousePressed() {
//	for (var i = cells.length-1; i>=0; i--) {
//		if (cells[i].clicked(mouseX,mouseY)) {
//			cells.push(cells[i].mitosis());
//			cells.push(cells[i].mitosis());
//			cells.splice(i, 1);
//		}
//	} 
//}