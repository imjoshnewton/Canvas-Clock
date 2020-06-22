function Arc(e,t,i,s,n,a,l){this.x=e,this.y=t,this.angle=0,this.radius=i,this.stops=s,this.color1=n,this.drawTicks=a||!1,this.mod=l||12,this.grad=c.createLinearGradient(-this.radius,this.radius/2,this.radius,this.radius/2),this.grad.addColorStop(0,this.color1),this.grad.addColorStop(1,this.color1),this.update=function(e){this.draw(e)},this.draw=function(e){if(c.lineWidth=smallDim*radRatios[strokeIndex]>minRads[strokeIndex]?smallDim*radRatios[strokeIndex]/WIDTH_CONST:minWidth,c.save(),c.translate(this.x,this.y),c.rotate(-Math.PI/2),c.beginPath(),c.arc(0,0,this.radius,0,e,!1),c.strokeStyle=this.grad,c.stroke(),c.closePath(),c.restore(),this.drawTicks){c.fillStyle="rgba(255,248,240,0.95)";for(var t=0;t<(this.stops>100?100:this.stops);t++)c.save(),c.translate(this.x,this.y),c.translate(this.radius*Math.sin(2*Math.PI*(t/(this.stops>100?100:this.stops))),this.radius*Math.cos(2*Math.PI*(t/(this.stops>100?100:this.stops)))),c.beginPath(),c.rotate(2*-Math.PI*(t/(this.stops>100?100:this.stops))),t%Math.ceil(this.stops/this.mod)?c.fillRect(0,c.lineWidth/2-c.lineWidth/3,2,c.lineWidth/3):c.fillRect(0,0,2,c.lineWidth/2),c.fill(),c.closePath(),c.restore()}}}function init(){smallDim=canvas.height<canvas.width?canvas.height:canvas.width,hours=new Arc(cCenter.x/2,cCenter.y/2,smallDim*radRatios[index]>minRads[index]?smallDim*radRatios[index]:minRads[index],24,colors[1],!0),minutes=new Arc(1.5*cCenter.x,cCenter.y/2,smallDim*radRatios[index]>minRads[index]?smallDim*radRatios[index]:minRads[index],60,colors[2],!0),seconds=new Arc(cCenter.x/2,1.5*cCenter.y,smallDim*radRatios[index]>minRads[index]?smallDim*radRatios[index]:minRads[index],60,colors[3],!0),millis=new Arc(1.5*cCenter.x,1.5*cCenter.y,smallDim*radRatios[index]>minRads[index]?smallDim*radRatios[index]:minRads[index],1e3,colors[4],!0,100)}function animate(){requestAnimationFrame(animate),d=new Date,lastSecond=newSecond,newSecond=d.getSeconds(),milAngle=d.getMilliseconds()?2*Math.PI*(d.getMilliseconds()/millis.stops):2*Math.PI,scAngle=d.getSeconds()?2*Math.PI*(d.getSeconds()/seconds.stops):2*Math.PI,mnAngle=d.getMinutes()?2*Math.PI*(d.getMinutes()/minutes.stops):2*Math.PI,hrAngle=d.getHours()?2*Math.PI*(d.getHours()/hours.stops):2*Math.PI,newSecond>lastSecond||0===newSecond&&59===lastSecond?split=.95:split-=.015,console.log(d.getMilliseconds()),fontSize=.29*smallDim>65?.29*smallDim/5*2.3:fontSize,c.clearRect(0,0,canvas.width,canvas.height),millis.update(milAngle),seconds.update(scAngle),minutes.update(mnAngle),hours.update(hrAngle),c.textBaseline="middle",c.textAlign="center",c.font=fontSize+"px 'Roboto'",c.fillStyle="rgba(255,248,240,0.95)",c.fillText(("0"+d.getHours()).slice(-2)+"  "+("0"+d.getMinutes()).slice(-2),cCenter.x,cCenter.y),c.fillStyle="rgba(255,248,240,"+split+")",c.fillText(":",cCenter.x,cCenter.y-fontSize/15)}var canvas=document.getElementById("canvas"),c=canvas.getContext("2d"),d=new Date,split=.95,lastSecond=0,newSecond=0,fontSize=30,minRads=[105,85,65,45,35,25,5],radRatios=[.45,.37,.29,.21,.17,.13,.05],index=4,strokeIndex=5,WIDTH_CONST=5,minWidth=15,mouse={x:window.innerWidth/2,y:window.innerHeight/2},cCenter={x:window.innerWidth/2,y:window.innerHeight/2},colors=["#30122d","#870734","#cb2d3e","#ef473a","#C1EEFF","#ffd6bf"],titleOp=1,millis,seconds,minutes,hours,smallDim,milAngle,scAngle,mnAngle,hrAngle;canvas.width=window.innerWidth,canvas.height=window.innerHeight-getElHeight("credits"),cCenter={x:canvas.width/2,y:canvas.height/2},init(),animate(),addEventListener("mousemove",function(e){mouse.x=e.clientX,mouse.y=e.clientY}),addEventListener("resize",function(){canvas.width=window.innerWidth,canvas.height=window.innerHeight-getElHeight("credits"),cCenter={x:canvas.width/2,y:canvas.height/2},init(),animate()}),canvas.addEventListener("click",function(e){var t=e.srcElement;document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen()},!1);