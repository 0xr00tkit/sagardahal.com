"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  getStoredData,
  INITIAL_WRITEUPS,
  INITIAL_RESEARCHER_INFO,
  INITIAL_SKILLS,
  INITIAL_CERTS,
  INITIAL_SOCIALS,
  INITIAL_ACHIEVEMENTS
} from "./lib/data";

// Inline Custom SVGs for minimalist icons
const SVGShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const SVGTerminal = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const SVGUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SVGUnlock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [guideMode, setGuideMode] = useState(true);
  const [clock, setClock] = useState("2026-05-23 14:26:00");

  // Dynamic Portfolio Data with localStorage sync
  const [researcherInfo, setResearcherInfo] = useState(INITIAL_RESEARCHER_INFO);
  const [socials] = useState(INITIAL_SOCIALS);
  const [certs, setCerts] = useState(INITIAL_CERTS);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [achievements] = useState(INITIAL_ACHIEVEMENTS);
  const [writeups, setWriteups] = useState(INITIAL_WRITEUPS);

  useEffect(() => {
    setResearcherInfo(getStoredData("portfolio_info", INITIAL_RESEARCHER_INFO));
    setSkills(getStoredData("portfolio_skills", INITIAL_SKILLS));
    setCerts(getStoredData("portfolio_certs", INITIAL_CERTS));
    setWriteups(getStoredData("portfolio_writeups", INITIAL_WRITEUPS));
  }, []);

  // Decrypter sandbox states
  const [cryptString, setCryptString] = useState("gurfntneqnuny00@tznvy.pbz");
  const [decryptedResult, setDecryptedResult] = useState("");
  const [sandboxScrambleActive, setSandboxScrambleActive] = useState(false);
  const [sandboxAnimationText, setSandboxAnimationText] = useState("gurfntneqnuny00@tznvy.pbz");

  // Contact decoder states
  const [emailScrambleText, setEmailScrambleText] = useState("thesagardahal00@gmail.com");
  const [phoneScrambleText, setPhoneScrambleText] = useState("+91-8779367858");
  const [scrambleActive, setScrambleActive] = useState(false);
  const [revealedContacts, setRevealedContacts] = useState(false);

  // ROT13 cipher utility
  const rot13 = (str) => {
    return str.replace(/[a-zA-Z]/g, (c) => {
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)
      );
    });
  };

  const handleCryptCheck = (e) => {
    e.preventDefault();
    if (!cryptString.trim()) return;
    if (sandboxScrambleActive) return;

    setSandboxScrambleActive(true);
    const decrypted = rot13(cryptString);
    setDecryptedResult(decrypted);

    let count = 0;
    const scrambledChars = "!@#$%^&*()_+{}[]|;:<>?,./10";
    
    const interval = setInterval(() => {
      setSandboxAnimationText(
        decrypted
          .split("")
          .map((char, index) => {
            if (index < count) return char;
            if (char === "@" || char === ".") return char;
            return scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
          })
          .join("")
      );
      
      count += 2;
      if (count >= decrypted.length + 5) {
        clearInterval(interval);
        setSandboxAnimationText(decrypted);
        setSandboxScrambleActive(false);
      }
    }, 30);
  };

  // Fixed: Concurrent Scramble for BOTH Email & Phone Numbers
  const triggerRevealAnimation = () => {
    if (scrambleActive || revealedContacts) return;
    setScrambleActive(true);

    let count = 0;
    const targetEmail = researcherInfo.email;
    const targetPhone = researcherInfo.phone;
    const scrambledChars = "!@#$%^&*()_+{}[]|;:<>?,./10";
    
    const interval = setInterval(() => {
      setEmailScrambleText(
        targetEmail
          .split("")
          .map((char, index) => {
            if (index < count) return char;
            if (char === "@" || char === ".") return char;
            return scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
          })
          .join("")
      );

      setPhoneScrambleText(
        targetPhone
          .split("")
          .map((char, index) => {
            if (index < count) return char;
            if (char === "+" || char === "-") return char;
            return scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
          })
          .join("")
      );
      
      count += 2;
      const maxLen = Math.max(targetEmail.length, targetPhone.length);
      if (count >= maxLen + 5) {
        clearInterval(interval);
        setEmailScrambleText(targetEmail);
        setPhoneScrambleText(targetPhone);
        setRevealedContacts(true);
        setScrambleActive(false);
      }
    }, 40);
  };

  // CLI State
  const [terminalHistory, setTerminalHistory] = useState([
    { kind: "system", text: "SAGAR DAHAL SECURITY OPERATIONS DIAGNOSTIC CONSOLE V1.2.0" },
    { kind: "system", text: "Ready for input. Type 'help' to list diagnostics commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalScreenRef = useRef(null);
  const cliInputRef = useRef(null);

  const focusCLI = () => {
    if (cliInputRef.current) cliInputRef.current.focus();
  };

  useEffect(() => {
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      setClock(
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
          now.getHours()
        )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToHistory = (line) => {
    setTerminalHistory((prev) => [...prev, line]);
  };

  const processCLICommand = (rawCommand) => {
    const cleanCmd = rawCommand.trim();
    if (!cleanCmd) return;

    addToHistory({ kind: "command", text: cleanCmd });

    const tokens = cleanCmd.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    switch (cmd) {
      case "help":
        addToHistory({ kind: "system", text: "DIAGNOSTICS VECTOR INTERFACES:" });
        addToHistory({ kind: "output", text: "  whoami       Professional profile information" });
        addToHistory({ kind: "output", text: "  skills        Offensive security capabilities metrics" });
        addToHistory({ kind: "output", text: "  certs        Verified security certifications" });
        addToHistory({ kind: "output", text: "  disclosure   Vulnerability disclosure history" });
        addToHistory({ kind: "output", text: "  logs         Vulnerability advisory bulletins list" });
        addToHistory({ kind: "output", text: "  view <id>    Audit specific advisory bulletin (e.g., view ADV-2025-01)" });
        addToHistory({ kind: "output", text: "  scan         Diagnose system port status" });
        addToHistory({ kind: "output", text: "  decrypt <c>  Decode standard ROT13 cipher string" });
        addToHistory({ kind: "output", text: "  links        Professional network connections" });
        addToHistory({ kind: "output", text: "  resume       Download & view professional resume" });
        addToHistory({ kind: "output", text: "  writeups     Navigate to full Writeups Hub (/writeups)" });
        addToHistory({ kind: "output", text: "  admin        Navigate to Admin Control Panel (/sagar)" });
        addToHistory({ kind: "output", text: "  clear        Flush terminal history buffer" });
        break;

      case "whoami":
      case "about":
        addToHistory({ kind: "section", text: "[CONSULTANT IDENTITY PROFILE]" });
        addToHistory({ kind: "output", text: `Name:      ${researcherInfo.name}` });
        addToHistory({ kind: "output", text: `Role:      ${researcherInfo.role}` });
        addToHistory({ kind: "output", text: `Summary:   ${researcherInfo.summary}` });
        addToHistory({ kind: "output", text: `Location:  ${researcherInfo.location}` });
        break;

      case "skills":
        addToHistory({ kind: "section", text: "[SKILLS & CAPABILITIES AUDIT]" });
        skills.forEach((skill) => {
          const blocks = "█".repeat(Math.round(skill.level / 10)) + "░".repeat(10 - Math.round(skill.level / 10));
          addToHistory({ kind: "output", text: `  ${skill.name.padEnd(35)} [${blocks}] ${skill.level}%` });
        });
        break;

      case "certs":
        addToHistory({ kind: "section", text: "[VERIFIED SYSTEM CLEARANCES]" });
        certs.forEach((c) => {
          addToHistory({ kind: "output", text: `  [✓] ${c.code.padEnd(8)} - ${c.name}` });
        });
        break;

      case "disclosure":
      case "achievements":
        addToHistory({ kind: "section", text: "[DISCLOSURE ADVISORIES]" });
        achievements.forEach((ach) => {
          addToHistory({ kind: "output", text: `  DISCLOSURE: ${ach.title}` });
          addToHistory({ kind: "output", text: `  STATUS:     PATCHED & REMEDIATED` });
          addToHistory({ kind: "output", text: `  SUMMARY:    ${ach.desc}` });
        });
        break;

      case "logs":
        addToHistory({ kind: "section", text: "[SYSTEM SECURITY DISPATCHES]" });
        writeups.forEach((w) => {
          addToHistory({ kind: "output", text: `  ${w.id} | [${w.severity.toUpperCase()}] ${w.title}` });
          addToHistory({ kind: "output", text: `    Command: view ${w.id} or view ${w.slug}` });
        });
        break;

      case "view":
        if (!args.length) {
          addToHistory({ kind: "error", text: "Error: Missing advisory bulletin ID. Usage: view <ADV-ID|SLUG>" });
          break;
        }
        const targetId = args.join(" ").toLowerCase();
        const foundLog = writeups.find(
          (w) => w.id.toLowerCase() === targetId || w.slug.toLowerCase() === targetId
        );
        if (!foundLog) {
          addToHistory({ kind: "error", text: `Bulletin not found: ${args.join(" ")}` });
          break;
        }
        addToHistory({ kind: "section", text: `[BULLETIN ${foundLog.id} DETAILS]` });
        addToHistory({ kind: "output", text: `Title:   ${foundLog.title}` });
        addToHistory({ kind: "output", text: `Date:    ${foundLog.date}` });
        addToHistory({ kind: "output", text: `Severity: ${foundLog.severity.toUpperCase()}` });
        foundLog.content.forEach((line) => {
          addToHistory({ kind: "output", text: `  [+] ${line}` });
        });
        addToHistory({ kind: "link", text: `Source Link:`, label: "Medium Writeup", url: foundLog.sourceUrl });
        break;

      case "scan":
        addToHistory({ kind: "system", text: "[*] Initiating system diagnostics scan..." });
        setTimeout(() => addToHistory({ kind: "output", text: "  [+] Diagnostics target: localhost [Active ports: 22, 80, 443]" }), 400);
        setTimeout(() => addToHistory({ kind: "output", text: "  [+] Port 22/tcp   [SSH]      - ACCESS SECURED" }), 850);
        setTimeout(() => addToHistory({ kind: "output", text: "  [+] Port 80/tcp   [HTTP]     - REDIRECTED TO HTTPS" }), 1200);
        setTimeout(() => addToHistory({ kind: "output", text: "  [+] Port 443/tcp  [HTTPS]    - GATEWAY SECURE (SSL ACTIVE)" }), 1500);
        setTimeout(() => addToHistory({ kind: "system", text: "[✓] Diagnostics scan completed cleanly." }), 2000);
        break;

      case "decrypt":
        if (!args.length) {
          addToHistory({ kind: "error", text: "Error: Missing decrypt input string. Usage: decrypt <rot13_token>" });
          break;
        }
        const decoded = rot13(args.join(" "));
        addToHistory({ kind: "system", text: `[✓] Decoded: ${decoded}` });
        break;

      case "links":
        addToHistory({ kind: "section", text: "[PROFESSIONAL CHANNELS]" });
        addToHistory({ kind: "link", text: "GitHub:   ", label: "0xr00tkit", url: socials.github });
        addToHistory({ kind: "link", text: "LinkedIn: ", label: "Sagar Dahal", url: socials.linkedin });
        addToHistory({ kind: "link", text: "Medium:   ", label: "@thesagardahal", url: socials.medium });
        addToHistory({ kind: "link", text: "Resume:   ", label: "SagarDahalResume.pdf", url: researcherInfo.resume });
        break;

      case "resume":
        addToHistory({ kind: "section", text: "[PROFESSIONAL RESUME]" });
        addToHistory({ kind: "link", text: "Resume:   ", label: "SagarDahalResume.pdf", url: researcherInfo.resume });
        break;

      case "writeups":
        window.location.href = "/writeups";
        break;

      case "admin":
      case "sagar":
        window.location.href = "/sagar";
        break;

      case "clear":
        setTerminalHistory([]);
        break;

      default:
        addToHistory({
          kind: "error",
          text: `Command not found: '${cmd}'. Type 'help' to view diagnostics list.`,
        });
    }
  };

  const handleCLISubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    processCLICommand(terminalInput);
    setTerminalInput("");
  };

  const triggerQuickTerminalCommand = (cmdText) => {
    setActiveTab("terminal");
    setTimeout(() => {
      processCLICommand(cmdText);
      focusCLI();
    }, 120);
  };

  return (
    <main className="main-wrapper">
      {/* Ambient Mesh Backgrounds */}
      <div className="bg-ambient-mesh" />
      <div className="bg-dot-grid" />

      {/* Executive Minimalist Glassmorphic Header */}
      <header className="main-header">
        <div className="brand-section">
          <Link href="/" className="brand-title">
            SAGAR DAHAL
          </Link>
          <span className="brand-badge">OFFENSIVE SECURITY</span>
        </div>

        <nav className="header-nav">
          <Link href="/" className="nav-link active">
            Overview
          </Link>
          <Link href="/writeups" className="nav-link">
            Security Advisories
          </Link>
          <Link href="/sagar" className="nav-link admin-link">
            Control Panel (/sagar)
          </Link>
        </nav>

        <div className="system-status">
          <div className="status-node">
            <span className="status-indicator blink" />
            <span>DECK: ACTIVE</span>
          </div>
          <div className="status-node clock-ticker">
            <span>{clock}</span>
          </div>
        </div>
      </header>

      {/* Security Mitigation Archive Highlight */}
      <section className="alert-banner">
        <div className="alert-icon">
          <SVGShield />
        </div>
        <div className="alert-message">
          <strong>SECURITY MITIGATION ARCHIVE:</strong> In 2023, Sagar responsibly disclosed a critical API logic vulnerability in <strong>Moneycontrol</strong> exposing personal credentials. Collaborated with technical staff to enforce immediate remediation.
        </div>
      </section>

      {/* Segmented Capsule Tab Navigator */}
      <nav className="tab-navigation">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          data-tab="dashboard"
        >
          <SVGUser />
          Overview Dashboard
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`tab-btn ${activeTab === "logs" ? "active" : ""}`}
          data-tab="logs"
        >
          <SVGShield />
          Advisory Bulletins ({writeups.length})
        </button>
        <button
          onClick={() => setActiveTab("terminal")}
          className={`tab-btn ${activeTab === "terminal" ? "active" : ""}`}
          data-tab="terminal"
        >
          <SVGTerminal />
          Interactive Terminal
        </button>
        <button
          onClick={() => setActiveTab("decrypt")}
          className={`tab-btn ${activeTab === "decrypt" ? "active" : ""}`}
          data-tab="decrypt"
        >
          <SVGUnlock />
          Decryption Utilities
        </button>

        <button
          onClick={() => setGuideMode(!guideMode)}
          className={`tab-btn guide-btn ${guideMode ? "active-guide" : ""}`}
        >
          {guideMode ? "SYSTEM GUIDE: ACTIVE" : "SYSTEM GUIDE: OFF"}
        </button>
      </nav>

      {/* Interactive Quick Shortcuts */}
      <section className={`cyber-panel quick-panel ${guideMode ? "" : "hidden-tab"}`}>
        <span className="quick-panel-title">Quick Shortcuts:</span>
        <div className="quick-panel-buttons">
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("whoami")}>whoami</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("skills")}>skills</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("certs")}>clearance certs</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("logs")}>advisory bulletins</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("scan")}>port diagnostics</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("resume")}>resume</button>
        </div>
      </section>

      {/* Tab Area 1: Security Dashboard */}
      <div id="tab-dashboard" className={`tab-content-section ${activeTab === "dashboard" ? "" : "hidden-tab"}`}>
        <div className="dashboard-grid">
          {/* Column 1: Profile & Clearances */}
          <div className="profile-card">
            <div className="cyber-panel">
              <h2 className="panel-title">Consultant Profile</h2>
              
              <div className="cyber-badge-container">
                <span className="badge crtp">CRTP</span>
                <span className="badge cyber-generic">Red Teaming</span>
                <span className="badge cyber-generic">Penetration Testing</span>
              </div>

              <div className="bio-detail-row">
                <span className="bio-label">Classification</span>
                <span className="bio-value">{researcherInfo.role}</span>
              </div>
              <div className="bio-detail-row">
                <span className="bio-label">Location</span>
                <span className="bio-value">{researcherInfo.location}</span>
              </div>
              
              {/* Fixed: Explicit data-contact attribute for clean DOM binding */}
              <div className="bio-detail-row">
                <span className="bio-label">Secure Contact</span>
                <span data-contact="email" className={`bio-value secure-val ${revealedContacts ? "revealed" : "encrypted"}`}>
                  {revealedContacts ? researcherInfo.email : (scrambleActive ? emailScrambleText : "[ENCRYPTED - DECRYPT BELOW]")}
                </span>
              </div>
              <div className="bio-detail-row">
                <span className="bio-label">Primary VoIP Node</span>
                <span data-contact="phone" className={`bio-value secure-val ${revealedContacts ? "revealed" : "encrypted"}`}>
                  {revealedContacts ? researcherInfo.phone : (scrambleActive ? phoneScrambleText : "[ENCRYPTED - DECRYPT BELOW]")}
                </span>
              </div>

              {!revealedContacts && (
                <button
                  onClick={() => triggerRevealAnimation()}
                  className={`crypt-btn ready-decrypt`}
                  style={{ marginTop: "16px" }}
                >
                  {scrambleActive ? "DECRYPTING PROFILE..." : "REVEAL SECURE CONTACTS"}
                </button>
              )}

              {revealedContacts && (
                <div style={{ marginTop: "16px", fontSize: "0.82rem", color: "var(--accent-emerald)", textAlign: "center", border: "1px solid rgba(52, 211, 153, 0.3)", borderRadius: "8px", padding: "10px", background: "rgba(52, 211, 153, 0.05)", fontWeight: "600" }}>
                  [✓] PROFILE CHANNELS REVEALED SECURELY
                </div>
              )}
            </div>

            {/* Certifications badges */}
            <div className="cyber-panel blue">
              <h2 className="panel-title">Verified Clearances</h2>
              <div className="cert-grid">
                {certs.map((c, i) => (
                  <div key={i} className="cert-card">
                    <span className="cert-code">{c.code}</span>
                    <span className="cert-name">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Technical Expertise Assessments */}
          <div className="cyber-panel">
            <h2 className="panel-title">Technical Expertise Assessments</h2>
            
            <div className="skills-container">
              <div>
                <h3 className="skill-category-title">Vulnerability Assessments & Penetration Auditing</h3>
                {skills.filter(s => s.cat === "Pentest").map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}% CAPABLE</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="skill-category-title">Systems Architecture, Development & Scripts</h3>
                {skills.filter(s => s.cat === "Coding" || s.cat === "Systems").map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}% CAPABLE</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="skill-category-title">Methodologies & Threat Auditing Standards</h3>
                {skills.filter(s => s.cat === "Methods").map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}% CAPABLE</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Area 2: Security Advisories */}
      <div id="tab-logs" className={`tab-content-section ${activeTab === "logs" ? "" : "hidden-tab"}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Recent Advisory Bulletins</h2>
          <Link href="/writeups" className="advisory-link primary-read">
            Explore Dedicated Writeups Hub (/writeups) →
          </Link>
        </div>
        <div className="writeups-wrapper">
          {writeups.map((w, idx) => (
            <article key={idx} className={`cyber-panel ${w.severity === "High" ? "advisory-card red" : "advisory-card"}`}>
              <div className="advisory-header">
                <span className="advisory-id">{w.id} [SEVERITY: {w.severity.toUpperCase()}]</span>
                <span className="advisory-date">PUBLISHED: {w.date}</span>
              </div>
              <h2 className="advisory-title">
                <Link href={`/writeups/${w.slug}`} className="advisory-title-link">
                  {w.title}
                </Link>
              </h2>
              <div className="advisory-content">
                {w.content.map((bullet, i) => (
                  <p key={i} className="advisory-bullet">{bullet}</p>
                ))}
              </div>
              <div className="advisory-footer">
                <Link href={`/writeups/${w.slug}`} className="advisory-link primary-read">
                  Read Full Article Details →
                </Link>
                {w.sourceUrl && (
                  <a href={w.sourceUrl} target="_blank" rel="noopener noreferrer" className="advisory-link">
                    Medium Publication ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Tab Area 3: Interactive CLI Terminal Shell */}
      <div id="tab-terminal" className={`tab-content-section ${activeTab === "terminal" ? "" : "hidden-tab"}`}>
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="terminal-title">diagnostics@sagardahal: ~/operations</span>
            <span style={{ fontSize: "0.72rem", color: "var(--accent-cyan)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>CONSOLE READY</span>
          </div>

          <div className="terminal-quick-links">
            <button className="quick-cmd-btn" onClick={() => processCLICommand("whoami")}>whoami</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("skills")}>skills</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("certs")}>certs</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("disclosure")}>disclosure</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("logs")}>bulletins</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("scan")}>diagnose ports</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("links")}>links</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("resume")}>resume</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("clear")}>clear console</button>
          </div>

          <div ref={terminalScreenRef} className="terminal-screen" onClick={focusCLI}>
            {terminalHistory.map((line, idx) => (
              <div key={idx} className={`terminal-line ${line.kind}`}>
                {line.kind === "command" && (
                  <span className="terminal-prompt">diagnostics:~$</span>
                )}
                {line.kind === "link" ? (
                  <>
                    <span>  {line.text} </span>
                    <a href={line.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>
                      {line.label}
                    </a>
                  </>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleCLISubmit} className="terminal-input-row">
            <label htmlFor="cliInput" className="terminal-prompt">diagnostics:~$</label>
            <input
              id="cliInput"
              ref={cliInputRef}
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="terminal-shell-input"
              autoComplete="off"
              spellCheck="false"
              placeholder="type console commands (e.g. 'help', 'whoami', 'writeups')..."
            />
          </form>
        </div>
      </div>

      {/* Tab Area 4: Decryption Sandbox */}
      <div id="tab-decrypt" className={`tab-content-section ${activeTab === "decrypt" ? "" : "hidden-tab"}`}>
        <div className="crypt-wrapper">
          <div className="cyber-panel">
            <h2 className="panel-title">
              Cipher Decryption Sandbox
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-sub)", marginBottom: "16px", lineHeight: "1.5" }}>
              Standard operations audit files often present obfuscated values. This decrypt sandbox operates a real-time ROT-13 decryption loop. Provide cryptographic strings below to decode values immediately.
            </p>

            <div className="crypt-display" style={{ marginBottom: "16px" }}>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>DECODING ACTIVE PREVIEW</span>
              <div className="cipher-visual">
                <span className="cipher-scrambler">
                  {sandboxScrambleActive ? sandboxAnimationText : (decryptedResult || cryptString || "gurfntneqnuny00@tznvy.pbz")}
                </span>
              </div>
            </div>

            <form onSubmit={handleCryptCheck} className="crypt-form">
              <div className="crypt-input-wrapper">
                <input
                  type="text"
                  value={cryptString}
                  onChange={(e) => {
                    setCryptString(e.target.value);
                    setDecryptedResult("");
                  }}
                  className="crypt-input"
                  placeholder="Insert rot13 token here..."
                />
                <button type="submit" className="crypt-btn">DECODE</button>
              </div>
            </form>

            <div className="cipher-hints" style={{ marginTop: "20px" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#ffffff" }}>OBJECTIVE / HINT</span>
              <p style={{ fontSize: "0.82rem", lineHeight: "1.4" }}>
                Decrypt Sagar Dahal's secure credentials obfuscation. You can use the decryption inputs:
              </p>
              <span className="hint-bullet">Contact Cipher: <strong>gurfntneqnuny00@tznvy.pbz</strong></span>
              <span className="hint-bullet">Alternatively, run the "REVEAL SECURE CONTACTS" decoder on the Dashboard.</span>
            </div>
          </div>

          <div className="cyber-panel blue">
            <h2 className="panel-title">
              Secure Channel Transmission
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Payload transmission successful! Encryption verified."); }} className="contact-container">
              <div className="contact-field">
                <label className="contact-label">SENDER IDENTIFICATION</label>
                <input required type="text" className="contact-textbox" placeholder="e.g. AUDITING_LEAD" />
              </div>
              <div className="contact-field">
                <label className="contact-label">CONTACT RETURN CHANNELS</label>
                <input required type="email" className="contact-textbox" placeholder="e.g. audit@domain.com" />
              </div>
              <div className="contact-field">
                <label className="contact-label">MISSION PAYLOAD / MESSAGE BODY</label>
                <textarea required className="contact-textarea" placeholder="Insert secure queries or proposal briefings here..." />
              </div>
              <button type="submit" className="contact-submit" style={{ marginTop: "8px" }}>
                Transmit Secure Payload
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="cyber-footer">
        <p>© 2026 SAGAR DAHAL. INFORMATION SECURITY AUDITING CONSOLE. ALL RIGHTS RESERVED.</p>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <a href={socials.github} target="_blank" rel="noopener noreferrer">[GITHUB]</a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
          <a href={socials.medium} target="_blank" rel="noopener noreferrer">[MEDIUM]</a>
          <a href={`/${researcherInfo.resume}`} target="_blank" rel="noopener noreferrer">[RESUME]</a>
          <Link href="/sagar">[CONTROL PANEL]</Link>
        </div>
      </footer>
    </main>
  );
}
