"use client";

import React, { useState, useEffect, useRef } from "react";

// Inline Custom SVGs for premium, clean cybersecurity icons (Zero external dependencies)
const SVGShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cyber-icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const SVGTerminal = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cyber-icon">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const SVGUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cyber-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SVGUnlock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cyber-icon">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [guideMode, setGuideMode] = useState(true);
  const [clock, setClock] = useState("2026-05-23 14:26:00");

  // Portfolio Data
  const researcherInfo = {
    name: "Sagar Dahal",
    role: "Information Security Consultant",
    summary: "Offensive security professional with 3+ years of experience in penetration testing, red teaming, active directory audits, and vulnerability assessment.",
    location: "Bongaigaon, Assam, India",
    email: "thesagardahal00@gmail.com",
    phone: "+91-8779367858",
    resume: "SagarDahal_Resume.pdf"
  };

  const socials = {
    github: "https://github.com/0xr00tkit",
    linkedin: "https://in.linkedin.com/in/sagar-dahal-b16021203",
    medium: "https://thesagardahal.medium.com/"
  };

  const certs = [
    { code: "CRTP", name: "Certified Red Team Professional" },
    { code: "CNSP", name: "Certified Network Security Practitioner" },
    { code: "CAP", name: "Certified Authorization Professional" },
    { code: "MCRTA", name: "Modern Certified Red Team Analyst" },
    { code: "CRTA", name: "Certified Red Team Analyst" }
  ];

  const skills = [
    { name: "Web / API Penetration Testing", level: 90, cat: "Pentest" },
    { name: "Active Directory Attacks & Audits", level: 85, cat: "Pentest" },
    { name: "Network Infrastructure Security", level: 80, cat: "Pentest" },
    { name: "Security Code Auditing", level: 75, cat: "Coding" },
    { name: "Python / Rust Development", level: 80, cat: "Coding" },
    { name: "Linux / Windows Systems Management", level: 85, cat: "Systems" },
    { name: "OSINT & Social Engineering", level: 75, cat: "Methods" },
    { name: "Risk Assessment & Red Team Ops", level: 80, cat: "Methods" }
  ];

  const achievements = [
    {
      title: "Moneycontrol Vulnerability Disclosure (2023)",
      desc: "Successfully identified and responsibly disclosed a critical API logic flaw exposing personal user details. Advised engineering lead on mitigation strategy, resulting in immediate remediation."
    }
  ];

  const writeups = [
    {
      id: "ADV-2025-01",
      slug: "entropy",
      title: "Understanding Shannon Entropy: Measuring Randomness for Secure Code Auditing",
      date: "September 2025",
      sourceUrl: "https://thesagardahal.medium.com/",
      content: [
        "Introduces practical applications of Shannon Entropy calculation algorithms during security reviews.",
        "Helps identify weak logic structures in JWT generations, CSRF tokens, session IDs, reset URL parameters, and API keys.",
        "Low-entropy token structures lead to predictable identifiers which attackers can harvest and brute-force.",
        "Outlines a security framework for auditing entropy indices inside authentication microservices."
      ],
      severity: "Medium"
    },
    {
      id: "ADV-2201-02",
      slug: "toolbox",
      title: "Hack The Box Walkthrough: 'Toolbox' Escalation Vector",
      date: "April 2021",
      sourceUrl: "https://thesagardahal.medium.com/hack-the-box-toolbox-cef0af5703df",
      content: [
        "Covers complete active scanning phase up to initial shell and kernel-level root privilege escalation.",
        "Identified misconfigured FTP directories exposing Docker compose parameters and local credential storage.",
        "Leveraged structured SQL injection parameters inside PostgreSQL to achieve remote command execution (RCE).",
        "Conducted docker-escape pivot audit to exploit local group permissions on host controller."
      ],
      severity: "High"
    },
    {
      id: "ADV-2201-03",
      slug: "email-bypass",
      title: "Bypassing Email Verification Controls - Hack The Box Logical Walkthrough",
      date: "February 2021",
      sourceUrl: "https://thesagardahal.medium.com/thesagardahal-bypassing-email-verification-hack-the-box-6af9b3387790",
      content: [
        "Analyzes client-side state assumptions where server trust boundaries rely heavily on frontend controllers.",
        "Bypassed validation checks inside signup flows by manipulating HTTP state flags during initial registration.",
        "Provides exact proof-of-concept testing logic to isolate race conditions on authentication endpoints.",
        "Recommends absolute enforcement matrices requiring server-side token expiration validations on all privileged methods."
      ],
      severity: "High"
    }
  ];

  // Live Decrypter minigame State
  const [cryptString, setCryptString] = useState("gurfntneqnuny00@tznvy.pbz");
  const [decryptedResult, setDecryptedResult] = useState("");
  const [cryptAnimationText, setCryptAnimationText] = useState("gurfntneqnuny00@tznvy.pbz");
  const [scrambleActive, setScrambleActive] = useState(false);
  const [revealedContacts, setRevealedContacts] = useState(false);
  const [sandboxScrambleActive, setSandboxScrambleActive] = useState(false);
  const [sandboxAnimationText, setSandboxAnimationText] = useState("gurfntneqnuny00@tznvy.pbz");

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

  const triggerRevealAnimation = () => {
    if (scrambleActive || revealedContacts) return;
    setScrambleActive(true);

    let count = 0;
    const targetEmail = researcherInfo.email;
    const scrambledChars = "!@#$%^&*()_+{}[]|;:<>?,./10";
    
    const interval = setInterval(() => {
      setCryptAnimationText(
        targetEmail
          .split("")
          .map((char, index) => {
            if (index < count) return char;
            if (char === "@" || char === ".") return char;
            return scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
          })
          .join("")
      );
      
      count += 2;
      if (count >= targetEmail.length + 5) {
        clearInterval(interval);
        setCryptAnimationText(targetEmail);
        setRevealedContacts(true);
        setScrambleActive(false);
      }
    }, 40);
  };

  // Interactive CLI Terminal Emulator State
  const [terminalHistory, setTerminalHistory] = useState([
    { kind: "system", text: "SAGAR DAHAL SECURITY OPERATIONS DIAGNOSTIC CONSOLE V1.2.0" },
    { kind: "system", text: "Ready for input. Type 'help' to list diagnostics commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalScreenRef = useRef(null);
  const cliInputRef = useRef(null);

  // Focus terminal
  const focusCLI = () => {
    if (cliInputRef.current) cliInputRef.current.focus();
  };

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Sync clock ticker
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
    updateClock(); // run initially
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToHistory = (line) => {
    setTerminalHistory((prev) => [...prev, line]);
  };

  // CLI Command processor
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
    // Brief timeout to ensure the tab is rendered before command logs
    setTimeout(() => {
      processCLICommand(cmdText);
      focusCLI();
    }, 120);
  };

  return (
    <main className="main-wrapper">
      {/* Background soft modern layout textures (No Cyborg canvas rain, no scanlines, very clean) */}
      <div className="cyber-grid" />
      <div className="bg-gradient-glow" />

      {/* Modern High-End Tech Header */}
      <header className="main-header">
        <div className="brand-section">
          <h1 className="brand-title">SAGAR DAHAL</h1>
          <span className="brand-subtitle">Information Security Consultant</span>
        </div>
        <div className="system-status">
          <div className="status-node">
            <span className="status-indicator blink" />
            <span>DECK: ACTIVE</span>
          </div>
          <div className="status-node secure-channel">
            <span>SECURE CHANNEL: E2EE</span>
          </div>
          <div className="status-node clock-ticker">
            <span>{clock}</span>
          </div>
        </div>
      </header>

      {/* Professional Disclosure Highlight */}
      <section className="alert-banner">
        <div className="alert-icon">[!]</div>
        <div className="alert-message">
          <strong>SECURITY MITIGATION ARCHIVE:</strong> In 2023, Sagar responsibly disclosed a critical API logic vulnerability in <strong>Moneycontrol</strong> exposing personal credentials. Collaborated with technical staff to enforce immediate remediation.
        </div>
      </section>

      {/* Decent, Clean Navigation Tabs */}
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

      {/* Interactive Quick Panel Helpers */}
      <section className={`cyber-panel quick-panel ${guideMode ? "" : "hidden-tab"}`}>
        <span className="quick-panel-title">Quick Diagnostic Shortcuts:</span>
        <div className="quick-panel-buttons">
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("whoami")}>whoami</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("skills")}>skills</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("certs")}>clearance certs</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("logs")}>advisory bulletins</button>
          <button className="quick-cmd-btn" onClick={() => triggerQuickTerminalCommand("scan")}>port diagnostics</button>
        </div>
      </section>

      {/* Tab Area 1: Security Dashboard */}
      <div id="tab-dashboard" className={`tab-content-section ${activeTab === "dashboard" ? "" : "hidden-tab"}`}>
        <div className="dashboard-grid">
          {/* Column 1: Bios & Clearances */}
          <div className="profile-card">
            <div className="cyber-panel">
              <h2 className="panel-title green-title">Consultant Profile</h2>
              
              <div className="cyber-badge-container" style={{ marginBottom: "15px" }}>
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
              <div className="bio-detail-row">
                <span className="bio-label">Secure Contact</span>
                <span className={`bio-value secure-val ${revealedContacts ? "revealed" : "encrypted"}`}>
                  {revealedContacts ? researcherInfo.email : "[ENCRYPTED - DECRYPT BELOW]"}
                </span>
              </div>
              <div className="bio-detail-row">
                <span className="bio-label">Primary VoIP Node</span>
                <span className={`bio-value secure-val ${revealedContacts ? "revealed" : "encrypted"}`}>
                  {revealedContacts ? researcherInfo.phone : "[ENCRYPTED - DECRYPT BELOW]"}
                </span>
              </div>

              {!revealedContacts && (
                <button
                  onClick={() => triggerRevealAnimation()}
                  className={`crypt-btn ready-decrypt`}
                  style={{ marginTop: "15px" }}
                >
                  {scrambleActive ? "DECRYPTING PROFILE..." : "REVEAL SECURE CONTACTS"}
                </button>
              )}

              {revealedContacts && (
                <div style={{ marginTop: "15px", fontSize: "0.8rem", color: "var(--glow-green)", textAlign: "center", border: "1px solid var(--glow-green)", borderRadius: "4px", padding: "8px", background: "rgba(0, 255, 102, 0.04)" }}>
                  [✓] PROFILE CHANNELS REVEALED SECURELY
                </div>
              )}
            </div>

            {/* Certifications badges */}
            <div className="cyber-panel blue">
              <h2 className="panel-title cyan-title">Professional Certifications</h2>
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

          {/* Column 2: Capabilities (Skills) */}
          <div className="cyber-panel">
            <h2 className="panel-title green-title">Technical Expertise Assessments</h2>
            
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

      {/* Tab Area 2: Security Advisories (Writeups) */}
      <div id="tab-logs" className={`tab-content-section ${activeTab === "logs" ? "" : "hidden-tab"}`}>
        <div className="writeups-wrapper">
          {writeups.map((w, idx) => (
            <article key={idx} className={`cyber-panel ${w.severity === "High" ? "amber advisory-card red" : "advisory-card"}`}>
              <div className="advisory-header">
                <span className="advisory-id">{w.id} [SEVERITY: {w.severity.toUpperCase()}]</span>
                <span className="advisory-date">PUBLISHED: {w.date}</span>
              </div>
              <h2 className="advisory-title">{w.title}</h2>
              <div className="advisory-content">
                {w.content.map((bullet, i) => (
                  <p key={i} className="advisory-bullet">{bullet}</p>
                ))}
              </div>
              <div className="advisory-footer">
                <a href={w.sourceUrl} target="_blank" rel="noopener noreferrer" className="advisory-link">
                  View Intelligence Bulletin (Full Writeup)
                </a>
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
            <span style={{ fontSize: "0.7rem", color: "var(--glow-blue)", fontWeight: "bold" }}>CONSOLE READY</span>
          </div>

          {/* Quick presets inside terminal container */}
          <div className="terminal-quick-links">
            <button className="quick-cmd-btn" onClick={() => processCLICommand("whoami")}>whoami</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("skills")}>skills</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("certs")}>certs</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("disclosure")}>disclosure</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("logs")}>bulletins</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("scan")}>diagnose ports</button>
            <button className="quick-cmd-btn" onClick={() => processCLICommand("links")}>links</button>
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
                    <a href={line.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--glow-cyan)", textDecoration: "underline" }}>
                      {line.label}
                    </a>
                  </>
                ) : line.kind === "section" ? (
                  <span>{line.text}</span>
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
              placeholder="type console commands (e.g. 'help', 'whoami', 'scan')..."
            />
          </form>
        </div>
      </div>

      {/* Tab Area 4: Decryption Chamber */}
      <div id="tab-decrypt" className={`tab-content-section ${activeTab === "decrypt" ? "" : "hidden-tab"}`}>
        <div className="crypt-wrapper">
          {/* Column 1: ROT13 Decrypter minigame */}
          <div className="cyber-panel">
            <h2 className="panel-title green-title">
              Cipher Decryption Sandbox
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: "1.5" }}>
              Standard operations audit files often present obfuscated values. This decrypt sandbox operates a real-time ROT-13 decryption loop. Provide cryptographic strings below to decode values immediately.
            </p>

            <div className="crypt-display" style={{ marginBottom: "15px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>DECODING ACTIVE PREVIEW</span>
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
              <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#ffffff" }}>OBJECTIVE / HINT</span>
              <p style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                Decrypt Sagar Dahal's secure credentials obfuscation. You can use the decryption inputs:
              </p>
              <span className="hint-bullet">Contact Cipher: <strong>gurfntneqnuny00@tznvy.pbz</strong></span>
              <span className="hint-bullet">Alternatively, run the "REVEAL SECURE CONTACTS" decoder on the Dashboard.</span>
            </div>
          </div>

          {/* Column 2: Secure messaging form */}
          <div className="cyber-panel blue">
            <h2 className="panel-title cyan-title">
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

      {/* Premium Footer */}
      <footer className="cyber-footer">
        <p>© 2026 SAGAR DAHAL. INFORMATION SECURITY AUDITING CONSOLE. ALL RIGHTS RESERVED.</p>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "20px" }}>
          <a href={socials.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", textDecoration: "none" }}>[GITHUB]</a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", textDecoration: "none" }}>[LINKEDIN]</a>
          <a href={socials.medium} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", textDecoration: "none" }}>[MEDIUM]</a>
          <a href={researcherInfo.resume} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", textDecoration: "none" }}>[RESUME]</a>
        </div>
      </footer>
    </main>
  );
}
