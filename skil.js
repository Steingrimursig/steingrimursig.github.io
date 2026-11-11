/* =====================================================================
   skil.js – sameiginleg skil fyrir öll verkefni á kennsluhubbnum
   Settu slóð og lykil Supabase-verkefnisins hér (Project Settings → API):
   ===================================================================== */
window.SKIL_CONFIG = window.SKIL_CONFIG || {
  url: "https://hsvxutspkrzxfuxqkgiy.supabase.co",   // Project URL
  key: "sb_publishable_y8JFaUreNjRj36gxM4HD7g_MsFx9WgE", // anon / public key (EKKI service_role)
  hub: "https://steingrimursig.github.io/"
};

(function () {
  const C = window.SKIL_CONFIG;
  const LS_CODE = "skil_kodi", LS_NAME = "skil_nafn";
  const configured = /^https:\/\/.+\.supabase\.co/.test(C.url) && C.key && !/SETTU/.test(C.key);
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function normCode(s) {
    s = String(s || "").toUpperCase().replace(/\s+/g, "");
    const m = s.match(/^([A-Z]+)-?(\d{3})$/);
    return m ? m[1] + "-" + m[2] : s;
  }

  async function rpc(fn, params, keepalive) {
    const r = await fetch(C.url.replace(/\/$/, "") + "/rest/v1/rpc/" + fn, {
      method: "POST",
      // Eldri "anon"-lykill er JWT (eyJ…) og fer líka í Authorization; nýi "publishable"-lykillinn aðeins í apikey
      headers: Object.assign({ apikey: C.key, "Content-Type": "application/json" }, /^eyJ/.test(C.key) ? { Authorization: "Bearer " + C.key } : {}),
      body: JSON.stringify(params),
      keepalive: !!keepalive
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }

  /* ---------- Útlit (stílar sprautaðir inn einu sinni) ---------- */
  function css() {
    if (document.getElementById("skil-css")) return;
    const st = document.createElement("style");
    st.id = "skil-css";
    st.textContent = `
.skil-ov{position:fixed;inset:0;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.skil-box{background:#fff;border-radius:16px;padding:24px;max-width:380px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.3);color:#1f2937}
.skil-box h2{margin:0 0 6px;font-size:1.3rem;color:#14213d}
.skil-box p{margin:0 0 14px;color:#64748b;font-size:.95rem}
.skil-box input{width:100%;font:inherit;font-size:1.3rem;letter-spacing:2px;text-transform:uppercase;text-align:center;padding:10px;border:2px solid #dde3ea;border-radius:10px;box-sizing:border-box}
.skil-box input:focus{outline:none;border-color:#f2762e}
.skil-box button{width:100%;margin-top:12px;font:inherit;font-weight:700;padding:11px;border:0;border-radius:10px;background:#f2762e;color:#fff;cursor:pointer}
.skil-box button:disabled{opacity:.6}
.skil-box .skil-err{color:#c0392b;font-size:.9rem;margin-top:8px;min-height:1.2em}
.skil-box .skil-skip{background:none;color:#64748b;font-weight:500;text-decoration:underline;margin-top:4px}
.skil-pill{position:fixed;right:12px;bottom:12px;z-index:9998;background:#14213d;color:#fff;border-radius:999px;padding:6px 8px 6px 14px;font:13px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;display:flex;gap:10px;align-items:center;box-shadow:0 4px 14px rgba(0,0,0,.2)}
.skil-pill .st{opacity:.8}
.skil-pill button{font:inherit;border:0;border-radius:999px;padding:4px 10px;background:rgba(255,255,255,.15);color:#fff;cursor:pointer}
@media print{.skil-pill,.skil-ov{display:none!important}}
.skil-w{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.skil-w .skil-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}
.skil-w .skil-head b{font-size:1.1rem}
.skil-w .skil-head button{font:inherit;font-size:.85rem;border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:4px 10px;cursor:pointer}
.skil-w .skil-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}
.skil-w .skil-t{display:block;border:1px solid #dde3ea;border-radius:12px;padding:12px 14px;background:#fff;color:inherit;text-decoration:none}
.skil-w .skil-t:hover{border-color:#f2762e}
.skil-w .skil-t .sub{font-size:.8rem;color:#64748b}
.skil-w .skil-t .tt{font-weight:700;margin:2px 0 6px}
.skil-w .lab{display:inline-block;font-size:.78rem;font-weight:700;padding:2px 9px;border-radius:999px;background:#eef2f6;color:#475569}
.skil-w .lab.i_vinnslu{background:#fff3cd;color:#8a6100}.skil-w .lab.lokid{background:#ffe8d6;color:#a4480f}.skil-w .lab.metid{background:#dcf3ee;color:#1d7c70}
.skil-w .fbk{margin-top:8px;font-size:.88rem;background:#f6f8fa;border-left:3px solid #2a9d8f;padding:6px 9px;border-radius:0 8px 8px 0;white-space:pre-wrap}
.skil-w .skil-login{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.skil-w .skil-login input{font:inherit;padding:8px 12px;border:1.5px solid #dde3ea;border-radius:10px;text-transform:uppercase;letter-spacing:1px}
.skil-w .skil-login button{font:inherit;font-weight:700;padding:8px 16px;border:0;border-radius:10px;background:#f2762e;color:#fff;cursor:pointer}
.skil-w .skil-e{color:#c0392b;font-size:.9rem}`;
    document.head.appendChild(st);
  }

  /* ---------- Innskráningargluggi ---------- */
  function askCode(required) {
    css();
    return new Promise(resolve => {
      const ov = document.createElement("div");
      ov.className = "skil-ov";
      ov.innerHTML = `<form class="skil-box" autocomplete="off">
        <h2>Hæ! 👋</h2>
        <p>Sláðu inn kóðann þinn svo kennarinn sjái hvernig þér gengur.</p>
        <input name="k" placeholder="LUNDI-472" autocapitalize="characters" spellcheck="false" autocorrect="off">
        <div class="skil-err"></div>
        <button type="submit">Áfram</button>
        ${required ? "" : '<button type="button" class="skil-skip">Halda áfram án kóða</button>'}
      </form>`;
      document.body.appendChild(ov);
      const f = ov.querySelector("form"), inp = f.k, err = ov.querySelector(".skil-err"), btn = f.querySelector('button[type="submit"]');
      setTimeout(() => inp.focus(), 50);
      const skip = ov.querySelector(".skil-skip");
      if (skip) skip.onclick = () => { ov.remove(); resolve(null); };
      f.onsubmit = async e => {
        e.preventDefault();
        const code = normCode(inp.value);
        if (!code) return;
        btn.disabled = true; err.textContent = "";
        try {
          const r = await rpc("skil_login", { p_code: code });
          if (r.error) { err.textContent = "Kóðinn fannst ekki. Athugaðu stafina og reyndu aftur."; btn.disabled = false; return; }
          ls.set(LS_CODE, r.code); ls.set(LS_NAME, r.name);
          ov.remove(); resolve(r);
        } catch (x) {
          err.textContent = "Engin tenging. Athugaðu netið og reyndu aftur."; btn.disabled = false;
        }
      };
    });
  }

  /* ---------- Merki neðst í horni ---------- */
  let pill = null, statusText = "";
  function showPill() {
    css();
    if (!pill) { pill = document.createElement("div"); pill.className = "skil-pill"; document.body.appendChild(pill); }
    pill.innerHTML = `<span>👤 ${esc(Skil.name)}</span><span class="st">${statusText}</span><button type="button">Skipta um nemanda</button>`;
    pill.querySelector("button").onclick = () => Skil.logout();
  }
  function setStatus(s) {
    statusText = { saving: "Vistar …", saved: "Vistað ✓", offline: "Ekki tengt – vistast í tækinu", "": "" }[s] ?? s;
    if (pill) pill.querySelector(".st").textContent = statusText;
    Skil._listeners.forEach(fn => { try { fn(s); } catch (e) {} });
  }

  /* ---------- Biðröð vistunar ---------- */
  let slug = null, pending = null, timer = null, busy = false;
  function queue(job) {
    if (!configured || !slug || !Skil.code()) return;
    // "complete" er aldrei yfirskrifað af venjulegri vistun
    if (pending && pending.kind === "complete" && job.kind === "save") {
      pending = Object.assign({}, pending, { data: job.data, summary: job.summary });
    } else pending = job;
    clearTimeout(timer);
    timer = setTimeout(flush, 1500);
  }
  async function flush(keepalive) {
    clearTimeout(timer);
    if (!pending || busy) return;
    const job = pending; pending = null; busy = true;
    setStatus("saving");
    try {
      const base = { p_code: Skil.code(), p_slug: slug, p_data: job.data ?? null, p_summary: job.summary ?? null };
      const r = job.kind === "complete"
        ? await rpc("skil_complete", Object.assign(base, { p_score: job.score ?? null, p_max: job.max ?? null, p_needs_review: !!job.needsReview }), keepalive)
        : await rpc("skil_save", Object.assign(base, { p_progress: job.progress ?? null }), keepalive);
      if (r && r.error === "kodi") { setStatus("Kóði ógildur"); }
      else setStatus("saved");
      busy = false;
      if (pending) { clearTimeout(timer); timer = setTimeout(flush, 1500); }
    } catch (e) {
      busy = false;
      // reyna aftur seinna – en týna aldrei "lokið"
      if (!pending) pending = job;
      else if (job.kind === "complete" && pending.kind === "save") pending = Object.assign({}, job, { data: pending.data, summary: pending.summary });
      setStatus("offline");
      clearTimeout(timer); timer = setTimeout(flush, 15000);
    }
  }
  addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(true); });
  addEventListener("pagehide", () => flush(true));

  /* ---------- Opið viðmót ---------- */
  const Skil = window.Skil = {
    configured,
    _listeners: [],
    get name() { return ls.get(LS_NAME) || ""; },
    code() { return ls.get(LS_CODE) || ""; },
    onStatus(fn) { this._listeners.push(fn); },

    /** Kallað þegar verkefnasíða opnast. Skilar vistuðu ástandi af þjóni (eða null). */
    async init({ slug: s, title, subject, required = true } = {}) {
      slug = s;
      if (!configured) return null;
      if (!this.code()) { const r = await askCode(required); if (!r) return null; }
      try {
        const rec = await rpc("skil_open", { p_code: this.code(), p_slug: slug, p_title: title || document.title, p_subject: subject || null, p_url: location.href.split("?")[0].split("#")[0] });
        if (rec.error === "kodi") { ls.del(LS_CODE); ls.del(LS_NAME); return this.init({ slug, title, subject, required }); }
        if (rec.name) ls.set(LS_NAME, rec.name);
        showPill(); setStatus("");
        return rec;
      } catch (e) { showPill(); setStatus("offline"); return null; }
    },
    /** Vistar framvindu (0–100) og gögn. Má kalla oft – sent í hópum. */
    save(progress, data, summary) { queue({ kind: "save", progress, data, summary }); },
    /** Merkir verkefnið lokið. Má kalla aftur ef svör breytast. */
    complete({ score, max, needsReview, data, summary } = {}) { queue({ kind: "complete", score, max, needsReview, data, summary }); },
    flush() { return flush(); },
    logout() {
      flush(true);
      ls.del(LS_CODE); ls.del(LS_NAME);
      location.reload();
    },

    /** "Mín verkefni" – græja fyrir forsíðu kennsluhubbsins */
    async widget(target) {
      css();
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;
      el.classList.add("skil-w");
      if (!configured) { el.innerHTML = ""; return; }
      if (!this.code()) {
        el.innerHTML = `<form class="skil-login"><b>Mín verkefni:</b><input name="k" placeholder="Kóðinn þinn" autocapitalize="characters" spellcheck="false"><button>Skrá inn</button><span class="skil-e"></span></form>`;
        const f = el.querySelector("form");
        f.onsubmit = async e => {
          e.preventDefault();
          try {
            const r = await rpc("skil_login", { p_code: normCode(f.k.value) });
            if (r.error) { f.querySelector(".skil-e").textContent = "Kóðinn fannst ekki."; return; }
            ls.set(LS_CODE, r.code); ls.set(LS_NAME, r.name); this.widget(el);
          } catch (x) { f.querySelector(".skil-e").textContent = "Engin tenging."; }
        };
        return;
      }
      el.innerHTML = `<div class="skil-head"><b>Hæ, ${esc(this.name)}!</b><button type="button">Skipta um nemanda</button></div><div class="skil-list">Sæki verkefni …</div>`;
      el.querySelector(".skil-head button").onclick = () => { ls.del(LS_CODE); ls.del(LS_NAME); this.widget(el); };
      try {
        const r = await rpc("skil_my_tasks", { p_code: this.code() });
        if (r.error) { ls.del(LS_CODE); ls.del(LS_NAME); return this.widget(el); }
        const list = el.querySelector(".skil-list");
        if (!r.tasks.length) { list.textContent = "Engin verkefni enn."; return; }
        list.innerHTML = r.tasks.map(t => {
          const st = t.reviewed_at && t.status === "lokid" ? ["metid", "Metið"] : t.status === "lokid" ? ["lokid", "Lokið"] : t.status === "i_vinnslu" ? ["i_vinnslu", "Í vinnslu " + (t.progress || 0) + "%"] : t.status === "opnad" ? ["", "Opnað"] : ["", "Ekki byrjað"];
          const due = t.due ? ` · skil ${new Date(t.due).toLocaleDateString("is-IS")}` : "";
          return `<a class="skil-t" href="${esc(t.url || "#")}"><div class="sub">${esc(t.subject || "")}${due}</div><div class="tt">${esc(t.title || t.slug)}</div><span class="lab ${st[0]}">${st[1]}</span>${t.feedback ? `<div class="fbk"><b>Umsögn:</b> ${esc(t.feedback)}${t.teacher_score ? `<br><b>Mat:</b> ${esc(t.teacher_score)}` : ""}</div>` : ""}</a>`;
        }).join("");
      } catch (e) { el.querySelector(".skil-list").textContent = "Engin tenging – reyndu aftur síðar."; }
    }
  };
})();
