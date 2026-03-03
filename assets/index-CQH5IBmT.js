(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();var vh={exports:{}},qo={};var t_;function fS(){if(t_)return qo;t_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return qo.Fragment=t,qo.jsx=n,qo.jsxs=n,qo}var e_;function hS(){return e_||(e_=1,vh.exports=fS()),vh.exports}var Jt=hS(),xh={exports:{}},_e={};var n_;function dS(){if(n_)return _e;n_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),x=Symbol.iterator;function M(B){return B===null||typeof B!="object"?null:(B=x&&B[x]||B["@@iterator"],typeof B=="function"?B:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,y={};function v(B,ut,At){this.props=B,this.context=ut,this.refs=y,this.updater=At||b}v.prototype.isReactComponent={},v.prototype.setState=function(B,ut){if(typeof B!="object"&&typeof B!="function"&&B!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,B,ut,"setState")},v.prototype.forceUpdate=function(B){this.updater.enqueueForceUpdate(this,B,"forceUpdate")};function P(){}P.prototype=v.prototype;function w(B,ut,At){this.props=B,this.context=ut,this.refs=y,this.updater=At||b}var N=w.prototype=new P;N.constructor=w,A(N,v.prototype),N.isPureReactComponent=!0;var F=Array.isArray;function H(){}var z={H:null,A:null,T:null,S:null},Z=Object.prototype.hasOwnProperty;function D(B,ut,At){var j=At.ref;return{$$typeof:r,type:B,key:ut,ref:j!==void 0?j:null,props:At}}function O(B,ut){return D(B.type,ut,B.props)}function q(B){return typeof B=="object"&&B!==null&&B.$$typeof===r}function $(B){var ut={"=":"=0",":":"=2"};return"$"+B.replace(/[=:]/g,function(At){return ut[At]})}var ot=/\/+/g;function gt(B,ut){return typeof B=="object"&&B!==null&&B.key!=null?$(""+B.key):ut.toString(36)}function dt(B){switch(B.status){case"fulfilled":return B.value;case"rejected":throw B.reason;default:switch(typeof B.status=="string"?B.then(H,H):(B.status="pending",B.then(function(ut){B.status==="pending"&&(B.status="fulfilled",B.value=ut)},function(ut){B.status==="pending"&&(B.status="rejected",B.reason=ut)})),B.status){case"fulfilled":return B.value;case"rejected":throw B.reason}}throw B}function V(B,ut,At,j,X){var R=typeof B;(R==="undefined"||R==="boolean")&&(B=null);var C=!1;if(B===null)C=!0;else switch(R){case"bigint":case"string":case"number":C=!0;break;case"object":switch(B.$$typeof){case r:case t:C=!0;break;case _:return C=B._init,V(C(B._payload),ut,At,j,X)}}if(C)return X=X(B),C=j===""?"."+gt(B,0):j,F(X)?(At="",C!=null&&(At=C.replace(ot,"$&/")+"/"),V(X,ut,At,"",function(et){return et})):X!=null&&(q(X)&&(X=O(X,At+(X.key==null||B&&B.key===X.key?"":(""+X.key).replace(ot,"$&/")+"/")+C)),ut.push(X)),1;C=0;var it=j===""?".":j+":";if(F(B))for(var _t=0;_t<B.length;_t++)j=B[_t],R=it+gt(j,_t),C+=V(j,ut,At,R,X);else if(_t=M(B),typeof _t=="function")for(B=_t.call(B),_t=0;!(j=B.next()).done;)j=j.value,R=it+gt(j,_t++),C+=V(j,ut,At,R,X);else if(R==="object"){if(typeof B.then=="function")return V(dt(B),ut,At,j,X);throw ut=String(B),Error("Objects are not valid as a React child (found: "+(ut==="[object Object]"?"object with keys {"+Object.keys(B).join(", ")+"}":ut)+"). If you meant to render a collection of children, use an array instead.")}return C}function k(B,ut,At){if(B==null)return B;var j=[],X=0;return V(B,j,"","",function(R){return ut.call(At,R,X++)}),j}function W(B){if(B._status===-1){var ut=B._result;ut=ut(),ut.then(function(At){(B._status===0||B._status===-1)&&(B._status=1,B._result=At)},function(At){(B._status===0||B._status===-1)&&(B._status=2,B._result=At)}),B._status===-1&&(B._status=0,B._result=ut)}if(B._status===1)return B._result.default;throw B._result}var Rt=typeof reportError=="function"?reportError:function(B){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var ut=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof B=="object"&&B!==null&&typeof B.message=="string"?String(B.message):String(B),error:B});if(!window.dispatchEvent(ut))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",B);return}console.error(B)},bt={map:k,forEach:function(B,ut,At){k(B,function(){ut.apply(this,arguments)},At)},count:function(B){var ut=0;return k(B,function(){ut++}),ut},toArray:function(B){return k(B,function(ut){return ut})||[]},only:function(B){if(!q(B))throw Error("React.Children.only expected to receive a single React element child.");return B}};return _e.Activity=g,_e.Children=bt,_e.Component=v,_e.Fragment=n,_e.Profiler=l,_e.PureComponent=w,_e.StrictMode=s,_e.Suspense=m,_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,_e.__COMPILER_RUNTIME={__proto__:null,c:function(B){return z.H.useMemoCache(B)}},_e.cache=function(B){return function(){return B.apply(null,arguments)}},_e.cacheSignal=function(){return null},_e.cloneElement=function(B,ut,At){if(B==null)throw Error("The argument must be a React element, but you passed "+B+".");var j=A({},B.props),X=B.key;if(ut!=null)for(R in ut.key!==void 0&&(X=""+ut.key),ut)!Z.call(ut,R)||R==="key"||R==="__self"||R==="__source"||R==="ref"&&ut.ref===void 0||(j[R]=ut[R]);var R=arguments.length-2;if(R===1)j.children=At;else if(1<R){for(var C=Array(R),it=0;it<R;it++)C[it]=arguments[it+2];j.children=C}return D(B.type,X,j)},_e.createContext=function(B){return B={$$typeof:f,_currentValue:B,_currentValue2:B,_threadCount:0,Provider:null,Consumer:null},B.Provider=B,B.Consumer={$$typeof:c,_context:B},B},_e.createElement=function(B,ut,At){var j,X={},R=null;if(ut!=null)for(j in ut.key!==void 0&&(R=""+ut.key),ut)Z.call(ut,j)&&j!=="key"&&j!=="__self"&&j!=="__source"&&(X[j]=ut[j]);var C=arguments.length-2;if(C===1)X.children=At;else if(1<C){for(var it=Array(C),_t=0;_t<C;_t++)it[_t]=arguments[_t+2];X.children=it}if(B&&B.defaultProps)for(j in C=B.defaultProps,C)X[j]===void 0&&(X[j]=C[j]);return D(B,R,X)},_e.createRef=function(){return{current:null}},_e.forwardRef=function(B){return{$$typeof:h,render:B}},_e.isValidElement=q,_e.lazy=function(B){return{$$typeof:_,_payload:{_status:-1,_result:B},_init:W}},_e.memo=function(B,ut){return{$$typeof:p,type:B,compare:ut===void 0?null:ut}},_e.startTransition=function(B){var ut=z.T,At={};z.T=At;try{var j=B(),X=z.S;X!==null&&X(At,j),typeof j=="object"&&j!==null&&typeof j.then=="function"&&j.then(H,Rt)}catch(R){Rt(R)}finally{ut!==null&&At.types!==null&&(ut.types=At.types),z.T=ut}},_e.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},_e.use=function(B){return z.H.use(B)},_e.useActionState=function(B,ut,At){return z.H.useActionState(B,ut,At)},_e.useCallback=function(B,ut){return z.H.useCallback(B,ut)},_e.useContext=function(B){return z.H.useContext(B)},_e.useDebugValue=function(){},_e.useDeferredValue=function(B,ut){return z.H.useDeferredValue(B,ut)},_e.useEffect=function(B,ut){return z.H.useEffect(B,ut)},_e.useEffectEvent=function(B){return z.H.useEffectEvent(B)},_e.useId=function(){return z.H.useId()},_e.useImperativeHandle=function(B,ut,At){return z.H.useImperativeHandle(B,ut,At)},_e.useInsertionEffect=function(B,ut){return z.H.useInsertionEffect(B,ut)},_e.useLayoutEffect=function(B,ut){return z.H.useLayoutEffect(B,ut)},_e.useMemo=function(B,ut){return z.H.useMemo(B,ut)},_e.useOptimistic=function(B,ut){return z.H.useOptimistic(B,ut)},_e.useReducer=function(B,ut,At){return z.H.useReducer(B,ut,At)},_e.useRef=function(B){return z.H.useRef(B)},_e.useState=function(B){return z.H.useState(B)},_e.useSyncExternalStore=function(B,ut,At){return z.H.useSyncExternalStore(B,ut,At)},_e.useTransition=function(){return z.H.useTransition()},_e.version="19.2.4",_e}var i_;function np(){return i_||(i_=1,xh.exports=dS()),xh.exports}var os=np(),yh={exports:{}},Yo={},Sh={exports:{}},Mh={};var a_;function pS(){return a_||(a_=1,(function(r){function t(V,k){var W=V.length;V.push(k);t:for(;0<W;){var Rt=W-1>>>1,bt=V[Rt];if(0<l(bt,k))V[Rt]=k,V[W]=bt,W=Rt;else break t}}function n(V){return V.length===0?null:V[0]}function s(V){if(V.length===0)return null;var k=V[0],W=V.pop();if(W!==k){V[0]=W;t:for(var Rt=0,bt=V.length,B=bt>>>1;Rt<B;){var ut=2*(Rt+1)-1,At=V[ut],j=ut+1,X=V[j];if(0>l(At,W))j<bt&&0>l(X,At)?(V[Rt]=X,V[j]=W,Rt=j):(V[Rt]=At,V[ut]=W,Rt=ut);else if(j<bt&&0>l(X,W))V[Rt]=X,V[j]=W,Rt=j;else break t}}return k}function l(V,k){var W=V.sortIndex-k.sortIndex;return W!==0?W:V.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],_=1,g=null,x=3,M=!1,b=!1,A=!1,y=!1,v=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;function N(V){for(var k=n(p);k!==null;){if(k.callback===null)s(p);else if(k.startTime<=V)s(p),k.sortIndex=k.expirationTime,t(m,k);else break;k=n(p)}}function F(V){if(A=!1,N(V),!b)if(n(m)!==null)b=!0,H||(H=!0,$());else{var k=n(p);k!==null&&dt(F,k.startTime-V)}}var H=!1,z=-1,Z=5,D=-1;function O(){return y?!0:!(r.unstable_now()-D<Z)}function q(){if(y=!1,H){var V=r.unstable_now();D=V;var k=!0;try{t:{b=!1,A&&(A=!1,P(z),z=-1),M=!0;var W=x;try{e:{for(N(V),g=n(m);g!==null&&!(g.expirationTime>V&&O());){var Rt=g.callback;if(typeof Rt=="function"){g.callback=null,x=g.priorityLevel;var bt=Rt(g.expirationTime<=V);if(V=r.unstable_now(),typeof bt=="function"){g.callback=bt,N(V),k=!0;break e}g===n(m)&&s(m),N(V)}else s(m);g=n(m)}if(g!==null)k=!0;else{var B=n(p);B!==null&&dt(F,B.startTime-V),k=!1}}break t}finally{g=null,x=W,M=!1}k=void 0}}finally{k?$():H=!1}}}var $;if(typeof w=="function")$=function(){w(q)};else if(typeof MessageChannel<"u"){var ot=new MessageChannel,gt=ot.port2;ot.port1.onmessage=q,$=function(){gt.postMessage(null)}}else $=function(){v(q,0)};function dt(V,k){z=v(function(){V(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(V){V.callback=null},r.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Z=0<V?Math.floor(1e3/V):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(V){switch(x){case 1:case 2:case 3:var k=3;break;default:k=x}var W=x;x=k;try{return V()}finally{x=W}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(V,k){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var W=x;x=V;try{return k()}finally{x=W}},r.unstable_scheduleCallback=function(V,k,W){var Rt=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?Rt+W:Rt):W=Rt,V){case 1:var bt=-1;break;case 2:bt=250;break;case 5:bt=1073741823;break;case 4:bt=1e4;break;default:bt=5e3}return bt=W+bt,V={id:_++,callback:k,priorityLevel:V,startTime:W,expirationTime:bt,sortIndex:-1},W>Rt?(V.sortIndex=W,t(p,V),n(m)===null&&V===n(p)&&(A?(P(z),z=-1):A=!0,dt(F,W-Rt))):(V.sortIndex=bt,t(m,V),b||M||(b=!0,H||(H=!0,$()))),V},r.unstable_shouldYield=O,r.unstable_wrapCallback=function(V){var k=x;return function(){var W=x;x=k;try{return V.apply(this,arguments)}finally{x=W}}}})(Mh)),Mh}var s_;function mS(){return s_||(s_=1,Sh.exports=pS()),Sh.exports}var Eh={exports:{}},On={};var r_;function gS(){if(r_)return On;r_=1;var r=np();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var s={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:g==null?null:""+g,children:m,containerInfo:p,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return On.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,On.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,_)},On.flushSync=function(m){var p=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=_,s.d.f()}},On.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},On.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},On.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,g=h(_,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:M}):_==="script"&&s.d.X(m,{crossOrigin:g,integrity:x,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},On.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},On.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,g=h(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},On.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},On.requestFormReset=function(m){s.d.r(m)},On.unstable_batchedUpdates=function(m,p){return m(p)},On.useFormState=function(m,p,_){return f.H.useFormState(m,p,_)},On.useFormStatus=function(){return f.H.useHostTransitionStatus()},On.version="19.2.4",On}var o_;function _S(){if(o_)return Eh.exports;o_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Eh.exports=gS(),Eh.exports}var l_;function vS(){if(l_)return Yo;l_=1;var r=mS(),t=np(),n=_S();function s(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,a=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(a=i.return),e=i.return;while(e)}return i.tag===3?a:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(s(188));return i!==e?null:e}for(var a=e,o=i;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),e;if(d===o)return m(u),i;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var S=!1,U=u.child;U;){if(U===a){S=!0,a=u,o=d;break}if(U===o){S=!0,o=u,a=d;break}U=U.sibling}if(!S){for(U=d.child;U;){if(U===a){S=!0,a=d,o=u;break}if(U===o){S=!0,o=d,a=u;break}U=U.sibling}if(!S)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:i}function _(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=_(e),i!==null)return i;e=e.sibling}return null}var g=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),w=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),F=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),Z=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),O=Symbol.for("react.memo_cache_sentinel"),q=Symbol.iterator;function $(e){return e===null||typeof e!="object"?null:(e=q&&e[q]||e["@@iterator"],typeof e=="function"?e:null)}var ot=Symbol.for("react.client.reference");function gt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ot?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case A:return"Fragment";case v:return"Profiler";case y:return"StrictMode";case F:return"Suspense";case H:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case w:return e.displayName||"Context";case P:return(e._context.displayName||"Context")+".Consumer";case N:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case z:return i=e.displayName||null,i!==null?i:gt(e.type)||"Memo";case Z:i=e._payload,e=e._init;try{return gt(e(i))}catch{}}return null}var dt=Array.isArray,V=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W={pending:!1,data:null,method:null,action:null},Rt=[],bt=-1;function B(e){return{current:e}}function ut(e){0>bt||(e.current=Rt[bt],Rt[bt]=null,bt--)}function At(e,i){bt++,Rt[bt]=e.current,e.current=i}var j=B(null),X=B(null),R=B(null),C=B(null);function it(e,i){switch(At(R,i),At(X,e),At(j,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?E0(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=E0(i),e=b0(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}ut(j),At(j,e)}function _t(){ut(j),ut(X),ut(R)}function et(e){e.memoizedState!==null&&At(C,e);var i=j.current,a=b0(i,e.type);i!==a&&(At(X,e),At(j,a))}function Lt(e){X.current===e&&(ut(j),ut(X)),C.current===e&&(ut(C),Vo._currentValue=W)}var Ft,Ot;function K(e){if(Ft===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);Ft=i&&i[1]||"",Ot=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ft+e+Ot}var st=!1;function ct(e,i){if(!e||st)return"";st=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var wt=function(){throw Error()};if(Object.defineProperty(wt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(wt,[])}catch(St){var mt=St}Reflect.construct(e,[],wt)}else{try{wt.call()}catch(St){mt=St}e.call(wt.prototype)}}else{try{throw Error()}catch(St){mt=St}(wt=e())&&typeof wt.catch=="function"&&wt.catch(function(){})}}catch(St){if(St&&mt&&typeof St.stack=="string")return[St.stack,mt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),S=d[0],U=d[1];if(S&&U){var Y=S.split(`
`),ht=U.split(`
`);for(u=o=0;o<Y.length&&!Y[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ht.length&&!ht[u].includes("DetermineComponentFrameRoot");)u++;if(o===Y.length||u===ht.length)for(o=Y.length-1,u=ht.length-1;1<=o&&0<=u&&Y[o]!==ht[u];)u--;for(;1<=o&&0<=u;o--,u--)if(Y[o]!==ht[u]){if(o!==1||u!==1)do if(o--,u--,0>u||Y[o]!==ht[u]){var Tt=`
`+Y[o].replace(" at new "," at ");return e.displayName&&Tt.includes("<anonymous>")&&(Tt=Tt.replace("<anonymous>",e.displayName)),Tt}while(1<=o&&0<=u);break}}}finally{st=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?K(a):""}function Mt(e,i){switch(e.tag){case 26:case 27:case 5:return K(e.type);case 16:return K("Lazy");case 13:return e.child!==i&&i!==null?K("Suspense Fallback"):K("Suspense");case 19:return K("SuspenseList");case 0:case 15:return ct(e.type,!1);case 11:return ct(e.type.render,!1);case 1:return ct(e.type,!0);case 31:return K("Activity");default:return""}}function T(e){try{var i="",a=null;do i+=Mt(e,a),a=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var G=Object.prototype.hasOwnProperty,Et=r.unstable_scheduleCallback,Gt=r.unstable_cancelCallback,zt=r.unstable_shouldYield,I=r.unstable_requestPaint,E=r.unstable_now,J=r.unstable_getCurrentPriorityLevel,xt=r.unstable_ImmediatePriority,Dt=r.unstable_UserBlockingPriority,yt=r.unstable_NormalPriority,te=r.unstable_LowPriority,Vt=r.unstable_IdlePriority,ee=r.log,le=r.unstable_setDisableYieldValue,Pt=null,Bt=null;function Qt(e){if(typeof ee=="function"&&le(e),Bt&&typeof Bt.setStrictMode=="function")try{Bt.setStrictMode(Pt,e)}catch{}}var Zt=Math.clz32?Math.clz32:tt,Xt=Math.log,xe=Math.LN2;function tt(e){return e>>>=0,e===0?32:31-(Xt(e)/xe|0)|0}var qt=256,Ht=262144,Kt=4194304;function It(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Nt(e,i,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,d=e.suspendedLanes,S=e.pingedLanes;e=e.warmLanes;var U=o&134217727;return U!==0?(o=U&~d,o!==0?u=It(o):(S&=U,S!==0?u=It(S):a||(a=U&~e,a!==0&&(u=It(a))))):(U=o&~d,U!==0?u=It(U):S!==0?u=It(S):a||(a=o&~e,a!==0&&(u=It(a)))),u===0?0:i!==0&&i!==u&&(i&d)===0&&(d=u&-u,a=i&-i,d>=a||d===32&&(a&4194048)!==0)?i:u}function kt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function me(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Be(){var e=Kt;return Kt<<=1,(Kt&62914560)===0&&(Kt=4194304),e}function De(e){for(var i=[],a=0;31>a;a++)i.push(e);return i}function Nn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Si(e,i,a,o,u,d){var S=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var U=e.entanglements,Y=e.expirationTimes,ht=e.hiddenUpdates;for(a=S&~a;0<a;){var Tt=31-Zt(a),wt=1<<Tt;U[Tt]=0,Y[Tt]=-1;var mt=ht[Tt];if(mt!==null)for(ht[Tt]=null,Tt=0;Tt<mt.length;Tt++){var St=mt[Tt];St!==null&&(St.lane&=-536870913)}a&=~wt}o!==0&&_l(e,o,0),d!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=d&~(S&~i))}function _l(e,i,a){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-Zt(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function $r(e,i){var a=e.entangledLanes|=i;for(e=e.entanglements;a;){var o=31-Zt(a),u=1<<o;u&i|e[o]&i&&(e[o]|=i),a&=~u}}function ks(e,i){var a=i&-i;return a=(a&42)!==0?1:to(a),(a&(e.suspendedLanes|i))!==0?0:a}function to(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Xs(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function eo(){var e=k.p;return e!==0?e:(e=window.event,e===void 0?32:Y0(e.type))}function Ni(e,i){var a=k.p;try{return k.p=e,i()}finally{k.p=a}}var li=Math.random().toString(36).slice(2),ln="__reactFiber$"+li,Sn="__reactProps$"+li,Mi="__reactContainer$"+li,Ws="__reactEvents$"+li,qs="__reactListeners$"+li,vl="__reactHandles$"+li,no="__reactResources$"+li,cs="__reactMarker$"+li;function io(e){delete e[ln],delete e[Sn],delete e[Ws],delete e[qs],delete e[vl]}function Ta(e){var i=e[ln];if(i)return i;for(var a=e.parentNode;a;){if(i=a[Mi]||a[ln]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(e=U0(e);e!==null;){if(a=e[ln])return a;e=U0(e)}return i}e=a,a=e.parentNode}return null}function Aa(e){if(e=e[ln]||e[Mi]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function us(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(s(33))}function Ra(e){var i=e[no];return i||(i=e[no]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function L(e){e[cs]=!0}var at=new Set,vt={};function pt(e,i){lt(e,i),lt(e+"Capture",i)}function lt(e,i){for(vt[e]=i,e=0;e<i.length;e++)at.add(i[e])}var Wt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),$t={},Yt={};function ne(e){return G.call(Yt,e)?!0:G.call($t,e)?!1:Wt.test(e)?Yt[e]=!0:($t[e]=!0,!1)}function ae(e,i,a){if(ne(i))if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+a)}}function ue(e,i,a){if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+a)}}function se(e,i,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(i,a,""+o)}}function fe(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pe(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Je(e,i,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(S){a=""+S,d.call(this,S)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(S){a=""+S},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Ze(e){if(!e._valueTracker){var i=Pe(e)?"checked":"value";e._valueTracker=Je(e,i,""+e[i])}}function Fe(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var a=i.getValue(),o="";return e&&(o=Pe(e)?e.checked?"true":"false":e.value),e=o,e!==a?(i.setValue(e),!0):!1}function oe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ie=/[\n"\\]/g;function ge(e){return e.replace(Ie,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Mn(e,i,a,o,u,d,S,U){e.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.type=S:e.removeAttribute("type"),i!=null?S==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+fe(i)):e.value!==""+fe(i)&&(e.value=""+fe(i)):S!=="submit"&&S!=="reset"||e.removeAttribute("value"),i!=null?En(e,S,fe(i)):a!=null?En(e,S,fe(a)):o!=null&&e.removeAttribute("value"),u==null&&d!=null&&(e.defaultChecked=!!d),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"?e.name=""+fe(U):e.removeAttribute("name")}function Ki(e,i,a,o,u,d,S,U){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){Ze(e);return}a=a!=null?""+fe(a):"",i=i!=null?""+fe(i):a,U||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=U?e.checked:!!o,e.defaultChecked=!!o,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(e.name=S),Ze(e)}function En(e,i,a){i==="number"&&oe(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function ci(e,i,a,o){if(e=e.options,i){i={};for(var u=0;u<a.length;u++)i["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=i.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+fe(a),i=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function He(e,i,a){if(i!=null&&(i=""+fe(i),i!==e.value&&(e.value=i),a==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=a!=null?""+fe(a):""}function bn(e,i,a,o){if(i==null){if(o!=null){if(a!=null)throw Error(s(92));if(dt(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),i=a}a=fe(i),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Ze(e)}function pn(e,i){if(i){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=i;return}}e.textContent=i}var Tn=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function An(e,i,a){var o=i.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,a):typeof a!="number"||a===0||Tn.has(i)?i==="float"?e.cssFloat=a:e[i]=(""+a).trim():e[i]=a+"px"}function Ys(e,i,a){if(i!=null&&typeof i!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&a[u]!==o&&An(e,u,o)}else for(var d in i)i.hasOwnProperty(d)&&An(e,d,i[d])}function Ei(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ox=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),lx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xl(e){return lx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Qi(){}var pu=null;function mu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var js=null,Zs=null;function Mp(e){var i=Aa(e);if(i&&(e=i.stateNode)){var a=e[Sn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Mn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),i=a.name,a.type==="radio"&&i!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ge(""+i)+'"][type="radio"]'),i=0;i<a.length;i++){var o=a[i];if(o!==e&&o.form===e.form){var u=o[Sn]||null;if(!u)throw Error(s(90));Mn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<a.length;i++)o=a[i],o.form===e.form&&Fe(o)}break t;case"textarea":He(e,a.value,a.defaultValue);break t;case"select":i=a.value,i!=null&&ci(e,!!a.multiple,i,!1)}}}var gu=!1;function Ep(e,i,a){if(gu)return e(i,a);gu=!0;try{var o=e(i);return o}finally{if(gu=!1,(js!==null||Zs!==null)&&(rc(),js&&(i=js,e=Zs,Zs=js=null,Mp(i),e)))for(i=0;i<e.length;i++)Mp(e[i])}}function ao(e,i){var a=e.stateNode;if(a===null)return null;var o=a[Sn]||null;if(o===null)return null;a=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,i,typeof a));return a}var Ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_u=!1;if(Ji)try{var so={};Object.defineProperty(so,"passive",{get:function(){_u=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{_u=!1}var Ca=null,vu=null,yl=null;function bp(){if(yl)return yl;var e,i=vu,a=i.length,o,u="value"in Ca?Ca.value:Ca.textContent,d=u.length;for(e=0;e<a&&i[e]===u[e];e++);var S=a-e;for(o=1;o<=S&&i[a-o]===u[d-o];o++);return yl=u.slice(e,1<o?1-o:void 0)}function Sl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Ml(){return!0}function Tp(){return!1}function Vn(e){function i(a,o,u,d,S){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=S,this.currentTarget=null;for(var U in e)e.hasOwnProperty(U)&&(a=e[U],this[U]=a?a(d):d[U]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Ml:Tp,this.isPropagationStopped=Tp,this}return g(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ml)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ml)},persist:function(){},isPersistent:Ml}),i}var fs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},El=Vn(fs),ro=g({},fs,{view:0,detail:0}),cx=Vn(ro),xu,yu,oo,bl=g({},ro,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==oo&&(oo&&e.type==="mousemove"?(xu=e.screenX-oo.screenX,yu=e.screenY-oo.screenY):yu=xu=0,oo=e),xu)},movementY:function(e){return"movementY"in e?e.movementY:yu}}),Ap=Vn(bl),ux=g({},bl,{dataTransfer:0}),fx=Vn(ux),hx=g({},ro,{relatedTarget:0}),Su=Vn(hx),dx=g({},fs,{animationName:0,elapsedTime:0,pseudoElement:0}),px=Vn(dx),mx=g({},fs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gx=Vn(mx),_x=g({},fs,{data:0}),Rp=Vn(_x),vx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},yx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=yx[e])?!!i[e]:!1}function Mu(){return Sx}var Mx=g({},ro,{key:function(e){if(e.key){var i=vx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Sl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mu,charCode:function(e){return e.type==="keypress"?Sl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Sl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ex=Vn(Mx),bx=g({},bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cp=Vn(bx),Tx=g({},ro,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mu}),Ax=Vn(Tx),Rx=g({},fs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cx=Vn(Rx),wx=g({},bl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dx=Vn(wx),Ux=g({},fs,{newState:0,oldState:0}),Lx=Vn(Ux),Nx=[9,13,27,32],Eu=Ji&&"CompositionEvent"in window,lo=null;Ji&&"documentMode"in document&&(lo=document.documentMode);var Ox=Ji&&"TextEvent"in window&&!lo,wp=Ji&&(!Eu||lo&&8<lo&&11>=lo),Dp=" ",Up=!1;function Lp(e,i){switch(e){case"keyup":return Nx.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Np(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ks=!1;function Px(e,i){switch(e){case"compositionend":return Np(i);case"keypress":return i.which!==32?null:(Up=!0,Dp);case"textInput":return e=i.data,e===Dp&&Up?null:e;default:return null}}function Ix(e,i){if(Ks)return e==="compositionend"||!Eu&&Lp(e,i)?(e=bp(),yl=vu=Ca=null,Ks=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return wp&&i.locale!=="ko"?null:i.data;default:return null}}var zx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Op(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!zx[e.type]:i==="textarea"}function Pp(e,i,a,o){js?Zs?Zs.push(o):Zs=[o]:js=o,i=dc(i,"onChange"),0<i.length&&(a=new El("onChange","change",null,a,o),e.push({event:a,listeners:i}))}var co=null,uo=null;function Fx(e){_0(e,0)}function Tl(e){var i=us(e);if(Fe(i))return e}function Ip(e,i){if(e==="change")return i}var zp=!1;if(Ji){var bu;if(Ji){var Tu="oninput"in document;if(!Tu){var Fp=document.createElement("div");Fp.setAttribute("oninput","return;"),Tu=typeof Fp.oninput=="function"}bu=Tu}else bu=!1;zp=bu&&(!document.documentMode||9<document.documentMode)}function Bp(){co&&(co.detachEvent("onpropertychange",Hp),uo=co=null)}function Hp(e){if(e.propertyName==="value"&&Tl(uo)){var i=[];Pp(i,uo,e,mu(e)),Ep(Fx,i)}}function Bx(e,i,a){e==="focusin"?(Bp(),co=i,uo=a,co.attachEvent("onpropertychange",Hp)):e==="focusout"&&Bp()}function Hx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Tl(uo)}function Gx(e,i){if(e==="click")return Tl(i)}function Vx(e,i){if(e==="input"||e==="change")return Tl(i)}function kx(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var Qn=typeof Object.is=="function"?Object.is:kx;function fo(e,i){if(Qn(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var a=Object.keys(e),o=Object.keys(i);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!G.call(i,u)||!Qn(e[u],i[u]))return!1}return!0}function Gp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vp(e,i){var a=Gp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=i&&o>=i)return{node:a,offset:i-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Gp(a)}}function kp(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?kp(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Xp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=oe(e.document);i instanceof e.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)e=i.contentWindow;else break;i=oe(e.document)}return i}function Au(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var Xx=Ji&&"documentMode"in document&&11>=document.documentMode,Qs=null,Ru=null,ho=null,Cu=!1;function Wp(e,i,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Cu||Qs==null||Qs!==oe(o)||(o=Qs,"selectionStart"in o&&Au(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),ho&&fo(ho,o)||(ho=o,o=dc(Ru,"onSelect"),0<o.length&&(i=new El("onSelect","select",null,i,a),e.push({event:i,listeners:o}),i.target=Qs)))}function hs(e,i){var a={};return a[e.toLowerCase()]=i.toLowerCase(),a["Webkit"+e]="webkit"+i,a["Moz"+e]="moz"+i,a}var Js={animationend:hs("Animation","AnimationEnd"),animationiteration:hs("Animation","AnimationIteration"),animationstart:hs("Animation","AnimationStart"),transitionrun:hs("Transition","TransitionRun"),transitionstart:hs("Transition","TransitionStart"),transitioncancel:hs("Transition","TransitionCancel"),transitionend:hs("Transition","TransitionEnd")},wu={},qp={};Ji&&(qp=document.createElement("div").style,"AnimationEvent"in window||(delete Js.animationend.animation,delete Js.animationiteration.animation,delete Js.animationstart.animation),"TransitionEvent"in window||delete Js.transitionend.transition);function ds(e){if(wu[e])return wu[e];if(!Js[e])return e;var i=Js[e],a;for(a in i)if(i.hasOwnProperty(a)&&a in qp)return wu[e]=i[a];return e}var Yp=ds("animationend"),jp=ds("animationiteration"),Zp=ds("animationstart"),Wx=ds("transitionrun"),qx=ds("transitionstart"),Yx=ds("transitioncancel"),Kp=ds("transitionend"),Qp=new Map,Du="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Du.push("scrollEnd");function bi(e,i){Qp.set(e,i),pt(i,[e])}var Al=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ui=[],$s=0,Uu=0;function Rl(){for(var e=$s,i=Uu=$s=0;i<e;){var a=ui[i];ui[i++]=null;var o=ui[i];ui[i++]=null;var u=ui[i];ui[i++]=null;var d=ui[i];if(ui[i++]=null,o!==null&&u!==null){var S=o.pending;S===null?u.next=u:(u.next=S.next,S.next=u),o.pending=u}d!==0&&Jp(a,u,d)}}function Cl(e,i,a,o){ui[$s++]=e,ui[$s++]=i,ui[$s++]=a,ui[$s++]=o,Uu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Lu(e,i,a,o){return Cl(e,i,a,o),wl(e)}function ps(e,i){return Cl(e,null,null,i),wl(e)}function Jp(e,i,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=e.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(u=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,u&&i!==null&&(u=31-Zt(a),e=d.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=a|536870912),d):null}function wl(e){if(50<Po)throw Po=0,Vf=null,Error(s(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var tr={};function jx(e,i,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Jn(e,i,a,o){return new jx(e,i,a,o)}function Nu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $i(e,i){var a=e.alternate;return a===null?(a=Jn(e.tag,i,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=i,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,i=e.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function $p(e,i){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,i=a.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Dl(e,i,a,o,u,d){var S=0;if(o=e,typeof e=="function")Nu(e)&&(S=1);else if(typeof e=="string")S=$y(e,a,j.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=Jn(31,a,i,u),e.elementType=D,e.lanes=d,e;case A:return ms(a.children,u,d,i);case y:S=8,u|=24;break;case v:return e=Jn(12,a,i,u|2),e.elementType=v,e.lanes=d,e;case F:return e=Jn(13,a,i,u),e.elementType=F,e.lanes=d,e;case H:return e=Jn(19,a,i,u),e.elementType=H,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case w:S=10;break t;case P:S=9;break t;case N:S=11;break t;case z:S=14;break t;case Z:S=16,o=null;break t}S=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return i=Jn(S,a,i,u),i.elementType=e,i.type=o,i.lanes=d,i}function ms(e,i,a,o){return e=Jn(7,e,o,i),e.lanes=a,e}function Ou(e,i,a){return e=Jn(6,e,null,i),e.lanes=a,e}function tm(e){var i=Jn(18,null,null,0);return i.stateNode=e,i}function Pu(e,i,a){return i=Jn(4,e.children!==null?e.children:[],e.key,i),i.lanes=a,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var em=new WeakMap;function fi(e,i){if(typeof e=="object"&&e!==null){var a=em.get(e);return a!==void 0?a:(i={value:e,source:i,stack:T(i)},em.set(e,i),i)}return{value:e,source:i,stack:T(i)}}var er=[],nr=0,Ul=null,po=0,hi=[],di=0,wa=null,Oi=1,Pi="";function ta(e,i){er[nr++]=po,er[nr++]=Ul,Ul=e,po=i}function nm(e,i,a){hi[di++]=Oi,hi[di++]=Pi,hi[di++]=wa,wa=e;var o=Oi;e=Pi;var u=32-Zt(o)-1;o&=~(1<<u),a+=1;var d=32-Zt(i)+u;if(30<d){var S=u-u%5;d=(o&(1<<S)-1).toString(32),o>>=S,u-=S,Oi=1<<32-Zt(i)+u|a<<u|o,Pi=d+e}else Oi=1<<d|a<<u|o,Pi=e}function Iu(e){e.return!==null&&(ta(e,1),nm(e,1,0))}function zu(e){for(;e===Ul;)Ul=er[--nr],er[nr]=null,po=er[--nr],er[nr]=null;for(;e===wa;)wa=hi[--di],hi[di]=null,Pi=hi[--di],hi[di]=null,Oi=hi[--di],hi[di]=null}function im(e,i){hi[di++]=Oi,hi[di++]=Pi,hi[di++]=wa,Oi=i.id,Pi=i.overflow,wa=e}var Rn=null,Ke=null,Ce=!1,Da=null,pi=!1,Fu=Error(s(519));function Ua(e){var i=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw mo(fi(i,e)),Fu}function am(e){var i=e.stateNode,a=e.type,o=e.memoizedProps;switch(i[ln]=e,i[Sn]=o,a){case"dialog":be("cancel",i),be("close",i);break;case"iframe":case"object":case"embed":be("load",i);break;case"video":case"audio":for(a=0;a<zo.length;a++)be(zo[a],i);break;case"source":be("error",i);break;case"img":case"image":case"link":be("error",i),be("load",i);break;case"details":be("toggle",i);break;case"input":be("invalid",i),Ki(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":be("invalid",i);break;case"textarea":be("invalid",i),bn(i,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||i.textContent===""+a||o.suppressHydrationWarning===!0||S0(i.textContent,a)?(o.popover!=null&&(be("beforetoggle",i),be("toggle",i)),o.onScroll!=null&&be("scroll",i),o.onScrollEnd!=null&&be("scrollend",i),o.onClick!=null&&(i.onclick=Qi),i=!0):i=!1,i||Ua(e,!0)}function sm(e){for(Rn=e.return;Rn;)switch(Rn.tag){case 5:case 31:case 13:pi=!1;return;case 27:case 3:pi=!0;return;default:Rn=Rn.return}}function ir(e){if(e!==Rn)return!1;if(!Ce)return sm(e),Ce=!0,!1;var i=e.tag,a;if((a=i!==3&&i!==27)&&((a=i===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||ih(e.type,e.memoizedProps)),a=!a),a&&Ke&&Ua(e),sm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ke=D0(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ke=D0(e)}else i===27?(i=Ke,Wa(e.type)?(e=lh,lh=null,Ke=e):Ke=i):Ke=Rn?gi(e.stateNode.nextSibling):null;return!0}function gs(){Ke=Rn=null,Ce=!1}function Bu(){var e=Da;return e!==null&&(qn===null?qn=e:qn.push.apply(qn,e),Da=null),e}function mo(e){Da===null?Da=[e]:Da.push(e)}var Hu=B(null),_s=null,ea=null;function La(e,i,a){At(Hu,i._currentValue),i._currentValue=a}function na(e){e._currentValue=Hu.current,ut(Hu)}function Gu(e,i,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===a)break;e=e.return}}function Vu(e,i,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var d=u.dependencies;if(d!==null){var S=u.child;d=d.firstContext;t:for(;d!==null;){var U=d;d=u;for(var Y=0;Y<i.length;Y++)if(U.context===i[Y]){d.lanes|=a,U=d.alternate,U!==null&&(U.lanes|=a),Gu(d.return,a,e),o||(S=null);break t}d=U.next}}else if(u.tag===18){if(S=u.return,S===null)throw Error(s(341));S.lanes|=a,d=S.alternate,d!==null&&(d.lanes|=a),Gu(S,a,e),S=null}else S=u.child;if(S!==null)S.return=u;else for(S=u;S!==null;){if(S===e){S=null;break}if(u=S.sibling,u!==null){u.return=S.return,S=u;break}S=S.return}u=S}}function ar(e,i,a,o){e=null;for(var u=i,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var S=u.alternate;if(S===null)throw Error(s(387));if(S=S.memoizedProps,S!==null){var U=u.type;Qn(u.pendingProps.value,S.value)||(e!==null?e.push(U):e=[U])}}else if(u===C.current){if(S=u.alternate,S===null)throw Error(s(387));S.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Vo):e=[Vo])}u=u.return}e!==null&&Vu(i,e,a,o),i.flags|=262144}function Ll(e){for(e=e.firstContext;e!==null;){if(!Qn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function vs(e){_s=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Cn(e){return rm(_s,e)}function Nl(e,i){return _s===null&&vs(e),rm(e,i)}function rm(e,i){var a=i._currentValue;if(i={context:i,memoizedValue:a,next:null},ea===null){if(e===null)throw Error(s(308));ea=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ea=ea.next=i;return a}var Zx=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(a){return a()})}},Kx=r.unstable_scheduleCallback,Qx=r.unstable_NormalPriority,cn={$$typeof:w,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ku(){return{controller:new Zx,data:new Map,refCount:0}}function go(e){e.refCount--,e.refCount===0&&Kx(Qx,function(){e.controller.abort()})}var _o=null,Xu=0,sr=0,rr=null;function Jx(e,i){if(_o===null){var a=_o=[];Xu=0,sr=jf(),rr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Xu++,i.then(om,om),i}function om(){if(--Xu===0&&_o!==null){rr!==null&&(rr.status="fulfilled");var e=_o;_o=null,sr=0,rr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function $x(e,i){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<a.length;u++)(0,a[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var lm=V.S;V.S=function(e,i){Wg=E(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&Jx(e,i),lm!==null&&lm(e,i)};var xs=B(null);function Wu(){var e=xs.current;return e!==null?e:je.pooledCache}function Ol(e,i){i===null?At(xs,xs.current):At(xs,i.pool)}function cm(){var e=Wu();return e===null?null:{parent:cn._currentValue,pool:e}}var or=Error(s(460)),qu=Error(s(474)),Pl=Error(s(542)),Il={then:function(){}};function um(e){return e=e.status,e==="fulfilled"||e==="rejected"}function fm(e,i,a){switch(a=e[a],a===void 0?e.push(i):a!==i&&(i.then(Qi,Qi),i=a),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,dm(e),e;default:if(typeof i.status=="string")i.then(Qi,Qi);else{if(e=je,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,dm(e),e}throw Ss=i,or}}function ys(e){try{var i=e._init;return i(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ss=a,or):a}}var Ss=null;function hm(){if(Ss===null)throw Error(s(459));var e=Ss;return Ss=null,e}function dm(e){if(e===or||e===Pl)throw Error(s(483))}var lr=null,vo=0;function zl(e){var i=vo;return vo+=1,lr===null&&(lr=[]),fm(lr,e,i)}function xo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Fl(e,i){throw i.$$typeof===x?Error(s(525)):(e=Object.prototype.toString.call(i),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function pm(e){function i(rt,Q){if(e){var ft=rt.deletions;ft===null?(rt.deletions=[Q],rt.flags|=16):ft.push(Q)}}function a(rt,Q){if(!e)return null;for(;Q!==null;)i(rt,Q),Q=Q.sibling;return null}function o(rt){for(var Q=new Map;rt!==null;)rt.key!==null?Q.set(rt.key,rt):Q.set(rt.index,rt),rt=rt.sibling;return Q}function u(rt,Q){return rt=$i(rt,Q),rt.index=0,rt.sibling=null,rt}function d(rt,Q,ft){return rt.index=ft,e?(ft=rt.alternate,ft!==null?(ft=ft.index,ft<Q?(rt.flags|=67108866,Q):ft):(rt.flags|=67108866,Q)):(rt.flags|=1048576,Q)}function S(rt){return e&&rt.alternate===null&&(rt.flags|=67108866),rt}function U(rt,Q,ft,Ct){return Q===null||Q.tag!==6?(Q=Ou(ft,rt.mode,Ct),Q.return=rt,Q):(Q=u(Q,ft),Q.return=rt,Q)}function Y(rt,Q,ft,Ct){var ce=ft.type;return ce===A?Tt(rt,Q,ft.props.children,Ct,ft.key):Q!==null&&(Q.elementType===ce||typeof ce=="object"&&ce!==null&&ce.$$typeof===Z&&ys(ce)===Q.type)?(Q=u(Q,ft.props),xo(Q,ft),Q.return=rt,Q):(Q=Dl(ft.type,ft.key,ft.props,null,rt.mode,Ct),xo(Q,ft),Q.return=rt,Q)}function ht(rt,Q,ft,Ct){return Q===null||Q.tag!==4||Q.stateNode.containerInfo!==ft.containerInfo||Q.stateNode.implementation!==ft.implementation?(Q=Pu(ft,rt.mode,Ct),Q.return=rt,Q):(Q=u(Q,ft.children||[]),Q.return=rt,Q)}function Tt(rt,Q,ft,Ct,ce){return Q===null||Q.tag!==7?(Q=ms(ft,rt.mode,Ct,ce),Q.return=rt,Q):(Q=u(Q,ft),Q.return=rt,Q)}function wt(rt,Q,ft){if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return Q=Ou(""+Q,rt.mode,ft),Q.return=rt,Q;if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case M:return ft=Dl(Q.type,Q.key,Q.props,null,rt.mode,ft),xo(ft,Q),ft.return=rt,ft;case b:return Q=Pu(Q,rt.mode,ft),Q.return=rt,Q;case Z:return Q=ys(Q),wt(rt,Q,ft)}if(dt(Q)||$(Q))return Q=ms(Q,rt.mode,ft,null),Q.return=rt,Q;if(typeof Q.then=="function")return wt(rt,zl(Q),ft);if(Q.$$typeof===w)return wt(rt,Nl(rt,Q),ft);Fl(rt,Q)}return null}function mt(rt,Q,ft,Ct){var ce=Q!==null?Q.key:null;if(typeof ft=="string"&&ft!==""||typeof ft=="number"||typeof ft=="bigint")return ce!==null?null:U(rt,Q,""+ft,Ct);if(typeof ft=="object"&&ft!==null){switch(ft.$$typeof){case M:return ft.key===ce?Y(rt,Q,ft,Ct):null;case b:return ft.key===ce?ht(rt,Q,ft,Ct):null;case Z:return ft=ys(ft),mt(rt,Q,ft,Ct)}if(dt(ft)||$(ft))return ce!==null?null:Tt(rt,Q,ft,Ct,null);if(typeof ft.then=="function")return mt(rt,Q,zl(ft),Ct);if(ft.$$typeof===w)return mt(rt,Q,Nl(rt,ft),Ct);Fl(rt,ft)}return null}function St(rt,Q,ft,Ct,ce){if(typeof Ct=="string"&&Ct!==""||typeof Ct=="number"||typeof Ct=="bigint")return rt=rt.get(ft)||null,U(Q,rt,""+Ct,ce);if(typeof Ct=="object"&&Ct!==null){switch(Ct.$$typeof){case M:return rt=rt.get(Ct.key===null?ft:Ct.key)||null,Y(Q,rt,Ct,ce);case b:return rt=rt.get(Ct.key===null?ft:Ct.key)||null,ht(Q,rt,Ct,ce);case Z:return Ct=ys(Ct),St(rt,Q,ft,Ct,ce)}if(dt(Ct)||$(Ct))return rt=rt.get(ft)||null,Tt(Q,rt,Ct,ce,null);if(typeof Ct.then=="function")return St(rt,Q,ft,zl(Ct),ce);if(Ct.$$typeof===w)return St(rt,Q,ft,Nl(Q,Ct),ce);Fl(Q,Ct)}return null}function ie(rt,Q,ft,Ct){for(var ce=null,Ne=null,re=Q,ye=Q=0,Re=null;re!==null&&ye<ft.length;ye++){re.index>ye?(Re=re,re=null):Re=re.sibling;var Oe=mt(rt,re,ft[ye],Ct);if(Oe===null){re===null&&(re=Re);break}e&&re&&Oe.alternate===null&&i(rt,re),Q=d(Oe,Q,ye),Ne===null?ce=Oe:Ne.sibling=Oe,Ne=Oe,re=Re}if(ye===ft.length)return a(rt,re),Ce&&ta(rt,ye),ce;if(re===null){for(;ye<ft.length;ye++)re=wt(rt,ft[ye],Ct),re!==null&&(Q=d(re,Q,ye),Ne===null?ce=re:Ne.sibling=re,Ne=re);return Ce&&ta(rt,ye),ce}for(re=o(re);ye<ft.length;ye++)Re=St(re,rt,ye,ft[ye],Ct),Re!==null&&(e&&Re.alternate!==null&&re.delete(Re.key===null?ye:Re.key),Q=d(Re,Q,ye),Ne===null?ce=Re:Ne.sibling=Re,Ne=Re);return e&&re.forEach(function(Ka){return i(rt,Ka)}),Ce&&ta(rt,ye),ce}function he(rt,Q,ft,Ct){if(ft==null)throw Error(s(151));for(var ce=null,Ne=null,re=Q,ye=Q=0,Re=null,Oe=ft.next();re!==null&&!Oe.done;ye++,Oe=ft.next()){re.index>ye?(Re=re,re=null):Re=re.sibling;var Ka=mt(rt,re,Oe.value,Ct);if(Ka===null){re===null&&(re=Re);break}e&&re&&Ka.alternate===null&&i(rt,re),Q=d(Ka,Q,ye),Ne===null?ce=Ka:Ne.sibling=Ka,Ne=Ka,re=Re}if(Oe.done)return a(rt,re),Ce&&ta(rt,ye),ce;if(re===null){for(;!Oe.done;ye++,Oe=ft.next())Oe=wt(rt,Oe.value,Ct),Oe!==null&&(Q=d(Oe,Q,ye),Ne===null?ce=Oe:Ne.sibling=Oe,Ne=Oe);return Ce&&ta(rt,ye),ce}for(re=o(re);!Oe.done;ye++,Oe=ft.next())Oe=St(re,rt,ye,Oe.value,Ct),Oe!==null&&(e&&Oe.alternate!==null&&re.delete(Oe.key===null?ye:Oe.key),Q=d(Oe,Q,ye),Ne===null?ce=Oe:Ne.sibling=Oe,Ne=Oe);return e&&re.forEach(function(uS){return i(rt,uS)}),Ce&&ta(rt,ye),ce}function qe(rt,Q,ft,Ct){if(typeof ft=="object"&&ft!==null&&ft.type===A&&ft.key===null&&(ft=ft.props.children),typeof ft=="object"&&ft!==null){switch(ft.$$typeof){case M:t:{for(var ce=ft.key;Q!==null;){if(Q.key===ce){if(ce=ft.type,ce===A){if(Q.tag===7){a(rt,Q.sibling),Ct=u(Q,ft.props.children),Ct.return=rt,rt=Ct;break t}}else if(Q.elementType===ce||typeof ce=="object"&&ce!==null&&ce.$$typeof===Z&&ys(ce)===Q.type){a(rt,Q.sibling),Ct=u(Q,ft.props),xo(Ct,ft),Ct.return=rt,rt=Ct;break t}a(rt,Q);break}else i(rt,Q);Q=Q.sibling}ft.type===A?(Ct=ms(ft.props.children,rt.mode,Ct,ft.key),Ct.return=rt,rt=Ct):(Ct=Dl(ft.type,ft.key,ft.props,null,rt.mode,Ct),xo(Ct,ft),Ct.return=rt,rt=Ct)}return S(rt);case b:t:{for(ce=ft.key;Q!==null;){if(Q.key===ce)if(Q.tag===4&&Q.stateNode.containerInfo===ft.containerInfo&&Q.stateNode.implementation===ft.implementation){a(rt,Q.sibling),Ct=u(Q,ft.children||[]),Ct.return=rt,rt=Ct;break t}else{a(rt,Q);break}else i(rt,Q);Q=Q.sibling}Ct=Pu(ft,rt.mode,Ct),Ct.return=rt,rt=Ct}return S(rt);case Z:return ft=ys(ft),qe(rt,Q,ft,Ct)}if(dt(ft))return ie(rt,Q,ft,Ct);if($(ft)){if(ce=$(ft),typeof ce!="function")throw Error(s(150));return ft=ce.call(ft),he(rt,Q,ft,Ct)}if(typeof ft.then=="function")return qe(rt,Q,zl(ft),Ct);if(ft.$$typeof===w)return qe(rt,Q,Nl(rt,ft),Ct);Fl(rt,ft)}return typeof ft=="string"&&ft!==""||typeof ft=="number"||typeof ft=="bigint"?(ft=""+ft,Q!==null&&Q.tag===6?(a(rt,Q.sibling),Ct=u(Q,ft),Ct.return=rt,rt=Ct):(a(rt,Q),Ct=Ou(ft,rt.mode,Ct),Ct.return=rt,rt=Ct),S(rt)):a(rt,Q)}return function(rt,Q,ft,Ct){try{vo=0;var ce=qe(rt,Q,ft,Ct);return lr=null,ce}catch(re){if(re===or||re===Pl)throw re;var Ne=Jn(29,re,null,rt.mode);return Ne.lanes=Ct,Ne.return=rt,Ne}}}var Ms=pm(!0),mm=pm(!1),Na=!1;function Yu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ju(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Oa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Pa(e,i,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(ze&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=wl(e),Jp(e,null,a),i}return Cl(e,o,i,a),wl(e)}function yo(e,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,$r(e,a)}}function Zu(e,i){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var S={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=S:d=d.next=S,a=a.next}while(a!==null);d===null?u=d=i:d=d.next=i}else u=d=i;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=i:e.next=i,a.lastBaseUpdate=i}var Ku=!1;function So(){if(Ku){var e=rr;if(e!==null)throw e}}function Mo(e,i,a,o){Ku=!1;var u=e.updateQueue;Na=!1;var d=u.firstBaseUpdate,S=u.lastBaseUpdate,U=u.shared.pending;if(U!==null){u.shared.pending=null;var Y=U,ht=Y.next;Y.next=null,S===null?d=ht:S.next=ht,S=Y;var Tt=e.alternate;Tt!==null&&(Tt=Tt.updateQueue,U=Tt.lastBaseUpdate,U!==S&&(U===null?Tt.firstBaseUpdate=ht:U.next=ht,Tt.lastBaseUpdate=Y))}if(d!==null){var wt=u.baseState;S=0,Tt=ht=Y=null,U=d;do{var mt=U.lane&-536870913,St=mt!==U.lane;if(St?(Ae&mt)===mt:(o&mt)===mt){mt!==0&&mt===sr&&(Ku=!0),Tt!==null&&(Tt=Tt.next={lane:0,tag:U.tag,payload:U.payload,callback:null,next:null});t:{var ie=e,he=U;mt=i;var qe=a;switch(he.tag){case 1:if(ie=he.payload,typeof ie=="function"){wt=ie.call(qe,wt,mt);break t}wt=ie;break t;case 3:ie.flags=ie.flags&-65537|128;case 0:if(ie=he.payload,mt=typeof ie=="function"?ie.call(qe,wt,mt):ie,mt==null)break t;wt=g({},wt,mt);break t;case 2:Na=!0}}mt=U.callback,mt!==null&&(e.flags|=64,St&&(e.flags|=8192),St=u.callbacks,St===null?u.callbacks=[mt]:St.push(mt))}else St={lane:mt,tag:U.tag,payload:U.payload,callback:U.callback,next:null},Tt===null?(ht=Tt=St,Y=wt):Tt=Tt.next=St,S|=mt;if(U=U.next,U===null){if(U=u.shared.pending,U===null)break;St=U,U=St.next,St.next=null,u.lastBaseUpdate=St,u.shared.pending=null}}while(!0);Tt===null&&(Y=wt),u.baseState=Y,u.firstBaseUpdate=ht,u.lastBaseUpdate=Tt,d===null&&(u.shared.lanes=0),Ha|=S,e.lanes=S,e.memoizedState=wt}}function gm(e,i){if(typeof e!="function")throw Error(s(191,e));e.call(i)}function _m(e,i){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)gm(a[e],i)}var cr=B(null),Bl=B(0);function vm(e,i){e=fa,At(Bl,e),At(cr,i),fa=e|i.baseLanes}function Qu(){At(Bl,fa),At(cr,cr.current)}function Ju(){fa=Bl.current,ut(cr),ut(Bl)}var $n=B(null),mi=null;function Ia(e){var i=e.alternate;At(rn,rn.current&1),At($n,e),mi===null&&(i===null||cr.current!==null||i.memoizedState!==null)&&(mi=e)}function $u(e){At(rn,rn.current),At($n,e),mi===null&&(mi=e)}function xm(e){e.tag===22?(At(rn,rn.current),At($n,e),mi===null&&(mi=e)):za()}function za(){At(rn,rn.current),At($n,$n.current)}function ti(e){ut($n),mi===e&&(mi=null),ut(rn)}var rn=B(0);function Hl(e){for(var i=e;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||rh(a)||oh(a)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ia=0,ve=null,Xe=null,un=null,Gl=!1,ur=!1,Es=!1,Vl=0,Eo=0,fr=null,ty=0;function nn(){throw Error(s(321))}function tf(e,i){if(i===null)return!1;for(var a=0;a<i.length&&a<e.length;a++)if(!Qn(e[a],i[a]))return!1;return!0}function ef(e,i,a,o,u,d){return ia=d,ve=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,V.H=e===null||e.memoizedState===null?ng:_f,Es=!1,d=a(o,u),Es=!1,ur&&(d=Sm(i,a,o,u)),ym(e),d}function ym(e){V.H=Ao;var i=Xe!==null&&Xe.next!==null;if(ia=0,un=Xe=ve=null,Gl=!1,Eo=0,fr=null,i)throw Error(s(300));e===null||fn||(e=e.dependencies,e!==null&&Ll(e)&&(fn=!0))}function Sm(e,i,a,o){ve=e;var u=0;do{if(ur&&(fr=null),Eo=0,ur=!1,25<=u)throw Error(s(301));if(u+=1,un=Xe=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}V.H=ig,d=i(a,o)}while(ur);return d}function ey(){var e=V.H,i=e.useState()[0];return i=typeof i.then=="function"?bo(i):i,e=e.useState()[0],(Xe!==null?Xe.memoizedState:null)!==e&&(ve.flags|=1024),i}function nf(){var e=Vl!==0;return Vl=0,e}function af(e,i,a){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~a}function sf(e){if(Gl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Gl=!1}ia=0,un=Xe=ve=null,ur=!1,Eo=Vl=0,fr=null}function Bn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return un===null?ve.memoizedState=un=e:un=un.next=e,un}function on(){if(Xe===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=Xe.next;var i=un===null?ve.memoizedState:un.next;if(i!==null)un=i,Xe=e;else{if(e===null)throw ve.alternate===null?Error(s(467)):Error(s(310));Xe=e,e={memoizedState:Xe.memoizedState,baseState:Xe.baseState,baseQueue:Xe.baseQueue,queue:Xe.queue,next:null},un===null?ve.memoizedState=un=e:un=un.next=e}return un}function kl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bo(e){var i=Eo;return Eo+=1,fr===null&&(fr=[]),e=fm(fr,e,i),i=ve,(un===null?i.memoizedState:un.next)===null&&(i=i.alternate,V.H=i===null||i.memoizedState===null?ng:_f),e}function Xl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bo(e);if(e.$$typeof===w)return Cn(e)}throw Error(s(438,String(e)))}function rf(e){var i=null,a=ve.updateQueue;if(a!==null&&(i=a.memoCache),i==null){var o=ve.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),a===null&&(a=kl(),ve.updateQueue=a),a.memoCache=i,a=i.data[i.index],a===void 0)for(a=i.data[i.index]=Array(e),o=0;o<e;o++)a[o]=O;return i.index++,a}function aa(e,i){return typeof i=="function"?i(e):i}function Wl(e){var i=on();return of(i,Xe,e)}function of(e,i,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,d=o.pending;if(d!==null){if(u!==null){var S=u.next;u.next=d.next,d.next=S}i.baseQueue=u=d,o.pending=null}if(d=e.baseState,u===null)e.memoizedState=d;else{i=u.next;var U=S=null,Y=null,ht=i,Tt=!1;do{var wt=ht.lane&-536870913;if(wt!==ht.lane?(Ae&wt)===wt:(ia&wt)===wt){var mt=ht.revertLane;if(mt===0)Y!==null&&(Y=Y.next={lane:0,revertLane:0,gesture:null,action:ht.action,hasEagerState:ht.hasEagerState,eagerState:ht.eagerState,next:null}),wt===sr&&(Tt=!0);else if((ia&mt)===mt){ht=ht.next,mt===sr&&(Tt=!0);continue}else wt={lane:0,revertLane:ht.revertLane,gesture:null,action:ht.action,hasEagerState:ht.hasEagerState,eagerState:ht.eagerState,next:null},Y===null?(U=Y=wt,S=d):Y=Y.next=wt,ve.lanes|=mt,Ha|=mt;wt=ht.action,Es&&a(d,wt),d=ht.hasEagerState?ht.eagerState:a(d,wt)}else mt={lane:wt,revertLane:ht.revertLane,gesture:ht.gesture,action:ht.action,hasEagerState:ht.hasEagerState,eagerState:ht.eagerState,next:null},Y===null?(U=Y=mt,S=d):Y=Y.next=mt,ve.lanes|=wt,Ha|=wt;ht=ht.next}while(ht!==null&&ht!==i);if(Y===null?S=d:Y.next=U,!Qn(d,e.memoizedState)&&(fn=!0,Tt&&(a=rr,a!==null)))throw a;e.memoizedState=d,e.baseState=S,e.baseQueue=Y,o.lastRenderedState=d}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function lf(e){var i=on(),a=i.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,d=i.memoizedState;if(u!==null){a.pending=null;var S=u=u.next;do d=e(d,S.action),S=S.next;while(S!==u);Qn(d,i.memoizedState)||(fn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),a.lastRenderedState=d}return[d,o]}function Mm(e,i,a){var o=ve,u=on(),d=Ce;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=i();var S=!Qn((Xe||u).memoizedState,a);if(S&&(u.memoizedState=a,fn=!0),u=u.queue,ff(Tm.bind(null,o,u,e),[e]),u.getSnapshot!==i||S||un!==null&&un.memoizedState.tag&1){if(o.flags|=2048,hr(9,{destroy:void 0},bm.bind(null,o,u,a,i),null),je===null)throw Error(s(349));d||(ia&127)!==0||Em(o,i,a)}return a}function Em(e,i,a){e.flags|=16384,e={getSnapshot:i,value:a},i=ve.updateQueue,i===null?(i=kl(),ve.updateQueue=i,i.stores=[e]):(a=i.stores,a===null?i.stores=[e]:a.push(e))}function bm(e,i,a,o){i.value=a,i.getSnapshot=o,Am(i)&&Rm(e)}function Tm(e,i,a){return a(function(){Am(i)&&Rm(e)})}function Am(e){var i=e.getSnapshot;e=e.value;try{var a=i();return!Qn(e,a)}catch{return!0}}function Rm(e){var i=ps(e,2);i!==null&&Yn(i,e,2)}function cf(e){var i=Bn();if(typeof e=="function"){var a=e;if(e=a(),Es){Qt(!0);try{a()}finally{Qt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:e},i}function Cm(e,i,a,o){return e.baseState=a,of(e,Xe,typeof o=="function"?o:aa)}function ny(e,i,a,o,u){if(jl(e))throw Error(s(485));if(e=i.action,e!==null){var d={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){d.listeners.push(S)}};V.T!==null?a(!0):d.isTransition=!1,o(d),a=i.pending,a===null?(d.next=i.pending=d,wm(i,d)):(d.next=a.next,i.pending=a.next=d)}}function wm(e,i){var a=i.action,o=i.payload,u=e.state;if(i.isTransition){var d=V.T,S={};V.T=S;try{var U=a(u,o),Y=V.S;Y!==null&&Y(S,U),Dm(e,i,U)}catch(ht){uf(e,i,ht)}finally{d!==null&&S.types!==null&&(d.types=S.types),V.T=d}}else try{d=a(u,o),Dm(e,i,d)}catch(ht){uf(e,i,ht)}}function Dm(e,i,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Um(e,i,o)},function(o){return uf(e,i,o)}):Um(e,i,a)}function Um(e,i,a){i.status="fulfilled",i.value=a,Lm(i),e.state=a,i=e.pending,i!==null&&(a=i.next,a===i?e.pending=null:(a=a.next,i.next=a,wm(e,a)))}function uf(e,i,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=a,Lm(i),i=i.next;while(i!==o)}e.action=null}function Lm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Nm(e,i){return i}function Om(e,i){if(Ce){var a=je.formState;if(a!==null){t:{var o=ve;if(Ce){if(Ke){e:{for(var u=Ke,d=pi;u.nodeType!==8;){if(!d){u=null;break e}if(u=gi(u.nextSibling),u===null){u=null;break e}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){Ke=gi(u.nextSibling),o=u.data==="F!";break t}}Ua(o)}o=!1}o&&(i=a[0])}}return a=Bn(),a.memoizedState=a.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Nm,lastRenderedState:i},a.queue=o,a=$m.bind(null,ve,o),o.dispatch=a,o=cf(!1),d=gf.bind(null,ve,!1,o.queue),o=Bn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,a=ny.bind(null,ve,u,d,a),u.dispatch=a,o.memoizedState=e,[i,a,!1]}function Pm(e){var i=on();return Im(i,Xe,e)}function Im(e,i,a){if(i=of(e,i,Nm)[0],e=Wl(aa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=bo(i)}catch(S){throw S===or?Pl:S}else o=i;i=on();var u=i.queue,d=u.dispatch;return a!==i.memoizedState&&(ve.flags|=2048,hr(9,{destroy:void 0},iy.bind(null,u,a),null)),[o,d,e]}function iy(e,i){e.action=i}function zm(e){var i=on(),a=Xe;if(a!==null)return Im(i,a,e);on(),i=i.memoizedState,a=on();var o=a.queue.dispatch;return a.memoizedState=e,[i,o,!1]}function hr(e,i,a,o){return e={tag:e,create:a,deps:o,inst:i,next:null},i=ve.updateQueue,i===null&&(i=kl(),ve.updateQueue=i),a=i.lastEffect,a===null?i.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,i.lastEffect=e),e}function Fm(){return on().memoizedState}function ql(e,i,a,o){var u=Bn();ve.flags|=e,u.memoizedState=hr(1|i,{destroy:void 0},a,o===void 0?null:o)}function Yl(e,i,a,o){var u=on();o=o===void 0?null:o;var d=u.memoizedState.inst;Xe!==null&&o!==null&&tf(o,Xe.memoizedState.deps)?u.memoizedState=hr(i,d,a,o):(ve.flags|=e,u.memoizedState=hr(1|i,d,a,o))}function Bm(e,i){ql(8390656,8,e,i)}function ff(e,i){Yl(2048,8,e,i)}function ay(e){ve.flags|=4;var i=ve.updateQueue;if(i===null)i=kl(),ve.updateQueue=i,i.events=[e];else{var a=i.events;a===null?i.events=[e]:a.push(e)}}function Hm(e){var i=on().memoizedState;return ay({ref:i,nextImpl:e}),function(){if((ze&2)!==0)throw Error(s(440));return i.impl.apply(void 0,arguments)}}function Gm(e,i){return Yl(4,2,e,i)}function Vm(e,i){return Yl(4,4,e,i)}function km(e,i){if(typeof i=="function"){e=e();var a=i(e);return function(){typeof a=="function"?a():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function Xm(e,i,a){a=a!=null?a.concat([e]):null,Yl(4,4,km.bind(null,i,e),a)}function hf(){}function Wm(e,i){var a=on();i=i===void 0?null:i;var o=a.memoizedState;return i!==null&&tf(i,o[1])?o[0]:(a.memoizedState=[e,i],e)}function qm(e,i){var a=on();i=i===void 0?null:i;var o=a.memoizedState;if(i!==null&&tf(i,o[1]))return o[0];if(o=e(),Es){Qt(!0);try{e()}finally{Qt(!1)}}return a.memoizedState=[o,i],o}function df(e,i,a){return a===void 0||(ia&1073741824)!==0&&(Ae&261930)===0?e.memoizedState=i:(e.memoizedState=a,e=Yg(),ve.lanes|=e,Ha|=e,a)}function Ym(e,i,a,o){return Qn(a,i)?a:cr.current!==null?(e=df(e,a,o),Qn(e,i)||(fn=!0),e):(ia&42)===0||(ia&1073741824)!==0&&(Ae&261930)===0?(fn=!0,e.memoizedState=a):(e=Yg(),ve.lanes|=e,Ha|=e,i)}function jm(e,i,a,o,u){var d=k.p;k.p=d!==0&&8>d?d:8;var S=V.T,U={};V.T=U,gf(e,!1,i,a);try{var Y=u(),ht=V.S;if(ht!==null&&ht(U,Y),Y!==null&&typeof Y=="object"&&typeof Y.then=="function"){var Tt=$x(Y,o);To(e,i,Tt,ii(e))}else To(e,i,o,ii(e))}catch(wt){To(e,i,{then:function(){},status:"rejected",reason:wt},ii())}finally{k.p=d,S!==null&&U.types!==null&&(S.types=U.types),V.T=S}}function sy(){}function pf(e,i,a,o){if(e.tag!==5)throw Error(s(476));var u=Zm(e).queue;jm(e,u,i,W,a===null?sy:function(){return Km(e),a(o)})}function Zm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:W},next:null};var a={};return i.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:a},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Km(e){var i=Zm(e);i.next===null&&(i=e.alternate.memoizedState),To(e,i.next.queue,{},ii())}function mf(){return Cn(Vo)}function Qm(){return on().memoizedState}function Jm(){return on().memoizedState}function ry(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var a=ii();e=Oa(a);var o=Pa(i,e,a);o!==null&&(Yn(o,i,a),yo(o,i,a)),i={cache:ku()},e.payload=i;return}i=i.return}}function oy(e,i,a){var o=ii();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},jl(e)?tg(i,a):(a=Lu(e,i,a,o),a!==null&&(Yn(a,e,o),eg(a,i,o)))}function $m(e,i,a){var o=ii();To(e,i,a,o)}function To(e,i,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(jl(e))tg(i,u);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var S=i.lastRenderedState,U=d(S,a);if(u.hasEagerState=!0,u.eagerState=U,Qn(U,S))return Cl(e,i,u,0),je===null&&Rl(),!1}catch{}if(a=Lu(e,i,u,o),a!==null)return Yn(a,e,o),eg(a,i,o),!0}return!1}function gf(e,i,a,o){if(o={lane:2,revertLane:jf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},jl(e)){if(i)throw Error(s(479))}else i=Lu(e,a,o,2),i!==null&&Yn(i,e,2)}function jl(e){var i=e.alternate;return e===ve||i!==null&&i===ve}function tg(e,i){ur=Gl=!0;var a=e.pending;a===null?i.next=i:(i.next=a.next,a.next=i),e.pending=i}function eg(e,i,a){if((a&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,$r(e,a)}}var Ao={readContext:Cn,use:Xl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};Ao.useEffectEvent=nn;var ng={readContext:Cn,use:Xl,useCallback:function(e,i){return Bn().memoizedState=[e,i===void 0?null:i],e},useContext:Cn,useEffect:Bm,useImperativeHandle:function(e,i,a){a=a!=null?a.concat([e]):null,ql(4194308,4,km.bind(null,i,e),a)},useLayoutEffect:function(e,i){return ql(4194308,4,e,i)},useInsertionEffect:function(e,i){ql(4,2,e,i)},useMemo:function(e,i){var a=Bn();i=i===void 0?null:i;var o=e();if(Es){Qt(!0);try{e()}finally{Qt(!1)}}return a.memoizedState=[o,i],o},useReducer:function(e,i,a){var o=Bn();if(a!==void 0){var u=a(i);if(Es){Qt(!0);try{a(i)}finally{Qt(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=oy.bind(null,ve,e),[o.memoizedState,e]},useRef:function(e){var i=Bn();return e={current:e},i.memoizedState=e},useState:function(e){e=cf(e);var i=e.queue,a=$m.bind(null,ve,i);return i.dispatch=a,[e.memoizedState,a]},useDebugValue:hf,useDeferredValue:function(e,i){var a=Bn();return df(a,e,i)},useTransition:function(){var e=cf(!1);return e=jm.bind(null,ve,e.queue,!0,!1),Bn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,a){var o=ve,u=Bn();if(Ce){if(a===void 0)throw Error(s(407));a=a()}else{if(a=i(),je===null)throw Error(s(349));(Ae&127)!==0||Em(o,i,a)}u.memoizedState=a;var d={value:a,getSnapshot:i};return u.queue=d,Bm(Tm.bind(null,o,d,e),[e]),o.flags|=2048,hr(9,{destroy:void 0},bm.bind(null,o,d,a,i),null),a},useId:function(){var e=Bn(),i=je.identifierPrefix;if(Ce){var a=Pi,o=Oi;a=(o&~(1<<32-Zt(o)-1)).toString(32)+a,i="_"+i+"R_"+a,a=Vl++,0<a&&(i+="H"+a.toString(32)),i+="_"}else a=ty++,i="_"+i+"r_"+a.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:mf,useFormState:Om,useActionState:Om,useOptimistic:function(e){var i=Bn();i.memoizedState=i.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=a,i=gf.bind(null,ve,!0,a),a.dispatch=i,[e,i]},useMemoCache:rf,useCacheRefresh:function(){return Bn().memoizedState=ry.bind(null,ve)},useEffectEvent:function(e){var i=Bn(),a={impl:e};return i.memoizedState=a,function(){if((ze&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},_f={readContext:Cn,use:Xl,useCallback:Wm,useContext:Cn,useEffect:ff,useImperativeHandle:Xm,useInsertionEffect:Gm,useLayoutEffect:Vm,useMemo:qm,useReducer:Wl,useRef:Fm,useState:function(){return Wl(aa)},useDebugValue:hf,useDeferredValue:function(e,i){var a=on();return Ym(a,Xe.memoizedState,e,i)},useTransition:function(){var e=Wl(aa)[0],i=on().memoizedState;return[typeof e=="boolean"?e:bo(e),i]},useSyncExternalStore:Mm,useId:Qm,useHostTransitionStatus:mf,useFormState:Pm,useActionState:Pm,useOptimistic:function(e,i){var a=on();return Cm(a,Xe,e,i)},useMemoCache:rf,useCacheRefresh:Jm};_f.useEffectEvent=Hm;var ig={readContext:Cn,use:Xl,useCallback:Wm,useContext:Cn,useEffect:ff,useImperativeHandle:Xm,useInsertionEffect:Gm,useLayoutEffect:Vm,useMemo:qm,useReducer:lf,useRef:Fm,useState:function(){return lf(aa)},useDebugValue:hf,useDeferredValue:function(e,i){var a=on();return Xe===null?df(a,e,i):Ym(a,Xe.memoizedState,e,i)},useTransition:function(){var e=lf(aa)[0],i=on().memoizedState;return[typeof e=="boolean"?e:bo(e),i]},useSyncExternalStore:Mm,useId:Qm,useHostTransitionStatus:mf,useFormState:zm,useActionState:zm,useOptimistic:function(e,i){var a=on();return Xe!==null?Cm(a,Xe,e,i):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:rf,useCacheRefresh:Jm};ig.useEffectEvent=Hm;function vf(e,i,a,o){i=e.memoizedState,a=a(o,i),a=a==null?i:g({},i,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var xf={enqueueSetState:function(e,i,a){e=e._reactInternals;var o=ii(),u=Oa(o);u.payload=i,a!=null&&(u.callback=a),i=Pa(e,u,o),i!==null&&(Yn(i,e,o),yo(i,e,o))},enqueueReplaceState:function(e,i,a){e=e._reactInternals;var o=ii(),u=Oa(o);u.tag=1,u.payload=i,a!=null&&(u.callback=a),i=Pa(e,u,o),i!==null&&(Yn(i,e,o),yo(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var a=ii(),o=Oa(a);o.tag=2,i!=null&&(o.callback=i),i=Pa(e,o,a),i!==null&&(Yn(i,e,a),yo(i,e,a))}};function ag(e,i,a,o,u,d,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,d,S):i.prototype&&i.prototype.isPureReactComponent?!fo(a,o)||!fo(u,d):!0}function sg(e,i,a,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,o),i.state!==e&&xf.enqueueReplaceState(i,i.state,null)}function bs(e,i){var a=i;if("ref"in i){a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}if(e=e.defaultProps){a===i&&(a=g({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function rg(e){Al(e)}function og(e){console.error(e)}function lg(e){Al(e)}function Zl(e,i){try{var a=e.onUncaughtError;a(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function cg(e,i,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function yf(e,i,a){return a=Oa(a),a.tag=3,a.payload={element:null},a.callback=function(){Zl(e,i)},a}function ug(e){return e=Oa(e),e.tag=3,e}function fg(e,i,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;e.payload=function(){return u(d)},e.callback=function(){cg(i,a,o)}}var S=a.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){cg(i,a,o),typeof u!="function"&&(Ga===null?Ga=new Set([this]):Ga.add(this));var U=o.stack;this.componentDidCatch(o.value,{componentStack:U!==null?U:""})})}function ly(e,i,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=a.alternate,i!==null&&ar(i,a,u,!0),a=$n.current,a!==null){switch(a.tag){case 31:case 13:return mi===null?oc():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Il?a.flags|=16384:(i=a.updateQueue,i===null?a.updateQueue=new Set([o]):i.add(o),Wf(e,o,u)),!1;case 22:return a.flags|=65536,o===Il?a.flags|=16384:(i=a.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=i):(a=i.retryQueue,a===null?i.retryQueue=new Set([o]):a.add(o)),Wf(e,o,u)),!1}throw Error(s(435,a.tag))}return Wf(e,o,u),oc(),!1}if(Ce)return i=$n.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==Fu&&(e=Error(s(422),{cause:o}),mo(fi(e,a)))):(o!==Fu&&(i=Error(s(423),{cause:o}),mo(fi(i,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=fi(o,a),u=yf(e.stateNode,o,u),Zu(e,u),an!==4&&(an=2)),!1;var d=Error(s(520),{cause:o});if(d=fi(d,a),Oo===null?Oo=[d]:Oo.push(d),an!==4&&(an=2),i===null)return!0;o=fi(o,a),a=i;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=yf(a.stateNode,o,e),Zu(a,e),!1;case 1:if(i=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Ga===null||!Ga.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=ug(u),fg(u,e,a,o),Zu(a,u),!1}a=a.return}while(a!==null);return!1}var Sf=Error(s(461)),fn=!1;function wn(e,i,a,o){i.child=e===null?mm(i,null,a,o):Ms(i,e.child,a,o)}function hg(e,i,a,o,u){a=a.render;var d=i.ref;if("ref"in o){var S={};for(var U in o)U!=="ref"&&(S[U]=o[U])}else S=o;return vs(i),o=ef(e,i,a,S,d,u),U=nf(),e!==null&&!fn?(af(e,i,u),sa(e,i,u)):(Ce&&U&&Iu(i),i.flags|=1,wn(e,i,o,u),i.child)}function dg(e,i,a,o,u){if(e===null){var d=a.type;return typeof d=="function"&&!Nu(d)&&d.defaultProps===void 0&&a.compare===null?(i.tag=15,i.type=d,pg(e,i,d,o,u)):(e=Dl(a.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!wf(e,u)){var S=d.memoizedProps;if(a=a.compare,a=a!==null?a:fo,a(S,o)&&e.ref===i.ref)return sa(e,i,u)}return i.flags|=1,e=$i(d,o),e.ref=i.ref,e.return=i,i.child=e}function pg(e,i,a,o,u){if(e!==null){var d=e.memoizedProps;if(fo(d,o)&&e.ref===i.ref)if(fn=!1,i.pendingProps=o=d,wf(e,u))(e.flags&131072)!==0&&(fn=!0);else return i.lanes=e.lanes,sa(e,i,u)}return Mf(e,i,a,o,u)}function mg(e,i,a,o){var u=o.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,i.child=null;return gg(e,i,d,a,o)}if((a&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ol(i,d!==null?d.cachePool:null),d!==null?vm(i,d):Qu(),xm(i);else return o=i.lanes=536870912,gg(e,i,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Ol(i,d.cachePool),vm(i,d),za(),i.memoizedState=null):(e!==null&&Ol(i,null),Qu(),za());return wn(e,i,u,a),i.child}function Ro(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function gg(e,i,a,o,u){var d=Wu();return d=d===null?null:{parent:cn._currentValue,pool:d},i.memoizedState={baseLanes:a,cachePool:d},e!==null&&Ol(i,null),Qu(),xm(i),e!==null&&ar(e,i,o,!0),i.childLanes=u,null}function Kl(e,i){return i=Jl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function _g(e,i,a){return Ms(i,e.child,null,a),e=Kl(i,i.pendingProps),e.flags|=2,ti(i),i.memoizedState=null,e}function cy(e,i,a){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ce){if(o.mode==="hidden")return e=Kl(i,o),i.lanes=536870912,Ro(null,e);if($u(i),(e=Ke)?(e=w0(e,pi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:wa!==null?{id:Oi,overflow:Pi}:null,retryLane:536870912,hydrationErrors:null},a=tm(e),a.return=i,i.child=a,Rn=i,Ke=null)):e=null,e===null)throw Ua(i);return i.lanes=536870912,null}return Kl(i,o)}var d=e.memoizedState;if(d!==null){var S=d.dehydrated;if($u(i),u)if(i.flags&256)i.flags&=-257,i=_g(e,i,a);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(s(558));else if(fn||ar(e,i,a,!1),u=(a&e.childLanes)!==0,fn||u){if(o=je,o!==null&&(S=ks(o,a),S!==0&&S!==d.retryLane))throw d.retryLane=S,ps(e,S),Yn(o,e,S),Sf;oc(),i=_g(e,i,a)}else e=d.treeContext,Ke=gi(S.nextSibling),Rn=i,Ce=!0,Da=null,pi=!1,e!==null&&im(i,e),i=Kl(i,o),i.flags|=4096;return i}return e=$i(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Ql(e,i){var a=i.ref;if(a===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(i.flags|=4194816)}}function Mf(e,i,a,o,u){return vs(i),a=ef(e,i,a,o,void 0,u),o=nf(),e!==null&&!fn?(af(e,i,u),sa(e,i,u)):(Ce&&o&&Iu(i),i.flags|=1,wn(e,i,a,u),i.child)}function vg(e,i,a,o,u,d){return vs(i),i.updateQueue=null,a=Sm(i,o,a,u),ym(e),o=nf(),e!==null&&!fn?(af(e,i,d),sa(e,i,d)):(Ce&&o&&Iu(i),i.flags|=1,wn(e,i,a,d),i.child)}function xg(e,i,a,o,u){if(vs(i),i.stateNode===null){var d=tr,S=a.contextType;typeof S=="object"&&S!==null&&(d=Cn(S)),d=new a(o,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=xf,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=o,d.state=i.memoizedState,d.refs={},Yu(i),S=a.contextType,d.context=typeof S=="object"&&S!==null?Cn(S):tr,d.state=i.memoizedState,S=a.getDerivedStateFromProps,typeof S=="function"&&(vf(i,a,S,o),d.state=i.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(S=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),S!==d.state&&xf.enqueueReplaceState(d,d.state,null),Mo(i,o,d,u),So(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){d=i.stateNode;var U=i.memoizedProps,Y=bs(a,U);d.props=Y;var ht=d.context,Tt=a.contextType;S=tr,typeof Tt=="object"&&Tt!==null&&(S=Cn(Tt));var wt=a.getDerivedStateFromProps;Tt=typeof wt=="function"||typeof d.getSnapshotBeforeUpdate=="function",U=i.pendingProps!==U,Tt||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(U||ht!==S)&&sg(i,d,o,S),Na=!1;var mt=i.memoizedState;d.state=mt,Mo(i,o,d,u),So(),ht=i.memoizedState,U||mt!==ht||Na?(typeof wt=="function"&&(vf(i,a,wt,o),ht=i.memoizedState),(Y=Na||ag(i,a,Y,o,mt,ht,S))?(Tt||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=ht),d.props=o,d.state=ht,d.context=S,o=Y):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{d=i.stateNode,ju(e,i),S=i.memoizedProps,Tt=bs(a,S),d.props=Tt,wt=i.pendingProps,mt=d.context,ht=a.contextType,Y=tr,typeof ht=="object"&&ht!==null&&(Y=Cn(ht)),U=a.getDerivedStateFromProps,(ht=typeof U=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S!==wt||mt!==Y)&&sg(i,d,o,Y),Na=!1,mt=i.memoizedState,d.state=mt,Mo(i,o,d,u),So();var St=i.memoizedState;S!==wt||mt!==St||Na||e!==null&&e.dependencies!==null&&Ll(e.dependencies)?(typeof U=="function"&&(vf(i,a,U,o),St=i.memoizedState),(Tt=Na||ag(i,a,Tt,o,mt,St,Y)||e!==null&&e.dependencies!==null&&Ll(e.dependencies))?(ht||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,St,Y),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,St,Y)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&mt===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&mt===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=St),d.props=o,d.state=St,d.context=Y,o=Tt):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&mt===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&mt===e.memoizedState||(i.flags|=1024),o=!1)}return d=o,Ql(e,i),o=(i.flags&128)!==0,d||o?(d=i.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&o?(i.child=Ms(i,e.child,null,u),i.child=Ms(i,null,a,u)):wn(e,i,a,u),i.memoizedState=d.state,e=i.child):e=sa(e,i,u),e}function yg(e,i,a,o){return gs(),i.flags|=256,wn(e,i,a,o),i.child}var Ef={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function bf(e){return{baseLanes:e,cachePool:cm()}}function Tf(e,i,a){return e=e!==null?e.childLanes&~a:0,i&&(e|=ni),e}function Sg(e,i,a){var o=i.pendingProps,u=!1,d=(i.flags&128)!==0,S;if((S=d)||(S=e!==null&&e.memoizedState===null?!1:(rn.current&2)!==0),S&&(u=!0,i.flags&=-129),S=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ce){if(u?Ia(i):za(),(e=Ke)?(e=w0(e,pi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:wa!==null?{id:Oi,overflow:Pi}:null,retryLane:536870912,hydrationErrors:null},a=tm(e),a.return=i,i.child=a,Rn=i,Ke=null)):e=null,e===null)throw Ua(i);return oh(e)?i.lanes=32:i.lanes=536870912,null}var U=o.children;return o=o.fallback,u?(za(),u=i.mode,U=Jl({mode:"hidden",children:U},u),o=ms(o,u,a,null),U.return=i,o.return=i,U.sibling=o,i.child=U,o=i.child,o.memoizedState=bf(a),o.childLanes=Tf(e,S,a),i.memoizedState=Ef,Ro(null,o)):(Ia(i),Af(i,U))}var Y=e.memoizedState;if(Y!==null&&(U=Y.dehydrated,U!==null)){if(d)i.flags&256?(Ia(i),i.flags&=-257,i=Rf(e,i,a)):i.memoizedState!==null?(za(),i.child=e.child,i.flags|=128,i=null):(za(),U=o.fallback,u=i.mode,o=Jl({mode:"visible",children:o.children},u),U=ms(U,u,a,null),U.flags|=2,o.return=i,U.return=i,o.sibling=U,i.child=o,Ms(i,e.child,null,a),o=i.child,o.memoizedState=bf(a),o.childLanes=Tf(e,S,a),i.memoizedState=Ef,i=Ro(null,o));else if(Ia(i),oh(U)){if(S=U.nextSibling&&U.nextSibling.dataset,S)var ht=S.dgst;S=ht,o=Error(s(419)),o.stack="",o.digest=S,mo({value:o,source:null,stack:null}),i=Rf(e,i,a)}else if(fn||ar(e,i,a,!1),S=(a&e.childLanes)!==0,fn||S){if(S=je,S!==null&&(o=ks(S,a),o!==0&&o!==Y.retryLane))throw Y.retryLane=o,ps(e,o),Yn(S,e,o),Sf;rh(U)||oc(),i=Rf(e,i,a)}else rh(U)?(i.flags|=192,i.child=e.child,i=null):(e=Y.treeContext,Ke=gi(U.nextSibling),Rn=i,Ce=!0,Da=null,pi=!1,e!==null&&im(i,e),i=Af(i,o.children),i.flags|=4096);return i}return u?(za(),U=o.fallback,u=i.mode,Y=e.child,ht=Y.sibling,o=$i(Y,{mode:"hidden",children:o.children}),o.subtreeFlags=Y.subtreeFlags&65011712,ht!==null?U=$i(ht,U):(U=ms(U,u,a,null),U.flags|=2),U.return=i,o.return=i,o.sibling=U,i.child=o,Ro(null,o),o=i.child,U=e.child.memoizedState,U===null?U=bf(a):(u=U.cachePool,u!==null?(Y=cn._currentValue,u=u.parent!==Y?{parent:Y,pool:Y}:u):u=cm(),U={baseLanes:U.baseLanes|a,cachePool:u}),o.memoizedState=U,o.childLanes=Tf(e,S,a),i.memoizedState=Ef,Ro(e.child,o)):(Ia(i),a=e.child,e=a.sibling,a=$i(a,{mode:"visible",children:o.children}),a.return=i,a.sibling=null,e!==null&&(S=i.deletions,S===null?(i.deletions=[e],i.flags|=16):S.push(e)),i.child=a,i.memoizedState=null,a)}function Af(e,i){return i=Jl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function Jl(e,i){return e=Jn(22,e,null,i),e.lanes=0,e}function Rf(e,i,a){return Ms(i,e.child,null,a),e=Af(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function Mg(e,i,a){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),Gu(e.return,i,a)}function Cf(e,i,a,o,u,d){var S=e.memoizedState;S===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(S.isBackwards=i,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=a,S.tailMode=u,S.treeForkCount=d)}function Eg(e,i,a){var o=i.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var S=rn.current,U=(S&2)!==0;if(U?(S=S&1|2,i.flags|=128):S&=1,At(rn,S),wn(e,i,o,a),o=Ce?po:0,!U&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Mg(e,a,i);else if(e.tag===19)Mg(e,a,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=i.child,u=null;a!==null;)e=a.alternate,e!==null&&Hl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=i.child,i.child=null):(u=a.sibling,a.sibling=null),Cf(i,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&Hl(e)===null){i.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Cf(i,!0,a,null,d,o);break;case"together":Cf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function sa(e,i,a){if(e!==null&&(i.dependencies=e.dependencies),Ha|=i.lanes,(a&i.childLanes)===0)if(e!==null){if(ar(e,i,a,!1),(a&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(s(153));if(i.child!==null){for(e=i.child,a=$i(e,e.pendingProps),i.child=a,a.return=i;e.sibling!==null;)e=e.sibling,a=a.sibling=$i(e,e.pendingProps),a.return=i;a.sibling=null}return i.child}function wf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Ll(e)))}function uy(e,i,a){switch(i.tag){case 3:it(i,i.stateNode.containerInfo),La(i,cn,e.memoizedState.cache),gs();break;case 27:case 5:et(i);break;case 4:it(i,i.stateNode.containerInfo);break;case 10:La(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,$u(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ia(i),i.flags|=128,null):(a&i.child.childLanes)!==0?Sg(e,i,a):(Ia(i),e=sa(e,i,a),e!==null?e.sibling:null);Ia(i);break;case 19:var u=(e.flags&128)!==0;if(o=(a&i.childLanes)!==0,o||(ar(e,i,a,!1),o=(a&i.childLanes)!==0),u){if(o)return Eg(e,i,a);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),At(rn,rn.current),o)break;return null;case 22:return i.lanes=0,mg(e,i,a,i.pendingProps);case 24:La(i,cn,e.memoizedState.cache)}return sa(e,i,a)}function bg(e,i,a){if(e!==null)if(e.memoizedProps!==i.pendingProps)fn=!0;else{if(!wf(e,a)&&(i.flags&128)===0)return fn=!1,uy(e,i,a);fn=(e.flags&131072)!==0}else fn=!1,Ce&&(i.flags&1048576)!==0&&nm(i,po,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=ys(i.elementType),i.type=e,typeof e=="function")Nu(e)?(o=bs(e,o),i.tag=1,i=xg(null,i,e,o,a)):(i.tag=0,i=Mf(null,i,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===N){i.tag=11,i=hg(null,i,e,o,a);break t}else if(u===z){i.tag=14,i=dg(null,i,e,o,a);break t}}throw i=gt(e)||e,Error(s(306,i,""))}}return i;case 0:return Mf(e,i,i.type,i.pendingProps,a);case 1:return o=i.type,u=bs(o,i.pendingProps),xg(e,i,o,u,a);case 3:t:{if(it(i,i.stateNode.containerInfo),e===null)throw Error(s(387));o=i.pendingProps;var d=i.memoizedState;u=d.element,ju(e,i),Mo(i,o,null,a);var S=i.memoizedState;if(o=S.cache,La(i,cn,o),o!==d.cache&&Vu(i,[cn],a,!0),So(),o=S.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:S.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=yg(e,i,o,a);break t}else if(o!==u){u=fi(Error(s(424)),i),mo(u),i=yg(e,i,o,a);break t}else for(e=i.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Ke=gi(e.firstChild),Rn=i,Ce=!0,Da=null,pi=!0,a=mm(i,null,o,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(gs(),o===u){i=sa(e,i,a);break t}wn(e,i,o,a)}i=i.child}return i;case 26:return Ql(e,i),e===null?(a=P0(i.type,null,i.pendingProps,null))?i.memoizedState=a:Ce||(a=i.type,e=i.pendingProps,o=pc(R.current).createElement(a),o[ln]=i,o[Sn]=e,Dn(o,a,e),L(o),i.stateNode=o):i.memoizedState=P0(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return et(i),e===null&&Ce&&(o=i.stateNode=L0(i.type,i.pendingProps,R.current),Rn=i,pi=!0,u=Ke,Wa(i.type)?(lh=u,Ke=gi(o.firstChild)):Ke=u),wn(e,i,i.pendingProps.children,a),Ql(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ce&&((u=o=Ke)&&(o=Hy(o,i.type,i.pendingProps,pi),o!==null?(i.stateNode=o,Rn=i,Ke=gi(o.firstChild),pi=!1,u=!0):u=!1),u||Ua(i)),et(i),u=i.type,d=i.pendingProps,S=e!==null?e.memoizedProps:null,o=d.children,ih(u,d)?o=null:S!==null&&ih(u,S)&&(i.flags|=32),i.memoizedState!==null&&(u=ef(e,i,ey,null,null,a),Vo._currentValue=u),Ql(e,i),wn(e,i,o,a),i.child;case 6:return e===null&&Ce&&((e=a=Ke)&&(a=Gy(a,i.pendingProps,pi),a!==null?(i.stateNode=a,Rn=i,Ke=null,e=!0):e=!1),e||Ua(i)),null;case 13:return Sg(e,i,a);case 4:return it(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Ms(i,null,o,a):wn(e,i,o,a),i.child;case 11:return hg(e,i,i.type,i.pendingProps,a);case 7:return wn(e,i,i.pendingProps,a),i.child;case 8:return wn(e,i,i.pendingProps.children,a),i.child;case 12:return wn(e,i,i.pendingProps.children,a),i.child;case 10:return o=i.pendingProps,La(i,i.type,o.value),wn(e,i,o.children,a),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,vs(i),u=Cn(u),o=o(u),i.flags|=1,wn(e,i,o,a),i.child;case 14:return dg(e,i,i.type,i.pendingProps,a);case 15:return pg(e,i,i.type,i.pendingProps,a);case 19:return Eg(e,i,a);case 31:return cy(e,i,a);case 22:return mg(e,i,a,i.pendingProps);case 24:return vs(i),o=Cn(cn),e===null?(u=Wu(),u===null&&(u=je,d=ku(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),i.memoizedState={parent:o,cache:u},Yu(i),La(i,cn,u)):((e.lanes&a)!==0&&(ju(e,i),Mo(i,null,null,a),So()),u=e.memoizedState,d=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),La(i,cn,o)):(o=d.cache,La(i,cn,o),o!==u.cache&&Vu(i,[cn],a,!0))),wn(e,i,i.pendingProps.children,a),i.child;case 29:throw i.pendingProps}throw Error(s(156,i.tag))}function ra(e){e.flags|=4}function Df(e,i,a,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Qg())e.flags|=8192;else throw Ss=Il,qu}else e.flags&=-16777217}function Tg(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!H0(i))if(Qg())e.flags|=8192;else throw Ss=Il,qu}function $l(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Be():536870912,e.lanes|=i,gr|=i)}function Co(e,i){if(!Ce)switch(e.tailMode){case"hidden":i=e.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Qe(e){var i=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(i)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,i}function fy(e,i,a){var o=i.pendingProps;switch(zu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(i),null;case 1:return Qe(i),null;case 3:return a=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),na(cn),_t(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ir(i)?ra(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Bu())),Qe(i),null;case 26:var u=i.type,d=i.memoizedState;return e===null?(ra(i),d!==null?(Qe(i),Tg(i,d)):(Qe(i),Df(i,u,null,o,a))):d?d!==e.memoizedState?(ra(i),Qe(i),Tg(i,d)):(Qe(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&ra(i),Qe(i),Df(i,u,e,o,a)),null;case 27:if(Lt(i),a=R.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Qe(i),null}e=j.current,ir(i)?am(i):(e=L0(u,o,a),i.stateNode=e,ra(i))}return Qe(i),null;case 5:if(Lt(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Qe(i),null}if(d=j.current,ir(i))am(i);else{var S=pc(R.current);switch(d){case 1:d=S.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=S.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=S.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?S.createElement("select",{is:o.is}):S.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?S.createElement(u,{is:o.is}):S.createElement(u)}}d[ln]=i,d[Sn]=o;t:for(S=i.child;S!==null;){if(S.tag===5||S.tag===6)d.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===i)break t;for(;S.sibling===null;){if(S.return===null||S.return===i)break t;S=S.return}S.sibling.return=S.return,S=S.sibling}i.stateNode=d;t:switch(Dn(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ra(i)}}return Qe(i),Df(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,a),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(s(166));if(e=R.current,ir(i)){if(e=i.stateNode,a=i.memoizedProps,o=null,u=Rn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[ln]=i,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||S0(e.nodeValue,a)),e||Ua(i,!0)}else e=pc(e).createTextNode(o),e[ln]=i,i.stateNode=e}return Qe(i),null;case 31:if(a=i.memoizedState,e===null||e.memoizedState!==null){if(o=ir(i),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[ln]=i}else gs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),e=!1}else a=Bu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return i.flags&256?(ti(i),i):(ti(i),null);if((i.flags&128)!==0)throw Error(s(558))}return Qe(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ir(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[ln]=i}else gs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),u=!1}else u=Bu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(ti(i),i):(ti(i),null)}return ti(i),(i.flags&128)!==0?(i.lanes=a,i):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==e&&a&&(i.child.flags|=8192),$l(i,i.updateQueue),Qe(i),null);case 4:return _t(),e===null&&Jf(i.stateNode.containerInfo),Qe(i),null;case 10:return na(i.type),Qe(i),null;case 19:if(ut(rn),o=i.memoizedState,o===null)return Qe(i),null;if(u=(i.flags&128)!==0,d=o.rendering,d===null)if(u)Co(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=Hl(e),d!==null){for(i.flags|=128,Co(o,!1),e=d.updateQueue,i.updateQueue=e,$l(i,e),i.subtreeFlags=0,e=a,a=i.child;a!==null;)$p(a,e),a=a.sibling;return At(rn,rn.current&1|2),Ce&&ta(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&E()>ac&&(i.flags|=128,u=!0,Co(o,!1),i.lanes=4194304)}else{if(!u)if(e=Hl(d),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,$l(i,e),Co(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Ce)return Qe(i),null}else 2*E()-o.renderingStartTime>ac&&a!==536870912&&(i.flags|=128,u=!0,Co(o,!1),i.lanes=4194304);o.isBackwards?(d.sibling=i.child,i.child=d):(e=o.last,e!==null?e.sibling=d:i.child=d,o.last=d)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=E(),e.sibling=null,a=rn.current,At(rn,u?a&1|2:a&1),Ce&&ta(i,o.treeForkCount),e):(Qe(i),null);case 22:case 23:return ti(i),Ju(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(a&536870912)!==0&&(i.flags&128)===0&&(Qe(i),i.subtreeFlags&6&&(i.flags|=8192)):Qe(i),a=i.updateQueue,a!==null&&$l(i,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==a&&(i.flags|=2048),e!==null&&ut(xs),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),i.memoizedState.cache!==a&&(i.flags|=2048),na(cn),Qe(i),null;case 25:return null;case 30:return null}throw Error(s(156,i.tag))}function hy(e,i){switch(zu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return na(cn),_t(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Lt(i),null;case 31:if(i.memoizedState!==null){if(ti(i),i.alternate===null)throw Error(s(340));gs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(ti(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(s(340));gs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return ut(rn),null;case 4:return _t(),null;case 10:return na(i.type),null;case 22:case 23:return ti(i),Ju(),e!==null&&ut(xs),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return na(cn),null;case 25:return null;default:return null}}function Ag(e,i){switch(zu(i),i.tag){case 3:na(cn),_t();break;case 26:case 27:case 5:Lt(i);break;case 4:_t();break;case 31:i.memoizedState!==null&&ti(i);break;case 13:ti(i);break;case 19:ut(rn);break;case 10:na(i.type);break;case 22:case 23:ti(i),Ju(),e!==null&&ut(xs);break;case 24:na(cn)}}function wo(e,i){try{var a=i.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var d=a.create,S=a.inst;o=d(),S.destroy=o}a=a.next}while(a!==u)}}catch(U){Ve(i,i.return,U)}}function Fa(e,i,a){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&e)===e){var S=o.inst,U=S.destroy;if(U!==void 0){S.destroy=void 0,u=i;var Y=a,ht=U;try{ht()}catch(Tt){Ve(u,Y,Tt)}}}o=o.next}while(o!==d)}}catch(Tt){Ve(i,i.return,Tt)}}function Rg(e){var i=e.updateQueue;if(i!==null){var a=e.stateNode;try{_m(i,a)}catch(o){Ve(e,e.return,o)}}}function Cg(e,i,a){a.props=bs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ve(e,i,o)}}function Do(e,i){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ve(e,i,u)}}function Ii(e,i){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ve(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ve(e,i,u)}else a.current=null}function wg(e){var i=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ve(e,e.return,u)}}function Uf(e,i,a){try{var o=e.stateNode;Oy(o,e.type,a,i),o[Sn]=i}catch(u){Ve(e,e.return,u)}}function Dg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Wa(e.type)||e.tag===4}function Lf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Dg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Wa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Nf(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,i):(i=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,i.appendChild(e),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Qi));else if(o!==4&&(o===27&&Wa(e.type)&&(a=e.stateNode,i=null),e=e.child,e!==null))for(Nf(e,i,a),e=e.sibling;e!==null;)Nf(e,i,a),e=e.sibling}function tc(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?a.insertBefore(e,i):a.appendChild(e);else if(o!==4&&(o===27&&Wa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(tc(e,i,a),e=e.sibling;e!==null;)tc(e,i,a),e=e.sibling}function Ug(e){var i=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Dn(i,o,a),i[ln]=e,i[Sn]=a}catch(d){Ve(e,e.return,d)}}var oa=!1,hn=!1,Of=!1,Lg=typeof WeakSet=="function"?WeakSet:Set,xn=null;function dy(e,i){if(e=e.containerInfo,eh=Sc,e=Xp(e),Au(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break t}var S=0,U=-1,Y=-1,ht=0,Tt=0,wt=e,mt=null;e:for(;;){for(var St;wt!==a||u!==0&&wt.nodeType!==3||(U=S+u),wt!==d||o!==0&&wt.nodeType!==3||(Y=S+o),wt.nodeType===3&&(S+=wt.nodeValue.length),(St=wt.firstChild)!==null;)mt=wt,wt=St;for(;;){if(wt===e)break e;if(mt===a&&++ht===u&&(U=S),mt===d&&++Tt===o&&(Y=S),(St=wt.nextSibling)!==null)break;wt=mt,mt=wt.parentNode}wt=St}a=U===-1||Y===-1?null:{start:U,end:Y}}else a=null}a=a||{start:0,end:0}}else a=null;for(nh={focusedElem:e,selectionRange:a},Sc=!1,xn=i;xn!==null;)if(i=xn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,xn=e;else for(;xn!==null;){switch(i=xn,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,a=i,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var ie=bs(a.type,u);e=o.getSnapshotBeforeUpdate(ie,d),o.__reactInternalSnapshotBeforeUpdate=e}catch(he){Ve(a,a.return,he)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,a=e.nodeType,a===9)sh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":sh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=i.sibling,e!==null){e.return=i.return,xn=e;break}xn=i.return}}function Ng(e,i,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ca(e,a),o&4&&wo(5,a);break;case 1:if(ca(e,a),o&4)if(e=a.stateNode,i===null)try{e.componentDidMount()}catch(S){Ve(a,a.return,S)}else{var u=bs(a.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(S){Ve(a,a.return,S)}}o&64&&Rg(a),o&512&&Do(a,a.return);break;case 3:if(ca(e,a),o&64&&(e=a.updateQueue,e!==null)){if(i=null,a.child!==null)switch(a.child.tag){case 27:case 5:i=a.child.stateNode;break;case 1:i=a.child.stateNode}try{_m(e,i)}catch(S){Ve(a,a.return,S)}}break;case 27:i===null&&o&4&&Ug(a);case 26:case 5:ca(e,a),i===null&&o&4&&wg(a),o&512&&Do(a,a.return);break;case 12:ca(e,a);break;case 31:ca(e,a),o&4&&Ig(e,a);break;case 13:ca(e,a),o&4&&zg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=My.bind(null,a),Vy(e,a))));break;case 22:if(o=a.memoizedState!==null||oa,!o){i=i!==null&&i.memoizedState!==null||hn,u=oa;var d=hn;oa=o,(hn=i)&&!d?ua(e,a,(a.subtreeFlags&8772)!==0):ca(e,a),oa=u,hn=d}break;case 30:break;default:ca(e,a)}}function Og(e){var i=e.alternate;i!==null&&(e.alternate=null,Og(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&io(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,kn=!1;function la(e,i,a){for(a=a.child;a!==null;)Pg(e,i,a),a=a.sibling}function Pg(e,i,a){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(Pt,a)}catch{}switch(a.tag){case 26:hn||Ii(a,i),la(e,i,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:hn||Ii(a,i);var o=$e,u=kn;Wa(a.type)&&($e=a.stateNode,kn=!1),la(e,i,a),Bo(a.stateNode),$e=o,kn=u;break;case 5:hn||Ii(a,i);case 6:if(o=$e,u=kn,$e=null,la(e,i,a),$e=o,kn=u,$e!==null)if(kn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(a.stateNode)}catch(d){Ve(a,i,d)}else try{$e.removeChild(a.stateNode)}catch(d){Ve(a,i,d)}break;case 18:$e!==null&&(kn?(e=$e,R0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),br(e)):R0($e,a.stateNode));break;case 4:o=$e,u=kn,$e=a.stateNode.containerInfo,kn=!0,la(e,i,a),$e=o,kn=u;break;case 0:case 11:case 14:case 15:Fa(2,a,i),hn||Fa(4,a,i),la(e,i,a);break;case 1:hn||(Ii(a,i),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Cg(a,i,o)),la(e,i,a);break;case 21:la(e,i,a);break;case 22:hn=(o=hn)||a.memoizedState!==null,la(e,i,a),hn=o;break;default:la(e,i,a)}}function Ig(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{br(e)}catch(a){Ve(i,i.return,a)}}}function zg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{br(e)}catch(a){Ve(i,i.return,a)}}function py(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new Lg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new Lg),i;default:throw Error(s(435,e.tag))}}function ec(e,i){var a=py(e);i.forEach(function(o){if(!a.has(o)){a.add(o);var u=Ey.bind(null,e,o);o.then(u,u)}})}function Xn(e,i){var a=i.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=e,S=i,U=S;t:for(;U!==null;){switch(U.tag){case 27:if(Wa(U.type)){$e=U.stateNode,kn=!1;break t}break;case 5:$e=U.stateNode,kn=!1;break t;case 3:case 4:$e=U.stateNode.containerInfo,kn=!0;break t}U=U.return}if($e===null)throw Error(s(160));Pg(d,S,u),$e=null,kn=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Fg(i,e),i=i.sibling}var Ti=null;function Fg(e,i){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Xn(i,e),Wn(e),o&4&&(Fa(3,e,e.return),wo(3,e),Fa(5,e,e.return));break;case 1:Xn(i,e),Wn(e),o&512&&(hn||a===null||Ii(a,a.return)),o&64&&oa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ti;if(Xn(i,e),Wn(e),o&512&&(hn||a===null||Ii(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[cs]||d[ln]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Dn(d,o,a),d[ln]=e,L(d),o=d;break t;case"link":var S=F0("link","href",u).get(o+(a.href||""));if(S){for(var U=0;U<S.length;U++)if(d=S[U],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){S.splice(U,1);break e}}d=u.createElement(o),Dn(d,o,a),u.head.appendChild(d);break;case"meta":if(S=F0("meta","content",u).get(o+(a.content||""))){for(U=0;U<S.length;U++)if(d=S[U],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){S.splice(U,1);break e}}d=u.createElement(o),Dn(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[ln]=e,L(d),o=d}e.stateNode=o}else B0(u,e.type,e.stateNode);else e.stateNode=z0(u,o,e.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?B0(u,e.type,e.stateNode):z0(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Uf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Xn(i,e),Wn(e),o&512&&(hn||a===null||Ii(a,a.return)),a!==null&&o&4&&Uf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Xn(i,e),Wn(e),o&512&&(hn||a===null||Ii(a,a.return)),e.flags&32){u=e.stateNode;try{pn(u,"")}catch(ie){Ve(e,e.return,ie)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Uf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Of=!0);break;case 6:if(Xn(i,e),Wn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(ie){Ve(e,e.return,ie)}}break;case 3:if(_c=null,u=Ti,Ti=mc(i.containerInfo),Xn(i,e),Ti=u,Wn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{br(i.containerInfo)}catch(ie){Ve(e,e.return,ie)}Of&&(Of=!1,Bg(e));break;case 4:o=Ti,Ti=mc(e.stateNode.containerInfo),Xn(i,e),Wn(e),Ti=o;break;case 12:Xn(i,e),Wn(e);break;case 31:Xn(i,e),Wn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ec(e,o)));break;case 13:Xn(i,e),Wn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ic=E()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ec(e,o)));break;case 22:u=e.memoizedState!==null;var Y=a!==null&&a.memoizedState!==null,ht=oa,Tt=hn;if(oa=ht||u,hn=Tt||Y,Xn(i,e),hn=Tt,oa=ht,Wn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(a===null||Y||oa||hn||Ts(e)),a=null,i=e;;){if(i.tag===5||i.tag===26){if(a===null){Y=a=i;try{if(d=Y.stateNode,u)S=d.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{U=Y.stateNode;var wt=Y.memoizedProps.style,mt=wt!=null&&wt.hasOwnProperty("display")?wt.display:null;U.style.display=mt==null||typeof mt=="boolean"?"":(""+mt).trim()}}catch(ie){Ve(Y,Y.return,ie)}}}else if(i.tag===6){if(a===null){Y=i;try{Y.stateNode.nodeValue=u?"":Y.memoizedProps}catch(ie){Ve(Y,Y.return,ie)}}}else if(i.tag===18){if(a===null){Y=i;try{var St=Y.stateNode;u?C0(St,!0):C0(Y.stateNode,!1)}catch(ie){Ve(Y,Y.return,ie)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;a===i&&(a=null),i=i.return}a===i&&(a=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,ec(e,a))));break;case 19:Xn(i,e),Wn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ec(e,o)));break;case 30:break;case 21:break;default:Xn(i,e),Wn(e)}}function Wn(e){var i=e.flags;if(i&2){try{for(var a,o=e.return;o!==null;){if(Dg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Lf(e);tc(e,d,u);break;case 5:var S=a.stateNode;a.flags&32&&(pn(S,""),a.flags&=-33);var U=Lf(e);tc(e,U,S);break;case 3:case 4:var Y=a.stateNode.containerInfo,ht=Lf(e);Nf(e,ht,Y);break;default:throw Error(s(161))}}catch(Tt){Ve(e,e.return,Tt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function Bg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;Bg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ca(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)Ng(e,i.alternate,i),i=i.sibling}function Ts(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Fa(4,i,i.return),Ts(i);break;case 1:Ii(i,i.return);var a=i.stateNode;typeof a.componentWillUnmount=="function"&&Cg(i,i.return,a),Ts(i);break;case 27:Bo(i.stateNode);case 26:case 5:Ii(i,i.return),Ts(i);break;case 22:i.memoizedState===null&&Ts(i);break;case 30:Ts(i);break;default:Ts(i)}e=e.sibling}}function ua(e,i,a){for(a=a&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,d=i,S=d.flags;switch(d.tag){case 0:case 11:case 15:ua(u,d,a),wo(4,d);break;case 1:if(ua(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ht){Ve(o,o.return,ht)}if(o=d,u=o.updateQueue,u!==null){var U=o.stateNode;try{var Y=u.shared.hiddenCallbacks;if(Y!==null)for(u.shared.hiddenCallbacks=null,u=0;u<Y.length;u++)gm(Y[u],U)}catch(ht){Ve(o,o.return,ht)}}a&&S&64&&Rg(d),Do(d,d.return);break;case 27:Ug(d);case 26:case 5:ua(u,d,a),a&&o===null&&S&4&&wg(d),Do(d,d.return);break;case 12:ua(u,d,a);break;case 31:ua(u,d,a),a&&S&4&&Ig(u,d);break;case 13:ua(u,d,a),a&&S&4&&zg(u,d);break;case 22:d.memoizedState===null&&ua(u,d,a),Do(d,d.return);break;case 30:break;default:ua(u,d,a)}i=i.sibling}}function Pf(e,i){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&go(a))}function If(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&go(e))}function Ai(e,i,a,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)Hg(e,i,a,o),i=i.sibling}function Hg(e,i,a,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Ai(e,i,a,o),u&2048&&wo(9,i);break;case 1:Ai(e,i,a,o);break;case 3:Ai(e,i,a,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&go(e)));break;case 12:if(u&2048){Ai(e,i,a,o),e=i.stateNode;try{var d=i.memoizedProps,S=d.id,U=d.onPostCommit;typeof U=="function"&&U(S,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(Y){Ve(i,i.return,Y)}}else Ai(e,i,a,o);break;case 31:Ai(e,i,a,o);break;case 13:Ai(e,i,a,o);break;case 23:break;case 22:d=i.stateNode,S=i.alternate,i.memoizedState!==null?d._visibility&2?Ai(e,i,a,o):Uo(e,i):d._visibility&2?Ai(e,i,a,o):(d._visibility|=2,dr(e,i,a,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Pf(S,i);break;case 24:Ai(e,i,a,o),u&2048&&If(i.alternate,i);break;default:Ai(e,i,a,o)}}function dr(e,i,a,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,S=i,U=a,Y=o,ht=S.flags;switch(S.tag){case 0:case 11:case 15:dr(d,S,U,Y,u),wo(8,S);break;case 23:break;case 22:var Tt=S.stateNode;S.memoizedState!==null?Tt._visibility&2?dr(d,S,U,Y,u):Uo(d,S):(Tt._visibility|=2,dr(d,S,U,Y,u)),u&&ht&2048&&Pf(S.alternate,S);break;case 24:dr(d,S,U,Y,u),u&&ht&2048&&If(S.alternate,S);break;default:dr(d,S,U,Y,u)}i=i.sibling}}function Uo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var a=e,o=i,u=o.flags;switch(o.tag){case 22:Uo(a,o),u&2048&&Pf(o.alternate,o);break;case 24:Uo(a,o),u&2048&&If(o.alternate,o);break;default:Uo(a,o)}i=i.sibling}}var Lo=8192;function pr(e,i,a){if(e.subtreeFlags&Lo)for(e=e.child;e!==null;)Gg(e,i,a),e=e.sibling}function Gg(e,i,a){switch(e.tag){case 26:pr(e,i,a),e.flags&Lo&&e.memoizedState!==null&&tS(a,Ti,e.memoizedState,e.memoizedProps);break;case 5:pr(e,i,a);break;case 3:case 4:var o=Ti;Ti=mc(e.stateNode.containerInfo),pr(e,i,a),Ti=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Lo,Lo=16777216,pr(e,i,a),Lo=o):pr(e,i,a));break;default:pr(e,i,a)}}function Vg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function No(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];xn=o,Xg(o,e)}Vg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)kg(e),e=e.sibling}function kg(e){switch(e.tag){case 0:case 11:case 15:No(e),e.flags&2048&&Fa(9,e,e.return);break;case 3:No(e);break;case 12:No(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,nc(e)):No(e);break;default:No(e)}}function nc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];xn=o,Xg(o,e)}Vg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Fa(8,i,i.return),nc(i);break;case 22:a=i.stateNode,a._visibility&2&&(a._visibility&=-3,nc(i));break;default:nc(i)}e=e.sibling}}function Xg(e,i){for(;xn!==null;){var a=xn;switch(a.tag){case 0:case 11:case 15:Fa(8,a,i);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:go(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,xn=o;else t:for(a=e;xn!==null;){o=xn;var u=o.sibling,d=o.return;if(Og(o),o===a){xn=null;break t}if(u!==null){u.return=d,xn=u;break t}xn=d}}}var my={getCacheForType:function(e){var i=Cn(cn),a=i.data.get(e);return a===void 0&&(a=e(),i.data.set(e,a)),a},cacheSignal:function(){return Cn(cn).controller.signal}},gy=typeof WeakMap=="function"?WeakMap:Map,ze=0,je=null,Ee=null,Ae=0,Ge=0,ei=null,Ba=!1,mr=!1,zf=!1,fa=0,an=0,Ha=0,As=0,Ff=0,ni=0,gr=0,Oo=null,qn=null,Bf=!1,ic=0,Wg=0,ac=1/0,sc=null,Ga=null,mn=0,Va=null,_r=null,ha=0,Hf=0,Gf=null,qg=null,Po=0,Vf=null;function ii(){return(ze&2)!==0&&Ae!==0?Ae&-Ae:V.T!==null?jf():eo()}function Yg(){if(ni===0)if((Ae&536870912)===0||Ce){var e=Ht;Ht<<=1,(Ht&3932160)===0&&(Ht=262144),ni=e}else ni=536870912;return e=$n.current,e!==null&&(e.flags|=32),ni}function Yn(e,i,a){(e===je&&(Ge===2||Ge===9)||e.cancelPendingCommit!==null)&&(vr(e,0),ka(e,Ae,ni,!1)),Nn(e,a),((ze&2)===0||e!==je)&&(e===je&&((ze&2)===0&&(As|=a),an===4&&ka(e,Ae,ni,!1)),zi(e))}function jg(e,i,a){if((ze&6)!==0)throw Error(s(327));var o=!a&&(i&127)===0&&(i&e.expiredLanes)===0||kt(e,i),u=o?xy(e,i):Xf(e,i,!0),d=o;do{if(u===0){mr&&!o&&ka(e,i,0,!1);break}else{if(a=e.current.alternate,d&&!_y(a)){u=Xf(e,i,!1),d=!1;continue}if(u===2){if(d=i,e.errorRecoveryDisabledLanes&d)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){i=S;t:{var U=e;u=Oo;var Y=U.current.memoizedState.isDehydrated;if(Y&&(vr(U,S).flags|=256),S=Xf(U,S,!1),S!==2){if(zf&&!Y){U.errorRecoveryDisabledLanes|=d,As|=d,u=4;break t}d=qn,qn=u,d!==null&&(qn===null?qn=d:qn.push.apply(qn,d))}u=S}if(d=!1,u!==2)continue}}if(u===1){vr(e,0),ka(e,i,0,!0);break}t:{switch(o=e,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((i&4194048)!==i)break;case 6:ka(o,i,ni,!Ba);break t;case 2:qn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((i&62914560)===i&&(u=ic+300-E(),10<u)){if(ka(o,i,ni,!Ba),Nt(o,0,!0)!==0)break t;ha=i,o.timeoutHandle=T0(Zg.bind(null,o,a,qn,sc,Bf,i,ni,As,gr,Ba,d,"Throttled",-0,0),u);break t}Zg(o,a,qn,sc,Bf,i,ni,As,gr,Ba,d,null,-0,0)}}break}while(!0);zi(e)}function Zg(e,i,a,o,u,d,S,U,Y,ht,Tt,wt,mt,St){if(e.timeoutHandle=-1,wt=i.subtreeFlags,wt&8192||(wt&16785408)===16785408){wt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Qi},Gg(i,d,wt);var ie=(d&62914560)===d?ic-E():(d&4194048)===d?Wg-E():0;if(ie=eS(wt,ie),ie!==null){ha=d,e.cancelPendingCommit=ie(i0.bind(null,e,i,d,a,o,u,S,U,Y,Tt,wt,null,mt,St)),ka(e,d,S,!ht);return}}i0(e,i,d,a,o,u,S,U,Y)}function _y(e){for(var i=e;;){var a=i.tag;if((a===0||a===11||a===15)&&i.flags&16384&&(a=i.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Qn(d(),u))return!1}catch{return!1}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ka(e,i,a,o){i&=~Ff,i&=~As,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var d=31-Zt(u),S=1<<d;o[d]=-1,u&=~S}a!==0&&_l(e,a,i)}function rc(){return(ze&6)===0?(Io(0),!1):!0}function kf(){if(Ee!==null){if(Ge===0)var e=Ee.return;else e=Ee,ea=_s=null,sf(e),lr=null,vo=0,e=Ee;for(;e!==null;)Ag(e.alternate,e),e=e.return;Ee=null}}function vr(e,i){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,zy(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ha=0,kf(),je=e,Ee=a=$i(e.current,null),Ae=i,Ge=0,ei=null,Ba=!1,mr=kt(e,i),zf=!1,gr=ni=Ff=As=Ha=an=0,qn=Oo=null,Bf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-Zt(o),d=1<<u;i|=e[u],o&=~d}return fa=i,Rl(),a}function Kg(e,i){ve=null,V.H=Ao,i===or||i===Pl?(i=hm(),Ge=3):i===qu?(i=hm(),Ge=4):Ge=i===Sf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ei=i,Ee===null&&(an=1,Zl(e,fi(i,e.current)))}function Qg(){var e=$n.current;return e===null?!0:(Ae&4194048)===Ae?mi===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?e===mi:!1}function Jg(){var e=V.H;return V.H=Ao,e===null?Ao:e}function $g(){var e=V.A;return V.A=my,e}function oc(){an=4,Ba||(Ae&4194048)!==Ae&&$n.current!==null||(mr=!0),(Ha&134217727)===0&&(As&134217727)===0||je===null||ka(je,Ae,ni,!1)}function Xf(e,i,a){var o=ze;ze|=2;var u=Jg(),d=$g();(je!==e||Ae!==i)&&(sc=null,vr(e,i)),i=!1;var S=an;t:do try{if(Ge!==0&&Ee!==null){var U=Ee,Y=ei;switch(Ge){case 8:kf(),S=6;break t;case 3:case 2:case 9:case 6:$n.current===null&&(i=!0);var ht=Ge;if(Ge=0,ei=null,xr(e,U,Y,ht),a&&mr){S=0;break t}break;default:ht=Ge,Ge=0,ei=null,xr(e,U,Y,ht)}}vy(),S=an;break}catch(Tt){Kg(e,Tt)}while(!0);return i&&e.shellSuspendCounter++,ea=_s=null,ze=o,V.H=u,V.A=d,Ee===null&&(je=null,Ae=0,Rl()),S}function vy(){for(;Ee!==null;)t0(Ee)}function xy(e,i){var a=ze;ze|=2;var o=Jg(),u=$g();je!==e||Ae!==i?(sc=null,ac=E()+500,vr(e,i)):mr=kt(e,i);t:do try{if(Ge!==0&&Ee!==null){i=Ee;var d=ei;e:switch(Ge){case 1:Ge=0,ei=null,xr(e,i,d,1);break;case 2:case 9:if(um(d)){Ge=0,ei=null,e0(i);break}i=function(){Ge!==2&&Ge!==9||je!==e||(Ge=7),zi(e)},d.then(i,i);break t;case 3:Ge=7;break t;case 4:Ge=5;break t;case 7:um(d)?(Ge=0,ei=null,e0(i)):(Ge=0,ei=null,xr(e,i,d,7));break;case 5:var S=null;switch(Ee.tag){case 26:S=Ee.memoizedState;case 5:case 27:var U=Ee;if(S?H0(S):U.stateNode.complete){Ge=0,ei=null;var Y=U.sibling;if(Y!==null)Ee=Y;else{var ht=U.return;ht!==null?(Ee=ht,lc(ht)):Ee=null}break e}}Ge=0,ei=null,xr(e,i,d,5);break;case 6:Ge=0,ei=null,xr(e,i,d,6);break;case 8:kf(),an=6;break t;default:throw Error(s(462))}}yy();break}catch(Tt){Kg(e,Tt)}while(!0);return ea=_s=null,V.H=o,V.A=u,ze=a,Ee!==null?0:(je=null,Ae=0,Rl(),an)}function yy(){for(;Ee!==null&&!zt();)t0(Ee)}function t0(e){var i=bg(e.alternate,e,fa);e.memoizedProps=e.pendingProps,i===null?lc(e):Ee=i}function e0(e){var i=e,a=i.alternate;switch(i.tag){case 15:case 0:i=vg(a,i,i.pendingProps,i.type,void 0,Ae);break;case 11:i=vg(a,i,i.pendingProps,i.type.render,i.ref,Ae);break;case 5:sf(i);default:Ag(a,i),i=Ee=$p(i,fa),i=bg(a,i,fa)}e.memoizedProps=e.pendingProps,i===null?lc(e):Ee=i}function xr(e,i,a,o){ea=_s=null,sf(i),lr=null,vo=0;var u=i.return;try{if(ly(e,u,i,a,Ae)){an=1,Zl(e,fi(a,e.current)),Ee=null;return}}catch(d){if(u!==null)throw Ee=u,d;an=1,Zl(e,fi(a,e.current)),Ee=null;return}i.flags&32768?(Ce||o===1?e=!0:mr||(Ae&536870912)!==0?e=!1:(Ba=e=!0,(o===2||o===9||o===3||o===6)&&(o=$n.current,o!==null&&o.tag===13&&(o.flags|=16384))),n0(i,e)):lc(i)}function lc(e){var i=e;do{if((i.flags&32768)!==0){n0(i,Ba);return}e=i.return;var a=fy(i.alternate,i,fa);if(a!==null){Ee=a;return}if(i=i.sibling,i!==null){Ee=i;return}Ee=i=e}while(i!==null);an===0&&(an=5)}function n0(e,i){do{var a=hy(e.alternate,e);if(a!==null){a.flags&=32767,Ee=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!i&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=a}while(e!==null);an=6,Ee=null}function i0(e,i,a,o,u,d,S,U,Y){e.cancelPendingCommit=null;do cc();while(mn!==0);if((ze&6)!==0)throw Error(s(327));if(i!==null){if(i===e.current)throw Error(s(177));if(d=i.lanes|i.childLanes,d|=Uu,Si(e,a,d,S,U,Y),e===je&&(Ee=je=null,Ae=0),_r=i,Va=e,ha=a,Hf=d,Gf=u,qg=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,by(yt,function(){return l0(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=V.T,V.T=null,u=k.p,k.p=2,S=ze,ze|=4;try{dy(e,i,a)}finally{ze=S,k.p=u,V.T=o}}mn=1,a0(),s0(),r0()}}function a0(){if(mn===1){mn=0;var e=Va,i=_r,a=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||a){a=V.T,V.T=null;var o=k.p;k.p=2;var u=ze;ze|=4;try{Fg(i,e);var d=nh,S=Xp(e.containerInfo),U=d.focusedElem,Y=d.selectionRange;if(S!==U&&U&&U.ownerDocument&&kp(U.ownerDocument.documentElement,U)){if(Y!==null&&Au(U)){var ht=Y.start,Tt=Y.end;if(Tt===void 0&&(Tt=ht),"selectionStart"in U)U.selectionStart=ht,U.selectionEnd=Math.min(Tt,U.value.length);else{var wt=U.ownerDocument||document,mt=wt&&wt.defaultView||window;if(mt.getSelection){var St=mt.getSelection(),ie=U.textContent.length,he=Math.min(Y.start,ie),qe=Y.end===void 0?he:Math.min(Y.end,ie);!St.extend&&he>qe&&(S=qe,qe=he,he=S);var rt=Vp(U,he),Q=Vp(U,qe);if(rt&&Q&&(St.rangeCount!==1||St.anchorNode!==rt.node||St.anchorOffset!==rt.offset||St.focusNode!==Q.node||St.focusOffset!==Q.offset)){var ft=wt.createRange();ft.setStart(rt.node,rt.offset),St.removeAllRanges(),he>qe?(St.addRange(ft),St.extend(Q.node,Q.offset)):(ft.setEnd(Q.node,Q.offset),St.addRange(ft))}}}}for(wt=[],St=U;St=St.parentNode;)St.nodeType===1&&wt.push({element:St,left:St.scrollLeft,top:St.scrollTop});for(typeof U.focus=="function"&&U.focus(),U=0;U<wt.length;U++){var Ct=wt[U];Ct.element.scrollLeft=Ct.left,Ct.element.scrollTop=Ct.top}}Sc=!!eh,nh=eh=null}finally{ze=u,k.p=o,V.T=a}}e.current=i,mn=2}}function s0(){if(mn===2){mn=0;var e=Va,i=_r,a=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||a){a=V.T,V.T=null;var o=k.p;k.p=2;var u=ze;ze|=4;try{Ng(e,i.alternate,i)}finally{ze=u,k.p=o,V.T=a}}mn=3}}function r0(){if(mn===4||mn===3){mn=0,I();var e=Va,i=_r,a=ha,o=qg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?mn=5:(mn=0,_r=Va=null,o0(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ga=null),Xs(a),i=i.stateNode,Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(Pt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=V.T,u=k.p,k.p=2,V.T=null;try{for(var d=e.onRecoverableError,S=0;S<o.length;S++){var U=o[S];d(U.value,{componentStack:U.stack})}}finally{V.T=i,k.p=u}}(ha&3)!==0&&cc(),zi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Vf?Po++:(Po=0,Vf=e):Po=0,Io(0)}}function o0(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,go(i)))}function cc(){return a0(),s0(),r0(),l0()}function l0(){if(mn!==5)return!1;var e=Va,i=Hf;Hf=0;var a=Xs(ha),o=V.T,u=k.p;try{k.p=32>a?32:a,V.T=null,a=Gf,Gf=null;var d=Va,S=ha;if(mn=0,_r=Va=null,ha=0,(ze&6)!==0)throw Error(s(331));var U=ze;if(ze|=4,kg(d.current),Hg(d,d.current,S,a),ze=U,Io(0,!1),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(Pt,d)}catch{}return!0}finally{k.p=u,V.T=o,o0(e,i)}}function c0(e,i,a){i=fi(a,i),i=yf(e.stateNode,i,2),e=Pa(e,i,2),e!==null&&(Nn(e,2),zi(e))}function Ve(e,i,a){if(e.tag===3)c0(e,e,a);else for(;i!==null;){if(i.tag===3){c0(i,e,a);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ga===null||!Ga.has(o))){e=fi(a,e),a=ug(2),o=Pa(i,a,2),o!==null&&(fg(a,o,i,e),Nn(o,2),zi(o));break}}i=i.return}}function Wf(e,i,a){var o=e.pingCache;if(o===null){o=e.pingCache=new gy;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(a)||(zf=!0,u.add(a),e=Sy.bind(null,e,i,a),i.then(e,e))}function Sy(e,i,a){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,je===e&&(Ae&a)===a&&(an===4||an===3&&(Ae&62914560)===Ae&&300>E()-ic?(ze&2)===0&&vr(e,0):Ff|=a,gr===Ae&&(gr=0)),zi(e)}function u0(e,i){i===0&&(i=Be()),e=ps(e,i),e!==null&&(Nn(e,i),zi(e))}function My(e){var i=e.memoizedState,a=0;i!==null&&(a=i.retryLane),u0(e,a)}function Ey(e,i){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(i),u0(e,a)}function by(e,i){return Et(e,i)}var uc=null,yr=null,qf=!1,fc=!1,Yf=!1,Xa=0;function zi(e){e!==yr&&e.next===null&&(yr===null?uc=yr=e:yr=yr.next=e),fc=!0,qf||(qf=!0,Ay())}function Io(e,i){if(!Yf&&fc){Yf=!0;do for(var a=!1,o=uc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var S=o.suspendedLanes,U=o.pingedLanes;d=(1<<31-Zt(42|e)+1)-1,d&=u&~(S&~U),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,p0(o,d))}else d=Ae,d=Nt(o,o===je?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||kt(o,d)||(a=!0,p0(o,d));o=o.next}while(a);Yf=!1}}function Ty(){f0()}function f0(){fc=qf=!1;var e=0;Xa!==0&&Iy()&&(e=Xa);for(var i=E(),a=null,o=uc;o!==null;){var u=o.next,d=h0(o,i);d===0?(o.next=null,a===null?uc=u:a.next=u,u===null&&(yr=a)):(a=o,(e!==0||(d&3)!==0)&&(fc=!0)),o=u}mn!==0&&mn!==5||Io(e),Xa!==0&&(Xa=0)}function h0(e,i){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var S=31-Zt(d),U=1<<S,Y=u[S];Y===-1?((U&a)===0||(U&o)!==0)&&(u[S]=me(U,i)):Y<=i&&(e.expiredLanes|=U),d&=~U}if(i=je,a=Ae,a=Nt(e,e===i?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===i&&(Ge===2||Ge===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Gt(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||kt(e,a)){if(i=a&-a,i===e.callbackPriority)return i;switch(o!==null&&Gt(o),Xs(a)){case 2:case 8:a=Dt;break;case 32:a=yt;break;case 268435456:a=Vt;break;default:a=yt}return o=d0.bind(null,e),a=Et(a,o),e.callbackPriority=i,e.callbackNode=a,i}return o!==null&&o!==null&&Gt(o),e.callbackPriority=2,e.callbackNode=null,2}function d0(e,i){if(mn!==0&&mn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(cc()&&e.callbackNode!==a)return null;var o=Ae;return o=Nt(e,e===je?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(jg(e,o,i),h0(e,E()),e.callbackNode!=null&&e.callbackNode===a?d0.bind(null,e):null)}function p0(e,i){if(cc())return null;jg(e,i,!0)}function Ay(){Fy(function(){(ze&6)!==0?Et(xt,Ty):f0()})}function jf(){if(Xa===0){var e=sr;e===0&&(e=qt,qt<<=1,(qt&261888)===0&&(qt=256)),Xa=e}return Xa}function m0(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:xl(""+e)}function g0(e,i){var a=i.ownerDocument.createElement("input");return a.name=i.name,a.value=i.value,e.id&&a.setAttribute("form",e.id),i.parentNode.insertBefore(a,i),e=new FormData(e),a.parentNode.removeChild(a),e}function Ry(e,i,a,o,u){if(i==="submit"&&a&&a.stateNode===u){var d=m0((u[Sn]||null).action),S=o.submitter;S&&(i=(i=S[Sn]||null)?m0(i.formAction):S.getAttribute("formAction"),i!==null&&(d=i,S=null));var U=new El("action","action",null,o,u);e.push({event:U,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Xa!==0){var Y=S?g0(u,S):new FormData(u);pf(a,{pending:!0,data:Y,method:u.method,action:d},null,Y)}}else typeof d=="function"&&(U.preventDefault(),Y=S?g0(u,S):new FormData(u),pf(a,{pending:!0,data:Y,method:u.method,action:d},d,Y))},currentTarget:u}]})}}for(var Zf=0;Zf<Du.length;Zf++){var Kf=Du[Zf],Cy=Kf.toLowerCase(),wy=Kf[0].toUpperCase()+Kf.slice(1);bi(Cy,"on"+wy)}bi(Yp,"onAnimationEnd"),bi(jp,"onAnimationIteration"),bi(Zp,"onAnimationStart"),bi("dblclick","onDoubleClick"),bi("focusin","onFocus"),bi("focusout","onBlur"),bi(Wx,"onTransitionRun"),bi(qx,"onTransitionStart"),bi(Yx,"onTransitionCancel"),bi(Kp,"onTransitionEnd"),lt("onMouseEnter",["mouseout","mouseover"]),lt("onMouseLeave",["mouseout","mouseover"]),lt("onPointerEnter",["pointerout","pointerover"]),lt("onPointerLeave",["pointerout","pointerover"]),pt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),pt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),pt("onBeforeInput",["compositionend","keypress","textInput","paste"]),pt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),pt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),pt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zo));function _0(e,i){i=(i&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var d=void 0;if(i)for(var S=o.length-1;0<=S;S--){var U=o[S],Y=U.instance,ht=U.currentTarget;if(U=U.listener,Y!==d&&u.isPropagationStopped())break t;d=U,u.currentTarget=ht;try{d(u)}catch(Tt){Al(Tt)}u.currentTarget=null,d=Y}else for(S=0;S<o.length;S++){if(U=o[S],Y=U.instance,ht=U.currentTarget,U=U.listener,Y!==d&&u.isPropagationStopped())break t;d=U,u.currentTarget=ht;try{d(u)}catch(Tt){Al(Tt)}u.currentTarget=null,d=Y}}}}function be(e,i){var a=i[Ws];a===void 0&&(a=i[Ws]=new Set);var o=e+"__bubble";a.has(o)||(v0(i,e,2,!1),a.add(o))}function Qf(e,i,a){var o=0;i&&(o|=4),v0(a,e,o,i)}var hc="_reactListening"+Math.random().toString(36).slice(2);function Jf(e){if(!e[hc]){e[hc]=!0,at.forEach(function(a){a!=="selectionchange"&&(Dy.has(a)||Qf(a,!1,e),Qf(a,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[hc]||(i[hc]=!0,Qf("selectionchange",!1,i))}}function v0(e,i,a,o){switch(Y0(i)){case 2:var u=aS;break;case 8:u=sS;break;default:u=dh}a=u.bind(null,i,a,e),u=void 0,!_u||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,a,{capture:!0,passive:u}):e.addEventListener(i,a,!0):u!==void 0?e.addEventListener(i,a,{passive:u}):e.addEventListener(i,a,!1)}function $f(e,i,a,o,u){var d=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var S=o.tag;if(S===3||S===4){var U=o.stateNode.containerInfo;if(U===u)break;if(S===4)for(S=o.return;S!==null;){var Y=S.tag;if((Y===3||Y===4)&&S.stateNode.containerInfo===u)return;S=S.return}for(;U!==null;){if(S=Ta(U),S===null)return;if(Y=S.tag,Y===5||Y===6||Y===26||Y===27){o=d=S;continue t}U=U.parentNode}}o=o.return}Ep(function(){var ht=d,Tt=mu(a),wt=[];t:{var mt=Qp.get(e);if(mt!==void 0){var St=El,ie=e;switch(e){case"keypress":if(Sl(a)===0)break t;case"keydown":case"keyup":St=Ex;break;case"focusin":ie="focus",St=Su;break;case"focusout":ie="blur",St=Su;break;case"beforeblur":case"afterblur":St=Su;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":St=Ap;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":St=fx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":St=Ax;break;case Yp:case jp:case Zp:St=px;break;case Kp:St=Cx;break;case"scroll":case"scrollend":St=cx;break;case"wheel":St=Dx;break;case"copy":case"cut":case"paste":St=gx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":St=Cp;break;case"toggle":case"beforetoggle":St=Lx}var he=(i&4)!==0,qe=!he&&(e==="scroll"||e==="scrollend"),rt=he?mt!==null?mt+"Capture":null:mt;he=[];for(var Q=ht,ft;Q!==null;){var Ct=Q;if(ft=Ct.stateNode,Ct=Ct.tag,Ct!==5&&Ct!==26&&Ct!==27||ft===null||rt===null||(Ct=ao(Q,rt),Ct!=null&&he.push(Fo(Q,Ct,ft))),qe)break;Q=Q.return}0<he.length&&(mt=new St(mt,ie,null,a,Tt),wt.push({event:mt,listeners:he}))}}if((i&7)===0){t:{if(mt=e==="mouseover"||e==="pointerover",St=e==="mouseout"||e==="pointerout",mt&&a!==pu&&(ie=a.relatedTarget||a.fromElement)&&(Ta(ie)||ie[Mi]))break t;if((St||mt)&&(mt=Tt.window===Tt?Tt:(mt=Tt.ownerDocument)?mt.defaultView||mt.parentWindow:window,St?(ie=a.relatedTarget||a.toElement,St=ht,ie=ie?Ta(ie):null,ie!==null&&(qe=c(ie),he=ie.tag,ie!==qe||he!==5&&he!==27&&he!==6)&&(ie=null)):(St=null,ie=ht),St!==ie)){if(he=Ap,Ct="onMouseLeave",rt="onMouseEnter",Q="mouse",(e==="pointerout"||e==="pointerover")&&(he=Cp,Ct="onPointerLeave",rt="onPointerEnter",Q="pointer"),qe=St==null?mt:us(St),ft=ie==null?mt:us(ie),mt=new he(Ct,Q+"leave",St,a,Tt),mt.target=qe,mt.relatedTarget=ft,Ct=null,Ta(Tt)===ht&&(he=new he(rt,Q+"enter",ie,a,Tt),he.target=ft,he.relatedTarget=qe,Ct=he),qe=Ct,St&&ie)e:{for(he=Uy,rt=St,Q=ie,ft=0,Ct=rt;Ct;Ct=he(Ct))ft++;Ct=0;for(var ce=Q;ce;ce=he(ce))Ct++;for(;0<ft-Ct;)rt=he(rt),ft--;for(;0<Ct-ft;)Q=he(Q),Ct--;for(;ft--;){if(rt===Q||Q!==null&&rt===Q.alternate){he=rt;break e}rt=he(rt),Q=he(Q)}he=null}else he=null;St!==null&&x0(wt,mt,St,he,!1),ie!==null&&qe!==null&&x0(wt,qe,ie,he,!0)}}t:{if(mt=ht?us(ht):window,St=mt.nodeName&&mt.nodeName.toLowerCase(),St==="select"||St==="input"&&mt.type==="file")var Ne=Ip;else if(Op(mt))if(zp)Ne=Vx;else{Ne=Hx;var re=Bx}else St=mt.nodeName,!St||St.toLowerCase()!=="input"||mt.type!=="checkbox"&&mt.type!=="radio"?ht&&Ei(ht.elementType)&&(Ne=Ip):Ne=Gx;if(Ne&&(Ne=Ne(e,ht))){Pp(wt,Ne,a,Tt);break t}re&&re(e,mt,ht),e==="focusout"&&ht&&mt.type==="number"&&ht.memoizedProps.value!=null&&En(mt,"number",mt.value)}switch(re=ht?us(ht):window,e){case"focusin":(Op(re)||re.contentEditable==="true")&&(Qs=re,Ru=ht,ho=null);break;case"focusout":ho=Ru=Qs=null;break;case"mousedown":Cu=!0;break;case"contextmenu":case"mouseup":case"dragend":Cu=!1,Wp(wt,a,Tt);break;case"selectionchange":if(Xx)break;case"keydown":case"keyup":Wp(wt,a,Tt)}var ye;if(Eu)t:{switch(e){case"compositionstart":var Re="onCompositionStart";break t;case"compositionend":Re="onCompositionEnd";break t;case"compositionupdate":Re="onCompositionUpdate";break t}Re=void 0}else Ks?Lp(e,a)&&(Re="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Re="onCompositionStart");Re&&(wp&&a.locale!=="ko"&&(Ks||Re!=="onCompositionStart"?Re==="onCompositionEnd"&&Ks&&(ye=bp()):(Ca=Tt,vu="value"in Ca?Ca.value:Ca.textContent,Ks=!0)),re=dc(ht,Re),0<re.length&&(Re=new Rp(Re,e,null,a,Tt),wt.push({event:Re,listeners:re}),ye?Re.data=ye:(ye=Np(a),ye!==null&&(Re.data=ye)))),(ye=Ox?Px(e,a):Ix(e,a))&&(Re=dc(ht,"onBeforeInput"),0<Re.length&&(re=new Rp("onBeforeInput","beforeinput",null,a,Tt),wt.push({event:re,listeners:Re}),re.data=ye)),Ry(wt,e,ht,a,Tt)}_0(wt,i)})}function Fo(e,i,a){return{instance:e,listener:i,currentTarget:a}}function dc(e,i){for(var a=i+"Capture",o=[];e!==null;){var u=e,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=ao(e,a),u!=null&&o.unshift(Fo(e,u,d)),u=ao(e,i),u!=null&&o.push(Fo(e,u,d))),e.tag===3)return o;e=e.return}return[]}function Uy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function x0(e,i,a,o,u){for(var d=i._reactName,S=[];a!==null&&a!==o;){var U=a,Y=U.alternate,ht=U.stateNode;if(U=U.tag,Y!==null&&Y===o)break;U!==5&&U!==26&&U!==27||ht===null||(Y=ht,u?(ht=ao(a,d),ht!=null&&S.unshift(Fo(a,ht,Y))):u||(ht=ao(a,d),ht!=null&&S.push(Fo(a,ht,Y)))),a=a.return}S.length!==0&&e.push({event:i,listeners:S})}var Ly=/\r\n?/g,Ny=/\u0000|\uFFFD/g;function y0(e){return(typeof e=="string"?e:""+e).replace(Ly,`
`).replace(Ny,"")}function S0(e,i){return i=y0(i),y0(e)===i}function We(e,i,a,o,u,d){switch(a){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||pn(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&pn(e,""+o);break;case"className":ue(e,"class",o);break;case"tabIndex":ue(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":ue(e,a,o);break;case"style":Ys(e,o,d);break;case"data":if(i!=="object"){ue(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=xl(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(i!=="input"&&We(e,i,"name",u.name,u,null),We(e,i,"formEncType",u.formEncType,u,null),We(e,i,"formMethod",u.formMethod,u,null),We(e,i,"formTarget",u.formTarget,u,null)):(We(e,i,"encType",u.encType,u,null),We(e,i,"method",u.method,u,null),We(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=xl(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"onScroll":o!=null&&be("scroll",e);break;case"onScrollEnd":o!=null&&be("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=xl(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":be("beforetoggle",e),be("toggle",e),ae(e,"popover",o);break;case"xlinkActuate":se(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":se(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":se(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":se(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":se(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":se(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":se(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":se(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":se(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":ae(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ox.get(a)||a,ae(e,a,o))}}function th(e,i,a,o,u,d){switch(a){case"style":Ys(e,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?pn(e,o):(typeof o=="number"||typeof o=="bigint")&&pn(e,""+o);break;case"onScroll":o!=null&&be("scroll",e);break;case"onScrollEnd":o!=null&&be("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!vt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),i=a.slice(2,u?a.length-7:void 0),d=e[Sn]||null,d=d!=null?d[a]:null,typeof d=="function"&&e.removeEventListener(i,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(i,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):ae(e,a,o)}}}function Dn(e,i,a){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":be("error",e),be("load",e);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var S=a[d];if(S!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:We(e,i,d,S,a,null)}}u&&We(e,i,"srcSet",a.srcSet,a,null),o&&We(e,i,"src",a.src,a,null);return;case"input":be("invalid",e);var U=d=S=u=null,Y=null,ht=null;for(o in a)if(a.hasOwnProperty(o)){var Tt=a[o];if(Tt!=null)switch(o){case"name":u=Tt;break;case"type":S=Tt;break;case"checked":Y=Tt;break;case"defaultChecked":ht=Tt;break;case"value":d=Tt;break;case"defaultValue":U=Tt;break;case"children":case"dangerouslySetInnerHTML":if(Tt!=null)throw Error(s(137,i));break;default:We(e,i,o,Tt,a,null)}}Ki(e,d,U,Y,ht,S,u,!1);return;case"select":be("invalid",e),o=S=d=null;for(u in a)if(a.hasOwnProperty(u)&&(U=a[u],U!=null))switch(u){case"value":d=U;break;case"defaultValue":S=U;break;case"multiple":o=U;default:We(e,i,u,U,a,null)}i=d,a=S,e.multiple=!!o,i!=null?ci(e,!!o,i,!1):a!=null&&ci(e,!!o,a,!0);return;case"textarea":be("invalid",e),d=u=o=null;for(S in a)if(a.hasOwnProperty(S)&&(U=a[S],U!=null))switch(S){case"value":o=U;break;case"defaultValue":u=U;break;case"children":d=U;break;case"dangerouslySetInnerHTML":if(U!=null)throw Error(s(91));break;default:We(e,i,S,U,a,null)}bn(e,o,u,d);return;case"option":for(Y in a)a.hasOwnProperty(Y)&&(o=a[Y],o!=null)&&(Y==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":We(e,i,Y,o,a,null));return;case"dialog":be("beforetoggle",e),be("toggle",e),be("cancel",e),be("close",e);break;case"iframe":case"object":be("load",e);break;case"video":case"audio":for(o=0;o<zo.length;o++)be(zo[o],e);break;case"image":be("error",e),be("load",e);break;case"details":be("toggle",e);break;case"embed":case"source":case"link":be("error",e),be("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ht in a)if(a.hasOwnProperty(ht)&&(o=a[ht],o!=null))switch(ht){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:We(e,i,ht,o,a,null)}return;default:if(Ei(i)){for(Tt in a)a.hasOwnProperty(Tt)&&(o=a[Tt],o!==void 0&&th(e,i,Tt,o,a,void 0));return}}for(U in a)a.hasOwnProperty(U)&&(o=a[U],o!=null&&We(e,i,U,o,a,null))}function Oy(e,i,a,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,S=null,U=null,Y=null,ht=null,Tt=null;for(St in a){var wt=a[St];if(a.hasOwnProperty(St)&&wt!=null)switch(St){case"checked":break;case"value":break;case"defaultValue":Y=wt;default:o.hasOwnProperty(St)||We(e,i,St,null,o,wt)}}for(var mt in o){var St=o[mt];if(wt=a[mt],o.hasOwnProperty(mt)&&(St!=null||wt!=null))switch(mt){case"type":d=St;break;case"name":u=St;break;case"checked":ht=St;break;case"defaultChecked":Tt=St;break;case"value":S=St;break;case"defaultValue":U=St;break;case"children":case"dangerouslySetInnerHTML":if(St!=null)throw Error(s(137,i));break;default:St!==wt&&We(e,i,mt,St,o,wt)}}Mn(e,S,U,Y,ht,Tt,d,u);return;case"select":St=S=U=mt=null;for(d in a)if(Y=a[d],a.hasOwnProperty(d)&&Y!=null)switch(d){case"value":break;case"multiple":St=Y;default:o.hasOwnProperty(d)||We(e,i,d,null,o,Y)}for(u in o)if(d=o[u],Y=a[u],o.hasOwnProperty(u)&&(d!=null||Y!=null))switch(u){case"value":mt=d;break;case"defaultValue":U=d;break;case"multiple":S=d;default:d!==Y&&We(e,i,u,d,o,Y)}i=U,a=S,o=St,mt!=null?ci(e,!!a,mt,!1):!!o!=!!a&&(i!=null?ci(e,!!a,i,!0):ci(e,!!a,a?[]:"",!1));return;case"textarea":St=mt=null;for(U in a)if(u=a[U],a.hasOwnProperty(U)&&u!=null&&!o.hasOwnProperty(U))switch(U){case"value":break;case"children":break;default:We(e,i,U,null,o,u)}for(S in o)if(u=o[S],d=a[S],o.hasOwnProperty(S)&&(u!=null||d!=null))switch(S){case"value":mt=u;break;case"defaultValue":St=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&We(e,i,S,u,o,d)}He(e,mt,St);return;case"option":for(var ie in a)mt=a[ie],a.hasOwnProperty(ie)&&mt!=null&&!o.hasOwnProperty(ie)&&(ie==="selected"?e.selected=!1:We(e,i,ie,null,o,mt));for(Y in o)mt=o[Y],St=a[Y],o.hasOwnProperty(Y)&&mt!==St&&(mt!=null||St!=null)&&(Y==="selected"?e.selected=mt&&typeof mt!="function"&&typeof mt!="symbol":We(e,i,Y,mt,o,St));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var he in a)mt=a[he],a.hasOwnProperty(he)&&mt!=null&&!o.hasOwnProperty(he)&&We(e,i,he,null,o,mt);for(ht in o)if(mt=o[ht],St=a[ht],o.hasOwnProperty(ht)&&mt!==St&&(mt!=null||St!=null))switch(ht){case"children":case"dangerouslySetInnerHTML":if(mt!=null)throw Error(s(137,i));break;default:We(e,i,ht,mt,o,St)}return;default:if(Ei(i)){for(var qe in a)mt=a[qe],a.hasOwnProperty(qe)&&mt!==void 0&&!o.hasOwnProperty(qe)&&th(e,i,qe,void 0,o,mt);for(Tt in o)mt=o[Tt],St=a[Tt],!o.hasOwnProperty(Tt)||mt===St||mt===void 0&&St===void 0||th(e,i,Tt,mt,o,St);return}}for(var rt in a)mt=a[rt],a.hasOwnProperty(rt)&&mt!=null&&!o.hasOwnProperty(rt)&&We(e,i,rt,null,o,mt);for(wt in o)mt=o[wt],St=a[wt],!o.hasOwnProperty(wt)||mt===St||mt==null&&St==null||We(e,i,wt,mt,o,St)}function M0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Py(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,S=u.initiatorType,U=u.duration;if(d&&U&&M0(S)){for(S=0,U=u.responseEnd,o+=1;o<a.length;o++){var Y=a[o],ht=Y.startTime;if(ht>U)break;var Tt=Y.transferSize,wt=Y.initiatorType;Tt&&M0(wt)&&(Y=Y.responseEnd,S+=Tt*(Y<U?1:(U-ht)/(Y-ht)))}if(--o,i+=8*(d+S)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var eh=null,nh=null;function pc(e){return e.nodeType===9?e:e.ownerDocument}function E0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function b0(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function ih(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var ah=null;function Iy(){var e=window.event;return e&&e.type==="popstate"?e===ah?!1:(ah=e,!0):(ah=null,!1)}var T0=typeof setTimeout=="function"?setTimeout:void 0,zy=typeof clearTimeout=="function"?clearTimeout:void 0,A0=typeof Promise=="function"?Promise:void 0,Fy=typeof queueMicrotask=="function"?queueMicrotask:typeof A0<"u"?function(e){return A0.resolve(null).then(e).catch(By)}:T0;function By(e){setTimeout(function(){throw e})}function Wa(e){return e==="head"}function R0(e,i){var a=i,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),br(i);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Bo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Bo(a);for(var d=a.firstChild;d;){var S=d.nextSibling,U=d.nodeName;d[cs]||U==="SCRIPT"||U==="STYLE"||U==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=S}}else a==="body"&&Bo(e.ownerDocument.body);a=u}while(a);br(i)}function C0(e,i){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?i?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(i?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function sh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var a=i;switch(i=i.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":sh(a),io(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Hy(e,i,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[cs])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=gi(e.nextSibling),e===null)break}return null}function Gy(e,i,a){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=gi(e.nextSibling),e===null))return null;return e}function w0(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=gi(e.nextSibling),e===null))return null;return e}function rh(e){return e.data==="$?"||e.data==="$~"}function oh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Vy(e,i){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||a.readyState!=="loading")i();else{var o=function(){i(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function gi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var lh=null;function D0(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(i===0)return gi(e.nextSibling);i--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||i++}e=e.nextSibling}return null}function U0(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(i===0)return e;i--}else a!=="/$"&&a!=="/&"||i++}e=e.previousSibling}return null}function L0(e,i,a){switch(i=pc(a),e){case"html":if(e=i.documentElement,!e)throw Error(s(452));return e;case"head":if(e=i.head,!e)throw Error(s(453));return e;case"body":if(e=i.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Bo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);io(e)}var _i=new Map,N0=new Set;function mc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var da=k.d;k.d={f:ky,r:Xy,D:Wy,C:qy,L:Yy,m:jy,X:Ky,S:Zy,M:Qy};function ky(){var e=da.f(),i=rc();return e||i}function Xy(e){var i=Aa(e);i!==null&&i.tag===5&&i.type==="form"?Km(i):da.r(e)}var Sr=typeof document>"u"?null:document;function O0(e,i,a){var o=Sr;if(o&&typeof i=="string"&&i){var u=ge(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),N0.has(u)||(N0.add(u),e={rel:e,crossOrigin:a,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Dn(i,"link",e),L(i),o.head.appendChild(i)))}}function Wy(e){da.D(e),O0("dns-prefetch",e,null)}function qy(e,i){da.C(e,i),O0("preconnect",e,i)}function Yy(e,i,a){da.L(e,i,a);var o=Sr;if(o&&e&&i){var u='link[rel="preload"][as="'+ge(i)+'"]';i==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+ge(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+ge(a.imageSizes)+'"]')):u+='[href="'+ge(e)+'"]';var d=u;switch(i){case"style":d=Mr(e);break;case"script":d=Er(e)}_i.has(d)||(e=g({rel:"preload",href:i==="image"&&a&&a.imageSrcSet?void 0:e,as:i},a),_i.set(d,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(Ho(d))||i==="script"&&o.querySelector(Go(d))||(i=o.createElement("link"),Dn(i,"link",e),L(i),o.head.appendChild(i)))}}function jy(e,i){da.m(e,i);var a=Sr;if(a&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+ge(o)+'"][href="'+ge(e)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Er(e)}if(!_i.has(d)&&(e=g({rel:"modulepreload",href:e},i),_i.set(d,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Go(d)))return}o=a.createElement("link"),Dn(o,"link",e),L(o),a.head.appendChild(o)}}}function Zy(e,i,a){da.S(e,i,a);var o=Sr;if(o&&e){var u=Ra(o).hoistableStyles,d=Mr(e);i=i||"default";var S=u.get(d);if(!S){var U={loading:0,preload:null};if(S=o.querySelector(Ho(d)))U.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":i},a),(a=_i.get(d))&&ch(e,a);var Y=S=o.createElement("link");L(Y),Dn(Y,"link",e),Y._p=new Promise(function(ht,Tt){Y.onload=ht,Y.onerror=Tt}),Y.addEventListener("load",function(){U.loading|=1}),Y.addEventListener("error",function(){U.loading|=2}),U.loading|=4,gc(S,i,o)}S={type:"stylesheet",instance:S,count:1,state:U},u.set(d,S)}}}function Ky(e,i){da.X(e,i);var a=Sr;if(a&&e){var o=Ra(a).hoistableScripts,u=Er(e),d=o.get(u);d||(d=a.querySelector(Go(u)),d||(e=g({src:e,async:!0},i),(i=_i.get(u))&&uh(e,i),d=a.createElement("script"),L(d),Dn(d,"link",e),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Qy(e,i){da.M(e,i);var a=Sr;if(a&&e){var o=Ra(a).hoistableScripts,u=Er(e),d=o.get(u);d||(d=a.querySelector(Go(u)),d||(e=g({src:e,async:!0,type:"module"},i),(i=_i.get(u))&&uh(e,i),d=a.createElement("script"),L(d),Dn(d,"link",e),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function P0(e,i,a,o){var u=(u=R.current)?mc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(i=Mr(a.href),a=Ra(u).hoistableStyles,o=a.get(i),o||(o={type:"style",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Mr(a.href);var d=Ra(u).hoistableStyles,S=d.get(e);if(S||(u=u.ownerDocument||u,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,S),(d=u.querySelector(Ho(e)))&&!d._p&&(S.instance=d,S.state.loading=5),_i.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},_i.set(e,a),d||Jy(u,e,a,S.state))),i&&o===null)throw Error(s(528,""));return S}if(i&&o!==null)throw Error(s(529,""));return null;case"script":return i=a.async,a=a.src,typeof a=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Er(a),a=Ra(u).hoistableScripts,o=a.get(i),o||(o={type:"script",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Mr(e){return'href="'+ge(e)+'"'}function Ho(e){return'link[rel="stylesheet"]['+e+"]"}function I0(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function Jy(e,i,a,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Dn(i,"link",a),L(i),e.head.appendChild(i))}function Er(e){return'[src="'+ge(e)+'"]'}function Go(e){return"script[async]"+e}function z0(e,i,a){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+ge(a.href)+'"]');if(o)return i.instance=o,L(o),o;var u=g({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),L(o),Dn(o,"style",u),gc(o,a.precedence,e),i.instance=o;case"stylesheet":u=Mr(a.href);var d=e.querySelector(Ho(u));if(d)return i.state.loading|=4,i.instance=d,L(d),d;o=I0(a),(u=_i.get(u))&&ch(o,u),d=(e.ownerDocument||e).createElement("link"),L(d);var S=d;return S._p=new Promise(function(U,Y){S.onload=U,S.onerror=Y}),Dn(d,"link",o),i.state.loading|=4,gc(d,a.precedence,e),i.instance=d;case"script":return d=Er(a.src),(u=e.querySelector(Go(d)))?(i.instance=u,L(u),u):(o=a,(u=_i.get(d))&&(o=g({},a),uh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),L(u),Dn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(s(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,gc(o,a.precedence,e));return i.instance}function gc(e,i,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,S=0;S<o.length;S++){var U=o[S];if(U.dataset.precedence===i)d=U;else if(d!==u)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=a.nodeType===9?a.head:a,i.insertBefore(e,i.firstChild))}function ch(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function uh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var _c=null;function F0(e,i,a){if(_c===null){var o=new Map,u=_c=new Map;u.set(a,o)}else u=_c,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var d=a[u];if(!(d[cs]||d[ln]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var S=d.getAttribute(i)||"";S=e+S;var U=o.get(S);U?U.push(d):o.set(S,[d])}}return o}function B0(e,i,a){e=e.ownerDocument||e,e.head.insertBefore(a,i==="title"?e.querySelector("head > title"):null)}function $y(e,i,a){if(a===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;return i.rel==="stylesheet"?(e=i.disabled,typeof i.precedence=="string"&&e==null):!0;case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function H0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function tS(e,i,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Mr(o.href),d=i.querySelector(Ho(u));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=vc.bind(e),i.then(e,e)),a.state.loading|=4,a.instance=d,L(d);return}d=i.ownerDocument||i,o=I0(o),(u=_i.get(u))&&ch(o,u),d=d.createElement("link"),L(d);var S=d;S._p=new Promise(function(U,Y){S.onload=U,S.onerror=Y}),Dn(d,"link",o),a.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,i),(i=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=vc.bind(e),i.addEventListener("load",a),i.addEventListener("error",a))}}var fh=0;function eS(e,i){return e.stylesheets&&e.count===0&&yc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&yc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&fh===0&&(fh=62500*Py());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&yc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>fh?50:800)+i);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function vc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)yc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var xc=null;function yc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,xc=new Map,i.forEach(nS,e),xc=null,vc.call(e))}function nS(e,i){if(!(i.state.loading&4)){var a=xc.get(e);if(a)var o=a.get(null);else{a=new Map,xc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var S=u[d];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(a.set(S.dataset.precedence,S),o=S)}o&&a.set(null,o)}u=i.instance,S=u.getAttribute("data-precedence"),d=a.get(S)||o,d===o&&a.set(null,u),a.set(S,u),this.count++,o=vc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Vo={$$typeof:w,Provider:null,Consumer:null,_currentValue:W,_currentValue2:W,_threadCount:0};function iS(e,i,a,o,u,d,S,U,Y){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=De(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=De(0),this.hiddenUpdates=De(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=Y,this.incompleteTransitions=new Map}function G0(e,i,a,o,u,d,S,U,Y,ht,Tt,wt){return e=new iS(e,i,a,S,Y,ht,Tt,wt,U),i=1,d===!0&&(i|=24),d=Jn(3,null,null,i),e.current=d,d.stateNode=e,i=ku(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:i},Yu(d),e}function V0(e){return e?(e=tr,e):tr}function k0(e,i,a,o,u,d){u=V0(u),o.context===null?o.context=u:o.pendingContext=u,o=Oa(i),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Pa(e,o,i),a!==null&&(Yn(a,e,i),yo(a,e,i))}function X0(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<i?a:i}}function hh(e,i){X0(e,i),(e=e.alternate)&&X0(e,i)}function W0(e){if(e.tag===13||e.tag===31){var i=ps(e,67108864);i!==null&&Yn(i,e,67108864),hh(e,67108864)}}function q0(e){if(e.tag===13||e.tag===31){var i=ii();i=to(i);var a=ps(e,i);a!==null&&Yn(a,e,i),hh(e,i)}}var Sc=!0;function aS(e,i,a,o){var u=V.T;V.T=null;var d=k.p;try{k.p=2,dh(e,i,a,o)}finally{k.p=d,V.T=u}}function sS(e,i,a,o){var u=V.T;V.T=null;var d=k.p;try{k.p=8,dh(e,i,a,o)}finally{k.p=d,V.T=u}}function dh(e,i,a,o){if(Sc){var u=ph(o);if(u===null)$f(e,i,o,Mc,a),j0(e,o);else if(oS(u,e,i,a,o))o.stopPropagation();else if(j0(e,o),i&4&&-1<rS.indexOf(e)){for(;u!==null;){var d=Aa(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var S=It(d.pendingLanes);if(S!==0){var U=d;for(U.pendingLanes|=2,U.entangledLanes|=2;S;){var Y=1<<31-Zt(S);U.entanglements[1]|=Y,S&=~Y}zi(d),(ze&6)===0&&(ac=E()+500,Io(0))}}break;case 31:case 13:U=ps(d,2),U!==null&&Yn(U,d,2),rc(),hh(d,2)}if(d=ph(o),d===null&&$f(e,i,o,Mc,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else $f(e,i,o,null,a)}}function ph(e){return e=mu(e),mh(e)}var Mc=null;function mh(e){if(Mc=null,e=Ta(e),e!==null){var i=c(e);if(i===null)e=null;else{var a=i.tag;if(a===13){if(e=f(i),e!==null)return e;e=null}else if(a===31){if(e=h(i),e!==null)return e;e=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Mc=e,null}function Y0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(J()){case xt:return 2;case Dt:return 8;case yt:case te:return 32;case Vt:return 268435456;default:return 32}default:return 32}}var gh=!1,qa=null,Ya=null,ja=null,ko=new Map,Xo=new Map,Za=[],rS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function j0(e,i){switch(e){case"focusin":case"focusout":qa=null;break;case"dragenter":case"dragleave":Ya=null;break;case"mouseover":case"mouseout":ja=null;break;case"pointerover":case"pointerout":ko.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xo.delete(i.pointerId)}}function Wo(e,i,a,o,u,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},i!==null&&(i=Aa(i),i!==null&&W0(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function oS(e,i,a,o,u){switch(i){case"focusin":return qa=Wo(qa,e,i,a,o,u),!0;case"dragenter":return Ya=Wo(Ya,e,i,a,o,u),!0;case"mouseover":return ja=Wo(ja,e,i,a,o,u),!0;case"pointerover":var d=u.pointerId;return ko.set(d,Wo(ko.get(d)||null,e,i,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,Xo.set(d,Wo(Xo.get(d)||null,e,i,a,o,u)),!0}return!1}function Z0(e){var i=Ta(e.target);if(i!==null){var a=c(i);if(a!==null){if(i=a.tag,i===13){if(i=f(a),i!==null){e.blockedOn=i,Ni(e.priority,function(){q0(a)});return}}else if(i===31){if(i=h(a),i!==null){e.blockedOn=i,Ni(e.priority,function(){q0(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ec(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var a=ph(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);pu=o,a.target.dispatchEvent(o),pu=null}else return i=Aa(a),i!==null&&W0(i),e.blockedOn=a,!1;i.shift()}return!0}function K0(e,i,a){Ec(e)&&a.delete(i)}function lS(){gh=!1,qa!==null&&Ec(qa)&&(qa=null),Ya!==null&&Ec(Ya)&&(Ya=null),ja!==null&&Ec(ja)&&(ja=null),ko.forEach(K0),Xo.forEach(K0)}function bc(e,i){e.blockedOn===i&&(e.blockedOn=null,gh||(gh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,lS)))}var Tc=null;function Q0(e){Tc!==e&&(Tc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Tc===e&&(Tc=null);for(var i=0;i<e.length;i+=3){var a=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(mh(o||a)===null)continue;break}var d=Aa(a);d!==null&&(e.splice(i,3),i-=3,pf(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function br(e){function i(Y){return bc(Y,e)}qa!==null&&bc(qa,e),Ya!==null&&bc(Ya,e),ja!==null&&bc(ja,e),ko.forEach(i),Xo.forEach(i);for(var a=0;a<Za.length;a++){var o=Za[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Za.length&&(a=Za[0],a.blockedOn===null);)Z0(a),a.blockedOn===null&&Za.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],S=u[Sn]||null;if(typeof d=="function")S||Q0(a);else if(S){var U=null;if(d&&d.hasAttribute("formAction")){if(u=d,S=d[Sn]||null)U=S.formAction;else if(mh(u)!==null)continue}else U=S.action;typeof U=="function"?a[o+1]=U:(a.splice(o,3),o-=3),Q0(a)}}}function J0(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(S){return u=S})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function _h(e){this._internalRoot=e}Ac.prototype.render=_h.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(s(409));var a=i.current,o=ii();k0(a,o,e,i,null,null)},Ac.prototype.unmount=_h.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;k0(e.current,2,null,e,null,null),rc(),i[Mi]=null}};function Ac(e){this._internalRoot=e}Ac.prototype.unstable_scheduleHydration=function(e){if(e){var i=eo();e={blockedOn:null,target:e,priority:i};for(var a=0;a<Za.length&&i!==0&&i<Za[a].priority;a++);Za.splice(a,0,e),a===0&&Z0(e)}};var $0=t.version;if($0!=="19.2.4")throw Error(s(527,$0,"19.2.4"));k.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(i),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var cS={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:V,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rc.isDisabled&&Rc.supportsFiber)try{Pt=Rc.inject(cS),Bt=Rc}catch{}}return Yo.createRoot=function(e,i){if(!l(e))throw Error(s(299));var a=!1,o="",u=rg,d=og,S=lg;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(S=i.onRecoverableError)),i=G0(e,1,!1,null,null,a,o,null,u,d,S,J0),e[Mi]=i.current,Jf(e),new _h(i)},Yo.hydrateRoot=function(e,i,a){if(!l(e))throw Error(s(299));var o=!1,u="",d=rg,S=og,U=lg,Y=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(S=a.onCaughtError),a.onRecoverableError!==void 0&&(U=a.onRecoverableError),a.formState!==void 0&&(Y=a.formState)),i=G0(e,1,!0,i,a??null,o,u,Y,d,S,U,J0),i.context=V0(null),a=i.current,o=ii(),o=to(o),u=Oa(o),u.callback=null,Pa(a,u,o),a=o,i.current.lanes=a,Nn(i,a),zi(i),e[Mi]=i.current,Jf(e),new Ac(i)},Yo.version="19.2.4",Yo}var c_;function xS(){if(c_)return yh.exports;c_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),yh.exports=vS(),yh.exports}var yS=xS();const ip="182",Gr={ROTATE:0,DOLLY:1,PAN:2},Hr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},SS=0,u_=1,MS=2,Jc=1,ES=2,el=3,ls=0,Kn=1,Hi=2,Sa=0,Vr=1,su=2,f_=3,h_=4,bS=5,Os=100,TS=101,AS=102,RS=103,CS=104,wS=200,DS=201,US=202,LS=203,sd=204,rd=205,NS=206,OS=207,PS=208,IS=209,zS=210,FS=211,BS=212,HS=213,GS=214,od=0,ld=1,cd=2,Wr=3,ud=4,fd=5,hd=6,dd=7,gv=0,VS=1,kS=2,ki=0,_v=1,vv=2,xv=3,yv=4,Sv=5,Mv=6,Ev=7,bv=300,Bs=301,qr=302,pd=303,md=304,uu=306,gd=1e3,ya=1001,_d=1002,Un=1003,XS=1004,Cc=1005,zn=1006,bh=1007,Is=1008,oi=1009,Tv=1010,Av=1011,ol=1012,ap=1013,qi=1014,Gi=1015,Ea=1016,sp=1017,rp=1018,ll=1020,Rv=35902,Cv=35899,wv=1021,Dv=1022,Ui=1023,ba=1026,zs=1027,Uv=1028,op=1029,Yr=1030,lp=1031,cp=1033,$c=33776,tu=33777,eu=33778,nu=33779,vd=35840,xd=35841,yd=35842,Sd=35843,Md=36196,Ed=37492,bd=37496,Td=37488,Ad=37489,Rd=37490,Cd=37491,wd=37808,Dd=37809,Ud=37810,Ld=37811,Nd=37812,Od=37813,Pd=37814,Id=37815,zd=37816,Fd=37817,Bd=37818,Hd=37819,Gd=37820,Vd=37821,kd=36492,Xd=36494,Wd=36495,qd=36283,Yd=36284,jd=36285,Zd=36286,WS=3200,Lv=0,qS=1,as="",ri="srgb",jr="srgb-linear",ru="linear",ke="srgb",Tr=7680,d_=519,YS=512,jS=513,ZS=514,up=515,KS=516,QS=517,fp=518,JS=519,p_=35044,m_="300 es",Vi=2e3,ou=2001;function Nv(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function lu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $S(){const r=lu("canvas");return r.style.display="block",r}const g_={};function __(...r){const t="THREE."+r.shift();console.log(t,...r)}function pe(...r){const t="THREE."+r.shift();console.warn(t,...r)}function Ue(...r){const t="THREE."+r.shift();console.error(t,...r)}function cl(...r){const t=r.join(" ");t in g_||(g_[t]=!0,pe(...r))}function tM(r,t,n){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:s()}}setTimeout(c,n)})}class Vs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(n)===-1&&s[t].push(n)}hasEventListener(t,n){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(n)!==-1}removeEventListener(t,n){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const s=n[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],iu=Math.PI/180,Kd=180/Math.PI;function Qr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Pn[r&255]+Pn[r>>8&255]+Pn[r>>16&255]+Pn[r>>24&255]+"-"+Pn[t&255]+Pn[t>>8&255]+"-"+Pn[t>>16&15|64]+Pn[t>>24&255]+"-"+Pn[n&63|128]+Pn[n>>8&255]+"-"+Pn[n>>16&255]+Pn[n>>24&255]+Pn[s&255]+Pn[s>>8&255]+Pn[s>>16&255]+Pn[s>>24&255]).toLowerCase()}function Me(r,t,n){return Math.max(t,Math.min(n,r))}function eM(r,t){return(r%t+t)%t}function Th(r,t,n){return(1-n)*r+n*t}function jo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function jn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const nM={DEG2RAD:iu};class Ut{constructor(t=0,n=0){Ut.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,s=this.y,l=t.elements;return this.x=l[0]*n+l[3]*s+l[6],this.y=l[1]*n+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Me(s,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(Me(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y;return n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const s=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hs{constructor(t=0,n=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=s,this._w=l}static slerpFlat(t,n,s,l,c,f,h){let m=s[l+0],p=s[l+1],_=s[l+2],g=s[l+3],x=c[f+0],M=c[f+1],b=c[f+2],A=c[f+3];if(h<=0){t[n+0]=m,t[n+1]=p,t[n+2]=_,t[n+3]=g;return}if(h>=1){t[n+0]=x,t[n+1]=M,t[n+2]=b,t[n+3]=A;return}if(g!==A||m!==x||p!==M||_!==b){let y=m*x+p*M+_*b+g*A;y<0&&(x=-x,M=-M,b=-b,A=-A,y=-y);let v=1-h;if(y<.9995){const P=Math.acos(y),w=Math.sin(P);v=Math.sin(v*P)/w,h=Math.sin(h*P)/w,m=m*v+x*h,p=p*v+M*h,_=_*v+b*h,g=g*v+A*h}else{m=m*v+x*h,p=p*v+M*h,_=_*v+b*h,g=g*v+A*h;const P=1/Math.sqrt(m*m+p*p+_*_+g*g);m*=P,p*=P,_*=P,g*=P}}t[n]=m,t[n+1]=p,t[n+2]=_,t[n+3]=g}static multiplyQuaternionsFlat(t,n,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],_=s[l+3],g=c[f],x=c[f+1],M=c[f+2],b=c[f+3];return t[n]=h*b+_*g+m*M-p*x,t[n+1]=m*b+_*x+p*g-h*M,t[n+2]=p*b+_*M+h*x-m*g,t[n+3]=_*b-h*g-m*x-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,s,l){return this._x=t,this._y=n,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const s=t._x,l=t._y,c=t._z,f=t._order,h=Math.cos,m=Math.sin,p=h(s/2),_=h(l/2),g=h(c/2),x=m(s/2),M=m(l/2),b=m(c/2);switch(f){case"XYZ":this._x=x*_*g+p*M*b,this._y=p*M*g-x*_*b,this._z=p*_*b+x*M*g,this._w=p*_*g-x*M*b;break;case"YXZ":this._x=x*_*g+p*M*b,this._y=p*M*g-x*_*b,this._z=p*_*b-x*M*g,this._w=p*_*g+x*M*b;break;case"ZXY":this._x=x*_*g-p*M*b,this._y=p*M*g+x*_*b,this._z=p*_*b+x*M*g,this._w=p*_*g-x*M*b;break;case"ZYX":this._x=x*_*g-p*M*b,this._y=p*M*g+x*_*b,this._z=p*_*b-x*M*g,this._w=p*_*g+x*M*b;break;case"YZX":this._x=x*_*g+p*M*b,this._y=p*M*g+x*_*b,this._z=p*_*b-x*M*g,this._w=p*_*g-x*M*b;break;case"XZY":this._x=x*_*g-p*M*b,this._y=p*M*g-x*_*b,this._z=p*_*b+x*M*g,this._w=p*_*g+x*M*b;break;default:pe("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const s=n/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,s=n[0],l=n[4],c=n[8],f=n[1],h=n[5],m=n[9],p=n[2],_=n[6],g=n[10],x=s+h+g;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(_-m)*M,this._y=(c-p)*M,this._z=(f-l)*M}else if(s>h&&s>g){const M=2*Math.sqrt(1+s-h-g);this._w=(_-m)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+p)/M}else if(h>g){const M=2*Math.sqrt(1+h-s-g);this._w=(c-p)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(m+_)/M}else{const M=2*Math.sqrt(1+g-s-h);this._w=(f-l)/M,this._x=(c+p)/M,this._y=(m+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let s=t.dot(n)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,n){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,n/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const s=t._x,l=t._y,c=t._z,f=t._w,h=n._x,m=n._y,p=n._z,_=n._w;return this._x=s*_+f*h+l*p-c*m,this._y=l*_+f*m+c*h-s*p,this._z=c*_+f*p+s*m-l*h,this._w=f*_-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(t,n){if(n<=0)return this;if(n>=1)return this.copy(t);let s=t._x,l=t._y,c=t._z,f=t._w,h=this.dot(t);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-n;if(h<.9995){const p=Math.acos(h),_=Math.sin(p);m=Math.sin(m*p)/_,n=Math.sin(n*p)/_,this._x=this._x*m+s*n,this._y=this._y*m+l*n,this._z=this._z*m+c*n,this._w=this._w*m+f*n,this._onChangeCallback()}else this._x=this._x*m+s*n,this._y=this._y*m+l*n,this._z=this._z*m+c*n,this._w=this._w*m+f*n,this.normalize();return this}slerpQuaternions(t,n,s){return this.copy(t).slerp(n,s)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{constructor(t=0,n=0,s=0){nt.prototype.isVector3=!0,this.x=t,this.y=n,this.z=s}set(t,n,s){return s===void 0&&(s=this.z),this.x=t,this.y=n,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(v_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(v_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*s+c[6]*l,this.y=c[1]*n+c[4]*s+c[7]*l,this.z=c[2]*n+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,s=this.y,l=this.z,c=t.x,f=t.y,h=t.z,m=t.w,p=2*(f*l-h*s),_=2*(h*n-c*l),g=2*(c*s-f*n);return this.x=n+m*p+f*g-h*_,this.y=s+m*_+h*p-c*g,this.z=l+m*g+c*_-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*s+c[8]*l,this.y=c[1]*n+c[5]*s+c[9]*l,this.z=c[2]*n+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Me(s,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const s=t.x,l=t.y,c=t.z,f=n.x,h=n.y,m=n.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const s=t.dot(this)/n;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Ah.copy(this).projectOnVector(t),this.sub(Ah)}reflect(t){return this.sub(Ah.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(Me(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return n*n+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,s){const l=Math.sin(n)*t;return this.x=l*Math.sin(s),this.y=Math.cos(n)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,s){return this.x=t*Math.sin(n),this.y=s,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=s,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,s=Math.sqrt(1-n*n);return this.x=s*Math.cos(t),this.y=n,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ah=new nt,v_=new Hs;class de{constructor(t,n,s,l,c,f,h,m,p){de.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,h,m,p)}set(t,n,s,l,c,f,h,m,p){const _=this.elements;return _[0]=t,_[1]=l,_[2]=h,_[3]=n,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(t,n,s){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],_=s[4],g=s[7],x=s[2],M=s[5],b=s[8],A=l[0],y=l[3],v=l[6],P=l[1],w=l[4],N=l[7],F=l[2],H=l[5],z=l[8];return c[0]=f*A+h*P+m*F,c[3]=f*y+h*w+m*H,c[6]=f*v+h*N+m*z,c[1]=p*A+_*P+g*F,c[4]=p*y+_*w+g*H,c[7]=p*v+_*N+g*z,c[2]=x*A+M*P+b*F,c[5]=x*y+M*w+b*H,c[8]=x*v+M*N+b*z,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],h=t[5],m=t[6],p=t[7],_=t[8];return n*f*_-n*h*p-s*c*_+s*h*m+l*c*p-l*f*m}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],h=t[5],m=t[6],p=t[7],_=t[8],g=_*f-h*p,x=h*m-_*c,M=p*c-f*m,b=n*g+s*x+l*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/b;return t[0]=g*A,t[1]=(l*p-_*s)*A,t[2]=(h*s-l*f)*A,t[3]=x*A,t[4]=(_*n-l*m)*A,t[5]=(l*c-h*n)*A,t[6]=M*A,t[7]=(s*m-p*n)*A,t[8]=(f*n-s*c)*A,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+t,-l*p,l*m,-l*(-p*f+m*h)+h+n,0,0,1),this}scale(t,n){return this.premultiply(Rh.makeScale(t,n)),this}rotate(t){return this.premultiply(Rh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Rh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<9;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<9;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Rh=new de,x_=new de().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),y_=new de().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function iM(){const r={enabled:!0,workingColorSpace:jr,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===ke&&(l.r=Ma(l.r),l.g=Ma(l.g),l.b=Ma(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===ke&&(l.r=kr(l.r),l.g=kr(l.g),l.b=kr(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===as?ru:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return cl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return cl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[jr]:{primaries:t,whitePoint:s,transfer:ru,toXYZ:x_,fromXYZ:y_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ri},outputColorSpaceConfig:{drawingBufferColorSpace:ri}},[ri]:{primaries:t,whitePoint:s,transfer:ke,toXYZ:x_,fromXYZ:y_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ri}}}),r}const Le=iM();function Ma(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function kr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ar;class aM{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Ar===void 0&&(Ar=lu("canvas")),Ar.width=t.width,Ar.height=t.height;const l=Ar.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Ar}return s.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=lu("canvas");n.width=t.width,n.height=t.height;const s=n.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ma(c[f]/255)*255;return s.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(Ma(n[s]/255)*255):n[s]=Ma(n[s]);return{data:n,width:t.width,height:t.height}}else return pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sM=0;class hp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sM++}),this.uuid=Qr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Ch(l[f].image)):c.push(Ch(l[f]))}else c=Ch(l);s.url=c}return n||(t.images[this.uuid]=s),s}}function Ch(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?aM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(pe("Texture: Unable to serialize Texture."),{})}let rM=0;const wh=new nt;class Gn extends Vs{constructor(t=Gn.DEFAULT_IMAGE,n=Gn.DEFAULT_MAPPING,s=ya,l=ya,c=zn,f=Is,h=Ui,m=oi,p=Gn.DEFAULT_ANISOTROPY,_=as){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rM++}),this.uuid=Qr(),this.name="",this.source=new hp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new de,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(wh).x}get height(){return this.source.getSize(wh).y}get depth(){return this.source.getSize(wh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const s=t[n];if(s===void 0){pe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){pe(`Texture.setValues(): property '${n}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gd:t.x=t.x-Math.floor(t.x);break;case ya:t.x=t.x<0?0:1;break;case _d:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gd:t.y=t.y-Math.floor(t.y);break;case ya:t.y=t.y<0?0:1;break;case _d:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=bv;Gn.DEFAULT_ANISOTROPY=1;class sn{constructor(t=0,n=0,s=0,l=1){sn.prototype.isVector4=!0,this.x=t,this.y=n,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,s,l){return this.x=t,this.y=n,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,s,l,c;const m=t.elements,p=m[0],_=m[4],g=m[8],x=m[1],M=m[5],b=m[9],A=m[2],y=m[6],v=m[10];if(Math.abs(_-x)<.01&&Math.abs(g-A)<.01&&Math.abs(b-y)<.01){if(Math.abs(_+x)<.1&&Math.abs(g+A)<.1&&Math.abs(b+y)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const w=(p+1)/2,N=(M+1)/2,F=(v+1)/2,H=(_+x)/4,z=(g+A)/4,Z=(b+y)/4;return w>N&&w>F?w<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(w),l=H/s,c=z/s):N>F?N<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(N),s=H/l,c=Z/l):F<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(F),s=z/c,l=Z/c),this.set(s,l,c,n),this}let P=Math.sqrt((y-b)*(y-b)+(g-A)*(g-A)+(x-_)*(x-_));return Math.abs(P)<.001&&(P=1),this.x=(y-b)/P,this.y=(g-A)/P,this.z=(x-_)/P,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this.w=Me(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this.w=Me(this.w,t,n),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Me(s,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this.w=t.w+(n.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oM extends Vs{constructor(t=1,n=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=s.depth,this.scissor=new sn(0,0,t,n),this.scissorTest=!1,this.viewport=new sn(0,0,t,n);const l={width:t,height:n,depth:s.depth},c=new Gn(l);this.textures=[];const f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(t={}){const n={minFilter:zn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,s=1){if(this.width!==t||this.height!==n||this.depth!==s){this.width=t,this.height=n,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const l=Object.assign({},t.textures[n].image);this.textures[n].source=new hp(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xi extends oM{constructor(t=1,n=1,s={}){super(t,n,s),this.isWebGLRenderTarget=!0}}class Ov extends Gn{constructor(t=null,n=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Un,this.minFilter=Un,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lM extends Gn{constructor(t=null,n=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Un,this.minFilter=Un,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pl{constructor(t=new nt(1/0,1/0,1/0),n=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n+=3)this.expandByPoint(Ri.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,s=t.count;n<s;n++)this.expandByPoint(Ri.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const s=Ri.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)t.isMesh===!0?t.getVertexPosition(f,Ri):Ri.fromBufferAttribute(c,f),Ri.applyMatrix4(t.matrixWorld),this.expandByPoint(Ri);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),wc.copy(s.boundingBox)),wc.applyMatrix4(t.matrixWorld),this.union(wc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ri),Ri.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,s;return t.normal.x>0?(n=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),n<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zo),Dc.subVectors(this.max,Zo),Rr.subVectors(t.a,Zo),Cr.subVectors(t.b,Zo),wr.subVectors(t.c,Zo),Qa.subVectors(Cr,Rr),Ja.subVectors(wr,Cr),Rs.subVectors(Rr,wr);let n=[0,-Qa.z,Qa.y,0,-Ja.z,Ja.y,0,-Rs.z,Rs.y,Qa.z,0,-Qa.x,Ja.z,0,-Ja.x,Rs.z,0,-Rs.x,-Qa.y,Qa.x,0,-Ja.y,Ja.x,0,-Rs.y,Rs.x,0];return!Dh(n,Rr,Cr,wr,Dc)||(n=[1,0,0,0,1,0,0,0,1],!Dh(n,Rr,Cr,wr,Dc))?!1:(Uc.crossVectors(Qa,Ja),n=[Uc.x,Uc.y,Uc.z],Dh(n,Rr,Cr,wr,Dc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ri).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ri).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const pa=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Ri=new nt,wc=new pl,Rr=new nt,Cr=new nt,wr=new nt,Qa=new nt,Ja=new nt,Rs=new nt,Zo=new nt,Dc=new nt,Uc=new nt,Cs=new nt;function Dh(r,t,n,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Cs.fromArray(r,c);const h=l.x*Math.abs(Cs.x)+l.y*Math.abs(Cs.y)+l.z*Math.abs(Cs.z),m=t.dot(Cs),p=n.dot(Cs),_=s.dot(Cs);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>h)return!1}return!0}const cM=new pl,Ko=new nt,Uh=new nt;class dp{constructor(t=new nt,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const s=this.center;n!==void 0?s.copy(n):cM.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const s=this.center.distanceToSquared(t);return n.copy(t),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ko.subVectors(t,this.center);const n=Ko.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),l=(s-this.radius)*.5;this.center.addScaledVector(Ko,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ko.copy(t.center).add(Uh)),this.expandByPoint(Ko.copy(t.center).sub(Uh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ma=new nt,Lh=new nt,Lc=new nt,$a=new nt,Nh=new nt,Nc=new nt,Oh=new nt;class Pv{constructor(t=new nt,n=new nt(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ma)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ma.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ma.copy(this.origin).addScaledVector(this.direction,n),ma.distanceToSquared(t))}distanceSqToSegment(t,n,s,l){Lh.copy(t).add(n).multiplyScalar(.5),Lc.copy(n).sub(t).normalize(),$a.copy(this.origin).sub(Lh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(Lc),h=$a.dot(this.direction),m=-$a.dot(Lc),p=$a.lengthSq(),_=Math.abs(1-f*f);let g,x,M,b;if(_>0)if(g=f*m-h,x=f*h-m,b=c*_,g>=0)if(x>=-b)if(x<=b){const A=1/_;g*=A,x*=A,M=g*(g+f*x+2*h)+x*(f*g+x+2*m)+p}else x=c,g=Math.max(0,-(f*x+h)),M=-g*g+x*(x+2*m)+p;else x=-c,g=Math.max(0,-(f*x+h)),M=-g*g+x*(x+2*m)+p;else x<=-b?(g=Math.max(0,-(-f*c+h)),x=g>0?-c:Math.min(Math.max(-c,-m),c),M=-g*g+x*(x+2*m)+p):x<=b?(g=0,x=Math.min(Math.max(-c,-m),c),M=x*(x+2*m)+p):(g=Math.max(0,-(f*c+h)),x=g>0?c:Math.min(Math.max(-c,-m),c),M=-g*g+x*(x+2*m)+p);else x=f>0?-c:c,g=Math.max(0,-(f*x+h)),M=-g*g+x*(x+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(Lh).addScaledVector(Lc,x),M}intersectSphere(t,n){ma.subVectors(t.center,this.origin);const s=ma.dot(this.direction),l=ma.dot(ma)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/n;return s>=0?s:null}intersectPlane(t,n){const s=this.distanceToPlane(t);return s===null?null:this.at(s,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let s,l,c,f,h,m;const p=1/this.direction.x,_=1/this.direction.y,g=1/this.direction.z,x=this.origin;return p>=0?(s=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(s=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),_>=0?(c=(t.min.y-x.y)*_,f=(t.max.y-x.y)*_):(c=(t.max.y-x.y)*_,f=(t.min.y-x.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),g>=0?(h=(t.min.z-x.z)*g,m=(t.max.z-x.z)*g):(h=(t.max.z-x.z)*g,m=(t.min.z-x.z)*g),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,n)}intersectsBox(t){return this.intersectBox(t,ma)!==null}intersectTriangle(t,n,s,l,c){Nh.subVectors(n,t),Nc.subVectors(s,t),Oh.crossVectors(Nh,Nc);let f=this.direction.dot(Oh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;$a.subVectors(this.origin,t);const m=h*this.direction.dot(Nc.crossVectors($a,Nc));if(m<0)return null;const p=h*this.direction.dot(Nh.cross($a));if(p<0||m+p>f)return null;const _=-h*$a.dot(Oh);return _<0?null:this.at(_/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class en{constructor(t,n,s,l,c,f,h,m,p,_,g,x,M,b,A,y){en.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,h,m,p,_,g,x,M,b,A,y)}set(t,n,s,l,c,f,h,m,p,_,g,x,M,b,A,y){const v=this.elements;return v[0]=t,v[4]=n,v[8]=s,v[12]=l,v[1]=c,v[5]=f,v[9]=h,v[13]=m,v[2]=p,v[6]=_,v[10]=g,v[14]=x,v[3]=M,v[7]=b,v[11]=A,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new en().fromArray(this.elements)}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(t){const n=this.elements,s=t.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,s){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,n,s){return this.set(t.x,n.x,s.x,0,t.y,n.y,s.y,0,t.z,n.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,s=t.elements,l=1/Dr.setFromMatrixColumn(t,0).length(),c=1/Dr.setFromMatrixColumn(t,1).length(),f=1/Dr.setFromMatrixColumn(t,2).length();return n[0]=s[0]*l,n[1]=s[1]*l,n[2]=s[2]*l,n[3]=0,n[4]=s[4]*c,n[5]=s[5]*c,n[6]=s[6]*c,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),g=Math.sin(c);if(t.order==="XYZ"){const x=f*_,M=f*g,b=h*_,A=h*g;n[0]=m*_,n[4]=-m*g,n[8]=p,n[1]=M+b*p,n[5]=x-A*p,n[9]=-h*m,n[2]=A-x*p,n[6]=b+M*p,n[10]=f*m}else if(t.order==="YXZ"){const x=m*_,M=m*g,b=p*_,A=p*g;n[0]=x+A*h,n[4]=b*h-M,n[8]=f*p,n[1]=f*g,n[5]=f*_,n[9]=-h,n[2]=M*h-b,n[6]=A+x*h,n[10]=f*m}else if(t.order==="ZXY"){const x=m*_,M=m*g,b=p*_,A=p*g;n[0]=x-A*h,n[4]=-f*g,n[8]=b+M*h,n[1]=M+b*h,n[5]=f*_,n[9]=A-x*h,n[2]=-f*p,n[6]=h,n[10]=f*m}else if(t.order==="ZYX"){const x=f*_,M=f*g,b=h*_,A=h*g;n[0]=m*_,n[4]=b*p-M,n[8]=x*p+A,n[1]=m*g,n[5]=A*p+x,n[9]=M*p-b,n[2]=-p,n[6]=h*m,n[10]=f*m}else if(t.order==="YZX"){const x=f*m,M=f*p,b=h*m,A=h*p;n[0]=m*_,n[4]=A-x*g,n[8]=b*g+M,n[1]=g,n[5]=f*_,n[9]=-h*_,n[2]=-p*_,n[6]=M*g+b,n[10]=x-A*g}else if(t.order==="XZY"){const x=f*m,M=f*p,b=h*m,A=h*p;n[0]=m*_,n[4]=-g,n[8]=p*_,n[1]=x*g+A,n[5]=f*_,n[9]=M*g-b,n[2]=b*g-M,n[6]=h*_,n[10]=A*g+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(uM,t,fM)}lookAt(t,n,s){const l=this.elements;return ai.subVectors(t,n),ai.lengthSq()===0&&(ai.z=1),ai.normalize(),ts.crossVectors(s,ai),ts.lengthSq()===0&&(Math.abs(s.z)===1?ai.x+=1e-4:ai.z+=1e-4,ai.normalize(),ts.crossVectors(s,ai)),ts.normalize(),Oc.crossVectors(ai,ts),l[0]=ts.x,l[4]=Oc.x,l[8]=ai.x,l[1]=ts.y,l[5]=Oc.y,l[9]=ai.y,l[2]=ts.z,l[6]=Oc.z,l[10]=ai.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],_=s[1],g=s[5],x=s[9],M=s[13],b=s[2],A=s[6],y=s[10],v=s[14],P=s[3],w=s[7],N=s[11],F=s[15],H=l[0],z=l[4],Z=l[8],D=l[12],O=l[1],q=l[5],$=l[9],ot=l[13],gt=l[2],dt=l[6],V=l[10],k=l[14],W=l[3],Rt=l[7],bt=l[11],B=l[15];return c[0]=f*H+h*O+m*gt+p*W,c[4]=f*z+h*q+m*dt+p*Rt,c[8]=f*Z+h*$+m*V+p*bt,c[12]=f*D+h*ot+m*k+p*B,c[1]=_*H+g*O+x*gt+M*W,c[5]=_*z+g*q+x*dt+M*Rt,c[9]=_*Z+g*$+x*V+M*bt,c[13]=_*D+g*ot+x*k+M*B,c[2]=b*H+A*O+y*gt+v*W,c[6]=b*z+A*q+y*dt+v*Rt,c[10]=b*Z+A*$+y*V+v*bt,c[14]=b*D+A*ot+y*k+v*B,c[3]=P*H+w*O+N*gt+F*W,c[7]=P*z+w*q+N*dt+F*Rt,c[11]=P*Z+w*$+N*V+F*bt,c[15]=P*D+w*ot+N*k+F*B,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[4],l=t[8],c=t[12],f=t[1],h=t[5],m=t[9],p=t[13],_=t[2],g=t[6],x=t[10],M=t[14],b=t[3],A=t[7],y=t[11],v=t[15],P=m*M-p*x,w=h*M-p*g,N=h*x-m*g,F=f*M-p*_,H=f*x-m*_,z=f*g-h*_;return n*(A*P-y*w+v*N)-s*(b*P-y*F+v*H)+l*(b*w-A*F+v*z)-c*(b*N-A*H+y*z)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=s),this}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],h=t[5],m=t[6],p=t[7],_=t[8],g=t[9],x=t[10],M=t[11],b=t[12],A=t[13],y=t[14],v=t[15],P=g*y*p-A*x*p+A*m*M-h*y*M-g*m*v+h*x*v,w=b*x*p-_*y*p-b*m*M+f*y*M+_*m*v-f*x*v,N=_*A*p-b*g*p+b*h*M-f*A*M-_*h*v+f*g*v,F=b*g*m-_*A*m-b*h*x+f*A*x+_*h*y-f*g*y,H=n*P+s*w+l*N+c*F;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/H;return t[0]=P*z,t[1]=(A*x*c-g*y*c-A*l*M+s*y*M+g*l*v-s*x*v)*z,t[2]=(h*y*c-A*m*c+A*l*p-s*y*p-h*l*v+s*m*v)*z,t[3]=(g*m*c-h*x*c-g*l*p+s*x*p+h*l*M-s*m*M)*z,t[4]=w*z,t[5]=(_*y*c-b*x*c+b*l*M-n*y*M-_*l*v+n*x*v)*z,t[6]=(b*m*c-f*y*c-b*l*p+n*y*p+f*l*v-n*m*v)*z,t[7]=(f*x*c-_*m*c+_*l*p-n*x*p-f*l*M+n*m*M)*z,t[8]=N*z,t[9]=(b*g*c-_*A*c-b*s*M+n*A*M+_*s*v-n*g*v)*z,t[10]=(f*A*c-b*h*c+b*s*p-n*A*p-f*s*v+n*h*v)*z,t[11]=(_*h*c-f*g*c-_*s*p+n*g*p+f*s*M-n*h*M)*z,t[12]=F*z,t[13]=(_*A*l-b*g*l+b*s*x-n*A*x-_*s*y+n*g*y)*z,t[14]=(b*h*l-f*A*l-b*s*m+n*A*m+f*s*y-n*h*y)*z,t[15]=(f*g*l-_*h*l+_*s*m-n*g*m-f*s*x+n*h*x)*z,this}scale(t){const n=this.elements,s=t.x,l=t.y,c=t.z;return n[0]*=s,n[4]*=l,n[8]*=c,n[1]*=s,n[5]*=l,n[9]*=c,n[2]*=s,n[6]*=l,n[10]*=c,n[3]*=s,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,s,l))}makeTranslation(t,n,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const s=Math.cos(n),l=Math.sin(n),c=1-s,f=t.x,h=t.y,m=t.z,p=c*f,_=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,_*h+s,_*m-l*f,0,p*m-l*h,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,n,s){return this.set(t,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,n,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,s){const l=this.elements,c=n._x,f=n._y,h=n._z,m=n._w,p=c+c,_=f+f,g=h+h,x=c*p,M=c*_,b=c*g,A=f*_,y=f*g,v=h*g,P=m*p,w=m*_,N=m*g,F=s.x,H=s.y,z=s.z;return l[0]=(1-(A+v))*F,l[1]=(M+N)*F,l[2]=(b-w)*F,l[3]=0,l[4]=(M-N)*H,l[5]=(1-(x+v))*H,l[6]=(y+P)*H,l[7]=0,l[8]=(b+w)*z,l[9]=(y-P)*z,l[10]=(1-(x+A))*z,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,s){const l=this.elements;if(t.x=l[12],t.y=l[13],t.z=l[14],this.determinant()===0)return s.set(1,1,1),n.identity(),this;let c=Dr.set(l[0],l[1],l[2]).length();const f=Dr.set(l[4],l[5],l[6]).length(),h=Dr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),Ci.copy(this);const p=1/c,_=1/f,g=1/h;return Ci.elements[0]*=p,Ci.elements[1]*=p,Ci.elements[2]*=p,Ci.elements[4]*=_,Ci.elements[5]*=_,Ci.elements[6]*=_,Ci.elements[8]*=g,Ci.elements[9]*=g,Ci.elements[10]*=g,n.setFromRotationMatrix(Ci),s.x=c,s.y=f,s.z=h,this}makePerspective(t,n,s,l,c,f,h=Vi,m=!1){const p=this.elements,_=2*c/(n-t),g=2*c/(s-l),x=(n+t)/(n-t),M=(s+l)/(s-l);let b,A;if(m)b=c/(f-c),A=f*c/(f-c);else if(h===Vi)b=-(f+c)/(f-c),A=-2*f*c/(f-c);else if(h===ou)b=-f/(f-c),A=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=x,p[12]=0,p[1]=0,p[5]=g,p[9]=M,p[13]=0,p[2]=0,p[6]=0,p[10]=b,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,s,l,c,f,h=Vi,m=!1){const p=this.elements,_=2/(n-t),g=2/(s-l),x=-(n+t)/(n-t),M=-(s+l)/(s-l);let b,A;if(m)b=1/(f-c),A=f/(f-c);else if(h===Vi)b=-2/(f-c),A=-(f+c)/(f-c);else if(h===ou)b=-1/(f-c),A=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=0,p[12]=x,p[1]=0,p[5]=g,p[9]=0,p[13]=M,p[2]=0,p[6]=0,p[10]=b,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<16;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<16;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t[n+9]=s[9],t[n+10]=s[10],t[n+11]=s[11],t[n+12]=s[12],t[n+13]=s[13],t[n+14]=s[14],t[n+15]=s[15],t}}const Dr=new nt,Ci=new en,uM=new nt(0,0,0),fM=new nt(1,1,1),ts=new nt,Oc=new nt,ai=new nt,S_=new en,M_=new Hs;class Yi{constructor(t=0,n=0,s=0,l=Yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,s,l=this._order){return this._x=t,this._y=n,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],_=l[9],g=l[2],x=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(Me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(Me(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,M),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Me(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(Me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-Me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-_,M),this._y=0);break;default:pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,s){return S_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(S_,n,s)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return M_.setFromEuler(this),this.setFromQuaternion(M_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yi.DEFAULT_ORDER="XYZ";class Iv{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hM=0;const E_=new nt,Ur=new Hs,ga=new en,Pc=new nt,Qo=new nt,dM=new nt,pM=new Hs,b_=new nt(1,0,0),T_=new nt(0,1,0),A_=new nt(0,0,1),R_={type:"added"},mM={type:"removed"},Lr={type:"childadded",child:null},Ph={type:"childremoved",child:null};class Fn extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hM++}),this.uuid=Qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fn.DEFAULT_UP.clone();const t=new nt,n=new Yi,s=new Hs,l=new nt(1,1,1);function c(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new en},normalMatrix:{value:new de}}),this.matrix=new en,this.matrixWorld=new en,this.matrixAutoUpdate=Fn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Iv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Ur.setFromAxisAngle(t,n),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(t,n){return Ur.setFromAxisAngle(t,n),this.quaternion.premultiply(Ur),this}rotateX(t){return this.rotateOnAxis(b_,t)}rotateY(t){return this.rotateOnAxis(T_,t)}rotateZ(t){return this.rotateOnAxis(A_,t)}translateOnAxis(t,n){return E_.copy(t).applyQuaternion(this.quaternion),this.position.add(E_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(b_,t)}translateY(t){return this.translateOnAxis(T_,t)}translateZ(t){return this.translateOnAxis(A_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ga.copy(this.matrixWorld).invert())}lookAt(t,n,s){t.isVector3?Pc.copy(t):Pc.set(t,n,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ga.lookAt(Qo,Pc,this.up):ga.lookAt(Pc,Qo,this.up),this.quaternion.setFromRotationMatrix(ga),l&&(ga.extractRotation(l.matrixWorld),Ur.setFromRotationMatrix(ga),this.quaternion.premultiply(Ur.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ue("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(R_),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(mM),Ph.child=t,this.dispatchEvent(Ph),Ph.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ga.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ga.multiply(t.parent.matrixWorld)),t.applyMatrix4(ga),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(R_),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,s=[]){this[t]===n&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,t,dM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,pM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateMatrixWorld(t)}updateWorldMatrix(t,n){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",s={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const g=m[p];c(t.shapes,g)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(t.materials,this.material[m]));l.material=h}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(t.animations,m))}}if(n){const h=f(t.geometries),m=f(t.materials),p=f(t.textures),_=f(t.images),g=f(t.shapes),x=f(t.skeletons),M=f(t.animations),b=f(t.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),g.length>0&&(s.shapes=g),x.length>0&&(s.skeletons=x),M.length>0&&(s.animations=M),b.length>0&&(s.nodes=b)}return s.object=l,s;function f(h){const m=[];for(const p in h){const _=h[p];delete _.metadata,m.push(_)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Fn.DEFAULT_UP=new nt(0,1,0);Fn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wi=new nt,_a=new nt,Ih=new nt,va=new nt,Nr=new nt,Or=new nt,C_=new nt,zh=new nt,Fh=new nt,Bh=new nt,Hh=new sn,Gh=new sn,Vh=new sn;class Di{constructor(t=new nt,n=new nt,s=new nt){this.a=t,this.b=n,this.c=s}static getNormal(t,n,s,l){l.subVectors(s,n),wi.subVectors(t,n),l.cross(wi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,s,l,c){wi.subVectors(l,n),_a.subVectors(s,n),Ih.subVectors(t,n);const f=wi.dot(wi),h=wi.dot(_a),m=wi.dot(Ih),p=_a.dot(_a),_=_a.dot(Ih),g=f*p-h*h;if(g===0)return c.set(0,0,0),null;const x=1/g,M=(p*m-h*_)*x,b=(f*_-h*m)*x;return c.set(1-M-b,b,M)}static containsPoint(t,n,s,l){return this.getBarycoord(t,n,s,l,va)===null?!1:va.x>=0&&va.y>=0&&va.x+va.y<=1}static getInterpolation(t,n,s,l,c,f,h,m){return this.getBarycoord(t,n,s,l,va)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,va.x),m.addScaledVector(f,va.y),m.addScaledVector(h,va.z),m)}static getInterpolatedAttribute(t,n,s,l,c,f){return Hh.setScalar(0),Gh.setScalar(0),Vh.setScalar(0),Hh.fromBufferAttribute(t,n),Gh.fromBufferAttribute(t,s),Vh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Hh,c.x),f.addScaledVector(Gh,c.y),f.addScaledVector(Vh,c.z),f}static isFrontFacing(t,n,s,l){return wi.subVectors(s,n),_a.subVectors(t,n),wi.cross(_a).dot(l)<0}set(t,n,s){return this.a.copy(t),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(t,n,s,l){return this.a.copy(t[n]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,s,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wi.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),wi.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Di.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Di.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,s,l,c){return Di.getInterpolation(t,this.a,this.b,this.c,n,s,l,c)}containsPoint(t){return Di.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Di.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const s=this.a,l=this.b,c=this.c;let f,h;Nr.subVectors(l,s),Or.subVectors(c,s),zh.subVectors(t,s);const m=Nr.dot(zh),p=Or.dot(zh);if(m<=0&&p<=0)return n.copy(s);Fh.subVectors(t,l);const _=Nr.dot(Fh),g=Or.dot(Fh);if(_>=0&&g<=_)return n.copy(l);const x=m*g-_*p;if(x<=0&&m>=0&&_<=0)return f=m/(m-_),n.copy(s).addScaledVector(Nr,f);Bh.subVectors(t,c);const M=Nr.dot(Bh),b=Or.dot(Bh);if(b>=0&&M<=b)return n.copy(c);const A=M*p-m*b;if(A<=0&&p>=0&&b<=0)return h=p/(p-b),n.copy(s).addScaledVector(Or,h);const y=_*b-M*g;if(y<=0&&g-_>=0&&M-b>=0)return C_.subVectors(c,l),h=(g-_)/(g-_+(M-b)),n.copy(l).addScaledVector(C_,h);const v=1/(y+A+x);return f=A*v,h=x*v,n.copy(s).addScaledVector(Nr,f).addScaledVector(Or,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},es={h:0,s:0,l:0},Ic={h:0,s:0,l:0};function kh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class we{constructor(t,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,s)}set(t,n,s){if(n===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Le.colorSpaceToWorking(this,n),this}setRGB(t,n,s,l=Le.workingColorSpace){return this.r=t,this.g=n,this.b=s,Le.colorSpaceToWorking(this,l),this}setHSL(t,n,s,l=Le.workingColorSpace){if(t=eM(t,1),n=Me(n,0,1),s=Me(s,0,1),n===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+n):s+n-s*n,f=2*s-c;this.r=kh(f,c,t+1/3),this.g=kh(f,c,t),this.b=kh(f,c,t-1/3)}return Le.colorSpaceToWorking(this,l),this}setStyle(t,n=ri){function s(c){c!==void 0&&parseFloat(c)<1&&pe("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:pe("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);pe("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ri){const s=zv[t.toLowerCase()];return s!==void 0?this.setHex(s,n):pe("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ma(t.r),this.g=Ma(t.g),this.b=Ma(t.b),this}copyLinearToSRGB(t){return this.r=kr(t.r),this.g=kr(t.g),this.b=kr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return Le.workingToColorSpace(In.copy(this),t),Math.round(Me(In.r*255,0,255))*65536+Math.round(Me(In.g*255,0,255))*256+Math.round(Me(In.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Le.workingColorSpace){Le.workingToColorSpace(In.copy(this),n);const s=In.r,l=In.g,c=In.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const _=(h+f)/2;if(h===f)m=0,p=0;else{const g=f-h;switch(p=_<=.5?g/(f+h):g/(2-f-h),f){case s:m=(l-c)/g+(l<c?6:0);break;case l:m=(c-s)/g+2;break;case c:m=(s-l)/g+4;break}m/=6}return t.h=m,t.s=p,t.l=_,t}getRGB(t,n=Le.workingColorSpace){return Le.workingToColorSpace(In.copy(this),n),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=ri){Le.workingToColorSpace(In.copy(this),t);const n=In.r,s=In.g,l=In.b;return t!==ri?`color(${t} ${n.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,n,s){return this.getHSL(es),this.setHSL(es.h+t,es.s+n,es.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,s){return this.r=t.r+(n.r-t.r)*s,this.g=t.g+(n.g-t.g)*s,this.b=t.b+(n.b-t.b)*s,this}lerpHSL(t,n){this.getHSL(es),t.getHSL(Ic);const s=Th(es.h,Ic.h,n),l=Th(es.s,Ic.s,n),c=Th(es.l,Ic.l,n);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*s+c[6]*l,this.g=c[1]*n+c[4]*s+c[7]*l,this.b=c[2]*n+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new we;we.NAMES=zv;let gM=0;class ml extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gM++}),this.uuid=Qr(),this.name="",this.type="Material",this.blending=Vr,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sd,this.blendDst=rd,this.blendEquation=Os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=Wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=d_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tr,this.stencilZFail=Tr,this.stencilZPass=Tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const s=t[n];if(s===void 0){pe(`Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){pe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Vr&&(s.blending=this.blending),this.side!==ls&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==sd&&(s.blendSrc=this.blendSrc),this.blendDst!==rd&&(s.blendDst=this.blendDst),this.blendEquation!==Os&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Wr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==d_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Tr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Tr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Tr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let s=null;if(n!==null){const l=n.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=n[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Fv extends ml{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=gv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const dn=new nt,zc=new Ut;let _M=0;class Wi{constructor(t,n,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_M++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=s,this.usage=p_,this.updateRanges=[],this.gpuType=Gi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,s){t*=this.itemSize,s*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)zc.fromBufferAttribute(this,n),zc.applyMatrix3(t),this.setXY(n,zc.x,zc.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)dn.fromBufferAttribute(this,n),dn.applyMatrix3(t),this.setXYZ(n,dn.x,dn.y,dn.z);return this}applyMatrix4(t){for(let n=0,s=this.count;n<s;n++)dn.fromBufferAttribute(this,n),dn.applyMatrix4(t),this.setXYZ(n,dn.x,dn.y,dn.z);return this}applyNormalMatrix(t){for(let n=0,s=this.count;n<s;n++)dn.fromBufferAttribute(this,n),dn.applyNormalMatrix(t),this.setXYZ(n,dn.x,dn.y,dn.z);return this}transformDirection(t){for(let n=0,s=this.count;n<s;n++)dn.fromBufferAttribute(this,n),dn.transformDirection(t),this.setXYZ(n,dn.x,dn.y,dn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let s=this.array[t*this.itemSize+n];return this.normalized&&(s=jo(s,this.array)),s}setComponent(t,n,s){return this.normalized&&(s=jn(s,this.array)),this.array[t*this.itemSize+n]=s,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=jo(n,this.array)),n}setX(t,n){return this.normalized&&(n=jn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=jo(n,this.array)),n}setY(t,n){return this.normalized&&(n=jn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=jo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=jn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=jo(n,this.array)),n}setW(t,n){return this.normalized&&(n=jn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,s){return t*=this.itemSize,this.normalized&&(n=jn(n,this.array),s=jn(s,this.array)),this.array[t+0]=n,this.array[t+1]=s,this}setXYZ(t,n,s,l){return t*=this.itemSize,this.normalized&&(n=jn(n,this.array),s=jn(s,this.array),l=jn(l,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,n,s,l,c){return t*=this.itemSize,this.normalized&&(n=jn(n,this.array),s=jn(s,this.array),l=jn(l,this.array),c=jn(c,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==p_&&(t.usage=this.usage),t}}class Bv extends Wi{constructor(t,n,s){super(new Uint16Array(t),n,s)}}class Hv extends Wi{constructor(t,n,s){super(new Uint32Array(t),n,s)}}class Ln extends Wi{constructor(t,n,s){super(new Float32Array(t),n,s)}}let vM=0;const vi=new en,Xh=new Fn,Pr=new nt,si=new pl,Jo=new pl,yn=new nt;class yi extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vM++}),this.uuid=Qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nv(t)?Hv:Bv)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,s=0){this.groups.push({start:t,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new de().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,n,s){return vi.makeTranslation(t,n,s),this.applyMatrix4(vi),this}scale(t,n,s){return vi.makeScale(t,n,s),this.applyMatrix4(vi),this}lookAt(t){return Xh.lookAt(t),Xh.updateMatrix(),this.applyMatrix4(Xh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Ln(s,3))}else{const s=Math.min(t.length,n.count);for(let l=0;l<s;l++){const c=t[l];n.setXYZ(l,c.x,c.y,c.z||0)}t.length>n.count&&pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let s=0,l=n.length;s<l;s++){const c=n[s];si.setFromBufferAttribute(c),this.morphTargetsRelative?(yn.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(yn),yn.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(yn)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dp);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(t){const s=this.boundingSphere.center;if(si.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const h=n[c];Jo.setFromBufferAttribute(h),this.morphTargetsRelative?(yn.addVectors(si.min,Jo.min),si.expandByPoint(yn),yn.addVectors(si.max,Jo.max),si.expandByPoint(yn)):(si.expandByPoint(Jo.min),si.expandByPoint(Jo.max))}si.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)yn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(yn));if(n)for(let c=0,f=n.length;c<f;c++){const h=n[c],m=this.morphTargetsRelative;for(let p=0,_=h.count;p<_;p++)yn.fromBufferAttribute(h,p),m&&(Pr.fromBufferAttribute(t,p),yn.add(Pr)),l=Math.max(l,s.distanceToSquared(yn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wi(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let Z=0;Z<s.count;Z++)h[Z]=new nt,m[Z]=new nt;const p=new nt,_=new nt,g=new nt,x=new Ut,M=new Ut,b=new Ut,A=new nt,y=new nt;function v(Z,D,O){p.fromBufferAttribute(s,Z),_.fromBufferAttribute(s,D),g.fromBufferAttribute(s,O),x.fromBufferAttribute(c,Z),M.fromBufferAttribute(c,D),b.fromBufferAttribute(c,O),_.sub(p),g.sub(p),M.sub(x),b.sub(x);const q=1/(M.x*b.y-b.x*M.y);isFinite(q)&&(A.copy(_).multiplyScalar(b.y).addScaledVector(g,-M.y).multiplyScalar(q),y.copy(g).multiplyScalar(M.x).addScaledVector(_,-b.x).multiplyScalar(q),h[Z].add(A),h[D].add(A),h[O].add(A),m[Z].add(y),m[D].add(y),m[O].add(y))}let P=this.groups;P.length===0&&(P=[{start:0,count:t.count}]);for(let Z=0,D=P.length;Z<D;++Z){const O=P[Z],q=O.start,$=O.count;for(let ot=q,gt=q+$;ot<gt;ot+=3)v(t.getX(ot+0),t.getX(ot+1),t.getX(ot+2))}const w=new nt,N=new nt,F=new nt,H=new nt;function z(Z){F.fromBufferAttribute(l,Z),H.copy(F);const D=h[Z];w.copy(D),w.sub(F.multiplyScalar(F.dot(D))).normalize(),N.crossVectors(H,D);const q=N.dot(m[Z])<0?-1:1;f.setXYZW(Z,w.x,w.y,w.z,q)}for(let Z=0,D=P.length;Z<D;++Z){const O=P[Z],q=O.start,$=O.count;for(let ot=q,gt=q+$;ot<gt;ot+=3)z(t.getX(ot+0)),z(t.getX(ot+1)),z(t.getX(ot+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Wi(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let x=0,M=s.count;x<M;x++)s.setXYZ(x,0,0,0);const l=new nt,c=new nt,f=new nt,h=new nt,m=new nt,p=new nt,_=new nt,g=new nt;if(t)for(let x=0,M=t.count;x<M;x+=3){const b=t.getX(x+0),A=t.getX(x+1),y=t.getX(x+2);l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,A),f.fromBufferAttribute(n,y),_.subVectors(f,c),g.subVectors(l,c),_.cross(g),h.fromBufferAttribute(s,b),m.fromBufferAttribute(s,A),p.fromBufferAttribute(s,y),h.add(_),m.add(_),p.add(_),s.setXYZ(b,h.x,h.y,h.z),s.setXYZ(A,m.x,m.y,m.z),s.setXYZ(y,p.x,p.y,p.z)}else for(let x=0,M=n.count;x<M;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),_.subVectors(f,c),g.subVectors(l,c),_.cross(g),s.setXYZ(x+0,_.x,_.y,_.z),s.setXYZ(x+1,_.x,_.y,_.z),s.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,s=t.count;n<s;n++)yn.fromBufferAttribute(t,n),yn.normalize(),t.setXYZ(n,yn.x,yn.y,yn.z)}toNonIndexed(){function t(h,m){const p=h.array,_=h.itemSize,g=h.normalized,x=new p.constructor(m.length*_);let M=0,b=0;for(let A=0,y=m.length;A<y;A++){h.isInterleavedBufferAttribute?M=m[A]*h.data.stride+h.offset:M=m[A]*_;for(let v=0;v<_;v++)x[b++]=p[M++]}return new Wi(x,_,g)}if(this.index===null)return pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new yi,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=t(m,s);n.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let _=0,g=p.length;_<g;_++){const x=p[_],M=t(x,s);m.push(M)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let g=0,x=p.length;g<x;g++){const M=p[g];_.push(M.toJSON(t.data))}_.length>0&&(l[m]=_,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(n))}const c=t.morphAttributes;for(const p in c){const _=[],g=c[p];for(let x=0,M=g.length;x<M;x++)_.push(g[x].clone(n));this.morphAttributes[p]=_}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,_=f.length;p<_;p++){const g=f[p];this.addGroup(g.start,g.count,g.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const w_=new en,ws=new Pv,Fc=new dp,D_=new nt,Bc=new nt,Hc=new nt,Gc=new nt,Wh=new nt,Vc=new nt,U_=new nt,kc=new nt;class Li extends Fn{constructor(t=new yi,n=new Fv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(l,t);const h=this.morphTargetInfluences;if(c&&h){Vc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=h[m],g=c[m];_!==0&&(Wh.fromBufferAttribute(g,t),f?Vc.addScaledVector(Wh,_):Vc.addScaledVector(Wh.sub(n),_))}n.add(Vc)}return n}raycast(t,n){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Fc.copy(s.boundingSphere),Fc.applyMatrix4(c),ws.copy(t.ray).recast(t.near),!(Fc.containsPoint(ws.origin)===!1&&(ws.intersectSphere(Fc,D_)===null||ws.origin.distanceToSquared(D_)>(t.far-t.near)**2))&&(w_.copy(c).invert(),ws.copy(t.ray).applyMatrix4(w_),!(s.boundingBox!==null&&ws.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,n,ws)))}_computeIntersections(t,n,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,g=c.attributes.normal,x=c.groups,M=c.drawRange;if(h!==null)if(Array.isArray(f))for(let b=0,A=x.length;b<A;b++){const y=x[b],v=f[y.materialIndex],P=Math.max(y.start,M.start),w=Math.min(h.count,Math.min(y.start+y.count,M.start+M.count));for(let N=P,F=w;N<F;N+=3){const H=h.getX(N),z=h.getX(N+1),Z=h.getX(N+2);l=Xc(this,v,t,s,p,_,g,H,z,Z),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=y.materialIndex,n.push(l))}}else{const b=Math.max(0,M.start),A=Math.min(h.count,M.start+M.count);for(let y=b,v=A;y<v;y+=3){const P=h.getX(y),w=h.getX(y+1),N=h.getX(y+2);l=Xc(this,f,t,s,p,_,g,P,w,N),l&&(l.faceIndex=Math.floor(y/3),n.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let b=0,A=x.length;b<A;b++){const y=x[b],v=f[y.materialIndex],P=Math.max(y.start,M.start),w=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let N=P,F=w;N<F;N+=3){const H=N,z=N+1,Z=N+2;l=Xc(this,v,t,s,p,_,g,H,z,Z),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=y.materialIndex,n.push(l))}}else{const b=Math.max(0,M.start),A=Math.min(m.count,M.start+M.count);for(let y=b,v=A;y<v;y+=3){const P=y,w=y+1,N=y+2;l=Xc(this,f,t,s,p,_,g,P,w,N),l&&(l.faceIndex=Math.floor(y/3),n.push(l))}}}}function xM(r,t,n,s,l,c,f,h){let m;if(t.side===Kn?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,t.side===ls,h),m===null)return null;kc.copy(h),kc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(kc);return p<n.near||p>n.far?null:{distance:p,point:kc.clone(),object:r}}function Xc(r,t,n,s,l,c,f,h,m,p){r.getVertexPosition(h,Bc),r.getVertexPosition(m,Hc),r.getVertexPosition(p,Gc);const _=xM(r,t,n,s,Bc,Hc,Gc,U_);if(_){const g=new nt;Di.getBarycoord(U_,Bc,Hc,Gc,g),l&&(_.uv=Di.getInterpolatedAttribute(l,h,m,p,g,new Ut)),c&&(_.uv1=Di.getInterpolatedAttribute(c,h,m,p,g,new Ut)),f&&(_.normal=Di.getInterpolatedAttribute(f,h,m,p,g,new nt),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const x={a:h,b:m,c:p,normal:new nt,materialIndex:0};Di.getNormal(Bc,Hc,Gc,x.normal),_.face=x,_.barycoord=g}return _}class gl extends yi{constructor(t=1,n=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],_=[],g=[];let x=0,M=0;b("z","y","x",-1,-1,s,n,t,f,c,0),b("z","y","x",1,-1,s,n,-t,f,c,1),b("x","z","y",1,1,t,s,n,l,f,2),b("x","z","y",1,-1,t,s,-n,l,f,3),b("x","y","z",1,-1,t,n,s,l,c,4),b("x","y","z",-1,-1,t,n,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Ln(p,3)),this.setAttribute("normal",new Ln(_,3)),this.setAttribute("uv",new Ln(g,2));function b(A,y,v,P,w,N,F,H,z,Z,D){const O=N/z,q=F/Z,$=N/2,ot=F/2,gt=H/2,dt=z+1,V=Z+1;let k=0,W=0;const Rt=new nt;for(let bt=0;bt<V;bt++){const B=bt*q-ot;for(let ut=0;ut<dt;ut++){const At=ut*O-$;Rt[A]=At*P,Rt[y]=B*w,Rt[v]=gt,p.push(Rt.x,Rt.y,Rt.z),Rt[A]=0,Rt[y]=0,Rt[v]=H>0?1:-1,_.push(Rt.x,Rt.y,Rt.z),g.push(ut/z),g.push(1-bt/Z),k+=1}}for(let bt=0;bt<Z;bt++)for(let B=0;B<z;B++){const ut=x+B+dt*bt,At=x+B+dt*(bt+1),j=x+(B+1)+dt*(bt+1),X=x+(B+1)+dt*bt;m.push(ut,At,X),m.push(At,j,X),W+=6}h.addGroup(M,W,D),M+=W,x+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zr(r){const t={};for(const n in r){t[n]={};for(const s in r[n]){const l=r[n][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][s]=null):t[n][s]=l.clone():Array.isArray(l)?t[n][s]=l.slice():t[n][s]=l}}return t}function Hn(r){const t={};for(let n=0;n<r.length;n++){const s=Zr(r[n]);for(const l in s)t[l]=s[l]}return t}function yM(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function Gv(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Le.workingColorSpace}const SM={clone:Zr,merge:Hn};var MM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,EM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ji extends ml{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=MM,this.fragmentShader=EM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zr(t.uniforms),this.uniformsGroups=yM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class Vv extends Fn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new en,this.projectionMatrix=new en,this.projectionMatrixInverse=new en,this.coordinateSystem=Vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ns=new nt,L_=new Ut,N_=new Ut;class xi extends Vv{constructor(t=50,n=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Kd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(iu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Kd*2*Math.atan(Math.tan(iu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,s){ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ns.x,ns.y).multiplyScalar(-t/ns.z),ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ns.x,ns.y).multiplyScalar(-t/ns.z)}getViewSize(t,n){return this.getViewBounds(t,L_,N_),n.subVectors(N_,L_)}setViewOffset(t,n,s,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(iu*.5*this.fov)/this.zoom,s=2*n,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,n-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ir=-90,zr=1;class bM extends Fn{constructor(t,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new xi(Ir,zr,t,n);l.layers=this.layers,this.add(l);const c=new xi(Ir,zr,t,n);c.layers=this.layers,this.add(c);const f=new xi(Ir,zr,t,n);f.layers=this.layers,this.add(f);const h=new xi(Ir,zr,t,n);h.layers=this.layers,this.add(h);const m=new xi(Ir,zr,t,n);m.layers=this.layers,this.add(m);const p=new xi(Ir,zr,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[s,l,c,f,h,m]=n;for(const p of n)this.remove(p);if(t===Vi)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===ou)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,_]=this.children,g=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const A=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(n,c),t.setRenderTarget(s,1,l),t.render(n,f),t.setRenderTarget(s,2,l),t.render(n,h),t.setRenderTarget(s,3,l),t.render(n,m),t.setRenderTarget(s,4,l),t.render(n,p),s.texture.generateMipmaps=A,t.setRenderTarget(s,5,l),t.render(n,_),t.setRenderTarget(g,x,M),t.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class kv extends Gn{constructor(t=[],n=Bs,s,l,c,f,h,m,p,_){super(t,n,s,l,c,f,h,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xv extends Xi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new kv(l),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new gl(5,5,5),c=new ji({name:"CubemapFromEquirect",uniforms:Zr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Kn,blending:Sa});c.uniforms.tEquirect.value=n;const f=new Li(l,c),h=n.minFilter;return n.minFilter===Is&&(n.minFilter=zn),new bM(1,10,this).update(t,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(t,n=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,s,l);t.setRenderTarget(c)}}class Fs extends Fn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TM={type:"move"};class qh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const s of t.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const A of t.hand.values()){const y=n.getJointPose(A,s),v=this._getHandJoint(p,A);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const _=p.joints["index-finger-tip"],g=p.joints["thumb-tip"],x=_.position.distanceTo(g.position),M=.02,b=.005;p.inputState.pinching&&x>M+b?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=M-b&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));h!==null&&(l=n.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(TM)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const s=new Fs;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[n.jointName]=s,t.add(s)}return t.joints[n.jointName]}}class AM extends Fn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yi,this.environmentIntensity=1,this.environmentRotation=new Yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class RM extends Gn{constructor(t=null,n=1,s=1,l,c,f,h,m,p=Un,_=Un,g,x){super(null,f,h,m,p,_,l,c,g,x),this.isDataTexture=!0,this.image={data:t,width:n,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yh=new nt,CM=new nt,wM=new de;class is{constructor(t=new nt(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,s,l){return this.normal.set(t,n,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,s){const l=Yh.subVectors(s,n).cross(CM.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const s=t.delta(Yh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return n<0&&s>0||s<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const s=n||wM.getNormalMatrix(t),l=this.coplanarPoint(Yh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ds=new dp,DM=new Ut(.5,.5),Wc=new nt;class pp{constructor(t=new is,n=new is,s=new is,l=new is,c=new is,f=new is){this.planes=[t,n,s,l,c,f]}set(t,n,s,l,c,f){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(t){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,n=Vi,s=!1){const l=this.planes,c=t.elements,f=c[0],h=c[1],m=c[2],p=c[3],_=c[4],g=c[5],x=c[6],M=c[7],b=c[8],A=c[9],y=c[10],v=c[11],P=c[12],w=c[13],N=c[14],F=c[15];if(l[0].setComponents(p-f,M-_,v-b,F-P).normalize(),l[1].setComponents(p+f,M+_,v+b,F+P).normalize(),l[2].setComponents(p+h,M+g,v+A,F+w).normalize(),l[3].setComponents(p-h,M-g,v-A,F-w).normalize(),s)l[4].setComponents(m,x,y,N).normalize(),l[5].setComponents(p-m,M-x,v-y,F-N).normalize();else if(l[4].setComponents(p-m,M-x,v-y,F-N).normalize(),n===Vi)l[5].setComponents(p+m,M+x,v+y,F+N).normalize();else if(n===ou)l[5].setComponents(m,x,y,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ds)}intersectsSprite(t){Ds.center.set(0,0,0);const n=DM.distanceTo(t.center);return Ds.radius=.7071067811865476+n,Ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ds)}intersectsSphere(t){const n=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let s=0;s<6;s++){const l=n[s];if(Wc.x=l.normal.x>0?t.max.x:t.min.x,Wc.y=l.normal.y>0?t.max.y:t.min.y,Wc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Wc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ul extends Gn{constructor(t,n,s=qi,l,c,f,h=Un,m=Un,p,_=ba,g=1){if(_!==ba&&_!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:t,height:n,depth:g};super(x,l,c,f,h,m,_,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class UM extends ul{constructor(t,n=qi,s=Bs,l,c,f=Un,h=Un,m,p=ba){const _={width:t,height:t,depth:1},g=[_,_,_,_,_,_];super(t,t,n,s,l,c,f,h,m,p),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Wv extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Zi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){pe("Curve: .getPoint() not implemented.")}getPointAt(t,n){const s=this.getUtoTmapping(t);return this.getPoint(s,n)}getPoints(t=5){const n=[];for(let s=0;s<=t;s++)n.push(this.getPoint(s/t));return n}getSpacedPoints(t=5){const n=[];for(let s=0;s<=t;s++)n.push(this.getPointAt(s/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let s,l=this.getPoint(0),c=0;n.push(0);for(let f=1;f<=t;f++)s=this.getPoint(f/t),c+=s.distanceTo(l),n.push(c),l=s;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const s=this.getLengths();let l=0;const c=s.length;let f;n?f=n:f=t*s[c-1];let h=0,m=c-1,p;for(;h<=m;)if(l=Math.floor(h+(m-h)/2),p=s[l]-f,p<0)h=l+1;else if(p>0)m=l-1;else{m=l;break}if(l=m,s[l]===f)return l/(c-1);const _=s[l],x=s[l+1]-_,M=(f-_)/x;return(l+M)/(c-1)}getTangent(t,n){let l=t-1e-4,c=t+1e-4;l<0&&(l=0),c>1&&(c=1);const f=this.getPoint(l),h=this.getPoint(c),m=n||(f.isVector2?new Ut:new nt);return m.copy(h).sub(f).normalize(),m}getTangentAt(t,n){const s=this.getUtoTmapping(t);return this.getTangent(s,n)}computeFrenetFrames(t,n=!1){const s=new nt,l=[],c=[],f=[],h=new nt,m=new en;for(let M=0;M<=t;M++){const b=M/t;l[M]=this.getTangentAt(b,new nt)}c[0]=new nt,f[0]=new nt;let p=Number.MAX_VALUE;const _=Math.abs(l[0].x),g=Math.abs(l[0].y),x=Math.abs(l[0].z);_<=p&&(p=_,s.set(1,0,0)),g<=p&&(p=g,s.set(0,1,0)),x<=p&&s.set(0,0,1),h.crossVectors(l[0],s).normalize(),c[0].crossVectors(l[0],h),f[0].crossVectors(l[0],c[0]);for(let M=1;M<=t;M++){if(c[M]=c[M-1].clone(),f[M]=f[M-1].clone(),h.crossVectors(l[M-1],l[M]),h.length()>Number.EPSILON){h.normalize();const b=Math.acos(Me(l[M-1].dot(l[M]),-1,1));c[M].applyMatrix4(m.makeRotationAxis(h,b))}f[M].crossVectors(l[M],c[M])}if(n===!0){let M=Math.acos(Me(c[0].dot(c[t]),-1,1));M/=t,l[0].dot(h.crossVectors(c[0],c[t]))>0&&(M=-M);for(let b=1;b<=t;b++)c[b].applyMatrix4(m.makeRotationAxis(l[b],M*b)),f[b].crossVectors(l[b],c[b])}return{tangents:l,normals:c,binormals:f}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class mp extends Zi{constructor(t=0,n=0,s=1,l=1,c=0,f=Math.PI*2,h=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=s,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=f,this.aClockwise=h,this.aRotation=m}getPoint(t,n=new Ut){const s=n,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const f=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(f?c=0:c=l),this.aClockwise===!0&&!f&&(c===l?c=-l:c=c-l);const h=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(h),p=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const _=Math.cos(this.aRotation),g=Math.sin(this.aRotation),x=m-this.aX,M=p-this.aY;m=x*_-M*g+this.aX,p=x*g+M*_+this.aY}return s.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class LM extends mp{constructor(t,n,s,l,c,f){super(t,n,s,s,l,c,f),this.isArcCurve=!0,this.type="ArcCurve"}}function gp(){let r=0,t=0,n=0,s=0;function l(c,f,h,m){r=c,t=h,n=-3*c+3*f-2*h-m,s=2*c-2*f+h+m}return{initCatmullRom:function(c,f,h,m,p){l(f,h,p*(h-c),p*(m-f))},initNonuniformCatmullRom:function(c,f,h,m,p,_,g){let x=(f-c)/p-(h-c)/(p+_)+(h-f)/_,M=(h-f)/_-(m-f)/(_+g)+(m-h)/g;x*=_,M*=_,l(f,h,x,M)},calc:function(c){const f=c*c,h=f*c;return r+t*c+n*f+s*h}}}const qc=new nt,jh=new gp,Zh=new gp,Kh=new gp;class NM extends Zi{constructor(t=[],n=!1,s="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=s,this.tension=l}getPoint(t,n=new nt){const s=n,l=this.points,c=l.length,f=(c-(this.closed?0:1))*t;let h=Math.floor(f),m=f-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:m===0&&h===c-1&&(h=c-2,m=1);let p,_;this.closed||h>0?p=l[(h-1)%c]:(qc.subVectors(l[0],l[1]).add(l[0]),p=qc);const g=l[h%c],x=l[(h+1)%c];if(this.closed||h+2<c?_=l[(h+2)%c]:(qc.subVectors(l[c-1],l[c-2]).add(l[c-1]),_=qc),this.curveType==="centripetal"||this.curveType==="chordal"){const M=this.curveType==="chordal"?.5:.25;let b=Math.pow(p.distanceToSquared(g),M),A=Math.pow(g.distanceToSquared(x),M),y=Math.pow(x.distanceToSquared(_),M);A<1e-4&&(A=1),b<1e-4&&(b=A),y<1e-4&&(y=A),jh.initNonuniformCatmullRom(p.x,g.x,x.x,_.x,b,A,y),Zh.initNonuniformCatmullRom(p.y,g.y,x.y,_.y,b,A,y),Kh.initNonuniformCatmullRom(p.z,g.z,x.z,_.z,b,A,y)}else this.curveType==="catmullrom"&&(jh.initCatmullRom(p.x,g.x,x.x,_.x,this.tension),Zh.initCatmullRom(p.y,g.y,x.y,_.y,this.tension),Kh.initCatmullRom(p.z,g.z,x.z,_.z,this.tension));return s.set(jh.calc(m),Zh.calc(m),Kh.calc(m)),s}copy(t){super.copy(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(l.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,s=this.points.length;n<s;n++){const l=this.points[n];t.points.push(l.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(new nt().fromArray(l))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function O_(r,t,n,s,l){const c=(s-t)*.5,f=(l-n)*.5,h=r*r,m=r*h;return(2*n-2*s+c+f)*m+(-3*n+3*s-2*c-f)*h+c*r+n}function OM(r,t){const n=1-r;return n*n*t}function PM(r,t){return 2*(1-r)*r*t}function IM(r,t){return r*r*t}function al(r,t,n,s){return OM(r,t)+PM(r,n)+IM(r,s)}function zM(r,t){const n=1-r;return n*n*n*t}function FM(r,t){const n=1-r;return 3*n*n*r*t}function BM(r,t){return 3*(1-r)*r*r*t}function HM(r,t){return r*r*r*t}function sl(r,t,n,s,l){return zM(r,t)+FM(r,n)+BM(r,s)+HM(r,l)}class qv extends Zi{constructor(t=new Ut,n=new Ut,s=new Ut,l=new Ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=s,this.v3=l}getPoint(t,n=new Ut){const s=n,l=this.v0,c=this.v1,f=this.v2,h=this.v3;return s.set(sl(t,l.x,c.x,f.x,h.x),sl(t,l.y,c.y,f.y,h.y)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class GM extends Zi{constructor(t=new nt,n=new nt,s=new nt,l=new nt){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=s,this.v3=l}getPoint(t,n=new nt){const s=n,l=this.v0,c=this.v1,f=this.v2,h=this.v3;return s.set(sl(t,l.x,c.x,f.x,h.x),sl(t,l.y,c.y,f.y,h.y),sl(t,l.z,c.z,f.z,h.z)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yv extends Zi{constructor(t=new Ut,n=new Ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ut){const s=n;return t===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(t).add(this.v1)),s}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ut){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class VM extends Zi{constructor(t=new nt,n=new nt){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new nt){const s=n;return t===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(t).add(this.v1)),s}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new nt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jv extends Zi{constructor(t=new Ut,n=new Ut,s=new Ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=s}getPoint(t,n=new Ut){const s=n,l=this.v0,c=this.v1,f=this.v2;return s.set(al(t,l.x,c.x,f.x),al(t,l.y,c.y,f.y)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kM extends Zi{constructor(t=new nt,n=new nt,s=new nt){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=s}getPoint(t,n=new nt){const s=n,l=this.v0,c=this.v1,f=this.v2;return s.set(al(t,l.x,c.x,f.x),al(t,l.y,c.y,f.y),al(t,l.z,c.z,f.z)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zv extends Zi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ut){const s=n,l=this.points,c=(l.length-1)*t,f=Math.floor(c),h=c-f,m=l[f===0?f:f-1],p=l[f],_=l[f>l.length-2?l.length-1:f+1],g=l[f>l.length-3?l.length-1:f+2];return s.set(O_(h,m.x,p.x,_.x,g.x),O_(h,m.y,p.y,_.y,g.y)),s}copy(t){super.copy(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,s=this.points.length;n<s;n++){const l=this.points[n];t.points.push(l.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(new Ut().fromArray(l))}return this}}var Qd=Object.freeze({__proto__:null,ArcCurve:LM,CatmullRomCurve3:NM,CubicBezierCurve:qv,CubicBezierCurve3:GM,EllipseCurve:mp,LineCurve:Yv,LineCurve3:VM,QuadraticBezierCurve:jv,QuadraticBezierCurve3:kM,SplineCurve:Zv});class XM extends Zi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const s=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qd[s](n,t))}return this}getPoint(t,n){const s=t*this.getLength(),l=this.getCurveLengths();let c=0;for(;c<l.length;){if(l[c]>=s){const f=l[c]-s,h=this.curves[c],m=h.getLength(),p=m===0?0:1-f/m;return h.getPointAt(p,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let s=0,l=this.curves.length;s<l;s++)n+=this.curves[s].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let s=0;s<=t;s++)n.push(this.getPoint(s/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let s;for(let l=0,c=this.curves;l<c.length;l++){const f=c[l],h=f.isEllipseCurve?t*2:f.isLineCurve||f.isLineCurve3?1:f.isSplineCurve?t*f.points.length:t,m=f.getPoints(h);for(let p=0;p<m.length;p++){const _=m[p];s&&s.equals(_)||(n.push(_),s=_)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,s=t.curves.length;n<s;n++){const l=t.curves[n];this.curves.push(l.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,s=this.curves.length;n<s;n++){const l=this.curves[n];t.curves.push(l.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,s=t.curves.length;n<s;n++){const l=t.curves[n];this.curves.push(new Qd[l.type]().fromJSON(l))}return this}}class Xr extends XM{constructor(t){super(),this.type="Path",this.currentPoint=new Ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,s=t.length;n<s;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const s=new Yv(this.currentPoint.clone(),new Ut(t,n));return this.curves.push(s),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,s,l){const c=new jv(this.currentPoint.clone(),new Ut(t,n),new Ut(s,l));return this.curves.push(c),this.currentPoint.set(s,l),this}bezierCurveTo(t,n,s,l,c,f){const h=new qv(this.currentPoint.clone(),new Ut(t,n),new Ut(s,l),new Ut(c,f));return this.curves.push(h),this.currentPoint.set(c,f),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),s=new Zv(n);return this.curves.push(s),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,s,l,c,f){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+h,n+m,s,l,c,f),this}absarc(t,n,s,l,c,f){return this.absellipse(t,n,s,s,l,c,f),this}ellipse(t,n,s,l,c,f,h,m){const p=this.currentPoint.x,_=this.currentPoint.y;return this.absellipse(t+p,n+_,s,l,c,f,h,m),this}absellipse(t,n,s,l,c,f,h,m){const p=new mp(t,n,s,l,c,f,h,m);if(this.curves.length>0){const g=p.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(p);const _=p.getPoint(1);return this.currentPoint.copy(_),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class rl extends Xr{constructor(t){super(t),this.uuid=Qr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let s=0,l=this.holes.length;s<l;s++)n[s]=this.holes[s].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,s=t.holes.length;n<s;n++){const l=t.holes[n];this.holes.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,s=this.holes.length;n<s;n++){const l=this.holes[n];t.holes.push(l.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,s=t.holes.length;n<s;n++){const l=t.holes[n];this.holes.push(new Xr().fromJSON(l))}return this}}function WM(r,t,n=2){const s=t&&t.length,l=s?t[0]*n:r.length;let c=Kv(r,0,l,n,!0);const f=[];if(!c||c.next===c.prev)return f;let h,m,p;if(s&&(c=KM(r,t,c,n)),r.length>80*n){h=r[0],m=r[1];let _=h,g=m;for(let x=n;x<l;x+=n){const M=r[x],b=r[x+1];M<h&&(h=M),b<m&&(m=b),M>_&&(_=M),b>g&&(g=b)}p=Math.max(_-h,g-m),p=p!==0?32767/p:0}return fl(c,f,n,h,m,p,0),f}function Kv(r,t,n,s,l){let c;if(l===oE(r,t,n,s)>0)for(let f=t;f<n;f+=s)c=P_(f/s|0,r[f],r[f+1],c);else for(let f=n-s;f>=t;f-=s)c=P_(f/s|0,r[f],r[f+1],c);return c&&Kr(c,c.next)&&(dl(c),c=c.next),c}function Gs(r,t){if(!r)return r;t||(t=r);let n=r,s;do if(s=!1,!n.steiner&&(Kr(n,n.next)||tn(n.prev,n,n.next)===0)){if(dl(n),n=t=n.prev,n===n.next)break;s=!0}else n=n.next;while(s||n!==t);return t}function fl(r,t,n,s,l,c,f){if(!r)return;!f&&c&&eE(r,s,l,c);let h=r;for(;r.prev!==r.next;){const m=r.prev,p=r.next;if(c?YM(r,s,l,c):qM(r)){t.push(m.i,r.i,p.i),dl(r),r=p.next,h=p.next;continue}if(r=p,r===h){f?f===1?(r=jM(Gs(r),t),fl(r,t,n,s,l,c,2)):f===2&&ZM(r,t,n,s,l,c):fl(Gs(r),t,n,s,l,c,1);break}}}function qM(r){const t=r.prev,n=r,s=r.next;if(tn(t,n,s)>=0)return!1;const l=t.x,c=n.x,f=s.x,h=t.y,m=n.y,p=s.y,_=Math.min(l,c,f),g=Math.min(h,m,p),x=Math.max(l,c,f),M=Math.max(h,m,p);let b=s.next;for(;b!==t;){if(b.x>=_&&b.x<=x&&b.y>=g&&b.y<=M&&nl(l,h,c,m,f,p,b.x,b.y)&&tn(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function YM(r,t,n,s){const l=r.prev,c=r,f=r.next;if(tn(l,c,f)>=0)return!1;const h=l.x,m=c.x,p=f.x,_=l.y,g=c.y,x=f.y,M=Math.min(h,m,p),b=Math.min(_,g,x),A=Math.max(h,m,p),y=Math.max(_,g,x),v=Jd(M,b,t,n,s),P=Jd(A,y,t,n,s);let w=r.prevZ,N=r.nextZ;for(;w&&w.z>=v&&N&&N.z<=P;){if(w.x>=M&&w.x<=A&&w.y>=b&&w.y<=y&&w!==l&&w!==f&&nl(h,_,m,g,p,x,w.x,w.y)&&tn(w.prev,w,w.next)>=0||(w=w.prevZ,N.x>=M&&N.x<=A&&N.y>=b&&N.y<=y&&N!==l&&N!==f&&nl(h,_,m,g,p,x,N.x,N.y)&&tn(N.prev,N,N.next)>=0))return!1;N=N.nextZ}for(;w&&w.z>=v;){if(w.x>=M&&w.x<=A&&w.y>=b&&w.y<=y&&w!==l&&w!==f&&nl(h,_,m,g,p,x,w.x,w.y)&&tn(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;N&&N.z<=P;){if(N.x>=M&&N.x<=A&&N.y>=b&&N.y<=y&&N!==l&&N!==f&&nl(h,_,m,g,p,x,N.x,N.y)&&tn(N.prev,N,N.next)>=0)return!1;N=N.nextZ}return!0}function jM(r,t){let n=r;do{const s=n.prev,l=n.next.next;!Kr(s,l)&&Jv(s,n,n.next,l)&&hl(s,l)&&hl(l,s)&&(t.push(s.i,n.i,l.i),dl(n),dl(n.next),n=r=l),n=n.next}while(n!==r);return Gs(n)}function ZM(r,t,n,s,l,c){let f=r;do{let h=f.next.next;for(;h!==f.prev;){if(f.i!==h.i&&aE(f,h)){let m=$v(f,h);f=Gs(f,f.next),m=Gs(m,m.next),fl(f,t,n,s,l,c,0),fl(m,t,n,s,l,c,0);return}h=h.next}f=f.next}while(f!==r)}function KM(r,t,n,s){const l=[];for(let c=0,f=t.length;c<f;c++){const h=t[c]*s,m=c<f-1?t[c+1]*s:r.length,p=Kv(r,h,m,s,!1);p===p.next&&(p.steiner=!0),l.push(iE(p))}l.sort(QM);for(let c=0;c<l.length;c++)n=JM(l[c],n);return n}function QM(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const s=(r.next.y-r.y)/(r.next.x-r.x),l=(t.next.y-t.y)/(t.next.x-t.x);n=s-l}return n}function JM(r,t){const n=$M(r,t);if(!n)return t;const s=$v(n,r);return Gs(s,s.next),Gs(n,n.next)}function $M(r,t){let n=t;const s=r.x,l=r.y;let c=-1/0,f;if(Kr(r,n))return n;do{if(Kr(r,n.next))return n.next;if(l<=n.y&&l>=n.next.y&&n.next.y!==n.y){const g=n.x+(l-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(g<=s&&g>c&&(c=g,f=n.x<n.next.x?n:n.next,g===s))return f}n=n.next}while(n!==t);if(!f)return null;const h=f,m=f.x,p=f.y;let _=1/0;n=f;do{if(s>=n.x&&n.x>=m&&s!==n.x&&Qv(l<p?s:c,l,m,p,l<p?c:s,l,n.x,n.y)){const g=Math.abs(l-n.y)/(s-n.x);hl(n,r)&&(g<_||g===_&&(n.x>f.x||n.x===f.x&&tE(f,n)))&&(f=n,_=g)}n=n.next}while(n!==h);return f}function tE(r,t){return tn(r.prev,r,t.prev)<0&&tn(t.next,r,r.next)<0}function eE(r,t,n,s){let l=r;do l.z===0&&(l.z=Jd(l.x,l.y,t,n,s)),l.prevZ=l.prev,l.nextZ=l.next,l=l.next;while(l!==r);l.prevZ.nextZ=null,l.prevZ=null,nE(l)}function nE(r){let t,n=1;do{let s=r,l;r=null;let c=null;for(t=0;s;){t++;let f=s,h=0;for(let p=0;p<n&&(h++,f=f.nextZ,!!f);p++);let m=n;for(;h>0||m>0&&f;)h!==0&&(m===0||!f||s.z<=f.z)?(l=s,s=s.nextZ,h--):(l=f,f=f.nextZ,m--),c?c.nextZ=l:r=l,l.prevZ=c,c=l;s=f}c.nextZ=null,n*=2}while(t>1);return r}function Jd(r,t,n,s,l){return r=(r-n)*l|0,t=(t-s)*l|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function iE(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function Qv(r,t,n,s,l,c,f,h){return(l-f)*(t-h)>=(r-f)*(c-h)&&(r-f)*(s-h)>=(n-f)*(t-h)&&(n-f)*(c-h)>=(l-f)*(s-h)}function nl(r,t,n,s,l,c,f,h){return!(r===f&&t===h)&&Qv(r,t,n,s,l,c,f,h)}function aE(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!sE(r,t)&&(hl(r,t)&&hl(t,r)&&rE(r,t)&&(tn(r.prev,r,t.prev)||tn(r,t.prev,t))||Kr(r,t)&&tn(r.prev,r,r.next)>0&&tn(t.prev,t,t.next)>0)}function tn(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function Kr(r,t){return r.x===t.x&&r.y===t.y}function Jv(r,t,n,s){const l=jc(tn(r,t,n)),c=jc(tn(r,t,s)),f=jc(tn(n,s,r)),h=jc(tn(n,s,t));return!!(l!==c&&f!==h||l===0&&Yc(r,n,t)||c===0&&Yc(r,s,t)||f===0&&Yc(n,r,s)||h===0&&Yc(n,t,s))}function Yc(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function jc(r){return r>0?1:r<0?-1:0}function sE(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&Jv(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function hl(r,t){return tn(r.prev,r,r.next)<0?tn(r,t,r.next)>=0&&tn(r,r.prev,t)>=0:tn(r,t,r.prev)<0||tn(r,r.next,t)<0}function rE(r,t){let n=r,s=!1;const l=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&l<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(s=!s),n=n.next;while(n!==r);return s}function $v(r,t){const n=$d(r.i,r.x,r.y),s=$d(t.i,t.x,t.y),l=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=l,l.prev=n,s.next=n,n.prev=s,c.next=s,s.prev=c,s}function P_(r,t,n,s){const l=$d(r,t,n);return s?(l.next=s.next,l.prev=s,s.next.prev=l,s.next=l):(l.prev=l,l.next=l),l}function dl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function $d(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function oE(r,t,n,s){let l=0;for(let c=t,f=n-s;c<n;c+=s)l+=(r[f]-r[c])*(r[c+1]+r[f+1]),f=c;return l}class lE{static triangulate(t,n,s=2){return WM(t,n,s)}}class ss{static area(t){const n=t.length;let s=0;for(let l=n-1,c=0;c<n;l=c++)s+=t[l].x*t[c].y-t[c].x*t[l].y;return s*.5}static isClockWise(t){return ss.area(t)<0}static triangulateShape(t,n){const s=[],l=[],c=[];I_(t),z_(s,t);let f=t.length;n.forEach(I_);for(let m=0;m<n.length;m++)l.push(f),f+=n[m].length,z_(s,n[m]);const h=lE.triangulate(s,l);for(let m=0;m<h.length;m+=3)c.push(h.slice(m,m+3));return c}}function I_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function z_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class _p extends yi{constructor(t=new rl([new Ut(.5,.5),new Ut(-.5,.5),new Ut(-.5,-.5),new Ut(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const s=this,l=[],c=[];for(let h=0,m=t.length;h<m;h++){const p=t[h];f(p)}this.setAttribute("position",new Ln(l,3)),this.setAttribute("uv",new Ln(c,2)),this.computeVertexNormals();function f(h){const m=[],p=n.curveSegments!==void 0?n.curveSegments:12,_=n.steps!==void 0?n.steps:1,g=n.depth!==void 0?n.depth:1;let x=n.bevelEnabled!==void 0?n.bevelEnabled:!0,M=n.bevelThickness!==void 0?n.bevelThickness:.2,b=n.bevelSize!==void 0?n.bevelSize:M-.1,A=n.bevelOffset!==void 0?n.bevelOffset:0,y=n.bevelSegments!==void 0?n.bevelSegments:3;const v=n.extrudePath,P=n.UVGenerator!==void 0?n.UVGenerator:cE;let w,N=!1,F,H,z,Z;if(v){w=v.getSpacedPoints(_),N=!0,x=!1;const K=v.isCatmullRomCurve3?v.closed:!1;F=v.computeFrenetFrames(_,K),H=new nt,z=new nt,Z=new nt}x||(y=0,M=0,b=0,A=0);const D=h.extractPoints(p);let O=D.shape;const q=D.holes;if(!ss.isClockWise(O)){O=O.reverse();for(let K=0,st=q.length;K<st;K++){const ct=q[K];ss.isClockWise(ct)&&(q[K]=ct.reverse())}}function ot(K){const ct=10000000000000001e-36;let Mt=K[0];for(let T=1;T<=K.length;T++){const G=T%K.length,Et=K[G],Gt=Et.x-Mt.x,zt=Et.y-Mt.y,I=Gt*Gt+zt*zt,E=Math.max(Math.abs(Et.x),Math.abs(Et.y),Math.abs(Mt.x),Math.abs(Mt.y)),J=ct*E*E;if(I<=J){K.splice(G,1),T--;continue}Mt=Et}}ot(O),q.forEach(ot);const gt=q.length,dt=O;for(let K=0;K<gt;K++){const st=q[K];O=O.concat(st)}function V(K,st,ct){return st||Ue("ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(st,ct)}const k=O.length;function W(K,st,ct){let Mt,T,G;const Et=K.x-st.x,Gt=K.y-st.y,zt=ct.x-K.x,I=ct.y-K.y,E=Et*Et+Gt*Gt,J=Et*I-Gt*zt;if(Math.abs(J)>Number.EPSILON){const xt=Math.sqrt(E),Dt=Math.sqrt(zt*zt+I*I),yt=st.x-Gt/xt,te=st.y+Et/xt,Vt=ct.x-I/Dt,ee=ct.y+zt/Dt,le=((Vt-yt)*I-(ee-te)*zt)/(Et*I-Gt*zt);Mt=yt+Et*le-K.x,T=te+Gt*le-K.y;const Pt=Mt*Mt+T*T;if(Pt<=2)return new Ut(Mt,T);G=Math.sqrt(Pt/2)}else{let xt=!1;Et>Number.EPSILON?zt>Number.EPSILON&&(xt=!0):Et<-Number.EPSILON?zt<-Number.EPSILON&&(xt=!0):Math.sign(Gt)===Math.sign(I)&&(xt=!0),xt?(Mt=-Gt,T=Et,G=Math.sqrt(E)):(Mt=Et,T=Gt,G=Math.sqrt(E/2))}return new Ut(Mt/G,T/G)}const Rt=[];for(let K=0,st=dt.length,ct=st-1,Mt=K+1;K<st;K++,ct++,Mt++)ct===st&&(ct=0),Mt===st&&(Mt=0),Rt[K]=W(dt[K],dt[ct],dt[Mt]);const bt=[];let B,ut=Rt.concat();for(let K=0,st=gt;K<st;K++){const ct=q[K];B=[];for(let Mt=0,T=ct.length,G=T-1,Et=Mt+1;Mt<T;Mt++,G++,Et++)G===T&&(G=0),Et===T&&(Et=0),B[Mt]=W(ct[Mt],ct[G],ct[Et]);bt.push(B),ut=ut.concat(B)}let At;if(y===0)At=ss.triangulateShape(dt,q);else{const K=[],st=[];for(let ct=0;ct<y;ct++){const Mt=ct/y,T=M*Math.cos(Mt*Math.PI/2),G=b*Math.sin(Mt*Math.PI/2)+A;for(let Et=0,Gt=dt.length;Et<Gt;Et++){const zt=V(dt[Et],Rt[Et],G);_t(zt.x,zt.y,-T),Mt===0&&K.push(zt)}for(let Et=0,Gt=gt;Et<Gt;Et++){const zt=q[Et];B=bt[Et];const I=[];for(let E=0,J=zt.length;E<J;E++){const xt=V(zt[E],B[E],G);_t(xt.x,xt.y,-T),Mt===0&&I.push(xt)}Mt===0&&st.push(I)}}At=ss.triangulateShape(K,st)}const j=At.length,X=b+A;for(let K=0;K<k;K++){const st=x?V(O[K],ut[K],X):O[K];N?(z.copy(F.normals[0]).multiplyScalar(st.x),H.copy(F.binormals[0]).multiplyScalar(st.y),Z.copy(w[0]).add(z).add(H),_t(Z.x,Z.y,Z.z)):_t(st.x,st.y,0)}for(let K=1;K<=_;K++)for(let st=0;st<k;st++){const ct=x?V(O[st],ut[st],X):O[st];N?(z.copy(F.normals[K]).multiplyScalar(ct.x),H.copy(F.binormals[K]).multiplyScalar(ct.y),Z.copy(w[K]).add(z).add(H),_t(Z.x,Z.y,Z.z)):_t(ct.x,ct.y,g/_*K)}for(let K=y-1;K>=0;K--){const st=K/y,ct=M*Math.cos(st*Math.PI/2),Mt=b*Math.sin(st*Math.PI/2)+A;for(let T=0,G=dt.length;T<G;T++){const Et=V(dt[T],Rt[T],Mt);_t(Et.x,Et.y,g+ct)}for(let T=0,G=q.length;T<G;T++){const Et=q[T];B=bt[T];for(let Gt=0,zt=Et.length;Gt<zt;Gt++){const I=V(Et[Gt],B[Gt],Mt);N?_t(I.x,I.y+w[_-1].y,w[_-1].x+ct):_t(I.x,I.y,g+ct)}}}R(),C();function R(){const K=l.length/3;if(x){let st=0,ct=k*st;for(let Mt=0;Mt<j;Mt++){const T=At[Mt];et(T[2]+ct,T[1]+ct,T[0]+ct)}st=_+y*2,ct=k*st;for(let Mt=0;Mt<j;Mt++){const T=At[Mt];et(T[0]+ct,T[1]+ct,T[2]+ct)}}else{for(let st=0;st<j;st++){const ct=At[st];et(ct[2],ct[1],ct[0])}for(let st=0;st<j;st++){const ct=At[st];et(ct[0]+k*_,ct[1]+k*_,ct[2]+k*_)}}s.addGroup(K,l.length/3-K,0)}function C(){const K=l.length/3;let st=0;it(dt,st),st+=dt.length;for(let ct=0,Mt=q.length;ct<Mt;ct++){const T=q[ct];it(T,st),st+=T.length}s.addGroup(K,l.length/3-K,1)}function it(K,st){let ct=K.length;for(;--ct>=0;){const Mt=ct;let T=ct-1;T<0&&(T=K.length-1);for(let G=0,Et=_+y*2;G<Et;G++){const Gt=k*G,zt=k*(G+1),I=st+Mt+Gt,E=st+T+Gt,J=st+T+zt,xt=st+Mt+zt;Lt(I,E,J,xt)}}}function _t(K,st,ct){m.push(K),m.push(st),m.push(ct)}function et(K,st,ct){Ft(K),Ft(st),Ft(ct);const Mt=l.length/3,T=P.generateTopUV(s,l,Mt-3,Mt-2,Mt-1);Ot(T[0]),Ot(T[1]),Ot(T[2])}function Lt(K,st,ct,Mt){Ft(K),Ft(st),Ft(Mt),Ft(st),Ft(ct),Ft(Mt);const T=l.length/3,G=P.generateSideWallUV(s,l,T-6,T-3,T-2,T-1);Ot(G[0]),Ot(G[1]),Ot(G[3]),Ot(G[1]),Ot(G[2]),Ot(G[3])}function Ft(K){l.push(m[K*3+0]),l.push(m[K*3+1]),l.push(m[K*3+2])}function Ot(K){c.push(K.x),c.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes,s=this.parameters.options;return uE(n,s,t)}static fromJSON(t,n){const s=[];for(let c=0,f=t.shapes.length;c<f;c++){const h=n[t.shapes[c]];s.push(h)}const l=t.options.extrudePath;return l!==void 0&&(t.options.extrudePath=new Qd[l.type]().fromJSON(l)),new _p(s,t.options)}}const cE={generateTopUV:function(r,t,n,s,l){const c=t[n*3],f=t[n*3+1],h=t[s*3],m=t[s*3+1],p=t[l*3],_=t[l*3+1];return[new Ut(c,f),new Ut(h,m),new Ut(p,_)]},generateSideWallUV:function(r,t,n,s,l,c){const f=t[n*3],h=t[n*3+1],m=t[n*3+2],p=t[s*3],_=t[s*3+1],g=t[s*3+2],x=t[l*3],M=t[l*3+1],b=t[l*3+2],A=t[c*3],y=t[c*3+1],v=t[c*3+2];return Math.abs(h-_)<Math.abs(f-p)?[new Ut(f,1-m),new Ut(p,1-g),new Ut(x,1-b),new Ut(A,1-v)]:[new Ut(h,1-m),new Ut(_,1-g),new Ut(M,1-b),new Ut(y,1-v)]}};function uE(r,t,n){if(n.shapes=[],Array.isArray(r))for(let s=0,l=r.length;s<l;s++){const c=r[s];n.shapes.push(c.uuid)}else n.shapes.push(r.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class fu extends yi{constructor(t=1,n=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:s,heightSegments:l};const c=t/2,f=n/2,h=Math.floor(s),m=Math.floor(l),p=h+1,_=m+1,g=t/h,x=n/m,M=[],b=[],A=[],y=[];for(let v=0;v<_;v++){const P=v*x-f;for(let w=0;w<p;w++){const N=w*g-c;b.push(N,-P,0),A.push(0,0,1),y.push(w/h),y.push(1-v/m)}}for(let v=0;v<m;v++)for(let P=0;P<h;P++){const w=P+p*v,N=P+p*(v+1),F=P+1+p*(v+1),H=P+1+p*v;M.push(w,N,H),M.push(N,F,H)}this.setIndex(M),this.setAttribute("position",new Ln(b,3)),this.setAttribute("normal",new Ln(A,3)),this.setAttribute("uv",new Ln(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fu(t.width,t.height,t.widthSegments,t.heightSegments)}}class vp extends yi{constructor(t=1,n=.4,s=12,l=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:s,tubularSegments:l,arc:c},s=Math.floor(s),l=Math.floor(l);const f=[],h=[],m=[],p=[],_=new nt,g=new nt,x=new nt;for(let M=0;M<=s;M++)for(let b=0;b<=l;b++){const A=b/l*c,y=M/s*Math.PI*2;g.x=(t+n*Math.cos(y))*Math.cos(A),g.y=(t+n*Math.cos(y))*Math.sin(A),g.z=n*Math.sin(y),h.push(g.x,g.y,g.z),_.x=t*Math.cos(A),_.y=t*Math.sin(A),x.subVectors(g,_).normalize(),m.push(x.x,x.y,x.z),p.push(b/l),p.push(M/s)}for(let M=1;M<=s;M++)for(let b=1;b<=l;b++){const A=(l+1)*M+b-1,y=(l+1)*(M-1)+b-1,v=(l+1)*(M-1)+b,P=(l+1)*M+b;f.push(A,y,P),f.push(y,v,P)}this.setIndex(f),this.setAttribute("position",new Ln(h,3)),this.setAttribute("normal",new Ln(m,3)),this.setAttribute("uv",new Ln(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vp(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class fE extends ji{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class F_ extends ml{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lv,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hE extends ml{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=WS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dE extends ml{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const B_={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class pE{constructor(t,n,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=s,this._abortController=null,this.itemStart=function(_){h++,c===!1&&l.onStart!==void 0&&l.onStart(_,f,h),c=!0},this.itemEnd=function(_){f++,l.onProgress!==void 0&&l.onProgress(_,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(_){l.onError!==void 0&&l.onError(_)},this.resolveURL=function(_){return m?m(_):_},this.setURLModifier=function(_){return m=_,this},this.addHandler=function(_,g){return p.push(_,g),this},this.removeHandler=function(_){const g=p.indexOf(_);return g!==-1&&p.splice(g,2),this},this.getHandler=function(_){for(let g=0,x=p.length;g<x;g+=2){const M=p[g],b=p[g+1];if(M.global&&(M.lastIndex=0),M.test(_))return b}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const mE=new pE;class xp{constructor(t){this.manager=t!==void 0?t:mE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){const s=this;return new Promise(function(l,c){s.load(t,l,n,c)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}xp.DEFAULT_MATERIAL_NAME="__DEFAULT";const xa={};class gE extends Error{constructor(t,n){super(t),this.response=n}}class _E extends xp{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,n,s,l){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const c=B_.get(`file:${t}`);if(c!==void 0)return this.manager.itemStart(t),setTimeout(()=>{n&&n(c),this.manager.itemEnd(t)},0),c;if(xa[t]!==void 0){xa[t].push({onLoad:n,onProgress:s,onError:l});return}xa[t]=[],xa[t].push({onLoad:n,onProgress:s,onError:l});const f=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),h=this.mimeType,m=this.responseType;fetch(f).then(p=>{if(p.status===200||p.status===0){if(p.status===0&&pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||p.body===void 0||p.body.getReader===void 0)return p;const _=xa[t],g=p.body.getReader(),x=p.headers.get("X-File-Size")||p.headers.get("Content-Length"),M=x?parseInt(x):0,b=M!==0;let A=0;const y=new ReadableStream({start(v){P();function P(){g.read().then(({done:w,value:N})=>{if(w)v.close();else{A+=N.byteLength;const F=new ProgressEvent("progress",{lengthComputable:b,loaded:A,total:M});for(let H=0,z=_.length;H<z;H++){const Z=_[H];Z.onProgress&&Z.onProgress(F)}v.enqueue(N),P()}},w=>{v.error(w)})}}});return new Response(y)}else throw new gE(`fetch for "${p.url}" responded with ${p.status}: ${p.statusText}`,p)}).then(p=>{switch(m){case"arraybuffer":return p.arrayBuffer();case"blob":return p.blob();case"document":return p.text().then(_=>new DOMParser().parseFromString(_,h));case"json":return p.json();default:if(h==="")return p.text();{const g=/charset="?([^;"\s]*)"?/i.exec(h),x=g&&g[1]?g[1].toLowerCase():void 0,M=new TextDecoder(x);return p.arrayBuffer().then(b=>M.decode(b))}}}).then(p=>{B_.add(`file:${t}`,p);const _=xa[t];delete xa[t];for(let g=0,x=_.length;g<x;g++){const M=_[g];M.onLoad&&M.onLoad(p)}}).catch(p=>{const _=xa[t];if(_===void 0)throw this.manager.itemError(t),p;delete xa[t];for(let g=0,x=_.length;g<x;g++){const M=_[g];M.onError&&M.onError(p)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class tx extends Fn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new we(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Qh=new en,H_=new nt,G_=new nt;class vE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new en,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pp,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,s=this.matrix;H_.setFromMatrixPosition(t.matrixWorld),n.position.copy(H_),G_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(G_),n.updateMatrixWorld(),Qh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qh,n.coordinateSystem,n.reversedDepth),n.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Qh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class yp extends Vv{constructor(t=-1,n=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,h=l+n,m=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=_*this.view.offsetY,m=h-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class xE extends vE{constructor(){super(new yp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yE extends tx{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fn.DEFAULT_UP),this.updateMatrix(),this.target=new Fn,this.shadow=new xE}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class SE extends tx{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class ME extends xi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class V_{constructor(t=1,n=0,s=0){this.radius=t,this.phi=n,this.theta=s}set(t,n,s){return this.radius=t,this.phi=n,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,s){return this.radius=Math.sqrt(t*t+n*n+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(Me(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const k_=new Ut;class EE{constructor(t=new Ut(1/0,1/0),n=new Ut(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromPoints(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const s=k_.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,k_).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}class Us{constructor(){this.type="ShapePath",this.color=new we,this.subPaths=[],this.currentPath=null}moveTo(t,n){return this.currentPath=new Xr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,n),this}lineTo(t,n){return this.currentPath.lineTo(t,n),this}quadraticCurveTo(t,n,s,l){return this.currentPath.quadraticCurveTo(t,n,s,l),this}bezierCurveTo(t,n,s,l,c,f){return this.currentPath.bezierCurveTo(t,n,s,l,c,f),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function n(v){const P=[];for(let w=0,N=v.length;w<N;w++){const F=v[w],H=new rl;H.curves=F.curves,P.push(H)}return P}function s(v,P){const w=P.length;let N=!1;for(let F=w-1,H=0;H<w;F=H++){let z=P[F],Z=P[H],D=Z.x-z.x,O=Z.y-z.y;if(Math.abs(O)>Number.EPSILON){if(O<0&&(z=P[H],D=-D,Z=P[F],O=-O),v.y<z.y||v.y>Z.y)continue;if(v.y===z.y){if(v.x===z.x)return!0}else{const q=O*(v.x-z.x)-D*(v.y-z.y);if(q===0)return!0;if(q<0)continue;N=!N}}else{if(v.y!==z.y)continue;if(Z.x<=v.x&&v.x<=z.x||z.x<=v.x&&v.x<=Z.x)return!0}}return N}const l=ss.isClockWise,c=this.subPaths;if(c.length===0)return[];let f,h,m;const p=[];if(c.length===1)return h=c[0],m=new rl,m.curves=h.curves,p.push(m),p;let _=!l(c[0].getPoints());_=t?!_:_;const g=[],x=[];let M=[],b=0,A;x[b]=void 0,M[b]=[];for(let v=0,P=c.length;v<P;v++)h=c[v],A=h.getPoints(),f=l(A),f=t?!f:f,f?(!_&&x[b]&&b++,x[b]={s:new rl,p:A},x[b].s.curves=h.curves,_&&b++,M[b]=[]):M[b].push({h,p:A[0]});if(!x[0])return n(c);if(x.length>1){let v=!1,P=0;for(let w=0,N=x.length;w<N;w++)g[w]=[];for(let w=0,N=x.length;w<N;w++){const F=M[w];for(let H=0;H<F.length;H++){const z=F[H];let Z=!0;for(let D=0;D<x.length;D++)s(z.p,x[D].p)&&(w!==D&&P++,Z?(Z=!1,g[D].push(z)):v=!0);Z&&g[w].push(z)}}P>0&&v===!1&&(M=g)}let y;for(let v=0,P=x.length;v<P;v++){m=x[v].s,p.push(m),y=M[v];for(let w=0,N=y.length;w<N;w++)m.holes.push(y[w].h)}return p}}class bE extends Vs{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){pe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function X_(r,t,n,s){const l=TE(s);switch(n){case wv:return r*t;case Uv:return r*t/l.components*l.byteLength;case op:return r*t/l.components*l.byteLength;case Yr:return r*t*2/l.components*l.byteLength;case lp:return r*t*2/l.components*l.byteLength;case Dv:return r*t*3/l.components*l.byteLength;case Ui:return r*t*4/l.components*l.byteLength;case cp:return r*t*4/l.components*l.byteLength;case $c:case tu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case eu:case nu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case xd:case Sd:return Math.max(r,16)*Math.max(t,8)/4;case vd:case yd:return Math.max(r,8)*Math.max(t,8)/2;case Md:case Ed:case Td:case Ad:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case bd:case Rd:case Cd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case wd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Dd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ld:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Nd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Od:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Pd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Bd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Hd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Gd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Vd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case kd:case Xd:case Wd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case qd:case Yd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case jd:case Zd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function TE(r){switch(r){case oi:case Tv:return{byteLength:1,components:1};case ol:case Av:case Ea:return{byteLength:2,components:1};case sp:case rp:return{byteLength:2,components:4};case qi:case ap:case Gi:return{byteLength:4,components:1};case Rv:case Cv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ip}}));typeof window<"u"&&(window.__THREE__?pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ip);function ex(){let r=null,t=!1,n=null,s=null;function l(c,f){n(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function AE(r){const t=new WeakMap;function n(h,m){const p=h.array,_=h.usage,g=p.byteLength,x=r.createBuffer();r.bindBuffer(m,x),r.bufferData(m,p,_),h.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)M=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:g}}function s(h,m,p){const _=m.array,g=m.updateRanges;if(r.bindBuffer(p,h),g.length===0)r.bufferSubData(p,0,_);else{g.sort((M,b)=>M.start-b.start);let x=0;for(let M=1;M<g.length;M++){const b=g[x],A=g[M];A.start<=b.start+b.count+1?b.count=Math.max(b.count,A.start+A.count-b.start):(++x,g[x]=A)}g.length=x+1;for(let M=0,b=g.length;M<b;M++){const A=g[M];r.bufferSubData(p,A.start*_.BYTES_PER_ELEMENT,_,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=t.get(h);m&&(r.deleteBuffer(m.buffer),t.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=t.get(h);(!_||_.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=t.get(h);if(p===void 0)t.set(h,n(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var RE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,CE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,DE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,UE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,LE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,NE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,OE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,PE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,IE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,BE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,HE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,GE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,VE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,XE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,WE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,YE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ZE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,KE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,QE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,JE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$E=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ib="gl_FragColor = linearToOutputTexel( gl_FragColor );",ab=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ob=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ub=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,db=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_b=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ab=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Db=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ub=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ob=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ib=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$b=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,t1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,n1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,s1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,r1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,l1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,c1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,u1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,f1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,h1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,d1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,p1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,m1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,g1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,v1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,x1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,y1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,S1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,M1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,b1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,T1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const A1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,R1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,N1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,O1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,P1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,I1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,z1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,G1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,W1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Y1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,j1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Q1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,aT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Se={alphahash_fragment:RE,alphahash_pars_fragment:CE,alphamap_fragment:wE,alphamap_pars_fragment:DE,alphatest_fragment:UE,alphatest_pars_fragment:LE,aomap_fragment:NE,aomap_pars_fragment:OE,batching_pars_vertex:PE,batching_vertex:IE,begin_vertex:zE,beginnormal_vertex:FE,bsdfs:BE,iridescence_fragment:HE,bumpmap_pars_fragment:GE,clipping_planes_fragment:VE,clipping_planes_pars_fragment:kE,clipping_planes_pars_vertex:XE,clipping_planes_vertex:WE,color_fragment:qE,color_pars_fragment:YE,color_pars_vertex:jE,color_vertex:ZE,common:KE,cube_uv_reflection_fragment:QE,defaultnormal_vertex:JE,displacementmap_pars_vertex:$E,displacementmap_vertex:tb,emissivemap_fragment:eb,emissivemap_pars_fragment:nb,colorspace_fragment:ib,colorspace_pars_fragment:ab,envmap_fragment:sb,envmap_common_pars_fragment:rb,envmap_pars_fragment:ob,envmap_pars_vertex:lb,envmap_physical_pars_fragment:xb,envmap_vertex:cb,fog_vertex:ub,fog_pars_vertex:fb,fog_fragment:hb,fog_pars_fragment:db,gradientmap_pars_fragment:pb,lightmap_pars_fragment:mb,lights_lambert_fragment:gb,lights_lambert_pars_fragment:_b,lights_pars_begin:vb,lights_toon_fragment:yb,lights_toon_pars_fragment:Sb,lights_phong_fragment:Mb,lights_phong_pars_fragment:Eb,lights_physical_fragment:bb,lights_physical_pars_fragment:Tb,lights_fragment_begin:Ab,lights_fragment_maps:Rb,lights_fragment_end:Cb,logdepthbuf_fragment:wb,logdepthbuf_pars_fragment:Db,logdepthbuf_pars_vertex:Ub,logdepthbuf_vertex:Lb,map_fragment:Nb,map_pars_fragment:Ob,map_particle_fragment:Pb,map_particle_pars_fragment:Ib,metalnessmap_fragment:zb,metalnessmap_pars_fragment:Fb,morphinstance_vertex:Bb,morphcolor_vertex:Hb,morphnormal_vertex:Gb,morphtarget_pars_vertex:Vb,morphtarget_vertex:kb,normal_fragment_begin:Xb,normal_fragment_maps:Wb,normal_pars_fragment:qb,normal_pars_vertex:Yb,normal_vertex:jb,normalmap_pars_fragment:Zb,clearcoat_normal_fragment_begin:Kb,clearcoat_normal_fragment_maps:Qb,clearcoat_pars_fragment:Jb,iridescence_pars_fragment:$b,opaque_fragment:t1,packing:e1,premultiplied_alpha_fragment:n1,project_vertex:i1,dithering_fragment:a1,dithering_pars_fragment:s1,roughnessmap_fragment:r1,roughnessmap_pars_fragment:o1,shadowmap_pars_fragment:l1,shadowmap_pars_vertex:c1,shadowmap_vertex:u1,shadowmask_pars_fragment:f1,skinbase_vertex:h1,skinning_pars_vertex:d1,skinning_vertex:p1,skinnormal_vertex:m1,specularmap_fragment:g1,specularmap_pars_fragment:_1,tonemapping_fragment:v1,tonemapping_pars_fragment:x1,transmission_fragment:y1,transmission_pars_fragment:S1,uv_pars_fragment:M1,uv_pars_vertex:E1,uv_vertex:b1,worldpos_vertex:T1,background_vert:A1,background_frag:R1,backgroundCube_vert:C1,backgroundCube_frag:w1,cube_vert:D1,cube_frag:U1,depth_vert:L1,depth_frag:N1,distance_vert:O1,distance_frag:P1,equirect_vert:I1,equirect_frag:z1,linedashed_vert:F1,linedashed_frag:B1,meshbasic_vert:H1,meshbasic_frag:G1,meshlambert_vert:V1,meshlambert_frag:k1,meshmatcap_vert:X1,meshmatcap_frag:W1,meshnormal_vert:q1,meshnormal_frag:Y1,meshphong_vert:j1,meshphong_frag:Z1,meshphysical_vert:K1,meshphysical_frag:Q1,meshtoon_vert:J1,meshtoon_frag:$1,points_vert:tT,points_frag:eT,shadow_vert:nT,shadow_frag:iT,sprite_vert:aT,sprite_frag:sT},jt={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new de}},envmap:{envMap:{value:null},envMapRotation:{value:new de},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new de}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new de}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new de},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new de},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new de},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new de}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new de}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new de}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0},uvTransform:{value:new de}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}}},Bi={basic:{uniforms:Hn([jt.common,jt.specularmap,jt.envmap,jt.aomap,jt.lightmap,jt.fog]),vertexShader:Se.meshbasic_vert,fragmentShader:Se.meshbasic_frag},lambert:{uniforms:Hn([jt.common,jt.specularmap,jt.envmap,jt.aomap,jt.lightmap,jt.emissivemap,jt.bumpmap,jt.normalmap,jt.displacementmap,jt.fog,jt.lights,{emissive:{value:new we(0)}}]),vertexShader:Se.meshlambert_vert,fragmentShader:Se.meshlambert_frag},phong:{uniforms:Hn([jt.common,jt.specularmap,jt.envmap,jt.aomap,jt.lightmap,jt.emissivemap,jt.bumpmap,jt.normalmap,jt.displacementmap,jt.fog,jt.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:Se.meshphong_vert,fragmentShader:Se.meshphong_frag},standard:{uniforms:Hn([jt.common,jt.envmap,jt.aomap,jt.lightmap,jt.emissivemap,jt.bumpmap,jt.normalmap,jt.displacementmap,jt.roughnessmap,jt.metalnessmap,jt.fog,jt.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Se.meshphysical_vert,fragmentShader:Se.meshphysical_frag},toon:{uniforms:Hn([jt.common,jt.aomap,jt.lightmap,jt.emissivemap,jt.bumpmap,jt.normalmap,jt.displacementmap,jt.gradientmap,jt.fog,jt.lights,{emissive:{value:new we(0)}}]),vertexShader:Se.meshtoon_vert,fragmentShader:Se.meshtoon_frag},matcap:{uniforms:Hn([jt.common,jt.bumpmap,jt.normalmap,jt.displacementmap,jt.fog,{matcap:{value:null}}]),vertexShader:Se.meshmatcap_vert,fragmentShader:Se.meshmatcap_frag},points:{uniforms:Hn([jt.points,jt.fog]),vertexShader:Se.points_vert,fragmentShader:Se.points_frag},dashed:{uniforms:Hn([jt.common,jt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Se.linedashed_vert,fragmentShader:Se.linedashed_frag},depth:{uniforms:Hn([jt.common,jt.displacementmap]),vertexShader:Se.depth_vert,fragmentShader:Se.depth_frag},normal:{uniforms:Hn([jt.common,jt.bumpmap,jt.normalmap,jt.displacementmap,{opacity:{value:1}}]),vertexShader:Se.meshnormal_vert,fragmentShader:Se.meshnormal_frag},sprite:{uniforms:Hn([jt.sprite,jt.fog]),vertexShader:Se.sprite_vert,fragmentShader:Se.sprite_frag},background:{uniforms:{uvTransform:{value:new de},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Se.background_vert,fragmentShader:Se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new de}},vertexShader:Se.backgroundCube_vert,fragmentShader:Se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Se.cube_vert,fragmentShader:Se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Se.equirect_vert,fragmentShader:Se.equirect_frag},distance:{uniforms:Hn([jt.common,jt.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Se.distance_vert,fragmentShader:Se.distance_frag},shadow:{uniforms:Hn([jt.lights,jt.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Se.shadow_vert,fragmentShader:Se.shadow_frag}};Bi.physical={uniforms:Hn([Bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new de},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new de},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new de},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new de},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new de},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new de},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new de},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new de},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new de},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new de},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new de},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new de}}]),vertexShader:Se.meshphysical_vert,fragmentShader:Se.meshphysical_frag};const Zc={r:0,b:0,g:0},Ls=new Yi,rT=new en;function oT(r,t,n,s,l,c,f){const h=new we(0);let m=c===!0?0:1,p,_,g=null,x=0,M=null;function b(w){let N=w.isScene===!0?w.background:null;return N&&N.isTexture&&(N=(w.backgroundBlurriness>0?n:t).get(N)),N}function A(w){let N=!1;const F=b(w);F===null?v(h,m):F&&F.isColor&&(v(F,1),N=!0);const H=r.xr.getEnvironmentBlendMode();H==="additive"?s.buffers.color.setClear(0,0,0,1,f):H==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||N)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(w,N){const F=b(N);F&&(F.isCubeTexture||F.mapping===uu)?(_===void 0&&(_=new Li(new gl(1,1,1),new ji({name:"BackgroundCubeMaterial",uniforms:Zr(Bi.backgroundCube.uniforms),vertexShader:Bi.backgroundCube.vertexShader,fragmentShader:Bi.backgroundCube.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(H,z,Z){this.matrixWorld.copyPosition(Z.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(_)),Ls.copy(N.backgroundRotation),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,F.isCubeTexture&&F.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),_.material.uniforms.envMap.value=F,_.material.uniforms.flipEnvMap.value=F.isCubeTexture&&F.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(rT.makeRotationFromEuler(Ls)),_.material.toneMapped=Le.getTransfer(F.colorSpace)!==ke,(g!==F||x!==F.version||M!==r.toneMapping)&&(_.material.needsUpdate=!0,g=F,x=F.version,M=r.toneMapping),_.layers.enableAll(),w.unshift(_,_.geometry,_.material,0,0,null)):F&&F.isTexture&&(p===void 0&&(p=new Li(new fu(2,2),new ji({name:"BackgroundMaterial",uniforms:Zr(Bi.background.uniforms),vertexShader:Bi.background.vertexShader,fragmentShader:Bi.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=F,p.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,p.material.toneMapped=Le.getTransfer(F.colorSpace)!==ke,F.matrixAutoUpdate===!0&&F.updateMatrix(),p.material.uniforms.uvTransform.value.copy(F.matrix),(g!==F||x!==F.version||M!==r.toneMapping)&&(p.material.needsUpdate=!0,g=F,x=F.version,M=r.toneMapping),p.layers.enableAll(),w.unshift(p,p.geometry,p.material,0,0,null))}function v(w,N){w.getRGB(Zc,Gv(r)),s.buffers.color.setClear(Zc.r,Zc.g,Zc.b,N,f)}function P(){_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return h},setClearColor:function(w,N=1){h.set(w),m=N,v(h,m)},getClearAlpha:function(){return m},setClearAlpha:function(w){m=w,v(h,m)},render:A,addToRenderList:y,dispose:P}}function lT(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,f=!1;function h(O,q,$,ot,gt){let dt=!1;const V=g(ot,$,q);c!==V&&(c=V,p(c.object)),dt=M(O,ot,$,gt),dt&&b(O,ot,$,gt),gt!==null&&t.update(gt,r.ELEMENT_ARRAY_BUFFER),(dt||f)&&(f=!1,N(O,q,$,ot),gt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(gt).buffer))}function m(){return r.createVertexArray()}function p(O){return r.bindVertexArray(O)}function _(O){return r.deleteVertexArray(O)}function g(O,q,$){const ot=$.wireframe===!0;let gt=s[O.id];gt===void 0&&(gt={},s[O.id]=gt);let dt=gt[q.id];dt===void 0&&(dt={},gt[q.id]=dt);let V=dt[ot];return V===void 0&&(V=x(m()),dt[ot]=V),V}function x(O){const q=[],$=[],ot=[];for(let gt=0;gt<n;gt++)q[gt]=0,$[gt]=0,ot[gt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:$,attributeDivisors:ot,object:O,attributes:{},index:null}}function M(O,q,$,ot){const gt=c.attributes,dt=q.attributes;let V=0;const k=$.getAttributes();for(const W in k)if(k[W].location>=0){const bt=gt[W];let B=dt[W];if(B===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(B=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(B=O.instanceColor)),bt===void 0||bt.attribute!==B||B&&bt.data!==B.data)return!0;V++}return c.attributesNum!==V||c.index!==ot}function b(O,q,$,ot){const gt={},dt=q.attributes;let V=0;const k=$.getAttributes();for(const W in k)if(k[W].location>=0){let bt=dt[W];bt===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(bt=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(bt=O.instanceColor));const B={};B.attribute=bt,bt&&bt.data&&(B.data=bt.data),gt[W]=B,V++}c.attributes=gt,c.attributesNum=V,c.index=ot}function A(){const O=c.newAttributes;for(let q=0,$=O.length;q<$;q++)O[q]=0}function y(O){v(O,0)}function v(O,q){const $=c.newAttributes,ot=c.enabledAttributes,gt=c.attributeDivisors;$[O]=1,ot[O]===0&&(r.enableVertexAttribArray(O),ot[O]=1),gt[O]!==q&&(r.vertexAttribDivisor(O,q),gt[O]=q)}function P(){const O=c.newAttributes,q=c.enabledAttributes;for(let $=0,ot=q.length;$<ot;$++)q[$]!==O[$]&&(r.disableVertexAttribArray($),q[$]=0)}function w(O,q,$,ot,gt,dt,V){V===!0?r.vertexAttribIPointer(O,q,$,gt,dt):r.vertexAttribPointer(O,q,$,ot,gt,dt)}function N(O,q,$,ot){A();const gt=ot.attributes,dt=$.getAttributes(),V=q.defaultAttributeValues;for(const k in dt){const W=dt[k];if(W.location>=0){let Rt=gt[k];if(Rt===void 0&&(k==="instanceMatrix"&&O.instanceMatrix&&(Rt=O.instanceMatrix),k==="instanceColor"&&O.instanceColor&&(Rt=O.instanceColor)),Rt!==void 0){const bt=Rt.normalized,B=Rt.itemSize,ut=t.get(Rt);if(ut===void 0)continue;const At=ut.buffer,j=ut.type,X=ut.bytesPerElement,R=j===r.INT||j===r.UNSIGNED_INT||Rt.gpuType===ap;if(Rt.isInterleavedBufferAttribute){const C=Rt.data,it=C.stride,_t=Rt.offset;if(C.isInstancedInterleavedBuffer){for(let et=0;et<W.locationSize;et++)v(W.location+et,C.meshPerAttribute);O.isInstancedMesh!==!0&&ot._maxInstanceCount===void 0&&(ot._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let et=0;et<W.locationSize;et++)y(W.location+et);r.bindBuffer(r.ARRAY_BUFFER,At);for(let et=0;et<W.locationSize;et++)w(W.location+et,B/W.locationSize,j,bt,it*X,(_t+B/W.locationSize*et)*X,R)}else{if(Rt.isInstancedBufferAttribute){for(let C=0;C<W.locationSize;C++)v(W.location+C,Rt.meshPerAttribute);O.isInstancedMesh!==!0&&ot._maxInstanceCount===void 0&&(ot._maxInstanceCount=Rt.meshPerAttribute*Rt.count)}else for(let C=0;C<W.locationSize;C++)y(W.location+C);r.bindBuffer(r.ARRAY_BUFFER,At);for(let C=0;C<W.locationSize;C++)w(W.location+C,B/W.locationSize,j,bt,B*X,B/W.locationSize*C*X,R)}}else if(V!==void 0){const bt=V[k];if(bt!==void 0)switch(bt.length){case 2:r.vertexAttrib2fv(W.location,bt);break;case 3:r.vertexAttrib3fv(W.location,bt);break;case 4:r.vertexAttrib4fv(W.location,bt);break;default:r.vertexAttrib1fv(W.location,bt)}}}}P()}function F(){Z();for(const O in s){const q=s[O];for(const $ in q){const ot=q[$];for(const gt in ot)_(ot[gt].object),delete ot[gt];delete q[$]}delete s[O]}}function H(O){if(s[O.id]===void 0)return;const q=s[O.id];for(const $ in q){const ot=q[$];for(const gt in ot)_(ot[gt].object),delete ot[gt];delete q[$]}delete s[O.id]}function z(O){for(const q in s){const $=s[q];if($[O.id]===void 0)continue;const ot=$[O.id];for(const gt in ot)_(ot[gt].object),delete ot[gt];delete $[O.id]}}function Z(){D(),f=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:Z,resetDefaultState:D,dispose:F,releaseStatesOfGeometry:H,releaseStatesOfProgram:z,initAttributes:A,enableAttribute:y,disableUnusedAttributes:P}}function cT(r,t,n){let s;function l(p){s=p}function c(p,_){r.drawArrays(s,p,_),n.update(_,s,1)}function f(p,_,g){g!==0&&(r.drawArraysInstanced(s,p,_,g),n.update(_,s,g))}function h(p,_,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,_,0,g);let M=0;for(let b=0;b<g;b++)M+=_[b];n.update(M,s,1)}function m(p,_,g,x){if(g===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<p.length;b++)f(p[b],_[b],x[b]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,_,0,x,0,g);let b=0;for(let A=0;A<g;A++)b+=_[A]*x[A];n.update(b,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=m}function uT(r,t,n,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const z=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(z){return!(z!==Ui&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(z){const Z=z===Ea&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(z!==oi&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Gi&&!Z)}function m(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const _=m(p);_!==p&&(pe("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const g=n.logarithmicDepthBuffer===!0,x=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),P=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),w=r.getParameter(r.MAX_VARYING_VECTORS),N=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),F=r.getParameter(r.MAX_SAMPLES),H=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:g,reversedDepthBuffer:x,maxTextures:M,maxVertexTextures:b,maxTextureSize:A,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:P,maxVaryings:w,maxFragmentUniforms:N,maxSamples:F,samples:H}}function fT(r){const t=this;let n=null,s=0,l=!1,c=!1;const f=new is,h=new de,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const M=g.length!==0||x||s!==0||l;return l=x,s=g.length,M},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,x){n=_(g,x,0)},this.setState=function(g,x,M){const b=g.clippingPlanes,A=g.clipIntersection,y=g.clipShadows,v=r.get(g);if(!l||b===null||b.length===0||c&&!y)c?_(null):p();else{const P=c?0:s,w=P*4;let N=v.clippingState||null;m.value=N,N=_(b,x,w,M);for(let F=0;F!==w;++F)N[F]=n[F];v.clippingState=N,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=P}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function _(g,x,M,b){const A=g!==null?g.length:0;let y=null;if(A!==0){if(y=m.value,b!==!0||y===null){const v=M+A*4,P=x.matrixWorldInverse;h.getNormalMatrix(P),(y===null||y.length<v)&&(y=new Float32Array(v));for(let w=0,N=M;w!==A;++w,N+=4)f.copy(g[w]).applyMatrix4(P,h),f.normal.toArray(y,N),y[N+3]=f.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=A,t.numIntersection=0,y}}function hT(r){let t=new WeakMap;function n(f,h){return h===pd?f.mapping=Bs:h===md&&(f.mapping=qr),f}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===pd||h===md)if(t.has(f)){const m=t.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new Xv(m.height);return p.fromEquirectangularTexture(r,f),t.set(f,p),f.addEventListener("dispose",l),n(p.texture,f.mapping)}else return null}}return f}function l(f){const h=f.target;h.removeEventListener("dispose",l);const m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const rs=4,W_=[.125,.215,.35,.446,.526,.582],Ps=20,dT=256,$o=new yp,q_=new we;let Jh=null,$h=0,td=0,ed=!1;const pT=new nt;class Y_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,s=.1,l=100,c={}){const{size:f=256,position:h=pT}=c;Jh=this._renderer.getRenderTarget(),$h=this._renderer.getActiveCubeFace(),td=this._renderer.getActiveMipmapLevel(),ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=K_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Z_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Jh,$h,td),this._renderer.xr.enabled=ed,t.scissorTest=!1,Fr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Bs||t.mapping===qr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jh=this._renderer.getRenderTarget(),$h=this._renderer.getActiveCubeFace(),td=this._renderer.getActiveMipmapLevel(),ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=n||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:Ea,format:Ui,colorSpace:jr,depthBuffer:!1},l=j_(t,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=j_(t,n,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=mT(c)),this._blurMaterial=_T(c,t,n),this._ggxMaterial=gT(c,t,n)}return l}_compileMaterial(t){const n=new Li(new yi,t);this._renderer.compile(n,$o)}_sceneToCubeUV(t,n,s,l,c){const m=new xi(90,1,n,s),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],g=this._renderer,x=g.autoClear,M=g.toneMapping;g.getClearColor(q_),g.toneMapping=ki,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(l),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Li(new gl,new Fv({name:"PMREM.Background",side:Kn,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,y=A.material;let v=!1;const P=t.background;P?P.isColor&&(y.color.copy(P),t.background=null,v=!0):(y.color.copy(q_),v=!0);for(let w=0;w<6;w++){const N=w%3;N===0?(m.up.set(0,p[w],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[w],c.y,c.z)):N===1?(m.up.set(0,0,p[w]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[w],c.z)):(m.up.set(0,p[w],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[w]));const F=this._cubeSize;Fr(l,N*F,w>2?F:0,F,F),g.setRenderTarget(l),v&&g.render(A,m),g.render(t,m)}g.toneMapping=M,g.autoClear=x,t.background=P}_textureToCubeUV(t,n){const s=this._renderer,l=t.mapping===Bs||t.mapping===qr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=K_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Z_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=t;const m=this._cubeSize;Fr(n,0,0,3*m,2*m),s.setRenderTarget(n),s.render(f,$o)}_applyPMREM(t){const n=this._renderer,s=n.autoClear;n.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=s}_applyGGXFilter(t,n,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),_=n/(this._lodMeshes.length-1),g=Math.sqrt(p*p-_*_),x=0+p*1.25,M=g*x,{_lodMax:b}=this,A=this._sizeLods[s],y=3*A*(s>b-rs?s-b+rs:0),v=4*(this._cubeSize-A);m.envMap.value=t.texture,m.roughness.value=M,m.mipInt.value=b-n,Fr(c,y,v,3*A,2*A),l.setRenderTarget(c),l.render(h,$o),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-s,Fr(t,y,v,3*A,2*A),l.setRenderTarget(t),l.render(h,$o)}_blur(t,n,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,n,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");const _=3,g=this._lodMeshes[l];g.material=p;const x=p.uniforms,M=this._sizeLods[s]-1,b=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Ps-1),A=c/b,y=isFinite(c)?1+Math.floor(_*A):Ps;y>Ps&&pe(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Ps}`);const v=[];let P=0;for(let z=0;z<Ps;++z){const Z=z/A,D=Math.exp(-Z*Z/2);v.push(D),z===0?P+=D:z<y&&(P+=2*D)}for(let z=0;z<v.length;z++)v[z]=v[z]/P;x.envMap.value=t.texture,x.samples.value=y,x.weights.value=v,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:w}=this;x.dTheta.value=b,x.mipInt.value=w-s;const N=this._sizeLods[l],F=3*N*(l>w-rs?l-w+rs:0),H=4*(this._cubeSize-N);Fr(n,F,H,3*N,2*N),m.setRenderTarget(n),m.render(g,$o)}}function mT(r){const t=[],n=[],s=[];let l=r;const c=r-rs+1+W_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);t.push(h);let m=1/h;f>r-rs?m=W_[f-r+rs-1]:f===0&&(m=0),n.push(m);const p=1/(h-2),_=-p,g=1+p,x=[_,_,g,_,g,g,_,_,g,g,_,g],M=6,b=6,A=3,y=2,v=1,P=new Float32Array(A*b*M),w=new Float32Array(y*b*M),N=new Float32Array(v*b*M);for(let H=0;H<M;H++){const z=H%3*2/3-1,Z=H>2?0:-1,D=[z,Z,0,z+2/3,Z,0,z+2/3,Z+1,0,z,Z,0,z+2/3,Z+1,0,z,Z+1,0];P.set(D,A*b*H),w.set(x,y*b*H);const O=[H,H,H,H,H,H];N.set(O,v*b*H)}const F=new yi;F.setAttribute("position",new Wi(P,A)),F.setAttribute("uv",new Wi(w,y)),F.setAttribute("faceIndex",new Wi(N,v)),s.push(new Li(F,null)),l>rs&&l--}return{lodMeshes:s,sizeLods:t,sigmas:n}}function j_(r,t,n){const s=new Xi(r,t,n);return s.texture.mapping=uu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Fr(r,t,n,s,l){r.viewport.set(t,n,s,l),r.scissor.set(t,n,s,l)}function gT(r,t,n){return new ji({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function _T(r,t,n){const s=new Float32Array(Ps),l=new nt(0,1,0);return new ji({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:hu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function Z_(){return new ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function K_(){return new ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function hu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function vT(r){let t=new WeakMap,n=null;function s(h){if(h&&h.isTexture){const m=h.mapping,p=m===pd||m===md,_=m===Bs||m===qr;if(p||_){let g=t.get(h);const x=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==x)return n===null&&(n=new Y_(r)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return p&&M&&M.height>0||_&&M&&l(M)?(n===null&&(n=new Y_(r)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",c),g.texture):null}}}return h}function l(h){let m=0;const p=6;for(let _=0;_<p;_++)h[_]!==void 0&&m++;return m===p}function c(h){const m=h.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function xT(r){const t={};function n(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return n(s)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(s){const l=n(s);return l===null&&cl("WebGLRenderer: "+s+" extension not supported."),l}}}function yT(r,t,n,s){const l={},c=new WeakMap;function f(g){const x=g.target;x.index!==null&&t.remove(x.index);for(const b in x.attributes)t.remove(x.attributes[b]);x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function h(g,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function m(g){const x=g.attributes;for(const M in x)t.update(x[M],r.ARRAY_BUFFER)}function p(g){const x=[],M=g.index,b=g.attributes.position;let A=0;if(M!==null){const P=M.array;A=M.version;for(let w=0,N=P.length;w<N;w+=3){const F=P[w+0],H=P[w+1],z=P[w+2];x.push(F,H,H,z,z,F)}}else if(b!==void 0){const P=b.array;A=b.version;for(let w=0,N=P.length/3-1;w<N;w+=3){const F=w+0,H=w+1,z=w+2;x.push(F,H,H,z,z,F)}}else return;const y=new(Nv(x)?Hv:Bv)(x,1);y.version=A;const v=c.get(g);v&&t.remove(v),c.set(g,y)}function _(g){const x=c.get(g);if(x){const M=g.index;M!==null&&x.version<M.version&&p(g)}else p(g);return c.get(g)}return{get:h,update:m,getWireframeAttribute:_}}function ST(r,t,n){let s;function l(x){s=x}let c,f;function h(x){c=x.type,f=x.bytesPerElement}function m(x,M){r.drawElements(s,M,c,x*f),n.update(M,s,1)}function p(x,M,b){b!==0&&(r.drawElementsInstanced(s,M,c,x*f,b),n.update(M,s,b))}function _(x,M,b){if(b===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,x,0,b);let y=0;for(let v=0;v<b;v++)y+=M[v];n.update(y,s,1)}function g(x,M,b,A){if(b===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let v=0;v<x.length;v++)p(x[v]/f,M[v],A[v]);else{y.multiDrawElementsInstancedWEBGL(s,M,0,c,x,0,A,0,b);let v=0;for(let P=0;P<b;P++)v+=M[P]*A[P];n.update(v,s,1)}}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=_,this.renderMultiDrawInstances=g}function MT(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:Ue("WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:s}}function ET(r,t,n){const s=new WeakMap,l=new sn;function c(f,h,m){const p=f.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let x=s.get(h);if(x===void 0||x.count!==g){let O=function(){Z.dispose(),s.delete(h),h.removeEventListener("dispose",O)};var M=O;x!==void 0&&x.texture.dispose();const b=h.morphAttributes.position!==void 0,A=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,v=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],w=h.morphAttributes.color||[];let N=0;b===!0&&(N=1),A===!0&&(N=2),y===!0&&(N=3);let F=h.attributes.position.count*N,H=1;F>t.maxTextureSize&&(H=Math.ceil(F/t.maxTextureSize),F=t.maxTextureSize);const z=new Float32Array(F*H*4*g),Z=new Ov(z,F,H,g);Z.type=Gi,Z.needsUpdate=!0;const D=N*4;for(let q=0;q<g;q++){const $=v[q],ot=P[q],gt=w[q],dt=F*H*4*q;for(let V=0;V<$.count;V++){const k=V*D;b===!0&&(l.fromBufferAttribute($,V),z[dt+k+0]=l.x,z[dt+k+1]=l.y,z[dt+k+2]=l.z,z[dt+k+3]=0),A===!0&&(l.fromBufferAttribute(ot,V),z[dt+k+4]=l.x,z[dt+k+5]=l.y,z[dt+k+6]=l.z,z[dt+k+7]=0),y===!0&&(l.fromBufferAttribute(gt,V),z[dt+k+8]=l.x,z[dt+k+9]=l.y,z[dt+k+10]=l.z,z[dt+k+11]=gt.itemSize===4?l.w:1)}}x={count:g,texture:Z,size:new Ut(F,H)},s.set(h,x),h.addEventListener("dispose",O)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let b=0;for(let y=0;y<p.length;y++)b+=p[y];const A=h.morphTargetsRelative?1:1-b;m.getUniforms().setValue(r,"morphTargetBaseInfluence",A),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function bT(r,t,n,s){let l=new WeakMap;function c(m){const p=s.render.frame,_=m.geometry,g=t.get(m,_);if(l.get(g)!==p&&(t.update(g),l.set(g,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",h)===!1&&m.addEventListener("dispose",h),l.get(m)!==p&&(n.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return g}function f(){l=new WeakMap}function h(m){const p=m.target;p.removeEventListener("dispose",h),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:c,dispose:f}}const TT={[_v]:"LINEAR_TONE_MAPPING",[vv]:"REINHARD_TONE_MAPPING",[xv]:"CINEON_TONE_MAPPING",[yv]:"ACES_FILMIC_TONE_MAPPING",[Mv]:"AGX_TONE_MAPPING",[Ev]:"NEUTRAL_TONE_MAPPING",[Sv]:"CUSTOM_TONE_MAPPING"};function AT(r,t,n,s,l){const c=new Xi(t,n,{type:r,depthBuffer:s,stencilBuffer:l}),f=new Xi(t,n,{type:Ea,depthBuffer:!1,stencilBuffer:!1}),h=new yi;h.setAttribute("position",new Ln([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ln([0,2,0,0,2,0],2));const m=new fE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Li(h,m),_=new yp(-1,1,1,-1,0,1);let g=null,x=null,M=!1,b,A=null,y=[],v=!1;this.setSize=function(P,w){c.setSize(P,w),f.setSize(P,w);for(let N=0;N<y.length;N++){const F=y[N];F.setSize&&F.setSize(P,w)}},this.setEffects=function(P){y=P,v=y.length>0&&y[0].isRenderPass===!0;const w=c.width,N=c.height;for(let F=0;F<y.length;F++){const H=y[F];H.setSize&&H.setSize(w,N)}},this.begin=function(P,w){if(M||P.toneMapping===ki&&y.length===0)return!1;if(A=w,w!==null){const N=w.width,F=w.height;(c.width!==N||c.height!==F)&&this.setSize(N,F)}return v===!1&&P.setRenderTarget(c),b=P.toneMapping,P.toneMapping=ki,!0},this.hasRenderPass=function(){return v},this.end=function(P,w){P.toneMapping=b,M=!0;let N=c,F=f;for(let H=0;H<y.length;H++){const z=y[H];if(z.enabled!==!1&&(z.render(P,F,N,w),z.needsSwap!==!1)){const Z=N;N=F,F=Z}}if(g!==P.outputColorSpace||x!==P.toneMapping){g=P.outputColorSpace,x=P.toneMapping,m.defines={},Le.getTransfer(g)===ke&&(m.defines.SRGB_TRANSFER="");const H=TT[x];H&&(m.defines[H]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=N.texture,P.setRenderTarget(A),P.render(p,_),A=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const nx=new Gn,tp=new ul(1,1),ix=new Ov,ax=new lM,sx=new kv,Q_=[],J_=[],$_=new Float32Array(16),tv=new Float32Array(9),ev=new Float32Array(4);function Jr(r,t,n){const s=r[0];if(s<=0||s>0)return r;const l=t*n;let c=Q_[l];if(c===void 0&&(c=new Float32Array(l),Q_[l]=c),t!==0){s.toArray(c,0);for(let f=1,h=0;f!==t;++f)h+=n,r[f].toArray(c,h)}return c}function _n(r,t){if(r.length!==t.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==t[n])return!1;return!0}function vn(r,t){for(let n=0,s=t.length;n<s;n++)r[n]=t[n]}function du(r,t){let n=J_[t];n===void 0&&(n=new Int32Array(t),J_[t]=n);for(let s=0;s!==t;++s)n[s]=r.allocateTextureUnit();return n}function RT(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function CT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_n(n,t))return;r.uniform2fv(this.addr,t),vn(n,t)}}function wT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(_n(n,t))return;r.uniform3fv(this.addr,t),vn(n,t)}}function DT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_n(n,t))return;r.uniform4fv(this.addr,t),vn(n,t)}}function UT(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(_n(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),vn(n,t)}else{if(_n(n,s))return;ev.set(s),r.uniformMatrix2fv(this.addr,!1,ev),vn(n,s)}}function LT(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(_n(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),vn(n,t)}else{if(_n(n,s))return;tv.set(s),r.uniformMatrix3fv(this.addr,!1,tv),vn(n,s)}}function NT(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(_n(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),vn(n,t)}else{if(_n(n,s))return;$_.set(s),r.uniformMatrix4fv(this.addr,!1,$_),vn(n,s)}}function OT(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function PT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_n(n,t))return;r.uniform2iv(this.addr,t),vn(n,t)}}function IT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(_n(n,t))return;r.uniform3iv(this.addr,t),vn(n,t)}}function zT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_n(n,t))return;r.uniform4iv(this.addr,t),vn(n,t)}}function FT(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function BT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_n(n,t))return;r.uniform2uiv(this.addr,t),vn(n,t)}}function HT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(_n(n,t))return;r.uniform3uiv(this.addr,t),vn(n,t)}}function GT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_n(n,t))return;r.uniform4uiv(this.addr,t),vn(n,t)}}function VT(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(tp.compareFunction=n.isReversedDepthBuffer()?fp:up,c=tp):c=nx,n.setTexture2D(t||c,l)}function kT(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture3D(t||ax,l)}function XT(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTextureCube(t||sx,l)}function WT(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture2DArray(t||ix,l)}function qT(r){switch(r){case 5126:return RT;case 35664:return CT;case 35665:return wT;case 35666:return DT;case 35674:return UT;case 35675:return LT;case 35676:return NT;case 5124:case 35670:return OT;case 35667:case 35671:return PT;case 35668:case 35672:return IT;case 35669:case 35673:return zT;case 5125:return FT;case 36294:return BT;case 36295:return HT;case 36296:return GT;case 35678:case 36198:case 36298:case 36306:case 35682:return VT;case 35679:case 36299:case 36307:return kT;case 35680:case 36300:case 36308:case 36293:return XT;case 36289:case 36303:case 36311:case 36292:return WT}}function YT(r,t){r.uniform1fv(this.addr,t)}function jT(r,t){const n=Jr(t,this.size,2);r.uniform2fv(this.addr,n)}function ZT(r,t){const n=Jr(t,this.size,3);r.uniform3fv(this.addr,n)}function KT(r,t){const n=Jr(t,this.size,4);r.uniform4fv(this.addr,n)}function QT(r,t){const n=Jr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function JT(r,t){const n=Jr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function $T(r,t){const n=Jr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function tA(r,t){r.uniform1iv(this.addr,t)}function eA(r,t){r.uniform2iv(this.addr,t)}function nA(r,t){r.uniform3iv(this.addr,t)}function iA(r,t){r.uniform4iv(this.addr,t)}function aA(r,t){r.uniform1uiv(this.addr,t)}function sA(r,t){r.uniform2uiv(this.addr,t)}function rA(r,t){r.uniform3uiv(this.addr,t)}function oA(r,t){r.uniform4uiv(this.addr,t)}function lA(r,t,n){const s=this.cache,l=t.length,c=du(n,l);_n(s,c)||(r.uniform1iv(this.addr,c),vn(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=tp:f=nx;for(let h=0;h!==l;++h)n.setTexture2D(t[h]||f,c[h])}function cA(r,t,n){const s=this.cache,l=t.length,c=du(n,l);_n(s,c)||(r.uniform1iv(this.addr,c),vn(s,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||ax,c[f])}function uA(r,t,n){const s=this.cache,l=t.length,c=du(n,l);_n(s,c)||(r.uniform1iv(this.addr,c),vn(s,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||sx,c[f])}function fA(r,t,n){const s=this.cache,l=t.length,c=du(n,l);_n(s,c)||(r.uniform1iv(this.addr,c),vn(s,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||ix,c[f])}function hA(r){switch(r){case 5126:return YT;case 35664:return jT;case 35665:return ZT;case 35666:return KT;case 35674:return QT;case 35675:return JT;case 35676:return $T;case 5124:case 35670:return tA;case 35667:case 35671:return eA;case 35668:case 35672:return nA;case 35669:case 35673:return iA;case 5125:return aA;case 36294:return sA;case 36295:return rA;case 36296:return oA;case 35678:case 36198:case 36298:case 36306:case 35682:return lA;case 35679:case 36299:case 36307:return cA;case 35680:case 36300:case 36308:case 36293:return uA;case 36289:case 36303:case 36311:case 36292:return fA}}class dA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.setValue=qT(n.type)}}class pA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=hA(n.type)}}class mA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(t,n[h.id],s)}}}const nd=/(\w+)(\])?(\[|\.)?/g;function nv(r,t){r.seq.push(t),r.map[t.id]=t}function gA(r,t,n){const s=r.name,l=s.length;for(nd.lastIndex=0;;){const c=nd.exec(s),f=nd.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){nv(n,p===void 0?new dA(h,r,t):new pA(h,r,t));break}else{let g=n.map[h];g===void 0&&(g=new mA(h),nv(n,g)),n=g}}}class au{constructor(t,n){this.seq=[],this.map={};const s=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=t.getActiveUniform(n,f),m=t.getUniformLocation(n,h.name);gA(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,n,s,l){const c=this.map[n];c!==void 0&&c.setValue(t,s,l)}setOptional(t,n,s){const l=n[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,n,s,l){for(let c=0,f=n.length;c!==f;++c){const h=n[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(t,m.value,l)}}static seqWithValue(t,n){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&s.push(f)}return s}}function iv(r,t,n){const s=r.createShader(t);return r.shaderSource(s,n),r.compileShader(s),s}const _A=37297;let vA=0;function xA(r,t){const n=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===t?">":" "} ${h}: ${n[f]}`)}return s.join(`
`)}const av=new de;function yA(r){Le._getMatrix(av,Le.workingColorSpace,r);const t=`mat3( ${av.elements.map(n=>n.toFixed(4))} )`;switch(Le.getTransfer(r)){case ru:return[t,"LinearTransferOETF"];case ke:return[t,"sRGBTransferOETF"];default:return pe("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function sv(r,t,n){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return n.toUpperCase()+`

`+c+`

`+xA(r.getShaderSource(t),h)}else return c}function SA(r,t){const n=yA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const MA={[_v]:"Linear",[vv]:"Reinhard",[xv]:"Cineon",[yv]:"ACESFilmic",[Mv]:"AgX",[Ev]:"Neutral",[Sv]:"Custom"};function EA(r,t){const n=MA[t];return n===void 0?(pe("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Kc=new nt;function bA(){Le.getLuminanceCoefficients(Kc);const r=Kc.x.toFixed(4),t=Kc.y.toFixed(4),n=Kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(il).join(`
`)}function AA(r){const t=[];for(const n in r){const s=r[n];s!==!1&&t.push("#define "+n+" "+s)}return t.join(`
`)}function RA(r,t){const n={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:h}}return n}function il(r){return r!==""}function rv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ov(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const CA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ep(r){return r.replace(CA,DA)}const wA=new Map;function DA(r,t){let n=Se[t];if(n===void 0){const s=wA.get(t);if(s!==void 0)n=Se[s],pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return ep(n)}const UA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lv(r){return r.replace(UA,LA)}function LA(r,t,n,s){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function cv(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const NA={[Jc]:"SHADOWMAP_TYPE_PCF",[el]:"SHADOWMAP_TYPE_VSM"};function OA(r){return NA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const PA={[Bs]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE",[uu]:"ENVMAP_TYPE_CUBE_UV"};function IA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":PA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const zA={[qr]:"ENVMAP_MODE_REFRACTION"};function FA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":zA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const BA={[gv]:"ENVMAP_BLENDING_MULTIPLY",[VS]:"ENVMAP_BLENDING_MIX",[kS]:"ENVMAP_BLENDING_ADD"};function HA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":BA[r.combine]||"ENVMAP_BLENDING_NONE"}function GA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function VA(r,t,n,s){const l=r.getContext(),c=n.defines;let f=n.vertexShader,h=n.fragmentShader;const m=OA(n),p=IA(n),_=FA(n),g=HA(n),x=GA(n),M=TA(n),b=AA(c),A=l.createProgram();let y,v,P=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(il).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(il).join(`
`),v.length>0&&(v+=`
`)):(y=[cv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(il).join(`
`),v=[cv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+_:"",n.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ki?"#define TONE_MAPPING":"",n.toneMapping!==ki?Se.tonemapping_pars_fragment:"",n.toneMapping!==ki?EA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Se.colorspace_pars_fragment,SA("linearToOutputTexel",n.outputColorSpace),bA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(il).join(`
`)),f=ep(f),f=rv(f,n),f=ov(f,n),h=ep(h),h=rv(h,n),h=ov(h,n),f=lv(f),h=lv(h),n.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",n.glslVersion===m_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===m_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const w=P+y+f,N=P+v+h,F=iv(l,l.VERTEX_SHADER,w),H=iv(l,l.FRAGMENT_SHADER,N);l.attachShader(A,F),l.attachShader(A,H),n.index0AttributeName!==void 0?l.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function z(q){if(r.debug.checkShaderErrors){const $=l.getProgramInfoLog(A)||"",ot=l.getShaderInfoLog(F)||"",gt=l.getShaderInfoLog(H)||"",dt=$.trim(),V=ot.trim(),k=gt.trim();let W=!0,Rt=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,A,F,H);else{const bt=sv(l,F,"vertex"),B=sv(l,H,"fragment");Ue("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+dt+`
`+bt+`
`+B)}else dt!==""?pe("WebGLProgram: Program Info Log:",dt):(V===""||k==="")&&(Rt=!1);Rt&&(q.diagnostics={runnable:W,programLog:dt,vertexShader:{log:V,prefix:y},fragmentShader:{log:k,prefix:v}})}l.deleteShader(F),l.deleteShader(H),Z=new au(l,A),D=RA(l,A)}let Z;this.getUniforms=function(){return Z===void 0&&z(this),Z};let D;this.getAttributes=function(){return D===void 0&&z(this),D};let O=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=l.getProgramParameter(A,_A)),O},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=vA++,this.cacheKey=t,this.usedTimes=1,this.program=A,this.vertexShader=F,this.fragmentShader=H,this}let kA=0;class XA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let s=n.get(t);return s===void 0&&(s=new Set,n.set(t,s)),s}_getShaderStage(t){const n=this.shaderCache;let s=n.get(t);return s===void 0&&(s=new WA(t),n.set(t,s)),s}}class WA{constructor(t){this.id=kA++,this.code=t,this.usedTimes=0}}function qA(r,t,n,s,l,c,f){const h=new Iv,m=new XA,p=new Set,_=[],g=new Map,x=l.logarithmicDepthBuffer;let M=l.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(D){return p.add(D),D===0?"uv":`uv${D}`}function y(D,O,q,$,ot){const gt=$.fog,dt=ot.geometry,V=D.isMeshStandardMaterial?$.environment:null,k=(D.isMeshStandardMaterial?n:t).get(D.envMap||V),W=k&&k.mapping===uu?k.image.height:null,Rt=b[D.type];D.precision!==null&&(M=l.getMaxPrecision(D.precision),M!==D.precision&&pe("WebGLProgram.getParameters:",D.precision,"not supported, using",M,"instead."));const bt=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,B=bt!==void 0?bt.length:0;let ut=0;dt.morphAttributes.position!==void 0&&(ut=1),dt.morphAttributes.normal!==void 0&&(ut=2),dt.morphAttributes.color!==void 0&&(ut=3);let At,j,X,R;if(Rt){const De=Bi[Rt];At=De.vertexShader,j=De.fragmentShader}else At=D.vertexShader,j=D.fragmentShader,m.update(D),X=m.getVertexShaderID(D),R=m.getFragmentShaderID(D);const C=r.getRenderTarget(),it=r.state.buffers.depth.getReversed(),_t=ot.isInstancedMesh===!0,et=ot.isBatchedMesh===!0,Lt=!!D.map,Ft=!!D.matcap,Ot=!!k,K=!!D.aoMap,st=!!D.lightMap,ct=!!D.bumpMap,Mt=!!D.normalMap,T=!!D.displacementMap,G=!!D.emissiveMap,Et=!!D.metalnessMap,Gt=!!D.roughnessMap,zt=D.anisotropy>0,I=D.clearcoat>0,E=D.dispersion>0,J=D.iridescence>0,xt=D.sheen>0,Dt=D.transmission>0,yt=zt&&!!D.anisotropyMap,te=I&&!!D.clearcoatMap,Vt=I&&!!D.clearcoatNormalMap,ee=I&&!!D.clearcoatRoughnessMap,le=J&&!!D.iridescenceMap,Pt=J&&!!D.iridescenceThicknessMap,Bt=xt&&!!D.sheenColorMap,Qt=xt&&!!D.sheenRoughnessMap,Zt=!!D.specularMap,Xt=!!D.specularColorMap,xe=!!D.specularIntensityMap,tt=Dt&&!!D.transmissionMap,qt=Dt&&!!D.thicknessMap,Ht=!!D.gradientMap,Kt=!!D.alphaMap,It=D.alphaTest>0,Nt=!!D.alphaHash,kt=!!D.extensions;let me=ki;D.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(me=r.toneMapping);const Be={shaderID:Rt,shaderType:D.type,shaderName:D.name,vertexShader:At,fragmentShader:j,defines:D.defines,customVertexShaderID:X,customFragmentShaderID:R,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:M,batching:et,batchingColor:et&&ot._colorsTexture!==null,instancing:_t,instancingColor:_t&&ot.instanceColor!==null,instancingMorph:_t&&ot.morphTexture!==null,outputColorSpace:C===null?r.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:jr,alphaToCoverage:!!D.alphaToCoverage,map:Lt,matcap:Ft,envMap:Ot,envMapMode:Ot&&k.mapping,envMapCubeUVHeight:W,aoMap:K,lightMap:st,bumpMap:ct,normalMap:Mt,displacementMap:T,emissiveMap:G,normalMapObjectSpace:Mt&&D.normalMapType===qS,normalMapTangentSpace:Mt&&D.normalMapType===Lv,metalnessMap:Et,roughnessMap:Gt,anisotropy:zt,anisotropyMap:yt,clearcoat:I,clearcoatMap:te,clearcoatNormalMap:Vt,clearcoatRoughnessMap:ee,dispersion:E,iridescence:J,iridescenceMap:le,iridescenceThicknessMap:Pt,sheen:xt,sheenColorMap:Bt,sheenRoughnessMap:Qt,specularMap:Zt,specularColorMap:Xt,specularIntensityMap:xe,transmission:Dt,transmissionMap:tt,thicknessMap:qt,gradientMap:Ht,opaque:D.transparent===!1&&D.blending===Vr&&D.alphaToCoverage===!1,alphaMap:Kt,alphaTest:It,alphaHash:Nt,combine:D.combine,mapUv:Lt&&A(D.map.channel),aoMapUv:K&&A(D.aoMap.channel),lightMapUv:st&&A(D.lightMap.channel),bumpMapUv:ct&&A(D.bumpMap.channel),normalMapUv:Mt&&A(D.normalMap.channel),displacementMapUv:T&&A(D.displacementMap.channel),emissiveMapUv:G&&A(D.emissiveMap.channel),metalnessMapUv:Et&&A(D.metalnessMap.channel),roughnessMapUv:Gt&&A(D.roughnessMap.channel),anisotropyMapUv:yt&&A(D.anisotropyMap.channel),clearcoatMapUv:te&&A(D.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&A(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&A(D.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&A(D.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&A(D.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&A(D.sheenColorMap.channel),sheenRoughnessMapUv:Qt&&A(D.sheenRoughnessMap.channel),specularMapUv:Zt&&A(D.specularMap.channel),specularColorMapUv:Xt&&A(D.specularColorMap.channel),specularIntensityMapUv:xe&&A(D.specularIntensityMap.channel),transmissionMapUv:tt&&A(D.transmissionMap.channel),thicknessMapUv:qt&&A(D.thicknessMap.channel),alphaMapUv:Kt&&A(D.alphaMap.channel),vertexTangents:!!dt.attributes.tangent&&(Mt||zt),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,pointsUvs:ot.isPoints===!0&&!!dt.attributes.uv&&(Lt||Kt),fog:!!gt,useFog:D.fog===!0,fogExp2:!!gt&&gt.isFogExp2,flatShading:D.flatShading===!0&&D.wireframe===!1,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:it,skinning:ot.isSkinnedMesh===!0,morphTargets:dt.morphAttributes.position!==void 0,morphNormals:dt.morphAttributes.normal!==void 0,morphColors:dt.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:ut,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&q.length>0,shadowMapType:r.shadowMap.type,toneMapping:me,decodeVideoTexture:Lt&&D.map.isVideoTexture===!0&&Le.getTransfer(D.map.colorSpace)===ke,decodeVideoTextureEmissive:G&&D.emissiveMap.isVideoTexture===!0&&Le.getTransfer(D.emissiveMap.colorSpace)===ke,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Hi,flipSided:D.side===Kn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:kt&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&D.extensions.multiDraw===!0||et)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return Be.vertexUv1s=p.has(1),Be.vertexUv2s=p.has(2),Be.vertexUv3s=p.has(3),p.clear(),Be}function v(D){const O=[];if(D.shaderID?O.push(D.shaderID):(O.push(D.customVertexShaderID),O.push(D.customFragmentShaderID)),D.defines!==void 0)for(const q in D.defines)O.push(q),O.push(D.defines[q]);return D.isRawShaderMaterial===!1&&(P(O,D),w(O,D),O.push(r.outputColorSpace)),O.push(D.customProgramCacheKey),O.join()}function P(D,O){D.push(O.precision),D.push(O.outputColorSpace),D.push(O.envMapMode),D.push(O.envMapCubeUVHeight),D.push(O.mapUv),D.push(O.alphaMapUv),D.push(O.lightMapUv),D.push(O.aoMapUv),D.push(O.bumpMapUv),D.push(O.normalMapUv),D.push(O.displacementMapUv),D.push(O.emissiveMapUv),D.push(O.metalnessMapUv),D.push(O.roughnessMapUv),D.push(O.anisotropyMapUv),D.push(O.clearcoatMapUv),D.push(O.clearcoatNormalMapUv),D.push(O.clearcoatRoughnessMapUv),D.push(O.iridescenceMapUv),D.push(O.iridescenceThicknessMapUv),D.push(O.sheenColorMapUv),D.push(O.sheenRoughnessMapUv),D.push(O.specularMapUv),D.push(O.specularColorMapUv),D.push(O.specularIntensityMapUv),D.push(O.transmissionMapUv),D.push(O.thicknessMapUv),D.push(O.combine),D.push(O.fogExp2),D.push(O.sizeAttenuation),D.push(O.morphTargetsCount),D.push(O.morphAttributeCount),D.push(O.numDirLights),D.push(O.numPointLights),D.push(O.numSpotLights),D.push(O.numSpotLightMaps),D.push(O.numHemiLights),D.push(O.numRectAreaLights),D.push(O.numDirLightShadows),D.push(O.numPointLightShadows),D.push(O.numSpotLightShadows),D.push(O.numSpotLightShadowsWithMaps),D.push(O.numLightProbes),D.push(O.shadowMapType),D.push(O.toneMapping),D.push(O.numClippingPlanes),D.push(O.numClipIntersection),D.push(O.depthPacking)}function w(D,O){h.disableAll(),O.instancing&&h.enable(0),O.instancingColor&&h.enable(1),O.instancingMorph&&h.enable(2),O.matcap&&h.enable(3),O.envMap&&h.enable(4),O.normalMapObjectSpace&&h.enable(5),O.normalMapTangentSpace&&h.enable(6),O.clearcoat&&h.enable(7),O.iridescence&&h.enable(8),O.alphaTest&&h.enable(9),O.vertexColors&&h.enable(10),O.vertexAlphas&&h.enable(11),O.vertexUv1s&&h.enable(12),O.vertexUv2s&&h.enable(13),O.vertexUv3s&&h.enable(14),O.vertexTangents&&h.enable(15),O.anisotropy&&h.enable(16),O.alphaHash&&h.enable(17),O.batching&&h.enable(18),O.dispersion&&h.enable(19),O.batchingColor&&h.enable(20),O.gradientMap&&h.enable(21),D.push(h.mask),h.disableAll(),O.fog&&h.enable(0),O.useFog&&h.enable(1),O.flatShading&&h.enable(2),O.logarithmicDepthBuffer&&h.enable(3),O.reversedDepthBuffer&&h.enable(4),O.skinning&&h.enable(5),O.morphTargets&&h.enable(6),O.morphNormals&&h.enable(7),O.morphColors&&h.enable(8),O.premultipliedAlpha&&h.enable(9),O.shadowMapEnabled&&h.enable(10),O.doubleSided&&h.enable(11),O.flipSided&&h.enable(12),O.useDepthPacking&&h.enable(13),O.dithering&&h.enable(14),O.transmission&&h.enable(15),O.sheen&&h.enable(16),O.opaque&&h.enable(17),O.pointsUvs&&h.enable(18),O.decodeVideoTexture&&h.enable(19),O.decodeVideoTextureEmissive&&h.enable(20),O.alphaToCoverage&&h.enable(21),D.push(h.mask)}function N(D){const O=b[D.type];let q;if(O){const $=Bi[O];q=SM.clone($.uniforms)}else q=D.uniforms;return q}function F(D,O){let q=g.get(O);return q!==void 0?++q.usedTimes:(q=new VA(r,O,D,c),_.push(q),g.set(O,q)),q}function H(D){if(--D.usedTimes===0){const O=_.indexOf(D);_[O]=_[_.length-1],_.pop(),g.delete(D.cacheKey),D.destroy()}}function z(D){m.remove(D)}function Z(){m.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:N,acquireProgram:F,releaseProgram:H,releaseShaderCache:z,programs:_,dispose:Z}}function YA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:s,update:l,dispose:c}}function jA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function uv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function fv(){const r=[];let t=0;const n=[],s=[],l=[];function c(){t=0,n.length=0,s.length=0,l.length=0}function f(g,x,M,b,A,y){let v=r[t];return v===void 0?(v={id:g.id,object:g,geometry:x,material:M,groupOrder:b,renderOrder:g.renderOrder,z:A,group:y},r[t]=v):(v.id=g.id,v.object=g,v.geometry=x,v.material=M,v.groupOrder=b,v.renderOrder=g.renderOrder,v.z=A,v.group=y),t++,v}function h(g,x,M,b,A,y){const v=f(g,x,M,b,A,y);M.transmission>0?s.push(v):M.transparent===!0?l.push(v):n.push(v)}function m(g,x,M,b,A,y){const v=f(g,x,M,b,A,y);M.transmission>0?s.unshift(v):M.transparent===!0?l.unshift(v):n.unshift(v)}function p(g,x){n.length>1&&n.sort(g||jA),s.length>1&&s.sort(x||uv),l.length>1&&l.sort(x||uv)}function _(){for(let g=t,x=r.length;g<x;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:s,transparent:l,init:c,push:h,unshift:m,finish:_,sort:p}}function ZA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new fv,r.set(s,[f])):l>=c.length?(f=new fv,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function KA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new nt,color:new we};break;case"SpotLight":n={position:new nt,direction:new nt,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new nt,color:new we,distance:0,decay:0};break;case"HemisphereLight":n={direction:new nt,skyColor:new we,groundColor:new we};break;case"RectAreaLight":n={color:new we,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return r[t.id]=n,n}}}function QA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let JA=0;function $A(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function tR(r){const t=new KA,n=QA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new nt);const l=new nt,c=new en,f=new en;function h(p){let _=0,g=0,x=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let M=0,b=0,A=0,y=0,v=0,P=0,w=0,N=0,F=0,H=0,z=0;p.sort($A);for(let D=0,O=p.length;D<O;D++){const q=p[D],$=q.color,ot=q.intensity,gt=q.distance;let dt=null;if(q.shadow&&q.shadow.map&&(q.shadow.map.texture.format===Yr?dt=q.shadow.map.texture:dt=q.shadow.map.depthTexture||q.shadow.map.texture),q.isAmbientLight)_+=$.r*ot,g+=$.g*ot,x+=$.b*ot;else if(q.isLightProbe){for(let V=0;V<9;V++)s.probe[V].addScaledVector(q.sh.coefficients[V],ot);z++}else if(q.isDirectionalLight){const V=t.get(q);if(V.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){const k=q.shadow,W=n.get(q);W.shadowIntensity=k.intensity,W.shadowBias=k.bias,W.shadowNormalBias=k.normalBias,W.shadowRadius=k.radius,W.shadowMapSize=k.mapSize,s.directionalShadow[M]=W,s.directionalShadowMap[M]=dt,s.directionalShadowMatrix[M]=q.shadow.matrix,P++}s.directional[M]=V,M++}else if(q.isSpotLight){const V=t.get(q);V.position.setFromMatrixPosition(q.matrixWorld),V.color.copy($).multiplyScalar(ot),V.distance=gt,V.coneCos=Math.cos(q.angle),V.penumbraCos=Math.cos(q.angle*(1-q.penumbra)),V.decay=q.decay,s.spot[A]=V;const k=q.shadow;if(q.map&&(s.spotLightMap[F]=q.map,F++,k.updateMatrices(q),q.castShadow&&H++),s.spotLightMatrix[A]=k.matrix,q.castShadow){const W=n.get(q);W.shadowIntensity=k.intensity,W.shadowBias=k.bias,W.shadowNormalBias=k.normalBias,W.shadowRadius=k.radius,W.shadowMapSize=k.mapSize,s.spotShadow[A]=W,s.spotShadowMap[A]=dt,N++}A++}else if(q.isRectAreaLight){const V=t.get(q);V.color.copy($).multiplyScalar(ot),V.halfWidth.set(q.width*.5,0,0),V.halfHeight.set(0,q.height*.5,0),s.rectArea[y]=V,y++}else if(q.isPointLight){const V=t.get(q);if(V.color.copy(q.color).multiplyScalar(q.intensity),V.distance=q.distance,V.decay=q.decay,q.castShadow){const k=q.shadow,W=n.get(q);W.shadowIntensity=k.intensity,W.shadowBias=k.bias,W.shadowNormalBias=k.normalBias,W.shadowRadius=k.radius,W.shadowMapSize=k.mapSize,W.shadowCameraNear=k.camera.near,W.shadowCameraFar=k.camera.far,s.pointShadow[b]=W,s.pointShadowMap[b]=dt,s.pointShadowMatrix[b]=q.shadow.matrix,w++}s.point[b]=V,b++}else if(q.isHemisphereLight){const V=t.get(q);V.skyColor.copy(q.color).multiplyScalar(ot),V.groundColor.copy(q.groundColor).multiplyScalar(ot),s.hemi[v]=V,v++}}y>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=jt.LTC_FLOAT_1,s.rectAreaLTC2=jt.LTC_FLOAT_2):(s.rectAreaLTC1=jt.LTC_HALF_1,s.rectAreaLTC2=jt.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=g,s.ambient[2]=x;const Z=s.hash;(Z.directionalLength!==M||Z.pointLength!==b||Z.spotLength!==A||Z.rectAreaLength!==y||Z.hemiLength!==v||Z.numDirectionalShadows!==P||Z.numPointShadows!==w||Z.numSpotShadows!==N||Z.numSpotMaps!==F||Z.numLightProbes!==z)&&(s.directional.length=M,s.spot.length=A,s.rectArea.length=y,s.point.length=b,s.hemi.length=v,s.directionalShadow.length=P,s.directionalShadowMap.length=P,s.pointShadow.length=w,s.pointShadowMap.length=w,s.spotShadow.length=N,s.spotShadowMap.length=N,s.directionalShadowMatrix.length=P,s.pointShadowMatrix.length=w,s.spotLightMatrix.length=N+F-H,s.spotLightMap.length=F,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=z,Z.directionalLength=M,Z.pointLength=b,Z.spotLength=A,Z.rectAreaLength=y,Z.hemiLength=v,Z.numDirectionalShadows=P,Z.numPointShadows=w,Z.numSpotShadows=N,Z.numSpotMaps=F,Z.numLightProbes=z,s.version=JA++)}function m(p,_){let g=0,x=0,M=0,b=0,A=0;const y=_.matrixWorldInverse;for(let v=0,P=p.length;v<P;v++){const w=p[v];if(w.isDirectionalLight){const N=s.directional[g];N.direction.setFromMatrixPosition(w.matrixWorld),l.setFromMatrixPosition(w.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(y),g++}else if(w.isSpotLight){const N=s.spot[M];N.position.setFromMatrixPosition(w.matrixWorld),N.position.applyMatrix4(y),N.direction.setFromMatrixPosition(w.matrixWorld),l.setFromMatrixPosition(w.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(y),M++}else if(w.isRectAreaLight){const N=s.rectArea[b];N.position.setFromMatrixPosition(w.matrixWorld),N.position.applyMatrix4(y),f.identity(),c.copy(w.matrixWorld),c.premultiply(y),f.extractRotation(c),N.halfWidth.set(w.width*.5,0,0),N.halfHeight.set(0,w.height*.5,0),N.halfWidth.applyMatrix4(f),N.halfHeight.applyMatrix4(f),b++}else if(w.isPointLight){const N=s.point[x];N.position.setFromMatrixPosition(w.matrixWorld),N.position.applyMatrix4(y),x++}else if(w.isHemisphereLight){const N=s.hemi[A];N.direction.setFromMatrixPosition(w.matrixWorld),N.direction.transformDirection(y),A++}}}return{setup:h,setupView:m,state:s}}function hv(r){const t=new tR(r),n=[],s=[];function l(_){p.camera=_,n.length=0,s.length=0}function c(_){n.push(_)}function f(_){s.push(_)}function h(){t.setup(n)}function m(_){t.setupView(n,_)}const p={lightsArray:n,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:h,setupLightsView:m,pushLight:c,pushShadow:f}}function eR(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let h;return f===void 0?(h=new hv(r),t.set(l,[h])):c>=f.length?(h=new hv(r),f.push(h)):h=f[c],h}function s(){t=new WeakMap}return{get:n,dispose:s}}const nR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,aR=[new nt(1,0,0),new nt(-1,0,0),new nt(0,1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1)],sR=[new nt(0,-1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1),new nt(0,-1,0),new nt(0,-1,0)],dv=new en,tl=new nt,id=new nt;function rR(r,t,n){let s=new pp;const l=new Ut,c=new Ut,f=new sn,h=new hE,m=new dE,p={},_=n.maxTextureSize,g={[ls]:Kn,[Kn]:ls,[Hi]:Hi},x=new ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:nR,fragmentShader:iR}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const b=new yi;b.setAttribute("position",new Wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Li(b,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jc;let v=this.type;this.render=function(H,z,Z){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||H.length===0)return;H.type===ES&&(pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),H.type=Jc);const D=r.getRenderTarget(),O=r.getActiveCubeFace(),q=r.getActiveMipmapLevel(),$=r.state;$.setBlending(Sa),$.buffers.depth.getReversed()===!0?$.buffers.color.setClear(0,0,0,0):$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const ot=v!==this.type;ot&&z.traverse(function(gt){gt.material&&(Array.isArray(gt.material)?gt.material.forEach(dt=>dt.needsUpdate=!0):gt.material.needsUpdate=!0)});for(let gt=0,dt=H.length;gt<dt;gt++){const V=H[gt],k=V.shadow;if(k===void 0){pe("WebGLShadowMap:",V,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;l.copy(k.mapSize);const W=k.getFrameExtents();if(l.multiply(W),c.copy(k.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/W.x),l.x=c.x*W.x,k.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/W.y),l.y=c.y*W.y,k.mapSize.y=c.y)),k.map===null||ot===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===el){if(V.isPointLight){pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Xi(l.x,l.y,{format:Yr,type:Ea,minFilter:zn,magFilter:zn,generateMipmaps:!1}),k.map.texture.name=V.name+".shadowMap",k.map.depthTexture=new ul(l.x,l.y,Gi),k.map.depthTexture.name=V.name+".shadowMapDepth",k.map.depthTexture.format=ba,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Un,k.map.depthTexture.magFilter=Un}else{V.isPointLight?(k.map=new Xv(l.x),k.map.depthTexture=new UM(l.x,qi)):(k.map=new Xi(l.x,l.y),k.map.depthTexture=new ul(l.x,l.y,qi)),k.map.depthTexture.name=V.name+".shadowMap",k.map.depthTexture.format=ba;const bt=r.state.buffers.depth.getReversed();this.type===Jc?(k.map.depthTexture.compareFunction=bt?fp:up,k.map.depthTexture.minFilter=zn,k.map.depthTexture.magFilter=zn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Un,k.map.depthTexture.magFilter=Un)}k.camera.updateProjectionMatrix()}const Rt=k.map.isWebGLCubeRenderTarget?6:1;for(let bt=0;bt<Rt;bt++){if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,bt),r.clear();else{bt===0&&(r.setRenderTarget(k.map),r.clear());const B=k.getViewport(bt);f.set(c.x*B.x,c.y*B.y,c.x*B.z,c.y*B.w),$.viewport(f)}if(V.isPointLight){const B=k.camera,ut=k.matrix,At=V.distance||B.far;At!==B.far&&(B.far=At,B.updateProjectionMatrix()),tl.setFromMatrixPosition(V.matrixWorld),B.position.copy(tl),id.copy(B.position),id.add(aR[bt]),B.up.copy(sR[bt]),B.lookAt(id),B.updateMatrixWorld(),ut.makeTranslation(-tl.x,-tl.y,-tl.z),dv.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),k._frustum.setFromProjectionMatrix(dv,B.coordinateSystem,B.reversedDepth)}else k.updateMatrices(V);s=k.getFrustum(),N(z,Z,k.camera,V,this.type)}k.isPointLightShadow!==!0&&this.type===el&&P(k,Z),k.needsUpdate=!1}v=this.type,y.needsUpdate=!1,r.setRenderTarget(D,O,q)};function P(H,z){const Z=t.update(A);x.defines.VSM_SAMPLES!==H.blurSamples&&(x.defines.VSM_SAMPLES=H.blurSamples,M.defines.VSM_SAMPLES=H.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new Xi(l.x,l.y,{format:Yr,type:Ea})),x.uniforms.shadow_pass.value=H.map.depthTexture,x.uniforms.resolution.value=H.mapSize,x.uniforms.radius.value=H.radius,r.setRenderTarget(H.mapPass),r.clear(),r.renderBufferDirect(z,null,Z,x,A,null),M.uniforms.shadow_pass.value=H.mapPass.texture,M.uniforms.resolution.value=H.mapSize,M.uniforms.radius.value=H.radius,r.setRenderTarget(H.map),r.clear(),r.renderBufferDirect(z,null,Z,M,A,null)}function w(H,z,Z,D){let O=null;const q=Z.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(q!==void 0)O=q;else if(O=Z.isPointLight===!0?m:h,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const $=O.uuid,ot=z.uuid;let gt=p[$];gt===void 0&&(gt={},p[$]=gt);let dt=gt[ot];dt===void 0&&(dt=O.clone(),gt[ot]=dt,z.addEventListener("dispose",F)),O=dt}if(O.visible=z.visible,O.wireframe=z.wireframe,D===el?O.side=z.shadowSide!==null?z.shadowSide:z.side:O.side=z.shadowSide!==null?z.shadowSide:g[z.side],O.alphaMap=z.alphaMap,O.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,O.map=z.map,O.clipShadows=z.clipShadows,O.clippingPlanes=z.clippingPlanes,O.clipIntersection=z.clipIntersection,O.displacementMap=z.displacementMap,O.displacementScale=z.displacementScale,O.displacementBias=z.displacementBias,O.wireframeLinewidth=z.wireframeLinewidth,O.linewidth=z.linewidth,Z.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const $=r.properties.get(O);$.light=Z}return O}function N(H,z,Z,D,O){if(H.visible===!1)return;if(H.layers.test(z.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&O===el)&&(!H.frustumCulled||s.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,H.matrixWorld);const ot=t.update(H),gt=H.material;if(Array.isArray(gt)){const dt=ot.groups;for(let V=0,k=dt.length;V<k;V++){const W=dt[V],Rt=gt[W.materialIndex];if(Rt&&Rt.visible){const bt=w(H,Rt,D,O);H.onBeforeShadow(r,H,z,Z,ot,bt,W),r.renderBufferDirect(Z,null,ot,bt,H,W),H.onAfterShadow(r,H,z,Z,ot,bt,W)}}}else if(gt.visible){const dt=w(H,gt,D,O);H.onBeforeShadow(r,H,z,Z,ot,dt,null),r.renderBufferDirect(Z,null,ot,dt,H,null),H.onAfterShadow(r,H,z,Z,ot,dt,null)}}const $=H.children;for(let ot=0,gt=$.length;ot<gt;ot++)N($[ot],z,Z,D,O)}function F(H){H.target.removeEventListener("dispose",F);for(const Z in p){const D=p[Z],O=H.target.uuid;O in D&&(D[O].dispose(),delete D[O])}}}const oR={[od]:ld,[cd]:hd,[ud]:dd,[Wr]:fd,[ld]:od,[hd]:cd,[dd]:ud,[fd]:Wr};function lR(r,t){function n(){let tt=!1;const qt=new sn;let Ht=null;const Kt=new sn(0,0,0,0);return{setMask:function(It){Ht!==It&&!tt&&(r.colorMask(It,It,It,It),Ht=It)},setLocked:function(It){tt=It},setClear:function(It,Nt,kt,me,Be){Be===!0&&(It*=me,Nt*=me,kt*=me),qt.set(It,Nt,kt,me),Kt.equals(qt)===!1&&(r.clearColor(It,Nt,kt,me),Kt.copy(qt))},reset:function(){tt=!1,Ht=null,Kt.set(-1,0,0,0)}}}function s(){let tt=!1,qt=!1,Ht=null,Kt=null,It=null;return{setReversed:function(Nt){if(qt!==Nt){const kt=t.get("EXT_clip_control");Nt?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),qt=Nt;const me=It;It=null,this.setClear(me)}},getReversed:function(){return qt},setTest:function(Nt){Nt?C(r.DEPTH_TEST):it(r.DEPTH_TEST)},setMask:function(Nt){Ht!==Nt&&!tt&&(r.depthMask(Nt),Ht=Nt)},setFunc:function(Nt){if(qt&&(Nt=oR[Nt]),Kt!==Nt){switch(Nt){case od:r.depthFunc(r.NEVER);break;case ld:r.depthFunc(r.ALWAYS);break;case cd:r.depthFunc(r.LESS);break;case Wr:r.depthFunc(r.LEQUAL);break;case ud:r.depthFunc(r.EQUAL);break;case fd:r.depthFunc(r.GEQUAL);break;case hd:r.depthFunc(r.GREATER);break;case dd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Kt=Nt}},setLocked:function(Nt){tt=Nt},setClear:function(Nt){It!==Nt&&(qt&&(Nt=1-Nt),r.clearDepth(Nt),It=Nt)},reset:function(){tt=!1,Ht=null,Kt=null,It=null,qt=!1}}}function l(){let tt=!1,qt=null,Ht=null,Kt=null,It=null,Nt=null,kt=null,me=null,Be=null;return{setTest:function(De){tt||(De?C(r.STENCIL_TEST):it(r.STENCIL_TEST))},setMask:function(De){qt!==De&&!tt&&(r.stencilMask(De),qt=De)},setFunc:function(De,Nn,Si){(Ht!==De||Kt!==Nn||It!==Si)&&(r.stencilFunc(De,Nn,Si),Ht=De,Kt=Nn,It=Si)},setOp:function(De,Nn,Si){(Nt!==De||kt!==Nn||me!==Si)&&(r.stencilOp(De,Nn,Si),Nt=De,kt=Nn,me=Si)},setLocked:function(De){tt=De},setClear:function(De){Be!==De&&(r.clearStencil(De),Be=De)},reset:function(){tt=!1,qt=null,Ht=null,Kt=null,It=null,Nt=null,kt=null,me=null,Be=null}}}const c=new n,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let _={},g={},x=new WeakMap,M=[],b=null,A=!1,y=null,v=null,P=null,w=null,N=null,F=null,H=null,z=new we(0,0,0),Z=0,D=!1,O=null,q=null,$=null,ot=null,gt=null;const dt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,k=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=k>=1):W.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=k>=2);let Rt=null,bt={};const B=r.getParameter(r.SCISSOR_BOX),ut=r.getParameter(r.VIEWPORT),At=new sn().fromArray(B),j=new sn().fromArray(ut);function X(tt,qt,Ht,Kt){const It=new Uint8Array(4),Nt=r.createTexture();r.bindTexture(tt,Nt),r.texParameteri(tt,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(tt,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let kt=0;kt<Ht;kt++)tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?r.texImage3D(qt,0,r.RGBA,1,1,Kt,0,r.RGBA,r.UNSIGNED_BYTE,It):r.texImage2D(qt+kt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,It);return Nt}const R={};R[r.TEXTURE_2D]=X(r.TEXTURE_2D,r.TEXTURE_2D,1),R[r.TEXTURE_CUBE_MAP]=X(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),R[r.TEXTURE_2D_ARRAY]=X(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),R[r.TEXTURE_3D]=X(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),C(r.DEPTH_TEST),f.setFunc(Wr),ct(!1),Mt(u_),C(r.CULL_FACE),K(Sa);function C(tt){_[tt]!==!0&&(r.enable(tt),_[tt]=!0)}function it(tt){_[tt]!==!1&&(r.disable(tt),_[tt]=!1)}function _t(tt,qt){return g[tt]!==qt?(r.bindFramebuffer(tt,qt),g[tt]=qt,tt===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=qt),tt===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=qt),!0):!1}function et(tt,qt){let Ht=M,Kt=!1;if(tt){Ht=x.get(qt),Ht===void 0&&(Ht=[],x.set(qt,Ht));const It=tt.textures;if(Ht.length!==It.length||Ht[0]!==r.COLOR_ATTACHMENT0){for(let Nt=0,kt=It.length;Nt<kt;Nt++)Ht[Nt]=r.COLOR_ATTACHMENT0+Nt;Ht.length=It.length,Kt=!0}}else Ht[0]!==r.BACK&&(Ht[0]=r.BACK,Kt=!0);Kt&&r.drawBuffers(Ht)}function Lt(tt){return b!==tt?(r.useProgram(tt),b=tt,!0):!1}const Ft={[Os]:r.FUNC_ADD,[TS]:r.FUNC_SUBTRACT,[AS]:r.FUNC_REVERSE_SUBTRACT};Ft[RS]=r.MIN,Ft[CS]=r.MAX;const Ot={[wS]:r.ZERO,[DS]:r.ONE,[US]:r.SRC_COLOR,[sd]:r.SRC_ALPHA,[zS]:r.SRC_ALPHA_SATURATE,[PS]:r.DST_COLOR,[NS]:r.DST_ALPHA,[LS]:r.ONE_MINUS_SRC_COLOR,[rd]:r.ONE_MINUS_SRC_ALPHA,[IS]:r.ONE_MINUS_DST_COLOR,[OS]:r.ONE_MINUS_DST_ALPHA,[FS]:r.CONSTANT_COLOR,[BS]:r.ONE_MINUS_CONSTANT_COLOR,[HS]:r.CONSTANT_ALPHA,[GS]:r.ONE_MINUS_CONSTANT_ALPHA};function K(tt,qt,Ht,Kt,It,Nt,kt,me,Be,De){if(tt===Sa){A===!0&&(it(r.BLEND),A=!1);return}if(A===!1&&(C(r.BLEND),A=!0),tt!==bS){if(tt!==y||De!==D){if((v!==Os||N!==Os)&&(r.blendEquation(r.FUNC_ADD),v=Os,N=Os),De)switch(tt){case Vr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case su:r.blendFunc(r.ONE,r.ONE);break;case f_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case h_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ue("WebGLState: Invalid blending: ",tt);break}else switch(tt){case Vr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case su:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case f_:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case h_:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",tt);break}P=null,w=null,F=null,H=null,z.set(0,0,0),Z=0,y=tt,D=De}return}It=It||qt,Nt=Nt||Ht,kt=kt||Kt,(qt!==v||It!==N)&&(r.blendEquationSeparate(Ft[qt],Ft[It]),v=qt,N=It),(Ht!==P||Kt!==w||Nt!==F||kt!==H)&&(r.blendFuncSeparate(Ot[Ht],Ot[Kt],Ot[Nt],Ot[kt]),P=Ht,w=Kt,F=Nt,H=kt),(me.equals(z)===!1||Be!==Z)&&(r.blendColor(me.r,me.g,me.b,Be),z.copy(me),Z=Be),y=tt,D=!1}function st(tt,qt){tt.side===Hi?it(r.CULL_FACE):C(r.CULL_FACE);let Ht=tt.side===Kn;qt&&(Ht=!Ht),ct(Ht),tt.blending===Vr&&tt.transparent===!1?K(Sa):K(tt.blending,tt.blendEquation,tt.blendSrc,tt.blendDst,tt.blendEquationAlpha,tt.blendSrcAlpha,tt.blendDstAlpha,tt.blendColor,tt.blendAlpha,tt.premultipliedAlpha),f.setFunc(tt.depthFunc),f.setTest(tt.depthTest),f.setMask(tt.depthWrite),c.setMask(tt.colorWrite);const Kt=tt.stencilWrite;h.setTest(Kt),Kt&&(h.setMask(tt.stencilWriteMask),h.setFunc(tt.stencilFunc,tt.stencilRef,tt.stencilFuncMask),h.setOp(tt.stencilFail,tt.stencilZFail,tt.stencilZPass)),G(tt.polygonOffset,tt.polygonOffsetFactor,tt.polygonOffsetUnits),tt.alphaToCoverage===!0?C(r.SAMPLE_ALPHA_TO_COVERAGE):it(r.SAMPLE_ALPHA_TO_COVERAGE)}function ct(tt){O!==tt&&(tt?r.frontFace(r.CW):r.frontFace(r.CCW),O=tt)}function Mt(tt){tt!==SS?(C(r.CULL_FACE),tt!==q&&(tt===u_?r.cullFace(r.BACK):tt===MS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):it(r.CULL_FACE),q=tt}function T(tt){tt!==$&&(V&&r.lineWidth(tt),$=tt)}function G(tt,qt,Ht){tt?(C(r.POLYGON_OFFSET_FILL),(ot!==qt||gt!==Ht)&&(r.polygonOffset(qt,Ht),ot=qt,gt=Ht)):it(r.POLYGON_OFFSET_FILL)}function Et(tt){tt?C(r.SCISSOR_TEST):it(r.SCISSOR_TEST)}function Gt(tt){tt===void 0&&(tt=r.TEXTURE0+dt-1),Rt!==tt&&(r.activeTexture(tt),Rt=tt)}function zt(tt,qt,Ht){Ht===void 0&&(Rt===null?Ht=r.TEXTURE0+dt-1:Ht=Rt);let Kt=bt[Ht];Kt===void 0&&(Kt={type:void 0,texture:void 0},bt[Ht]=Kt),(Kt.type!==tt||Kt.texture!==qt)&&(Rt!==Ht&&(r.activeTexture(Ht),Rt=Ht),r.bindTexture(tt,qt||R[tt]),Kt.type=tt,Kt.texture=qt)}function I(){const tt=bt[Rt];tt!==void 0&&tt.type!==void 0&&(r.bindTexture(tt.type,null),tt.type=void 0,tt.texture=void 0)}function E(){try{r.compressedTexImage2D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function J(){try{r.compressedTexImage3D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function xt(){try{r.texSubImage2D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function Dt(){try{r.texSubImage3D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function yt(){try{r.compressedTexSubImage2D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function te(){try{r.compressedTexSubImage3D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function Vt(){try{r.texStorage2D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function ee(){try{r.texStorage3D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function le(){try{r.texImage2D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function Pt(){try{r.texImage3D(...arguments)}catch(tt){Ue("WebGLState:",tt)}}function Bt(tt){At.equals(tt)===!1&&(r.scissor(tt.x,tt.y,tt.z,tt.w),At.copy(tt))}function Qt(tt){j.equals(tt)===!1&&(r.viewport(tt.x,tt.y,tt.z,tt.w),j.copy(tt))}function Zt(tt,qt){let Ht=p.get(qt);Ht===void 0&&(Ht=new WeakMap,p.set(qt,Ht));let Kt=Ht.get(tt);Kt===void 0&&(Kt=r.getUniformBlockIndex(qt,tt.name),Ht.set(tt,Kt))}function Xt(tt,qt){const Kt=p.get(qt).get(tt);m.get(qt)!==Kt&&(r.uniformBlockBinding(qt,Kt,tt.__bindingPointIndex),m.set(qt,Kt))}function xe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},Rt=null,bt={},g={},x=new WeakMap,M=[],b=null,A=!1,y=null,v=null,P=null,w=null,N=null,F=null,H=null,z=new we(0,0,0),Z=0,D=!1,O=null,q=null,$=null,ot=null,gt=null,At.set(0,0,r.canvas.width,r.canvas.height),j.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:C,disable:it,bindFramebuffer:_t,drawBuffers:et,useProgram:Lt,setBlending:K,setMaterial:st,setFlipSided:ct,setCullFace:Mt,setLineWidth:T,setPolygonOffset:G,setScissorTest:Et,activeTexture:Gt,bindTexture:zt,unbindTexture:I,compressedTexImage2D:E,compressedTexImage3D:J,texImage2D:le,texImage3D:Pt,updateUBOMapping:Zt,uniformBlockBinding:Xt,texStorage2D:Vt,texStorage3D:ee,texSubImage2D:xt,texSubImage3D:Dt,compressedTexSubImage2D:yt,compressedTexSubImage3D:te,scissor:Bt,viewport:Qt,reset:xe}}function cR(r,t,n,s,l,c,f){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ut,_=new WeakMap;let g;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(I,E){return M?new OffscreenCanvas(I,E):lu("canvas")}function A(I,E,J){let xt=1;const Dt=zt(I);if((Dt.width>J||Dt.height>J)&&(xt=J/Math.max(Dt.width,Dt.height)),xt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const yt=Math.floor(xt*Dt.width),te=Math.floor(xt*Dt.height);g===void 0&&(g=b(yt,te));const Vt=E?b(yt,te):g;return Vt.width=yt,Vt.height=te,Vt.getContext("2d").drawImage(I,0,0,yt,te),pe("WebGLRenderer: Texture has been resized from ("+Dt.width+"x"+Dt.height+") to ("+yt+"x"+te+")."),Vt}else return"data"in I&&pe("WebGLRenderer: Image in DataTexture is too big ("+Dt.width+"x"+Dt.height+")."),I;return I}function y(I){return I.generateMipmaps}function v(I){r.generateMipmap(I)}function P(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function w(I,E,J,xt,Dt=!1){if(I!==null){if(r[I]!==void 0)return r[I];pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let yt=E;if(E===r.RED&&(J===r.FLOAT&&(yt=r.R32F),J===r.HALF_FLOAT&&(yt=r.R16F),J===r.UNSIGNED_BYTE&&(yt=r.R8)),E===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(yt=r.R8UI),J===r.UNSIGNED_SHORT&&(yt=r.R16UI),J===r.UNSIGNED_INT&&(yt=r.R32UI),J===r.BYTE&&(yt=r.R8I),J===r.SHORT&&(yt=r.R16I),J===r.INT&&(yt=r.R32I)),E===r.RG&&(J===r.FLOAT&&(yt=r.RG32F),J===r.HALF_FLOAT&&(yt=r.RG16F),J===r.UNSIGNED_BYTE&&(yt=r.RG8)),E===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(yt=r.RG8UI),J===r.UNSIGNED_SHORT&&(yt=r.RG16UI),J===r.UNSIGNED_INT&&(yt=r.RG32UI),J===r.BYTE&&(yt=r.RG8I),J===r.SHORT&&(yt=r.RG16I),J===r.INT&&(yt=r.RG32I)),E===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(yt=r.RGB8UI),J===r.UNSIGNED_SHORT&&(yt=r.RGB16UI),J===r.UNSIGNED_INT&&(yt=r.RGB32UI),J===r.BYTE&&(yt=r.RGB8I),J===r.SHORT&&(yt=r.RGB16I),J===r.INT&&(yt=r.RGB32I)),E===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(yt=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(yt=r.RGBA16UI),J===r.UNSIGNED_INT&&(yt=r.RGBA32UI),J===r.BYTE&&(yt=r.RGBA8I),J===r.SHORT&&(yt=r.RGBA16I),J===r.INT&&(yt=r.RGBA32I)),E===r.RGB&&(J===r.UNSIGNED_INT_5_9_9_9_REV&&(yt=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(yt=r.R11F_G11F_B10F)),E===r.RGBA){const te=Dt?ru:Le.getTransfer(xt);J===r.FLOAT&&(yt=r.RGBA32F),J===r.HALF_FLOAT&&(yt=r.RGBA16F),J===r.UNSIGNED_BYTE&&(yt=te===ke?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT_4_4_4_4&&(yt=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(yt=r.RGB5_A1)}return(yt===r.R16F||yt===r.R32F||yt===r.RG16F||yt===r.RG32F||yt===r.RGBA16F||yt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),yt}function N(I,E){let J;return I?E===null||E===qi||E===ll?J=r.DEPTH24_STENCIL8:E===Gi?J=r.DEPTH32F_STENCIL8:E===ol&&(J=r.DEPTH24_STENCIL8,pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===qi||E===ll?J=r.DEPTH_COMPONENT24:E===Gi?J=r.DEPTH_COMPONENT32F:E===ol&&(J=r.DEPTH_COMPONENT16),J}function F(I,E){return y(I)===!0||I.isFramebufferTexture&&I.minFilter!==Un&&I.minFilter!==zn?Math.log2(Math.max(E.width,E.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?E.mipmaps.length:1}function H(I){const E=I.target;E.removeEventListener("dispose",H),Z(E),E.isVideoTexture&&_.delete(E)}function z(I){const E=I.target;E.removeEventListener("dispose",z),O(E)}function Z(I){const E=s.get(I);if(E.__webglInit===void 0)return;const J=I.source,xt=x.get(J);if(xt){const Dt=xt[E.__cacheKey];Dt.usedTimes--,Dt.usedTimes===0&&D(I),Object.keys(xt).length===0&&x.delete(J)}s.remove(I)}function D(I){const E=s.get(I);r.deleteTexture(E.__webglTexture);const J=I.source,xt=x.get(J);delete xt[E.__cacheKey],f.memory.textures--}function O(I){const E=s.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),s.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let xt=0;xt<6;xt++){if(Array.isArray(E.__webglFramebuffer[xt]))for(let Dt=0;Dt<E.__webglFramebuffer[xt].length;Dt++)r.deleteFramebuffer(E.__webglFramebuffer[xt][Dt]);else r.deleteFramebuffer(E.__webglFramebuffer[xt]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[xt])}else{if(Array.isArray(E.__webglFramebuffer))for(let xt=0;xt<E.__webglFramebuffer.length;xt++)r.deleteFramebuffer(E.__webglFramebuffer[xt]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let xt=0;xt<E.__webglColorRenderbuffer.length;xt++)E.__webglColorRenderbuffer[xt]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[xt]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const J=I.textures;for(let xt=0,Dt=J.length;xt<Dt;xt++){const yt=s.get(J[xt]);yt.__webglTexture&&(r.deleteTexture(yt.__webglTexture),f.memory.textures--),s.remove(J[xt])}s.remove(I)}let q=0;function $(){q=0}function ot(){const I=q;return I>=l.maxTextures&&pe("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+l.maxTextures),q+=1,I}function gt(I){const E=[];return E.push(I.wrapS),E.push(I.wrapT),E.push(I.wrapR||0),E.push(I.magFilter),E.push(I.minFilter),E.push(I.anisotropy),E.push(I.internalFormat),E.push(I.format),E.push(I.type),E.push(I.generateMipmaps),E.push(I.premultiplyAlpha),E.push(I.flipY),E.push(I.unpackAlignment),E.push(I.colorSpace),E.join()}function dt(I,E){const J=s.get(I);if(I.isVideoTexture&&Et(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&J.__version!==I.version){const xt=I.image;if(xt===null)pe("WebGLRenderer: Texture marked for update but no image data found.");else if(xt.complete===!1)pe("WebGLRenderer: Texture marked for update but image is incomplete");else{R(J,I,E);return}}else I.isExternalTexture&&(J.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+E)}function V(I,E){const J=s.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&J.__version!==I.version){R(J,I,E);return}else I.isExternalTexture&&(J.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+E)}function k(I,E){const J=s.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&J.__version!==I.version){R(J,I,E);return}n.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+E)}function W(I,E){const J=s.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&J.__version!==I.version){C(J,I,E);return}n.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+E)}const Rt={[gd]:r.REPEAT,[ya]:r.CLAMP_TO_EDGE,[_d]:r.MIRRORED_REPEAT},bt={[Un]:r.NEAREST,[XS]:r.NEAREST_MIPMAP_NEAREST,[Cc]:r.NEAREST_MIPMAP_LINEAR,[zn]:r.LINEAR,[bh]:r.LINEAR_MIPMAP_NEAREST,[Is]:r.LINEAR_MIPMAP_LINEAR},B={[YS]:r.NEVER,[JS]:r.ALWAYS,[jS]:r.LESS,[up]:r.LEQUAL,[ZS]:r.EQUAL,[fp]:r.GEQUAL,[KS]:r.GREATER,[QS]:r.NOTEQUAL};function ut(I,E){if(E.type===Gi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===zn||E.magFilter===bh||E.magFilter===Cc||E.magFilter===Is||E.minFilter===zn||E.minFilter===bh||E.minFilter===Cc||E.minFilter===Is)&&pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,Rt[E.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,Rt[E.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,Rt[E.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,bt[E.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,bt[E.minFilter]),E.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,B[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Un||E.minFilter!==Cc&&E.minFilter!==Is||E.type===Gi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");r.texParameterf(I,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function At(I,E){let J=!1;I.__webglInit===void 0&&(I.__webglInit=!0,E.addEventListener("dispose",H));const xt=E.source;let Dt=x.get(xt);Dt===void 0&&(Dt={},x.set(xt,Dt));const yt=gt(E);if(yt!==I.__cacheKey){Dt[yt]===void 0&&(Dt[yt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,J=!0),Dt[yt].usedTimes++;const te=Dt[I.__cacheKey];te!==void 0&&(Dt[I.__cacheKey].usedTimes--,te.usedTimes===0&&D(E)),I.__cacheKey=yt,I.__webglTexture=Dt[yt].texture}return J}function j(I,E,J){return Math.floor(Math.floor(I/J)/E)}function X(I,E,J,xt){const yt=I.updateRanges;if(yt.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,J,xt,E.data);else{yt.sort((Pt,Bt)=>Pt.start-Bt.start);let te=0;for(let Pt=1;Pt<yt.length;Pt++){const Bt=yt[te],Qt=yt[Pt],Zt=Bt.start+Bt.count,Xt=j(Qt.start,E.width,4),xe=j(Bt.start,E.width,4);Qt.start<=Zt+1&&Xt===xe&&j(Qt.start+Qt.count-1,E.width,4)===Xt?Bt.count=Math.max(Bt.count,Qt.start+Qt.count-Bt.start):(++te,yt[te]=Qt)}yt.length=te+1;const Vt=r.getParameter(r.UNPACK_ROW_LENGTH),ee=r.getParameter(r.UNPACK_SKIP_PIXELS),le=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let Pt=0,Bt=yt.length;Pt<Bt;Pt++){const Qt=yt[Pt],Zt=Math.floor(Qt.start/4),Xt=Math.ceil(Qt.count/4),xe=Zt%E.width,tt=Math.floor(Zt/E.width),qt=Xt,Ht=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,xe),r.pixelStorei(r.UNPACK_SKIP_ROWS,tt),n.texSubImage2D(r.TEXTURE_2D,0,xe,tt,qt,Ht,J,xt,E.data)}I.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Vt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ee),r.pixelStorei(r.UNPACK_SKIP_ROWS,le)}}function R(I,E,J){let xt=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(xt=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(xt=r.TEXTURE_3D);const Dt=At(I,E),yt=E.source;n.bindTexture(xt,I.__webglTexture,r.TEXTURE0+J);const te=s.get(yt);if(yt.version!==te.__version||Dt===!0){n.activeTexture(r.TEXTURE0+J);const Vt=Le.getPrimaries(Le.workingColorSpace),ee=E.colorSpace===as?null:Le.getPrimaries(E.colorSpace),le=E.colorSpace===as||Vt===ee?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let Pt=A(E.image,!1,l.maxTextureSize);Pt=Gt(E,Pt);const Bt=c.convert(E.format,E.colorSpace),Qt=c.convert(E.type);let Zt=w(E.internalFormat,Bt,Qt,E.colorSpace,E.isVideoTexture);ut(xt,E);let Xt;const xe=E.mipmaps,tt=E.isVideoTexture!==!0,qt=te.__version===void 0||Dt===!0,Ht=yt.dataReady,Kt=F(E,Pt);if(E.isDepthTexture)Zt=N(E.format===zs,E.type),qt&&(tt?n.texStorage2D(r.TEXTURE_2D,1,Zt,Pt.width,Pt.height):n.texImage2D(r.TEXTURE_2D,0,Zt,Pt.width,Pt.height,0,Bt,Qt,null));else if(E.isDataTexture)if(xe.length>0){tt&&qt&&n.texStorage2D(r.TEXTURE_2D,Kt,Zt,xe[0].width,xe[0].height);for(let It=0,Nt=xe.length;It<Nt;It++)Xt=xe[It],tt?Ht&&n.texSubImage2D(r.TEXTURE_2D,It,0,0,Xt.width,Xt.height,Bt,Qt,Xt.data):n.texImage2D(r.TEXTURE_2D,It,Zt,Xt.width,Xt.height,0,Bt,Qt,Xt.data);E.generateMipmaps=!1}else tt?(qt&&n.texStorage2D(r.TEXTURE_2D,Kt,Zt,Pt.width,Pt.height),Ht&&X(E,Pt,Bt,Qt)):n.texImage2D(r.TEXTURE_2D,0,Zt,Pt.width,Pt.height,0,Bt,Qt,Pt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){tt&&qt&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Kt,Zt,xe[0].width,xe[0].height,Pt.depth);for(let It=0,Nt=xe.length;It<Nt;It++)if(Xt=xe[It],E.format!==Ui)if(Bt!==null)if(tt){if(Ht)if(E.layerUpdates.size>0){const kt=X_(Xt.width,Xt.height,E.format,E.type);for(const me of E.layerUpdates){const Be=Xt.data.subarray(me*kt/Xt.data.BYTES_PER_ELEMENT,(me+1)*kt/Xt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,It,0,0,me,Xt.width,Xt.height,1,Bt,Be)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,It,0,0,0,Xt.width,Xt.height,Pt.depth,Bt,Xt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,It,Zt,Xt.width,Xt.height,Pt.depth,0,Xt.data,0,0);else pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else tt?Ht&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,It,0,0,0,Xt.width,Xt.height,Pt.depth,Bt,Qt,Xt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,It,Zt,Xt.width,Xt.height,Pt.depth,0,Bt,Qt,Xt.data)}else{tt&&qt&&n.texStorage2D(r.TEXTURE_2D,Kt,Zt,xe[0].width,xe[0].height);for(let It=0,Nt=xe.length;It<Nt;It++)Xt=xe[It],E.format!==Ui?Bt!==null?tt?Ht&&n.compressedTexSubImage2D(r.TEXTURE_2D,It,0,0,Xt.width,Xt.height,Bt,Xt.data):n.compressedTexImage2D(r.TEXTURE_2D,It,Zt,Xt.width,Xt.height,0,Xt.data):pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?Ht&&n.texSubImage2D(r.TEXTURE_2D,It,0,0,Xt.width,Xt.height,Bt,Qt,Xt.data):n.texImage2D(r.TEXTURE_2D,It,Zt,Xt.width,Xt.height,0,Bt,Qt,Xt.data)}else if(E.isDataArrayTexture)if(tt){if(qt&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Kt,Zt,Pt.width,Pt.height,Pt.depth),Ht)if(E.layerUpdates.size>0){const It=X_(Pt.width,Pt.height,E.format,E.type);for(const Nt of E.layerUpdates){const kt=Pt.data.subarray(Nt*It/Pt.data.BYTES_PER_ELEMENT,(Nt+1)*It/Pt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Nt,Pt.width,Pt.height,1,Bt,Qt,kt)}E.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Pt.width,Pt.height,Pt.depth,Bt,Qt,Pt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Zt,Pt.width,Pt.height,Pt.depth,0,Bt,Qt,Pt.data);else if(E.isData3DTexture)tt?(qt&&n.texStorage3D(r.TEXTURE_3D,Kt,Zt,Pt.width,Pt.height,Pt.depth),Ht&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Pt.width,Pt.height,Pt.depth,Bt,Qt,Pt.data)):n.texImage3D(r.TEXTURE_3D,0,Zt,Pt.width,Pt.height,Pt.depth,0,Bt,Qt,Pt.data);else if(E.isFramebufferTexture){if(qt)if(tt)n.texStorage2D(r.TEXTURE_2D,Kt,Zt,Pt.width,Pt.height);else{let It=Pt.width,Nt=Pt.height;for(let kt=0;kt<Kt;kt++)n.texImage2D(r.TEXTURE_2D,kt,Zt,It,Nt,0,Bt,Qt,null),It>>=1,Nt>>=1}}else if(xe.length>0){if(tt&&qt){const It=zt(xe[0]);n.texStorage2D(r.TEXTURE_2D,Kt,Zt,It.width,It.height)}for(let It=0,Nt=xe.length;It<Nt;It++)Xt=xe[It],tt?Ht&&n.texSubImage2D(r.TEXTURE_2D,It,0,0,Bt,Qt,Xt):n.texImage2D(r.TEXTURE_2D,It,Zt,Bt,Qt,Xt);E.generateMipmaps=!1}else if(tt){if(qt){const It=zt(Pt);n.texStorage2D(r.TEXTURE_2D,Kt,Zt,It.width,It.height)}Ht&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Qt,Pt)}else n.texImage2D(r.TEXTURE_2D,0,Zt,Bt,Qt,Pt);y(E)&&v(xt),te.__version=yt.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function C(I,E,J){if(E.image.length!==6)return;const xt=At(I,E),Dt=E.source;n.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+J);const yt=s.get(Dt);if(Dt.version!==yt.__version||xt===!0){n.activeTexture(r.TEXTURE0+J);const te=Le.getPrimaries(Le.workingColorSpace),Vt=E.colorSpace===as?null:Le.getPrimaries(E.colorSpace),ee=E.colorSpace===as||te===Vt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const le=E.isCompressedTexture||E.image[0].isCompressedTexture,Pt=E.image[0]&&E.image[0].isDataTexture,Bt=[];for(let Nt=0;Nt<6;Nt++)!le&&!Pt?Bt[Nt]=A(E.image[Nt],!0,l.maxCubemapSize):Bt[Nt]=Pt?E.image[Nt].image:E.image[Nt],Bt[Nt]=Gt(E,Bt[Nt]);const Qt=Bt[0],Zt=c.convert(E.format,E.colorSpace),Xt=c.convert(E.type),xe=w(E.internalFormat,Zt,Xt,E.colorSpace),tt=E.isVideoTexture!==!0,qt=yt.__version===void 0||xt===!0,Ht=Dt.dataReady;let Kt=F(E,Qt);ut(r.TEXTURE_CUBE_MAP,E);let It;if(le){tt&&qt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Kt,xe,Qt.width,Qt.height);for(let Nt=0;Nt<6;Nt++){It=Bt[Nt].mipmaps;for(let kt=0;kt<It.length;kt++){const me=It[kt];E.format!==Ui?Zt!==null?tt?Ht&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt,0,0,me.width,me.height,Zt,me.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt,xe,me.width,me.height,0,me.data):pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):tt?Ht&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt,0,0,me.width,me.height,Zt,Xt,me.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt,xe,me.width,me.height,0,Zt,Xt,me.data)}}}else{if(It=E.mipmaps,tt&&qt){It.length>0&&Kt++;const Nt=zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Kt,xe,Nt.width,Nt.height)}for(let Nt=0;Nt<6;Nt++)if(Pt){tt?Ht&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,0,0,Bt[Nt].width,Bt[Nt].height,Zt,Xt,Bt[Nt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,xe,Bt[Nt].width,Bt[Nt].height,0,Zt,Xt,Bt[Nt].data);for(let kt=0;kt<It.length;kt++){const Be=It[kt].image[Nt].image;tt?Ht&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt+1,0,0,Be.width,Be.height,Zt,Xt,Be.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt+1,xe,Be.width,Be.height,0,Zt,Xt,Be.data)}}else{tt?Ht&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,0,0,Zt,Xt,Bt[Nt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,xe,Zt,Xt,Bt[Nt]);for(let kt=0;kt<It.length;kt++){const me=It[kt];tt?Ht&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt+1,0,0,Zt,Xt,me.image[Nt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,kt+1,xe,Zt,Xt,me.image[Nt])}}}y(E)&&v(r.TEXTURE_CUBE_MAP),yt.__version=Dt.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function it(I,E,J,xt,Dt,yt){const te=c.convert(J.format,J.colorSpace),Vt=c.convert(J.type),ee=w(J.internalFormat,te,Vt,J.colorSpace),le=s.get(E),Pt=s.get(J);if(Pt.__renderTarget=E,!le.__hasExternalTextures){const Bt=Math.max(1,E.width>>yt),Qt=Math.max(1,E.height>>yt);Dt===r.TEXTURE_3D||Dt===r.TEXTURE_2D_ARRAY?n.texImage3D(Dt,yt,ee,Bt,Qt,E.depth,0,te,Vt,null):n.texImage2D(Dt,yt,ee,Bt,Qt,0,te,Vt,null)}n.bindFramebuffer(r.FRAMEBUFFER,I),G(E)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xt,Dt,Pt.__webglTexture,0,T(E)):(Dt===r.TEXTURE_2D||Dt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Dt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,xt,Dt,Pt.__webglTexture,yt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function _t(I,E,J){if(r.bindRenderbuffer(r.RENDERBUFFER,I),E.depthBuffer){const xt=E.depthTexture,Dt=xt&&xt.isDepthTexture?xt.type:null,yt=N(E.stencilBuffer,Dt),te=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;G(E)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,T(E),yt,E.width,E.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,T(E),yt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,yt,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,I)}else{const xt=E.textures;for(let Dt=0;Dt<xt.length;Dt++){const yt=xt[Dt],te=c.convert(yt.format,yt.colorSpace),Vt=c.convert(yt.type),ee=w(yt.internalFormat,te,Vt,yt.colorSpace);G(E)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,T(E),ee,E.width,E.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,T(E),ee,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ee,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function et(I,E,J){const xt=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,I),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Dt=s.get(E.depthTexture);if(Dt.__renderTarget=E,(!Dt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),xt){if(Dt.__webglInit===void 0&&(Dt.__webglInit=!0,E.depthTexture.addEventListener("dispose",H)),Dt.__webglTexture===void 0){Dt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,Dt.__webglTexture),ut(r.TEXTURE_CUBE_MAP,E.depthTexture);const le=c.convert(E.depthTexture.format),Pt=c.convert(E.depthTexture.type);let Bt;E.depthTexture.format===ba?Bt=r.DEPTH_COMPONENT24:E.depthTexture.format===zs&&(Bt=r.DEPTH24_STENCIL8);for(let Qt=0;Qt<6;Qt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Qt,0,Bt,E.width,E.height,0,le,Pt,null)}}else dt(E.depthTexture,0);const yt=Dt.__webglTexture,te=T(E),Vt=xt?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,ee=E.depthTexture.format===zs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===ba)G(E)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,Vt,yt,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,ee,Vt,yt,0);else if(E.depthTexture.format===zs)G(E)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,Vt,yt,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,ee,Vt,yt,0);else throw new Error("Unknown depthTexture format")}function Lt(I){const E=s.get(I),J=I.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==I.depthTexture){const xt=I.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),xt){const Dt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,xt.removeEventListener("dispose",Dt)};xt.addEventListener("dispose",Dt),E.__depthDisposeCallback=Dt}E.__boundDepthTexture=xt}if(I.depthTexture&&!E.__autoAllocateDepthBuffer)if(J)for(let xt=0;xt<6;xt++)et(E.__webglFramebuffer[xt],I,xt);else{const xt=I.texture.mipmaps;xt&&xt.length>0?et(E.__webglFramebuffer[0],I,0):et(E.__webglFramebuffer,I,0)}else if(J){E.__webglDepthbuffer=[];for(let xt=0;xt<6;xt++)if(n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[xt]),E.__webglDepthbuffer[xt]===void 0)E.__webglDepthbuffer[xt]=r.createRenderbuffer(),_t(E.__webglDepthbuffer[xt],I,!1);else{const Dt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,yt=E.__webglDepthbuffer[xt];r.bindRenderbuffer(r.RENDERBUFFER,yt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Dt,r.RENDERBUFFER,yt)}}else{const xt=I.texture.mipmaps;if(xt&&xt.length>0?n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),_t(E.__webglDepthbuffer,I,!1);else{const Dt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,yt=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,yt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Dt,r.RENDERBUFFER,yt)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ft(I,E,J){const xt=s.get(I);E!==void 0&&it(xt.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&Lt(I)}function Ot(I){const E=I.texture,J=s.get(I),xt=s.get(E);I.addEventListener("dispose",z);const Dt=I.textures,yt=I.isWebGLCubeRenderTarget===!0,te=Dt.length>1;if(te||(xt.__webglTexture===void 0&&(xt.__webglTexture=r.createTexture()),xt.__version=E.version,f.memory.textures++),yt){J.__webglFramebuffer=[];for(let Vt=0;Vt<6;Vt++)if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[Vt]=[];for(let ee=0;ee<E.mipmaps.length;ee++)J.__webglFramebuffer[Vt][ee]=r.createFramebuffer()}else J.__webglFramebuffer[Vt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let Vt=0;Vt<E.mipmaps.length;Vt++)J.__webglFramebuffer[Vt]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(te)for(let Vt=0,ee=Dt.length;Vt<ee;Vt++){const le=s.get(Dt[Vt]);le.__webglTexture===void 0&&(le.__webglTexture=r.createTexture(),f.memory.textures++)}if(I.samples>0&&G(I)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Vt=0;Vt<Dt.length;Vt++){const ee=Dt[Vt];J.__webglColorRenderbuffer[Vt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[Vt]);const le=c.convert(ee.format,ee.colorSpace),Pt=c.convert(ee.type),Bt=w(ee.internalFormat,le,Pt,ee.colorSpace,I.isXRRenderTarget===!0),Qt=T(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Qt,Bt,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Vt,r.RENDERBUFFER,J.__webglColorRenderbuffer[Vt])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),_t(J.__webglDepthRenderbuffer,I,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(yt){n.bindTexture(r.TEXTURE_CUBE_MAP,xt.__webglTexture),ut(r.TEXTURE_CUBE_MAP,E);for(let Vt=0;Vt<6;Vt++)if(E.mipmaps&&E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)it(J.__webglFramebuffer[Vt][ee],I,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Vt,ee);else it(J.__webglFramebuffer[Vt],I,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Vt,0);y(E)&&v(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(te){for(let Vt=0,ee=Dt.length;Vt<ee;Vt++){const le=Dt[Vt],Pt=s.get(le);let Bt=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Bt=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Bt,Pt.__webglTexture),ut(Bt,le),it(J.__webglFramebuffer,I,le,r.COLOR_ATTACHMENT0+Vt,Bt,0),y(le)&&v(Bt)}n.unbindTexture()}else{let Vt=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Vt=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Vt,xt.__webglTexture),ut(Vt,E),E.mipmaps&&E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)it(J.__webglFramebuffer[ee],I,E,r.COLOR_ATTACHMENT0,Vt,ee);else it(J.__webglFramebuffer,I,E,r.COLOR_ATTACHMENT0,Vt,0);y(E)&&v(Vt),n.unbindTexture()}I.depthBuffer&&Lt(I)}function K(I){const E=I.textures;for(let J=0,xt=E.length;J<xt;J++){const Dt=E[J];if(y(Dt)){const yt=P(I),te=s.get(Dt).__webglTexture;n.bindTexture(yt,te),v(yt),n.unbindTexture()}}}const st=[],ct=[];function Mt(I){if(I.samples>0){if(G(I)===!1){const E=I.textures,J=I.width,xt=I.height;let Dt=r.COLOR_BUFFER_BIT;const yt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=s.get(I),Vt=E.length>1;if(Vt)for(let le=0;le<E.length;le++)n.bindFramebuffer(r.FRAMEBUFFER,te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,te.__webglMultisampledFramebuffer);const ee=I.texture.mipmaps;ee&&ee.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,te.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,te.__webglFramebuffer);for(let le=0;le<E.length;le++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Dt|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Dt|=r.STENCIL_BUFFER_BIT)),Vt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,te.__webglColorRenderbuffer[le]);const Pt=s.get(E[le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Pt,0)}r.blitFramebuffer(0,0,J,xt,0,0,J,xt,Dt,r.NEAREST),m===!0&&(st.length=0,ct.length=0,st.push(r.COLOR_ATTACHMENT0+le),I.depthBuffer&&I.resolveDepthBuffer===!1&&(st.push(yt),ct.push(yt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ct)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,st))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Vt)for(let le=0;le<E.length;le++){n.bindFramebuffer(r.FRAMEBUFFER,te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.RENDERBUFFER,te.__webglColorRenderbuffer[le]);const Pt=s.get(E[le]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.TEXTURE_2D,Pt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,te.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&m){const E=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function T(I){return Math.min(l.maxSamples,I.samples)}function G(I){const E=s.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Et(I){const E=f.render.frame;_.get(I)!==E&&(_.set(I,E),I.update())}function Gt(I,E){const J=I.colorSpace,xt=I.format,Dt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||J!==jr&&J!==as&&(Le.getTransfer(J)===ke?(xt!==Ui||Dt!==oi)&&pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",J)),E}function zt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(p.width=I.naturalWidth||I.width,p.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(p.width=I.displayWidth,p.height=I.displayHeight):(p.width=I.width,p.height=I.height),p}this.allocateTextureUnit=ot,this.resetTextureUnits=$,this.setTexture2D=dt,this.setTexture2DArray=V,this.setTexture3D=k,this.setTextureCube=W,this.rebindTextures=Ft,this.setupRenderTarget=Ot,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=G,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function uR(r,t){function n(s,l=as){let c;const f=Le.getTransfer(l);if(s===oi)return r.UNSIGNED_BYTE;if(s===sp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===rp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Rv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Cv)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Tv)return r.BYTE;if(s===Av)return r.SHORT;if(s===ol)return r.UNSIGNED_SHORT;if(s===ap)return r.INT;if(s===qi)return r.UNSIGNED_INT;if(s===Gi)return r.FLOAT;if(s===Ea)return r.HALF_FLOAT;if(s===wv)return r.ALPHA;if(s===Dv)return r.RGB;if(s===Ui)return r.RGBA;if(s===ba)return r.DEPTH_COMPONENT;if(s===zs)return r.DEPTH_STENCIL;if(s===Uv)return r.RED;if(s===op)return r.RED_INTEGER;if(s===Yr)return r.RG;if(s===lp)return r.RG_INTEGER;if(s===cp)return r.RGBA_INTEGER;if(s===$c||s===tu||s===eu||s===nu)if(f===ke)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===$c)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===tu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===$c)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===tu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===eu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===nu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===vd||s===xd||s===yd||s===Sd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===vd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===xd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===yd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Sd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Md||s===Ed||s===bd||s===Td||s===Ad||s===Rd||s===Cd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Md||s===Ed)return f===ke?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===bd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Td)return c.COMPRESSED_R11_EAC;if(s===Ad)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Rd)return c.COMPRESSED_RG11_EAC;if(s===Cd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===wd||s===Dd||s===Ud||s===Ld||s===Nd||s===Od||s===Pd||s===Id||s===zd||s===Fd||s===Bd||s===Hd||s===Gd||s===Vd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===wd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Dd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ud)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ld)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Nd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Od)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Pd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Id)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===zd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Fd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Bd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Hd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Gd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Vd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===kd||s===Xd||s===Wd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===kd)return f===ke?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Xd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Wd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===qd||s===Yd||s===jd||s===Zd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===qd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Yd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ll?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:n}}const fR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const s=new Wv(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,s=new ji({vertexShader:fR,fragmentShader:hR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Li(new fu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pR extends Vs{constructor(t,n){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,_=null,g=null,x=null,M=null,b=null;const A=typeof XRWebGLBinding<"u",y=new dR,v={},P=n.getContextAttributes();let w=null,N=null;const F=[],H=[],z=new Ut;let Z=null;const D=new xi;D.viewport=new sn;const O=new xi;O.viewport=new sn;const q=[D,O],$=new ME;let ot=null,gt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let C=F[R];return C===void 0&&(C=new qh,F[R]=C),C.getTargetRaySpace()},this.getControllerGrip=function(R){let C=F[R];return C===void 0&&(C=new qh,F[R]=C),C.getGripSpace()},this.getHand=function(R){let C=F[R];return C===void 0&&(C=new qh,F[R]=C),C.getHandSpace()};function dt(R){const C=H.indexOf(R.inputSource);if(C===-1)return;const it=F[C];it!==void 0&&(it.update(R.inputSource,R.frame,p||f),it.dispatchEvent({type:R.type,data:R.inputSource}))}function V(){l.removeEventListener("select",dt),l.removeEventListener("selectstart",dt),l.removeEventListener("selectend",dt),l.removeEventListener("squeeze",dt),l.removeEventListener("squeezestart",dt),l.removeEventListener("squeezeend",dt),l.removeEventListener("end",V),l.removeEventListener("inputsourceschange",k);for(let R=0;R<F.length;R++){const C=H[R];C!==null&&(H[R]=null,F[R].disconnect(C))}ot=null,gt=null,y.reset();for(const R in v)delete v[R];t.setRenderTarget(w),M=null,x=null,g=null,l=null,N=null,X.stop(),s.isPresenting=!1,t.setPixelRatio(Z),t.setSize(z.width,z.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(R){c=R,s.isPresenting===!0&&pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){h=R,s.isPresenting===!0&&pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(R){p=R},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return g===null&&A&&(g=new XRWebGLBinding(l,n)),g},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(R){if(l=R,l!==null){if(w=t.getRenderTarget(),l.addEventListener("select",dt),l.addEventListener("selectstart",dt),l.addEventListener("selectend",dt),l.addEventListener("squeeze",dt),l.addEventListener("squeezestart",dt),l.addEventListener("squeezeend",dt),l.addEventListener("end",V),l.addEventListener("inputsourceschange",k),P.xrCompatible!==!0&&await n.makeXRCompatible(),Z=t.getPixelRatio(),t.getSize(z),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,_t=null,et=null;P.depth&&(et=P.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,it=P.stencil?zs:ba,_t=P.stencil?ll:qi);const Lt={colorFormat:n.RGBA8,depthFormat:et,scaleFactor:c};g=this.getBinding(),x=g.createProjectionLayer(Lt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),N=new Xi(x.textureWidth,x.textureHeight,{format:Ui,type:oi,depthTexture:new ul(x.textureWidth,x.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:P.stencil,colorSpace:t.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const it={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,it),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),N=new Xi(M.framebufferWidth,M.framebufferHeight,{format:Ui,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}N.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),X.setContext(l),X.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function k(R){for(let C=0;C<R.removed.length;C++){const it=R.removed[C],_t=H.indexOf(it);_t>=0&&(H[_t]=null,F[_t].disconnect(it))}for(let C=0;C<R.added.length;C++){const it=R.added[C];let _t=H.indexOf(it);if(_t===-1){for(let Lt=0;Lt<F.length;Lt++)if(Lt>=H.length){H.push(it),_t=Lt;break}else if(H[Lt]===null){H[Lt]=it,_t=Lt;break}if(_t===-1)break}const et=F[_t];et&&et.connect(it)}}const W=new nt,Rt=new nt;function bt(R,C,it){W.setFromMatrixPosition(C.matrixWorld),Rt.setFromMatrixPosition(it.matrixWorld);const _t=W.distanceTo(Rt),et=C.projectionMatrix.elements,Lt=it.projectionMatrix.elements,Ft=et[14]/(et[10]-1),Ot=et[14]/(et[10]+1),K=(et[9]+1)/et[5],st=(et[9]-1)/et[5],ct=(et[8]-1)/et[0],Mt=(Lt[8]+1)/Lt[0],T=Ft*ct,G=Ft*Mt,Et=_t/(-ct+Mt),Gt=Et*-ct;if(C.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(Gt),R.translateZ(Et),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),et[10]===-1)R.projectionMatrix.copy(C.projectionMatrix),R.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{const zt=Ft+Et,I=Ot+Et,E=T-Gt,J=G+(_t-Gt),xt=K*Ot/I*zt,Dt=st*Ot/I*zt;R.projectionMatrix.makePerspective(E,J,xt,Dt,zt,I),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}}function B(R,C){C===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(C.matrixWorld,R.matrix),R.matrixWorldInverse.copy(R.matrixWorld).invert()}this.updateCamera=function(R){if(l===null)return;let C=R.near,it=R.far;y.texture!==null&&(y.depthNear>0&&(C=y.depthNear),y.depthFar>0&&(it=y.depthFar)),$.near=O.near=D.near=C,$.far=O.far=D.far=it,(ot!==$.near||gt!==$.far)&&(l.updateRenderState({depthNear:$.near,depthFar:$.far}),ot=$.near,gt=$.far),$.layers.mask=R.layers.mask|6,D.layers.mask=$.layers.mask&3,O.layers.mask=$.layers.mask&5;const _t=R.parent,et=$.cameras;B($,_t);for(let Lt=0;Lt<et.length;Lt++)B(et[Lt],_t);et.length===2?bt($,D,O):$.projectionMatrix.copy(D.projectionMatrix),ut(R,$,_t)};function ut(R,C,it){it===null?R.matrix.copy(C.matrixWorld):(R.matrix.copy(it.matrixWorld),R.matrix.invert(),R.matrix.multiply(C.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(C.projectionMatrix),R.projectionMatrixInverse.copy(C.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=Kd*2*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(R){m=R,x!==null&&(x.fixedFoveation=R),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=R)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh($)},this.getCameraTexture=function(R){return v[R]};let At=null;function j(R,C){if(_=C.getViewerPose(p||f),b=C,_!==null){const it=_.views;M!==null&&(t.setRenderTargetFramebuffer(N,M.framebuffer),t.setRenderTarget(N));let _t=!1;it.length!==$.cameras.length&&($.cameras.length=0,_t=!0);for(let Ot=0;Ot<it.length;Ot++){const K=it[Ot];let st=null;if(M!==null)st=M.getViewport(K);else{const Mt=g.getViewSubImage(x,K);st=Mt.viewport,Ot===0&&(t.setRenderTargetTextures(N,Mt.colorTexture,Mt.depthStencilTexture),t.setRenderTarget(N))}let ct=q[Ot];ct===void 0&&(ct=new xi,ct.layers.enable(Ot),ct.viewport=new sn,q[Ot]=ct),ct.matrix.fromArray(K.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(K.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(st.x,st.y,st.width,st.height),Ot===0&&($.matrix.copy(ct.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),_t===!0&&$.cameras.push(ct)}const et=l.enabledFeatures;if(et&&et.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&A){g=s.getBinding();const Ot=g.getDepthInformation(it[0]);Ot&&Ot.isValid&&Ot.texture&&y.init(Ot,l.renderState)}if(et&&et.includes("camera-access")&&A){t.state.unbindTexture(),g=s.getBinding();for(let Ot=0;Ot<it.length;Ot++){const K=it[Ot].camera;if(K){let st=v[K];st||(st=new Wv,v[K]=st);const ct=g.getCameraImage(K);st.sourceTexture=ct}}}}for(let it=0;it<F.length;it++){const _t=H[it],et=F[it];_t!==null&&et!==void 0&&et.update(_t,C,p||f)}At&&At(R,C),C.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:C}),b=null}const X=new ex;X.setAnimationLoop(j),this.setAnimationLoop=function(R){At=R},this.dispose=function(){}}}const Ns=new Yi,mR=new en;function gR(r,t){function n(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function s(y,v){v.color.getRGB(y.fogColor.value,Gv(r)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function l(y,v,P,w,N){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(y,v):v.isMeshToonMaterial?(c(y,v),g(y,v)):v.isMeshPhongMaterial?(c(y,v),_(y,v)):v.isMeshStandardMaterial?(c(y,v),x(y,v),v.isMeshPhysicalMaterial&&M(y,v,N)):v.isMeshMatcapMaterial?(c(y,v),b(y,v)):v.isMeshDepthMaterial?c(y,v):v.isMeshDistanceMaterial?(c(y,v),A(y,v)):v.isMeshNormalMaterial?c(y,v):v.isLineBasicMaterial?(f(y,v),v.isLineDashedMaterial&&h(y,v)):v.isPointsMaterial?m(y,v,P,w):v.isSpriteMaterial?p(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,n(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,n(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,n(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===Kn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,n(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===Kn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,n(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,n(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const P=t.get(v),w=P.envMap,N=P.envMapRotation;w&&(y.envMap.value=w,Ns.copy(N),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),y.envMapRotation.value.setFromMatrix4(mR.makeRotationFromEuler(Ns)),y.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,y.aoMapTransform))}function f(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,n(v.map,y.mapTransform))}function h(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function m(y,v,P,w){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*P,y.scale.value=w*.5,v.map&&(y.map.value=v.map,n(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,n(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function p(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,n(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,n(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function _(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function g(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function x(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function M(y,v,P){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Kn&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=P.texture,y.transmissionSamplerSize.value.set(P.width,P.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,y.specularIntensityMapTransform))}function b(y,v){v.matcap&&(y.matcap.value=v.matcap)}function A(y,v){const P=t.get(v).light;y.referencePosition.value.setFromMatrixPosition(P.matrixWorld),y.nearDistance.value=P.shadow.camera.near,y.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function _R(r,t,n,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(P,w){const N=w.program;s.uniformBlockBinding(P,N)}function p(P,w){let N=l[P.id];N===void 0&&(b(P),N=_(P),l[P.id]=N,P.addEventListener("dispose",y));const F=w.program;s.updateUBOMapping(P,F);const H=t.render.frame;c[P.id]!==H&&(x(P),c[P.id]=H)}function _(P){const w=g();P.__bindingPointIndex=w;const N=r.createBuffer(),F=P.__size,H=P.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,F,H),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,N),N}function g(){for(let P=0;P<h;P++)if(f.indexOf(P)===-1)return f.push(P),P;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(P){const w=l[P.id],N=P.uniforms,F=P.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let H=0,z=N.length;H<z;H++){const Z=Array.isArray(N[H])?N[H]:[N[H]];for(let D=0,O=Z.length;D<O;D++){const q=Z[D];if(M(q,H,D,F)===!0){const $=q.__offset,ot=Array.isArray(q.value)?q.value:[q.value];let gt=0;for(let dt=0;dt<ot.length;dt++){const V=ot[dt],k=A(V);typeof V=="number"||typeof V=="boolean"?(q.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,$+gt,q.__data)):V.isMatrix3?(q.__data[0]=V.elements[0],q.__data[1]=V.elements[1],q.__data[2]=V.elements[2],q.__data[3]=0,q.__data[4]=V.elements[3],q.__data[5]=V.elements[4],q.__data[6]=V.elements[5],q.__data[7]=0,q.__data[8]=V.elements[6],q.__data[9]=V.elements[7],q.__data[10]=V.elements[8],q.__data[11]=0):(V.toArray(q.__data,gt),gt+=k.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,$,q.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(P,w,N,F){const H=P.value,z=w+"_"+N;if(F[z]===void 0)return typeof H=="number"||typeof H=="boolean"?F[z]=H:F[z]=H.clone(),!0;{const Z=F[z];if(typeof H=="number"||typeof H=="boolean"){if(Z!==H)return F[z]=H,!0}else if(Z.equals(H)===!1)return Z.copy(H),!0}return!1}function b(P){const w=P.uniforms;let N=0;const F=16;for(let z=0,Z=w.length;z<Z;z++){const D=Array.isArray(w[z])?w[z]:[w[z]];for(let O=0,q=D.length;O<q;O++){const $=D[O],ot=Array.isArray($.value)?$.value:[$.value];for(let gt=0,dt=ot.length;gt<dt;gt++){const V=ot[gt],k=A(V),W=N%F,Rt=W%k.boundary,bt=W+Rt;N+=Rt,bt!==0&&F-bt<k.storage&&(N+=F-bt),$.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=N,N+=k.storage}}}const H=N%F;return H>0&&(N+=F-H),P.__size=N,P.__cache={},this}function A(P){const w={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(w.boundary=4,w.storage=4):P.isVector2?(w.boundary=8,w.storage=8):P.isVector3||P.isColor?(w.boundary=16,w.storage=12):P.isVector4?(w.boundary=16,w.storage=16):P.isMatrix3?(w.boundary=48,w.storage=48):P.isMatrix4?(w.boundary=64,w.storage=64):P.isTexture?pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):pe("WebGLRenderer: Unsupported uniform value type.",P),w}function y(P){const w=P.target;w.removeEventListener("dispose",y);const N=f.indexOf(w.__bindingPointIndex);f.splice(N,1),r.deleteBuffer(l[w.id]),delete l[w.id],delete c[w.id]}function v(){for(const P in l)r.deleteBuffer(l[P]);f=[],l={},c={}}return{bind:m,update:p,dispose:v}}const vR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fi=null;function xR(){return Fi===null&&(Fi=new RM(vR,16,16,Yr,Ea),Fi.name="DFG_LUT",Fi.minFilter=zn,Fi.magFilter=zn,Fi.wrapS=ya,Fi.wrapT=ya,Fi.generateMipmaps=!1,Fi.needsUpdate=!0),Fi}class yR{constructor(t={}){const{canvas:n=$S(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:x=!1,outputBufferType:M=oi}=t;this.isWebGLRenderer=!0;let b;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=s.getContextAttributes().alpha}else b=f;const A=M,y=new Set([cp,lp,op]),v=new Set([oi,qi,ol,ll,sp,rp]),P=new Uint32Array(4),w=new Int32Array(4);let N=null,F=null;const H=[],z=[];let Z=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let O=!1;this._outputColorSpace=ri;let q=0,$=0,ot=null,gt=-1,dt=null;const V=new sn,k=new sn;let W=null;const Rt=new we(0);let bt=0,B=n.width,ut=n.height,At=1,j=null,X=null;const R=new sn(0,0,B,ut),C=new sn(0,0,B,ut);let it=!1;const _t=new pp;let et=!1,Lt=!1;const Ft=new en,Ot=new nt,K=new sn,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Mt(){return ot===null?At:1}let T=s;function G(L,at){return n.getContext(L,at)}try{const L={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:g};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ip}`),n.addEventListener("webglcontextlost",me,!1),n.addEventListener("webglcontextrestored",Be,!1),n.addEventListener("webglcontextcreationerror",De,!1),T===null){const at="webgl2";if(T=G(at,L),T===null)throw G(at)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw Ue("WebGLRenderer: "+L.message),L}let Et,Gt,zt,I,E,J,xt,Dt,yt,te,Vt,ee,le,Pt,Bt,Qt,Zt,Xt,xe,tt,qt,Ht,Kt,It;function Nt(){Et=new xT(T),Et.init(),Ht=new uR(T,Et),Gt=new uT(T,Et,t,Ht),zt=new lR(T,Et),Gt.reversedDepthBuffer&&x&&zt.buffers.depth.setReversed(!0),I=new MT(T),E=new YA,J=new cR(T,Et,zt,E,Gt,Ht,I),xt=new hT(D),Dt=new vT(D),yt=new AE(T),Kt=new lT(T,yt),te=new yT(T,yt,I,Kt),Vt=new bT(T,te,yt,I),xe=new ET(T,Gt,J),Qt=new fT(E),ee=new qA(D,xt,Dt,Et,Gt,Kt,Qt),le=new gR(D,E),Pt=new ZA,Bt=new eR(Et),Xt=new oT(D,xt,Dt,zt,Vt,b,m),Zt=new rR(D,Vt,Gt),It=new _R(T,I,Gt,zt),tt=new cT(T,Et,I),qt=new ST(T,Et,I),I.programs=ee.programs,D.capabilities=Gt,D.extensions=Et,D.properties=E,D.renderLists=Pt,D.shadowMap=Zt,D.state=zt,D.info=I}Nt(),A!==oi&&(Z=new AT(A,n.width,n.height,l,c));const kt=new pR(D,T);this.xr=kt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const L=Et.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Et.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return At},this.setPixelRatio=function(L){L!==void 0&&(At=L,this.setSize(B,ut,!1))},this.getSize=function(L){return L.set(B,ut)},this.setSize=function(L,at,vt=!0){if(kt.isPresenting){pe("WebGLRenderer: Can't change size while VR device is presenting.");return}B=L,ut=at,n.width=Math.floor(L*At),n.height=Math.floor(at*At),vt===!0&&(n.style.width=L+"px",n.style.height=at+"px"),Z!==null&&Z.setSize(n.width,n.height),this.setViewport(0,0,L,at)},this.getDrawingBufferSize=function(L){return L.set(B*At,ut*At).floor()},this.setDrawingBufferSize=function(L,at,vt){B=L,ut=at,At=vt,n.width=Math.floor(L*vt),n.height=Math.floor(at*vt),this.setViewport(0,0,L,at)},this.setEffects=function(L){if(A===oi){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(L){for(let at=0;at<L.length;at++)if(L[at].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}Z.setEffects(L||[])},this.getCurrentViewport=function(L){return L.copy(V)},this.getViewport=function(L){return L.copy(R)},this.setViewport=function(L,at,vt,pt){L.isVector4?R.set(L.x,L.y,L.z,L.w):R.set(L,at,vt,pt),zt.viewport(V.copy(R).multiplyScalar(At).round())},this.getScissor=function(L){return L.copy(C)},this.setScissor=function(L,at,vt,pt){L.isVector4?C.set(L.x,L.y,L.z,L.w):C.set(L,at,vt,pt),zt.scissor(k.copy(C).multiplyScalar(At).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(L){zt.setScissorTest(it=L)},this.setOpaqueSort=function(L){j=L},this.setTransparentSort=function(L){X=L},this.getClearColor=function(L){return L.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(L=!0,at=!0,vt=!0){let pt=0;if(L){let lt=!1;if(ot!==null){const Wt=ot.texture.format;lt=y.has(Wt)}if(lt){const Wt=ot.texture.type,$t=v.has(Wt),Yt=Xt.getClearColor(),ne=Xt.getClearAlpha(),ae=Yt.r,ue=Yt.g,se=Yt.b;$t?(P[0]=ae,P[1]=ue,P[2]=se,P[3]=ne,T.clearBufferuiv(T.COLOR,0,P)):(w[0]=ae,w[1]=ue,w[2]=se,w[3]=ne,T.clearBufferiv(T.COLOR,0,w))}else pt|=T.COLOR_BUFFER_BIT}at&&(pt|=T.DEPTH_BUFFER_BIT),vt&&(pt|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(pt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",me,!1),n.removeEventListener("webglcontextrestored",Be,!1),n.removeEventListener("webglcontextcreationerror",De,!1),Xt.dispose(),Pt.dispose(),Bt.dispose(),E.dispose(),xt.dispose(),Dt.dispose(),Vt.dispose(),Kt.dispose(),It.dispose(),ee.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",Xs),kt.removeEventListener("sessionend",eo),Ni.stop()};function me(L){L.preventDefault(),__("WebGLRenderer: Context Lost."),O=!0}function Be(){__("WebGLRenderer: Context Restored."),O=!1;const L=I.autoReset,at=Zt.enabled,vt=Zt.autoUpdate,pt=Zt.needsUpdate,lt=Zt.type;Nt(),I.autoReset=L,Zt.enabled=at,Zt.autoUpdate=vt,Zt.needsUpdate=pt,Zt.type=lt}function De(L){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Nn(L){const at=L.target;at.removeEventListener("dispose",Nn),Si(at)}function Si(L){_l(L),E.remove(L)}function _l(L){const at=E.get(L).programs;at!==void 0&&(at.forEach(function(vt){ee.releaseProgram(vt)}),L.isShaderMaterial&&ee.releaseShaderCache(L))}this.renderBufferDirect=function(L,at,vt,pt,lt,Wt){at===null&&(at=st);const $t=lt.isMesh&&lt.matrixWorld.determinant()<0,Yt=cs(L,at,vt,pt,lt);zt.setMaterial(pt,$t);let ne=vt.index,ae=1;if(pt.wireframe===!0){if(ne=te.getWireframeAttribute(vt),ne===void 0)return;ae=2}const ue=vt.drawRange,se=vt.attributes.position;let fe=ue.start*ae,Pe=(ue.start+ue.count)*ae;Wt!==null&&(fe=Math.max(fe,Wt.start*ae),Pe=Math.min(Pe,(Wt.start+Wt.count)*ae)),ne!==null?(fe=Math.max(fe,0),Pe=Math.min(Pe,ne.count)):se!=null&&(fe=Math.max(fe,0),Pe=Math.min(Pe,se.count));const Je=Pe-fe;if(Je<0||Je===1/0)return;Kt.setup(lt,pt,Yt,vt,ne);let Ze,Fe=tt;if(ne!==null&&(Ze=yt.get(ne),Fe=qt,Fe.setIndex(Ze)),lt.isMesh)pt.wireframe===!0?(zt.setLineWidth(pt.wireframeLinewidth*Mt()),Fe.setMode(T.LINES)):Fe.setMode(T.TRIANGLES);else if(lt.isLine){let oe=pt.linewidth;oe===void 0&&(oe=1),zt.setLineWidth(oe*Mt()),lt.isLineSegments?Fe.setMode(T.LINES):lt.isLineLoop?Fe.setMode(T.LINE_LOOP):Fe.setMode(T.LINE_STRIP)}else lt.isPoints?Fe.setMode(T.POINTS):lt.isSprite&&Fe.setMode(T.TRIANGLES);if(lt.isBatchedMesh)if(lt._multiDrawInstances!==null)cl("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Fe.renderMultiDrawInstances(lt._multiDrawStarts,lt._multiDrawCounts,lt._multiDrawCount,lt._multiDrawInstances);else if(Et.get("WEBGL_multi_draw"))Fe.renderMultiDraw(lt._multiDrawStarts,lt._multiDrawCounts,lt._multiDrawCount);else{const oe=lt._multiDrawStarts,Ie=lt._multiDrawCounts,ge=lt._multiDrawCount,Mn=ne?yt.get(ne).bytesPerElement:1,Ki=E.get(pt).currentProgram.getUniforms();for(let En=0;En<ge;En++)Ki.setValue(T,"_gl_DrawID",En),Fe.render(oe[En]/Mn,Ie[En])}else if(lt.isInstancedMesh)Fe.renderInstances(fe,Je,lt.count);else if(vt.isInstancedBufferGeometry){const oe=vt._maxInstanceCount!==void 0?vt._maxInstanceCount:1/0,Ie=Math.min(vt.instanceCount,oe);Fe.renderInstances(fe,Je,Ie)}else Fe.render(fe,Je)};function $r(L,at,vt){L.transparent===!0&&L.side===Hi&&L.forceSinglePass===!1?(L.side=Kn,L.needsUpdate=!0,qs(L,at,vt),L.side=ls,L.needsUpdate=!0,qs(L,at,vt),L.side=Hi):qs(L,at,vt)}this.compile=function(L,at,vt=null){vt===null&&(vt=L),F=Bt.get(vt),F.init(at),z.push(F),vt.traverseVisible(function(lt){lt.isLight&&lt.layers.test(at.layers)&&(F.pushLight(lt),lt.castShadow&&F.pushShadow(lt))}),L!==vt&&L.traverseVisible(function(lt){lt.isLight&&lt.layers.test(at.layers)&&(F.pushLight(lt),lt.castShadow&&F.pushShadow(lt))}),F.setupLights();const pt=new Set;return L.traverse(function(lt){if(!(lt.isMesh||lt.isPoints||lt.isLine||lt.isSprite))return;const Wt=lt.material;if(Wt)if(Array.isArray(Wt))for(let $t=0;$t<Wt.length;$t++){const Yt=Wt[$t];$r(Yt,vt,lt),pt.add(Yt)}else $r(Wt,vt,lt),pt.add(Wt)}),F=z.pop(),pt},this.compileAsync=function(L,at,vt=null){const pt=this.compile(L,at,vt);return new Promise(lt=>{function Wt(){if(pt.forEach(function($t){E.get($t).currentProgram.isReady()&&pt.delete($t)}),pt.size===0){lt(L);return}setTimeout(Wt,10)}Et.get("KHR_parallel_shader_compile")!==null?Wt():setTimeout(Wt,10)})};let ks=null;function to(L){ks&&ks(L)}function Xs(){Ni.stop()}function eo(){Ni.start()}const Ni=new ex;Ni.setAnimationLoop(to),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(L){ks=L,kt.setAnimationLoop(L),L===null?Ni.stop():Ni.start()},kt.addEventListener("sessionstart",Xs),kt.addEventListener("sessionend",eo),this.render=function(L,at){if(at!==void 0&&at.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;const vt=kt.enabled===!0&&kt.isPresenting===!0,pt=Z!==null&&(ot===null||vt)&&Z.begin(D,ot);if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),at.parent===null&&at.matrixWorldAutoUpdate===!0&&at.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(Z===null||Z.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(at),at=kt.getCamera()),L.isScene===!0&&L.onBeforeRender(D,L,at,ot),F=Bt.get(L,z.length),F.init(at),z.push(F),Ft.multiplyMatrices(at.projectionMatrix,at.matrixWorldInverse),_t.setFromProjectionMatrix(Ft,Vi,at.reversedDepth),Lt=this.localClippingEnabled,et=Qt.init(this.clippingPlanes,Lt),N=Pt.get(L,H.length),N.init(),H.push(N),kt.enabled===!0&&kt.isPresenting===!0){const $t=D.xr.getDepthSensingMesh();$t!==null&&li($t,at,-1/0,D.sortObjects)}li(L,at,0,D.sortObjects),N.finish(),D.sortObjects===!0&&N.sort(j,X),ct=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,ct&&Xt.addToRenderList(N,L),this.info.render.frame++,et===!0&&Qt.beginShadows();const lt=F.state.shadowsArray;if(Zt.render(lt,L,at),et===!0&&Qt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(pt&&Z.hasRenderPass())===!1){const $t=N.opaque,Yt=N.transmissive;if(F.setupLights(),at.isArrayCamera){const ne=at.cameras;if(Yt.length>0)for(let ae=0,ue=ne.length;ae<ue;ae++){const se=ne[ae];Sn($t,Yt,L,se)}ct&&Xt.render(L);for(let ae=0,ue=ne.length;ae<ue;ae++){const se=ne[ae];ln(N,L,se,se.viewport)}}else Yt.length>0&&Sn($t,Yt,L,at),ct&&Xt.render(L),ln(N,L,at)}ot!==null&&$===0&&(J.updateMultisampleRenderTarget(ot),J.updateRenderTargetMipmap(ot)),pt&&Z.end(D),L.isScene===!0&&L.onAfterRender(D,L,at),Kt.resetDefaultState(),gt=-1,dt=null,z.pop(),z.length>0?(F=z[z.length-1],et===!0&&Qt.setGlobalState(D.clippingPlanes,F.state.camera)):F=null,H.pop(),H.length>0?N=H[H.length-1]:N=null};function li(L,at,vt,pt){if(L.visible===!1)return;if(L.layers.test(at.layers)){if(L.isGroup)vt=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(at);else if(L.isLight)F.pushLight(L),L.castShadow&&F.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||_t.intersectsSprite(L)){pt&&K.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Ft);const $t=Vt.update(L),Yt=L.material;Yt.visible&&N.push(L,$t,Yt,vt,K.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||_t.intersectsObject(L))){const $t=Vt.update(L),Yt=L.material;if(pt&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),K.copy(L.boundingSphere.center)):($t.boundingSphere===null&&$t.computeBoundingSphere(),K.copy($t.boundingSphere.center)),K.applyMatrix4(L.matrixWorld).applyMatrix4(Ft)),Array.isArray(Yt)){const ne=$t.groups;for(let ae=0,ue=ne.length;ae<ue;ae++){const se=ne[ae],fe=Yt[se.materialIndex];fe&&fe.visible&&N.push(L,$t,fe,vt,K.z,se)}}else Yt.visible&&N.push(L,$t,Yt,vt,K.z,null)}}const Wt=L.children;for(let $t=0,Yt=Wt.length;$t<Yt;$t++)li(Wt[$t],at,vt,pt)}function ln(L,at,vt,pt){const{opaque:lt,transmissive:Wt,transparent:$t}=L;F.setupLightsView(vt),et===!0&&Qt.setGlobalState(D.clippingPlanes,vt),pt&&zt.viewport(V.copy(pt)),lt.length>0&&Mi(lt,at,vt),Wt.length>0&&Mi(Wt,at,vt),$t.length>0&&Mi($t,at,vt),zt.buffers.depth.setTest(!0),zt.buffers.depth.setMask(!0),zt.buffers.color.setMask(!0),zt.setPolygonOffset(!1)}function Sn(L,at,vt,pt){if((vt.isScene===!0?vt.overrideMaterial:null)!==null)return;if(F.state.transmissionRenderTarget[pt.id]===void 0){const fe=Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float");F.state.transmissionRenderTarget[pt.id]=new Xi(1,1,{generateMipmaps:!0,type:fe?Ea:oi,minFilter:Is,samples:Gt.samples,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Le.workingColorSpace})}const Wt=F.state.transmissionRenderTarget[pt.id],$t=pt.viewport||V;Wt.setSize($t.z*D.transmissionResolutionScale,$t.w*D.transmissionResolutionScale);const Yt=D.getRenderTarget(),ne=D.getActiveCubeFace(),ae=D.getActiveMipmapLevel();D.setRenderTarget(Wt),D.getClearColor(Rt),bt=D.getClearAlpha(),bt<1&&D.setClearColor(16777215,.5),D.clear(),ct&&Xt.render(vt);const ue=D.toneMapping;D.toneMapping=ki;const se=pt.viewport;if(pt.viewport!==void 0&&(pt.viewport=void 0),F.setupLightsView(pt),et===!0&&Qt.setGlobalState(D.clippingPlanes,pt),Mi(L,vt,pt),J.updateMultisampleRenderTarget(Wt),J.updateRenderTargetMipmap(Wt),Et.has("WEBGL_multisampled_render_to_texture")===!1){let fe=!1;for(let Pe=0,Je=at.length;Pe<Je;Pe++){const Ze=at[Pe],{object:Fe,geometry:oe,material:Ie,group:ge}=Ze;if(Ie.side===Hi&&Fe.layers.test(pt.layers)){const Mn=Ie.side;Ie.side=Kn,Ie.needsUpdate=!0,Ws(Fe,vt,pt,oe,Ie,ge),Ie.side=Mn,Ie.needsUpdate=!0,fe=!0}}fe===!0&&(J.updateMultisampleRenderTarget(Wt),J.updateRenderTargetMipmap(Wt))}D.setRenderTarget(Yt,ne,ae),D.setClearColor(Rt,bt),se!==void 0&&(pt.viewport=se),D.toneMapping=ue}function Mi(L,at,vt){const pt=at.isScene===!0?at.overrideMaterial:null;for(let lt=0,Wt=L.length;lt<Wt;lt++){const $t=L[lt],{object:Yt,geometry:ne,group:ae}=$t;let ue=$t.material;ue.allowOverride===!0&&pt!==null&&(ue=pt),Yt.layers.test(vt.layers)&&Ws(Yt,at,vt,ne,ue,ae)}}function Ws(L,at,vt,pt,lt,Wt){L.onBeforeRender(D,at,vt,pt,lt,Wt),L.modelViewMatrix.multiplyMatrices(vt.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),lt.onBeforeRender(D,at,vt,pt,L,Wt),lt.transparent===!0&&lt.side===Hi&&lt.forceSinglePass===!1?(lt.side=Kn,lt.needsUpdate=!0,D.renderBufferDirect(vt,at,pt,lt,L,Wt),lt.side=ls,lt.needsUpdate=!0,D.renderBufferDirect(vt,at,pt,lt,L,Wt),lt.side=Hi):D.renderBufferDirect(vt,at,pt,lt,L,Wt),L.onAfterRender(D,at,vt,pt,lt,Wt)}function qs(L,at,vt){at.isScene!==!0&&(at=st);const pt=E.get(L),lt=F.state.lights,Wt=F.state.shadowsArray,$t=lt.state.version,Yt=ee.getParameters(L,lt.state,Wt,at,vt),ne=ee.getProgramCacheKey(Yt);let ae=pt.programs;pt.environment=L.isMeshStandardMaterial?at.environment:null,pt.fog=at.fog,pt.envMap=(L.isMeshStandardMaterial?Dt:xt).get(L.envMap||pt.environment),pt.envMapRotation=pt.environment!==null&&L.envMap===null?at.environmentRotation:L.envMapRotation,ae===void 0&&(L.addEventListener("dispose",Nn),ae=new Map,pt.programs=ae);let ue=ae.get(ne);if(ue!==void 0){if(pt.currentProgram===ue&&pt.lightsStateVersion===$t)return no(L,Yt),ue}else Yt.uniforms=ee.getUniforms(L),L.onBeforeCompile(Yt,D),ue=ee.acquireProgram(Yt,ne),ae.set(ne,ue),pt.uniforms=Yt.uniforms;const se=pt.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(se.clippingPlanes=Qt.uniform),no(L,Yt),pt.needsLights=Ta(L),pt.lightsStateVersion=$t,pt.needsLights&&(se.ambientLightColor.value=lt.state.ambient,se.lightProbe.value=lt.state.probe,se.directionalLights.value=lt.state.directional,se.directionalLightShadows.value=lt.state.directionalShadow,se.spotLights.value=lt.state.spot,se.spotLightShadows.value=lt.state.spotShadow,se.rectAreaLights.value=lt.state.rectArea,se.ltc_1.value=lt.state.rectAreaLTC1,se.ltc_2.value=lt.state.rectAreaLTC2,se.pointLights.value=lt.state.point,se.pointLightShadows.value=lt.state.pointShadow,se.hemisphereLights.value=lt.state.hemi,se.directionalShadowMap.value=lt.state.directionalShadowMap,se.directionalShadowMatrix.value=lt.state.directionalShadowMatrix,se.spotShadowMap.value=lt.state.spotShadowMap,se.spotLightMatrix.value=lt.state.spotLightMatrix,se.spotLightMap.value=lt.state.spotLightMap,se.pointShadowMap.value=lt.state.pointShadowMap,se.pointShadowMatrix.value=lt.state.pointShadowMatrix),pt.currentProgram=ue,pt.uniformsList=null,ue}function vl(L){if(L.uniformsList===null){const at=L.currentProgram.getUniforms();L.uniformsList=au.seqWithValue(at.seq,L.uniforms)}return L.uniformsList}function no(L,at){const vt=E.get(L);vt.outputColorSpace=at.outputColorSpace,vt.batching=at.batching,vt.batchingColor=at.batchingColor,vt.instancing=at.instancing,vt.instancingColor=at.instancingColor,vt.instancingMorph=at.instancingMorph,vt.skinning=at.skinning,vt.morphTargets=at.morphTargets,vt.morphNormals=at.morphNormals,vt.morphColors=at.morphColors,vt.morphTargetsCount=at.morphTargetsCount,vt.numClippingPlanes=at.numClippingPlanes,vt.numIntersection=at.numClipIntersection,vt.vertexAlphas=at.vertexAlphas,vt.vertexTangents=at.vertexTangents,vt.toneMapping=at.toneMapping}function cs(L,at,vt,pt,lt){at.isScene!==!0&&(at=st),J.resetTextureUnits();const Wt=at.fog,$t=pt.isMeshStandardMaterial?at.environment:null,Yt=ot===null?D.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:jr,ne=(pt.isMeshStandardMaterial?Dt:xt).get(pt.envMap||$t),ae=pt.vertexColors===!0&&!!vt.attributes.color&&vt.attributes.color.itemSize===4,ue=!!vt.attributes.tangent&&(!!pt.normalMap||pt.anisotropy>0),se=!!vt.morphAttributes.position,fe=!!vt.morphAttributes.normal,Pe=!!vt.morphAttributes.color;let Je=ki;pt.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Je=D.toneMapping);const Ze=vt.morphAttributes.position||vt.morphAttributes.normal||vt.morphAttributes.color,Fe=Ze!==void 0?Ze.length:0,oe=E.get(pt),Ie=F.state.lights;if(et===!0&&(Lt===!0||L!==dt)){const Tn=L===dt&&pt.id===gt;Qt.setState(pt,L,Tn)}let ge=!1;pt.version===oe.__version?(oe.needsLights&&oe.lightsStateVersion!==Ie.state.version||oe.outputColorSpace!==Yt||lt.isBatchedMesh&&oe.batching===!1||!lt.isBatchedMesh&&oe.batching===!0||lt.isBatchedMesh&&oe.batchingColor===!0&&lt.colorTexture===null||lt.isBatchedMesh&&oe.batchingColor===!1&&lt.colorTexture!==null||lt.isInstancedMesh&&oe.instancing===!1||!lt.isInstancedMesh&&oe.instancing===!0||lt.isSkinnedMesh&&oe.skinning===!1||!lt.isSkinnedMesh&&oe.skinning===!0||lt.isInstancedMesh&&oe.instancingColor===!0&&lt.instanceColor===null||lt.isInstancedMesh&&oe.instancingColor===!1&&lt.instanceColor!==null||lt.isInstancedMesh&&oe.instancingMorph===!0&&lt.morphTexture===null||lt.isInstancedMesh&&oe.instancingMorph===!1&&lt.morphTexture!==null||oe.envMap!==ne||pt.fog===!0&&oe.fog!==Wt||oe.numClippingPlanes!==void 0&&(oe.numClippingPlanes!==Qt.numPlanes||oe.numIntersection!==Qt.numIntersection)||oe.vertexAlphas!==ae||oe.vertexTangents!==ue||oe.morphTargets!==se||oe.morphNormals!==fe||oe.morphColors!==Pe||oe.toneMapping!==Je||oe.morphTargetsCount!==Fe)&&(ge=!0):(ge=!0,oe.__version=pt.version);let Mn=oe.currentProgram;ge===!0&&(Mn=qs(pt,at,lt));let Ki=!1,En=!1,ci=!1;const He=Mn.getUniforms(),bn=oe.uniforms;if(zt.useProgram(Mn.program)&&(Ki=!0,En=!0,ci=!0),pt.id!==gt&&(gt=pt.id,En=!0),Ki||dt!==L){zt.buffers.depth.getReversed()&&L.reversedDepth!==!0&&(L._reversedDepth=!0,L.updateProjectionMatrix()),He.setValue(T,"projectionMatrix",L.projectionMatrix),He.setValue(T,"viewMatrix",L.matrixWorldInverse);const An=He.map.cameraPosition;An!==void 0&&An.setValue(T,Ot.setFromMatrixPosition(L.matrixWorld)),Gt.logarithmicDepthBuffer&&He.setValue(T,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(pt.isMeshPhongMaterial||pt.isMeshToonMaterial||pt.isMeshLambertMaterial||pt.isMeshBasicMaterial||pt.isMeshStandardMaterial||pt.isShaderMaterial)&&He.setValue(T,"isOrthographic",L.isOrthographicCamera===!0),dt!==L&&(dt=L,En=!0,ci=!0)}if(oe.needsLights&&(Ie.state.directionalShadowMap.length>0&&He.setValue(T,"directionalShadowMap",Ie.state.directionalShadowMap,J),Ie.state.spotShadowMap.length>0&&He.setValue(T,"spotShadowMap",Ie.state.spotShadowMap,J),Ie.state.pointShadowMap.length>0&&He.setValue(T,"pointShadowMap",Ie.state.pointShadowMap,J)),lt.isSkinnedMesh){He.setOptional(T,lt,"bindMatrix"),He.setOptional(T,lt,"bindMatrixInverse");const Tn=lt.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),He.setValue(T,"boneTexture",Tn.boneTexture,J))}lt.isBatchedMesh&&(He.setOptional(T,lt,"batchingTexture"),He.setValue(T,"batchingTexture",lt._matricesTexture,J),He.setOptional(T,lt,"batchingIdTexture"),He.setValue(T,"batchingIdTexture",lt._indirectTexture,J),He.setOptional(T,lt,"batchingColorTexture"),lt._colorsTexture!==null&&He.setValue(T,"batchingColorTexture",lt._colorsTexture,J));const pn=vt.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&xe.update(lt,vt,Mn),(En||oe.receiveShadow!==lt.receiveShadow)&&(oe.receiveShadow=lt.receiveShadow,He.setValue(T,"receiveShadow",lt.receiveShadow)),pt.isMeshGouraudMaterial&&pt.envMap!==null&&(bn.envMap.value=ne,bn.flipEnvMap.value=ne.isCubeTexture&&ne.isRenderTargetTexture===!1?-1:1),pt.isMeshStandardMaterial&&pt.envMap===null&&at.environment!==null&&(bn.envMapIntensity.value=at.environmentIntensity),bn.dfgLUT!==void 0&&(bn.dfgLUT.value=xR()),En&&(He.setValue(T,"toneMappingExposure",D.toneMappingExposure),oe.needsLights&&io(bn,ci),Wt&&pt.fog===!0&&le.refreshFogUniforms(bn,Wt),le.refreshMaterialUniforms(bn,pt,At,ut,F.state.transmissionRenderTarget[L.id]),au.upload(T,vl(oe),bn,J)),pt.isShaderMaterial&&pt.uniformsNeedUpdate===!0&&(au.upload(T,vl(oe),bn,J),pt.uniformsNeedUpdate=!1),pt.isSpriteMaterial&&He.setValue(T,"center",lt.center),He.setValue(T,"modelViewMatrix",lt.modelViewMatrix),He.setValue(T,"normalMatrix",lt.normalMatrix),He.setValue(T,"modelMatrix",lt.matrixWorld),pt.isShaderMaterial||pt.isRawShaderMaterial){const Tn=pt.uniformsGroups;for(let An=0,Ys=Tn.length;An<Ys;An++){const Ei=Tn[An];It.update(Ei,Mn),It.bind(Ei,Mn)}}return Mn}function io(L,at){L.ambientLightColor.needsUpdate=at,L.lightProbe.needsUpdate=at,L.directionalLights.needsUpdate=at,L.directionalLightShadows.needsUpdate=at,L.pointLights.needsUpdate=at,L.pointLightShadows.needsUpdate=at,L.spotLights.needsUpdate=at,L.spotLightShadows.needsUpdate=at,L.rectAreaLights.needsUpdate=at,L.hemisphereLights.needsUpdate=at}function Ta(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ot},this.setRenderTargetTextures=function(L,at,vt){const pt=E.get(L);pt.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,pt.__autoAllocateDepthBuffer===!1&&(pt.__useRenderToTexture=!1),E.get(L.texture).__webglTexture=at,E.get(L.depthTexture).__webglTexture=pt.__autoAllocateDepthBuffer?void 0:vt,pt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,at){const vt=E.get(L);vt.__webglFramebuffer=at,vt.__useDefaultFramebuffer=at===void 0};const Aa=T.createFramebuffer();this.setRenderTarget=function(L,at=0,vt=0){ot=L,q=at,$=vt;let pt=null,lt=!1,Wt=!1;if(L){const Yt=E.get(L);if(Yt.__useDefaultFramebuffer!==void 0){zt.bindFramebuffer(T.FRAMEBUFFER,Yt.__webglFramebuffer),V.copy(L.viewport),k.copy(L.scissor),W=L.scissorTest,zt.viewport(V),zt.scissor(k),zt.setScissorTest(W),gt=-1;return}else if(Yt.__webglFramebuffer===void 0)J.setupRenderTarget(L);else if(Yt.__hasExternalTextures)J.rebindTextures(L,E.get(L.texture).__webglTexture,E.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const ue=L.depthTexture;if(Yt.__boundDepthTexture!==ue){if(ue!==null&&E.has(ue)&&(L.width!==ue.image.width||L.height!==ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(L)}}const ne=L.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Wt=!0);const ae=E.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(ae[at])?pt=ae[at][vt]:pt=ae[at],lt=!0):L.samples>0&&J.useMultisampledRTT(L)===!1?pt=E.get(L).__webglMultisampledFramebuffer:Array.isArray(ae)?pt=ae[vt]:pt=ae,V.copy(L.viewport),k.copy(L.scissor),W=L.scissorTest}else V.copy(R).multiplyScalar(At).floor(),k.copy(C).multiplyScalar(At).floor(),W=it;if(vt!==0&&(pt=Aa),zt.bindFramebuffer(T.FRAMEBUFFER,pt)&&zt.drawBuffers(L,pt),zt.viewport(V),zt.scissor(k),zt.setScissorTest(W),lt){const Yt=E.get(L.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+at,Yt.__webglTexture,vt)}else if(Wt){const Yt=at;for(let ne=0;ne<L.textures.length;ne++){const ae=E.get(L.textures[ne]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+ne,ae.__webglTexture,vt,Yt)}}else if(L!==null&&vt!==0){const Yt=E.get(L.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Yt.__webglTexture,vt)}gt=-1},this.readRenderTargetPixels=function(L,at,vt,pt,lt,Wt,$t,Yt=0){if(!(L&&L.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ne=E.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&$t!==void 0&&(ne=ne[$t]),ne){zt.bindFramebuffer(T.FRAMEBUFFER,ne);try{const ae=L.textures[Yt],ue=ae.format,se=ae.type;if(!Gt.textureFormatReadable(ue)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(se)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}at>=0&&at<=L.width-pt&&vt>=0&&vt<=L.height-lt&&(L.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+Yt),T.readPixels(at,vt,pt,lt,Ht.convert(ue),Ht.convert(se),Wt))}finally{const ae=ot!==null?E.get(ot).__webglFramebuffer:null;zt.bindFramebuffer(T.FRAMEBUFFER,ae)}}},this.readRenderTargetPixelsAsync=async function(L,at,vt,pt,lt,Wt,$t,Yt=0){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ne=E.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&$t!==void 0&&(ne=ne[$t]),ne)if(at>=0&&at<=L.width-pt&&vt>=0&&vt<=L.height-lt){zt.bindFramebuffer(T.FRAMEBUFFER,ne);const ae=L.textures[Yt],ue=ae.format,se=ae.type;if(!Gt.textureFormatReadable(ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const fe=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,fe),T.bufferData(T.PIXEL_PACK_BUFFER,Wt.byteLength,T.STREAM_READ),L.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+Yt),T.readPixels(at,vt,pt,lt,Ht.convert(ue),Ht.convert(se),0);const Pe=ot!==null?E.get(ot).__webglFramebuffer:null;zt.bindFramebuffer(T.FRAMEBUFFER,Pe);const Je=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await tM(T,Je,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,fe),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,Wt),T.deleteBuffer(fe),T.deleteSync(Je),Wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,at=null,vt=0){const pt=Math.pow(2,-vt),lt=Math.floor(L.image.width*pt),Wt=Math.floor(L.image.height*pt),$t=at!==null?at.x:0,Yt=at!==null?at.y:0;J.setTexture2D(L,0),T.copyTexSubImage2D(T.TEXTURE_2D,vt,0,0,$t,Yt,lt,Wt),zt.unbindTexture()};const us=T.createFramebuffer(),Ra=T.createFramebuffer();this.copyTextureToTexture=function(L,at,vt=null,pt=null,lt=0,Wt=null){Wt===null&&(lt!==0?(cl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Wt=lt,lt=0):Wt=0);let $t,Yt,ne,ae,ue,se,fe,Pe,Je;const Ze=L.isCompressedTexture?L.mipmaps[Wt]:L.image;if(vt!==null)$t=vt.max.x-vt.min.x,Yt=vt.max.y-vt.min.y,ne=vt.isBox3?vt.max.z-vt.min.z:1,ae=vt.min.x,ue=vt.min.y,se=vt.isBox3?vt.min.z:0;else{const pn=Math.pow(2,-lt);$t=Math.floor(Ze.width*pn),Yt=Math.floor(Ze.height*pn),L.isDataArrayTexture?ne=Ze.depth:L.isData3DTexture?ne=Math.floor(Ze.depth*pn):ne=1,ae=0,ue=0,se=0}pt!==null?(fe=pt.x,Pe=pt.y,Je=pt.z):(fe=0,Pe=0,Je=0);const Fe=Ht.convert(at.format),oe=Ht.convert(at.type);let Ie;at.isData3DTexture?(J.setTexture3D(at,0),Ie=T.TEXTURE_3D):at.isDataArrayTexture||at.isCompressedArrayTexture?(J.setTexture2DArray(at,0),Ie=T.TEXTURE_2D_ARRAY):(J.setTexture2D(at,0),Ie=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,at.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,at.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,at.unpackAlignment);const ge=T.getParameter(T.UNPACK_ROW_LENGTH),Mn=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Ki=T.getParameter(T.UNPACK_SKIP_PIXELS),En=T.getParameter(T.UNPACK_SKIP_ROWS),ci=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ze.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Ze.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,ae),T.pixelStorei(T.UNPACK_SKIP_ROWS,ue),T.pixelStorei(T.UNPACK_SKIP_IMAGES,se);const He=L.isDataArrayTexture||L.isData3DTexture,bn=at.isDataArrayTexture||at.isData3DTexture;if(L.isDepthTexture){const pn=E.get(L),Tn=E.get(at),An=E.get(pn.__renderTarget),Ys=E.get(Tn.__renderTarget);zt.bindFramebuffer(T.READ_FRAMEBUFFER,An.__webglFramebuffer),zt.bindFramebuffer(T.DRAW_FRAMEBUFFER,Ys.__webglFramebuffer);for(let Ei=0;Ei<ne;Ei++)He&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,E.get(L).__webglTexture,lt,se+Ei),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,E.get(at).__webglTexture,Wt,Je+Ei)),T.blitFramebuffer(ae,ue,$t,Yt,fe,Pe,$t,Yt,T.DEPTH_BUFFER_BIT,T.NEAREST);zt.bindFramebuffer(T.READ_FRAMEBUFFER,null),zt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(lt!==0||L.isRenderTargetTexture||E.has(L)){const pn=E.get(L),Tn=E.get(at);zt.bindFramebuffer(T.READ_FRAMEBUFFER,us),zt.bindFramebuffer(T.DRAW_FRAMEBUFFER,Ra);for(let An=0;An<ne;An++)He?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,pn.__webglTexture,lt,se+An):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,pn.__webglTexture,lt),bn?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Tn.__webglTexture,Wt,Je+An):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Tn.__webglTexture,Wt),lt!==0?T.blitFramebuffer(ae,ue,$t,Yt,fe,Pe,$t,Yt,T.COLOR_BUFFER_BIT,T.NEAREST):bn?T.copyTexSubImage3D(Ie,Wt,fe,Pe,Je+An,ae,ue,$t,Yt):T.copyTexSubImage2D(Ie,Wt,fe,Pe,ae,ue,$t,Yt);zt.bindFramebuffer(T.READ_FRAMEBUFFER,null),zt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else bn?L.isDataTexture||L.isData3DTexture?T.texSubImage3D(Ie,Wt,fe,Pe,Je,$t,Yt,ne,Fe,oe,Ze.data):at.isCompressedArrayTexture?T.compressedTexSubImage3D(Ie,Wt,fe,Pe,Je,$t,Yt,ne,Fe,Ze.data):T.texSubImage3D(Ie,Wt,fe,Pe,Je,$t,Yt,ne,Fe,oe,Ze):L.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,Wt,fe,Pe,$t,Yt,Fe,oe,Ze.data):L.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,Wt,fe,Pe,Ze.width,Ze.height,Fe,Ze.data):T.texSubImage2D(T.TEXTURE_2D,Wt,fe,Pe,$t,Yt,Fe,oe,Ze);T.pixelStorei(T.UNPACK_ROW_LENGTH,ge),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Mn),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Ki),T.pixelStorei(T.UNPACK_SKIP_ROWS,En),T.pixelStorei(T.UNPACK_SKIP_IMAGES,ci),Wt===0&&at.generateMipmaps&&T.generateMipmap(Ie),zt.unbindTexture()},this.initRenderTarget=function(L){E.get(L).__webglFramebuffer===void 0&&J.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?J.setTextureCube(L,0):L.isData3DTexture?J.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?J.setTexture2DArray(L,0):J.setTexture2D(L,0),zt.unbindTexture()},this.resetState=function(){q=0,$=0,ot=null,zt.reset(),Kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Le._getDrawingBufferColorSpace(t),n.unpackColorSpace=Le._getUnpackColorSpace()}}const pv={type:"change"},Sp={type:"start"},rx={type:"end"},Qc=new Pv,mv=new is,SR=Math.cos(70*nM.DEG2RAD),gn=new nt,Zn=2*Math.PI,Ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ad=1e-6;class MR extends bE{constructor(t,n=null){super(t,n),this.state=Ye.NONE,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gr.ROTATE,MIDDLE:Gr.DOLLY,RIGHT:Gr.PAN},this.touches={ONE:Hr.ROTATE,TWO:Hr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new Hs,this._lastTargetPosition=new nt,this._quat=new Hs().setFromUnitVectors(t.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new V_,this._sphericalDelta=new V_,this._scale=1,this._panOffset=new nt,this._rotateStart=new Ut,this._rotateEnd=new Ut,this._rotateDelta=new Ut,this._panStart=new Ut,this._panEnd=new Ut,this._panDelta=new Ut,this._dollyStart=new Ut,this._dollyEnd=new Ut,this._dollyDelta=new Ut,this._dollyDirection=new nt,this._mouse=new Ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=bR.bind(this),this._onPointerDown=ER.bind(this),this._onPointerUp=TR.bind(this),this._onContextMenu=LR.bind(this),this._onMouseWheel=CR.bind(this),this._onKeyDown=wR.bind(this),this._onTouchStart=DR.bind(this),this._onTouchMove=UR.bind(this),this._onMouseDown=AR.bind(this),this._onMouseMove=RR.bind(this),this._interceptControlDown=NR.bind(this),this._interceptControlUp=OR.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pv),this.update(),this.state=Ye.NONE}update(t=null){const n=this.object.position;gn.copy(n).sub(this.target),gn.applyQuaternion(this._quat),this._spherical.setFromVector3(gn),this.autoRotate&&this.state===Ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Zn:s>Math.PI&&(s-=Zn),l<-Math.PI?l+=Zn:l>Math.PI&&(l-=Zn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(gn.setFromSpherical(this._spherical),gn.applyQuaternion(this._quatInverse),n.copy(this.target).add(gn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=gn.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new nt(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new nt(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=gn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Qc.origin.copy(this.object.position),Qc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qc.direction))<SR?this.object.lookAt(this.target):(mv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qc.intersectPlane(mv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>ad||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ad||this._lastTargetPosition.distanceToSquared(this.target)>ad?(this.dispatchEvent(pv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Zn/60*this.autoRotateSpeed*t:Zn/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){gn.setFromMatrixColumn(n,0),gn.multiplyScalar(-t),this._panOffset.add(gn)}_panUp(t,n){this.screenSpacePanning===!0?gn.setFromMatrixColumn(n,1):(gn.setFromMatrixColumn(n,0),gn.crossVectors(this.object.up,gn)),gn.multiplyScalar(t),this._panOffset.add(gn)}_pan(t,n){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;gn.copy(l).sub(this.target);let c=gn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*n*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=n-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Zn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Zn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),s=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Zn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Zn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),s=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+n.x)*.5,h=(t.pageY+n.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Ut,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function ER(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function bR(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function TR(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rx),this.state=Ye.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function AR(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Gr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Ye.DOLLY;break;case Gr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Ye.ROTATE}break;case Gr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Ye.PAN}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(Sp)}function RR(r){switch(this.state){case Ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function CR(r){this.enabled===!1||this.enableZoom===!1||this.state!==Ye.NONE||(r.preventDefault(),this.dispatchEvent(Sp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(rx))}function wR(r){this.enabled!==!1&&this._handleKeyDown(r)}function DR(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Hr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Ye.TOUCH_ROTATE;break;case Hr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Ye.TOUCH_PAN;break;default:this.state=Ye.NONE}break;case 2:switch(this.touches.TWO){case Hr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Ye.TOUCH_DOLLY_PAN;break;case Hr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Ye.TOUCH_DOLLY_ROTATE;break;default:this.state=Ye.NONE}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(Sp)}function UR(r){switch(this._trackPointer(r),this.state){case Ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Ye.NONE}}function LR(r){this.enabled!==!1&&r.preventDefault()}function NR(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function OR(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const PR=ri;class cu extends xp{constructor(t){super(t),this.defaultDPI=90,this.defaultUnit="px"}load(t,n,s,l){const c=this,f=new _E(c.manager);f.setPath(c.path),f.setRequestHeader(c.requestHeader),f.setWithCredentials(c.withCredentials),f.load(t,function(h){try{n(c.parse(h))}catch(m){l?l(m):console.error(m),c.manager.itemError(t)}},s,l)}parse(t){const n=this;function s(j,X){if(j.nodeType!==1)return;const R=N(j);let C=!1,it=null;switch(j.nodeName){case"svg":X=b(j,X);break;case"style":c(j);break;case"g":X=b(j,X);break;case"path":X=b(j,X),j.hasAttribute("d")&&(it=l(j));break;case"rect":X=b(j,X),it=m(j);break;case"polygon":X=b(j,X),it=p(j);break;case"polyline":X=b(j,X),it=_(j);break;case"circle":X=b(j,X),it=g(j);break;case"ellipse":X=b(j,X),it=x(j);break;case"line":X=b(j,X),it=M(j);break;case"defs":C=!0;break;case"use":X=b(j,X);const Lt=(j.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),Ft=j.viewportElement.getElementById(Lt);Ft?s(Ft,X):console.warn("SVGLoader: 'use node' references non-existent node id: "+Lt);break}it&&(X.fill!==void 0&&X.fill!=="none"&&it.color.setStyle(X.fill,PR),H(it,B),$.push(it),it.userData={node:j,style:X});const _t=j.childNodes;for(let et=0;et<_t.length;et++){const Lt=_t[et];C&&Lt.nodeName!=="style"&&Lt.nodeName!=="defs"||s(Lt,X)}R&&(gt.pop(),gt.length>0?B.copy(gt[gt.length-1]):B.identity())}function l(j){const X=new Us,R=new Ut,C=new Ut,it=new Ut;let _t=!0,et=!1;const Lt=j.getAttribute("d");if(Lt===""||Lt==="none")return null;const Ft=Lt.match(/[a-df-z][^a-df-z]*/ig);for(let Ot=0,K=Ft.length;Ot<K;Ot++){const st=Ft[Ot],ct=st.charAt(0),Mt=st.slice(1).trim();_t===!0&&(et=!0,_t=!1);let T;switch(ct){case"M":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=2)R.x=T[G+0],R.y=T[G+1],C.x=R.x,C.y=R.y,G===0?X.moveTo(R.x,R.y):X.lineTo(R.x,R.y),G===0&&it.copy(R);break;case"H":T=y(Mt);for(let G=0,Et=T.length;G<Et;G++)R.x=T[G],C.x=R.x,C.y=R.y,X.lineTo(R.x,R.y),G===0&&et===!0&&it.copy(R);break;case"V":T=y(Mt);for(let G=0,Et=T.length;G<Et;G++)R.y=T[G],C.x=R.x,C.y=R.y,X.lineTo(R.x,R.y),G===0&&et===!0&&it.copy(R);break;case"L":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=2)R.x=T[G+0],R.y=T[G+1],C.x=R.x,C.y=R.y,X.lineTo(R.x,R.y),G===0&&et===!0&&it.copy(R);break;case"C":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=6)X.bezierCurveTo(T[G+0],T[G+1],T[G+2],T[G+3],T[G+4],T[G+5]),C.x=T[G+2],C.y=T[G+3],R.x=T[G+4],R.y=T[G+5],G===0&&et===!0&&it.copy(R);break;case"S":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=4)X.bezierCurveTo(A(R.x,C.x),A(R.y,C.y),T[G+0],T[G+1],T[G+2],T[G+3]),C.x=T[G+0],C.y=T[G+1],R.x=T[G+2],R.y=T[G+3],G===0&&et===!0&&it.copy(R);break;case"Q":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=4)X.quadraticCurveTo(T[G+0],T[G+1],T[G+2],T[G+3]),C.x=T[G+0],C.y=T[G+1],R.x=T[G+2],R.y=T[G+3],G===0&&et===!0&&it.copy(R);break;case"T":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=2){const Gt=A(R.x,C.x),zt=A(R.y,C.y);X.quadraticCurveTo(Gt,zt,T[G+0],T[G+1]),C.x=Gt,C.y=zt,R.x=T[G+0],R.y=T[G+1],G===0&&et===!0&&it.copy(R)}break;case"A":T=y(Mt,[3,4],7);for(let G=0,Et=T.length;G<Et;G+=7){if(T[G+5]==R.x&&T[G+6]==R.y)continue;const Gt=R.clone();R.x=T[G+5],R.y=T[G+6],C.x=R.x,C.y=R.y,f(X,T[G],T[G+1],T[G+2],T[G+3],T[G+4],Gt,R),G===0&&et===!0&&it.copy(R)}break;case"m":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=2)R.x+=T[G+0],R.y+=T[G+1],C.x=R.x,C.y=R.y,G===0?X.moveTo(R.x,R.y):X.lineTo(R.x,R.y),G===0&&it.copy(R);break;case"h":T=y(Mt);for(let G=0,Et=T.length;G<Et;G++)R.x+=T[G],C.x=R.x,C.y=R.y,X.lineTo(R.x,R.y),G===0&&et===!0&&it.copy(R);break;case"v":T=y(Mt);for(let G=0,Et=T.length;G<Et;G++)R.y+=T[G],C.x=R.x,C.y=R.y,X.lineTo(R.x,R.y),G===0&&et===!0&&it.copy(R);break;case"l":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=2)R.x+=T[G+0],R.y+=T[G+1],C.x=R.x,C.y=R.y,X.lineTo(R.x,R.y),G===0&&et===!0&&it.copy(R);break;case"c":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=6)X.bezierCurveTo(R.x+T[G+0],R.y+T[G+1],R.x+T[G+2],R.y+T[G+3],R.x+T[G+4],R.y+T[G+5]),C.x=R.x+T[G+2],C.y=R.y+T[G+3],R.x+=T[G+4],R.y+=T[G+5],G===0&&et===!0&&it.copy(R);break;case"s":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=4)X.bezierCurveTo(A(R.x,C.x),A(R.y,C.y),R.x+T[G+0],R.y+T[G+1],R.x+T[G+2],R.y+T[G+3]),C.x=R.x+T[G+0],C.y=R.y+T[G+1],R.x+=T[G+2],R.y+=T[G+3],G===0&&et===!0&&it.copy(R);break;case"q":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=4)X.quadraticCurveTo(R.x+T[G+0],R.y+T[G+1],R.x+T[G+2],R.y+T[G+3]),C.x=R.x+T[G+0],C.y=R.y+T[G+1],R.x+=T[G+2],R.y+=T[G+3],G===0&&et===!0&&it.copy(R);break;case"t":T=y(Mt);for(let G=0,Et=T.length;G<Et;G+=2){const Gt=A(R.x,C.x),zt=A(R.y,C.y);X.quadraticCurveTo(Gt,zt,R.x+T[G+0],R.y+T[G+1]),C.x=Gt,C.y=zt,R.x=R.x+T[G+0],R.y=R.y+T[G+1],G===0&&et===!0&&it.copy(R)}break;case"a":T=y(Mt,[3,4],7);for(let G=0,Et=T.length;G<Et;G+=7){if(T[G+5]==0&&T[G+6]==0)continue;const Gt=R.clone();R.x+=T[G+5],R.y+=T[G+6],C.x=R.x,C.y=R.y,f(X,T[G],T[G+1],T[G+2],T[G+3],T[G+4],Gt,R),G===0&&et===!0&&it.copy(R)}break;case"Z":case"z":X.currentPath.autoClose=!0,X.currentPath.curves.length>0&&(R.copy(it),X.currentPath.currentPoint.copy(R),_t=!0);break;default:console.warn(st)}et=!1}return X}function c(j){if(!(!j.sheet||!j.sheet.cssRules||!j.sheet.cssRules.length))for(let X=0;X<j.sheet.cssRules.length;X++){const R=j.sheet.cssRules[X];if(R.type!==1)continue;const C=R.selectorText.split(/,/gm).filter(Boolean).map(it=>it.trim());for(let it=0;it<C.length;it++){const _t=Object.fromEntries(Object.entries(R.style).filter(([,et])=>et!==""));ot[C[it]]=Object.assign(ot[C[it]]||{},_t)}}}function f(j,X,R,C,it,_t,et,Lt){if(X==0||R==0){j.lineTo(Lt.x,Lt.y);return}C=C*Math.PI/180,X=Math.abs(X),R=Math.abs(R);const Ft=(et.x-Lt.x)/2,Ot=(et.y-Lt.y)/2,K=Math.cos(C)*Ft+Math.sin(C)*Ot,st=-Math.sin(C)*Ft+Math.cos(C)*Ot;let ct=X*X,Mt=R*R;const T=K*K,G=st*st,Et=T/ct+G/Mt;if(Et>1){const Vt=Math.sqrt(Et);X=Vt*X,R=Vt*R,ct=X*X,Mt=R*R}const Gt=ct*G+Mt*T,zt=(ct*Mt-Gt)/Gt;let I=Math.sqrt(Math.max(0,zt));it===_t&&(I=-I);const E=I*X*st/R,J=-I*R*K/X,xt=Math.cos(C)*E-Math.sin(C)*J+(et.x+Lt.x)/2,Dt=Math.sin(C)*E+Math.cos(C)*J+(et.y+Lt.y)/2,yt=h(1,0,(K-E)/X,(st-J)/R),te=h((K-E)/X,(st-J)/R,(-K-E)/X,(-st-J)/R)%(Math.PI*2);j.currentPath.absellipse(xt,Dt,X,R,yt,yt+te,_t===0,C)}function h(j,X,R,C){const it=j*R+X*C,_t=Math.sqrt(j*j+X*X)*Math.sqrt(R*R+C*C);let et=Math.acos(Math.max(-1,Math.min(1,it/_t)));return j*C-X*R<0&&(et=-et),et}function m(j){const X=w(j.getAttribute("x")||0),R=w(j.getAttribute("y")||0),C=w(j.getAttribute("rx")||j.getAttribute("ry")||0),it=w(j.getAttribute("ry")||j.getAttribute("rx")||0),_t=w(j.getAttribute("width")),et=w(j.getAttribute("height")),Lt=1-.551915024494,Ft=new Us;return Ft.moveTo(X+C,R),Ft.lineTo(X+_t-C,R),(C!==0||it!==0)&&Ft.bezierCurveTo(X+_t-C*Lt,R,X+_t,R+it*Lt,X+_t,R+it),Ft.lineTo(X+_t,R+et-it),(C!==0||it!==0)&&Ft.bezierCurveTo(X+_t,R+et-it*Lt,X+_t-C*Lt,R+et,X+_t-C,R+et),Ft.lineTo(X+C,R+et),(C!==0||it!==0)&&Ft.bezierCurveTo(X+C*Lt,R+et,X,R+et-it*Lt,X,R+et-it),Ft.lineTo(X,R+it),(C!==0||it!==0)&&Ft.bezierCurveTo(X,R+it*Lt,X+C*Lt,R,X+C,R),Ft}function p(j){function X(_t,et,Lt){const Ft=w(et),Ot=w(Lt);it===0?C.moveTo(Ft,Ot):C.lineTo(Ft,Ot),it++}const R=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,C=new Us;let it=0;return j.getAttribute("points").replace(R,X),C.currentPath.autoClose=!0,C}function _(j){function X(_t,et,Lt){const Ft=w(et),Ot=w(Lt);it===0?C.moveTo(Ft,Ot):C.lineTo(Ft,Ot),it++}const R=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,C=new Us;let it=0;return j.getAttribute("points").replace(R,X),C.currentPath.autoClose=!1,C}function g(j){const X=w(j.getAttribute("cx")||0),R=w(j.getAttribute("cy")||0),C=w(j.getAttribute("r")||0),it=new Xr;it.absarc(X,R,C,0,Math.PI*2);const _t=new Us;return _t.subPaths.push(it),_t}function x(j){const X=w(j.getAttribute("cx")||0),R=w(j.getAttribute("cy")||0),C=w(j.getAttribute("rx")||0),it=w(j.getAttribute("ry")||0),_t=new Xr;_t.absellipse(X,R,C,it,0,Math.PI*2);const et=new Us;return et.subPaths.push(_t),et}function M(j){const X=w(j.getAttribute("x1")||0),R=w(j.getAttribute("y1")||0),C=w(j.getAttribute("x2")||0),it=w(j.getAttribute("y2")||0),_t=new Us;return _t.moveTo(X,R),_t.lineTo(C,it),_t.currentPath.autoClose=!1,_t}function b(j,X){X=Object.assign({},X);let R={};if(j.hasAttribute("class")){const et=j.getAttribute("class").split(/\s/).filter(Boolean).map(Lt=>Lt.trim());for(let Lt=0;Lt<et.length;Lt++)R=Object.assign(R,ot["."+et[Lt]])}j.hasAttribute("id")&&(R=Object.assign(R,ot["#"+j.getAttribute("id")]));function C(et,Lt,Ft){Ft===void 0&&(Ft=function(K){return K.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),K}),j.hasAttribute(et)&&(X[Lt]=Ft(j.getAttribute(et))),R[Lt]&&(X[Lt]=Ft(R[Lt])),j.style&&j.style[et]!==""&&(X[Lt]=Ft(j.style[et]))}function it(et){return Math.max(0,Math.min(1,w(et)))}function _t(et){return Math.max(0,w(et))}return C("fill","fill"),C("fill-opacity","fillOpacity",it),C("fill-rule","fillRule"),C("opacity","opacity",it),C("stroke","stroke"),C("stroke-opacity","strokeOpacity",it),C("stroke-width","strokeWidth",_t),C("stroke-linejoin","strokeLineJoin"),C("stroke-linecap","strokeLineCap"),C("stroke-miterlimit","strokeMiterLimit",_t),C("visibility","visibility"),X}function A(j,X){return j-(X-j)}function y(j,X,R){if(typeof j!="string")throw new TypeError("Invalid input: "+typeof j);const C={WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},it=0,_t=1,et=2,Lt=3;let Ft=it,Ot=!0,K="",st="";const ct=[];function Mt(Gt,zt,I){const E=new SyntaxError('Unexpected character "'+Gt+'" at index '+zt+".");throw E.partial=I,E}function T(){K!==""&&(st===""?ct.push(Number(K)):ct.push(Number(K)*Math.pow(10,Number(st)))),K="",st=""}let G;const Et=j.length;for(let Gt=0;Gt<Et;Gt++){if(G=j[Gt],Array.isArray(X)&&X.includes(ct.length%R)&&C.FLAGS.test(G)){Ft=_t,K=G,T();continue}if(Ft===it){if(C.WHITESPACE.test(G))continue;if(C.DIGIT.test(G)||C.SIGN.test(G)){Ft=_t,K=G;continue}if(C.POINT.test(G)){Ft=et,K=G;continue}C.COMMA.test(G)&&(Ot&&Mt(G,Gt,ct),Ot=!0)}if(Ft===_t){if(C.DIGIT.test(G)){K+=G;continue}if(C.POINT.test(G)){K+=G,Ft=et;continue}if(C.EXP.test(G)){Ft=Lt;continue}C.SIGN.test(G)&&K.length===1&&C.SIGN.test(K[0])&&Mt(G,Gt,ct)}if(Ft===et){if(C.DIGIT.test(G)){K+=G;continue}if(C.EXP.test(G)){Ft=Lt;continue}C.POINT.test(G)&&K[K.length-1]==="."&&Mt(G,Gt,ct)}if(Ft===Lt){if(C.DIGIT.test(G)){st+=G;continue}if(C.SIGN.test(G)){if(st===""){st+=G;continue}st.length===1&&C.SIGN.test(st)&&Mt(G,Gt,ct)}}C.WHITESPACE.test(G)?(T(),Ft=it,Ot=!1):C.COMMA.test(G)?(T(),Ft=it,Ot=!0):C.SIGN.test(G)?(T(),Ft=_t,K=G):C.POINT.test(G)?(T(),Ft=et,K=G):Mt(G,Gt,ct)}return T(),ct}const v=["mm","cm","in","pt","pc","px"],P={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function w(j){let X="px";if(typeof j=="string"||j instanceof String)for(let C=0,it=v.length;C<it;C++){const _t=v[C];if(j.endsWith(_t)){X=_t,j=j.substring(0,j.length-_t.length);break}}let R;return X==="px"&&n.defaultUnit!=="px"?R=P.in[n.defaultUnit]/n.defaultDPI:(R=P[X][n.defaultUnit],R<0&&(R=P[X].in*n.defaultDPI)),R*parseFloat(j)}function N(j){if(!(j.hasAttribute("transform")||j.nodeName==="use"&&(j.hasAttribute("x")||j.hasAttribute("y"))))return null;const X=F(j);return gt.length>0&&X.premultiply(gt[gt.length-1]),B.copy(X),gt.push(X),X}function F(j){const X=new de,R=dt;if(j.nodeName==="use"&&(j.hasAttribute("x")||j.hasAttribute("y"))){const C=w(j.getAttribute("x")||0),it=w(j.getAttribute("y")||0);X.translate(C,it)}if(j.hasAttribute("transform")){const C=j.getAttribute("transform").split(")");for(let it=C.length-1;it>=0;it--){const _t=C[it].trim();if(_t==="")continue;const et=_t.indexOf("("),Lt=_t.length;if(et>0&&et<Lt){const Ft=_t.slice(0,et),Ot=y(_t.slice(et+1));switch(R.identity(),Ft){case"translate":if(Ot.length>=1){const K=Ot[0];let st=0;Ot.length>=2&&(st=Ot[1]),R.translate(K,st)}break;case"rotate":if(Ot.length>=1){let K=0,st=0,ct=0;K=Ot[0]*Math.PI/180,Ot.length>=3&&(st=Ot[1],ct=Ot[2]),V.makeTranslation(-st,-ct),k.makeRotation(K),W.multiplyMatrices(k,V),V.makeTranslation(st,ct),R.multiplyMatrices(V,W)}break;case"scale":if(Ot.length>=1){const K=Ot[0];let st=K;Ot.length>=2&&(st=Ot[1]),R.scale(K,st)}break;case"skewX":Ot.length===1&&R.set(1,Math.tan(Ot[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":Ot.length===1&&R.set(1,0,0,Math.tan(Ot[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":Ot.length===6&&R.set(Ot[0],Ot[2],Ot[4],Ot[1],Ot[3],Ot[5],0,0,1);break}}X.premultiply(R)}}return X}function H(j,X){function R(et){bt.set(et.x,et.y,1).applyMatrix3(X),et.set(bt.x,bt.y)}function C(et){const Lt=et.xRadius,Ft=et.yRadius,Ot=Math.cos(et.aRotation),K=Math.sin(et.aRotation),st=new nt(Lt*Ot,Lt*K,0),ct=new nt(-Ft*K,Ft*Ot,0),Mt=st.applyMatrix3(X),T=ct.applyMatrix3(X),G=dt.set(Mt.x,T.x,0,Mt.y,T.y,0,0,0,1),Et=V.copy(G).invert(),I=k.copy(Et).transpose().multiply(Et).elements,E=q(I[0],I[1],I[4]),J=Math.sqrt(E.rt1),xt=Math.sqrt(E.rt2);if(et.xRadius=1/J,et.yRadius=1/xt,et.aRotation=Math.atan2(E.sn,E.cs),!((et.aEndAngle-et.aStartAngle)%(2*Math.PI)<Number.EPSILON)){const yt=V.set(J,0,0,0,xt,0,0,0,1),te=k.set(E.cs,E.sn,0,-E.sn,E.cs,0,0,0,1),Vt=yt.multiply(te).multiply(G),ee=le=>{const{x:Pt,y:Bt}=new nt(Math.cos(le),Math.sin(le),0).applyMatrix3(Vt);return Math.atan2(Bt,Pt)};et.aStartAngle=ee(et.aStartAngle),et.aEndAngle=ee(et.aEndAngle),z(X)&&(et.aClockwise=!et.aClockwise)}}function it(et){const Lt=D(X),Ft=O(X);et.xRadius*=Lt,et.yRadius*=Ft;const Ot=Lt>Number.EPSILON?Math.atan2(X.elements[1],X.elements[0]):Math.atan2(-X.elements[3],X.elements[4]);et.aRotation+=Ot,z(X)&&(et.aStartAngle*=-1,et.aEndAngle*=-1,et.aClockwise=!et.aClockwise)}const _t=j.subPaths;for(let et=0,Lt=_t.length;et<Lt;et++){const Ot=_t[et].curves;for(let K=0;K<Ot.length;K++){const st=Ot[K];st.isLineCurve?(R(st.v1),R(st.v2)):st.isCubicBezierCurve?(R(st.v0),R(st.v1),R(st.v2),R(st.v3)):st.isQuadraticBezierCurve?(R(st.v0),R(st.v1),R(st.v2)):st.isEllipseCurve&&(Rt.set(st.aX,st.aY),R(Rt),st.aX=Rt.x,st.aY=Rt.y,Z(X)?C(st):it(st))}}}function z(j){const X=j.elements;return X[0]*X[4]-X[1]*X[3]<0}function Z(j){const X=j.elements,R=X[0]*X[3]+X[1]*X[4];if(R===0)return!1;const C=D(j),it=O(j);return Math.abs(R/(C*it))>Number.EPSILON}function D(j){const X=j.elements;return Math.sqrt(X[0]*X[0]+X[1]*X[1])}function O(j){const X=j.elements;return Math.sqrt(X[3]*X[3]+X[4]*X[4])}function q(j,X,R){let C,it,_t,et,Lt;const Ft=j+R,Ot=j-R,K=Math.sqrt(Ot*Ot+4*X*X);return Ft>0?(C=.5*(Ft+K),Lt=1/C,it=j*Lt*R-X*Lt*X):Ft<0?it=.5*(Ft-K):(C=.5*K,it=-.5*K),Ot>0?_t=Ot+K:_t=Ot-K,Math.abs(_t)>2*Math.abs(X)?(Lt=-2*X/_t,et=1/Math.sqrt(1+Lt*Lt),_t=Lt*et):Math.abs(X)===0?(_t=1,et=0):(Lt=-.5*_t/X,_t=1/Math.sqrt(1+Lt*Lt),et=Lt*_t),Ot>0&&(Lt=_t,_t=-et,et=Lt),{rt1:C,rt2:it,cs:_t,sn:et}}const $=[],ot={},gt=[],dt=new de,V=new de,k=new de,W=new de,Rt=new Ut,bt=new nt,B=new de,ut=new DOMParser().parseFromString(t,"image/svg+xml");return s(ut.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:$,xml:ut.documentElement}}static createShapes(t){const s={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},l={loc:s.ORIGIN,t:0};function c(A,y,v,P){const w=A.x,N=y.x,F=v.x,H=P.x,z=A.y,Z=y.y,D=v.y,O=P.y,q=(H-F)*(z-D)-(O-D)*(w-F),$=(N-w)*(z-D)-(Z-z)*(w-F),ot=(O-D)*(N-w)-(H-F)*(Z-z),gt=q/ot,dt=$/ot;if(ot===0&&q!==0||gt<=0||gt>=1||dt<0||dt>1)return null;if(q===0&&ot===0){for(let V=0;V<2;V++)if(f(V===0?v:P,A,y),l.loc==s.ORIGIN){const k=V===0?v:P;return{x:k.x,y:k.y,t:l.t}}else if(l.loc==s.BETWEEN){const k=+(w+l.t*(N-w)).toPrecision(10),W=+(z+l.t*(Z-z)).toPrecision(10);return{x:k,y:W,t:l.t}}return null}else{for(let W=0;W<2;W++)if(f(W===0?v:P,A,y),l.loc==s.ORIGIN){const Rt=W===0?v:P;return{x:Rt.x,y:Rt.y,t:l.t}}const V=+(w+gt*(N-w)).toPrecision(10),k=+(z+gt*(Z-z)).toPrecision(10);return{x:V,y:k,t:gt}}}function f(A,y,v){const P=v.x-y.x,w=v.y-y.y,N=A.x-y.x,F=A.y-y.y,H=P*F-N*w;if(A.x===y.x&&A.y===y.y){l.loc=s.ORIGIN,l.t=0;return}if(A.x===v.x&&A.y===v.y){l.loc=s.DESTINATION,l.t=1;return}if(H<-Number.EPSILON){l.loc=s.LEFT;return}if(H>Number.EPSILON){l.loc=s.RIGHT;return}if(P*N<0||w*F<0){l.loc=s.BEHIND;return}if(Math.sqrt(P*P+w*w)<Math.sqrt(N*N+F*F)){l.loc=s.BEYOND;return}let z;P!==0?z=N/P:z=F/w,l.loc=s.BETWEEN,l.t=z}function h(A,y){const v=[],P=[];for(let w=1;w<A.length;w++){const N=A[w-1],F=A[w];for(let H=1;H<y.length;H++){const z=y[H-1],Z=y[H],D=c(N,F,z,Z);D!==null&&v.find(O=>O.t<=D.t+Number.EPSILON&&O.t>=D.t-Number.EPSILON)===void 0&&(v.push(D),P.push(new Ut(D.x,D.y)))}}return P}function m(A,y,v){const P=new Ut;y.getCenter(P);const w=[];return v.forEach(N=>{N.boundingBox.containsPoint(P)&&h(A,N.points).forEach(H=>{w.push({identifier:N.identifier,isCW:N.isCW,point:H})})}),w.sort((N,F)=>N.point.x-F.point.x),w}function p(A,y,v,P,w){(w==null||w==="")&&(w="nonzero");const N=new Ut;A.boundingBox.getCenter(N);const F=[new Ut(v,N.y),new Ut(P,N.y)],H=m(F,A.boundingBox,y);H.sort(($,ot)=>$.point.x-ot.point.x);const z=[],Z=[];H.forEach($=>{$.identifier===A.identifier?z.push($):Z.push($)});const D=z[0].point.x,O=[];let q=0;for(;q<Z.length&&Z[q].point.x<D;)O.length>0&&O[O.length-1]===Z[q].identifier?O.pop():O.push(Z[q].identifier),q++;if(O.push(A.identifier),w==="evenodd"){const $=O.length%2===0,ot=O[O.length-2];return{identifier:A.identifier,isHole:$,for:ot}}else if(w==="nonzero"){let $=!0,ot=null,gt=null;for(let dt=0;dt<O.length;dt++){const V=O[dt];$?(gt=y[V].isCW,$=!1,ot=V):gt!==y[V].isCW&&(gt=y[V].isCW,$=!0)}return{identifier:A.identifier,isHole:$,for:ot}}else console.warn('fill-rule: "'+w+'" is currently not implemented.')}let _=999999999,g=-999999999,x=t.subPaths.map(A=>{const y=A.getPoints();let v=-999999999,P=999999999,w=-999999999,N=999999999;for(let F=0;F<y.length;F++){const H=y[F];H.y>v&&(v=H.y),H.y<P&&(P=H.y),H.x>w&&(w=H.x),H.x<N&&(N=H.x)}return g<=w&&(g=w+1),_>=N&&(_=N-1),{curves:A.curves,points:y,isCW:ss.isClockWise(y),identifier:-1,boundingBox:new EE(new Ut(N,P),new Ut(w,v))}});x=x.filter(A=>A.points.length>1);for(let A=0;A<x.length;A++)x[A].identifier=A;const M=x.map(A=>p(A,x,_,g,t.userData?t.userData.style.fillRule:void 0)),b=[];return x.forEach(A=>{if(!M[A.identifier].isHole){const v=new rl;v.curves=A.curves,M.filter(w=>w.isHole&&w.for===A.identifier).forEach(w=>{const N=x[w.identifier],F=new Xr;F.curves=N.curves,v.holes.push(F)}),b.push(v)}}),b}static getStrokeStyle(t,n,s,l,c){return t=t!==void 0?t:1,n=n!==void 0?n:"#000",s=s!==void 0?s:"miter",l=l!==void 0?l:"butt",c=c!==void 0?c:4,{strokeColor:n,strokeWidth:t,strokeLineJoin:s,strokeLineCap:l,strokeMiterLimit:c}}static pointsToStroke(t,n,s,l){const c=[],f=[],h=[];if(cu.pointsToStrokeWithBuffers(t,n,s,l,c,f,h)===0)return null;const m=new yi;return m.setAttribute("position",new Ln(c,3)),m.setAttribute("normal",new Ln(f,3)),m.setAttribute("uv",new Ln(h,2)),m}static pointsToStrokeWithBuffers(t,n,s,l,c,f,h,m){const p=new Ut,_=new Ut,g=new Ut,x=new Ut,M=new Ut,b=new Ut,A=new Ut,y=new Ut,v=new Ut,P=new Ut,w=new Ut,N=new Ut,F=new Ut,H=new Ut,z=new Ut,Z=new Ut,D=new Ut;s=s!==void 0?s:12,l=l!==void 0?l:.001,m=m!==void 0?m:0,t=Ot(t);const O=t.length;if(O<2)return 0;const q=t[0].equals(t[O-1]);let $,ot=t[0],gt;const dt=n.strokeWidth/2,V=1/(O-1);let k=0,W,Rt,bt,B,ut=!1,At=0,j=m*3,X=m*2;R(t[0],t[1],p).multiplyScalar(dt),y.copy(t[0]).sub(p),v.copy(t[0]).add(p),P.copy(y),w.copy(v);for(let K=1;K<O;K++){$=t[K],K===O-1?q?gt=t[1]:gt=void 0:gt=t[K+1];const st=p;if(R(ot,$,st),g.copy(st).multiplyScalar(dt),N.copy($).sub(g),F.copy($).add(g),W=k+V,Rt=!1,gt!==void 0){R($,gt,_),g.copy(_).multiplyScalar(dt),H.copy($).sub(g),z.copy($).add(g),bt=!0,g.subVectors(gt,ot),st.dot(g)<0&&(bt=!1),K===1&&(ut=bt),g.subVectors(gt,$),g.normalize();const ct=Math.abs(st.dot(g));if(ct>Number.EPSILON){const Mt=dt/ct;g.multiplyScalar(-Mt),x.subVectors($,ot),M.copy(x).setLength(Mt).add(g),Z.copy(M).negate();const T=M.length(),G=x.length();x.divideScalar(G),b.subVectors(gt,$);const Et=b.length();switch(b.divideScalar(Et),x.dot(Z)<G&&b.dot(Z)<Et&&(Rt=!0),D.copy(M).add($),Z.add($),B=!1,Rt?bt?(z.copy(Z),F.copy(Z)):(H.copy(Z),N.copy(Z)):_t(),n.strokeLineJoin){case"bevel":et(bt,Rt,W);break;case"round":Lt(bt,Rt),bt?it($,N,H,W,0):it($,z,F,W,1);break;default:const Gt=dt*n.strokeMiterLimit/T;if(Gt<1)if(n.strokeLineJoin!=="miter-clip"){et(bt,Rt,W);break}else Lt(bt,Rt),bt?(b.subVectors(D,N).multiplyScalar(Gt).add(N),A.subVectors(D,H).multiplyScalar(Gt).add(H),C(N,W,0),C(b,W,0),C($,W,.5),C($,W,.5),C(b,W,0),C(A,W,0),C($,W,.5),C(A,W,0),C(H,W,0)):(b.subVectors(D,F).multiplyScalar(Gt).add(F),A.subVectors(D,z).multiplyScalar(Gt).add(z),C(F,W,1),C(b,W,1),C($,W,.5),C($,W,.5),C(b,W,1),C(A,W,1),C($,W,.5),C(A,W,1),C(z,W,1));else Rt?(bt?(C(v,k,1),C(y,k,0),C(D,W,0),C(v,k,1),C(D,W,0),C(Z,W,1)):(C(v,k,1),C(y,k,0),C(D,W,1),C(y,k,0),C(Z,W,0),C(D,W,1)),bt?H.copy(D):z.copy(D)):bt?(C(N,W,0),C(D,W,0),C($,W,.5),C($,W,.5),C(D,W,0),C(H,W,0)):(C(F,W,1),C(D,W,1),C($,W,.5),C($,W,.5),C(D,W,1),C(z,W,1)),B=!0;break}}else _t()}else _t();!q&&K===O-1&&Ft(t[0],P,w,bt,!0,k),k=W,ot=$,y.copy(H),v.copy(z)}if(!q)Ft($,N,F,bt,!1,W);else if(Rt&&c){let K=D,st=Z;ut!==bt&&(K=Z,st=D),bt?(B||ut)&&(st.toArray(c,0),st.toArray(c,9),B&&K.toArray(c,3)):(B||!ut)&&(st.toArray(c,3),st.toArray(c,9),B&&K.toArray(c,0))}return At;function R(K,st,ct){return ct.subVectors(st,K),ct.set(-ct.y,ct.x).normalize()}function C(K,st,ct){c&&(c[j]=K.x,c[j+1]=K.y,c[j+2]=0,f&&(f[j]=0,f[j+1]=0,f[j+2]=1),j+=3,h&&(h[X]=st,h[X+1]=ct,X+=2)),At+=3}function it(K,st,ct,Mt,T){p.copy(st).sub(K).normalize(),_.copy(ct).sub(K).normalize();let G=Math.PI;const Et=p.dot(_);Math.abs(Et)<1&&(G=Math.abs(Math.acos(Et))),G/=s,g.copy(st);for(let Gt=0,zt=s-1;Gt<zt;Gt++)x.copy(g).rotateAround(K,G),C(g,Mt,T),C(x,Mt,T),C(K,Mt,.5),g.copy(x);C(x,Mt,T),C(ct,Mt,T),C(K,Mt,.5)}function _t(){C(v,k,1),C(y,k,0),C(N,W,0),C(v,k,1),C(N,W,0),C(F,W,1)}function et(K,st,ct){st?K?(C(v,k,1),C(y,k,0),C(N,W,0),C(v,k,1),C(N,W,0),C(Z,W,1),C(N,ct,0),C(H,ct,0),C(Z,ct,.5)):(C(v,k,1),C(y,k,0),C(F,W,1),C(y,k,0),C(Z,W,0),C(F,W,1),C(F,ct,1),C(Z,ct,0),C(z,ct,1)):K?(C(N,ct,0),C(H,ct,0),C($,ct,.5)):(C(F,ct,1),C(z,ct,0),C($,ct,.5))}function Lt(K,st){st&&(K?(C(v,k,1),C(y,k,0),C(N,W,0),C(v,k,1),C(N,W,0),C(Z,W,1),C(N,k,0),C($,W,.5),C(Z,W,1),C($,W,.5),C(H,k,0),C(Z,W,1)):(C(v,k,1),C(y,k,0),C(F,W,1),C(y,k,0),C(Z,W,0),C(F,W,1),C(F,k,1),C(Z,W,0),C($,W,.5),C($,W,.5),C(Z,W,0),C(z,k,1)))}function Ft(K,st,ct,Mt,T,G){switch(n.strokeLineCap){case"round":T?it(K,ct,st,G,.5):it(K,st,ct,G,.5);break;case"square":if(T)p.subVectors(st,K),_.set(p.y,-p.x),g.addVectors(p,_).add(K),x.subVectors(_,p).add(K),Mt?(g.toArray(c,3),x.toArray(c,0),x.toArray(c,9)):(g.toArray(c,3),h[7]===1?x.toArray(c,9):g.toArray(c,9),x.toArray(c,0));else{p.subVectors(ct,K),_.set(p.y,-p.x),g.addVectors(p,_).add(K),x.subVectors(_,p).add(K);const Et=c.length;Mt?(g.toArray(c,Et-3),x.toArray(c,Et-6),x.toArray(c,Et-12)):(x.toArray(c,Et-6),g.toArray(c,Et-3),x.toArray(c,Et-12))}break}}function Ot(K){let st=!1;for(let Mt=1,T=K.length-1;Mt<T;Mt++)if(K[Mt].distanceTo(K[Mt+1])<l){st=!0;break}if(!st)return K;const ct=[];ct.push(K[0]);for(let Mt=1,T=K.length-1;Mt<T;Mt++)K[Mt].distanceTo(K[Mt+1])>=l&&ct.push(K[Mt]);return ct.push(K[K.length-1]),ct}}}function IR(){const r=os.useRef(null);return os.useEffect(()=>{const t=r.current,n=t.clientWidth,s=t.clientHeight,l=new AM;l.background=null;const c=new xi(45,n/s,.1,1e3);c.position.set(0,0,25);const f=new yR({antialias:!0,alpha:!0});f.setSize(n,s),f.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.appendChild(f.domElement);const h=new MR(c,f.domElement);h.enableDamping=!0,h.enableZoom=!1,h.enablePan=!1,h.target.set(0,0,0),h.update(),l.add(new SE(16777215,1));const m=new yE(16777215,1.5);m.position.set(5,10,7),l.add(m);const p=new Fs;p.position.set(0,-2,0),l.add(p);const _=new F_({color:3955055,emissive:new we(1720186),emissiveIntensity:1.2,roughness:.2,metalness:0,transparent:!0,opacity:.6,blending:su,depthWrite:!1});[[0,0],[Math.PI/3,0],[0,Math.PI/3]].forEach(([y,v])=>{const P=new Li(new vp(4,.15,32,100),_);P.rotation.x=y,P.rotation.y=v,p.add(P)});const g=new Fs;g.position.set(0,-2,0),l.add(g),new cu().load("/bolt_v2.svg",y=>{const v=new Fs,P=new F_({color:4679306,emissive:new we(4679306),emissiveIntensity:1,transparent:!0,opacity:.5,blending:su,depthWrite:!1,side:Hi,roughness:.2,metalness:0});for(const w of y.paths)for(const N of cu.createShapes(w)){const F=new _p(N,{depth:10,bevelEnabled:!1,curveSegments:24});F.center(),v.add(new Li(F,P))}v.rotation.x=Math.PI,v.scale.setScalar(.035),v.position.set(0,0,0),g.add(v)},void 0,y=>console.error("SVG load error:",y)),p.rotation.y=.2,p.rotation.x=.1;let M;function b(){M=requestAnimationFrame(b),p.rotation.y+=.008,h.update(),f.render(l,c)}b();function A(){const y=t.clientWidth,v=t.clientHeight;c.aspect=y/v,c.updateProjectionMatrix(),f.setSize(y,v)}return window.addEventListener("resize",A),()=>{cancelAnimationFrame(M),window.removeEventListener("resize",A),h.dispose(),f.dispose(),t.contains(f.domElement)&&t.removeChild(f.domElement)}},[]),Jt.jsx("div",{ref:r,style:{width:"100%",height:"100%",filter:"blur(2px)"}})}const zR=[{number:"90+",label:"active members"},{number:"3",label:"nationally competing design teams"},{number:"9",label:"policy consortium organizations"}],FR=[{name:"Langan",logo:"/logos/langan.png"},{name:"Arup",logo:"/logos/arup.png"},{name:"Bloom Energy",logo:"/logos/bloomenergy.png"},{name:"CalWave",logo:"/logos/calwave.png"},{name:"Graymatter Robotics",logo:"/logos/graymatterrobotics.png"},{name:"KPFF",logo:"/logos/kpff.png"},{name:"NREL",logo:"/logos/nrel.png"},{name:"SGH",logo:"/logos/sgh.png"},{name:"Vatn Systems",logo:"/logos/vatn.png"}];function BR(){return Jt.jsxs("section",{id:"about",style:Te.aboutSection,children:[Jt.jsx("h2",{style:Te.aboutHeading,children:"About"}),Jt.jsx("div",{style:Te.statsRow,children:zR.map(({number:r,label:t})=>Jt.jsxs("div",{className:"stat-card",style:Te.statCard,children:[Jt.jsx("span",{style:Te.statNumber,children:r}),Jt.jsx("span",{style:Te.statLabel,children:t})]},t))}),Jt.jsx("p",{style:Te.aboutText,children:"We are an entirely student-led group, leading initiatives in sustainable design, policy, and professional development. AEE-USC strives to educate and empower students to pursue careers in all aspects of energy efficiency and sustainability."}),Jt.jsx("p",{style:Te.aboutText,children:"Our organization operates within the Sonny Astani Department of Civil and Environmental Engineering at the University of Southern California. We are open to students of all years and majors! Anyone who is interested in the world of energy is encouraged to join our organization!"}),Jt.jsx("h3",{style:Te.connectionsHeading,children:"Our Connections"}),Jt.jsx("div",{className:"logos-grid",style:Te.logosGrid,children:FR.map(({name:r,logo:t})=>Jt.jsx("div",{style:Te.logoPlaceholder,children:Jt.jsx("img",{src:t,alt:r,style:{height:"40px",objectFit:"contain",filter:"brightness(0) invert(1)"}})},r))})]})}const HR=[{key:"wind",title:"Collegiate Wind Competition Team",image:"/images/wind.webp",description:"Our Collegiate Wind Competition Team designs and builds small-scale wind turbines to compete in the U.S. Department of Energy's national competition. Students gain hands-on experience in aerodynamic design, structural analysis, and energy systems engineering."},{key:"marine",title:"Marine Energy Collegiate Competition Team",image:"/images/marine.jpg",description:"We are currently prototyping our Oscillating Water Column (OWC), which utilizes incoming waves to pressurize a column of air, spinning a turbine and generating electricity for battery storage. We are currently exploring the technologies behind underwater data centers, desalination facilities, and remote coastal communities."},{key:"hydro",title:"Hydropower Collegiate Competition Team",image:"/images/hydro.jpg",description:"HCC is a design competition aimed at creating low impact hydropower energy source using existing infrastructure. We are looking to use a Pumped Storage Hydropower system that could serve regions of California typically excluded from renewable energy initiatives."},{key:"solar",title:"Solar Table Initiative Team",image:"/images/solar.jpg",description:"The Solar Tables Initiative is working hard to bring 100% student designed outdoor tables with solar-powered charging capabilities to the USC community. We are designing our tables from the ground up with industry and manufacturer mentorship."}];function GR(){const[r,t]=os.useState(null);return Jt.jsxs("section",{id:"design-teams",style:Te.dtSection,children:[Jt.jsx("h2",{style:Te.dtHeading,children:"Design Teams"}),Jt.jsx("div",{className:"dt-grid",style:Te.dtGrid,children:HR.map(n=>{const s=r===n.key,l=r!==null&&!s;return Jt.jsxs("div",{className:s?"dt-card active":"dt-card",onClick:()=>t(s?null:n.key),style:{...Te.dtCard,flex:s?"3.5":l?"0.5":"1"},children:[Jt.jsx("img",{src:n.image,alt:n.title,style:{...Te.dtCardImg,filter:l?"brightness(0.25)":"brightness(0.45)"}}),Jt.jsx("div",{className:"dt-title",style:{...Te.dtVerticalTitle,opacity:s?0:1,transition:"opacity 0.25s ease"},children:n.title}),Jt.jsxs("div",{style:{...Te.dtExpandedContent,opacity:s?1:0,pointerEvents:s?"auto":"none",transition:"opacity 0.4s ease 0.2s"},children:[Jt.jsx("h3",{style:Te.dtExpandedTitle,children:n.title}),Jt.jsx("p",{style:Te.dtExpandedDesc,children:n.description})]})]},n.key)})})]})}const VR=[{name:"Mitch Kirby",role:"President & Founder",photo:"/eboard/mitchkirby.jpg",linkedin:"https://www.linkedin.com/in/mitchell-kirby/"},{name:"Alexandra Somodi",role:"Vice President & Brand Director",photo:"/eboard/alexandrasomodi.png",linkedin:"https://www.linkedin.com/in/alexandra-somodi/"},{name:"David Moseley",role:"Design Team Coordinator",photo:"/eboard/davidmoseley.jpg",linkedin:"https://www.linkedin.com/in/davidmmoseley/"},{name:"Jordyn Wetherbee",role:"Executive Coordinator & CWC PM",photo:"/eboard/jordynwetherbee.jpg",linkedin:"https://www.linkedin.com/in/jordyn-wetherbee/"},{name:"James Hiemstra",role:"Director of Finance",photo:"/eboard/jameshiemstra.jpg",linkedin:"https://www.linkedin.com/in/james-hiemstra-78b9872a1/"},{name:"Reeth Kawad",role:"Senior Advisor",photo:"/eboard/reethkawad.jpg",linkedin:"https://www.linkedin.com/in/reethkawad/"},{name:"Chloe Flannigan",role:"Director of Membership",photo:"/eboard/chloeflannigan.jpg",linkedin:"https://www.linkedin.com/in/chloe-flannigan-0950a2237/"},{name:"Helena Heckmann",role:"Director of Events",photo:"/eboard/helenaheckmann.jpg",linkedin:"https://www.linkedin.com/in/helena-heckmann/"},{name:"Jainam Jain",role:"Director of Outreach & CWC PM",photo:"/eboard/jainamjain.png",linkedin:"https://www.linkedin.com/in/jainam-jain-937a13214/"},{name:"Ellis Fertig",role:"ShadeLA PM & Director of Policy",photo:"/eboard/ellisfertig.jpg",linkedin:"https://www.linkedin.com/in/ellis-fertig-4512b232b/"},{name:"Sam Gold",role:"ShadeLA PM & Asst. Director of Policy",photo:"/eboard/samgold.jpg",linkedin:"https://www.linkedin.com/in/sam-j-gold/"},{name:"Alex Bartolomei",role:"MECC PM",photo:"/eboard/alexbartolomei.jpg",linkedin:"https://www.linkedin.com/in/alexbartolomei/"},{name:"Alex Geschwill",role:"HCC PM",photo:"/eboard/alexgeschwill.jpg",linkedin:"https://www.linkedin.com/in/alexandra-geschwill/"},{name:"Daniela Lopez Escalante",role:"Asst. Director of Brand",photo:"/eboard/daniela.jpg",linkedin:"https://www.linkedin.com/in/daniela-lopez-escalante-839a4038a/"}];function kR({member:r}){const[t,n]=os.useState(!1),s={...Te.ebCard,transform:t?"scale(1.03)":"scale(1)",boxShadow:t?"0 8px 32px rgba(0,0,0,0.35)":"none",transition:"transform 0.25s ease, box-shadow 0.25s ease",cursor:r.linkedin?"pointer":"default"},l=Jt.jsxs("div",{className:"eb-card",style:s,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[Jt.jsxs("div",{className:"eb-photo-wrap",style:{position:"relative",width:"120px",height:"120px",flexShrink:0,width:"120px",height:"120px"},children:[r.photo?Jt.jsx("img",{src:r.photo,alt:r.name,style:Te.ebPhoto,className:"eb-photo"}):Jt.jsx("div",{style:Te.ebPhotoPlaceholder}),Jt.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(29, 48, 71, 0.45)",opacity:t?0:1,transition:"opacity 0.25s ease"}})]}),Jt.jsxs("div",{style:Te.ebInfo,children:[r.name&&Jt.jsx("span",{style:Te.ebName,children:r.name}),r.role&&Jt.jsx("span",{style:Te.ebRole,children:r.role})]})]});return r.linkedin?Jt.jsx("a",{href:r.linkedin,target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:l}):l}function XR(){return Jt.jsxs("section",{id:"e-board",style:Te.ebSection,children:[Jt.jsx("h2",{style:Te.ebHeading,children:"E-Board"}),Jt.jsx("div",{className:"eb-grid",style:Te.ebGrid,children:VR.map((r,t)=>Jt.jsx(kR,{member:r},t))})]})}function WR(){return Jt.jsxs("footer",{className:"footer",style:Br.footer,children:[Jt.jsx("div",{className:"footer-left",style:Br.left,children:[{label:"Instagram",href:"https://www.instagram.com/aeeusc"},{label:"LinkedIn",href:"https://www.linkedin.com/company/association-of-energy-engineers-usc/?viewAsMember=true"},{label:"Slack",href:"https://docs.google.com/forms/d/e/1FAIpQLSde2ldtrVXhxu5plBeN3wLRApQoZtVfj8l0FhG_rllde9MKyw/viewform"},{label:"Newsletter",href:"https://forms.gle/2sbFAdnC5oxf3q2t6"}].map(({label:r,href:t})=>Jt.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",style:Br.link,children:r},r))}),Jt.jsx("div",{style:Br.center,children:Jt.jsx("img",{src:"/logo.svg",alt:"AEE",style:Br.logo})}),Jt.jsx("div",{className:"footer-right",style:Br.right,children:"© 2026 AEE at USC"})]})}const Br={footer:{width:"100%",padding:"1rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid rgba(100, 160, 255, 0.2)",boxSizing:"border-box"},left:{display:"flex",gap:"2rem",flex:1},link:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1rem, 2vw, 2rem)",color:"rgba(255,255,255,0.6)",textDecoration:"none"},center:{flex:1,display:"flex",justifyContent:"center"},logo:{height:"60px",objectFit:"contain",filter:"brightness(0) invert(1)"},right:{flex:1,textAlign:"right",fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1rem, 2vw, 3rem)",color:"rgba(255,255,255,0.4)"}};function qR(){const[r,t]=os.useState(0),[n,s]=os.useState(!1);os.useEffect(()=>{function f(){const h=Math.min(window.scrollY/window.innerHeight,1);t(h)}return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]);const l=r*12,c=1-r;return Jt.jsxs("div",{style:Te.page,children:[Jt.jsxs("nav",{style:Te.nav,children:[Jt.jsx("div",{className:"desktop-nav-links",style:{display:"flex",gap:"2rem"},children:[{label:"About",href:"#about"},{label:"Design Teams",href:"#design-teams"},{label:"E-Board",href:"#e-board"}].map(({label:f,href:h})=>Jt.jsx("a",{href:h,style:Te.navLink,children:f},f))}),Jt.jsxs("button",{className:`hamburger ${n?"open":""}`,onClick:()=>s(!n),children:[Jt.jsx("span",{}),Jt.jsx("span",{}),Jt.jsx("span",{})]})]}),Jt.jsx("div",{className:`mobile-menu ${n?"open":""}`,children:[{label:"About",href:"#about"},{label:"Design Teams",href:"#design-teams"},{label:"E-Board",href:"#e-board"}].map(({label:f,href:h})=>Jt.jsx("a",{href:h,onClick:()=>s(!1),children:f},f))}),Jt.jsxs("div",{style:{...Te.hero,filter:`blur(${l}px)`,opacity:c},children:[Jt.jsx("div",{className:"aura-1"}),Jt.jsx("div",{className:"aura-2"}),Jt.jsxs("div",{style:Te.heroText,children:[Jt.jsx("h1",{style:Te.heading,children:"AEE at USC"}),Jt.jsxs("p",{style:Te.sub,children:["USC's hub for all things",Jt.jsx("br",{}),"energy and sustainability."]}),Jt.jsxs("div",{className:"hero-buttons",style:{display:"flex",gap:"1rem",marginTop:"1rem",pointerEvents:"auto"},children:[Jt.jsx("a",{href:"https://forms.gle/vSFAnuKfpKV3GFfJ6",style:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(0.5rem, 1.2vw, 1.5rem)",fontWeight:"400",color:"#1a2744",background:"#ffffff",padding:"0.85rem 2rem",borderRadius:"6px",textDecoration:"none",letterSpacing:"0.01em"},children:"Get Involved!"}),Jt.jsx("a",{href:"mailto:aeeusc@gmail.com",style:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(0.5rem, 1.2vw, 1.5rem)",fontWeight:"400",color:"#ffffff",background:"transparent",border:"2px solid rgba(255,255,255,0.6)",padding:"0.85rem 2rem",borderRadius:"6px",textDecoration:"none",letterSpacing:"0.01em"},children:"Contact"})]})]}),Jt.jsx(IR,{})]}),Jt.jsx("div",{style:{height:"100vh"}}),Jt.jsxs("div",{style:Te.aboutWrapper,children:[Jt.jsx(BR,{}),Jt.jsx(GR,{}),Jt.jsx(XR,{}),Jt.jsx(WR,{})]})]})}const Te={page:{width:"100vw",background:"#1a2744",fontFamily:"'Barlow', sans-serif",color:"#ffffff"},nav:{position:"fixed",top:0,left:0,width:"100%",display:"flex",justifyContent:"flex-end",gap:"1.5rem",padding:"1.25rem 3rem",zIndex:200,backdropFilter:"blur(8px)",boxSizing:"border-box"},navLink:{color:"#ffffff",textDecoration:"none",fontSize:"clamp(0.8rem, 1.2vw, 1.5rem)",fontFamily:"'Barlow', sans-serif",letterSpacing:"0.01em"},hero:{position:"fixed",top:0,left:0,width:"100%",height:"100vh",zIndex:1,transition:"filter 0.05s linear, opacity 0.05s linear"},heroText:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"4rem",pointerEvents:"none"},heading:{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(2.5rem, 5vw, 4rem)",fontWeight:"400",margin:"0 0 0.5rem",letterSpacing:"-0.01em",textAlign:"center"},sub:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1.2rem, 1.5vw, 2rem)",fontWeight:"400",color:"rgba(255,255,255,0.85)",textAlign:"center",lineHeight:1.6},aboutWrapper:{position:"relative",zIndex:50,borderRadius:"24px 24px 0 0",marginTop:"-24px"},aboutSection:{width:"100%",maxWidth:"1200px",margin:"0 auto",padding:"6rem 2rem 6rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"2.5rem"},aboutHeading:{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(1.8rem, 4vw, 3rem)",fontWeight:"400",textAlign:"center"},statsRow:{display:"flex",gap:"1.5rem",justifyContent:"center",flexWrap:"wrap",width:"100%"},statCard:{flex:"1 1 220px",maxWidth:"300px",border:"1.5px solid rgba(100, 160, 255, 0.35)",borderRadius:"12px",padding:"2rem 1.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},statNumber:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1.5rem, 3vw, 2rem)",fontWeight:"700",color:"#B9CDE6"},statLabel:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1.2rem, 1.5vw, 2rem)",color:"rgba(255,255,255,0.8)",textAlign:"center",lineHeight:1.4},aboutText:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1rem, 1.5vw, 1.8rem)",color:"rgba(255,255,255,0.8)",textAlign:"center",lineHeight:1.8,maxWidth:"1000px"},connectionsHeading:{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(1.8rem, 3vw, 2.6rem)",fontWeight:"700",color:"#ffffff",letterSpacing:"0.08em"},logosGrid:{display:"flex",flexWrap:"wrap",gap:"1rem",justifyContent:"center",width:"100%"},logoPlaceholder:{borderRadius:"8px",padding:"0.75rem 1.5rem",display:"flex",alignItems:"center",justifyContent:"center",minWidth:"100px"},dtSection:{width:"100%",padding:"4rem 0 0",display:"flex",flexDirection:"column",alignItems:"center",gap:"2.5rem"},dtHeading:{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(1.8rem, 4vw, 3rem)",fontWeight:"400",textAlign:"center",color:"#ffffff"},dtGrid:{display:"flex",flexDirection:"row",width:"100%",height:"72vh",overflow:"hidden"},dtCard:{position:"relative",overflow:"hidden",transition:"flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",display:"flex",alignItems:"flex-end",justifyContent:"flex-start",cursor:"pointer"},dtCardImg:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",transition:"filter 0.4s ease"},dtVerticalTitle:{position:"relative",zIndex:2,writingMode:"vertical-rl",transform:"rotate(180deg)",fontFamily:"'DM Serif Display', serif",fontSize:"clamp(1.8rem, 4vw, 3rem)",fontWeight:"700",color:"#ffffff",padding:"2rem 1.8rem",lineHeight:1.2,textShadow:"0 2px 12px rgba(0,0,0,0.7)"},dtExpandedContent:{position:"absolute",inset:0,zIndex:2,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"clamp(2rem, 3vw, 3rem)",background:"linear-gradient(to top, rgba(29,48,71,0.88) 40%, transparent 100%)"},dtExpandedTitle:{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(1.5rem, 2vw, 5rem)",fontWeight:"400",color:"#ffffff",marginBottom:"1rem",lineHeight:1.3},dtExpandedDesc:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1rem, 1.1vw, 2rem)",color:"rgba(255,255,255,0.85)",lineHeight:1.7,marginBottom:"1.5rem",maxWidth:"600px"},ebSection:{width:"100%",maxWidth:"1200px",margin:"0 auto",padding:"6rem 2rem 8rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"2.5rem"},ebHeading:{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(1.8rem, 4vw, 3rem)",fontWeight:"400",textAlign:"center",color:"#ffffff"},ebGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem",width:"100%"},ebCard:{display:"flex",flexDirection:"row",alignItems:"center",border:"1.5px solid rgba(100, 160, 255, 0.3)",borderRadius:"10px",overflow:"hidden",height:"120px",background:"rgba(255,255,255,0.03)"},ebPhoto:{objectFit:"cover",objectPosition:"top",flexShrink:0,width:"100%",height:"100%"},ebInfo:{padding:"0.5rem 1rem",display:"flex",flexDirection:"column",gap:"0.3rem"},ebName:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(1rem, 1.6vw, 1.8rem)",fontWeight:"700",color:"#ffffff"},ebRole:{fontFamily:"'Barlow', sans-serif",fontSize:"clamp(0.8rem, 1.3vw, 1.5rem)",color:"rgba(255,255,255,0.7)"}};function YR(){return Jt.jsx(qR,{})}yS.createRoot(document.getElementById("root")).render(Jt.jsx(os.StrictMode,{children:Jt.jsx(YR,{})}));
