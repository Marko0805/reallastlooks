import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// TRAINING SCHEDULE — Full Program
// ═══════════════════════════════════════════════════════════
const SCHEDULE = {
  1: {
    name: "UPPER A", subtitle: "Push Focus · Pull Secondary", emoji: "💪", color: "#0071E3",
    exercises: [
      { id: "push_ups",   name: "Push-ups",              sets: 4, type: "reps", target: "4×max", hint: "Standard → Archer → Decline. Log every rep." },
      { id: "aus_rows",   name: "Australian Rows",        sets: 4, type: "reps", target: "4×8-12", hint: "Chest to bar. Pull scapula back and down." },
      { id: "pike_pu",    name: "Pike Push-ups",           sets: 3, type: "reps", target: "3×8-12", hint: "Hips high, head toward floor. Shoulder builder." },
      { id: "pullups",    name: "Pull-ups / Negatives",    sets: 3, type: "reps", target: "3×max", hint: "5-sec negative if can't do full rep. MOST IMPORTANT." },
      { id: "diamond",    name: "Diamond Push-ups",        sets: 3, type: "reps", target: "3×8-12", hint: "Hands form diamond. Inner chest + triceps." },
      { id: "plank",      name: "Plank",                   sets: 3, type: "time", target: "3×30s", hint: "Squeeze everything. Breathe through nose." },
      { id: "leg_raise",  name: "Lying Leg Raises",        sets: 3, type: "reps", target: "3×15", hint: "Slow and controlled. Full range of motion." },
    ]
  },
  2: {
    name: "LOWER A", subtitle: "Legs + Zone 2 Cardio", emoji: "🦵", color: "#30D158",
    exercises: [
      { id: "bss_l",     name: "Bulgarian Split Squat — Left",  sets: 4, type: "reps", target: "4×10", hint: "Rear foot on chair. Drop back knee to floor." },
      { id: "bss_r",     name: "Bulgarian Split Squat — Right", sets: 4, type: "reps", target: "4×10", hint: "Match left side perfectly." },
      { id: "hip_thr",   name: "Hip Thrusts",                   sets: 4, type: "reps", target: "4×15", hint: "Shoulders on chair edge. Squeeze glutes at top." },
      { id: "nordic",    name: "Nordic Curl Negatives",          sets: 3, type: "reps", target: "3×5",  hint: "6-sec lowering phase. Most powerful hamstring move." },
      { id: "calf",      name: "Calf Raises (Single Leg)",       sets: 4, type: "reps", target: "4×25", hint: "On step edge. Full range — all the way down." },
      { id: "zone2",     name: "Zone 2 Run",                     sets: 1, type: "time", target: "20 min", hint: "Conversational pace. Nasal breathing only. Longevity." },
    ]
  },
  3: {
    name: "ACTIVE REST", subtitle: "Recover · Decompress · Move", emoji: "🌿", color: "#86868B",
    exercises: [
      { id: "walk",      name: "Easy Walk to Park", sets: 1, type: "time", target: "30 min", hint: "Gentle movement. Body is repairing right now." },
      { id: "dead_hang", name: "Dead Hangs",         sets: 3, type: "time", target: "3×30s", hint: "Spinal decompression + grip strength. Feel the stretch." },
    ]
  },
  4: {
    name: "UPPER B", subtitle: "Pull Focus · Push Secondary", emoji: "🔱", color: "#BF5AF2",
    exercises: [
      { id: "pull_b",    name: "Pull-ups",                      sets: 5, type: "reps", target: "5×max", hint: "+1 total rep vs last week. This is your north star metric." },
      { id: "pu_hard",   name: "Push-up Harder Variation",      sets: 4, type: "reps", target: "4×max", hint: "One step harder than Monday. Always progress." },
      { id: "cmd_l",     name: "Commando Rows — Left",          sets: 3, type: "reps", target: "3×8",   hint: "One arm under bar, twist, pull chest to bar. V-taper." },
      { id: "cmd_r",     name: "Commando Rows — Right",         sets: 3, type: "reps", target: "3×8",   hint: "Match left side." },
      { id: "dips",      name: "Dips",                          sets: 4, type: "reps", target: "4×8-12", hint: "Parallel bars or 2 chairs. Chest forward = chest activation." },
      { id: "face_pll",  name: "Face Pulls (Towel on Pole)",    sets: 3, type: "reps", target: "3×15",  hint: "Lean back, pull hands to ears. Shoulder longevity for life." },
      { id: "side_plk",  name: "Side Plank (Each Side)",        sets: 3, type: "time", target: "3×30s", hint: "Hips up. Body straight as a board. Both sides equal." },
    ]
  },
  5: { name: "REST", subtitle: "Complete Recovery", emoji: "😴", color: "#48484A", exercises: [] },
  6: {
    name: "LOWER B + HIIT", subtitle: "Explosive Power · Sprint Protocol", emoji: "⚡", color: "#FF9F0A",
    exercises: [
      { id: "jump_sq",  name: "Jump Squats",                  sets: 4, type: "reps", target: "4×10",      hint: "Explosive up. Land soft. Fast-twitch activation." },
      { id: "pist_l",   name: "Pistol Squat — Left",          sets: 4, type: "reps", target: "4×max",     hint: "Assisted first → Box → Full pistol. Progress the variation." },
      { id: "pist_r",   name: "Pistol Squat — Right",         sets: 4, type: "reps", target: "4×max",     hint: "Match left." },
      { id: "rlunge_l", name: "Reverse Lunges — Left",        sets: 3, type: "reps", target: "3×12",      hint: "Step back, controlled. Feel the glute loading." },
      { id: "rlunge_r", name: "Reverse Lunges — Right",       sets: 3, type: "reps", target: "3×12",      hint: "Match left." },
      { id: "wall_sit", name: "Wall Sit",                     sets: 3, type: "time", target: "3×45-60s",  hint: "90 degrees exactly. Mental toughness forged here." },
      { id: "hiit",     name: "HIIT Sprints",                 sets: 8, type: "reps", target: "8 rounds",  hint: "20s all-out / 40s walk. +500% GH spike. Fat destroyer." },
    ]
  },
  0: { name: "REST", subtitle: "Complete Recovery", emoji: "😴", color: "#48484A", exercises: [] },
};

// ═══════════════════════════════════════════════════════════
// LOOKSMAXX HABITS
// ═══════════════════════════════════════════════════════════
const HABITS = [
  { id: "mewing",      cat: "jaw",     emoji: "👅", name: "Mewing All Day",                  xp: 15, note: "Full tongue flat on palate. Lips sealed. Nasal breathing only." },
  { id: "bone_smash",  cat: "jaw",     emoji: "🦴", name: "Bone Smash — Light 5 min",        xp: 10, note: "Gentle circular pressure: cheekbones, jaw, forehead. Daily." },
  { id: "hard_chew",   cat: "jaw",     emoji: "💎", name: "Hard Chewing",                    xp: 10, note: "Chew tough food equally both sides. Jaw muscle training." },
  { id: "chin_tuck",   cat: "posture", emoji: "📐", name: "Chin Tucks (Every Hour)",         xp: 15, note: "10 reps per hour at desk. Reverses forward head posture." },
  { id: "shld_sq",     cat: "posture", emoji: "🔁", name: "Shoulder Squeezes (Every Hour)",  xp: 10, note: "15 reps per hour. Counteracts rounded shoulders." },
  { id: "hip_str",     cat: "posture", emoji: "🧘", name: "Hip Flexor Stretch (Every Hour)", xp: 10, note: "30 sec each side. Fixes anterior pelvic tilt from sitting." },
  { id: "thor_ext",    cat: "posture", emoji: "🪑", name: "Thoracic Extension",              xp: 10, note: "Lean back over chair edge, 10 reps. Desk hunch antidote." },
  { id: "cold_wash",   cat: "skin",    emoji: "❄️", name: "Cold Face Wash (AM + PM)",        xp: 10, note: "Tighten pores, boost circulation, reduce puffiness." },
  { id: "sunlight",    cat: "skin",    emoji: "☀️", name: "Morning Sunlight — 20 min",       xp: 15, note: "Free vitamin D. Testosterone + skin health. Never skip." },
  { id: "sleep_back",  cat: "sleep",   emoji: "🛏️", name: "Sleep on Back",                   xp: 15, note: "No sleep wrinkles. Maintains mewing posture overnight." },
  { id: "no_screens",  cat: "sleep",   emoji: "📵", name: "No Screens 30 min Pre-Sleep",     xp: 20, note: "Melatonin production. Deeper sleep = more GH = more muscle." },
  { id: "kegels",      cat: "vitality",emoji: "⚙️", name: "Kegel Sets × 3",                  xp: 10, note: "3 × 10 contractions, 5 sec hold. Vitality investment that compounds." },
];

const CAT_LABELS = {
  jaw: "🦷 Jaw & Face", posture: "📐 Posture", skin: "✨ Skin", sleep: "🌙 Sleep", vitality: "🔥 Vitality"
};

// ═══════════════════════════════════════════════════════════
// NUTRITION
// ═══════════════════════════════════════════════════════════
const MEALS = [
  { id: "pre_wo",   emoji: "⚡", name: "Pre-Workout",    time: "7:00 AM",   items: "2× white bread + yogurt",      kcal: 350, prot: 12 },
  { id: "post_wo",  emoji: "💪", name: "Post-Workout",   time: "9:00 AM",   items: "4-5 whole eggs scrambled",      kcal: 360, prot: 30 },
  { id: "lunch",    emoji: "🍝", name: "Lunch",          time: "12:00 PM",  items: "150g dry pasta + 2 eggs",       kcal: 700, prot: 38 },
  { id: "snack",    emoji: "🥛", name: "Afternoon",      time: "3:00 PM",   items: "500ml whole milk",              kcal: 300, prot: 17 },
  { id: "pre_slp",  emoji: "🌙", name: "Pre-Sleep",      time: "Before Bed",items: "3-4 eggs + yogurt",             kcal: 400, prot: 35 },
];

// ═══════════════════════════════════════════════════════════
// XP LEVELS
// ═══════════════════════════════════════════════════════════
const LEVELS = [
  { xp: 0,     name: "RECRUIT",  color: "#86868B" },
  { xp: 500,   name: "WARRIOR",  color: "#30D158" },
  { xp: 1500,  name: "ATHLETE",  color: "#0071E3" },
  { xp: 3500,  name: "CHAMPION", color: "#BF5AF2" },
  { xp: 7000,  name: "ELITE",    color: "#FF9F0A" },
  { xp: 15000, name: "LEGEND",   color: "#FF375F" },
];

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function getDayOfWeek() { return new Date().getDay(); }
function fmtDate(k) {
  const d = new Date(k + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function getLevelData(xp) {
  let lvl = LEVELS[0], idx = 0;
  LEVELS.forEach((l, i) => { if (xp >= l.xp) { lvl = l; idx = i; } });
  const next = LEVELS[idx + 1];
  const pct = next ? Math.round(((xp - lvl.xp) / (next.xp - lvl.xp)) * 100) : 100;
  return { ...lvl, idx, next, pct };
}
function initDay() {
  return { habits: {}, meals: {}, exercises: {}, water: 0, steps: 0, sleep: 0, xpEarned: 0 };
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function GodTierTracker() {
  const [profile, setProfile] = useState({ totalXp: 0, streak: 0, longestStreak: 0, lastDate: "" });
  const [days, setDays] = useState({});
  const [tab, setTab] = useState("today");
  const [loaded, setLoaded] = useState(false);
  const [xpAnim, setXpAnim] = useState(null);
  const [expandedEx, setExpandedEx] = useState(null);
  const xpQueueRef = useRef([]);

  const todayKey = getTodayKey();
  const dow = getDayOfWeek();
  const sched = SCHEDULE[dow];
  const today = days[todayKey] || initDay();

  // ── STORAGE LOAD ─────────────────────────────────────────
  useEffect(() => {
    try {
      const p = localStorage.getItem("gt_profile");
      const d = localStorage.getItem("gt_days");
      if (p) setProfile(JSON.parse(p));
      if (d) setDays(JSON.parse(d));
    } catch {}
    setLoaded(true);
  }, []);

  // ── STORAGE SAVE ─────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("gt_profile", JSON.stringify(profile)); } catch {}
    try { localStorage.setItem("gt_days", JSON.stringify(days)); } catch {}
  }, [profile, days, loaded]);

  // ── XP ENGINE ────────────────────────────────────────────
  function addXP(amount) {
    setXpAnim({ amount, id: Date.now() });
    setTimeout(() => setXpAnim(null), 1600);

    setProfile(p => {
      const newXp = p.totalXp + amount;
      let streak = p.streak;
      let lastDate = p.lastDate;
      if (lastDate !== todayKey) {
        const yest = new Date();
        yest.setDate(yest.getDate() - 1);
        const yKey = yest.toISOString().split("T")[0];
        streak = lastDate === yKey ? streak + 1 : 1;
        lastDate = todayKey;
      }
      return { ...p, totalXp: newXp, streak, longestStreak: Math.max(p.longestStreak, streak), lastDate };
    });

    setDays(d => {
      const td = d[todayKey] || initDay();
      return { ...d, [todayKey]: { ...td, xpEarned: (td.xpEarned || 0) + amount } };
    });
  }

  // ── DAY DATA UPDATER ─────────────────────────────────────
  function patchToday(patch) {
    setDays(d => ({ ...d, [todayKey]: { ...(d[todayKey] || initDay()), ...patch } }));
  }

  // ── HABIT TOGGLE ─────────────────────────────────────────
  function toggleHabit(h) {
    const done = today.habits[h.id];
    if (!done) addXP(h.xp);
    patchToday({ habits: { ...today.habits, [h.id]: !done } });
  }

  // ── MEAL TOGGLE ──────────────────────────────────────────
  function toggleMeal(m) {
    const done = today.meals[m.id];
    if (!done) addXP(15);
    patchToday({ meals: { ...today.meals, [m.id]: !done } });
  }

  // ── EXERCISE SET UPDATE ──────────────────────────────────
  function setExValue(exId, setIdx, val) {
    const curr = today.exercises[exId] || { sets: [] };
    const newSets = [...(curr.sets || [])];
    newSets[setIdx] = Math.max(0, val);
    const wasComplete = curr.completed;
    const allFilled = newSets.filter(s => s > 0).length === newSets.length && newSets.length > 0;
    if (allFilled && !wasComplete) addXP(25);
    patchToday({
      exercises: {
        ...today.exercises,
        [exId]: { ...curr, sets: newSets, completed: allFilled }
      }
    });
  }

  function setExWeight(exId, w) {
    const curr = today.exercises[exId] || { sets: [] };
    patchToday({ exercises: { ...today.exercises, [exId]: { ...curr, weight: Math.max(0, w) } } });
  }

  // ── LAST SESSION LOOKUP ──────────────────────────────────
  function getLastSession(exId) {
    const sorted = Object.keys(days).filter(k => k < todayKey).sort().reverse();
    for (const k of sorted) {
      const ex = days[k]?.exercises?.[exId];
      if (ex?.sets?.length) return { date: k, ...ex };
    }
    return null;
  }

  // ── COMPUTED STATS ───────────────────────────────────────
  const habDone = HABITS.filter(h => today.habits[h.id]).length;
  const mealDone = MEALS.filter(m => today.meals[m.id]).length;
  const exDone = sched.exercises.filter(e => today.exercises[e.id]?.completed).length;
  const exTotal = sched.exercises.length;
  const woPct  = exTotal > 0 ? Math.round((exDone / exTotal) * 100) : 0;
  const habPct = Math.round((habDone / HABITS.length) * 100);
  const mealPct = Math.round((mealDone / MEALS.length) * 100);
  const lvl = getLevelData(profile.totalXp);
  const kcalEaten = MEALS.reduce((s, m) => s + (today.meals[m.id] ? m.kcal : 0), 0);
  const protEaten = MEALS.reduce((s, m) => s + (today.meals[m.id] ? m.prot : 0), 0);

  // ════════════════════════════════════════════════════════
  // CSS
  // ════════════════════════════════════════════════════════
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    html,body{background:#F5F5F7;overscroll-behavior:none;}
    input[type=number]{-moz-appearance:textfield;}
    input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
    button{font-family:inherit;cursor:pointer;}
    ::-webkit-scrollbar{width:0;}

    @keyframes floatXP{
      0%{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}
      30%{opacity:1;transform:translateX(-50%) translateY(-20px) scale(1.2);}
      100%{opacity:0;transform:translateX(-50%) translateY(-80px) scale(0.8);}
    }
    @keyframes checkPop{
      0%{transform:scale(0) rotate(-10deg);}
      60%{transform:scale(1.25) rotate(5deg);}
      100%{transform:scale(1) rotate(0);}
    }
    @keyframes slideUp{
      from{opacity:0;transform:translateY(16px);}
      to{opacity:1;transform:translateY(0);}
    }
    @keyframes pulseGlow{
      0%,100%{box-shadow:0 0 0 0 rgba(48,209,88,0.4);}
      50%{box-shadow:0 0 0 8px rgba(48,209,88,0);}
    }
    @keyframes xpShimmer{
      0%{background-position:-200% center;}
      100%{background-position:200% center;}
    }
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes orbFloat{
      0%,100%{transform:translateY(0) scale(1);}
      50%{transform:translateY(-12px) scale(1.05);}
    }

    .slide-up{animation:slideUp 0.35s cubic-bezier(0.4,0,0.2,1) both;}
    .fade-in{animation:fadeIn 0.25s ease both;}
    .tab-enter{animation:slideUp 0.3s cubic-bezier(0.4,0,0.2,1) both;}
    .check-pop{animation:checkPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;}
    .card{animation:slideUp 0.4s cubic-bezier(0.4,0,0.2,1) both;}

    .bar-fill{transition:width 0.7s cubic-bezier(0.4,0,0.2,1);}
    .btn-press:active{transform:scale(0.9);transition:transform 0.1s;}
    .tab-icon{transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1);}
    .tab-icon:active{transform:scale(0.85);}

    .xp-bar{
      background:linear-gradient(90deg,#0071E3,#BF5AF2,#FF9F0A);
      background-size:200% auto;
      animation:xpShimmer 3s linear infinite;
      transition:width 1s cubic-bezier(0.4,0,0.2,1);
    }
    .habit-check.on{animation:checkPop 0.4s cubic-bezier(0.34,1.56,0.64,1);}
    .pr-badge{animation:pulseGlow 2s ease infinite;}
  `;

  // ════════════════════════════════════════════════════════
  // TAB: TODAY
  // ════════════════════════════════════════════════════════
  const TabToday = () => (
    <div className="tab-enter" style={{padding:"0 16px 20px"}}>

      {/* LEVEL CARD */}
      <div className="card" style={{background:"#000",borderRadius:26,padding:"22px 22px 18px",marginBottom:12,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:lvl.color,opacity:0.12,animation:"orbFloat 4s ease infinite"}}/>
        <div style={{position:"absolute",bottom:-20,left:-20,width:80,height:80,borderRadius:"50%",background:lvl.color,opacity:0.08}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,position:"relative"}}>
          <div>
            <div style={{fontSize:11,color:"#636366",letterSpacing:2,textTransform:"uppercase",marginBottom:4,fontWeight:600}}>Current Rank</div>
            <div style={{fontSize:30,fontWeight:800,color:lvl.color,letterSpacing:-1,lineHeight:1}}>{lvl.name}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:"#636366",letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>Total XP</div>
            <div style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:-0.5}}>{profile.totalXp.toLocaleString()}</div>
          </div>
        </div>
        <div style={{background:"#1C1C1E",borderRadius:8,height:8,overflow:"hidden",marginBottom:8}}>
          <div className="xp-bar" style={{height:"100%",width:`${lvl.pct}%`,borderRadius:8}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#48484A",fontWeight:600}}>
          <span>{lvl.name}</span>
          <span>{lvl.next ? `${lvl.pct}% → ${lvl.next.name}` : "⚔️ MAX RANK"}</span>
        </div>
      </div>

      {/* STREAK + WORKOUT */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <div className="card" style={{background:"#fff",borderRadius:22,padding:"18px 16px",textAlign:"center",animationDelay:"0.05s"}}>
          <div style={{fontSize:11,color:"#86868B",letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:6}}>🔥 Streak</div>
          <div style={{fontSize:38,fontWeight:800,color:"#FF9F0A",lineHeight:1,letterSpacing:-1}}>{profile.streak}</div>
          <div style={{fontSize:11,color:"#C7C7CC",marginTop:4}}>best: {profile.longestStreak}</div>
        </div>
        <div className="card" style={{background:"#fff",borderRadius:22,padding:"18px 16px",textAlign:"center",animationDelay:"0.08s"}}>
          <div style={{fontSize:11,color:"#86868B",letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:6}}>Workout</div>
          <div style={{fontSize:38,fontWeight:800,color:woPct===100?"#30D158":"#1D1D1F",lineHeight:1,letterSpacing:-1}}>{woPct}%</div>
          <div style={{fontSize:11,color:"#C7C7CC",marginTop:4}}>{exDone}/{exTotal} done</div>
        </div>
      </div>

      {/* TODAY'S SESSION */}
      <div className="card" style={{background:"#fff",borderRadius:22,padding:"16px 18px",marginBottom:12,display:"flex",alignItems:"center",gap:14,animationDelay:"0.1s"}}>
        <div style={{width:52,height:52,borderRadius:16,background:sched.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{sched.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:17,fontWeight:800,color:"#1D1D1F",letterSpacing:-0.3}}>{sched.name}</div>
          <div style={{fontSize:13,color:"#86868B",marginTop:2}}>{sched.subtitle}</div>
        </div>
        <div style={{fontSize:14,fontWeight:700,color:sched.color,background:sched.color+"15",padding:"4px 10px",borderRadius:10}}>{exDone}/{exTotal}</div>
      </div>

      {/* WATER + STEPS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {/* WATER */}
        <div className="card" style={{background:"#fff",borderRadius:22,padding:"16px",animationDelay:"0.12s"}}>
          <div style={{fontSize:11,color:"#86868B",letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:8}}>💧 Water</div>
          <div style={{fontSize:30,fontWeight:800,color:"#0071E3",letterSpacing:-1,marginBottom:10}}>{today.water.toFixed(1)}<span style={{fontSize:14,fontWeight:600,color:"#86868B"}}>L</span></div>
          <div style={{height:5,background:"#F2F2F7",borderRadius:3,overflow:"hidden",marginBottom:10}}>
            <div className="bar-fill" style={{height:"100%",width:`${Math.min(100,(today.water/3)*100)}%`,background:"#0071E3",borderRadius:3}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn-press" onClick={() => patchToday({water:Math.max(0,today.water-0.5)})} style={{flex:1,height:34,borderRadius:12,border:"1.5px solid #E5E5EA",background:"#fff",fontSize:16,fontWeight:700,color:"#86868B"}}>−</button>
            <button className="btn-press" onClick={() => {const w=today.water+0.5;patchToday({water:w});if(w>=3&&today.water<3)addXP(25);}} style={{flex:1,height:34,borderRadius:12,border:"none",background:"#0071E3",color:"#fff",fontSize:16,fontWeight:700}}>+</button>
          </div>
          {today.water>=3&&<div style={{fontSize:10,color:"#30D158",fontWeight:700,letterSpacing:1,marginTop:6,textAlign:"center"}}>✓ 3L GOAL HIT +25 XP</div>}
        </div>

        {/* STEPS */}
        <div className="card" style={{background:"#fff",borderRadius:22,padding:"16px",animationDelay:"0.14s"}}>
          <div style={{fontSize:11,color:"#86868B",letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:8}}>👟 Steps</div>
          <div style={{fontSize:30,fontWeight:800,color:today.steps>=5000?"#30D158":"#1D1D1F",letterSpacing:-1,marginBottom:10}}>{today.steps>=1000?`${(today.steps/1000).toFixed(1)}k`:today.steps}</div>
          <div style={{height:5,background:"#F2F2F7",borderRadius:3,overflow:"hidden",marginBottom:10}}>
            <div className="bar-fill" style={{height:"100%",width:`${Math.min(100,(today.steps/5000)*100)}%`,background:today.steps>=5000?"#30D158":"#1D1D1F",borderRadius:3}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn-press" onClick={() => patchToday({steps:Math.max(0,today.steps-500)})} style={{flex:1,height:34,borderRadius:12,border:"1.5px solid #E5E5EA",background:"#fff",fontSize:16,fontWeight:700,color:"#86868B"}}>−</button>
            <button className="btn-press" onClick={() => {const s=today.steps+500;patchToday({steps:s});if(s>=5000&&today.steps<5000)addXP(30);}} style={{flex:1,height:34,borderRadius:12,border:"none",background:"#30D158",color:"#fff",fontSize:16,fontWeight:700}}>+</button>
          </div>
          {today.steps>=5000&&<div style={{fontSize:10,color:"#30D158",fontWeight:700,letterSpacing:1,marginTop:6,textAlign:"center"}}>✓ 5K HIT +30 XP</div>}
        </div>
      </div>

      {/* SLEEP */}
      <div className="card" style={{background:"#fff",borderRadius:22,padding:"16px 18px",marginBottom:12,animationDelay:"0.15s"}}>
        <div style={{fontSize:11,color:"#86868B",letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:10}}>🌙 Sleep Last Night</div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:38,fontWeight:800,color:"#BF5AF2",letterSpacing:-1}}>{today.sleep||0}<span style={{fontSize:14,color:"#86868B",fontWeight:600}}>h</span></div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>
            {[5,5.5,6,6.5,7,7.5,8,8.5].map(h=>(
              <button key={h} onClick={()=>patchToday({sleep:h})} style={{padding:"5px 10px",borderRadius:10,border:`1.5px solid ${today.sleep===h?"#BF5AF2":"#E5E5EA"}`,background:today.sleep===h?"#BF5AF2":"#fff",color:today.sleep===h?"#fff":"#1D1D1F",fontSize:12,fontWeight:700,transition:"all 0.2s ease"}}>{h}h</button>
            ))}
          </div>
        </div>
      </div>

      {/* PROGRESS BARS */}
      <div className="card" style={{background:"#fff",borderRadius:22,padding:"18px 20px",animationDelay:"0.17s"}}>
        <div style={{fontSize:11,color:"#86868B",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:16}}>Today's Progress</div>
        {[
          {label:"Workout",pct:woPct,color:"#0071E3"},
          {label:"Looksmaxx",pct:habPct,color:"#BF5AF2"},
          {label:"Nutrition",pct:mealPct,color:"#FF9F0A"},
        ].map(r=>(
          <div key={r.label} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <span style={{fontSize:14,fontWeight:600,color:"#1D1D1F"}}>{r.label}</span>
              <span style={{fontSize:14,fontWeight:800,color:r.color}}>{r.pct}%</span>
            </div>
            <div style={{height:7,background:"#F2F2F7",borderRadius:4,overflow:"hidden"}}>
              <div className="bar-fill" style={{height:"100%",width:`${r.pct}%`,background:r.color,borderRadius:4}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════
  // TAB: TRAIN
  // ════════════════════════════════════════════════════════
  const TabTrain = () => {
    if (!sched.exercises.length) return (
      <div className="tab-enter" style={{padding:"40px 20px",textAlign:"center"}}>
        <div style={{fontSize:72,marginBottom:20,animation:"orbFloat 3s ease infinite"}}>{sched.emoji}</div>
        <div style={{fontSize:26,fontWeight:800,color:"#1D1D1F",letterSpacing:-0.5,marginBottom:10}}>{sched.name}</div>
        <div style={{fontSize:15,color:"#86868B",lineHeight:1.6,marginBottom:28}}>Muscle is being built right now while you rest. This is part of the program.</div>
        <div style={{background:"#fff",borderRadius:22,padding:"20px",textAlign:"left"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#86868B",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Today's Protocol</div>
          {["30 min easy walk to park","Dead hangs from bar — 3 × 30s","Full body mobility work","Sleep extra if possible","Eat all your meals on schedule"].map(t=>(
            <div key={t} style={{fontSize:14,color:"#1D1D1F",padding:"8px 0",borderBottom:"1px solid #F2F2F7",display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:"#30D158",fontWeight:700}}>→</span>{t}
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="tab-enter" style={{padding:"0 16px 20px"}}>
        {/* Header */}
        <div style={{background:sched.color,borderRadius:26,padding:"20px 22px",marginBottom:16,display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:40,animation:"orbFloat 3s ease infinite"}}>{sched.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:22,fontWeight:800,color:"#fff",letterSpacing:-0.5}}>{sched.name}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:2}}>{sched.subtitle}</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.2)",borderRadius:12,padding:"6px 12px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{exDone}/{exTotal}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",letterSpacing:1}}>DONE</div>
          </div>
        </div>

        {sched.exercises.map((ex, i) => {
          const exData = today.exercises[ex.id] || {};
          const sets = exData.sets || [];
          const last = getLastSession(ex.id);
          const open = expandedEx === ex.id;
          const done = exData.completed;

          return (
            <div key={ex.id} className="card" style={{background:"#fff",borderRadius:22,marginBottom:10,overflow:"hidden",border:`2px solid ${done?sched.color+"50":"transparent"}`,transition:"border-color 0.3s ease",animationDelay:`${i*0.04}s`}}>
              {/* Exercise Row */}
              <button onClick={()=>setExpandedEx(open?null:ex.id)} style={{width:"100%",padding:"16px 18px",background:"none",border:"none",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:38,height:38,borderRadius:12,background:done?sched.color:"#F2F2F7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}>
                  {done
                    ? <span className="check-pop" style={{color:"#fff",fontSize:16,fontWeight:800}}>✓</span>
                    : <span style={{color:"#86868B",fontSize:13,fontWeight:700}}>{i+1}</span>
                  }
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#1D1D1F",letterSpacing:-0.2}}>{ex.name}</div>
                  <div style={{fontSize:12,color:"#86868B",marginTop:2}}>{ex.target}</div>
                </div>
                {last && (
                  <div style={{fontSize:11,color:"#86868B",background:"#F5F5F7",borderRadius:8,padding:"3px 8px",fontWeight:600}}>prev</div>
                )}
                <div style={{fontSize:18,color:"#C7C7CC",transform:open?"rotate(180deg)":"none",transition:"transform 0.25s ease",flexShrink:0}}>›</div>
              </button>

              {/* Expanded */}
              {open && (
                <div style={{padding:"0 18px 18px",borderTop:"1px solid #F5F5F7"}}>
                  {/* Hint */}
                  <div style={{background:"#F5F5F7",borderRadius:14,padding:"10px 14px",margin:"12px 0 14px",borderLeft:`3px solid ${sched.color}`}}>
                    <div style={{fontSize:12,color:"#86868B",lineHeight:1.6}}>💡 {ex.hint}</div>
                  </div>

                  {/* Previous session */}
                  {last && (
                    <div style={{background:sched.color+"10",borderRadius:14,padding:"10px 14px",marginBottom:14}}>
                      <div style={{fontSize:10,color:"#86868B",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:5}}>Last Session · {fmtDate(last.date)}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        {(last.sets||[]).map((s,si)=>(
                          <div key={si} style={{background:"#fff",borderRadius:8,padding:"4px 10px",fontSize:13,fontWeight:700,color:"#1D1D1F"}}>
                            S{si+1}: <span style={{color:sched.color}}>{s}</span>
                          </div>
                        ))}
                        {(last.weight||0)>0&&<div style={{background:"#fff",borderRadius:8,padding:"4px 10px",fontSize:13,fontWeight:700,color:"#86868B"}}>🎒 {last.weight}kg</div>}
                      </div>
                    </div>
                  )}

                  {/* Set Logger */}
                  <div style={{fontSize:10,color:"#86868B",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:10}}>Log Sets</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:10,marginBottom:14}}>
                    {Array(ex.sets).fill(0).map((_,si)=>{
                      const v = sets[si]||0;
                      const lastV = last?.sets?.[si]||0;
                      const isPR = v>0&&v>lastV&&lastV>0;
                      const isFirst = v>0&&lastV===0;
                      return (
                        <div key={si} style={{background:"#F5F5F7",borderRadius:16,padding:"12px 10px",textAlign:"center",border:`1.5px solid ${isPR?sched.color:isFirst?"#30D158":"transparent"}`,transition:"border-color 0.25s ease"}}>
                          <div style={{fontSize:10,color:"#86868B",marginBottom:6,fontWeight:600}}>
                            SET {si+1} {lastV>0?`· prev: ${lastV}`:"· first!"}
                          </div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                            <button className="btn-press" onClick={()=>setExValue(ex.id,si,v-1)} style={{width:28,height:28,borderRadius:8,border:"none",background:"#E5E5EA",fontSize:16,fontWeight:700,color:"#48484A"}}>−</button>
                            <span style={{fontSize:22,fontWeight:800,minWidth:30,color:isPR?sched.color:"#1D1D1F",transition:"color 0.2s"}}>{v}</span>
                            <button className="btn-press" onClick={()=>setExValue(ex.id,si,v+1)} style={{width:28,height:28,borderRadius:8,border:"none",background:"#1D1D1F",color:"#fff",fontSize:16,fontWeight:700}}>+</button>
                          </div>
                          {isPR&&(
                            <div className="pr-badge" style={{fontSize:9,color:"#fff",fontWeight:800,letterSpacing:1,marginTop:6,background:sched.color,borderRadius:6,padding:"2px 6px",display:"inline-block"}}>▲ PR</div>
                          )}
                          {isFirst&&(
                            <div style={{fontSize:9,color:"#30D158",fontWeight:800,letterSpacing:1,marginTop:6}}>★ FIRST</div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Backpack weight */}
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:12,color:"#86868B",fontWeight:600}}>🎒 Backpack:</span>
                    <button className="btn-press" onClick={()=>setExWeight(ex.id,(exData.weight||0)-1)} style={{width:28,height:28,borderRadius:8,border:"1px solid #E5E5EA",background:"#fff",fontSize:14,fontWeight:700,color:"#86868B"}}>−</button>
                    <span style={{fontSize:14,fontWeight:700,minWidth:32,textAlign:"center"}}>{exData.weight||0}kg</span>
                    <button className="btn-press" onClick={()=>setExWeight(ex.id,(exData.weight||0)+1)} style={{width:28,height:28,borderRadius:8,border:"none",background:"#1D1D1F",color:"#fff",fontSize:14,fontWeight:700}}>+</button>
                    <span style={{fontSize:11,color:"#C7C7CC",marginLeft:4}}>Add books/bottles</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════
  // TAB: LOOKS (Looksmaxx)
  // ════════════════════════════════════════════════════════
  const TabLooks = () => (
    <div className="tab-enter" style={{padding:"0 16px 20px"}}>
      {/* Header */}
      <div style={{background:"#1D1D1F",borderRadius:26,padding:"20px 22px",marginBottom:16}}>
        <div style={{fontSize:22,fontWeight:800,color:"#fff",letterSpacing:-0.5,marginBottom:4}}>LOOKSMAXX PROTOCOL</div>
        <div style={{fontSize:13,color:"#636366",marginBottom:14}}>{habDone}/{HABITS.length} habits · {habPct}% complete today</div>
        <div style={{height:7,background:"#2C2C2E",borderRadius:4,overflow:"hidden"}}>
          <div className="bar-fill" style={{height:"100%",width:`${habPct}%`,background:"linear-gradient(90deg,#BF5AF2,#0071E3)",borderRadius:4}}/>
        </div>
        <div style={{marginTop:12,fontSize:11,color:"#48484A",lineHeight:1.6}}>
          At 21 your cranial sutures are still adapting. Every day of mewing + bone smash compounds for the next 4 years. This is the window.
        </div>
      </div>

      {Object.keys(CAT_LABELS).map(cat => {
        const catHabits = HABITS.filter(h=>h.cat===cat);
        return (
          <div key={cat} style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:"#86868B",letterSpacing:2,textTransform:"uppercase",marginBottom:8,paddingLeft:4}}>{CAT_LABELS[cat]}</div>
            {catHabits.map((h,i)=>{
              const done = today.habits[h.id];
              return (
                <button key={h.id} onClick={()=>toggleHabit(h)} className="card" style={{width:"100%",background:"#fff",borderRadius:20,padding:"14px 16px",marginBottom:8,border:`2px solid ${done?"#30D158":"transparent"}`,textAlign:"left",display:"flex",alignItems:"flex-start",gap:12,transition:"border-color 0.25s ease",animationDelay:`${i*0.04}s`}}>
                  <div className={`habit-check ${done?"on":""}`} style={{width:36,height:36,borderRadius:12,background:done?"#30D158":"#F2F2F7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 0.25s ease"}}>
                    {done
                      ? <span style={{color:"#fff",fontSize:16,fontWeight:800}}>✓</span>
                      : <span style={{fontSize:18}}>{h.emoji}</span>
                    }
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700,color:done?"#30D158":"#1D1D1F",transition:"color 0.25s"}}>{h.name}</div>
                    <div style={{fontSize:12,color:"#86868B",marginTop:3,lineHeight:1.5}}>{h.note}</div>
                  </div>
                  <div style={{fontSize:12,fontWeight:800,color:"#BF5AF2",background:"#BF5AF215",borderRadius:8,padding:"3px 8px",flexShrink:0}}>+{h.xp}</div>
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Mewing deep dive */}
      <div style={{background:"#fff",borderRadius:22,padding:"18px 20px",marginBottom:12}}>
        <div style={{fontSize:14,fontWeight:800,color:"#1D1D1F",marginBottom:12}}>👅 Exact Mewing Technique</div>
        {[
          ["Step 1","Entire tongue body flat against palate — not just the tip. Back third included."],
          ["Step 2","Lips sealed at rest. Nasal breathing only. 24/7. Especially during sleep."],
          ["Step 3","Teeth lightly touching or barely separated. Never clenching."],
          ["Step 4","Chin slightly tucked — natural, not forced. Stacks the cervical spine."],
          ["Timeline","At 21: 4 years of maximum bone adaptation window. Subtle midface widening in 12 months."],
        ].map(([t,d])=>(
          <div key={t} style={{display:"flex",gap:12,padding:"8px 0",borderBottom:"1px solid #F5F5F7"}}>
            <span style={{fontSize:12,fontWeight:800,color:"#0071E3",minWidth:60,flexShrink:0}}>{t}</span>
            <span style={{fontSize:13,color:"#48484A",lineHeight:1.5}}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════
  // TAB: FUEL
  // ════════════════════════════════════════════════════════
  const TabFuel = () => (
    <div className="tab-enter" style={{padding:"0 16px 20px"}}>
      {/* Macro Summary */}
      <div style={{background:"#000",borderRadius:26,padding:"20px 22px",marginBottom:16}}>
        <div style={{fontSize:11,color:"#636366",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:14}}>Today's Intake</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:14}}>
          <div>
            <div style={{fontSize:34,fontWeight:800,color:"#FF9F0A",letterSpacing:-1,lineHeight:1}}>{kcalEaten}<span style={{fontSize:14,color:"#636366",fontWeight:600}}> kcal</span></div>
            <div style={{fontSize:11,color:"#48484A",marginTop:4}}>Target: 3,000</div>
            <div style={{height:5,background:"#1C1C1E",borderRadius:3,marginTop:8,overflow:"hidden"}}>
              <div className="bar-fill" style={{height:"100%",width:`${Math.min(100,(kcalEaten/3000)*100)}%`,background:"#FF9F0A",borderRadius:3}}/>
            </div>
          </div>
          <div>
            <div style={{fontSize:34,fontWeight:800,color:"#30D158",letterSpacing:-1,lineHeight:1}}>{protEaten}<span style={{fontSize:14,color:"#636366",fontWeight:600}}>g</span></div>
            <div style={{fontSize:11,color:"#48484A",marginTop:4}}>Target: 130g protein</div>
            <div style={{height:5,background:"#1C1C1E",borderRadius:3,marginTop:8,overflow:"hidden"}}>
              <div className="bar-fill" style={{height:"100%",width:`${Math.min(100,(protEaten/130)*100)}%`,background:"#30D158",borderRadius:3}}/>
            </div>
          </div>
        </div>
        <div style={{fontSize:12,color:"#48484A",lineHeight:1.6}}>
          You need <span style={{color:"#FF9F0A",fontWeight:700}}>2,800–3,200 kcal</span> and <span style={{color:"#30D158",fontWeight:700}}>110–130g protein</span> daily to grow. Undereating is your #1 enemy.
        </div>
      </div>

      <div style={{fontSize:11,fontWeight:700,color:"#86868B",letterSpacing:2,textTransform:"uppercase",marginBottom:10,paddingLeft:4}}>Meal Protocol</div>
      {MEALS.map((m,i)=>{
        const done = today.meals[m.id];
        return (
          <button key={m.id} onClick={()=>toggleMeal(m)} className="card" style={{width:"100%",background:"#fff",borderRadius:20,padding:"16px 18px",marginBottom:10,border:`2px solid ${done?"#FF9F0A":"transparent"}`,textAlign:"left",display:"flex",alignItems:"center",gap:14,transition:"border-color 0.25s ease",animationDelay:`${i*0.06}s`}}>
            <div style={{width:48,height:48,borderRadius:16,background:done?"#FF9F0A18":"#F5F5F7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,transition:"background 0.25s ease"}}>{done?"✅":m.emoji}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{fontSize:16,fontWeight:800,color:"#1D1D1F"}}>{m.name}</div>
                <div style={{fontSize:11,color:"#86868B",fontWeight:600}}>{m.time}</div>
              </div>
              <div style={{fontSize:13,color:"#86868B",marginTop:3}}>{m.items}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#FF9F0A",marginTop:5}}>{m.kcal} kcal · {m.prot}g protein</div>
            </div>
          </button>
        );
      })}

      {/* Hardgainer tips */}
      <div style={{background:"#fff",borderRadius:22,padding:"18px 20px",marginBottom:12}}>
        <div style={{fontSize:14,fontWeight:800,color:"#1D1D1F",marginBottom:12}}>🧠 Hardgainer Eating Hacks</div>
        {[
          "Liquid calories bypass satiety — blend bread + milk if needed",
          "Eat on a SCHEDULE not on hunger — set alarms",
          "Sunflower oil = cheapest calorie bomb. 1 tbsp = 120 kcal. Add to pasta.",
          "Smaller meals more often — 5 × 600 kcal is easier than 3 × 1,000",
          "Pre-sleep carbs → better sleep → more GH → more muscle",
        ].map(t=>(
          <div key={t} style={{fontSize:13,color:"#48484A",padding:"7px 0",borderBottom:"1px solid #F5F5F7",display:"flex",gap:10,lineHeight:1.5}}>
            <span style={{color:"#0071E3",fontWeight:800,flexShrink:0}}>→</span>{t}
          </div>
        ))}
      </div>

      {/* Priority buy list */}
      <div style={{background:"#fff",borderRadius:22,padding:"18px 20px"}}>
        <div style={{fontSize:14,fontWeight:800,color:"#1D1D1F",marginBottom:12}}>💰 Priority Buy (200–300 RSD)</div>
        {[
          {f:"Sunflower oil",w:"Cheapest calorie density. Add to every meal."},
          {f:"Sardines/Mackerel",w:"Complete protein + omega-3. Skin, brain, hormones."},
          {f:"Oats",w:"Slow carbs + fiber. Cheap mass gainer base."},
          {f:"Bananas",w:"Calorie dense. Potassium for muscle contraction."},
          {f:"Cabbage/Carrots",w:"Vitamins, gut health, skin glow. Ultra cheap."},
        ].map(t=>(
          <div key={t.f} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:"1px solid #F5F5F7",alignItems:"flex-start"}}>
            <span style={{fontSize:13,fontWeight:800,color:"#1D1D1F",minWidth:105,flexShrink:0}}>{t.f}</span>
            <span style={{fontSize:12,color:"#86868B",lineHeight:1.5}}>{t.w}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════
  // TAB: STATS
  // ════════════════════════════════════════════════════════
  const TabStats = () => {
    const allDays = Object.entries(days).sort(([a],[b])=>b.localeCompare(a));
    const totalSessions = allDays.filter(([,d])=>Object.keys(d.exercises||{}).length>0).length;
    const totalHabits = allDays.reduce((s,[,d])=>s+Object.values(d.habits||{}).filter(Boolean).length,0);
    const avgSleep = allDays.filter(([,d])=>d.sleep>0).length
      ? allDays.filter(([,d])=>d.sleep>0).reduce((s,[,d])=>s+d.sleep,0)/allDays.filter(([,d])=>d.sleep>0).length
      : 0;
    const last14 = allDays.slice(0,14).reverse();
    const maxXP = Math.max(...last14.map(([,d])=>d.xpEarned||0),1);

    return (
      <div className="tab-enter" style={{padding:"0 16px 20px"}}>
        {/* Hero stats */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
          {[
            {v:totalSessions,l:"Sessions",c:"#0071E3"},
            {v:profile.longestStreak,l:"Best Streak",c:"#FF9F0A"},
            {v:`${Math.round(avgSleep*10)/10||0}h`,l:"Avg Sleep",c:"#BF5AF2"},
          ].map(s=>(
            <div key={s.l} className="card" style={{background:"#fff",borderRadius:20,padding:"14px 10px",textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:800,color:s.c,letterSpacing:-0.5,lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:10,color:"#86868B",letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginTop:5}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* XP Chart */}
        <div className="card" style={{background:"#fff",borderRadius:22,padding:"18px 20px",marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"#86868B",letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>XP Last 14 Days</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:3,height:90}}>
            {last14.map(([key,d])=>{
              const xp = d.xpEarned||0;
              const h = xp>0?Math.max(10,(xp/maxXP)*90):4;
              return (
                <div key={key} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",gap:4}}>
                  <div style={{width:"100%",height:h,background:xp>0?"#0071E3":"#F2F2F7",borderRadius:"4px 4px 0 0",transition:"height 0.5s ease",opacity:xp>0?0.9:1}}/>
                  <div style={{fontSize:8,color:"#C7C7CC",transform:"rotate(-45deg)",transformOrigin:"center",whiteSpace:"nowrap",marginBottom:4}}>{key.slice(5)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Self */}
        <div className="card" style={{background:"#1D1D1F",borderRadius:22,padding:"20px",marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"#636366",letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Your Future Self</div>
          {[
            {age:25,body:"68–72kg",face:"Visible abs. V-taper. Sharp jaw.",c:"#30D158"},
            {age:30,body:"72–78kg",face:"Top 5% physique. 25 looks.",c:"#0071E3"},
            {age:40,body:"Peak density",face:"15yr younger than peers who drink/smoke.",c:"#BF5AF2"},
            {age:50,body:"Still jacked",face:"Conversations stop when you walk in.",c:"#FF9F0A"},
            {age:65,body:"The legend",face:"VO₂ max of a 40yr old. Defying biology.",c:"#FF375F"},
          ].map(f=>(
            <div key={f.age} style={{display:"flex",gap:14,marginBottom:14,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:14,background:f.c+"20",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:11,fontWeight:800,color:f.c,lineHeight:1}}>AGE</span>
                <span style={{fontSize:14,fontWeight:800,color:f.c}}>{f.age}</span>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{f.body}</div>
                <div style={{fontSize:12,color:"#636366",marginTop:2,lineHeight:1.5}}>{f.face}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent history */}
        <div className="card" style={{background:"#fff",borderRadius:22,padding:"18px 20px"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#86868B",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>History</div>
          {allDays.slice(0,10).map(([key,d])=>{
            const exs = Object.values(d.exercises||{}).filter(e=>e.completed).length;
            const hbs = Object.values(d.habits||{}).filter(Boolean).length;
            const xp = d.xpEarned||0;
            return (
              <div key={key} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #F5F5F7"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#1D1D1F",minWidth:56}}>{fmtDate(key)}</div>
                <div style={{display:"flex",gap:6,flex:1,flexWrap:"wrap"}}>
                  {exs>0&&<span style={{fontSize:11,background:"#0071E315",color:"#0071E3",borderRadius:6,padding:"2px 7px",fontWeight:700}}>{exs} ex</span>}
                  {hbs>0&&<span style={{fontSize:11,background:"#BF5AF215",color:"#BF5AF2",borderRadius:6,padding:"2px 7px",fontWeight:700}}>{hbs} hab</span>}
                  {d.steps>=5000&&<span style={{fontSize:11,background:"#30D15815",color:"#30D158",borderRadius:6,padding:"2px 7px",fontWeight:700}}>5k✓</span>}
                </div>
                <div style={{fontSize:13,fontWeight:800,color:xp>0?"#FF9F0A":"#C7C7CC",flexShrink:0}}>+{xp}</div>
              </div>
            );
          })}
          {allDays.length===0&&(
            <div style={{textAlign:"center",padding:"30px 0",color:"#86868B",fontSize:15}}>Day 1 starts now. History builds from here.</div>
          )}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════
  // TABS CONFIG
  // ════════════════════════════════════════════════════════
  const TABS = [
    {id:"today",label:"Today",icon:"⚡"},
    {id:"train",label:"Train",icon:sched.emoji},
    {id:"looks",label:"Looks",icon:"✨"},
    {id:"fuel",label:"Fuel",icon:"🔥"},
    {id:"stats",label:"Stats",icon:"📊"},
  ];

  if (!loaded) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#F5F5F7",fontFamily:"-apple-system,sans-serif",gap:16}}>
      <div style={{fontSize:52,animation:"orbFloat 2s ease infinite"}}>⚡</div>
      <div style={{fontSize:11,color:"#86868B",letterSpacing:3,textTransform:"uppercase",fontWeight:700}}>Loading Your Empire</div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',sans-serif",background:"#F5F5F7",minHeight:"100vh",maxWidth:430,margin:"0 auto",position:"relative",paddingBottom:85}}>

        {/* XP Float */}
        {xpAnim && (
          <div key={xpAnim.id} style={{position:"fixed",top:"14%",left:"50%",zIndex:9999,fontSize:24,fontWeight:800,color:"#30D158",animation:"floatXP 1.5s cubic-bezier(0.4,0,0.2,1) forwards",pointerEvents:"none",textShadow:"0 2px 12px rgba(48,209,88,0.5)",whiteSpace:"nowrap"}}>
            +{xpAnim.amount} XP
          </div>
        )}

        {/* STICKY HEADER */}
        <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(245,245,247,0.88)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid rgba(0,0,0,0.06)",padding:"14px 20px 12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:20,fontWeight:800,color:"#1D1D1F",letterSpacing:-0.5,lineHeight:1}}>GOD TIER</div>
              <div style={{fontSize:12,color:"#86868B",fontWeight:500,marginTop:2}}>
                {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:11,fontWeight:800,color:lvl.color,letterSpacing:2,textTransform:"uppercase"}}>{lvl.name}</div>
              <div style={{fontSize:12,color:"#86868B",fontWeight:600}}>{profile.totalXp.toLocaleString()} XP · 🔥 {profile.streak}</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{paddingTop:10}}>
          {tab==="today" && <TabToday/>}
          {tab==="train" && <TabTrain/>}
          {tab==="looks" && <TabLooks/>}
          {tab==="fuel"  && <TabFuel/>}
          {tab==="stats" && <TabStats/>}
        </div>

        {/* TAB BAR */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderTop:"1px solid rgba(0,0,0,0.08)",padding:"6px 0 10px",zIndex:100}}>
          <div style={{display:"flex"}}>
            {TABS.map(t=>{
              const active = tab===t.id;
              return (
                <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 2px",background:"none",border:"none",transition:"opacity 0.2s"}}>
                  <span className="tab-icon" style={{fontSize:22,filter:active?"none":"grayscale(1) opacity(0.45)",transition:"filter 0.2s"}}>{t.icon}</span>
                  <span style={{fontSize:9,fontWeight:active?800:600,color:active?"#0071E3":"#86868B",letterSpacing:0.5,textTransform:"uppercase",transition:"color 0.2s"}}>{t.label}</span>
                  {active&&<div style={{width:4,height:4,borderRadius:2,background:"#0071E3",marginTop:-1,animation:"fadeIn 0.2s ease"}}/>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
