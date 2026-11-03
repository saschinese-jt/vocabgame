/* Student profile and one-code cloud backup. */
(() => {
  'use strict';
  const BACKUP_URL = ''; // Paste your existing Apps Script /exec URL.
  const KEY = 'cwqProfile_v2';
  const $ = id => document.getElementById(id);
  const parse = (raw, fallback = {}) => { try { return JSON.parse(raw) || fallback; } catch { return fallback; } };
  const profile = Object.assign({name:'',stream:'G3',code:'',revision:0,synced:''}, parse(localStorage.getItem(KEY)));
  const persist = () => localStorage.setItem(KEY, JSON.stringify(profile));
  const empty = () => ({best:{},draft:null,submittedBest:null});
  const storageKey = stream => `cwqProgress_v2_${stream}`;
  const getProgress = stream => stream === currentStream ? progressData : parse(localStorage.getItem(storageKey(stream)),empty());
  const allProgress = () => Object.fromEntries(['G3','G2','G1'].map(s => [s,getProgress(s)]));
  // Ignore timer-only changes and unchanged replays in the status indicator.
  const summary = d => ({best:d?.best||{},found:d?.draft?.found||[],draftKey:d?.draft?.key||''});
  const signature = () => JSON.stringify({name:profile.name,stream:profile.stream,...Object.fromEntries(['G3','G2','G1'].map(s=>[s,summary(getProgress(s))]))});
  const normCode = s => String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const printCode = s => normCode(s).replace(/.{1,4}/g,'$&-').replace(/-$/,'');
  const el = (tag,caption,cls) => {const n=document.createElement(tag);if(caption)n.textContent=caption;if(cls)n.className=cls;return n};
  const style=el('style');style.textContent=`
    .cwq-user{position:fixed;top:9px;right:10px;z-index:100;font:inherit;color:#54483f}
    .cwq-toggle{display:flex;align-items:center;gap:5px;max-width:165px;padding:7px 10px;background:#fffdf8;border:3px solid #54483f;border-radius:13px;box-shadow:3px 4px #54483f;font-weight:800;color:#54483f;cursor:pointer}
    .cwq-user-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:105px}
    .cwq-menu{position:absolute;right:0;top:calc(100% + 11px);width:min(276px,calc(100vw - 20px));padding:14px;background:#fffdf8;border:3px solid #54483f;border-radius:15px;box-shadow:5px 6px #54483f}
    .cwq-menu[hidden],.cwq-shade[hidden],.cwq-quiet[hidden]{display:none!important}
    .cwq-menu button{display:block;width:100%;margin-top:5px;padding:9px 7px;text-align:left;background:none;border:0;border-radius:8px;color:#54483f;font:inherit;font-weight:650;cursor:pointer}
    .cwq-menu button:hover{background:#f6f0e7}
    .cwq-state{font-size:14px;font-weight:850;white-space:nowrap}.cwq-en{font-size:11px;color:#7d746a;white-space:nowrap;margin-top:2px}
    .cwq-rule{height:1px;background:#ded4c9;margin:10px 0}
    .cwq-shade{position:fixed;inset:0;z-index:300;display:flex;align-items:center;justify-content:center;padding:16px;background:#352a24aa}
    .cwq-card{width:min(410px,100%);max-height:92dvh;overflow:auto;padding:22px;background:#fffdf8;border:4px solid #54483f;border-radius:19px;box-shadow:6px 7px #54483f;color:#54483f}
    .cwq-card h2{font-size:23px;line-height:1.3;color:#14294d;margin:0 0 16px}
    .cwq-card input,.cwq-card select{box-sizing:border-box;display:block;width:100%;margin:5px 0 12px;padding:10px 12px;font:inherit;font-size:16px;background:white;border:2px solid #54483f;border-radius:9px;color:#54483f}
    .cwq-card label{display:block;margin:10px 0 2px;font-size:14px;font-weight:750}
    .cwq-card button{padding:10px 12px;margin:10px 7px 0 0;background:#ffd447;color:#54483f;border:2px solid #54483f;border-radius:10px;font:inherit;font-weight:750;cursor:pointer}
    .cwq-card button.secondary{background:#f0ede6}.cwq-card button:disabled{opacity:.55}
    .cwq-card .cwq-detail{color:#7d746a;font-size:12px;line-height:1.5;margin:5px 0 12px}
    .cwq-card .cwq-error{color:#a63f30;font-size:13px;line-height:1.5;margin:12px 0 0}
    .cwq-code{font:800 20px ui-monospace,monospace;background:#eaf1f6;padding:12px;border-radius:9px;overflow-wrap:anywhere}
    .cwq-quiet{display:block;margin:11px auto 0;border:none;background:transparent;color:#756c64;font-size:12px;text-decoration:underline;cursor:pointer}
    @media(max-width:700px){.cwq-user{right:6px;top:5px}.cwq-toggle{max-width:113px;padding:6px 7px;font-size:12px}.cwq-user-name{max-width:68px}.cwq-menu{padding:12px}}
  `;document.head.append(style);
  const wrap=el('div',null,'cwq-user');
  const toggle=el('button',null,'cwq-toggle');toggle.type='button';
  const symbol=el('span','👤');const nameText=el('span',null,'cwq-user-name');toggle.append(symbol,nameText,el('span','▾'));
  const menu=el('div',null,'cwq-menu');menu.hidden=true;
  const state=el('div',null,'cwq-state'), en=el('div',null,'cwq-en');menu.append(state,en,el('div',null,'cwq-rule'));
  function menuButton(text,action){const b=el('button',text);b.type='button';b.onclick=()=>{menu.hidden=true;action()};menu.append(b)}
  menuButton('备份学习进度',()=>open('save'));
  menuButton('使用恢复码',()=>open('restore'));
  menuButton('编辑昵称',()=>open('name'));
  menuButton('切换华文源流',()=>open('streamConfirm'));
  menuButton('学习历程',()=>showSetup('journey'));
  menuButton('导出词语笔记 PDF',()=>{showSetup('journey');$('export-vocab-pdf')?.click()});
  wrap.append(toggle,menu);document.body.append(wrap);
  toggle.onclick=()=>{menu.hidden=!menu.hidden;update()};
  document.addEventListener('click',e=>{if(!wrap.contains(e.target))menu.hidden=true});
  const shade=el('div',null,'cwq-shade');shade.hidden=true;
  const card=el('section',null,'cwq-card');shade.append(card);document.body.append(shade);
  let busy=false,pending=null,nonce=0;
  const hint=t=>card.append(el('p',t,'cwq-detail'));
  const title=t=>card.append(el('h2',t));
  const error=t=>{const old=card.querySelector('.cwq-error');if(old)old.remove();card.append(el('p',t,'cwq-error'))};
  const button=(label,fn,secondary=false)=>{const b=el('button',label,secondary?'secondary':'');b.type='button';b.onclick=fn;card.append(b);return b};
  const field=(label,value='',max=30)=>{card.append(el('label',label));const input=el('input');input.value=value;input.maxLength=max;input.autocomplete='off';card.append(input);return input};
  function close(){if(!busy)shade.hidden=true}
  function nickname(value){const name=value.trim().replace(/\s+/g,' ');if(!name||Array.from(name).length>20)throw Error('昵称须为1至20个字符。');if(!/[\p{L}\p{N}]/u.test(name))throw Error('请输入有效昵称。');return name}
  function streamChoice(value){card.append(el('label','华文源流'));const select=el('select');for(const s of ['G3','G2','G1']){const opt=el('option',s+' 华文');opt.value=s;select.append(opt)}select.value=value;card.append(select);return select}
  function update(){nameText.textContent=`${profile.name||'访客'} · ${profile.stream}`;
    const s=!profile.code?'none':profile.synced===signature()?'saved':'dirty';
    state.textContent=s==='none'?'尚未备份':s==='saved'?'进度已备份':'有新进度未备份';
    en.textContent=s==='none'?'Not backed up':s==='saved'?'Progress saved':'New progress not saved';
    if($('cwq-save-reminder'))$('cwq-save-reminder').hidden=s==='saved';
  }
  function open(mode){card.replaceChildren();shade.hidden=false;
    if(mode==='first'||mode==='name'){
      title(mode==='first'?'欢迎来到华文消消乐':'编辑昵称');
      const n=field('昵称',profile.name,20),s=mode==='first'?streamChoice(profile.stream):null;
      hint('请使用老师能辨认的名字，不要使用学号。');
      button(mode==='first'?'开始学习':'保存',()=>{try{profile.name=nickname(n.value);if(s)profile.stream=s.value;persist();if(s)switchStream(s.value);update();close();if($('leader-name'))$('leader-name').value=profile.name}catch(e){error(e.message)}});
      if(mode==='first')button('使用恢复码',()=>open('restore'),true);else button('取消',close,true);
      n.focus();
    }else if(mode==='streamConfirm'){
      title('切换华文源流');
      hint('确定要更换华文源流吗？原来的学习记录会保留。');
      button('继续',()=>open('streamChoice'));
      button('取消',close,true);
    }else if(mode==='streamChoice'){
      title('选择华文源流');const s=streamChoice(profile.stream);
      button('下一步',()=>{if(s.value===profile.stream){error('请选择其他源流。');return}openSwitchFinal(s.value)});
      button('取消',close,true);
    }else if(mode==='save'){
      title('备份学习进度');
      if(!BACKUP_URL)error('请先填写 Apps Script /exec 地址。');
      if(profile.code)card.append(el('div',printCode(profile.code),'cwq-code'));
      button(profile.code?'更新备份':'首次备份并生成恢复码',save).disabled=!BACKUP_URL;
      button('取消',close,true);
    }else if(mode==='restore'){
      title('使用恢复码');const input=field('恢复码','',30);
      button('恢复学习记录',()=>restore(input.value)).disabled=!BACKUP_URL;
      button(profile.name?'取消':'返回',()=>profile.name?close():open('first'),true);
    }else if(mode==='saved'){
      title('备份成功');hint('请保存恢复码，以后备份和恢复都使用同一组。');
      card.append(el('div',printCode(profile.code),'cwq-code'));
      button('分享至备忘录',async()=>{const t=`华文消消乐\n昵称：${profile.name}\n恢复码：${printCode(profile.code)}\n网页：${location.origin+location.pathname}`;try{if(navigator.share)await navigator.share({title:'华文消消乐恢复码',text:t});else if(navigator.clipboard){await navigator.clipboard.writeText(t);alert('已复制。')}}catch(e){if(e.name!=='AbortError')error('无法分享，请复制恢复码。')}});
      button('复制恢复码',async()=>{try{await navigator.clipboard.writeText(printCode(profile.code));alert('已复制。')}catch{error('请长按复制恢复码。')}});
      button('完成',close,true);
    }
  }
  function openSwitchFinal(newStream){
    card.replaceChildren();title('确认切换');hint(`确定从 ${profile.stream} 切换到 ${newStream} 吗？`);
    button('确认切换',()=>{profile.stream=newStream;persist();switchStream(newStream);update();close()});
    button('返回',()=>open('streamChoice'),true);
  }
  // Existing working form-post + iframe response mechanism.
  const frame=el('iframe');frame.name='cwq-backup-frame';frame.hidden=true;document.body.append(frame);
  const api=(action,params)=>new Promise((resolve,reject)=>{
    if(!BACKUP_URL)return reject(Error('未设置 Apps Script 地址。'));
    if(pending)return reject(Error('已有备份操作进行中。'));
    const requestId='cwq-'+(++nonce)+'-'+Date.now();
    const timer=setTimeout(()=>{if(pending?.id===requestId){pending=null;reject(Error('Google 没有返回确认，请先检查 Sheet 是否已有记录。'))}},18000);
    pending={id:requestId,done:result=>{clearTimeout(timer);pending=null;resolve(result)},fail:e=>{clearTimeout(timer);pending=null;reject(e)}};
    const form=el('form');form.method='POST';form.target=frame.name;form.action=BACKUP_URL;form.hidden=true;
    for(const [k,v] of Object.entries({action,requestId,...params})){const x=el('input');x.name=k;x.value=String(v??'');form.append(x)}
    try{document.body.append(form);form.submit();form.remove()}catch(e){form.remove();pending?.fail(e)}
  });
  window.addEventListener('message',event=>{
    if(!/^https:\/\/(?:[a-z0-9-]+\.)*(?:googleusercontent\.com|script\.google\.com)$/i.test(event.origin))return;
    const data=event.data;if(data?.app!=='chinese-word-quest-backup'||!pending||data.requestId!==pending.id)return;
    pending.done(data.result);
  });
  async function save(){if(busy)return;busy=true;
    const before=signature();card.querySelectorAll('button').forEach(b=>b.disabled=true);hint('正在备份…');
    try{const r=await api('save',{nickname:profile.name,code:profile.code,revision:profile.revision,stream:profile.stream,progress:JSON.stringify(allProgress())});
      if(!r?.ok)throw Error(r?.error||'备份失败');
      profile.code=r.code;profile.revision=r.revision;profile.synced=before;persist();busy=false;update();open('saved');
    }catch(e){busy=false;card.querySelectorAll('button').forEach(b=>b.disabled=false);error(e.message)}
  }
  async function restore(raw){if(busy)return;const code=normCode(raw);if(code.length!==20)return error('请输入完整的恢复码。');
    busy=true;hint('正在恢复…');
    try{const r=await api('restore',{code});if(!r?.ok)throw Error(r?.error||'恢复失败');
      const hasLocal=['G3','G2','G1'].some(s=>Object.keys(getProgress(s).best||{}).length||getProgress(s).draft);
      if(hasLocal&&!confirm('恢复后会替换本设备三个源流的学习记录。确定继续吗？')){busy=false;return}
      for(const s of ['G3','G2','G1'])localStorage.setItem(storageKey(s),JSON.stringify(r.progress[s]||empty()));
      profile.name=r.nickname;profile.stream=r.stream;profile.code=r.code;profile.revision=r.revision;
      switchStream(profile.stream);progressData=loadData();selectFirst();showSetup('journey');
      profile.synced=signature();persist();busy=false;update();shade.hidden=true;
      if($('leader-name'))$('leader-name').value=profile.name;
      alert('学习记录恢复成功！');
    }catch(e){busy=false;error(e.message)}
  }
  const result=$('result-desc');if(result){const b=el('button','☁ 备份学习进度','cwq-quiet');b.id='cwq-save-reminder';b.onclick=()=>open('save');result.insertAdjacentElement('afterend',b);
    const note=el('div','进度已自动保存在这台设备上 (Auto saved on this device)','cwq-detail');note.style.textAlign='center';b.insertAdjacentElement('afterend',note)}
  window.addEventListener('cwq-progress-changed',update);
  update();if(!profile.name)open('first');
})();
