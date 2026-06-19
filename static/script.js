<script>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Mock Interview Coach</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #080810;
    --card: #10101c;
    --card2: #14141f;
    --border: #1e1e32;
    --border2: #2a2a45;
    --accent: #6c63ff;
    --accent2: #ff6584;
    --accent3: #00e5a0;
    --text: #e8e8f4;
    --muted: #5a5a78;
    --muted2: #8888a8;
    --success: #00e5a0;
    --warning: #fbbf24;
    --danger: #ff4f6d;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    background-image:
      radial-gradient(ellipse 60% 40% at 20% -10%, rgba(108,99,255,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 80% 110%, rgba(255,101,132,0.08) 0%, transparent 60%);
  }

  .container { width: 100%; max-width: 800px; }

  .screen { display: none; }
  .screen.active { display: block; animation: fadeUp 0.45s cubic-bezier(.22,.68,0,1.2); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ─── SCREEN 1 ─── */
  .logo-line {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 18px;
  }
  .logo-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 14px var(--accent);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 8px var(--accent); }
    50%      { box-shadow: 0 0 22px var(--accent); }
  }
  .logo-text {
    font-size: 0.78rem; letter-spacing: 3px; text-transform: uppercase;
    color: var(--muted2); font-weight: 500;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 6vw, 3.4rem);
    font-weight: 800;
    line-height: 1.08;
    margin-bottom: 14px;
    background: linear-gradient(135deg, #fff 30%, #a09fff 65%, var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub { color: var(--muted2); font-size: 1rem; margin-bottom: 38px; max-width: 520px; line-height: 1.6; }

  .section-label {
    font-size: 0.72rem; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--muted); font-weight: 600; margin-bottom: 14px;
  }

  .job-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
    gap: 12px;
    margin-bottom: 32px;
  }

  .job-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 22px 14px 18px;
    cursor: pointer;
    transition: all 0.22s cubic-bezier(.22,.68,0,1.2);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .job-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(108,99,255,0.08), transparent);
    opacity: 0; transition: opacity 0.22s;
  }
  .job-card:hover::before, .job-card.selected::before { opacity: 1; }
  .job-card:hover, .job-card.selected {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(108,99,255,0.2);
  }
  .job-card.selected { border-color: var(--accent); }
  .job-card .icon { font-size: 1.9rem; margin-bottom: 10px; display: block; }
  .job-card .title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.88rem; line-height: 1.3; }
  .job-card .sub   { color: var(--muted); font-size: 0.74rem; margin-top: 5px; }
  .job-card .q-count {
    position: absolute; top: 10px; right: 10px;
    background: rgba(108,99,255,0.15); color: var(--accent);
    font-size: 0.65rem; font-weight: 700; padding: 2px 7px;
    border-radius: 100px; letter-spacing: 0.5px;
  }

  /* Question count picker */
  .count-section {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 22px 24px;
    margin-bottom: 24px;
  }
  .count-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem;
    margin-bottom: 6px;
  }
  .count-sub { color: var(--muted2); font-size: 0.83rem; margin-bottom: 18px; }
  .count-chips { display: flex; flex-wrap: wrap; gap: 10px; }
  .chip {
    padding: 9px 20px; border-radius: 100px;
    border: 1.5px solid var(--border2); background: transparent;
    color: var(--muted2); font-family: 'Syne', sans-serif;
    font-size: 0.88rem; font-weight: 700; cursor: pointer;
    transition: all 0.18s;
  }
  .chip:hover { border-color: var(--accent); color: var(--text); }
  .chip.active {
    background: var(--accent); border-color: var(--accent);
    color: white; box-shadow: 0 4px 16px rgba(108,99,255,0.35);
  }

  .btn {
    background: var(--accent);
    color: white; border: none;
    padding: 15px 32px; border-radius: 12px;
    font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s; width: 100%;
    box-shadow: 0 4px 20px rgba(108,99,255,0.3);
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  }
  .btn:hover { background: #5a52e0; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(108,99,255,0.4); }
  .btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn:active { transform: scale(0.98); }

  /* ─── SCREEN 2 ─── */
  .interview-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px;
  }
  .interview-title {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem;
    display: flex; align-items: center; gap: 10px;
  }
  .live-badge {
    background: var(--danger); color: white;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 1px;
    padding: 3px 9px; border-radius: 100px; text-transform: uppercase;
    animation: livePulse 1.5s infinite;
  }
  @keyframes livePulse {
    0%,100% { opacity: 1; } 50% { opacity: 0.6; }
  }

  .progress-wrap { margin-bottom: 26px; }
  .progress-meta {
    display: flex; justify-content: space-between;
    font-size: 0.78rem; color: var(--muted); margin-bottom: 8px;
  }
  .progress-bar {
    background: var(--border); border-radius: 100px;
    height: 5px; overflow: hidden;
  }
  .progress-fill {
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    height: 100%; border-radius: 100px; transition: width 0.5s ease;
  }

  .question-box {
    background: var(--card);
    border: 1.5px solid var(--border2);
    border-left: 4px solid var(--accent);
    border-radius: 16px; padding: 24px 22px; margin-bottom: 18px;
  }
  .question-label {
    color: var(--accent); font-size: 0.72rem; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .q-type-badge {
    background: rgba(108,99,255,0.15); color: var(--accent);
    font-size: 0.64rem; padding: 2px 8px; border-radius: 100px;
    border: 1px solid rgba(108,99,255,0.2); letter-spacing: 0.5px;
  }
  .question-text { font-size: 1.05rem; line-height: 1.65; font-weight: 500; }

  .answer-area {
    width: 100%; background: var(--card);
    border: 1.5px solid var(--border2); border-radius: 13px;
    padding: 16px 18px; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    resize: vertical; min-height: 130px; margin-bottom: 14px;
    transition: border-color 0.2s; line-height: 1.6;
  }
  .answer-area:focus { outline: none; border-color: var(--accent); }
  .char-count { text-align: right; font-size: 0.75rem; color: var(--muted); margin-top: -10px; margin-bottom: 14px; }

  .loading { display: none; text-align: center; padding: 22px; }
  .loading-dots span {
    display: inline-block; width: 8px; height: 8px;
    background: var(--accent); border-radius: 50%; margin: 0 3px;
    animation: bounce 1.2s infinite;
  }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce {
    0%,80%,100% { transform: scale(0.6); opacity: 0.4; }
    40%          { transform: scale(1); opacity: 1; }
  }
  .loading-text { margin-top: 10px; font-size: 0.83rem; color: var(--muted2); font-style: italic; }

  .feedback-box {
    background: linear-gradient(135deg, rgba(108,99,255,0.06), rgba(255,101,132,0.04));
    border: 1.5px solid rgba(108,99,255,0.25);
    border-radius: 14px; padding: 22px; margin-bottom: 16px; display: none;
  }
  .feedback-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .score-badge {
    background: var(--accent); color: white;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.05rem;
    padding: 6px 18px; border-radius: 100px;
    box-shadow: 0 4px 14px rgba(108,99,255,0.35);
  }
  .score-bar-wrap { flex: 1; }
  .score-bar-bg { background: var(--border); border-radius: 100px; height: 6px; overflow: hidden; }
  .score-bar-fill {
    height: 100%; border-radius: 100px;
    background: linear-gradient(90deg, var(--accent), var(--accent3));
    transition: width 0.6s ease;
  }
  .feedback-section { margin-bottom: 12px; }
  .feedback-label {
    font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--muted); font-weight: 600; margin-bottom: 6px;
  }
  .feedback-text { line-height: 1.7; color: var(--text); font-size: 0.9rem; }
  .better-answer-box {
    background: rgba(0,229,160,0.05); border: 1px solid rgba(0,229,160,0.2);
    border-radius: 10px; padding: 14px 16px; margin-top: 4px;
  }
  .better-answer-box .feedback-text { color: rgba(230,255,248,0.9); }

  /* ─── SCREEN 3 ─── */
  .report-hero {
    background: var(--card);
    border: 1.5px solid var(--border2);
    border-radius: 20px; padding: 36px 28px; margin-bottom: 16px;
    text-align: center; position: relative; overflow: hidden;
  }
  .report-hero::before {
    content: '';
    position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
    width: 280px; height: 280px; border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.15), transparent 70%);
    pointer-events: none;
  }
  .report-score {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 10vw, 5rem); font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .report-denom { font-size: 1.5rem; }
  .report-label { color: var(--muted2); font-size: 0.85rem; margin: 8px 0 20px; }
  .grade-badge {
    display: inline-block; font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1rem; padding: 8px 24px; border-radius: 100px; margin-bottom: 16px;
    letter-spacing: 0.5px;
  }
  .grade-excellent { background: linear-gradient(135deg,#00e5a0,#00b87f); color: #000; }
  .grade-good      { background: linear-gradient(135deg,#6c63ff,#a09fff); color: #fff; }
  .grade-average   { background: linear-gradient(135deg,#fbbf24,#f59e0b); color: #000; }
  .grade-poor      { background: linear-gradient(135deg,#ff4f6d,#e02048); color: #fff; }
  .tag {
    display: inline-block; background: var(--border); border-radius: 100px;
    padding: 5px 14px; font-size: 0.78rem; margin: 3px;
    color: var(--muted2); border: 1px solid var(--border2);
  }
  .per-q-grid { display: grid; gap: 10px; margin-bottom: 16px; }
  .per-q-item {
    background: var(--card); border: 1.5px solid var(--border);
    border-radius: 13px; padding: 16px 20px;
    display: flex; align-items: center; gap: 16px;
  }
  .per-q-num {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem;
    color: var(--muted); min-width: 28px;
  }
  .per-q-info { flex: 1; }
  .per-q-q { font-size: 0.83rem; color: var(--muted2); margin-bottom: 4px; line-height: 1.4; }
  .per-q-bar { background: var(--border); border-radius: 100px; height: 5px; overflow: hidden; }
  .per-q-fill { height: 100%; border-radius: 100px; background: linear-gradient(90deg, var(--accent), var(--accent3)); }
  .per-q-score {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.95rem; color: var(--text);
  }

  .report-card {
    background: var(--card); border: 1.5px solid var(--border);
    border-radius: 16px; padding: 24px 24px; margin-bottom: 14px;
  }
  .report-section { margin-bottom: 18px; }
  .report-section:last-child { margin-bottom: 0; }
  .report-section h4 {
    font-family: 'Syne', sans-serif; font-size: 0.78rem; letter-spacing: 2px;
    text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
    display: flex; align-items: center; gap: 8px;
  }
  .report-section p { line-height: 1.75; font-size: 0.91rem; color: rgba(232,232,244,0.85); }

  .btn-row { display: flex; gap: 12px; margin-top: 4px; }
  .btn-outline {
    background: transparent; border: 1.5px solid var(--accent);
    color: var(--accent); box-shadow: none;
  }
  .btn-outline:hover { background: var(--accent); color: white; }

  /* Responsive */
  @media (max-width: 480px) {
    .job-grid { grid-template-columns: repeat(2, 1fr); }
    .btn-row { flex-direction: column; }
    .per-q-item { flex-wrap: wrap; }
  }
</style>
</head>
<body>
<div class="container">

  <!-- ═══ SCREEN 1: Setup ═══ -->
  <div class="screen active" id="screen1">
    <div class="logo-line">
      <div class="logo-dot"></div>
      <div class="logo-text">AI-Powered · Pakistan Focused</div>
    </div>
    <div class="hero-title">Mock Interview<br>Coach</div>
    <div class="hero-sub">Choose your job role and how many questions you want. Get real AI feedback on every answer.</div>

    <div class="section-label">1. Select Job Role</div>
    <div class="job-grid">
      <div class="job-card" onclick="selectJob(this,'NOC / Network Engineer','networking protocols, ISP operations, troubleshooting, CCNA, OSPF, BGP, MPLS, fiber optics')">
        <div class="icon">🌐</div>
        <div class="title">NOC Engineer</div>
        <div class="sub">Networking & ISP</div>
        <div class="q-count">50 Qs</div>
      </div>
      <div class="job-card" onclick="selectJob(this,'Bank Officer','banking operations, finance, AML/KYC, customer service, compliance, credit analysis, SBP regulations')">
        <div class="icon">🏦</div>
        <div class="title">Bank Officer</div>
        <div class="sub">Finance & Banking</div>
        <div class="q-count">50 Qs</div>
      </div>
      <div class="job-card" onclick="selectJob(this,'UI/UX Designer','Figma, design systems, user research, usability testing, accessibility, prototyping, portfolio')">
        <div class="icon">🎨</div>
        <div class="title">UI/UX Designer</div>
        <div class="sub">Design & Product</div>
        <div class="q-count">50 Qs</div>
      </div>
      <div class="job-card" onclick="selectJob(this,'Software Engineer','data structures, algorithms, system design, OOP, REST APIs, databases, Git, testing')">
        <div class="icon">💻</div>
        <div class="title">Software Engineer</div>
        <div class="sub">Development</div>
        <div class="q-count">50 Qs</div>
      </div>
      <div class="job-card" onclick="selectJob(this,'Government / FPSC Officer','Pakistan affairs, current events, public administration, general knowledge, CSS/PMS syllabus, governance')">
        <div class="icon">🏛️</div>
        <div class="title">Govt / FPSC</div>
        <div class="sub">Public Sector</div>
        <div class="q-count">50 Qs</div>
      </div>
    </div>

    <div class="count-section">
      <div class="section-label" style="margin-bottom:0">2. How Many Questions?</div>
      <div class="count-title" id="countTitle">Choose session length</div>
      <div class="count-sub">Each question is randomly drawn from a pool of 50+ role-specific questions.</div>
      <div class="count-chips">
        <div class="chip" onclick="selectCount(this,5)">5 · Quick</div>
        <div class="chip" onclick="selectCount(this,10)">10 · Standard</div>
        <div class="chip" onclick="selectCount(this,15)">15 · Thorough</div>
        <div class="chip" onclick="selectCount(this,20)">20 · Deep Dive</div>
      </div>
    </div>

    <button class="btn" id="startBtn" onclick="startInterview()" disabled>
      Start Interview Session →
    </button>
  </div>

  <!-- ═══ SCREEN 2: Interview ═══ -->
  <div class="screen" id="screen2">
    <div class="interview-header">
      <div class="interview-title">
        🎤 Interview
        <span class="live-badge">LIVE</span>
      </div>
      <div style="color:var(--muted);font-size:0.82rem;" id="questionCounter">Q 1 of 5</div>
    </div>

    <div class="progress-wrap">
      <div class="progress-meta">
        <span id="progressLabel">Question 1</span>
        <span id="progressPct">20%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill" style="width:0%"></div>
      </div>
    </div>

    <div class="question-box">
      <div class="question-label">
        📌 Interviewer asks
        <span class="q-type-badge" id="qTypeBadge">—</span>
      </div>
      <div class="question-text" id="questionText">Loading your question...</div>
    </div>

    <textarea class="answer-area" id="answerInput" placeholder="Type your answer here... Be specific, use examples, and structure your thoughts clearly." oninput="updateCharCount()"></textarea>
    <div class="char-count" id="charCount">0 characters</div>

    <div class="loading" id="loadingDiv">
      <div class="loading-dots"><span></span><span></span><span></span></div>
      <div class="loading-text">AI is evaluating your answer…</div>
    </div>

    <div class="feedback-box" id="feedbackBox">
      <div class="feedback-header">
        <div class="score-badge" id="scoreBadge">0/10</div>
        <div class="score-bar-wrap">
          <div class="score-bar-bg">
            <div class="score-bar-fill" id="scoreBarFill" style="width:0%"></div>
          </div>
        </div>
      </div>
      <div class="feedback-section">
        <div class="feedback-label">💬 Feedback</div>
        <div class="feedback-text" id="feedbackText"></div>
      </div>
      <div class="feedback-section">
        <div class="feedback-label">💡 Stronger Answer</div>
        <div class="better-answer-box">
          <div class="feedback-text" id="betterText"></div>
        </div>
      </div>
    </div>

    <button class="btn" id="submitBtn" onclick="submitAnswer()">Submit Answer</button>
  </div>

  <!-- ═══ SCREEN 3: Report ═══ -->
  <div class="screen" id="screen3">
    <div class="report-hero">
      <div class="report-score" id="finalScore">—</div>
      <div class="report-label" id="finalLabel">Interview Complete</div>
      <div class="grade-badge" id="gradeBadge">—</div>
      <br>
      <div id="scoreTags"></div>
    </div>

    <div class="per-q-grid" id="perQuestionGrid"></div>

    <div class="report-card">
      <div class="report-section">
        <h4>✅ Your Strengths</h4>
        <p id="strengthsText">Generating...</p>
      </div>
      <div class="report-section">
        <h4>⚠️ Areas to Improve</h4>
        <p id="weaknessText">Generating...</p>
      </div>
      <div class="report-section">
        <h4>📚 Top Recommendations</h4>
        <p id="tipsText">Generating...</p>
      </div>
    </div>

    <div class="btn-row">
      <button class="btn" onclick="restart()">↩ Try Another Role</button>
      <button class="btn btn-outline" onclick="sameRole()">🔄 Same Role Again</button>
    </div>
  </div>

</div>

<script>
// ─────────────────────────────────────────────
// QUESTION BANK — 50+ questions per role
// Types: behavioral | technical | situational | HR
// ─────────────────────────────────────────────
const QUESTION_BANK = {

  "NOC / Network Engineer": [
    {q:"Explain the OSI model and give a real-world example for each layer.", type:"Technical"},
    {q:"What is the difference between TCP and UDP? When would you choose one over the other?", type:"Technical"},
    {q:"A client reports internet outage. Walk me through your full troubleshooting process.", type:"Situational"},
    {q:"What is BGP and how does it differ from OSPF?", type:"Technical"},
    {q:"Explain VLAN and why it's used in enterprise networks.", type:"Technical"},
    {q:"What is MPLS and what problems does it solve?", type:"Technical"},
    {q:"A fiber link has gone down at 3am. What steps do you take immediately?", type:"Situational"},
    {q:"What is the difference between half-duplex and full-duplex?", type:"Technical"},
    {q:"Tell me about a time you diagnosed and resolved a complex network issue under pressure.", type:"Behavioral"},
    {q:"What tools do you use for network monitoring and why?", type:"Technical"},
    {q:"Explain NAT and PAT. What is the difference?", type:"Technical"},
    {q:"What is subnetting? Calculate the subnet for 192.168.10.0/26.", type:"Technical"},
    {q:"How does DHCP work? What happens if the DHCP server goes down?", type:"Technical"},
    {q:"Describe the spanning tree protocol (STP) and why it matters.", type:"Technical"},
    {q:"What is a network baseline and why should you maintain one?", type:"Technical"},
    {q:"How would you handle a DDoS attack hitting your ISP infrastructure?", type:"Situational"},
    {q:"Explain QoS and how you would prioritize VoIP traffic.", type:"Technical"},
    {q:"What certifications do you hold or are pursuing and why?", type:"HR"},
    {q:"How do you stay updated with new networking technologies and vulnerabilities?", type:"HR"},
    {q:"Describe your experience with network ticketing systems like Zabbix, PRTG, or SolarWinds.", type:"Technical"},
    {q:"What is the difference between a router and a Layer 3 switch?", type:"Technical"},
    {q:"Explain the concept of load balancing and its role in NOC environments.", type:"Technical"},
    {q:"What is SNMP and how is it used in network monitoring?", type:"Technical"},
    {q:"A customer's latency suddenly spikes to 300ms. How do you investigate?", type:"Situational"},
    {q:"What is the purpose of a default gateway?", type:"Technical"},
    {q:"How do you document network changes and why is documentation important?", type:"Behavioral"},
    {q:"What are the differences between IPv4 and IPv6?", type:"Technical"},
    {q:"Explain link aggregation (LACP). When would you use it?", type:"Technical"},
    {q:"You've been awake 18 hours during a major outage. How do you maintain accuracy?", type:"Behavioral"},
    {q:"What is traceroute and how do you interpret its output?", type:"Technical"},
    {q:"Describe a time you improved a process or reduced recurring incidents in your team.", type:"Behavioral"},
    {q:"What is the purpose of ACLs on a router?", type:"Technical"},
    {q:"How do you prioritize multiple simultaneous alerts during a crisis?", type:"Situational"},
    {q:"What is the role of DNS in networking? Explain forward and reverse lookup.", type:"Technical"},
    {q:"Explain the difference between symmetric and asymmetric internet connections.", type:"Technical"},
    {q:"What is TTL and what role does it play in networking?", type:"Technical"},
    {q:"How would you mentor a junior NOC engineer who keeps misdiagnosing tickets?", type:"Behavioral"},
    {q:"What is the difference between a hub, switch, and router?", type:"Technical"},
    {q:"Tell me why you want to work in NOC operations specifically.", type:"HR"},
    {q:"What is ICMP and how is it used in troubleshooting?", type:"Technical"},
    {q:"Describe your experience with FTTH or GPON fiber networks.", type:"Technical"},
    {q:"How do you handle conflict with a colleague during a high-stress network incident?", type:"Behavioral"},
    {q:"What is OSPF area 0 and why is it required?", type:"Technical"},
    {q:"Explain the concept of route redistribution between routing protocols.", type:"Technical"},
    {q:"What is a SLA in networking context and how do you ensure compliance?", type:"Technical"},
    {q:"How would you secure a core router from unauthorized access?", type:"Situational"},
    {q:"Describe your shift handover process to ensure no incidents fall through the cracks.", type:"Behavioral"},
    {q:"What is VRRP/HSRP and when is it used?", type:"Technical"},
    {q:"How do you handle a situation where a vendor is blaming your network but you believe it's their end?", type:"Situational"},
    {q:"Where do you see yourself in the networking field in 3 years?", type:"HR"},
  ],

  "Bank Officer": [
    {q:"Explain the difference between a current account and a savings account from a bank's perspective.", type:"Technical"},
    {q:"What is KYC and why is it critical in banking?", type:"Technical"},
    {q:"Walk me through the loan approval process from application to disbursement.", type:"Technical"},
    {q:"What are the State Bank of Pakistan's (SBP) key regulations you must follow as a bank officer?", type:"Technical"},
    {q:"A customer is aggressive and threatens to close all accounts. How do you handle this?", type:"Situational"},
    {q:"What is AML (Anti-Money Laundering) and how does it affect daily operations?", type:"Technical"},
    {q:"Explain credit risk and how you would assess a small business loan application.", type:"Technical"},
    {q:"What is the difference between secured and unsecured lending?", type:"Technical"},
    {q:"Describe a time you caught an error or discrepancy before it became a serious problem.", type:"Behavioral"},
    {q:"How do you cross-sell products without making customers feel pressured?", type:"Situational"},
    {q:"What is a CIBIL/eCIB report and how do you use it?", type:"Technical"},
    {q:"How does Islamic banking differ from conventional banking?", type:"Technical"},
    {q:"Explain the repo rate and its effect on commercial banks.", type:"Technical"},
    {q:"A customer demands urgent cash but the system is down. What do you do?", type:"Situational"},
    {q:"What is treasury management in a bank context?", type:"Technical"},
    {q:"How would you handle a discrepancy found during end-of-day balancing?", type:"Situational"},
    {q:"Describe your experience with core banking software (e.g., T24, Temenos, Oracle FLEXCUBE).", type:"Technical"},
    {q:"What is a letter of credit (LC) and when is it used?", type:"Technical"},
    {q:"Tell me about a time you had to meet a very aggressive sales target. How did you manage?", type:"Behavioral"},
    {q:"What is the difference between a bank's assets and liabilities?", type:"Technical"},
    {q:"How do you ensure confidentiality when handling customer financial data?", type:"Behavioral"},
    {q:"Explain non-performing loans (NPL) and how they affect a bank's health.", type:"Technical"},
    {q:"What is the difference between a demand draft and a pay order?", type:"Technical"},
    {q:"How would you explain a complex financial product to an elderly customer with low literacy?", type:"Situational"},
    {q:"What is FATF and why does Pakistan's status on its list matter to banks?", type:"Technical"},
    {q:"A colleague is processing transactions that seem suspicious. What do you do?", type:"Situational"},
    {q:"Explain Basel III regulations and how they affect capital requirements.", type:"Technical"},
    {q:"Why did you choose banking as a career?", type:"HR"},
    {q:"How do you stay calm when handling multiple customers simultaneously during peak hours?", type:"Behavioral"},
    {q:"What is a CDR (Call Deposit Receipt) and how does it differ from an FDR?", type:"Technical"},
    {q:"Describe how inflation impacts a bank's interest rate policies.", type:"Technical"},
    {q:"How do you handle a situation where a customer disputes a transaction they claim they didn't make?", type:"Situational"},
    {q:"What are off-balance-sheet items? Give examples.", type:"Technical"},
    {q:"Walk me through the process of clearing a cheque.", type:"Technical"},
    {q:"How do you build long-term relationships with high-net-worth clients?", type:"Behavioral"},
    {q:"What is microfinance and who does it serve in Pakistan?", type:"Technical"},
    {q:"Describe the concept of provisioning in the context of bad loans.", type:"Technical"},
    {q:"What would you do if a senior manager asked you to bypass compliance procedures?", type:"Situational"},
    {q:"How do you manage stress during audit periods?", type:"HR"},
    {q:"Explain the difference between branchless banking and digital banking.", type:"Technical"},
    {q:"What is a credit facility and what types are common in Pakistan?", type:"Technical"},
    {q:"A customer accuses you of giving wrong financial advice. How do you respond?", type:"Situational"},
    {q:"What is Raast payment system and how does it benefit banking customers?", type:"Technical"},
    {q:"How would you approach a customer who has missed three loan installments?", type:"Situational"},
    {q:"Describe a time you went above and beyond for a customer.", type:"Behavioral"},
    {q:"What is SWIFT and how is it used in international transactions?", type:"Technical"},
    {q:"What is your biggest weakness and how are you working on it?", type:"HR"},
    {q:"Explain the concept of hedging in banking.", type:"Technical"},
    {q:"How do you set daily priorities when managing a branch counter?", type:"Behavioral"},
    {q:"Where do you see your banking career in 5 years?", type:"HR"},
  ],

  "UI/UX Designer": [
    {q:"Walk me through your design process from research to final handoff.", type:"Technical"},
    {q:"Explain the difference between UX and UI. Why does both matter?", type:"Technical"},
    {q:"How do you conduct user research when you have limited time and budget?", type:"Situational"},
    {q:"Describe a project in your portfolio that you're most proud of and why.", type:"Behavioral"},
    {q:"What is a design system and why is it important?", type:"Technical"},
    {q:"A developer says your design is impossible to implement. How do you handle this?", type:"Situational"},
    {q:"What is the difference between wireframes, mockups, and prototypes?", type:"Technical"},
    {q:"How do you approach designing for accessibility (WCAG standards)?", type:"Technical"},
    {q:"Tell me about a time user testing changed your design significantly.", type:"Behavioral"},
    {q:"What is Gestalt theory and how do you apply it in your designs?", type:"Technical"},
    {q:"How do you handle feedback from multiple stakeholders who disagree?", type:"Situational"},
    {q:"Explain the concept of information architecture.", type:"Technical"},
    {q:"What tools do you use for prototyping and why do you prefer them?", type:"Technical"},
    {q:"How do you design for mobile-first experiences?", type:"Technical"},
    {q:"Describe a design failure you experienced and what you learned from it.", type:"Behavioral"},
    {q:"What is a heuristic evaluation and how have you used one?", type:"Technical"},
    {q:"How do you measure the success of a design?", type:"Technical"},
    {q:"Explain the difference between qualitative and quantitative user research.", type:"Technical"},
    {q:"What is the double diamond design process?", type:"Technical"},
    {q:"A client insists on a design you believe will harm the user experience. What do you do?", type:"Situational"},
    {q:"How do you stay current with UI/UX trends without chasing fads?", type:"HR"},
    {q:"Explain the concept of affordance in design with an example.", type:"Technical"},
    {q:"How do you approach dark mode design?", type:"Technical"},
    {q:"Describe your experience with component-based design in Figma.", type:"Technical"},
    {q:"What is a user persona and how do you create one?", type:"Technical"},
    {q:"How do you design onboarding experiences for new users?", type:"Situational"},
    {q:"Explain the fold in web design. Is it still relevant?", type:"Technical"},
    {q:"What is the Fitts' Law and how does it influence your button placement decisions?", type:"Technical"},
    {q:"How do you handle a tight deadline that compromises design quality?", type:"Situational"},
    {q:"Tell me about a time you had to simplify a complex user flow.", type:"Behavioral"},
    {q:"What is progressive disclosure in UX?", type:"Technical"},
    {q:"How do you approach designing for low-literacy or elderly users?", type:"Situational"},
    {q:"Describe your handoff process with developers. How do you reduce friction?", type:"Technical"},
    {q:"What is a user journey map and how do you create one?", type:"Technical"},
    {q:"How do you use data analytics to inform design decisions?", type:"Technical"},
    {q:"What is A/B testing in the context of UX and when should you use it?", type:"Technical"},
    {q:"How do you approach designing for different cultural contexts?", type:"Situational"},
    {q:"What is the role of micro-interactions in UX?", type:"Technical"},
    {q:"Describe the concept of cognitive load and how you reduce it in your designs.", type:"Technical"},
    {q:"Tell me about a time you advocated for the user against business pressure.", type:"Behavioral"},
    {q:"How do you approach typography selection for a product?", type:"Technical"},
    {q:"What is emotional design and how do you incorporate it?", type:"Technical"},
    {q:"How do you manage version control of design files in a team?", type:"Technical"},
    {q:"What are design tokens and how do they help in large projects?", type:"Technical"},
    {q:"Describe a time you collaborated effectively with product managers.", type:"Behavioral"},
    {q:"How do you approach error states in UI design?", type:"Technical"},
    {q:"Why do you want to work as a UI/UX designer at this company specifically?", type:"HR"},
    {q:"What is skeleton loading and why is it used?", type:"Technical"},
    {q:"How do you evaluate whether a design is truly accessible?", type:"Technical"},
    {q:"Where do you see UI/UX design heading in the next 3-5 years?", type:"HR"},
  ],

  "Software Engineer": [
    {q:"Explain the difference between object-oriented and functional programming with examples.", type:"Technical"},
    {q:"What is Big O notation? Give examples of O(1), O(n), O(n²), and O(log n).", type:"Technical"},
    {q:"How does garbage collection work in your primary programming language?", type:"Technical"},
    {q:"Walk me through how you would design a URL shortener system.", type:"Technical"},
    {q:"What is the difference between SQL and NoSQL databases? When would you choose each?", type:"Technical"},
    {q:"Describe a particularly challenging bug you debugged and how you resolved it.", type:"Behavioral"},
    {q:"What is a REST API? What makes an API truly RESTful?", type:"Technical"},
    {q:"Explain the CAP theorem in distributed systems.", type:"Technical"},
    {q:"How do you approach code reviews? What makes a good code review?", type:"Behavioral"},
    {q:"What is the difference between concurrency and parallelism?", type:"Technical"},
    {q:"Explain SOLID principles with a real example from your work.", type:"Technical"},
    {q:"How do you ensure your code is testable? Describe your testing strategy.", type:"Technical"},
    {q:"What is a deadlock and how do you prevent it?", type:"Technical"},
    {q:"Explain the concept of microservices vs monolith architecture.", type:"Technical"},
    {q:"Tell me about a time a production deployment went wrong. What happened and how did you recover?", type:"Behavioral"},
    {q:"What is Docker and how have you used containerization in your projects?", type:"Technical"},
    {q:"Explain JWT and how it's used for authentication.", type:"Technical"},
    {q:"How would you design a database schema for an e-commerce platform?", type:"Technical"},
    {q:"What is CI/CD and how does it improve software delivery?", type:"Technical"},
    {q:"How do you handle technical debt in a fast-moving team?", type:"Situational"},
    {q:"Explain the difference between stack and heap memory.", type:"Technical"},
    {q:"How do you approach performance optimization in a slow API endpoint?", type:"Situational"},
    {q:"What is event-driven architecture? Give an example.", type:"Technical"},
    {q:"Describe how you would implement rate limiting on an API.", type:"Technical"},
    {q:"Tell me about a project you're most proud of and what made it technically challenging.", type:"Behavioral"},
    {q:"What is the difference between optimistic and pessimistic locking in databases?", type:"Technical"},
    {q:"How do you approach writing documentation for your code?", type:"Behavioral"},
    {q:"What is a message queue (e.g., RabbitMQ, Kafka) and when would you use one?", type:"Technical"},
    {q:"Explain the difference between authentication and authorization.", type:"Technical"},
    {q:"How do you handle conflicting priorities between two urgent tasks from different managers?", type:"Situational"},
    {q:"What is index optimization in SQL and how does it improve performance?", type:"Technical"},
    {q:"Describe your Git workflow (branching strategy, PRs, merging).", type:"Technical"},
    {q:"What are WebSockets and when are they preferable over HTTP?", type:"Technical"},
    {q:"How do you design a system to handle 1 million concurrent users?", type:"Technical"},
    {q:"Explain the difference between a process and a thread.", type:"Technical"},
    {q:"Tell me about a time you disagreed with a technical decision. How did you handle it?", type:"Behavioral"},
    {q:"What is eventual consistency in distributed systems?", type:"Technical"},
    {q:"How do you approach security in web application development?", type:"Technical"},
    {q:"What is a design pattern? Name three patterns you use regularly.", type:"Technical"},
    {q:"How do you keep up with rapidly changing technologies and frameworks?", type:"HR"},
    {q:"Explain the concept of lazy loading and when to use it.", type:"Technical"},
    {q:"How do you prioritize features when working in an Agile team?", type:"Situational"},
    {q:"What is caching? Describe a situation where poor caching caused a problem.", type:"Technical"},
    {q:"How do you onboard onto a new codebase you've never seen before?", type:"Behavioral"},
    {q:"Explain the difference between synchronous and asynchronous programming.", type:"Technical"},
    {q:"What is a foreign key and why is referential integrity important?", type:"Technical"},
    {q:"Describe a time you mentored a junior developer. What approach did you take?", type:"Behavioral"},
    {q:"What is GraphQL and how does it differ from REST?", type:"Technical"},
    {q:"How do you handle a situation where requirements keep changing mid-sprint?", type:"Situational"},
    {q:"Where do you want to be technically in 3 years?", type:"HR"},
  ],

  "Government / FPSC Officer": [
    {q:"What are the fundamental rights guaranteed under the Constitution of Pakistan 1973?", type:"Technical"},
    {q:"Explain the role and powers of the Election Commission of Pakistan.", type:"Technical"},
    {q:"What is the difference between the federal and provincial legislative assemblies in Pakistan?", type:"Technical"},
    {q:"Describe the CSS examination structure and why you want to appear in it.", type:"HR"},
    {q:"What is the 18th Amendment and how did it change the relationship between federal and provincial governments?", type:"Technical"},
    {q:"Tell me about a time you had to work within strict rules and procedures. How did you handle it?", type:"Behavioral"},
    {q:"What are the functions of the Federal Public Service Commission (FPSC)?", type:"Technical"},
    {q:"Explain Pakistan's foreign policy objectives with its neighboring countries.", type:"Technical"},
    {q:"What is the CPEC and what are its economic implications for Pakistan?", type:"Technical"},
    {q:"How would you handle a situation where a senior officer instructs you to do something unethical?", type:"Situational"},
    {q:"Describe the administrative structure of a district in Pakistan.", type:"Technical"},
    {q:"What is the role of NAB (National Accountability Bureau) in Pakistan?", type:"Technical"},
    {q:"Explain the concept of public interest and how it guides government decision-making.", type:"Technical"},
    {q:"What are the Millennium Development Goals and how has Pakistan performed on them?", type:"Technical"},
    {q:"A citizen comes to your office with a complaint that has been pending for 6 months. How do you handle it?", type:"Situational"},
    {q:"What is the significance of the Objectives Resolution of 1949?", type:"Technical"},
    {q:"How would you manage a team that is resistant to change and modernization?", type:"Situational"},
    {q:"Explain the relationship between Pakistan and the IMF in recent years.", type:"Technical"},
    {q:"What is devolution and why is it important for governance in Pakistan?", type:"Technical"},
    {q:"Tell me about a time you had to communicate difficult news to a group of people.", type:"Behavioral"},
    {q:"What are the key challenges facing Pakistan's education sector?", type:"Technical"},
    {q:"Explain the structure of Pakistan's judiciary from district courts to Supreme Court.", type:"Technical"},
    {q:"What is the difference between ordinance-making power and regular legislation?", type:"Technical"},
    {q:"How do you stay updated with Pakistan's current affairs and policy developments?", type:"HR"},
    {q:"What is SDG 2030 and which SDGs are most relevant to Pakistan?", type:"Technical"},
    {q:"Describe the role of the Planning Commission of Pakistan.", type:"Technical"},
    {q:"How would you improve the delivery of public services in a rural district?", type:"Situational"},
    {q:"What are the powers and responsibilities of a Deputy Commissioner (DC)?", type:"Technical"},
    {q:"Explain Pakistan's population challenges and policy responses.", type:"Technical"},
    {q:"A political figure pressures you to award a contract to their associate. What do you do?", type:"Situational"},
    {q:"What is the role of the State Bank of Pakistan in the national economy?", type:"Technical"},
    {q:"How would you design a public awareness campaign about a new government policy?", type:"Situational"},
    {q:"What are the key provisions of the Right to Information Act in Pakistan?", type:"Technical"},
    {q:"Explain the concept of civil service neutrality and why it matters.", type:"Technical"},
    {q:"Tell me about a leader in Pakistan's history you admire and why.", type:"HR"},
    {q:"What is Pakistan's energy crisis and what solutions are being pursued?", type:"Technical"},
    {q:"How does the National Finance Commission (NFC) Award work?", type:"Technical"},
    {q:"Describe a time when you had to manage a project with very limited resources.", type:"Behavioral"},
    {q:"What is Pakistan's position in the UN and what role does it play?", type:"Technical"},
    {q:"How would you handle corruption that you witness within your department?", type:"Situational"},
    {q:"What are the responsibilities of a federal secretary?", type:"Technical"},
    {q:"Explain the concept of e-governance and how Pakistan is adopting it.", type:"Technical"},
    {q:"How do you balance the needs of different communities when implementing a policy?", type:"Situational"},
    {q:"What are Pakistan's key agricultural challenges and government responses?", type:"Technical"},
    {q:"Describe your understanding of public policy formulation and implementation.", type:"Technical"},
    {q:"Tell me about yourself and why public service appeals to you.", type:"HR"},
    {q:"What is Article 25 of the Constitution and why is it significant?", type:"Technical"},
    {q:"How would you reduce bureaucratic red tape in your department?", type:"Situational"},
    {q:"What is the Police Order 2002 and its significance for law enforcement reform?", type:"Technical"},
    {q:"Where do you see yourself within the civil service in 10 years?", type:"HR"},
  ]
};

// ─── State ───
const API_KEY = "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";
let selectedJob = "", selectedCount = 0, questions = [], currentQ = 0;
let scores = [], feedbacks = [], questionTexts = [], waitingForNext = false;

// ─── Job / Count selection ───
function selectJob(el, job) {
  document.querySelectorAll('.job-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedJob = job;
  checkReady();
}
function selectCount(el, n) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedCount = n;
  document.getElementById('countTitle').textContent = `${n} questions · ~${n * 2}-${n * 4} minutes`;
  checkReady();
}
function checkReady() {
  document.getElementById('startBtn').disabled = !(selectedJob && selectedCount);
}

// ─── Randomize questions ───
function getRandomQuestions(role, count) {
  const pool = QUESTION_BANK[role] || [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ─── Start ───
async function startInterview() {
  showScreen('screen2');
  scores = []; feedbacks = []; questionTexts = []; currentQ = 0;
  document.getElementById('submitBtn').disabled = false;

  const picked = getRandomQuestions(selectedJob, selectedCount);
  questions = picked;
  showQuestion();
}

// ─── Show question ───
function showQuestion() {
  const q = questions[currentQ];
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('qTypeBadge').textContent = q.type;
  document.getElementById('answerInput').value = '';
  document.getElementById('charCount').textContent = '0 characters';
  document.getElementById('feedbackBox').style.display = 'none';
  document.getElementById('questionCounter').textContent = `Q ${currentQ + 1} of ${questions.length}`;
  document.getElementById('progressLabel').textContent = `Question ${currentQ + 1}`;
  const pct = Math.round(((currentQ + 1) / questions.length) * 100);
  document.getElementById('progressPct').textContent = `${pct}%`;
  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('submitBtn').textContent = 'Submit Answer';
  document.getElementById('submitBtn').disabled = false;
  waitingForNext = false;
}

function updateCharCount() {
  const len = document.getElementById('answerInput').value.length;
  document.getElementById('charCount').textContent = `${len} character${len !== 1 ? 's' : ''}`;
}

// ─── Submit / Next ───
async function submitAnswer() {
  if (waitingForNext) {
    if (currentQ < questions.length - 1) { currentQ++; showQuestion(); }
    else { await showReport(); }
    return;
  }
  const answer = document.getElementById('answerInput').value.trim();
  if (!answer) { alert("Please write your answer first!"); return; }

  questionTexts.push(questions[currentQ].q);
  document.getElementById('loadingDiv').style.display = 'block';
  document.getElementById('submitBtn').disabled = true;

  const prompt = `You are a strict but fair interviewer for the role of ${selectedJob} in Pakistan.
Question: "${questions[currentQ].q}"
Question Type: ${questions[currentQ].type}
Candidate's Answer: "${answer}"

Evaluate this answer and respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "score": 7,
  "feedback": "Concise 2-3 sentence evaluation of strengths and gaps in this specific answer.",
  "better_answer": "A model answer in 2-3 sentences that would score 9-10."
}`;

  const res = await callGroq(prompt);
  document.getElementById('loadingDiv').style.display = 'none';

  try {
    const clean = res.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);
    scores.push(data.score);
    feedbacks.push(data.feedback);

    document.getElementById('scoreBadge').textContent = `${data.score}/10`;
    document.getElementById('scoreBarFill').style.width = `${data.score * 10}%`;
    document.getElementById('feedbackText').textContent = data.feedback;
    document.getElementById('betterText').textContent = data.better_answer;
    document.getElementById('feedbackBox').style.display = 'block';

    waitingForNext = true;
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').textContent =
      currentQ < questions.length - 1 ? 'Next Question →' : 'See Final Report →';
  } catch {
    document.getElementById('feedbackText').textContent = "Evaluation failed. Please try again.";
    document.getElementById('feedbackBox').style.display = 'block';
    document.getElementById('submitBtn').disabled = false;
  }
}

// ─── Final Report ───
async function showReport() {
  showScreen('screen3');
  const total = scores.reduce((a,b) => a+b, 0);
  const max = questions.length * 10;
  const pct = Math.round((total / max) * 100);

  document.getElementById('finalScore').innerHTML = `${total}<span class="report-denom">/${max}</span>`;
  document.getElementById('finalLabel').textContent = `${pct}% · ${questions.length}-question ${selectedJob} interview`;

  let grade, gradeClass;
  if (pct >= 80)      { grade = "🏆 Excellent"; gradeClass = "grade-excellent"; }
  else if (pct >= 65) { grade = "✅ Good";      gradeClass = "grade-good"; }
  else if (pct >= 45) { grade = "⚠️ Average";   gradeClass = "grade-average"; }
  else                { grade = "❌ Needs Work"; gradeClass = "grade-poor"; }

  const badge = document.getElementById('gradeBadge');
  badge.textContent = grade;
  badge.className = `grade-badge ${gradeClass}`;
  document.getElementById('scoreTags').innerHTML =
    `<span class="tag">${selectedJob}</span><span class="tag">${questions.length} Questions</span><span class="tag">${pct}%</span>`;

  // Per-question breakdown
  const grid = document.getElementById('perQuestionGrid');
  grid.innerHTML = '';
  scores.forEach((s, i) => {
    grid.innerHTML += `
      <div class="per-q-item">
        <div class="per-q-num">Q${i+1}</div>
        <div class="per-q-info">
          <div class="per-q-q">${questionTexts[i] || questions[i].q}</div>
          <div class="per-q-bar"><div class="per-q-fill" style="width:${s*10}%"></div></div>
        </div>
        <div class="per-q-score">${s}/10</div>
      </div>`;
  });

  // AI final report
  const prompt = `A candidate completed a ${selectedJob} mock interview in Pakistan.
Scores: ${scores.join(', ')} out of 10 for ${questions.length} questions. Total: ${total}/${max} (${pct}%).
Feedback received per question: ${feedbacks.join(' | ')}

Write a final performance report in this EXACT JSON format (no extra text, no markdown):
{
  "strengths": "2-3 specific sentences about what the candidate did well based on the feedback.",
  "weaknesses": "2-3 specific sentences about areas that clearly need improvement.",
  "tips": "Three numbered, actionable tips the candidate should do before their real interview."
}`;

  const res = await callGroq(prompt);
  try {
    const clean = res.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);
    document.getElementById('strengthsText').textContent = data.strengths;
    document.getElementById('weaknessText').textContent = data.weaknesses;
    document.getElementById('tipsText').textContent = data.tips;
  } catch {
    document.getElementById('strengthsText').textContent = "Good effort shown throughout the interview.";
    document.getElementById('weaknessText').textContent = "More depth and specific examples needed in technical answers.";
    document.getElementById('tipsText').textContent = "1. Practice with mock sessions daily. 2. Review role-specific topics. 3. Use STAR method for behavioral questions.";
  }
}

// ─── API call ───
async function callGroq(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Utility ───
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function restart() {
  scores=[]; feedbacks=[]; questions=[]; questionTexts=[]; currentQ=0; selectedJob=""; selectedCount=0;
  document.querySelectorAll('.job-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  document.getElementById('startBtn').disabled = true;
  document.getElementById('countTitle').textContent = 'Choose session length';
  showScreen('screen1');
}
function sameRole() {
  scores=[]; feedbacks=[]; questions=[]; questionTexts=[]; currentQ=0;
  startInterview();
}
</script>
</body>
</html>
  </script>
