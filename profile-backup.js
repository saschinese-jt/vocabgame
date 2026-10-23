/* 华文消消乐：学生档案及备份。独立模块，不修改原游戏逻辑。 */
(() => {
  'use strict';

  // Paste the /exec deployment URL of YOUR bound Google Apps Script here.
  const BACKUP_URL = 'https://script.google.com/macros/s/AKfycbwiVzsmhUIXhp4vVmIBQ0kJ7dVJgPXgMupaIjgNa0Ou1ws8_R4-gMB5tvs7C2BhMclN/exec';
  const SETTINGS_KEY = 'cwqBackupProfile_v1';
  const $ = id => document.getElementById(id);
  const read = () => { try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'); } catch { return {}; } };
  const profile = Object.assign({name:'', code:'', revision:0, synced:'', syncedAt:''}, read());
  const text = (tag, value, className) => {const n=document.createElement(tag);n.textContent=value;if(className)n.className=className;return n;};
  const progress = () => ({best: {...progressData.best}, draft: progressData.draft ? JSON.parse(JSON.stringify(progressData.draft)) : null, submittedBest:null});
  const signature = () => JSON.stringify({name:profile.name, progress:progress()});
  const persist = () => localStorage.setItem(SETTINGS_KEY, JSON.stringify(profile));
  const snapshotSignature = () => signature();
  const codeFormat = code => (code||'').toUpperCase().replace(/[^A-Z0-9]/g,'').replace(/.{1,4}/g,'$&-').replace(/-$/,'');
  const normaliseCode = code => (code||'').toUpperCase().replace(/[^A-Z0-9]/g,'');

  const css=document.createElement('style');
  css.textContent=`
  .cwq-profile{position:fixed;z-index:70;right:12px;top:10px;font:inherit}
  .cwq-profile-toggle{background:#fffdf8;border:3px solid #54483f;border-radius:15px;padding:7px 10px;box-shadow:3px 4px 0 #54483f;display:flex;align-items:center;gap:7px;max-width:170px;font-weight:800;color:#54483f}
  .cwq-name{max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cwq-menu{position:absolute;top:100%;right:0;width:min(290px,calc(100vw - 24px));margin-top:12px;padding:14px;background:#fffdf8;border:3px solid #54483f;border-radius:18px;box-shadow:6px 7px 0 #54483f}
  .cwq-menu[hidden],.cwq-panel[hidden],.cwq-inline[hidden]{display:none!important}
  .cwq-status-cn{font-size:14px;font-weight:850;color:#54483f}
  .cwq-status-en{font-size:10px;color:#766b62;white-space:nowrap}
  .cwq-menu-button{display:block;width:100%;background:#f6f0e7;border:2px solid #54483f;border-radius:10px;color:#54483f;text-align:left;padding:9px 10px;margin-top:8px;font-weight:700}
  .cwq-panel{position:fixed;z-index:220;inset:0;background:#332a23aa;display:flex;align-items:center;justify-content:center;padding:17px}
  .cwq-card{width:min(440px,100%);max-height:90dvh;overflow:auto;background:#fffdf8;border:4px solid #54483f;border-radius:22px;box-shadow:7px 8px 0 #54483f;padding:20px;color:#54483f}
  .cwq-card h2{color:#14294d;font-size:22px;margin-bottom:9px}
  .cwq-card label{display:block;font-weight:bold;margin:12px 0 4px}
  .cwq-card input{display:block;width:100%;font-size:17px;border:2px solid #54483f;border-radius:10px;padding:12px;color:#54483f;background:white}
  .cwq-card button{border:2px solid #54483f;background:#ffd447;color:#54483f;border-radius:10px;padding:11px 12px;font-weight:800;margin:10px 6px 0 0}
  .cwq-card button.secondary{background:#e8e8e1}
  .cwq-card button:disabled{opacity:.5}
  .cwq-hint{font-size:12px;line-height:1.5;color:#766b62}
  .cwq-error{color:#a13f31;font-size:12px;margin-top:8px}
  .cwq-code{font:800 21px ui-monospace,monospace;letter-spacing:1px;overflow-wrap:anywhere;padding:9px;background:#eaf1f6;border-radius:8px}
  .cwq-inline{margin:14px auto 0;color:#83766b;background:transparent;border:0;text-decoration:underline;font-size:12px;padding:5px 8px}
  @media(max-width:740px){.cwq-profile{right:7px;top:6px}.cwq-profile-toggle{padding:5px 6px;font-size:12px;max-width:112px}.cwq-name{max-width:66px}.cwq-status-en{font-size:10px}}
  `;
  document.head.appendChild(css);

  const wrap=text('div','');wrap.className='cwq-profile';
  const toggle=text('button','👤 '+(profile.name||'访客')+' ▾','cwq-profile-toggle');toggle.type='button';
  const menu=text('div','');menu.className='cwq-menu';menu.hidden=true;
  const statusCn=text('div','');statusCn.className='cwq-status-cn';
  const statusEn=text('div','');statusEn.className='cwq-status-en';
  menu.append(statusCn,statusEn);
  const menuAction=(title, fn)=>{const b=text('button',title,'cwq-menu-button');b.type='button';b.onclick=()=>{menu.hidden=true;fn()};menu.append(b)};
  menuAction('✏️ 编辑昵称',()=>openPanel('name'));
  menuAction('☁️ 备份学习进度',()=>openPanel('save'));
  menuAction('🔑 使用恢复码',()=>openPanel('restore'));
  menuAction('📖 学习历程',()=>{showSetup('journey')});
  menuAction('📄 导出词语笔记 PDF',()=>{const b=document.getElementById('export-vocab-pdf');if(b)b.click();else{showSetup('journey');alert('请在学习历程页面使用导出 PDF 按钮。')}});
  wrap.append(toggle,menu);document.body.append(wrap);
  toggle.onclick=()=>{menu.hidden=!menu.hidden;updateStatus()};
  document.addEventListener('click',e=>{if(!wrap.contains(e.target))menu.hidden=true});

  const panel=text('div','');panel.className='cwq-panel';panel.hidden=true;
  const card=text('section','');card.className='cwq-card';panel.append(card);document.body.append(panel);
  let mode='name',working=false,pending=null;
  function addButton(label,fn,secondary=false){const b=text('button',label);if(secondary)b.className='secondary';b.type='button';b.onclick=fn;card.append(b);return b}
  function field(title,value='',max=40){card.append(text('label',title));const input=document.createElement('input');input.value=value;input.maxLength=max;input.autocomplete='off';card.append(input);return input}
  function closePanel(){if(!working)panel.hidden=true}
  function error(msg){let el=card.querySelector('.cwq-error');if(!el){el=text('div','','cwq-error');card.append(el)}el.textContent=msg}
  function validateName(name){const v=name.trim().replace(/\s+/g,' ');if(!v||Array.from(v).length>20)throw Error('昵称须为1至20个字符。');if(!/[\p{L}\p{N}]/u.test(v))throw Error('昵称不能只有符号。');return v}
  function openPanel(next,first=false){mode=next;card.replaceChildren();panel.hidden=false;
    if(next==='name'){
      card.append(text('h2',first?'欢迎来到华文消消乐':'编辑昵称'));
      const inp=field('学生昵称',profile.name,20);
      card.append(text('p','请使用老师能辨认的名字，不要使用学号。','cwq-hint'));
      card.append(text('p','Use a recognisable and appropriate name. No student ID.','cwq-hint'));
      addButton('保存昵称',()=>{try{profile.name=validateName(inp.value);persist();panel.hidden=true;updateStatus();if($('leader-name'))$('leader-name').value=profile.name}catch(e){error(e.message)}});
      if(first){addButton('已有恢复码？恢复学习记录',()=>openPanel('restore',true),true)}else addButton('取消',closePanel,true);
      inp.focus();
    }else if(next==='save'){
      card.append(text('h2','备份学习进度'));
      card.append(text('p','进度已自动保存在这台设备上 (Auto saved on this device)。这里可以另外保存一份，以免清除浏览器后丢失。','cwq-hint'));
      if(!BACKUP_URL){error('教师尚未设置 Google Apps Script 地址。');addButton('关闭',closePanel,true);return}
      if(!profile.name){openPanel('name',true);return}
      if(profile.code)card.append(text('p','你的恢复码：'+codeFormat(profile.code),'cwq-hint'));
      addButton(profile.code?'更新备份':'首次备份并生成恢复码',()=>save());
      addButton('取消',closePanel,true);
    }else if(next==='restore'){
      card.append(text('h2','使用恢复码'));
      card.append(text('p','输入曾经备份时获得的恢复码，取回昵称和学习记录。','cwq-hint'));
      const inp=field('恢复码','',30);
      if(!BACKUP_URL)error('教师尚未设置 Google Apps Script 地址。');
      addButton('查询进度',()=>restore(inp.value));
      if(profile.name)addButton('取消',closePanel,true);else addButton('输入新昵称',()=>openPanel('name',true),true);
    }else if(next==='saved'){
      card.append(text('h2','学习进度备份成功'));
      card.append(text('p','请保存这组恢复码，以后再次备份或恢复都使用同一组。','cwq-hint'));
      card.append(text('div',codeFormat(profile.code),'cwq-code'));
      addButton('分享至备忘录',async()=>{
        const content=`华文消消乐\\n昵称：${profile.name}\\n恢复码：${codeFormat(profile.code)}\\n网页：${location.href}`.replace(/\\n/g,'\n');
        try{if(navigator.share){await navigator.share({text:content,title:'华文消消乐恢复码'})}else if(navigator.clipboard){await navigator.clipboard.writeText(content);alert('已复制，请打开备忘录粘贴。')}else alert(content)}catch(e){if(e.name!=='AbortError')error('分享失败，可使用复制恢复码。')}
      });
      addButton('复制恢复码',async()=>{try{await navigator.clipboard.writeText(codeFormat(profile.code));alert('恢复码已复制。')}catch{error('请长按恢复码复制。')}});
      addButton('完成',closePanel,true);
    }
  }

  function currentState(){return !profile.code?'none':(profile.synced===signature()?'saved':'dirty')}
  function updateStatus(){toggle.textContent='👤 '+(profile.name||'访客')+' ▾';const s=currentState();
    statusCn.textContent=s==='none'?'尚未备份':s==='saved'?'进度已备份':'有新进度未备份';
    statusEn.textContent=s==='none'?'Not backed up':s==='saved'?'Progress saved':'New progress not saved';
    toggle.title=statusCn.textContent+' / '+statusEn.textContent;
    if($('cwq-save-reminder'))$('cwq-save-reminder').hidden=s==='saved';
  }

  const frame=document.createElement('iframe');frame.name='cwq-backup-frame';frame.hidden=true;frame.setAttribute('title','学习进度备份请求');document.body.append(frame);
  let requestCounter=0;
  function api(action,params){return new Promise((resolve,reject)=>{
    if(!BACKUP_URL){reject(Error('请先在 profile-backup.js 填写 Google Apps Script /exec 地址。'));return}
    if(pending){reject(Error('另一项备份操作仍在进行中。'));return}
    const requestId='cwq-'+(++requestCounter)+'-'+Date.now();
    const timeout=setTimeout(()=>{if(pending?.id===requestId){pending=null;reject(Error('服务器未回应。请检查网络，再使用恢复码确认是否已保存。'))}},25000);
    pending={id:requestId,resolve:v=>{clearTimeout(timeout);pending=null;resolve(v)},reject:e=>{clearTimeout(timeout);pending=null;reject(e)}};
    const form=document.createElement('form');form.method='POST';form.action=BACKUP_URL;form.target=frame.name;form.hidden=true;
    for(const [k,v] of Object.entries({action,requestId,...params})){const inp=document.createElement('input');inp.name=k;inp.value=String(v??'');form.append(inp)}
    document.body.append(form);form.submit();form.remove();
  })}
  window.addEventListener('message',event=>{
    if(!/^https:\/\/([a-z0-9-]+\.)?(script\.google\.com|googleusercontent\.com)$/i.test(event.origin))return;
    const data=event.data;
    if(data?.app!=='chinese-word-quest-backup'||!pending||data.requestId!==pending.id)return;
    pending.resolve(data.result);
  });
  async function save(){if(working)return;working=true;const before=snapshotSignature();
    try{const result=await api('save',{nickname:profile.name,code:profile.code,revision:profile.revision||0,progress:JSON.stringify(progress())});
      if(!result.ok)throw Error(result.error||'备份失败。');
      profile.code=result.code;profile.revision=result.revision;profile.synced=before;profile.syncedAt=new Date().toISOString();persist();updateStatus();working=false;openPanel('saved');
    }catch(e){working=false;error(e.message);updateStatus()}}
  async function restore(code){if(working)return;code=normaliseCode(code);if(code.length!==20){error('请输入完整的恢复码。');return}working=true;
    try{const result=await api('restore',{code});if(!result.ok)throw Error(result.error||'恢复失败');
      const hasLocal=!!Object.keys(progressData.best||{}).length||!!progressData.draft;
      if(hasLocal&&!confirm('恢复云端记录会替换这台设备目前的学习进度。确定继续吗？')){working=false;return}
      progressData={best:result.progress.best||{},draft:result.progress.draft||null,submittedBest:progressData.submittedBest??null};
      saveData();profile.name=result.nickname;profile.code=result.code;profile.revision=result.revision;profile.synced=signature();persist();
      working=false;panel.hidden=true;refreshJourney();selectFirst();showSetup('journey');updateStatus();if($('leader-name'))$('leader-name').value=profile.name;
      alert('恢复成功！你的学习历程已经更新。');
    }catch(e){working=false;error(e.message)}}

  // A quiet reminder on the existing completion screen; never autosends requests.
  const resultDesc=$('result-desc');
  if(resultDesc){const reminder=text('button','☁️ 备份学习进度','cwq-inline');reminder.id='cwq-save-reminder';reminder.onclick=()=>openPanel('save');resultDesc.insertAdjacentElement('afterend',reminder)}
  if($('leader-name')&&profile.name)$('leader-name').value=profile.name;
  updateStatus();
  setInterval(updateStatus,1300);
  if(!profile.name)openPanel('name',true);
})();
