(()=>{"use strict";var e,t,l,n={4725:(e,t,l)=>{var n=l(758),r=l(8143),a=l(4669),c=l(611),u=l(543),o=l(8328),m=l(602),i=l(7911),E=l(711),s=l(9966),f=l(7793),p=l(5435),d=l(2992);const h="lg",g=function({setNavBarOpen:e}){const{colorMode:t,toggleColorMode:l}=(0,i.G6)(),r=(0,i.dU)("white","gray.800");return n.createElement(m.az,{as:"header",pos:"fixed",zIndex:10,w:"full",h:16,bgColor:r},n.createElement(E.z,{h:"full",p:4},n.createElement(E.z,null,n.createElement(s.K,{"aria-label":"Open navbar",display:{base:"inline-flex",[h]:"none"},onClick:()=>e(!0),icon:n.createElement(d.Znj,null),variant:"ghost"}),n.createElement(f.D,{size:"md"},"ToolBox")),n.createElement(p.h,null),n.createElement(s.K,{"aria-label":"Switch color mode",onClick:l,icon:"light"===t?n.createElement(d.vVA,null):n.createElement(d.q9U,null),variant:"ghost"})))};var b,v=l(2084),N=l(767),y=l(3240),B=l(6314),O=l(7983),C=l(8414),x=l(1087),w=l(5050);function T({to:e,label:t,exact:l,onNavBarClose:r}){const c=(0,i.dU)("gray.200","gray.700"),u=(0,i.dU)("gray.300","gray.600");return n.createElement(m.az,{as:"li",listStyleType:"none"},n.createElement(x.$,{as:a.k2,to:e,end:l,variant:"ghost",width:"full",borderRadius:0,justifyContent:"left",onClick:r,_hover:{background:c},_active:{background:u},sx:{"&.active":{background:u}}},t))}!function(e){e.CCPNormal="/ccp-normal",e.GachaNormal="/gacha-normal"}(b||(b={}));const P=function({onNavBarClose:e}){return n.createElement(w.T,{as:"ul",w:"full",alignItems:"stretch",spacing:0,pt:2},n.createElement(T,{to:b.GachaNormal,label:"가챠 확률 계산기",onNavBarClose:e}),n.createElement(T,{to:b.CCPNormal,label:"컴플리트 가챠 계산기",onNavBarClose:e}))},z=function({isOpen:e,onClose:t}){return n.createElement(n.Fragment,null,n.createElement(v._,{placement:"left",isOpen:e,onClose:t},n.createElement(N.m,null),n.createElement(y.z,{display:{base:"flex",[h]:"none"}},n.createElement(B.s,null),n.createElement(O.r,null,"Toolbox"),n.createElement(C.c,{p:0},n.createElement(P,{onNavBarClose:t})))),n.createElement(m.az,{as:"nav",pos:"fixed",top:16,display:{base:"none",[h]:"flex"},w:240},n.createElement(P,{onNavBarClose:t})))};var S=l(797);const M=function({children:e}){return n.createElement(m.az,{as:"main",pt:16,pl:{base:0,[h]:240}},n.createElement(S.m,{maxW:"container.xl",p:4},e))};var k=l(5346),I=l(6868),_=l(3416),j=l(3706),$=l(7377),Q=l(209),D=l(3665),F=l(5741),J=l(9954),A=l(4626),K=l(2779),U=l(5914),q=l(193),G=l(5355),X=l(8664),V=l(9607);function W(e,t){return 0===t?BigInt(1):new Array(t).fill(e).reduce(((e,t)=>e*t),BigInt(1))}function R(e,t,l){return Number(e*W(BigInt(10),l)/t)/Math.pow(10,l)}function Z(e){return 0===e?BigInt(1):new Array(e).fill(null).map(((e,t)=>BigInt(t+1))).reduce(((e,t)=>e*t),BigInt(1))}const H={};function L(e,t){if(0===e&&0===t)return BigInt(1);if(0===e||0===t)return BigInt(0);const l=`${e}-${t}`,n=H[l];if(void 0!==n)return n;const r=BigInt(t)*L(e-1,t)+L(e-1,t-1);return H[l]=r,r}const Y=function(){const[e,t]=n.useState("9"),[l,r]=n.useState(9);n.useEffect((()=>{window.scrollTo(0,0)}),[]);const a=Number.isNaN(l)||l<1?1:l>100?100:Math.floor(l),c=function(e){const t=Z(e);let l=W(BigInt(e),e),n=e,r=R(t*BigInt(100),l,6);const a=[{trial:n,accProbPercent:r}];let c=5;for(;r<99;)l*=BigInt(e),n+=1,r=R(t*L(n,e)*BigInt(100),l,6),r>c&&(a.push({trial:n,accProbPercent:r}),c+=c<90?5:1);return a}(a);return n.createElement(k.B,{spacing:6},n.createElement(f.D,{size:"lg"},"컴플리트 가챠 계산기"),n.createElement(k.B,null,n.createElement(o.E,null,"모든 아이템이 뽑힐 확률이 균등할 때, 복원 추출로 몇 회를 뽑아야 모든 아이템을 모을 수 있을지 계산하는 계산기입니다."),n.createElement(o.E,null,"대표적으로 캔뱃지 컴플리트 확률 계산 등에 쓰일 수 있습니다."),n.createElement(o.E,null,"계산에 사용한 식은 ",n.createElement(I.N,{href:"https://math.stackexchange.com/a/1454749",isExternal:!0,color:"green.500"},"이 링크"),"를 참조하였습니다.")),n.createElement(_.MJ,{id:"item-count"},n.createElement(j.l,null,"전체 아이템 갯수 (최대 100)"),n.createElement(k.B,null,n.createElement($.Q7,{min:1,max:100,step:1,value:e,onChange:(e,l)=>{t(e),r(l)}},n.createElement($.OO,null),n.createElement($.lw,null,n.createElement($.Q0,null),n.createElement($.Sh,null))),n.createElement(Q.Ap,{focusThumbOnChange:!1,value:l,onChange:e=>{r(e),t(String(e))}},n.createElement(Q.hB,null,n.createElement(Q.hJ,null)),n.createElement(Q.OQ,{boxSize:6}))),n.createElement(_.eK,null,"가챠에서 나올 수 있는 아이템의 갯수입니다. 모든 아이템은 균등 확률로 뽑힘을 가정합니다.")),n.createElement(D.c,null),n.createElement(f.D,{size:"lg"},`${a}개 아이템에 대한 계산 결과`),n.createElement(F.r,null,n.createElement(J.v,null,"시행 기대 횟수"),n.createElement(A.k,null,`${function(e){return e*new Array(e).fill(null).map(((e,t)=>1/(t+1))).reduce(((e,t)=>e+t),0)}(a).toFixed(2)}회`)),n.createElement(f.D,{size:"md"},"전체 확률표 (99%까지)"),n.createElement(K.X,null,n.createElement(U.d,null,n.createElement(q.Tr,null,n.createElement(G.Th,null,"뽑기 횟수"),n.createElement(G.Th,{isNumeric:!0},"컴플리트 확률"))),n.createElement(X.N,null,c.map((e=>n.createElement(q.Tr,{key:e.trial},n.createElement(V.Td,null,`${e.trial}회`),n.createElement(V.Td,{isNumeric:!0},`${e.accProbPercent.toFixed(5)}%`)))))))};var ee=l(3536),te=l(3525),le=l(4852);function ne(e,t,l,n){const r=Math.round(100*l),a=W(BigInt(1e4),e);return R(function(e,t){return Z(e)/(Z(t)*Z(e-t))}(e,t)*W(BigInt(r),t)*W(BigInt(1e4-r),e-t)*BigInt(100),a,n)}const re=1e3,ae=function(){const e=(0,i.dU)("gray.600","gray.400"),[t,l]=n.useState("1.00"),[r,a]=n.useState(1),[c,u]=n.useState("1"),[m,s]=n.useState(1),[p,d]=n.useState("1"),[g,b]=n.useState(1),[v,N]=n.useState("99.99"),[y,B]=n.useState(99.99);n.useEffect((()=>{window.scrollTo(0,0)}),[]);const O=Number.isNaN(r)||r<.01?.01:r>100?100:Math.floor(100*r)/100,C=Number.isNaN(m)||m<1?1:m>re?re:Math.floor(m),x=Number.isNaN(g)||g<1?1:g>re?re:Math.floor(g),w=Number.isNaN(y)||y<.01?.01:y>99.99?99.99:Math.floor(100*y)/100,T=function(e){const t=e/100;let l=1,n=100*(1-Math.pow(1-t,l));const r=[{trial:l,probPercent:n}];let a=10;for(;n<99;)l+=1,n=100*(1-Math.pow(1-t,l)),n>a&&(r.push({trial:l,probPercent:n}),a<90?a+=10:a=a<95?95:99);return r}(O),P=function(e,t){let l=0,n=ne(t,l,e,6),r=n;const a=[{itemCount:l,probPercent:n,accProbPercent:r}];for(;l<Math.min(t,10);)l+=1,n=ne(t,l,e,6),r+=n,a.push({itemCount:l,probPercent:n,accProbPercent:r});return a}(O,C),z=function(e,t,l){if(e<t)return NaN;if(t<e/2){let n=0;for(let r=0;r<t;r+=1)n+=ne(e,r,l,6);return 100-n}let n=0;for(let r=t;r<=e;r+=1)n+=ne(e,r,l,6);return n}(C,x,O),S=Math.ceil(Math.log(1-w/100)/Math.log(1-O/100));return n.createElement(k.B,{spacing:6},n.createElement(f.D,{size:"lg"},"가챠 확률 계산기"),n.createElement(k.B,null,n.createElement(o.E,null,"가챠 뽑기와 관련된 각종 확률을 계산합니다."),n.createElement(o.E,null,"모든 뽑기는 복원 추출임을 가정합니다.")),n.createElement(_.MJ,{id:"probability"},n.createElement(j.l,null,"가챠 1회의 확률"),n.createElement(E.z,null,n.createElement($.Q7,{min:.01,max:100,precision:2,step:.01,value:t,onChange:(e,t)=>{l(e),a(t)}},n.createElement($.OO,null),n.createElement($.lw,null,n.createElement($.Q0,null),n.createElement($.Sh,null))),n.createElement(o.E,null,"%")),n.createElement(_.eK,null,"1회의 가챠에서 원하는 아이템이 나올 확률입니다.")),n.createElement(D.c,null),n.createElement(ee.x,{templateColumns:{base:"repeat(1, 1fr)",[h]:"repeat(2, 1fr)"},gap:4},n.createElement(te.E,null,n.createElement(k.B,{spacing:6},n.createElement(f.D,{size:"lg"},"n회 뽑기에서 m개 이상 뽑을 확률"),n.createElement(le.B,{shouldWrapChildren:!0,spacing:6},n.createElement(_.MJ,{id:"trial-count-2"},n.createElement(j.l,null,"가챠 시도 횟수 (최대 1000회)"),n.createElement(E.z,null,n.createElement($.Q7,{min:1,max:re,step:1,value:c,onChange:(e,t)=>{u(e),s(t)}},n.createElement($.OO,null),n.createElement($.lw,null,n.createElement($.Q0,null),n.createElement($.Sh,null))),n.createElement(o.E,null,"회"))),n.createElement(_.MJ,{id:"target-count"},n.createElement(j.l,null,"목표 갯수 (최대 1000회)"),n.createElement(E.z,null,n.createElement($.Q7,{min:1,max:re,step:1,value:p,onChange:(e,t)=>{d(e),b(t)}},n.createElement($.OO,null),n.createElement($.lw,null,n.createElement($.Q0,null),n.createElement($.Sh,null))),n.createElement(o.E,null,"회")))),n.createElement(F.r,null,n.createElement(A.k,null,`${z.toFixed(5)}%`)),n.createElement(D.c,null))),n.createElement(te.E,null,n.createElement(k.B,{spacing:6},n.createElement(f.D,{size:"lg"},"n% 이상 확률로 뽑기 위한 최소 시도 횟수"),n.createElement(_.MJ,{id:"target-prob"},n.createElement(j.l,null,"목표 확률 (최대 99.99%)"),n.createElement(E.z,null,n.createElement($.Q7,{min:.01,max:99.99,precision:2,step:.01,value:v,onChange:(e,t)=>{N(e),B(t)}},n.createElement($.OO,null),n.createElement($.lw,null,n.createElement($.Q0,null),n.createElement($.Sh,null))),n.createElement(o.E,null,"%"))),n.createElement(F.r,null,n.createElement(A.k,null,`${S}회`)),n.createElement(D.c,null))),n.createElement(te.E,null,n.createElement(k.B,{spacing:6},n.createElement(f.D,{size:"lg"},"1개 뽑기 계산 결과"),n.createElement(F.r,null,n.createElement(J.v,null,"시행 기대 횟수"),n.createElement(A.k,null,`${(100/O).toFixed(2)}회`)),n.createElement(k.B,null,n.createElement(f.D,{size:"md"},"1개 이상 뽑기 확률표 (99%까지)"),n.createElement(o.E,{color:e},"(가챠 횟수)번 가챠를 시도하면 (확률) 확률로 1개 이상 뽑을 수 있습니다.")),n.createElement(K.X,null,n.createElement(U.d,null,n.createElement(q.Tr,null,n.createElement(G.Th,null,"가챠 횟수"),n.createElement(G.Th,{isNumeric:!0},"확률"))),n.createElement(X.N,null,T.map((e=>n.createElement(q.Tr,{key:e.trial},n.createElement(V.Td,null,`${e.trial}회`),n.createElement(V.Td,{isNumeric:!0},`${e.probPercent.toFixed(5)}%`)))))))),n.createElement(te.E,null,n.createElement(k.B,{spacing:6},n.createElement(f.D,{size:"lg"},"다회 가챠 계산 결과"),n.createElement(_.MJ,{id:"trial-count"},n.createElement(j.l,null,"가챠 시도 횟수 (최대 1000회)"),n.createElement(E.z,null,n.createElement($.Q7,{min:1,max:1e3,step:1,value:c,onChange:(e,t)=>{u(e),s(t)}},n.createElement($.OO,null),n.createElement($.lw,null,n.createElement($.Q0,null),n.createElement($.Sh,null))),n.createElement(o.E,null,"회"))),n.createElement(k.B,null,n.createElement(f.D,{size:"md"},"뽑기 갯수 확률표 (10개까지)"),n.createElement(o.E,{color:e},"주어진 횟수만큼 가챠를 시도하면 (뽑은 갯수)개 뽑을 확률이 (확률)입니다.")),n.createElement(K.X,null,n.createElement(U.d,null,n.createElement(q.Tr,null,n.createElement(G.Th,null,"뽑은 갯수"),n.createElement(G.Th,{isNumeric:!0},"확률"),n.createElement(G.Th,{isNumeric:!0},"누적 확률"))),n.createElement(X.N,null,P.map((e=>n.createElement(q.Tr,{key:e.itemCount},n.createElement(V.Td,null,`${e.itemCount}개`),n.createElement(V.Td,{isNumeric:!0},`${e.probPercent.toFixed(5)}%`),n.createElement(V.Td,{isNumeric:!0},`${e.accProbPercent.toFixed(5)}%`))))))))))};function ce(){return n.createElement(o.E,null,"메뉴를 선택해주세요")}const ue=function(){const[e,t]=n.useState(!1);return n.createElement(m.az,null,n.createElement(g,{setNavBarOpen:t}),n.createElement(z,{isOpen:e,onClose:()=>t(!1)}),n.createElement(M,null,n.createElement(u.BV,null,n.createElement(u.qh,{path:b.CCPNormal,element:n.createElement(Y,null)}),n.createElement(u.qh,{path:b.GachaNormal,element:n.createElement(ae,null)}),n.createElement(u.qh,{path:"*",element:n.createElement(ce,null)}))))};r.render(n.createElement((function(){return n.createElement(c.s,null,n.createElement(a.Kd,null,n.createElement(ue,null)))}),null),document.getElementById("app"))}},r={};function a(e){var t=r[e];if(void 0!==t)return t.exports;var l=r[e]={id:e,loaded:!1,exports:{}};return n[e](l,l.exports,a),l.loaded=!0,l.exports}a.m=n,e=[],a.O=(t,l,n,r)=>{if(!l){var c=1/0;for(i=0;i<e.length;i++){for(var[l,n,r]=e[i],u=!0,o=0;o<l.length;o++)(!1&r||c>=r)&&Object.keys(a.O).every((e=>a.O[e](l[o])))?l.splice(o--,1):(u=!1,r<c&&(c=r));if(u){e.splice(i--,1);var m=n();void 0!==m&&(t=m)}}return t}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[l,n,r]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},l=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var r=Object.create(null);a.r(r);var c={};t=t||[null,l({}),l([]),l(l)];for(var u=2&n&&e;"object"==typeof u&&!~t.indexOf(u);u=l(u))Object.getOwnPropertyNames(u).forEach((t=>c[t]=()=>e[t]));return c.default=()=>e,a.d(r,c),r},a.d=(e,t)=>{for(var l in t)a.o(t,l)&&!a.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={792:0};a.O.j=t=>0===e[t];var t=(t,l)=>{var n,r,[c,u,o]=l,m=0;if(c.some((t=>0!==e[t]))){for(n in u)a.o(u,n)&&(a.m[n]=u[n]);if(o)var i=o(a)}for(t&&t(l);m<c.length;m++)r=c[m],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(i)},l=self.webpackChunkreact_typescript_boilerplate=self.webpackChunkreact_typescript_boilerplate||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})(),a.nc=void 0;var c=a.O(void 0,[721],(()=>a(4725)));c=a.O(c)})();