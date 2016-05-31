<<<<<<< HEAD
function Cell(team, pos, breed, c, r) {
=======
function Cell(team, pos, r, c) {
>>>>>>> a69d5babe80b989f7013ccca7e8778f47f32f27c
	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(200,width-200), random(200,height-200));
	}
	
<<<<<<< HEAD
	this.breed = breed || "bacteria"
	this.lifetime = 25*60;
	this.team = team;
	this.r = r || 120;

	switch (this.breed) {
		case "bacteria":
			this.c = c || color(random(0,200), random(0,200), random(0,200), 100);
			break;
		case "virus":
			this.c = color(127, 191, 63, 100);
			break;
	}

=======
	this.lifetime = 25*60;
	this.team = team;
	this.r = r || 120;
	this.c = c || color(random(0,200), random(0,200), random(0,200), 100);
>>>>>>> a69d5babe80b989f7013ccca7e8778f47f32f27c
	this.cs = String(c);

	this.clicked = function(x, y) {
		var d = dist(this.pos.x, this.pos.y, x, y);
		if (d < this.r) {
			return true;
		} else {
			return false;
		}
	}

	this.deplete = function() {
		this.lifetime += -1;
	}

	this.move = function() {
		this.rf = (120/r);
		this.vel = createVector(this.rf*random(-6,6), this.rf*random(-6,6));
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	this.mitosis = function() {
		this.pos.x += random(-this.r,this.r)
		this.pos.y += random(-this.r,this.r)
		if (this.r > 75) {
<<<<<<< HEAD
			var cell = new Cell(this.team, this.pos, this.breed, this.c, this.r*0.8);
		}
		else {
			var cell = new Cell(this.team, this.pos, this.breed, this.c, this.r+floor(random(0,10)));
=======
			var cell = new Cell(this.team, this.pos, this.r*0.8, this.c);
		}
		else {
			var cell = new Cell(this.team, this.pos, this.r+floor(random(0,10)), this.c);
>>>>>>> a69d5babe80b989f7013ccca7e8778f47f32f27c
		}
		
		return cell;
	}

	this.show = function() {
		noStroke();
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}

	this.contact = function() {
		for (i=0; i<cells.length; i++) {
			if (this.r > cells[i].r) {
				this.big = true;
				this.cankill = true;
			} else if (this.r < cells[i].r) {
				this.big = false;
				this.cankill = true;
			} else {
				this.big = false;
				this.cankill = false;
			}
			var dc = dist(this.pos.x, this.pos.y, cells[i].pos.x, cells[i].pos.y);
			if (dc < this.r && this.c != cells[i].c) {
				return true;
			}
		}
		
	}

}