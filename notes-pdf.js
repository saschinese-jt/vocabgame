/* 华文消消乐：已完成课文 PDF 笔记。仅在导出时下载 PDF 库及字体。 */
(() => {
  'use strict';

  const STORAGE_KEY = 'chineseWordQuest2026_v1';
  const FONT_REGULAR = './fonts/Chinese-Regular.ttf';
  const FONT_BOLD = './fonts/Chinese-Bold.ttf';
  const PDF_LIB_URL = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
  const FONTKIT_URL = 'https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js';
  const FILE_NAME = '华文消消乐_已完成课文词语笔记.pdf';
  let resourcesPromise;

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error('无法加载 PDF 工具，请检查网络连接。'));
      document.head.appendChild(script);
    });
  }

  async function loadResources() {
    if (!resourcesPromise) {
      resourcesPromise = (async () => {
        if (!window.PDFLib) await loadScript(PDF_LIB_URL);
        if (!window.fontkit) await loadScript(FONTKIT_URL);
        const readFont = async url => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`字体加载失败：${url}（${response.status}）`);
          return new Uint8Array(await response.arrayBuffer());
        };
        const [regular, bold] = await Promise.all([
          readFont(FONT_REGULAR), readFont(FONT_BOLD)
        ]);
        return { regular, bold };
      })().catch(error => {
        resourcesPromise = null;
        throw error;
      });
    }
    return resourcesPromise;
  }

  function eligibleLessons() {
    const catalog = typeof VOCAB_LESSONS !== 'undefined' ? VOCAB_LESSONS : [];
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; }
    catch { saved = {}; }
    const best = saved.best && typeof saved.best === 'object' ? saved.best : {};
    return catalog.filter(lesson => lesson.challenges.every((_, index) =>
      Number.isFinite(best[`${lesson.unit}-${lesson.lesson}-${index}`])
    ));
  }

  function linesFor(text, font, size, maxWidth) {
    const output = [];
    for (const paragraph of String(text ?? '').split(/\r?\n/)) {
      if (paragraph === '') { output.push(''); continue; }
      let line = '';
      for (const character of paragraph) {
        if (line && font.widthOfTextAtSize(line + character, size) > maxWidth) {
          output.push(line);
          line = character;
        } else {
          line += character;
        }
      }
      if (line) output.push(line);
    }
    return output;
  }

  async function createPdf(lessons) {
    const { regular, bold } = await loadResources();
    const { PDFDocument, rgb } = window.PDFLib;
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(window.fontkit);

    // 完整嵌入字体，避免 CJK 字形子集在部分阅读器中出现乱字、错位。
    // 字体仍只会在学生实际点击导出时下载。
    const normalFont = await pdf.embedFont(regular, { subset: false });
    const boldFont = await pdf.embedFont(bold, { subset: false });

    const pageW = 595.28, pageH = 841.89;
    const left = 54, right = 54, top = 55, bottom = 55;
    const contentW = pageW - left - right;
    const ink = rgb(0.19, 0.22, 0.24);
    const gray = rgb(0.37, 0.40, 0.43);
    const blue = rgb(0.13, 0.41, 0.60);
    let page, y;

    function newPage() {
      page = pdf.addPage([pageW, pageH]);
      y = pageH - top;
      page.drawText('华文消消乐 · 我的词语笔记', {
        x: left, y, size: 15, font: boldFont, color: blue
      });
      y -= 20;
      page.drawLine({
        start: { x: left, y }, end: { x: pageW - right, y },
        thickness: 0.7, color: rgb(0.82, 0.85, 0.87)
      });
      y -= 24;
    }

    function drawLines(lines, font, size, leading, color) {
      for (const text of lines) {
        if (y - leading < bottom) newPage();
        if (text) page.drawText(text, { x: left, y, size, font, color });
        y -= leading;
      }
    }

    newPage();
    for (const lesson of lessons) {
      if (y < bottom + 90) newPage();
      const unit = ['一', '二', '三', '四', '五', '六'][lesson.unit - 1];
      drawLines(linesFor(`单元${unit} · ${lesson.title}`, boldFont, 13, contentW),
        boldFont, 13, 21, blue);
      y -= 8;

      // 词语数据、拼音与释义均直接来自 vocab.js，不维护第二份词库。
      for (const word of lesson.challenges.flat()) {
        const fields = [
          [word.word, boldFont, 16, 23, ink],
          [word.pinyin, normalFont, 11.5, 19, gray],
          [word.cn, normalFont, 12, 19, ink],
          [word.en, normalFont, 11.5, 19, gray]
        ];
        const prepared = fields.map(([value, font, size, leading, color]) => ({
          lines: linesFor(value, font, size, contentW), font, size, leading, color
        }));
        const height = prepared.reduce((sum, part) => sum + part.lines.length * part.leading, 0);
        if (y - height < bottom) newPage();
        for (const part of prepared) {
          drawLines(part.lines, part.font, part.size, part.leading, part.color);
        }
        y -= 14;
      }
      y -= 12;
    }

    const bytes = await pdf.save();
    return new File([bytes], FILE_NAME, { type: 'application/pdf' });
  }

  async function exportPdf() {
    const button = document.getElementById('export-vocab-pdf');
    const message = document.getElementById('export-pdf-status');
    const lessons = eligibleLessons();
    if (!lessons.length) {
      message.textContent = '目前还没有整课通关的词语可以导出。';
      return;
    }
    button.disabled = true;
    button.textContent = '正在生成 PDF…';
    message.textContent = `正在整理 ${lessons.length} 课的笔记。`;
    try {
      const file = await createPdf(lessons);
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
          message.textContent = '请选择备忘录或其他应用保存 PDF。';
          return;
        } catch (error) {
          if (error.name === 'AbortError') {
            message.textContent = '已取消分享。';
            return;
          }
        }
      }
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = FILE_NAME;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      message.textContent = 'PDF 已生成，可从「文件」App 分享到备忘录。';
    } catch (error) {
      console.error('PDF export failed:', error);
      message.textContent = '导出失败：' + (error.message || String(error));
    } finally {
      button.disabled = false;
      button.textContent = '📄 导出已完成课文 PDF';
    }
  }

  function init() {
    const container = document.getElementById('journey-view');
    if (!container || document.getElementById('export-vocab-pdf')) return;
    const panel = document.createElement('div');
    panel.className = 'checkpoint';
    const heading = document.createElement('h3');
    heading.textContent = '📒 我的词语笔记';
    const hint = document.createElement('p');
    hint.className = 'small';
    hint.textContent = '导出已经全部通关的课文，词语加粗，依次显示拼音、中文释义、英文解释。';
    const button = document.createElement('button');
    button.id = 'export-vocab-pdf';
    button.className = 'action secondary';
    button.textContent = '📄 导出已完成课文 PDF';
    button.addEventListener('click', exportPdf);
    const status = document.createElement('p');
    status.id = 'export-pdf-status';
    status.className = 'small caption';
    status.setAttribute('role', 'status');
    panel.append(heading, hint, button, status);
    container.appendChild(panel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
