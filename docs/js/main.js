function Object(e,t,n,i,l){this.x=e,this.y=t,this.angle=0,this.radius=n,this.color1=i,this.color2=l||i,this.grad=c.createLinearGradient(-this.radius,this.radius/2,this.radius,this.radius/2),this.grad.addColorStop(0,this.color1),this.grad.addColorStop(1,this.color2),this.update=function(e){this.draw(e)},this.draw=function(e){c.save(),c.translate(this.x,this.y),c.rotate(-Math.PI/2),c.beginPath(),c.arc(0,0,this.radius,0,e,!1),c.lineWidth=.29*smallDim>65?.29*smallDim/5:15,c.strokeStyle=this.grad,c.stroke(),c.closePath(),c.restore()}}function init(){smallDim=canvas.height<canvas.width?canvas.height:canvas.width,seconds=new Object(cCenter.x,cCenter.y,.29*smallDim>65?.29*smallDim:65,colors[3]),minutes=new Object(cCenter.x,cCenter.y,.37*smallDim>85?.37*smallDim:85,colors[1]),hours=new Object(cCenter.x,cCenter.y,.45*smallDim>105?.45*smallDim:105,colors[0])}function animate(){requestAnimationFrame(animate),d=new Date,lastSecond=newSecond,newSecond=d.getSeconds(),newSecond>lastSecond||0===newSecond&&59===lastSecond?split=.95:(split-=.015,titleOp>.15&&(titleOp-=.0015)),document.getElementById("title").style.opacity=titleOp,fontSize=.29*smallDim>65?.29*smallDim/5*2.3:30,c.clearRect(0,0,canvas.width,canvas.height),seconds.update(2*Math.PI*(d.getSeconds()/59)+.01),minutes.update(2*Math.PI*(d.getMinutes()/60)+.01),hours.update(2*Math.PI*(d.getHours()/24)+.01),c.textBaseline="middle",c.textAlign="center",c.font=fontSize+"px 'Roboto'",c.fillStyle="rgba(255,255,255,0.95)",c.fillText(("0"+d.getHours()).slice(-2)+" "+("0"+d.getMinutes()).slice(-2),cCenter.x,cCenter.y),c.fillStyle="rgba(235,235,235,"+split+")",c.fillText(":",cCenter.x,cCenter.y-fontSize/15)}var canvas=document.getElementById("canvas"),c=canvas.getContext("2d"),d=new Date,split=.95,lastSecond=0,newSecond=0,fontSize=30,mouse={x:window.innerWidth/2,y:window.innerHeight/2},cCenter={x:window.innerWidth/2,y:window.innerHeight/2},colors=["#30CCC1","#709996","#55FF94","#FF95BB","#CC30B5"],titleOp=1,seconds,minutes,hours,smallDim;canvas.width=window.innerWidth,canvas.height=window.innerHeight-function(e){var t,n,i=document.getElementById("title");return document.all?(t=parseInt(i.currentStyle.height),n=parseInt(i.currentStyle.marginTop,10)+parseInt(i.currentStyle.marginBottom,10)):(t=parseInt(document.defaultView.getComputedStyle(i,"").getPropertyValue("height")),n=parseInt(document.defaultView.getComputedStyle(i,"").getPropertyValue("margin-top"))+parseInt(document.defaultView.getComputedStyle(i,"").getPropertyValue("margin-bottom"))),t+n}(),cCenter={x:canvas.width/2,y:canvas.height/2},init(),animate(),addEventListener("mousemove",function(e){mouse.x=e.clientX,mouse.y=e.clientY}),addEventListener("resize",function(){canvas.width=window.innerWidth,canvas.height=window.innerHeight-function(e){var t,n,i=document.getElementById("title");return document.all?(t=i.currentStyle.height,n=parseInt(i.currentStyle.marginTop,10)+parseInt(i.currentStyle.marginBottom,10)):(t=parseInt(document.defaultView.getComputedStyle(i,"").getPropertyValue("height")),n=parseInt(document.defaultView.getComputedStyle(i,"").getPropertyValue("margin-top"))+parseInt(document.defaultView.getComputedStyle(i,"").getPropertyValue("margin-bottom"))),t+n}(),cCenter={x:canvas.width/2,y:canvas.height/2},init()}),canvas.addEventListener("click",function(e){var t=e.srcElement;document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen()},!1);