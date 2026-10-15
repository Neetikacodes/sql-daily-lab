const $=s=>document.querySelector(s),KEY='sqllab_v1';
const DEF={les:{},cas:{},quiz:{},att:0,bm:{},last:null,conf:{},iv:{}};
let S;try{S={...DEF,...JSON.parse(localStorage.getItem(KEY))}}catch(e){S={...DEF}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const KW='SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|LEFT JOIN|INNER JOIN|JOIN|ON|AS|AND|OR|NOT|IN|IS|NULL|LIMIT|DISTINCT|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION BY|DESC|ASC|COUNT|SUM|AVG|MIN|MAX|ROUND|LAG|RANK|ROW_NUMBER|TO_CHAR|EXISTS';
const hl=s=>esc(s).replace(new RegExp(`(--[^\\n]*)|('[^']*')|\\b(${KW})\\b|(\\b\\d+\\.?\\d*\\b)`,'gi'),(m,c,q,k,n)=>c?`<span class="c">${c}</span>`:q?`<span class="s">${q}</span>`:k?`<span class="k">${k}</span>`:`<span class="n">${n}</span>`);
const CP=[];const sqlBox=s=>`<div class="sql"><button class="sec" data-cp="${CP.push(s)-1}">Copy Query</button><pre>${hl(s)}</pre></div>`;
const tab=t=>`<div class="tw"><table><thead><tr>${t.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
document.addEventListener('click',e=>{const i=e.target.dataset.cp;if(i===undefined)return;const t=CP[i],b=e.target;const done=()=>{b.textContent='Copied!';setTimeout(()=>b.textContent='Copy Query',1200)};
 if(navigator.clipboard)navigator.clipboard.writeText(t).then(done,()=>b.textContent='Copy nahi hua');else{const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();try{document.execCommand('copy');done()}catch(x){}a.remove()}});
const ld=()=>Object.keys(S.les).length;
function view(h){const[,r,a]=h.split('/');CP.length=0;const m=$('#main');
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.getAttribute('href')==='#/'+r));
 if(r==='les'&&a&&L.find(x=>x.id==a))return lesson(L.find(x=>x.id==a),m);if(r==='les')return lessons(m);
 if(r==='case')return a?casePage(m):cases(m);if(r==='iv')return iv(m);if(r==='ref')return ref(m);if(r==='prog')return prog(m);if(r==='about')return about(m);home(m)}
function home(m){const nx=L.find(l=>!S.les[l.id]);
 m.innerHTML=`<h1>SQL Daily Lab</h1><p class="mu">Business problems se SQL seekho: pehle problem samjho, phir concept, phir query. Technical terms English mein hain, samjhaana Hinglish mein.</p>
 ${nx?`<div class="panel"><b>Aapka next step:</b> <a href="#/les/${nx.id}">${nx.t}</a>${S.last?` &nbsp;|&nbsp; <a href="#/les/${S.last}">Last lesson par wapas</a>`:''}</div>`:'<div class="panel">Saare available lessons complete. Ab Business Case aur Interview Prep try karo.</div>'}
 <h2>Learning Roadmap (13 stages)</h2>${ROAD.map((r,i)=>{const n=i+1,ls=r[3].map(id=>L.find(l=>l.id===id)),av=ls.length?'Lessons: '+ls.map(l=>`<a href="#/les/${l.id}">${l.t}</a>`).join(', '):(AV[n]?AV[n]:'Is build mein available nahi hai.');
  return `<div class="item"><b>${n}. ${r[0]}</b><br>${r[1]} <span class="mu">Iske baad: ${r[2]}</span><br><span class="mu">${av}</span></div>`}).join('')}`}
function lessons(m){m.innerHTML=`<h1>Concept Academy</h1><p class="mu">${L.length} lessons available. Ek lesson mein ek hi concept.</p>`+L.map(l=>`<div class="item ${S.les[l.id]?'done':''}"><span class="tag">${l.lv}</span><br><b><a href="#/les/${l.id}">${l.id}. ${l.t}</a></b>${S.bm[l.id]?' ★':''}${S.les[l.id]?' <span class="ok">✓</span>':''}</div>`).join('')}
function lesson(l,m){S.last=l.id;save();
 m.innerHTML=`<h1>${l.t}</h1><span class="tag">${l.lv}</span> <button class="sec" id="bm">${S.bm[l.id]?'★ Bookmarked':'☆ Bookmark'}</button>
 <h2>Yeh kya hai?</h2><p>${l.mean}</p><h2>Business kyun use karta hai</h2><p>${l.why}</p><p><b>Kab use karein:</b> ${l.when}<br><b>Kab nahi:</b> ${l.not}</p>
 <h2>Syntax</h2>${sqlBox(l.syn)}<p class="mu">Dialect: PostgreSQL. SQL Server mein LIMIT ki jagah TOP hota hai (Reference page dekho).</p>
 <h2>Example aur expected output</h2>${sqlBox(l.sql)}${tab(l.out)}<details><summary>Why does this work? (line by line)</summary><ul>${l.lines.map(x=>`<li>${x}</li>`).join('')}</ul></details>
 <h2>Common mistakes</h2><ul>${l.mist.map(x=>`<li>${x}</li>`).join('')}</ul><p><b>Business example:</b> ${l.biz}</p>
 <h2>Knowledge check</h2><p>${l.q.q}</p>${l.q.o.map((o,i)=>`<label><input type="radio" name="qz" value="${i}"> ${o}</label><br>`).join('')}<p><button id="qb">Check</button> <span id="qr"></span></p>
 <h2>Summary</h2><p>${l.sum}</p>${l.case?`<p><a class="btn" href="#/case/1">Related business case dekho</a></p>`:''}
 <h2>Practise on a Real SQL Platform</h2><p class="mu">Query khud likho, kisi real database par chalao, output expected output se compare karo, edge cases test karo, aur query ko interview ki tarah zubaani explain karo. Links: Real Platform Practice page.</p>
 <h2>Confidence aur completion</h2><p>Aap kitna confident hain? <select id="cf"><option value="">Chuno</option>${[1,2,3,4,5].map(i=>`<option ${S.conf[l.id]==i?'selected':''}>${i}</option>`)}</select> <button id="dn">${S.les[l.id]?'Completed (undo)':'Mark complete'}</button></p>`;
 $('#bm').onclick=()=>{S.bm[l.id]?delete S.bm[l.id]:S.bm[l.id]=1;save();lesson(l,m)};
 $('#cf').onchange=e=>{S.conf[l.id]=e.target.value;save()};
 $('#dn').onclick=()=>{S.les[l.id]?delete S.les[l.id]:S.les[l.id]=1;save();lesson(l,m)};
 $('#qb').onclick=()=>{const s=document.querySelector('input[name=qz]:checked');if(!s){$('#qr').innerHTML='<span class="no">Pehle option chuno</span>';return}const ok=+s.value===l.q.a;S.quiz[l.id]=ok;S.att++;save();$('#qr').innerHTML=ok?'<span class="ok">Sahi!</span>':'<span class="no">Galat, summary dobara padho.</span>'}}
function cases(m){m.innerHTML=`<h1>Business Case Library</h1><p class="mu">Is build mein 1 poora case available hai. Baaki cases abhi built nahi hain.</p><div class="item ${S.cas[1]?'done':''}"><b><a href="#/case/1">${CASE.t}</a></b> <span class="tag">Sales</span><span class="tag">Advanced</span>${S.cas[1]?' <span class="ok">✓</span>':''}</div>`}
function casePage(m){const c=CASE;S.last=S.last;save();
 m.innerHTML=`<h1>${c.t}</h1><p class="mu">Dialect: PostgreSQL. SQLite par chalane ke liye TO_CHAR(x,'YYYY-MM') ki jagah strftime('%Y-%m', x) likho.</p>`+c.steps.map((s,i)=>`<details ${i<3?'open':''}><summary>Step ${i+1}: ${s[0]}</summary><p>${s[1]}</p>${i===3?`<p><b>Sample data:</b> ${tab(T(['table','rows','columns'],[['regions',4,'region_id, region_name'],['products',6,'product_id, name, category, price'],['orders',OR.length,'order_id, order_date, region_id, status'],['order_items',OI.length,'order_id, product_id, qty, unit_price']]))}${tab(T(['order_id','order_date','region_id','status'],OR.slice(0,5)))}</p>`:''}${i===6?c.q.map(q=>`<h3>${q.n}</h3>${sqlBox(q.sql)}${tab(q.out)}<p class="mu">${q.note}</p>`).join(''):''}${i===9?`<details><summary>Hint</summary>${c.hint}</details><details><summary>Show Solution</summary>${sqlBox(c.sol)}<p class="mu">Output khud chalake dekho. Isi pattern ka dusra region/month hai.</p></details>`:''}</details>`).join('')+`<p><button id="cd">${S.cas[1]?'Completed (undo)':'Mark case complete'}</button></p>`;
 $('#cd').onclick=()=>{S.cas[1]?delete S.cas[1]:S.cas[1]=1;save();casePage(m)}}
let I={i:0,show:false};
function iv(m){const q=IVQ[I.i],n=IVQ.length,res=S.iv;
 m.innerHTML=`<h1>Interview Prep</h1><p class="mu">${n} questions available. Pehle khud jawab socho. Answer chhupa hai.</p><div class="card"><span class="tag">${q.lv}</span><span class="tag">${q.sk}</span> <span class="mu">Question ${I.i+1}/${n}</span><p><b>${q.q}</b></p><p class="mu">Schema: ${q.sc}</p>
 <button class="sec" id="sa">${I.show?'Answer chhupao':'Show Answer'}</button>${I.show?`<div class="panel"><b>Reasoning:</b> ${q.re}${sqlBox(q.a)}<b>Explanation:</b> ${q.ex}<br><b>Common galti:</b> ${q.mi}<br><b>Follow-up:</b> ${q.fu}</div><p>Aapka jawab: <button id="ok">Sahi tha</button> <button class="sec" id="no">Phir se practice</button></p>`:''}</div>
 <div class="row"><button class="sec" id="pv">Pichhla</button> <button class="sec" id="nx">Agla</button></div><p>Saved results: Sahi ${Object.values(res).filter(x=>x==='ok').length}, Practice baaki ${Object.values(res).filter(x=>x==='again').length}, Bina attempt ${n-Object.keys(res).length}</p>`;
 $('#sa').onclick=()=>{I.show=!I.show;iv(m)};
 if(I.show){$('#ok').onclick=()=>{res[I.i]='ok';save();iv(m)};$('#no').onclick=()=>{res[I.i]='again';save();iv(m)}}
 $('#pv').onclick=()=>{I.i=(I.i+n-1)%n;I.show=false;iv(m)};$('#nx').onclick=()=>{I.i=(I.i+1)%n;I.show=false;iv(m)}}
function ref(m){m.innerHTML=`<h1>Reference &amp; Glossary</h1><input id="gq" placeholder="Term search karo" aria-label="Search glossary"><div id="gl"></div><h2>Dialect differences</h2><div class="tw"><table><tr><th>Task</th><th>PostgreSQL</th><th>MySQL</th><th>SQLite</th><th>SQL Server</th></tr>${DIA.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>`;
 const d=()=>{const q=$('#gq').value.toLowerCase(),f=GL.filter(g=>(g[0]+g[1]).toLowerCase().includes(q));$('#gl').innerHTML=f.map(g=>`<div class="item"><b>${g[0]}</b>: ${g[1]}</div>`).join('')||'<p>Koi term nahi mila.</p>'};d();$('#gq').oninput=d}
function prog(m){const nq=Object.values(S.quiz).filter(Boolean).length,cf=Object.keys(S.conf).filter(k=>S.conf[k]);
 m.innerHTML=`<h1>Progress</h1><div class="cards"><div class="card"><b>${ld()}/${L.length}</b>Lessons complete</div><div class="card"><b>${Object.keys(S.cas).length}/1</b>Cases complete</div><div class="card"><b>${nq}</b>Quizzes sahi</div><div class="card"><b>${S.att}</b>Quiz attempts</div><div class="card"><b>${Object.keys(S.bm).length}</b>Bookmarks</div></div>
 <h2>Confidence</h2>${cf.length?cf.map(k=>`<p>${L.find(l=>l.id==k).t}: ${S.conf[k]}/5</p>`).join(''):'<p class="mu">Abhi koi confidence rating nahi di.</p>'}
 <h2>Bookmarks</h2>${Object.keys(S.bm).length?Object.keys(S.bm).map(k=>`<p><a href="#/les/${k}">${L.find(l=>l.id==k).t}</a></p>`).join(''):'<p class="mu">Koi bookmark nahi.</p>'}
 <p class="mu">Progress sirf is browser mein save hota hai (LocalStorage) aur doosre device par sync nahi hota.</p><button class="sec" id="rs">Progress reset karo</button>`;
 $('#rs').onclick=()=>{if(confirm('Saara saved progress delete karein?')){S={...DEF,les:{},cas:{},quiz:{},bm:{},conf:{},iv:{}};save();prog(m)}}}
function about(m){m.innerHTML=`<h1>Real SQL Platform par Practice</h1><p>Yeh website samjhaane ke liye hai, professional database software ka replacement nahi. Hamare lessons ke outputs real SQL engine par verify kiye gaye hain, par yeh site khud queries run nahi karti.</p><p>Har topic ke baad: query khud likho, kisi real database par chalao, output compare karo, edge cases test karo, aur interview ki tarah explain karo.</p>${LINKS.map(l=>`<div class="item"><b><a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a></b> <span class="mu">(external site) ${l[2]}</span></div>`).join('')}<p class="mu">Yeh sites is website se connected nahi hain. Links aaj dobara open karke check nahi kiye gaye.</p>`}
addEventListener('hashchange',()=>{view(location.hash);$('#main').focus()});view(location.hash||'#/home');
