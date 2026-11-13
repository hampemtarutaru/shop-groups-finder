// K-089 offline Chromium layout/accessibility smoke for isolated hierarchy pages.
import assert from "node:assert/strict";
import {mkdirSync} from "node:fs";
import {dirname,join,resolve} from "node:path";
import {fileURLToPath,pathToFileURL} from "node:url";
import {chromium} from "playwright";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"../..");
const out=join(root,"qa-results");
mkdirSync(out,{recursive:true});
const groups=[["zensho",18,14],["skylark",29,6],["usmh",13,4]];
const widths=[320,375,768,1280];

const browser=await chromium.launch({headless:true});
try {
  for (const [id,brandCount,operatorCount] of groups) {
    for (const width of widths) {
      const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
      try {
        await page.goto(pathToFileURL(join(root,"qa","hierarchy-poc",id+".html")).href,{waitUntil:"load"});
        assert.equal(await page.locator("html").getAttribute("lang"),"ja");
        assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"),"noindex,nofollow");
        assert.equal(await page.locator(".brand-list li").count(),brandCount,id+" brand count");
        assert.equal(await page.locator("nav a").count(),operatorCount,id+" operator links");
        assert.equal(await page.locator(".ref").count(),brandCount,id+" source count");
        assert.equal(await page.locator("h1").count(),1);
        const discoveryCount=id==="zensho"?0:3;
        assert.equal(await page.locator(".discovery-card").count(),discoveryCount,id+" expected discovery cards");
        if(discoveryCount){
          const discoveryLinks=await page.locator(".discovery-card a").evaluateAll(links=>
            links.map(a=>({
              validAnchor:!!document.querySelector(a.getAttribute("href")),
              height:Math.round(a.getBoundingClientRect().height)
            }))
          );
          assert.ok(discoveryLinks.every(x=>x.validAnchor&&x.height>=44),id+" discovery links");
          const discoveryColumns=await page.locator(".discovery-grid").evaluate(el=>
            getComputedStyle(el).gridTemplateColumns.split(" ").length
          );
          assert.equal(discoveryColumns,width<=680?1:3,id+" discovery columns");
        }
        const checks=await page.evaluate(()=>{
          const cols=getComputedStyle(document.querySelector(".grid")).gridTemplateColumns.split(" ").length;
          const navTargets=[...document.querySelectorAll("nav a")].map(x=>Math.round(x.getBoundingClientRect().height));
          const brandTargets=[...document.querySelectorAll(".brand-list li a")].map(x=>Math.round(x.getBoundingClientRect().height));
          const refTargets=[...document.querySelectorAll("a.ref")].map(x=>({
            rel:x.getAttribute("rel"),target:x.getAttribute("target"),
            accessible:x.getAttribute("aria-label"),text:x.textContent.trim()
          }));
          return {
            viewport:window.innerWidth,
            scrollWidth:document.documentElement.scrollWidth,
            cols,navTargets,brandTargets,refTargets,
            skipHref:document.querySelector(".skip")?.getAttribute("href"),
            mainId:document.querySelector("main")?.id
          };
        });
        assert.ok(checks.scrollWidth<=width+1,id+" @"+width+" horizontal overflow: "+JSON.stringify(checks));
        assert.equal(checks.cols,width<=680?1:2,id+" @"+width+" responsive grid");
        assert.ok(checks.navTargets.every(h=>h>=44),id+" @"+width+" undersized operator navigation "+JSON.stringify(checks.navTargets));
        assert.ok(checks.brandTargets.every(h=>h>=44),id+" @"+width+" undersized brand/source links");
        assert.ok(checks.refTargets.every(x=>x.target==="_blank"&&x.rel.includes("noopener")&&x.rel.includes("noreferrer")&&x.accessible?.includes("登録出典")&&x.text.includes("登録出典")),id+" source-link accessibility");
        assert.equal(checks.skipHref,"#main");
        assert.equal(checks.mainId,"main");
        if (width===375||width===1280)
          await page.screenshot({path:join(out,id+"-"+width+".png"),fullPage:true});
        await page.keyboard.press("Tab");
        assert.equal(await page.locator(".skip").evaluate(e=>document.activeElement===e),true,id+" skip link keyboard focus");
        console.log("PASS",id,"viewport",width,"brands",brandCount,"operators",operatorCount,"no horizontal overflow");
      } finally {await page.close();}
    }
  }
} finally {await browser.close();}
