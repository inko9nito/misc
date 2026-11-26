/* The Drivers Edge · site behaviour.
 * Renders the parts that depend on today's date (event states, countdowns, early-bird)
 * and the booking card. Content lives in data.js.
 *
 * Preview helpers (prototype only):
 *   ?today=2026-11-26        pretend it's that day
 *   ?state=open|ebx|soon|sold show an event page in that state
 *   ?clean                    hide the prototype bar
 */
(() => {
  const D = window.TDE_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DAY = 864e5;
  const params = new URLSearchParams(location.search);
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
  const ms = iso => new Date(iso).getTime();

  const today = () => {
    const t = params.get("today");
    if (!t) return new Date();
    const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(t) ? `${t}T09:00:00-06:00` : t);
    return isNaN(d) ? new Date() : d;
  };
  const daysUntil = (iso, now) => Math.ceil((ms(iso) - now.getTime()) / DAY);

  /* ---------- Icons ---------- */
  const svg = (p, s = 16, w = 2.2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    clock: svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>'),
    cal: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', 14, 2.4),
    ban: svg('<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>', 14, 2.4),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>', 17, 2),
    full: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    exit: svg('<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>')
  };
  const swatch = k => `<i class="gsw" style="--c:${D.groups[k].color}"></i>`;

  /* ---------- Event state ----------
   * open: registration open, early-bird running
   * ebx:  registration open, early-bird over (regular prices)
   * soon: registration not open yet
   * sold: sold out (a flag from TDE's booking system)
   */
  const stateAt = (ev, now) =>
    ev.soldOut ? "sold" :
    now < new Date(ev.regOpens) ? "soon" :
    now <= new Date(ev.earlyBirdEnds) ? "open" : "ebx";

  // Show an event in a given state by moving the clock, so every date on the page agrees.
  const preview = (ev, state, base = today()) => {
    const live = stateAt({ ...ev, soldOut: false }, base);
    let now = base, e = ev;
    if (state === "soon") now = new Date(ms(ev.regOpens) - 3 * DAY);
    if (state === "open" && live !== "open") now = new Date(ms(ev.earlyBirdEnds) - 6 * DAY + 3600e3);
    if (state === "ebx" && live !== "ebx") now = new Date(ms(ev.earlyBirdEnds) + 2 * DAY);
    if (state === "sold") e = { ...ev, soldOut: true };
    if (state && state !== "sold") e = { ...ev, soldOut: false };
    return { ev: e, now, state: stateAt(e, now) };
  };

  /* ---------- Prices ---------- */
  const fmtOf = ev => D.formats[ev.format];
  const priceOf = (ev, g, st, solo) => {
    const p = (solo && ev.soloPrices && ev.soloPrices[g]) || ev.prices[g];
    return st === "ebx" ? p + D.earlyBirdSaving : p;
  };
  const fromPrice = (ev, st) => Math.min(...fmtOf(ev).groups.map(g => priceOf(ev, g, st, true)));

  /* ---------- Components ---------- */
  const countdown = (ev, now) => {
    const n = daysUntil(ev.start, now);
    return n > 1 ? `in ${n} days` : n === 1 ? "Tomorrow" : "Today";
  };

  // Thumbnail. The event card and the event-page banner use the same one.
  const thumb = (ev, now, st, banner) => {
    const pill = st === "sold" ? "Sold out" : countdown(ev, now);
    const a11y = banner
      ? `role="img" aria-label="${esc(`${ev.title}, ${ev.dateShort}, ${ev.track}${st === "sold" ? ", sold out" : ""}`)}"`
      : 'aria-hidden="true"';
    return `<div class="thumb${banner ? " banner" : ""}${st === "sold" ? " is-sold" : ""}" style="background-image:url(${ev.photo});--pos:${ev.photoPos}" ${a11y}>` +
      `<img class="thumb-track" src="${ev.outline}" alt="">` +
      `<span class="thumb-pill">${pill}</span>` +
      `<span class="thumb-stamp"><small>${ev.stamp[0]}</small>${ev.stamp[1]}</span></div>`;
  };

  const ebBox = (ev, now, short) => {
    const n = Math.max(daysUntil(ev.earlyBirdEnds, now), 1);
    return `<div class="eb">${I.clock}<span><b>Early-bird: save $${D.earlyBirdSaving}</b> until ${short ? ev.earlyBirdShort : ev.earlyBirdLabel}</span><i>${plural(n, "day")} left</i></div>`;
  };

  const soonBadge = (ev, now) =>
    `<span class="badge badge-soon">${I.cal}Registration opens ${ev.regOpensLabel} · in ${plural(Math.max(daysUntil(ev.regOpens, now), 1), "day")}</span>`;

  const card = (ev, now = today(), st = stateAt(ev, now)) => {
    const from = fromPrice(ev, st);
    let mid = "", act = "";
    if (st === "open" || st === "ebx") {
      if (st === "open") mid = ebBox(ev, now, true);
      act = `<a class="btn btn-red btn-sm" href="${ev.page}">View &amp; book</a><span class="event-price">from $${from}</span>`;
    } else if (st === "soon") {
      mid = soonBadge(ev, now);
      act = `<a class="btn btn-quiet btn-sm" href="${ev.page}">View details</a><span class="event-price">from $${from}</span>`;
    } else {
      mid = `<span class="badge badge-sold">${I.ban}Sold out</span>`;
      act = `<a class="btn btn-quiet btn-sm" href="${ev.page}#book">Join waitlist</a><span class="event-price is-struck">from $${from}</span>`;
    }
    return `<article class="event-card${st === "sold" ? " is-sold" : ""}">` +
      `<a href="${ev.page}" tabindex="-1" aria-hidden="true">${thumb(ev, now, st)}</a>` +
      `<div class="body"><span class="event-when">${ev.dateShort} · ${ev.formatLabel}</span>` +
      `<h3 class="event-name"><a href="${ev.page}">${ev.title}</a></h3>` +
      `<span class="event-meta">${ev.track} · ${ev.city}</span>${mid}` +
      `<div class="event-actions">${act}</div></div></article>`;
  };

  // Step graphic: rises from lowest to highest; the group color is the cap.
  const steps = (keys, v = D.stepStyle) => {
    const n = keys.length, H = i => Math.round((i * 84) / (n - 1));
    const col = (k, i) => {
      const c = `--c:${D.groups[k].color}`;
      if (v === "d") return `<div class="step" style="${c}">${Array.from({ length: i + 1 }, (_, j) => `<span class="brick${j === i ? " top" : ""}"></span>`).reverse().join("")}</div>`;
      if (v === "e") return `<div class="step" style="${c}"><span class="pod" style="--h:${16 + H(i)}px"><i></i></span></div>`;
      const block = i || v !== "a" ? `<span class="step-block" style="--h:${(v === "a" ? 0 : 12) + H(i)}px"></span>` : "";
      return `<div class="step" style="${c}"><span class="step-cap"></span>${block}</div>`;
    };
    return `<div class="steps steps-${v}" style="--n:${n}" aria-hidden="true">${keys.map(col).join("")}</div>`;
  };

  const levelCard = (fk, v) => {
    const f = D.formats[fk];
    return `<div class="level-card"><h3 class="h3d">${f.label}</h3><p class="count">${f.groups.length} groups</p>${steps(f.groups, v)}` +
      `<ul class="level-list">${f.groups.map(k => `<li><i style="--c:${D.groups[k].color}"></i><div><b>${D.groups[k].name}</b><span>${D.groups[k].desc}</span></div></li>`).join("")}</ul></div>`;
  };

  /* ---------- Booking card ---------- */
  const mountBooking = (form, ev, now = today(), st = stateAt(ev, now)) => {
    const f = fmtOf(ev), uid = form.id || ev.id;
    const names = keys => keys.map(k => `<b>${swatch(k)}${D.groups[k].name}</b>`).join(" or ");
    const NEW = [
      { id: "first", n: "First time on a track", d: "Coach in your car every session.", g: f.groups[0] },
      { id: "exp", n: "I’ve done track days elsewhere", d: `Tell us where. TDE places you in ${f.newStart.map(k => D.groups[k].name).join(" or ")}.`, g: f.groups[0], ask: true }
    ];
    const RET = f.groups.map((g, i) => ({ id: g, n: D.groups[g].name, d: D.groups[g].short, g, solo: (ev.solo || {})[g], equiv: f.equiv[g], below: f.groups[i - 1] }));
    const S = { mode: "new", sel: "first", open: {} };
    const sold = st === "sold", soon = st === "soon";

    let top = "";
    if (st === "open") top = ebBox(ev, now, true);
    if (soon) top = `<div class="book-state">${soonBadge(ev, now)}</div>`;
    if (sold) top = `<div class="book-state"><span class="badge badge-sold">${I.ban}Sold out</span><p>Join the waitlist and TDE will email you if a spot opens.</p></div>`;

    form.innerHTML = `${top}
<h3>Run group</h3>
<div class="book-tabs" role="group" aria-label="Have you driven with TDE before?"><button type="button" data-m="new">New to TDE</button><button type="button" data-m="ret">Returning driver</button></div>
<div class="book-list" role="radiogroup" aria-label="Run group"></div>
<label class="book-field book-exp" hidden><span>Where have you driven, and about how many days?</span><input type="text" autocomplete="off" placeholder="e.g. NASA HPDE2, about 8 days"></label>
<label class="book-opt solo-row" hidden><input type="checkbox" class="solo"><span class="t"><b>I’m solo-approved for this track</b><small class="solo-help"></small></span></label>
<p class="book-note" aria-live="polite"></p>
<h3>Your car</h3>
<div class="book-field"><span id="${uid}-num">Car number painted on your car</span><div class="book-row"><input type="text" class="num" inputmode="numeric" placeholder="e.g. 47" aria-labelledby="${uid}-num"><button type="button" class="btn btn-quiet chk">Check</button></div></div>
<p class="book-msg chkm" aria-live="polite">No number yet? Leave it blank and we’ll assign one.</p>
<label class="book-opt check-row" style="margin-top:8px"><input type="checkbox" class="share"><span class="t"><b>Sharing this car</b><small>Another driver uses it in a different group</small></span></label>
<label class="book-field shf" hidden><span>Other driver’s name</span><input type="text" autocomplete="off"></label>
<div class="book-adds"${sold ? " hidden" : ""}><h3>Add-ons</h3>${D.addOns.map(a => `<label class="book-opt"><input type="checkbox" name="add-${uid}" value="${a.id}"><span class="t"><b>${a.name}</b><small>${a.desc}</small></span><span class="pr">+$${a.price}</span></label>`).join("")}</div>
<div class="book-total"${sold ? " hidden" : ""}><span>Total</span><b class="tot">$0</b></div>
${sold ? `<button class="btn btn-quiet book-go" type="submit">Join waitlist</button>`
  : soon ? `<button class="btn book-go" type="submit" aria-disabled="true">Registration opens ${ev.regOpensShort}, 10 am</button>`
  : `<button class="btn btn-red book-go" type="submit">Reserve my spot</button>`}
<p class="book-msg done" aria-live="polite">${sold ? "Or call" : "Questions? Call"} <a href="tel:${D.tel}">${D.phone}</a>${sold ? " to ask about cancellations." : ""}</p>`;

    const q = s => form.querySelector(s);
    const list = () => (S.mode === "new" ? NEW : RET);
    const cur = () => list().find(x => x.id === S.sel) || list()[0];
    const soloOn = () => !q(".solo-row").hidden && q(".solo").checked;

    const draw = () => {
      $$("[data-m]", form).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.m === S.mode)));
      q(".book-list").innerHTML = list().map(o => {
        const price = priceOf(ev, o.g, st, o.solo === "required");
        const info = o.equiv ? `<button type="button" class="book-i" data-i="${o.id}" aria-expanded="${!!S.open[o.id]}" aria-label="${o.n}: ${f.equivLabel.toLowerCase()}">${I.info}</button>` : "";
        const tip = o.equiv && S.open[o.id] ? `<span class="tip">${f.equivLabel}: ${o.equiv.map(([k, t]) => `<span style="white-space:nowrap">${swatch(k)}${t}</span>`).join(", ")}</span>` : "";
        return `<label class="book-opt"><input type="radio" name="g-${uid}" value="${o.id}"${o.id === S.sel ? " checked" : ""}><span class="t"><b>${o.equiv ? swatch(o.g) : ""}${o.n}${info}</b><small>${o.d}</small>${tip}</span><span class="pr" data-p="${o.id}">$${price}</span></label>`;
      }).join("");
      calc();
    };

    const calc = () => {
      const o = cur(), g = D.groups[o.g];
      q(".book-exp").hidden = !o.ask;
      const showSolo = S.mode === "ret" && !!o.solo;
      q(".solo-row").hidden = !showSolo;
      if (showSolo) {
        const where = ev.soloTrack || ev.track;
        q(".solo-help").textContent = o.solo === "required"
          ? `Signed off by TDE at ${where} in the last 12 months. Not sure? Choose ${D.groups[o.below].name}. TDE will move you and refund the difference.`
          : `Signed off by TDE at ${where} in the last 12 months. Solo-approved ${g.name} drivers pay $${priceOf(ev, o.g, st, true)}.`;
      }
      const solo = o.solo === "required" || (o.solo === "optional" && soloOn());
      let total = priceOf(ev, o.g, st, solo);
      if (o.solo === "optional") {
        const base = priceOf(ev, o.g, st, false);
        q(`[data-p="${o.id}"]`).innerHTML = soloOn() ? `<s>$${base}</s>$${total}` : `$${base}`;
      }
      q(".book-note").innerHTML = o.ask
        ? `You’ll start in ${names(f.newStart)}. TDE reviews your experience and confirms by email.`
        : `On ${ev.dayName} you’ll run in ${names([o.g])}${solo ? " solo" : ""}. TDE confirms by email before the event.`;
      $$(`input[name="add-${uid}"]:checked`, form).forEach(c => { total += D.addOns.find(a => a.id === c.value).price; });
      q(".tot").textContent = `$${total}`;
    };

    form.addEventListener("click", e => {
      const m = e.target.closest("[data-m]");
      if (m) { S.mode = m.dataset.m; S.sel = list()[0].id; draw(); return; }
      const i = e.target.closest(".book-i");
      if (i) {
        e.preventDefault();
        S.open[i.dataset.i] = !S.open[i.dataset.i];
        draw();
        const again = form.querySelector(`[data-i="${i.dataset.i}"]`);
        if (again) again.focus();
        return;
      }
      if (e.target.closest(".chk")) {
        const v = q(".num").value.replace(/[^0-9]/g, "");
        q(".chkm").textContent = v ? `#${v} is available for this event (demo).` : "Enter a number first.";
      }
    });
    form.addEventListener("change", e => {
      if (e.target.name === `g-${uid}`) S.sel = e.target.value;
      if (e.target.classList.contains("share")) q(".shf").hidden = !e.target.checked;
      calc();
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const o = cur(), done = q(".done");
      if (soon) { done.textContent = `Registration opens ${ev.regOpensLabel}.`; return; }
      if (S.mode === "ret" && o.solo === "required" && !q(".solo").checked) {
        done.textContent = `Confirm you’re solo-approved for this track, or choose ${D.groups[o.below].name}.`;
        q(".solo").focus();
        return;
      }
      done.textContent = sold
        ? "Prototype only: TDE would confirm your waitlist spot by email."
        : "Prototype only: the next screen would be the waiver and payment.";
    });
    draw();
  };

  /* ---------- Add to calendar (.ics) ---------- */
  const icsHref = ev => {
    const z = d => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Drivers Edge//Events//EN", "BEGIN:VEVENT",
      `UID:${ev.id}@thedriversedge.net`, `DTSTAMP:${z(Date.now())}`, `DTSTART:${z(ev.start)}`, `DTEND:${z(ev.end)}`,
      `SUMMARY:TDE ${ev.fullTitle}`, `LOCATION:${ev.address.replace(/,/g, "\\,")}`, "END:VEVENT", "END:VCALENDAR"];
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
  };

  /* ---------- Pages ---------- */
  const initHome = () => {
    const list = $("#event-list");
    if (list) list.innerHTML = D.events.filter(ev => new Date(ev.end) > today()).map(ev => card(ev)).join("") || `<p class="section-sub" style="margin:0">New dates are coming soon. Call ${D.phone} to ask.</p>`;
    const lv = $("#levels");
    if (lv) lv.innerHTML = ["one", "two"].map(k => levelCard(k)).join("");
  };

  const initEvent = id => {
    const base = D.events.find(e => e.id === id);
    if (!base) return;
    const forced = params.get("state");
    const { ev, now, state: st } = forced ? preview(base, forced) : { ev: base, now: today(), state: stateAt(base, today()) };
    const from = fromPrice(ev, st);
    const slot = n => $(`[data-slot="${n}"]`);

    slot("banner").outerHTML = thumb(ev, now, st, true);
    slot("when").textContent = `${ev.hours} · ${countdown(ev, now).toLowerCase()}`;
    const cal = slot("calendar");
    cal.href = icsHref(ev);
    cal.download = `tde-${ev.id}.ics`;
    slot("reg").innerHTML = {
      open: `<b>Registration open</b><span>Opened ${ev.regOpensShort} · from $${from}</span>`,
      ebx: `<b>Registration open</b><span>Opened ${ev.regOpensShort} · from $${from}</span>`,
      soon: `<b>Registration opens ${ev.regOpensLabel}</b><span>in ${plural(Math.max(daysUntil(ev.regOpens, now), 1), "day")} · from $${from}</span>`,
      sold: `<b>Sold out</b><span>Join the waitlist, or call <a href="tel:${D.tel}" style="margin:0;font-size:inherit">${D.phone}</a> about cancellations</span>`
    }[st];
    slot("eb").outerHTML = st === "open" ? ebBox(ev, now) : "";
    mountBooking($("#book"), ev, now, st);

    const bar = $(".mbar");
    if (bar) {
      const t = {
        open: [`From $${from}`, `Early-bird ends ${ev.earlyBirdShort}`, "Book"],
        ebx: [`From $${from}`, `${ev.dateShort} · ${ev.city}`, "Book"],
        soon: [`Opens ${ev.regOpensShort}, 10 am`, `From $${from}`, "Details"],
        sold: ["Sold out", "Waitlist open", "Join waitlist"]
      }[st];
      bar.innerHTML = `<div><b>${t[0]}</b><small>${t[1]}</small></div><a class="btn ${st === "open" || st === "ebx" ? "btn-red" : "btn-quiet"}" href="#book">${t[2]}</a>`;
      document.body.classList.add("has-mbar");
    }
  };

  /* ---------- Chrome ---------- */
  const initChrome = () => {
    $$(".nav-menu").forEach(m => m.addEventListener("click", () => {
      const open = m.closest(".nav").classList.toggle("open");
      m.setAttribute("aria-expanded", String(open));
    }));

    if (params.has("clean")) return;
    const here = location.pathname.split("/").pop() || "index.html";
    const pages = [["index.html", "Home"], ...D.events.map(e => [e.page, `${e.formatLabel} event`]), ["design-system.html", "Design system"]];
    const keep = params.get("today") ? `?today=${encodeURIComponent(params.get("today"))}` : "";
    const states = document.body.dataset.event
      ? `<b style="margin-left:12px">State</b>${[["", "Live"], ["soon", "Not open"], ["ebx", "Early-bird over"], ["sold", "Sold out"]].map(([s, l]) => {
          const on = (params.get("state") || "") === s;
          return `<a href="?${s ? `state=${s}` : ""}${keep ? `&${keep.slice(1)}` : ""}"${on ? ' aria-current="page"' : ""}>${l}</a>`;
        }).join("")}`
      : "";
    const bar = document.createElement("nav");
    bar.className = "proto-bar";
    bar.setAttribute("aria-label", "Prototype pages");
    bar.innerHTML = `<div class="in"><b>TDE v1</b>${pages.map(([p, l]) => `<a href="${p}${keep}"${p === here ? ' aria-current="page"' : ""}>${l}</a>`).join("")}${states}<button type="button" class="proto-fs">${I.full}Full screen</button></div>`;
    document.body.prepend(bar);
    const exit = document.createElement("button");
    exit.type = "button";
    exit.className = "proto-exit";
    exit.innerHTML = `${I.exit}Exit`;
    exit.setAttribute("aria-label", "Exit full screen");
    document.body.append(exit);
    const fs = on => {
      document.body.classList.toggle("fs", on);
      try {
        if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
        if (!on && document.fullscreenElement) document.exitFullscreen();
      } catch (e) { /* not available in some frames */ }
    };
    $(".proto-fs", bar).addEventListener("click", () => fs(true));
    exit.addEventListener("click", () => fs(false));
    document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) document.body.classList.remove("fs"); });
  };

  window.TDE = { stateAt, preview, card, thumb, ebBox, steps, levelCard, mountBooking, today };

  initChrome();
  if (document.body.dataset.event) initEvent(document.body.dataset.event);
  else initHome();
})();
