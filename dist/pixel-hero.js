/* Vimaksh design system: https://github.com/yakosasam797/vimaksh-design-system */
var I="attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}",z=`
precision highp float;
uniform vec2 uRes;        // canvas size in device px
uniform float uCell;      // cell size in device px
uniform float uT, uReveal, uDpr;
uniform vec4 uMark;       // mark box: x, y (top-left, device px), size, 0
uniform vec3 uPtr;        // pointer x, y (device px, top-left origin), strength
uniform vec4 uCopy;       // copy-safe box: x0, y0, x1, y1 (device px)
uniform sampler2D uMask;  // r = coral arrows, g = red arrow
uniform vec3 cMist, cGlyph, cCoral, cRed, cCoralD, cRedD;
uniform float uDark;

float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(17.1,9.3);a*=.5;}return v;}

// 5x5 glyphs, row-major from the top: ">" and "<"
float glyph(vec2 s, bool right){
  vec2 g=floor(s*5.);
  float x=right?g.x:4.-g.x, y=g.y;
  float d=x-min(y,4.-y);
  return (d>=0.&&d<2.)?1.:0.;   // two-pixel strokes so the chevrons read at small sizes
}

void main(){
  vec2 px=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y);
  vec2 cell=floor(px/uCell), cc=(cell+.5)*uCell, sub=(px-cell*uCell)/uCell;

  // ---- the flowing field (domain-warped noise, stretched horizontally like scan lines) ----
  vec2 p=cc/uRes.y*vec2(1.6,4.2);
  float t=uT;
  vec2 q=vec2(fbm(p+vec2(0.,t*.06)),fbm(p+vec2(5.2,1.3)-vec2(t*.05,0.)));
  float v=fbm(p+2.2*q+vec2(t*.04,-t*.02));
  // the pointer stirs it
  float dp=length((cc-uPtr.xy)/uRes.y);
  v+=uPtr.z*.28*exp(-dp*dp*28.);
  // keep the copy readable: the field thins out under the headline
  vec2 inC=step(uCopy.xy,cc)*step(cc,uCopy.zw);
  float copyFade=inC.x*inC.y;
  float edgeL=smoothstep(uCopy.z+uRes.x*.08,uCopy.z,cc.x)*smoothstep(uCopy.w+uRes.y*.12,uCopy.w,cc.y);
  v-=max(copyFade,edgeL)*.42;
  // a cell flips with a little per-cell jitter so the boundary is pixel-crisp and alive
  float thr=.56+(hash(cell+floor(t*6.))-.5)*.035;
  float onB=step(thr,v);

  // ---- the mark, built of the same cells ----
  vec2 muv=(cc-uMark.xy)/uMark.z;
  vec4 m=vec4(0.);
  float halo=0.;
  if(muv.x>-.1&&muv.y>-.1&&muv.x<1.1&&muv.y<1.1){
    vec2 uv=clamp(muv,0.,1.);
    if(muv==uv) m=texture2D(uMask,uv);   // only inside the mark box: no edge pixels repeated outside it
    // clear margin: is any part of the mark within ~2.5 cells?
    float r=2.5*uCell/uMark.z;
    for(int k=0;k<8;k++){float an=float(k)*.7854;vec4 hb=texture2D(uMask,clamp(uv+vec2(cos(an),sin(an))*r,0.,1.));halo=max(halo,max(hb.r,hb.g));}
  }
  float cov=max(m.r,m.g);
  // edge cells shimmer with the field; the body is solid
  float edge=(cov>.05&&cov<.95)?1.:0.;
  float jit=(noise(cell*.7+vec2(t*1.3,0.))-.5)*.55*edge;
  float rv=step(hash(cell*1.37+3.1),uReveal*1.15-.05);  // pixel-by-pixel assembly on load
  float onM=step(.5,cov+jit)*rv;
  bool isRed=m.g>m.r;

  vec3 col=vec3(0.); float a=0.;
  if(onM>.5){
    // solid brand colour, with a hairline between cells so the mark reads as pixels
    float gap=(sub.x<1./uCell*uDpr||sub.y<1./uCell*uDpr)?1.:0.;
    col=isRed?mix(cRed,cRedD,gap*.6):mix(cCoral,cCoralD,gap*.6); a=1.;
  } else if(onB>.5 && halo<.25){
    // chevron texture: rows alternate > and <, glyphs inset in each cell
    bool right=mod(cell.y,2.)<1.;
    vec2 s=(sub-.14)/.72;
    float g=(s.x>=0.&&s.y>=0.&&s.x<1.&&s.y<1.)?glyph(s,right):0.;
    col=mix(cMist,cGlyph,g); a=1.;
  }
  gl_FragColor=vec4(col*a,a);
}`,G=t=>{let u=parseInt(t.slice(1),16);return[(u>>16&255)/255,(u>>8&255)/255,(u&255)/255]},q={light:{cMist:"#DDE4FF",cGlyph:"#2D36FF",cCoral:"#FF5E55",cRed:"#E42114",cCoralD:"#E14A42",cRedD:"#B5180E",uDark:0},dark:{cMist:"#1A1D45",cGlyph:"#5D6BFF",cCoral:"#FF5E55",cRed:"#E42114",cCoralD:"#C7423B",cRedD:"#8F130B",uDark:1}};async function X(){let t=await(await fetch(new URL("./brand/svg/vimaksh-mark.svg",import.meta.url))).text(),u=new DOMParser().parseFromString(t,"image/svg+xml"),e=512,f=document.createElement("canvas");f.width=f.height=e;let a=f.getContext("2d");a.fillStyle="#000",a.fillRect(0,0,e,e),a.globalCompositeOperation="lighter";let h=[115,131,350,318.7],s=e/Math.max(h[2],h[3]),l=(e-h[2]*s)/2,M=(e-h[3]*s)/2;return a.setTransform(s,0,0,s,l-h[0]*s,M-h[1]*s),u.querySelectorAll("path").forEach(x=>{let v=/E32112/i.test(x.getAttribute("fill"));a.fillStyle=v?"#00ff00":"#ff0000",a.fill(new Path2D(x.getAttribute("d")))}),f}async function O(t,{reduced:u=!1}={}){let e=t.getContext("webgl",{premultipliedAlpha:!0,alpha:!0,antialias:!1});if(!e)return!1;let f=(o,i)=>{let r=e.createShader(o);if(e.shaderSource(r,i),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(r));return r},a=e.createProgram();e.attachShader(a,f(e.VERTEX_SHADER,I)),e.attachShader(a,f(e.FRAGMENT_SHADER,z)),e.linkProgram(a),e.useProgram(a);let h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let s=e.getAttribLocation(a,"p");e.enableVertexAttribArray(s),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0);let l=o=>e.getUniformLocation(a,o),M=await X(),x=e.createTexture();e.bindTexture(e.TEXTURE_2D,x),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,M),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.uniform1i(l("uMask"),0);let v=()=>{let o=q[document.documentElement.dataset.theme==="dark"?"dark":"light"];for(let i of["cMist","cGlyph","cCoral","cRed","cCoralD","cRedD"])e.uniform3fv(l(i),G(o[i]));e.uniform1f(l("uDark"),o.uDark),y=!0},y=!0;v(),addEventListener("themechange",v);let n={x:-1e4,y:-1e4,s:0,gs:0};addEventListener("pointermove",o=>{let i=t.getBoundingClientRect(),r=Math.min(devicePixelRatio,2);n.x=(o.clientX-i.left)*r,n.y=(o.clientY-i.top)*r,n.gs=1},{passive:!0});let R=document.querySelector(".hero-copy"),P=0,S=0,c=1,A=!0,_=performance.now(),k=12,E=0,T=0;new IntersectionObserver(([o])=>{A=o.isIntersecting}).observe(t);let b=()=>{c=Math.min(devicePixelRatio,2);let o=t.clientWidth,i=t.clientHeight;P=o,S=i,t.width=Math.round(o*c),t.height=Math.round(i*c),e.viewport(0,0,t.width,t.height);let r=o/i<.9,C=i*.47;if(r&&R){let d=R.getBoundingClientRect(),p=t.getBoundingClientRect();C=Math.max(C,d.bottom-p.top+28)}let U=i-C-56,g=(r?Math.max(120,Math.min(o*.78,U)):Math.min(i*.64,o*.42))*c,m=Math.max(5*c,Math.round(g/56));e.uniform2f(l("uRes"),t.width,t.height),e.uniform1f(l("uCell"),m),e.uniform1f(l("uDpr"),c);let D=r?(t.width-g)/2:t.width*.6-g/2,w=r?C*c:(t.height-g)/2+t.height*.02;if(D=Math.round(D/m)*m,w=Math.round(w/m)*m,e.uniform4f(l("uMark"),D,w,Math.round(g/m)*m,0),R){let d=R.getBoundingClientRect(),p=t.getBoundingClientRect();e.uniform4f(l("uCopy"),(d.left-p.left-24)*c,(d.top-p.top-24)*c,(d.right-p.left+24)*c,(d.bottom-p.top+24)*c)}y=!0};b(),addEventListener("resize",b),document.fonts?.ready.then(b),t.classList.add("ready"),window.__hero=!0;let L=u?.5:1,B=1/30,F=o=>{requestAnimationFrame(F);let i=Math.min(.1,(o-_)/1e3);if(_=o,!A||document.hidden||scrollY>innerHeight*1.05||(E+=i,E<B&&!y))return;let r=Math.min(E,.1);E=0,y=!1,k+=r*L,T=Math.min(1,T+r/(u?1.2:2.2)),n.gs*=Math.exp(-r*1.2),n.s+=(n.gs-n.s)*(1-Math.exp(-r*4)),e.uniform1f(l("uT"),k),e.uniform1f(l("uReveal"),1-Math.pow(1-T,3)),e.uniform3f(l("uPtr"),n.x,n.y,n.s),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3)};return requestAnimationFrame(F),!0}export{O as startPixelHero};
