/* TDE content that changes per season: events, run groups, prices.
 * Facts are from thedriversedge.net (Nov 2026). Values marked PLACEHOLDER need TDE to confirm.
 */
window.TDE_DATA = {
  phone: "903.303.3000",
  tel: "+19033033000",

  // Step style for the run-group graphic. "a" is Vera's sketch and is live.
  // Options b–e are on design-system.html until she picks one.
  stepStyle: "a",

  // Saving during early-bird. PLACEHOLDER: inferred from Green pricing ($395 → $365).
  earlyBirdSaving: 30,

  groups: {
    purple: { name: "Purple", color: "var(--group-purple)", desc: "New drivers, and drivers new to TDE. A certified coach rides with you every session.", short: "Newer drivers. Coach in the car every session." },
    orange: { name: "Orange", color: "var(--group-orange)", desc: "Proven, credible track experience. A coach rides with you for part of the day.", short: "Proven experience. Coach rides part-time." },
    pink:   { name: "Pink",   color: "var(--group-pink)",   desc: "Advanced and solo-approved to TDE standards. You drive on your own.", short: "Advanced. Full-time solo to TDE standards." },
    green:  { name: "Green",  color: "var(--group-green)",  desc: "New to track driving. A certified coach rides with you every session.", short: "New to track driving. Coach in the car every session." },
    blue:   { name: "Blue",   color: "var(--group-blue)",   desc: "Building consistency with a coach. Some drivers earn part-time solo.", short: "Building consistency. Some drivers earn part-time solo." },
    yellow: { name: "Yellow", color: "var(--group-yellow)", desc: "Experienced. Part-time coaching, or solo once TDE signs you off.", short: "Experienced. Part-time coach, or solo once TDE signs you off." },
    red:    { name: "Red",    color: "var(--group-red)",    desc: "Most advanced. Solo-approved by TDE.", short: "Most advanced. Solo-approved by TDE." }
  },

  // The two formats. Never show both color sets on the same event.
  formats: {
    one: {
      label: "1-day events",
      groups: ["purple", "orange", "pink"],
      newStart: ["purple", "orange"],
      // Equivalents at the other format, shown behind the info icon.
      equiv: {
        purple: [["green", "Green"], ["blue", "early Blue"]],
        orange: [["blue", "Blue, part-time"], ["yellow", "Yellow, non-solo"]],
        pink:   [["yellow", "Yellow solo"], ["red", "Red solo"]]
      },
      equivLabel: "At 2-day schools"
    },
    two: {
      label: "2-day events",
      groups: ["green", "blue", "yellow", "red"],
      newStart: ["green", "blue"],
      equiv: {
        green:  [["purple", "Purple"]],
        blue:   [["purple", "Purple if new to Blue"], ["orange", "Orange if part-time"]],
        yellow: [["orange", "Orange"], ["pink", "Pink if solo-approved"]],
        red:    [["pink", "Pink"]]
      },
      equivLabel: "At 1-day events"
    }
  },

  addOns: [
    { id: "helmet", name: "Helmet rental", desc: "Fitted at the track", price: 25 },
    { id: "cap", name: "TDE ball cap", desc: "One size", price: 20 }
  ],

  events: [
    {
      id: "2026-12-12",
      page: "event-dec-12.html",
      format: "one",
      formatLabel: "1-day",
      formatName: "1-day Saturday Track",
      title: "Saturday Track",
      fullTitle: "Saturday Track at Motorsport Ranch 1.7",
      track: "Motorsport Ranch 1.7",
      trackLong: "Motorsport Ranch 1.7 · clockwise",
      soloTrack: "Motorsport Ranch 1.7, clockwise,",
      city: "Cresson, TX",
      address: "9012 Performance Ct, Cresson, TX 76035",
      maps: "https://maps.google.com/?q=9012+Performance+Ct+Cresson+TX+76035",
      start: "2026-12-12T06:30:00-06:00",
      end: "2026-12-12T17:00:00-06:00",
      hours: "6:30 am – 5:00 pm CT",
      dateLong: "Sat, Dec 12, 2026",
      dateShort: "Sat, Dec 12",
      dayName: "Dec 12",
      stamp: ["1-day · Sat", "Dec 12"],
      regOpens: "2026-11-03T10:00:00-06:00",
      regOpensLabel: "Tue, Nov 3, 10 am",
      regOpensShort: "Nov 3",
      earlyBirdEnds: "2026-12-02T23:59:00-06:00",
      earlyBirdLabel: "Wed, Dec 2",
      earlyBirdShort: "Dec 2",
      soldOut: false, // needs a flag from TDE's booking system
      photo: "assets/img/car-red-gtr.jpg",
      photoPos: "8% 60%",
      outline: "assets/img/track-outline-msr-cresson.png",
      // Early-bird prices. PLACEHOLDER: TDE's page only shows "$275–$365".
      prices: { purple: 365, orange: 325, pink: 275 },
      solo: { pink: "required" }
    },
    {
      id: "2027-02-06",
      page: "event-feb-6-7.html",
      format: "two",
      formatLabel: "2-day",
      formatName: "2-day weekend school",
      title: "Weekend school",
      fullTitle: "Weekend school at Houston MSR 2.4",
      track: "Houston MSR 2.4",
      trackLong: "Houston MSR 2.4 mi · 17 turns",
      city: "Angleton, TX",
      address: "Angleton, TX",
      maps: "https://maps.google.com/?q=MSR+Houston+Angleton+TX",
      start: "2027-02-06T06:00:00-06:00",
      end: "2027-02-07T17:00:00-06:00",
      hours: "Sat–Sun · gates open 6:00 am CT",
      dateLong: "Sat–Sun, Feb 6–7, 2027",
      dateShort: "Sat–Sun, Feb 6–7",
      dayName: "Feb 6–7",
      stamp: ["2-day · Sat–Sun", "Feb 6–7"],
      regOpens: "2026-11-14T10:00:00-06:00",
      regOpensLabel: "Sat, Nov 14, 10 am",
      regOpensShort: "Nov 14",
      earlyBirdEnds: "2027-01-27T23:59:00-06:00",
      earlyBirdLabel: "Wed, Jan 27",
      earlyBirdShort: "Jan 27",
      soldOut: false,
      photo: "assets/img/car-blue-corvette.jpg",
      photoPos: "26% 62%",
      // PLACEHOLDER: Houston MSR has no track image yet; Vera chose Eagles Canyon for now.
      outline: "assets/img/track-outline-eagles-canyon.png",
      // PLACEHOLDER prices. TDE's page shows "from $265".
      prices: { green: 365, blue: 345, yellow: 305, red: 265 },
      soloPrices: { yellow: 265 },
      solo: { yellow: "optional", red: "required" }
    }
  ]
};
