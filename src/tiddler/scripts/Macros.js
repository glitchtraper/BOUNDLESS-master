version.extensions["toggletagMacros"]={
major:1,minor:1,revision:0
};

macros["toggletag"]={
	handler:function(a,b,c){var p=e(a);var d=document.body;if(p){var t=p.getAttribute("data-tags");var i=t.indexOf(c[0]);if(b!="addtag"&&i>=0){var r=t.replace(c[0],"");p.setAttribute("data-tags",r);d.setAttribute("data-tags",r);}else{if(b!="removetag"&&i<0){var r=t+" "+c[0];p.setAttribute("data-tags",r);d.setAttribute("data-tags",r);}}}else{var t=state.history[0].passage.tags;var i=t.indexOf(c[0]);if(b!="addtag"&&i>=0){t.splice(i,1);
}else{if(b!="removetag"&&i<0){t.push(c[0]);}}d.setAttribute("data-tags",t.join(" "));}function e(f){while(f.parentNode&&!f.classList.contains("passage")){f=f.parentNode;}if(f!=document&&f.getAttribute("data-tags")){return f;}return null;}}};macros["addtag"]=macros["toggletag"];macros["removetag"]=macros["toggletag"];



version.extensions.timedgotoMacro={major:1,minor:2,revision:0};
macros["goto"]=macros.timedgoto={timer:null,handler:function(a,b,c,d){function cssTimeUnit(s){if(typeof s=="string"){if(s.slice(-2).toLowerCase()=="ms"){return +(s.slice(0,-2))||0
}else{if(s.slice(-1).toLowerCase()=="s"){return +(s.slice(0,-1))*1000||0
}}}throwError(a,s+" isn't a CSS time unit");return 0}var t,d,m,s;
t=c[c.length-1];d=d.fullArgs();m=0;if(b!="goto"){d=d.slice(0,d.lastIndexOf(t));
m=cssTimeUnit(t)}d=eval(Wikifier.parse(d));if(d+""&&state&&state.init){if(macros["goto"].timer){clearTimeout(macros["goto"].timer)
}s=state.history[0].passage.title;macros["goto"].timer=setTimeout(function(){if(state.history[0].passage.title==s){state.display(d,a)
}},m)}}};

version.extensions.cyclinglinkMacro={major:3,minor:3,revision:0};
macros.cyclinglink={handler:function(a,b,c){var rl="cyclingLink";
function toggleText(w){w.classList.remove("cyclingLinkInit");
w.classList.toggle(rl+"Enabled");w.classList.toggle(rl+"Disabled");
w.style.display=((w.style.display=="none")?"inline":"none")}switch(c[c.length-1]){case"end":var end=true;
c.pop();break;case"out":var out=true;c.pop();break}var v="";if(c.length&&c[0][0]=="$"){v=c[0].slice(1);
c.shift()}var h=state.history[0].variables;if(out&&h[v]===""){return
}var l=Wikifier.createInternalLink(a,null);l.className="internalLink cyclingLink";
l.setAttribute("data-cycle",0);for(var i=0;i<c.length;i++){var on=(i==Math.max(c.indexOf(h[v]),0));
var d=insertElement(null,"span",null,"cyclingLinkInit cyclingLink"+((on)?"En":"Dis")+"abled");
if(on){h[v]=c[i];l.setAttribute("data-cycle",i)}else{d.style.display="none"
}insertText(d,c[i]);if(on&&end&&i==c.length-1){l.parentNode.replaceChild(d,l)
}else{l.appendChild(d)}}l.onclick=function(){var t=this.childNodes;
var u=this.getAttribute("data-cycle")-0;var m=t.length;toggleText(t[u]);
u=(u+1);if(!(out&&u==m)){u%=m;if(v){h[v]=c[u]}}else{h[v]=""}if((end||out)&&u==m-(end?1:0)){if(end){var n=this.removeChild(t[u]);
n.className=rl+"End";n.style.display="inline";this.parentNode.replaceChild(n,this)
}else{this.parentNode.removeChild(this);return}return}toggleText(t[u]);
this.setAttribute("data-cycle",u)}}};