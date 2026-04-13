<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Central London Police Department</title>
  <link rel="icon" href="/CLPD.png?v=24" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    :root{
      --bg: #08101e;
      --panel: rgba(11, 19, 34, 0.72);
      --panel-strong: rgba(10, 17, 30, 0.86);
      --panel-soft: rgba(255,255,255,0.06);
      --border: rgba(255,255,255,0.09);
      --text: #eef4ff;
      --muted: rgba(222, 231, 255, 0.78);
      --soft: rgba(222, 231, 255, 0.58);
      --accent: #78a6ff;
      --accent-2: #4e7fff;
      --shadow: 0 20px 60px rgba(0,0,0,0.45);
      --radius: 18px;
    }

    *{
      box-sizing:border-box;
      margin:0;
      padding:0;
    }

    html, body{
      height:100%;
    }

    body{
      font-family:'Inter', sans-serif;
      color:var(--text);
      background:var(--bg);
      overflow:hidden;
    }

    .bg{
      position:fixed;
      inset:0;
      background:
        radial-gradient(circle at 20% 20%, rgba(91,132,255,0.18), transparent 25%),
        radial-gradient(circle at 80% 30%, rgba(88,167,255,0.12), transparent 28%),
        radial-gradient(circle at 50% 80%, rgba(34,91,201,0.16), transparent 30%),
        url("Soothing Black And White GIF by Pi-Slices.gif") center center / cover no-repeat;
      filter: blur(18px) saturate(1.1);
      transform: scale(1.08);
      z-index:0;
    }

    .overlay{
      position:fixed;
      inset:0;
      background:
        linear-gradient(180deg, rgba(6,11,22,0.34), rgba(6,11,22,0.74)),
        linear-gradient(135deg, rgba(17,34,77,0.18), rgba(8,16,30,0.4));
      z-index:1;
    }

    .auth-shell{
      position:fixed;
      inset:0;
      z-index:10;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px;
      transition:opacity .45s ease, visibility .45s ease, transform .45s ease;
    }

    body.logged-in .auth-shell{
      opacity:0;
      visibility:hidden;
      pointer-events:none;
      transform:scale(1.02);
    }

    .auth-card{
      width:min(460px, 92vw);
      background:rgba(10,17,30,0.62);
      border:1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(18px);
      border-radius:24px;
      box-shadow:var(--shadow);
      padding:28px;
      animation:authIn .55s ease;
    }

    @keyframes authIn{
      from{opacity:0; transform:translateY(16px) scale(.985);}
      to{opacity:1; transform:translateY(0) scale(1);}
    }

    .brand-row{
      display:flex;
      align-items:center;
      gap:14px;
      margin-bottom:18px;
    }

    .brand-row img{
      width:54px;
      height:54px;
      border-radius:14px;
      object-fit:cover;
      box-shadow:0 10px 24px rgba(0,0,0,0.28);
      background:#0d1525;
    }

    .eyebrow{
      font-size:12px;
      letter-spacing:.22em;
      text-transform:uppercase;
      color:var(--soft);
      margin-bottom:6px;
      font-weight:700;
    }

    .auth-title{
      font-size:28px;
      line-height:1.06;
      letter-spacing:-0.03em;
      font-weight:800;
    }

    .auth-sub{
      margin-top:14px;
      color:var(--muted);
      line-height:1.65;
      font-size:14px;
    }

    .auth-form{
      margin-top:22px;
      display:flex;
      flex-direction:column;
      gap:12px;
    }

    .input{
      width:100%;
      border:1px solid rgba(255,255,255,0.09);
      background:rgba(255,255,255,0.06);
      color:var(--text);
      border-radius:14px;
      padding:14px 15px;
      font-size:14px;
      outline:none;
      transition:border-color .18s ease, background .18s ease, transform .18s ease;
    }

    .input:focus{
      border-color:rgba(120,166,255,0.65);
      background:rgba(255,255,255,0.08);
      transform:translateY(-1px);
    }

    .btn{
      border:none;
      border-radius:14px;
      padding:14px 16px;
      font-size:14px;
      font-weight:700;
      color:white;
      cursor:pointer;
      background:linear-gradient(135deg, var(--accent-2), var(--accent));
      box-shadow:0 14px 34px rgba(78,127,255,0.32);
      transition:transform .18s ease, box-shadow .18s ease, filter .18s ease;
    }

    .btn:hover{
      transform:translateY(-2px);
      box-shadow:0 18px 40px rgba(78,127,255,0.42);
      filter:brightness(1.02);
    }

    .btn:disabled{
      opacity:.72;
      cursor:not-allowed;
      transform:none;
      box-shadow:none;
    }

    .auth-status{
      min-height:24px;
      margin-top:8px;
      font-size:13px;
      color:var(--muted);
    }

    .app{
      position:relative;
      z-index:3;
      height:100%;
      display:none;
      opacity:0;
      transition:opacity .45s ease;
    }

    body.logged-in .app{
      display:flex;
      opacity:1;
    }

    .sidebar{
      width:280px;
      height:100%;
      padding:22px 18px;
      background:rgba(9,15,27,0.76);
      border-right:1px solid var(--border);
      backdrop-filter: blur(16px);
      overflow:auto;
    }

    .sidebar-top{
      display:flex;
      align-items:center;
      gap:12px;
      padding:8px 10px 18px;
      margin-bottom:8px;
      border-bottom:1px solid rgba(255,255,255,0.08);
    }

    .sidebar-top img{
      width:42px;
      height:42px;
      border-radius:12px;
      object-fit:cover;
      background:#0d1525;
    }

    .sidebar-label{
      font-size:12px;
      letter-spacing:.24em;
      color:var(--soft);
      text-transform:uppercase;
      font-weight:800;
      margin:14px 10px 10px;
    }

    .nav{
      display:flex;
      flex-direction:column;
      gap:6px;
    }

    .nav-btn{
      width:100%;
      text-align:left;
      background:transparent;
      border:1px solid transparent;
      color:var(--muted);
      padding:12px 12px;
      border-radius:14px;
      cursor:pointer;
      font-weight:600;
      font-size:14px;
      transition:background .18s ease, border-color .18s ease, color .18s ease, transform .18s ease;
    }

    .nav-btn:hover{
      background:rgba(255,255,255,0.06);
      border-color:rgba(255,255,255,0.06);
      color:#fff;
      transform:translateX(3px);
    }

    .nav-btn.active{
      background:linear-gradient(135deg, rgba(78,127,255,0.24), rgba(120,166,255,0.14));
      border-color:rgba(120,166,255,0.22);
      color:#fff;
      box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    }

    .user-card{
      margin:18px 10px 0;
      padding:14px;
      border-radius:16px;
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.07);
    }

    .user-card .mini{
      font-size:11px;
      letter-spacing:.18em;
      text-transform:uppercase;
      color:var(--soft);
      margin-bottom:8px;
      font-weight:800;
    }

    .user-name{
      font-size:15px;
      font-weight:700;
      margin-bottom:6px;
      color:#fff;
    }

    .user-rank{
      font-size:13px;
      color:var(--muted);
      line-height:1.55;
    }

    .main{
      flex:1;
      min-width:0;
      display:flex;
      flex-direction:column;
      height:100%;
    }

    .topbar{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      padding:20px 24px;
      background:rgba(8,14,24,0.34);
      border-bottom:1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(10px);
    }

    .topbar h1{
      font-size:20px;
      letter-spacing:-0.03em;
      font-weight:800;
    }

    .topbar p{
      font-size:13px;
      color:var(--muted);
      margin-top:4px;
    }

    .rank-pill{
      padding:10px 14px;
      border-radius:999px;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.09);
      color:#fff;
      font-size:13px;
      font-weight:700;
      white-space:nowrap;
    }

    .content{
      flex:1;
      overflow:auto;
      padding:24px;
    }

    .page{
      display:none;
      animation:pageIn .35s ease;
    }

    .page.active{
      display:block;
    }

    @keyframes pageIn{
      from{opacity:0; transform:translateY(8px);}
      to{opacity:1; transform:translateY(0);}
    }

    .hero{
      padding:24px;
      background:linear-gradient(135deg, rgba(78,127,255,0.16), rgba(255,255,255,0.03));
      border:1px solid rgba(120,166,255,0.14);
      border-radius:24px;
      box-shadow:var(--shadow);
      margin-bottom:22px;
    }

    .hero h2{
      font-size:34px;
      line-height:1.02;
      letter-spacing:-0.04em;
      font-weight:800;
      margin-bottom:12px;
      max-width:900px;
    }

    .hero p{
      max-width:980px;
      line-height:1.78;
      color:var(--muted);
      font-size:15px;
    }

    .grid{
      display:grid;
      grid-template-columns:repeat(12, 1fr);
      gap:18px;
    }

    .card{
      grid-column:span 12;
      background:var(--panel);
      border:1px solid var(--border);
      border-radius:22px;
      padding:22px;
      backdrop-filter: blur(12px);
      box-shadow:var(--shadow);
      transition:transform .18s ease, background .18s ease;
    }

    .card:hover{
      transform:translateY(-2px);
      background:rgba(11, 19, 34, 0.78);
    }

    .card.half{
      grid-column:span 6;
    }

    .card.third{
      grid-column:span 4;
    }

    .section-eyebrow{
      font-size:12px;
      letter-spacing:.22em;
      text-transform:uppercase;
      color:var(--soft);
      margin-bottom:10px;
      font-weight:800;
    }

    .card h3{
      font-size:22px;
      letter-spacing:-0.03em;
      font-weight:800;
      margin-bottom:12px;
    }

    .card p{
      color:var(--muted);
      line-height:1.82;
      font-size:14px;
      margin-bottom:14px;
    }

    .card p:last-child{
      margin-bottom:0;
    }

    .rule-list,
    .simple-list{
      display:grid;
      gap:12px;
      margin-top:6px;
    }

    .rule-item,
    .simple-item{
      padding:14px 14px;
      border-radius:16px;
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.05);
    }

    .rule-item strong,
    .simple-item strong{
      display:block;
      color:#fff;
      margin-bottom:6px;
      font-size:14px;
    }

    .rule-item span,
    .simple-item span{
      color:var(--muted);
      font-size:14px;
      line-height:1.72;
      display:block;
    }

    .chain-flow{
      display:grid;
      gap:10px;
      margin-top:14px;
    }

    .flow-node{
      padding:14px 16px;
      border-radius:16px;
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.05);
      color:#fff;
      font-weight:700;
    }

    .doc-link{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:12px 16px;
      border-radius:14px;
      text-decoration:none;
      color:white;
      background:linear-gradient(135deg, var(--accent-2), var(--accent));
      font-weight:700;
      box-shadow:0 14px 34px rgba(78,127,255,0.3);
    }

    .muted-note{
      color:var(--soft);
      font-size:13px;
      line-height:1.7;
      margin-top:12px;
    }

    .copy-box{
      margin-top:14px;
      width:100%;
      min-height:320px;
      resize:vertical;
      border:1px solid rgba(255,255,255,0.09);
      background:rgba(255,255,255,0.05);
      color:var(--text);
      border-radius:16px;
      padding:16px;
      font-size:14px;
      line-height:1.7;
      outline:none;
      font-family:inherit;
    }

    .copy-actions{
      display:flex;
      gap:12px;
      flex-wrap:wrap;
      margin-top:14px;
    }

    .copy-btn{
      border:none;
      border-radius:14px;
      padding:12px 16px;
      font-size:14px;
      font-weight:700;
      color:white;
      cursor:pointer;
      background:linear-gradient(135deg, var(--accent-2), var(--accent));
      box-shadow:0 14px 34px rgba(78,127,255,0.3);
    }

    .copy-status{
      display:flex;
      align-items:center;
      color:var(--muted);
      font-size:13px;
    }

    @media (max-width: 1100px){
      .card.half, .card.third{
        grid-column:span 12;
      }
    }

    @media (max-width: 900px){
      .sidebar{
        width:240px;
      }
      .content{
        padding:18px;
      }
      .topbar{
        padding:18px;
      }
      .hero h2{
        font-size:28px;
      }
    }

    @media (max-width: 760px){
      body{
        overflow:auto;
      }
      .app{
        flex-direction:column;
        height:auto;
        min-height:100%;
      }
      .sidebar{
        width:100%;
        height:auto;
        border-right:none;
        border-bottom:1px solid var(--border);
      }
      .main{
        min-height:0;
      }
      .rank-pill{
        white-space:normal;
      }
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="overlay"></div>

  <section class="auth-shell" id="authShell">
    <div class="auth-card">
      <div class="brand-row">
        <img src="CLPD.png" alt="CLPD logo">
        <div>
          <div class="eyebrow">Central London Police Department</div>
          <div class="auth-title">Secure Personnel Access</div>
        </div>
      </div>

      <p class="auth-sub">
        Authenticate with your Roblox username to verify group membership in Central London Police Department and load the department information system. Access is granted only to verified members of group 342605681.
      </p>

      <div class="auth-form">
        <input id="usernameInput" class="input" type="text" placeholder="Enter Roblox username" autocomplete="off" />
        <button id="authBtn" class="btn" type="button">Authenticate</button>
      </div>

      <div id="authStatus" class="auth-status"></div>
    </div>
  </section>

  <div class="app" id="app">
    <aside class="sidebar">
      <div class="sidebar-top">
        <img src="CLPD.png" alt="CLPD logo">
        <div>
          <div class="eyebrow" style="margin-bottom:4px;">Central London Police Department</div>
          <div style="font-weight:800; font-size:15px;">Information System</div>
        </div>
      </div>

      <div class="sidebar-label">Pages</div>
      <nav class="nav" id="nav">
        <button class="nav-btn active" data-page="home">🏠 Home</button>
        <button class="nav-btn" data-page="rules">📜 Rules & Conduct</button>
        <button class="nav-btn" data-page="punishments">⚖️ Punishment Guide</button>
        <button class="nav-btn" data-page="chain">🧭 Chain of Command</button>
        <button class="nav-btn" data-page="rowifi">🪪 RoWifi Nickname Bypass</button>
        <button class="nav-btn" data-page="ranks">📊 Rank Structure</button>
        <button class="nav-btn" data-page="leadership">👑 Leadership</button>
        <button class="nav-btn" data-page="documents">📄 Documents</button>
        <button class="nav-btn" data-page="group">🛡️ Roblox Group</button>
        <button class="nav-btn" data-page="recruitment">📣 Recruitment</button>
      </nav>

      <div class="user-card">
        <div class="mini">Authenticated user</div>
        <div id="userName" class="user-name">Not authenticated</div>
        <div id="userRank" class="user-rank">No rank loaded.</div>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div>
          <h1 id="topbarTitle">Central London Police Department</h1>
          <p id="topbarSub">Official public information and personnel reference system.</p>
        </div>
        <div class="rank-pill" id="rankPill">Awaiting authentication</div>
      </header>

      <div class="content">
        <section class="page active" id="page-home">
          <div class="hero">
            <h2>Central London Police Department, the game that renovates and influences.</h2>
            <p>
              Welcome to the official Central London Police Department information system. This website is structured as a public-facing departmental portal and internal reference point for members who require a clear understanding of expectations, authority, policy, departmental culture, and formal procedure. Its purpose is not simply to display a few basic rules, but to communicate the standards that define the department as a disciplined, organized, and professional law enforcement environment.
            </p>
            <p style="margin-top:12px;">
              Every section of this system exists to reinforce consistency. Whether a member is reviewing conduct expectations, checking the proper chain of command, confirming rank structure, reading the RoWifi Nickname Bypass policy, or opening official documents, the goal is the same: preserve structure, reduce confusion, and ensure that all members understand how they are expected to behave and where they fit within the wider department.
            </p>
          </div>

          <div class="grid">
            <article class="card half">
              <div class="section-eyebrow">Mission</div>
              <h3>Purpose of the department</h3>
              <p>
                The Central London Police Department is intended to provide a realistic, disciplined, and immersive policing environment built around clear standards of conduct, proper rank authority, and professional internal culture. A department only remains effective when its members understand that realism is supported not just by uniforms, vehicles, and rank tags, but by behavior, communication, and respect for procedure.
              </p>
              <p>
                That is why this portal emphasizes written doctrine. Members are expected to know where to escalate issues, how nickname permissions work, what punishments mean, who leadership is, what the rank order looks like, and why joining the official Roblox group is mandatory for proper ranking. The department’s effectiveness depends on members knowing these details before problems arise, not after.
              </p>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Department standard</div>
              <h3>What is expected from every member</h3>
              <p>
                All members are expected to maintain a standard of professionalism that reflects positively on the department in game and across associated community spaces. A professional standard means members communicate responsibly, respect rank authority, avoid disruptive conduct, and understand that their actions affect both operational efficiency and the reputation of CLPD as a whole.
              </p>
              <p>
                This system should be read as the baseline reference for public standards and personnel expectations. Members who choose to remain within the department are expected to read, understand, and comply with the material presented here. Ignoring a rule because it was not memorized does not remove accountability for breaking it.
              </p>
            </article>

            <article class="card third">
              <div class="section-eyebrow">Leadership at a glance</div>
              <h3>Ownership and command</h3>
              <div class="simple-list">
                <div class="simple-item">
                  <strong>Owners</strong>
                  <span>Mrbluey4321jr and officerTMD</span>
                </div>
                <div class="simple-item">
                  <strong>Co-Owner</strong>
                  <span>Survixzq</span>
                </div>
              </div>
            </article>

            <article class="card third">
              <div class="section-eyebrow">Mandatory requirement</div>
              <h3>Official group membership</h3>
              <p>
                All members are required to join the official Roblox group in order to be ranked accordingly. Group membership is not optional for members who wish to be recognized and ranked properly within the department structure.
              </p>
            </article>

            <article class="card third">
              <div class="section-eyebrow">Official documents</div>
              <h3>Reference access</h3>
              <a class="doc-link" href="https://docs.google.com/spreadsheets/d/1hY6VEKeaHbmu88QLKhgNcOxh3yKyZ7gsnr-hz3onJEw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                Open CLPD Documents
              </a>
              <div class="muted-note">
                This link opens the department spreadsheet you provided for official reference material.
              </div>
            </article>
          </div>
        </section>

        <section class="page" id="page-rules">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Rules & Conduct</div>
              <h3>Department conduct doctrine</h3>
              <p>
                The Central London Police Department requires every member to maintain a professional, controlled, and respectful presence at all times. Rules exist not merely as punishments waiting to be applied, but as safeguards that preserve order, fairness, and realism. When members ignore simple conduct standards, the result is not only personal misconduct but broader instability across events, patrols, command communication, and public perception of the department.
              </p>
              <p>
                Members are therefore expected to read these rules as operating standards. Professionalism is not limited to moments where leadership is watching. It applies during public interaction, roleplay, announcements, ordinary conversations, events, and conflict. Members who behave as though standards only matter during formal occasions undermine the structure of the entire department.
              </p>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Primary expectations</div>
              <h3>Core rules</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>No swearing.</strong>
                  <span>
                    Language must remain controlled and appropriate. Profanity, aggressive language, and attempts to normalize careless speech lower the professional standard of the department. Members are expected to communicate in a way that reflects discipline rather than impulsiveness.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>No racism.</strong>
                  <span>
                    Any racist conduct, including slurs, discriminatory remarks, coded language, or behavior clearly intended to target race or ethnicity, is unacceptable. This type of behavior directly conflicts with the department’s standards and may result in serious corrective action, including suspension or discharge from a division.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>No hacking.</strong>
                  <span>
                    Exploiting, cheating, or using unfair advantages destroys the legitimacy of the roleplay environment and is treated as a severe breach of trust. If a member is caught hacking in game, they may be kicked, striked, and potentially banned depending on the severity of the offense.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>No breaking Roblox or Discord Terms of Service.</strong>
                  <span>
                    The department does not operate outside platform standards. Members are responsible for following the rules of the platforms on which CLPD exists. Violations may result in warnings, kicks, or bans depending on the nature of the breach and the risk it creates for the community.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Be respectful to others.</strong>
                  <span>
                    Members are expected to remain respectful even when another person is not. This is one of the clearest tests of professionalism. The inability to stay controlled under pressure shows poor discipline and can justify corrective action when it disrupts order or escalates conflict.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Application of the rules</div>
              <h3>How these standards are enforced</h3>
              <p>
                These rules are enforced through leadership judgment, evidence, context, and a member’s disciplinary history. Not every issue carries the same weight. A careless message in an announcement channel is not judged in the same way as racism, exploiting, or a clear Terms of Service violation. However, repeated low-level issues can still indicate unreliability and a refusal to correct behavior when instructed.
              </p>
              <p>
                Members should also understand that common sense applies even where a rule is short. “Be respectful” is not vague simply because it is concise; it is broad because it applies across rank interactions, disagreements, events, public behavior, and conflict resolution. Members are expected to understand the spirit of the rule rather than search for loopholes in its wording.
              </p>
              <p>
                Conduct that repeatedly damages the department’s atmosphere, disrespects command authority, or causes disorder may still be punished even where a member tries to argue technicalities. The goal of the rules is order and professionalism, not loophole abuse.
              </p>
            </article>
          </div>
        </section>

        <section class="page" id="page-punishments">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Punishment Guide</div>
              <h3>Corrective action framework</h3>
              <p>
                The punishment system exists to correct behavior, protect department standards, and remove patterns of misconduct before they become normalized. Punishments are not meant to be randomly assigned. They are intended to match severity, repetition, intent, and impact. Members are expected to understand that repeated disregard for instruction often escalates punishment more quickly than a single isolated mistake.
              </p>
            </article>

            <article class="card half">
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Warn.</strong>
                  <span>
                    A warning is generally used for lower-level misconduct, such as doing something inappropriate in game, speaking carelessly, or saying things in announcements that do not need to be said. A warning is corrective, not trivial. It is the department clearly informing a member that their behavior has crossed the acceptable line and must be fixed.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Discipline (Strike).</strong>
                  <span>
                    A strike is used for more serious or repeated issues, including being unprofessional, interrupting events, or acting disrespectfully. A strike reflects a breakdown in discipline that leadership believes has moved beyond a simple reminder.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Kick.</strong>
                  <span>
                    A kick is generally used after rules continue to be broken despite earlier correction, especially where multiple warnings have already been given. It removes the member from the situation and signals that continuing misconduct is no longer being tolerated in the moment.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Ban.</strong>
                  <span>
                    A ban is reserved for the most severe outcomes, including serious Terms of Service violations or behavior so disruptive and damaging that removal is considered necessary. A ban may also be justified where a member demonstrates no intent to reform and continues to act against the department’s interests.
                  </span>
                </div>
              </div>
            </article>

            <article class="card">
              <div class="section-eyebrow">Discretion & standards</div>
              <h3>How staff should think about punishments</h3>
              <p>
                Corrective action should remain consistent, proportionate, and documented where applicable. Staff should not treat punishment as a personal tool or emotional reaction. It should be applied in a way that protects department order and reflects fairness. Members who are corrected should understand what they did wrong, why it mattered, and what is expected going forward.
              </p>
              <p>
                The strongest departments do not merely punish; they establish a culture where members understand how to avoid punishment in the first place. That is why this guide should be read alongside the rules and chain of command rather than as an isolated list of consequences.
              </p>
            </article>
          </div>
        </section>

        <section class="page" id="page-chain">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Chain of Command</div>
              <h3>Escalation, authority, and order</h3>
              <p>
                The chain of command exists to preserve structure. It is not simply a list of titles. It defines where concerns should be raised, who should handle them, and how members are expected to move an issue upward when necessary. A department without a respected chain of command quickly becomes disorganized, as members begin bypassing the people directly responsible for resolving their problems.
              </p>
              <p>
                Members are expected to use the lowest appropriate level first. Escalation should happen because it is necessary, not because a member prefers going straight to a more senior person. Skipping the correct chain without reason disrupts authority, weakens internal order, and creates avoidable confusion.
              </p>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Official flow</div>
              <h3>CLPD chain of command</h3>
              <div class="chain-flow">
                <div class="flow-node">PO-COM goes to SUPT / C/SUPT</div>
                <div class="flow-node">C/SUPT / SUPT goes to D/INS</div>
                <div class="flow-node">D/INS goes to INS</div>
                <div class="flow-node">INS goes to DC</div>
                <div class="flow-node">DC goes to AC</div>
                <div class="flow-node">AC goes to CH</div>
                <div class="flow-node">CH goes to Owner’s Assistant</div>
                <div class="flow-node">Owner’s Assistant goes to Ownership Team</div>
                <div class="flow-node">Ownership Team goes to Co Owner</div>
                <div class="flow-node">Co Owner goes to Me and Joey</div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Operational meaning</div>
              <h3>How members should use this system</h3>
              <p>
                This structure means members should address their issue with the proper supervisory level before moving upward. If a matter is routine, it should remain within the lower relevant level. If a matter concerns unresolved leadership conduct, larger structural decisions, or serious disciplinary questions, escalation through the proper route becomes appropriate.
              </p>
              <p>
                The chain of command is also a professionalism test. Members who constantly jump rank, attempt to bypass leadership for convenience, or try to weaponize higher authority against lower authority show poor judgment and weak discipline. Respecting the chain is not only about efficiency; it is about protecting legitimate command responsibility.
              </p>
            </article>
          </div>
        </section>

        <section class="page" id="page-rowifi">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">RoWifi Nickname Bypass</div>
              <h3>Nickname authority and presentation rules</h3>
              <p>
                The RoWifi Nickname Bypass policy exists so that nickname flexibility can be controlled without destroying standardization. Nicknames are part of how members are identified, recognized, and ranked within the department. If bypass permissions are handed out casually, the result is confusion, inconsistency, and a weaker professional identity across the community.
              </p>
              <p>
                That is why nickname bypass authority is restricted. It is not meant to be a casual privilege or a decorative perk. It is an exception to the normal naming structure and should be treated as such.
              </p>
            </article>

            <article class="card half">
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Permanent authority.</strong>
                  <span>
                    Only Chief Ranks and above may grant nickname bypass permanently. This preserves high-level control over a permission that affects department identity and how members present themselves publicly.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Temporary event use.</strong>
                  <span>
                    If nickname bypass is granted during an event or giveaway, it may not exceed fourteen days. This keeps temporary permissions temporary and prevents them from quietly becoming permanent without proper authority.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Required naming standard.</strong>
                  <span>
                    Members using nickname bypass must still include their rank or divisional rank in the name. The example provided was “THE co-owner survix.” The exact styling may vary, but the principle does not: rank identification must remain visible.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Symbol restrictions.</strong>
                  <span>
                    Usage of symbols such as !, &, $, %, ^, #, @ and similar characters is prohibited. Only Chief Ranks and above are allowed to use those symbols under the policy you provided. This keeps naming presentation controlled and avoids sloppy or attention-seeking nickname formatting.
                  </span>
                </div>
              </div>
            </article>

            <article class="card">
              <div class="section-eyebrow">Why this matters</div>
              <h3>Department identity and readability</h3>
              <p>
                Nickname policy is not a small cosmetic issue. It affects clarity, authority recognition, divisional identification, and public presentation. When rank labels disappear or naming formats become chaotic, members become harder to recognize, command relationships become less obvious, and the department looks less organized. Controlled nickname standards help preserve both professionalism and readability.
              </p>
            </article>
          </div>
        </section>

        <section class="page" id="page-ranks">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Rank Structure</div>
              <h3>Order of ranks and role expectations</h3>
              <p>
                The rank structure defines both authority and responsibility. It is not simply a list of labels. Each rank category exists to distribute command, supervision, activity, and decision-making across the department. Members should understand that higher rank does not only mean more authority; it also means more accountability, more scrutiny, and a greater obligation to set the tone for everyone beneath them.
              </p>
              <p>
                The rank order below is based on the structure you provided. The descriptions are written to give members a clearer understanding of how each layer generally functions within a Roblox police department setting and how those layers relate to discipline, leadership, patrol operations, administration, and ownership.
              </p>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Special status</div>
              <h3>Suspended and Veteran / Contributor</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Suspended (SUSP)</strong>
                  <span>
                    Suspended status indicates a member is not actively operating under normal authority while an issue, review, or temporary removal from regular duty is in effect. A suspended member is not meant to act as though their ordinary privileges remain unchanged.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Veteran / Contributor (VET/CON)</strong>
                  <span>
                    Veteran or Contributor status recognizes prior service, support, or notable contributions. It is a status marker rather than a normal patrol command rank and is generally used to reflect standing within the community rather than day-to-day chain authority.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Low ranks</div>
              <h3>PO, CON, CPL, SGT, LT</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Police Officer (PO)</strong>
                  <span>
                    Police Officers represent the basic operational backbone of the department. They are expected to follow orders, perform foundational patrol work, remain disciplined, and learn department standards through practice and supervision.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Constable (CON)</strong>
                  <span>
                    Constables continue frontline operational work while building experience, discipline, and reliability. They are expected to remain active, respond appropriately to instruction, and contribute positively to departmental order.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Corporal (CPL)</strong>
                  <span>
                    Corporals begin taking on greater responsibility through example, dependable activity, and closer alignment with supervisory expectations. They help stabilize the conduct and consistency of lower personnel.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Sergeant (SGT)</strong>
                  <span>
                    Sergeants are more visibly supervisory and are expected to help maintain discipline, support event control, and model proper conduct for lower ranks.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Lieutenant (LT)</strong>
                  <span>
                    Lieutenants sit at the upper end of the lower-rank layer and are generally expected to demonstrate maturity, controlled leadership, and readiness for more structured command responsibilities.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Middle ranks</div>
              <h3>CPT, MAJ, COL, CDR</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Captain (CPT)</strong>
                  <span>
                    Captains begin to shift from simple participation toward oversight. They are expected to support order, uphold standards, and help keep operational activity controlled and professional.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Major (MAJ)</strong>
                  <span>
                    Majors are expected to be trustworthy supervisory figures who can assist with discipline, event structure, and the management of lower personnel where needed.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Colonel (COL)</strong>
                  <span>
                    Colonels operate as more senior supervisory personnel who are expected to carry themselves with command presence and consistency. They help ensure that lower and middle structures remain stable.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Commander (CDR)</strong>
                  <span>
                    Commanders stand at the high end of the middle-rank layer and are expected to act with discipline, authority, and maturity, often bridging normal operations with higher command expectations.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">High ranks</div>
              <h3>D/COM, COM, SUPT, C/SUPT</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Deputy Commissioner (D/COM)</strong>
                  <span>
                    Deputy Commissioners are expected to help maintain structural stability at a high level, supervise departments or divisions as directed, and support senior command with policy enforcement.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Commissioner (COM)</strong>
                  <span>
                    Commissioners carry more senior authority and are expected to demonstrate excellent judgment, stability under pressure, and a strong understanding of departmental operations.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Superintendent (SUPT)</strong>
                  <span>
                    Superintendents serve as divisional high ranks and are directly relevant to the chain of command you provided. They are expected to supervise, resolve issues at their level, and function as proper escalation points for lower personnel.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Chief Superintendent (C/SUPT)</strong>
                  <span>
                    Chief Superintendents are senior divisional authorities expected to maintain order, resolve escalated issues, and preserve professional standards across the personnel they oversee.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Police Headquarters</div>
              <h3>D/INS, INS, D/ADV, ADV</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Deputy Inspector (D/INS)</strong>
                  <span>
                    Deputy Inspectors are part of the Headquarters structure and appear directly in the escalation path you gave. They are expected to handle serious matters passed upward from divisional command and maintain consistency in internal oversight.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Inspector (INS)</strong>
                  <span>
                    Inspectors hold senior Headquarters authority and are expected to make strong, measured decisions, particularly where structural issues, disciplinary concerns, or inter-rank disputes require higher attention.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Deputy Advisor (D/ADV)</strong>
                  <span>
                    Deputy Advisors support senior strategic and administrative functions. They are expected to act with maturity, discretion, and a firm understanding of department policy.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Advisor (ADV)</strong>
                  <span>
                    Advisors occupy a highly trusted Headquarters role associated with guidance, structure, and high-level support of the department’s direction and leadership process.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Chief ranks</div>
              <h3>DC, AC, CH</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Deputy Chief (DC)</strong>
                  <span>
                    Deputy Chiefs are senior command figures expected to handle major escalation, preserve standards, and exercise authority in a way that reflects full departmental discipline.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Assistant Chief (AC)</strong>
                  <span>
                    Assistant Chiefs operate as top-level command with significant responsibility for order, internal direction, and high-level decision-making. They are expected to set an example through both judgment and conduct.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Chief of Police (CH)</strong>
                  <span>
                    The Chief of Police represents one of the highest command authorities in the department and is expected to protect standards, enforce structure, and serve as a key link between internal command and ownership-level oversight.
                  </span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Community and ownership</div>
              <h3>ACL, CL, Management, Ownership Team, Owner, Holder</h3>
              <div class="rule-list">
                <div class="rule-item">
                  <strong>Assistant Community Lead (ACL) / Community Lead (CL)</strong>
                  <span>
                    These community-facing roles are expected to help maintain general order, support public-facing standards, and reinforce the wider culture surrounding the department.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Management</strong>
                  <span>
                    Management represents trusted senior community authority and internal support at a level above ordinary personnel, helping to preserve standards and structure.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Ownership Team</strong>
                  <span>
                    Ownership Team members operate at the highest organizational level and are responsible for major direction, protection of standards, and long-term departmental control.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Owner (OW)</strong>
                  <span>
                    Owners carry direct top-level authority over the department’s systems, standards, and internal direction. Based on the information you provided, the listed owners are Mrbluey4321jr and officerTMD.
                  </span>
                </div>
                <div class="rule-item">
                  <strong>Holder (HO)</strong>
                  <span>
                    The Holder rank reflects the group holding account, CLPDHolder, and represents formal control of the group entity itself.
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="page" id="page-leadership">
          <div class="grid">
            <article class="card half">
              <div class="section-eyebrow">Leadership</div>
              <h3>Ownership and executive authority</h3>
              <p>
                Leadership establishes tone, structure, and stability across the department. The higher the authority, the more important it becomes that decisions are made with consistency, discipline, and awareness of how those decisions affect every lower layer of the department.
              </p>
              <div class="simple-list">
                <div class="simple-item">
                  <strong>Owners</strong>
                  <span>Mrbluey4321jr</span>
                </div>
                <div class="simple-item">
                  <strong>Owners</strong>
                  <span>officerTMD</span>
                </div>
                <div class="simple-item">
                  <strong>Co-Owner</strong>
                  <span>Survixzq</span>
                </div>
              </div>
            </article>

            <article class="card half">
              <div class="section-eyebrow">Leadership expectation</div>
              <h3>What higher leadership is responsible for</h3>
              <p>
                Higher leadership is expected to protect the department’s standards, resolve matters that exceed normal supervisory levels, and ensure that the community operates with discipline rather than disorder. This includes preserving professional culture, making structural decisions, correcting instability, and ensuring that both public presentation and internal conduct remain aligned with the department’s stated standards.
              </p>
              <p>
                Strong leadership is measured not merely by power but by consistency, judgment, and the ability to keep standards intact even under pressure. Members in or near the top of the structure are expected to represent the department with maturity at all times.
              </p>
            </article>
          </div>
        </section>

        <section class="page" id="page-documents">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Documents</div>
              <h3>Official reference materials</h3>
              <p>
                Official documents are provided so members have a stable source of reference beyond chat messages or verbal explanation. Written documents reduce confusion, preserve consistency, and help prevent disputes over what the department actually requires or recognizes.
              </p>
              <p>
                The spreadsheet below is the document link you provided. Members who need department documentation should use that link as the primary official reference point.
              </p>
              <a class="doc-link" href="https://docs.google.com/spreadsheets/d/1hY6VEKeaHbmu88QLKhgNcOxh3yKyZ7gsnr-hz3onJEw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                Open HQ Documents
              </a>
            </article>
          </div>
        </section>

        <section class="page" id="page-group">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Roblox Group</div>
              <h3>Membership requirement and official group</h3>
              <p>
                As stated in the information you provided, members must join the official Roblox group in order to be ranked accordingly. Group membership is mandatory for proper rank assignment and recognition within the department structure. This is part of how identity, rank legitimacy, and membership status are kept clear.
              </p>
              <p>
                The official group linked in your material is the Central London Police Department group on Roblox.
              </p>
              <a class="doc-link" href="https://www.roblox.com/communities/342605681/Central-London-Police-Department#!/about" target="_blank" rel="noopener noreferrer">
                Open Roblox Group
              </a>
              <div class="muted-note">
                Group ID: 342605681
              </div>
            </article>
          </div>
        </section>

        <section class="page" id="page-recruitment">
          <div class="grid">
            <article class="card">
              <div class="section-eyebrow">Recruitment</div>
              <h3>Recruitment message for direct messages</h3>
              <p>
                This tab provides a recruitment message formatted to work cleanly in Discord direct messages. It is written in a more formal style while keeping the original intent of your message: inviting potential members to join CLPD, highlighting the department’s values, and directing them to the website and server.
              </p>
              <p>
                Copy the message below and send it through direct messages to people you want to recruit.
              </p>

              <textarea id="recruitmentMessage" class="copy-box" readonly># Central London Police Department

The Central London Police Department is a new and up-and-coming game and community built around professionalism, leadership, and long-term development. We are currently expanding and are looking for capable individuals who may be interested in joining and growing with us.

Within CLPD, we place strong value on the following:

**Fairness**  
**Trust**  
**Honor**  
**Progression**

We would like to invite you to consider joining Central London Police Department. We believe you could perform exceptionally well here, and we currently have a number of higher-ranking opportunities available for individuals who are capable of leadership, responsibility, and mature conduct.

If you would like to review our information, documentation, and official department platform, you may do so through the links below:

**Our website**  
https://clpd.vercel.app

**Our Discord server**  
https://discord.gg/g4rGtU6MFd

If you have any questions, feel free to direct message me.</textarea>

              <div class="copy-actions">
                <button id="copyRecruitmentBtn" class="copy-btn" type="button">Copy Recruitment Message</button>
                <div id="copyRecruitmentStatus" class="copy-status">Ready to copy.</div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>

  <script>
    const authBtn = document.getElementById("authBtn");
    const usernameInput = document.getElementById("usernameInput");
    const authStatus = document.getElementById("authStatus");
    const userName = document.getElementById("userName");
    const userRank = document.getElementById("userRank");
    const rankPill = document.getElementById("rankPill");
    const nav = document.getElementById("nav");
    const topbarTitle = document.getElementById("topbarTitle");
    const topbarSub = document.getElementById("topbarSub");
    const copyRecruitmentBtn = document.getElementById("copyRecruitmentBtn");
    const copyRecruitmentStatus = document.getElementById("copyRecruitmentStatus");
    const recruitmentMessage = document.getElementById("recruitmentMessage");

    const pageMeta = {
      home: {
        title: "Central London Police Department",
        sub: "Official public information and personnel reference system."
      },
      rules: {
        title: "Rules & Conduct",
        sub: "Formal conduct expectations, discipline standards, and behavioral doctrine."
      },
      punishments: {
        title: "Punishment Guide",
        sub: "Corrective action framework for warnings, strikes, kicks, and bans."
      },
      chain: {
        title: "Chain of Command",
        sub: "Official escalation structure and command routing."
      },
      rowifi: {
        title: "RoWifi Nickname Bypass",
        sub: "Authority, limits, and naming requirements for bypass permissions."
      },
      ranks: {
        title: "Rank Structure",
        sub: "Full rank order and general responsibility expectations."
      },
      leadership: {
        title: "Leadership",
        sub: "Ownership, senior authority, and executive responsibility."
      },
      documents: {
        title: "Documents",
        sub: "Official reference materials and linked department resources."
      },
      group: {
        title: "Roblox Group",
        sub: "Mandatory membership requirement and official group access."
      },
      recruitment: {
        title: "Recruitment",
        sub: "Discord-ready outreach message for recruiting new members."
      }
    };

    function setActivePage(pageName){
      document.querySelectorAll(".page").forEach(page => {
        page.classList.toggle("active", page.id === `page-${pageName}`);
      });

      document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.page === pageName);
      });

      const meta = pageMeta[pageName];
      topbarTitle.textContent = meta.title;
      topbarSub.textContent = meta.sub;
    }

    nav.addEventListener("click", (event) => {
      const btn = event.target.closest(".nav-btn");
      if (!btn) return;
      setActivePage(btn.dataset.page);
    });

    async function authenticate(){
      const username = usernameInput.value.trim();

      if (!username){
        authStatus.textContent = "Please enter a Roblox username.";
        return;
      }

      authBtn.disabled = true;
      authStatus.textContent = "Authenticating account and checking CLPD membership...";

      try{
        const response = await fetch("/api/roblox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (!response.ok){
          authStatus.textContent = data.error || "Authentication failed.";
          authBtn.disabled = false;
          return;
        }

        userName.textContent = data.username;
        userRank.textContent = `Rank: ${data.rank}`;
        rankPill.textContent = `${data.username} • ${data.rank}`;

        document.body.classList.add("logged-in");
        setActivePage("home");
      } catch (error){
        authStatus.textContent = "Network error. Please try again.";
        authBtn.disabled = false;
      }
    }

    async function copyRecruitmentMessage(){
      try{
        await navigator.clipboard.writeText(recruitmentMessage.value);
        copyRecruitmentStatus.textContent = "Recruitment message copied.";
      } catch (error){
        recruitmentMessage.select();
        recruitmentMessage.setSelectionRange(0, recruitmentMessage.value.length);
        copyRecruitmentStatus.textContent = "Press Ctrl+C to copy the selected message.";
      }
    }

    authBtn.addEventListener("click", authenticate);
    usernameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter"){
        authenticate();
      }
    });

    copyRecruitmentBtn.addEventListener("click", copyRecruitmentMessage);
  </script>
</body>
</html>
