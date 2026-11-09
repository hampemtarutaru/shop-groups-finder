// K-089 browser smoke checks for the formal-service draft.
// Run against a LOCAL server. No external services, Cloudflare keys, or user data.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base='http://127.0.0.1:8765';
const errors=[];
const browser=await chromium.launch({headless:true});
const run=async()=>{
  mkdirSync('qa-results',{recursive:true});
  const ctx=await browser.newContext({viewport:{width:1280,height:900}});
  await ctx.addInitScript(()=>{
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__k089Copied=text;}}});
  });
  const page=await ctx.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  const rsp=await page.goto(base+'/',{waitUntil:'networkidle'});
  assert.equal(rsp?.status(),200);
  assert.match(await page.title(),/この店、どこの系列？/);
  assert.doesNotMatch(await page.title(),/試作/);
  assert.equal(await page.locator('.prototype').textContent(),'非公式サイト');
  assert.ok((await page.locator('#count').textContent()).includes('グループ'));
  assert.ok((await page.locator('#count').textContent()).includes('ブランド'));
  assert.ok(await page.locator('.group-card').count() >= 3);
  assert.equal(await page.locator('.result-card').count(),0);
  await page.screenshot({path:'qa-results/home-desktop.png',fullPage:false});

  await page.locator('#search').fill('なか卯');
  await page.waitForFunction(()=>new URL(location.href).searchParams.get('q')==='なか卯');
  assert.ok(await page.locator('.result-card').count()>0);
  assert.match(await page.locator('.result-card').first().innerText(),/ゼンショー/);
  assert.match(await page.locator('.result-card').first().innerText(),/なか卯/);
  await page.locator('.result-card .share').first().click();
  await page.waitForFunction(()=>Boolean(window.__k089Copied));
  assert.equal(new URL(await page.evaluate(()=>window.__k089Copied)).searchParams.get('q'),'なか卯');
  await page.screenshot({path:'qa-results/search-desktop.png',fullPage:false});

  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('#search').inputValue(),'なか卯');
  assert.ok(await page.locator('.result-card').count()>0,'shared query is not restored');
  await page.locator('#clear').click();
  assert.equal(await page.locator('#search').inputValue(),'');
  assert.equal(new URL(page.url()).searchParams.has('q'),false);
  await page.locator('[data-filter="スーパー"]').click();
  assert.equal(await page.locator('[data-filter="スーパー"]').getAttribute('aria-pressed'),'true');
  assert.ok(await page.locator('.group-card').count()>0,'supermarket category rendered no groups');
  await page.locator('[data-filter="すべて"]').click();

  await page.locator('.footer-links a[href="./about.html"]').click();
  assert.match(await page.title(),/このサイトについて/);
  assert.equal((await page.locator('h1').count()),1);
  assert.match(await page.locator('main').innerText(),/運営|出典/);
  assert.equal((await page.locator('a[href="./"]').count())>0,true);
  await page.locator('a[href="./privacy.html"]').first().click();
  assert.match(await page.title(),/プライバシー/);
  assert.match(await page.locator('main').innerText(),/Web Analyticsを使用しています/);
  assert.match(await page.locator('main').innerText(),/\?q=/);

  const mobCtx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const mob=await mobCtx.newPage();
  mob.on('pageerror',e=>errors.push(e.message));
  await mob.goto(base+'/',{waitUntil:'networkidle'});
  assert.ok(await mob.locator('.group-card').count()>0);
  const dims=await mob.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(dims.scroll<=dims.client+1,'Mobile page overflows viewport: '+JSON.stringify(dims));
  await mob.screenshot({path:'qa-results/home-mobile.png',fullPage:false});
  await mob.locator('#search').fill('ガスト');
  assert.ok(await mob.locator('.result-card').count()>0);
  assert.match(await mob.locator('.result-card').first().innerText(),/ガスト/);
  await mob.screenshot({path:'qa-results/search-mobile.png',fullPage:false});
  await mob.goto(base+'/about.html',{waitUntil:'networkidle'});
  const aboutDim=await mob.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(aboutDim.scroll<=aboutDim.client+1,'Mobile About page overflows viewport');
  await mob.goto(base+'/privacy.html',{waitUntil:'networkidle'});
  const privacyDim=await mob.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(privacyDim.scroll<=privacyDim.client+1,'Mobile Privacy page overflows viewport');
  assert.deepEqual(errors,[],'Uncaught client-side errors found');
  await mobCtx.close();
  await ctx.close();
  console.log('K-089 Chromium smoke: home, search, share URL, filters, info pages, mobile, no uncaught errors: PASS');
};
try{await run();}finally{await browser.close();}
