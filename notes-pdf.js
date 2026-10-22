/* 华文消消乐：仅在点击时加载 PDF 工具及字体；不改变游戏逻辑。
 * 上传到 GitHub 时将本文件命名为 notes-pdf.js
 * 字体路径：fonts/Chinese-Regular.ttf 和 fonts/Chinese-Bold.ttf
 * 请使用合法取得、允许再分发及嵌入的 TrueType 字体并保留授权文件。
 */
(() => {
  'use strict';
  const FONT_REGULAR = './fonts/Chinese-Regular.ttf';
  const FONT_BOLD = './fonts/Chinese-Bold.ttf';
  const PDF_LIB_URL = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
  const FONTKIT_URL = 'https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js';
  let loading = null;
  // 按原始六单元词语表排列，而非棋盘分组的排列顺序。
  const ORIGINAL_WORD_ORDER = {"1-1":["淘气","惹","两肋插刀","赵","科技","来者不拒","口头禅","小事一桩","人缘","性格","直率","得罪","别扭","争辩","即使","冤枉","推荐"],"1-2":["捣乱","瞬间","兴致勃勃","粘","蛋液","狼狈","讥讽","赌气","嚷","小心翼翼","荧光笔","抵挡","拉扯","手足无措"],"1-3":["审案","律师","振振有词","心虚","哑口无言","判决","泄"],"2-1":["葡萄","象征","风俗","辞旧迎新","燃放","瓶瓶罐罐","厄运","前夕","碗碟","预示","兆头","忙碌","遥远","恭敬","万事大吉","元旦"],"2-2":["贼","鱼尾纹","装饰","圣诞","格格不入","结婚","嫁","视讯","沉默寡言","副","酷","承诺","歉意","围炉","蒸腾","叽叽喳喳","缺席","悦耳"],"2-3":["红枣","儿媳妇","莫名其妙","疑惑"],"3-1":["魅力","博物馆","悠久","遗产","巴刹","同胞","融合","皇宫","城堡","时尚","彩绘","流连忘返","娱乐","探索","娘惹","拍摄","平均","繁忙","闪耀"],"3-2":["横梁","覆盖","玻璃","瀑布","循环","谷","株","设施","蹦跳","甚至"],"3-3":["投降","自治","栏","棕色","氧化","陌生","宁静","属于"],"4-1":["坚持不懈","开卷有益","以礼待人","新颖","戏剧","工作坊","尴尬","维护","友谊","一帆风顺","有效","策略","嘉宾","辅导员"],"4-2":["赖床","滋味","催促","哀求","硬着头皮","藤鞭","抡","挨打","女佣","雨篷","泪痕","早晨","猛","嗓子眼","允许"],"4-3":["相貌","讲究","何必","记账","亏","撇","慢条斯理","起航","焦急"],"5-1":["剩","牙膏","橡皮擦","薯条","番茄酱","偶尔","评委","晋级","奖励","获得","企业"],"5-2":["牧场","潜水","艘","屁股","翘","潜水艇","仿佛","确切","浑身","基因","一哄而散","手势","颁布","泛","泡沫"],"5-3":["伤脑筋","拜访","中央","漫步","绞尽脑汁","华侨","银行","由衷","摩天大楼","薄薄的","抨击","挫折"],"6-1":["油漆","栏杆","宿舍","凭","欣慰","订购","塔台","范围","特殊","警惕","失误","不堪设想","脂肪"],"6-2":["截至","行驶","延误","稳定","幕后","贡献","明知山有虎，偏向虎山行","漏夜","轨道","凌晨","就绪","隧道","扫描","裂痕","顺畅","全力以赴","职业","故障","岗位"],"6-3":["新谣","芝麻","朗朗上口","奉献","繁荣","平凡","光芒"]};

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('无法载入 PDF 工具：' + src));
      document.head.appendChild(s);
    });
  }

  async function prepare() {
    if (!loading) {
      loading = (async () => {
        if (!window.PDFLib) await loadScript(PDF_LIB_URL);
        if (!window.fontkit) await loadScript(FONTKIT_URL);
        const fetchFont = async path => {
          const r = await fetch(path);
          if (!r.ok) throw new Error(`找不到字体：${path}（HTTP ${r.status}）`);
          return new Uint8Array(await r.arrayBuffer());
        };
        const [regular, bold] = await Promise.all([
          fetchFont(FONT_REGULAR), fetchFont(FONT_BOLD)
        ]);
        return { regular, bold };
      })().catch(err => { loading = null; throw err; });
    }
    return loading;
  }

  // 直接读取游戏的已保存成绩与题库；所有挑战完成才导出该课。
  // 通过 script 顶层的词库常量不能作为 window 属性读取，所以直接使用
  // 与主程序相同的全局词库名称 VOCAB_LESSONS 和 localStorage 键值。
  function completedLessons() {
    const records = JSON.parse(localStorage.getItem('chineseWordQuest2026_v1') || '{}');
    const best = records.best && typeof records.best === 'object' ? records.best : {};
    const catalog = typeof VOCAB_LESSONS !== 'undefined' ? VOCAB_LESSONS : [];
    return catalog.filter(l => l.challenges.every((_, i) =>
      Number.isFinite(best[`${l.unit}-${l.lesson}-${i}`])
    ));
  }

  function splitByWidth(text, font, size, maxWidth) {
    const result = [];
    for (const para of String(text || '').split(/\r?\n/)) {
      if (!para) { result.push(''); continue; }
      let current = '';
      // 逐字换行，避免中文没有空格时超出页面边界。
      for (const ch of para) {
        const attempt = current + ch;
        if (current && font.widthOfTextAtSize(attempt, size) > maxWidth) {
          result.push(current); current = ch;
        } else current = attempt;
      }
      if (current) result.push(current);
    }
    return result;
  }

  async function buildPdf(items) {
    const { regular: regBytes, bold: boldBytes } = await prepare();
    const { PDFDocument, rgb } = window.PDFLib;
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(window.fontkit);
    // 真正按 PDF 用到的字形子集化，而不是嵌入完整中文字库。
    const normal = await pdf.embedFont(regBytes, { subset: true });
    const heavy = await pdf.embedFont(boldBytes, { subset: true });
    const pageWidth = 595.28, pageHeight = 841.89; // A4，单位 pt
    const left = 56, right = 56, top = 52, bottom = 52;
    const maxWidth = pageWidth - left - right;
    const dark = rgb(0.22, 0.20, 0.19);
    const muted = rgb(0.40, 0.43, 0.46);
    const accent = rgb(0.15, 0.42, 0.62);
    let page, y, pageNo = 0;

    function newPage() {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - top;
      pageNo++;
      page.drawText('华文消消乐 · 我的词语笔记', {
        x: left, y, size: 15, font: heavy, color: accent
      });
      y -= 20;
      page.drawLine({start: {x:left,y}, end:{x:pageWidth-right,y}, thickness:0.7, color:rgb(0.78,0.82,0.83)});
      y -= 22;
    }
    function writeLines(text, font, size, leading, color) {
      const lines = splitByWidth(text, font, size, maxWidth);
      for (const s of lines) {
        if (y - leading < bottom) newPage();
        if (s) page.drawText(s, {x:left, y, size, font, color});
        y -= leading;
      }
    }

    newPage();
    for (const lesson of items) {
      const unitName = ['一','二','三','四','五','六'][lesson.unit - 1];
      const heading = `单元${unitName} · ${lesson.title}`;
      const rawWords = lesson.challenges.flat();
      const order = ORIGINAL_WORD_ORDER[`${lesson.unit}-${lesson.lesson}`] || [];
      const rank = new Map(order.map((word, i) => [word, i]));
      const allWords = rawWords.map((entry, i) => ({ entry, i }))
        .sort((a, b) => (rank.get(a.entry.word) ?? 9999) - (rank.get(b.entry.word) ?? 9999) || a.i - b.i)
        .map(x => x.entry);
      // 依照已经通过的课文分组，维持词库排列，不加入未通关课文。
      if (y < bottom + 80) newPage();
      writeLines(heading, heavy, 13, 20, accent);
      y -= 7;
      for (const entry of allWords) {
        // 词条最少留四行；不在页面底部开始一条新词语。
        if (y < bottom + 100) newPage();
        writeLines(entry.word, heavy, 15.5, 22, dark);
        writeLines(entry.pinyin || '', normal, 11.5, 18, muted);
        writeLines(entry.cn || '', normal, 12, 19, dark);
        writeLines(entry.en || '', normal, 11.5, 18, muted);
        y -= 15; // 空行
      }
      y -= 10;
    }
    // 不把任何学生姓名、恢复码或完成时间写进词语笔记。
    return new File([await pdf.save()], '华文消消乐_已完成课文词语笔记.pdf', {type: 'application/pdf'});
  }

  async function exportNotes() {
    const button = document.getElementById('export-vocab-pdf');
    const status = document.getElementById('export-pdf-status');
    const lessons = completedLessons();
    if (!lessons.length) {
      status.textContent = '目前尚无整课通关的词语可以导出。';
      return;
    }
    button.disabled = true;
    button.textContent = '正在生成 PDF…';
    status.textContent = `正在整理 ${lessons.length} 课的词语，请勿重复点击。`;
    try {
      const file = await buildPdf(lessons);
      // iPad Safari 支持分享文件时打开原生菜单，可选择「备忘录」。
      // 如果不支持，则下载 PDF，之后从「文件」App 分享到备忘录。
      if (navigator.canShare?.({ files:[file] }) && navigator.share) {
        try {
          await navigator.share({files:[file]});
          status.textContent = '已打开系统分享功能，可选择备忘录。';
          return;
        } catch (e) {
          if (e.name === 'AbortError') {status.textContent='已取消分享。'; return;}
        }
      }
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url; a.download = file.name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      status.textContent = 'PDF 已生成；可从下载项目或「文件」App 分享至备忘录。';
    } catch (err) {
      console.error(err);
      status.textContent = '导出失败：' + (err.message || String(err)) + '。请检查字体文件及网络连接。';
    } finally {
      button.disabled = false;
      button.textContent = '📄 导出已完成课文 PDF';
    }
  }

  function addButton() {
    const section = document.getElementById('journey-view');
    if (!section || document.getElementById('export-vocab-pdf')) return;
    const block = document.createElement('div');
    block.className = 'checkpoint';
    const heading = document.createElement('h3');
    heading.textContent = '📒 我的词语笔记';
    const description = document.createElement('p');
    description.className = 'small';
    description.textContent = '仅导出已全部通关的课文；每个词语依次显示词语、拼音、中文释义、英文解释。';
    const button = document.createElement('button');
    button.id = 'export-vocab-pdf';
    button.className = 'action secondary';
    button.textContent = '📄 导出已完成课文 PDF';
    button.addEventListener('click', exportNotes);
    const status = document.createElement('p');
    status.id = 'export-pdf-status';
    status.className = 'small caption';
    status.setAttribute('role', 'status');
    block.append(heading, description, button, status);
    section.appendChild(block);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButton);
  else addButton();
})();
