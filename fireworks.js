/* ===== ROCKET FIREWORK BACKGROUND ===== */
(function(){
    const canvas = document.getElementById("rocketCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");

    let w,h;
    
    const DPR = Math.min(1.25, window.devicePixelRatio || 1);
    function resize(){
        w = canvas.width = innerWidth * DPR;
        h = canvas.height = innerHeight * DPR;
        canvas.style.width = innerWidth + "px";
        canvas.style.height = innerHeight + "px";
        ctx.setTransform(DPR,0,0,DPR,0,0);
    }

    resize();
    addEventListener("resize", resize);

    class Particle{
        constructor(x,y,c){
            this.x=x; this.y=y;
            this.vx=(Math.random()-0.5)*6;
            this.vy=(Math.random()-0.5)*6;
            this.a=1;
            this.c=c;
        }
        update(){
            this.x+=this.vx;
            this.y+=this.vy;
            this.vy+=0.04;
            this.a-=0.015;
            return this.a<=0;
        }
        draw(){
            ctx.globalAlpha=this.a;
            ctx.fillStyle=this.c;
            ctx.beginPath();
            ctx.arc(this.x,this.y,2.5,0,Math.PI*2);
            ctx.fill();
            ctx.globalAlpha=1;
        }
    }

    class Firework{
        constructor(){
            this.x=Math.random()*w;
            this.y=h;
            this.ty=Math.random()*h*0.45;
            this.v=8+Math.random()*4;
            this.c=`hsl(${Math.random()*360},100%,70%)`;
        }
        update(){
            this.y-=this.v;
            if(this.y<=this.ty){
                for(let i=0;i<24;i++) particles.push(new Particle(this.x,this.y,this.c));
                return true;
            }
            return false;
        }
        draw(){
            ctx.fillStyle=this.c;
            ctx.beginPath();
            ctx.arc(this.x,this.y,2,0,Math.PI*2);
            ctx.fill();
        }
    }

    let fireworks=[], particles=[];

    function loop(){
        ctx.fillStyle="rgba(0,0,0,0.12)";
        ctx.fillRect(0,0,w,h);

        if(Math.random()<0.02) fireworks.push(new Firework());

        fireworks=fireworks.filter(f=>{
            f.draw();
            return !f.update();
        });

        particles=particles.filter(p=>{
            p.draw();
            return !p.update();
        });

        requestAnimationFrame(loop);
    }
    loop();
})();
