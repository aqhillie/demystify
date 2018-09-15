var canvas = document.getElementById("canvas");

var sW = canvas.getAttribute("width");
var sH = canvas.getAttribute("height");

console.log(sW + " x " + sH);

exit();

var num_p = 5;
var speed = 5;
var fadeSpeed = 12;

var t = new Array();
var p = new Array();

for (i=0;i<num_p;i++) {
	p[i] = new Array();
	p[i].x = Math.random() * sW;
	p[i].y = Math.random() * sH;
	p[i].a = Math.random() * (Math.PI*2);
}

this.onEnterFrame = function() {
	this.clear();
	this.lineStyle(1,0x0feDb7,100);
	dat = new Array();
	for (i=0;i<p.length;i++) {
		if (i==0) this.moveTo(p[i].x,p[i].y);
		else this.lineTo(p[i].x,p[i].y);
		var speedx = Math.cos(p[i].a)*speed; 
		var speedy = Math.sin(p[i].a)*speed;
		if (p[i].x + speedx >= sW || p[i].x + speedx <= 0) { var mod = 0; var hitWall = true; }
		if (p[i].y + speedy >= sH || p[i].y + speedy <= 0) { var mod = Math.PI; var hitWall = true; }
			if (hitWall) {
				p[i].a = ((p[i].a + Math.PI) - (p[i].a * 2)) + mod;
				if (p[i].a > Math.PI*2 ) p[i].a -= Math.PI*2;
				else if (p[i].a < 0) p[i].a += Math.PI*2;
				var speedx = Math.cos(p[i].a)*speed; 
				var speedy = Math.sin(p[i].a)*speed;
				hitWall = false;
			}
		p[i].x += speedx;
		p[i].y += speedy;
		dat.push(p[i].x,p[i].y);
	}
	dat.push(100);
	t.push(dat);
	this.lineTo(p[0].x,p[0].y);
	for (i=0;i<t.length;i++) {
		var alpha = t[i][num_p*2];
		if (alpha <= 0) t.splice(i,1);
		this.lineStyle(1,0x0feDb7,alpha);
		for (j=0;j<num_p*2;j+=2) {
			if (j==0) this.moveTo(t[i][j],t[i][j+1]);
			else this.lineTo(t[i][j],t[i][j+1]);
		}
		this.lineTo(t[i][0],t[i][1]);
		t[i][num_p*2] -= fadeSpeed;
	}
}
