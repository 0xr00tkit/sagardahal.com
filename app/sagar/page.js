"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredData,
  setStoredData,
  INITIAL_WRITEUPS,
  INITIAL_RESEARCHER_INFO,
  INITIAL_SKILLS,
  INITIAL_CERTS,
  INITIAL_SOCIALS
} from "../lib/data";

export default function AdminControlPanel() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");

  const [activeAdminTab, setActiveAdminTab] = useState("writeups");
  const [writeups, setWriteups] = useState(INITIAL_WRITEUPS);
  const [researcherInfo, setResearcherInfo] = useState(INITIAL_RESEARCHER_INFO);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [certs, setCerts] = useState(INITIAL_CERTS);

  // New Writeup Form State
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newSeverity, setNewSeverity] = useState("High");
  const [newDate, setNewDate] = useState("August 2026");
  const [newSummary, setNewSummary] = useState("");
  const [newBullets, setNewBullets] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("https://thesagardahal.medium.com/");
  const [newTags, setNewTags] = useState("Pentest, Security");

  // Edit Writeup Modal State
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setWriteups(getStoredData("portfolio_writeups", INITIAL_WRITEUPS));
    setResearcherInfo(getStoredData("portfolio_info", INITIAL_RESEARCHER_INFO));
    setSkills(getStoredData("portfolio_skills", INITIAL_SKILLS));
    setCerts(getStoredData("portfolio_certs", INITIAL_CERTS));

    const authState = getStoredData("sagar_unlocked", false);
    if (authState) setIsUnlocked(true);
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode.trim() === "sagar2026" || passcode.trim() === "sagar" || passcode.trim() === "root") {
      setIsUnlocked(true);
      setStoredData("sagar_unlocked", true);
      setPassError("");
    } else {
      setPassError("Invalid passcode. Try 'sagar2026' or click Quick Unlock below.");
    }
  };

  const handleQuickUnlock = () => {
    setIsUnlocked(true);
    setStoredData("sagar_unlocked", true);
    setPassError("");
  };

  // Writeups CRUD
  const handleAddWriteup = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) return;

    const bulletList = newBullets
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const tagList = newTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newItem = {
      id: `ADV-2026-${String(writeups.length + 1).padStart(2, "0")}`,
      slug: newSlug.trim().toLowerCase().replace(/\s+/g, "-"),
      title: newTitle.trim(),
      date: newDate.trim(),
      severity: newSeverity,
      summary: newSummary.trim(),
      content: bulletList.length > 0 ? bulletList : [newSummary.trim()],
      sourceUrl: newSourceUrl.trim(),
      tags: tagList.length > 0 ? tagList : ["Security"],
      readTime: "5 min read"
    };

    const updated = [newItem, ...writeups];
    setWriteups(updated);
    setStoredData("portfolio_writeups", updated);

    // Reset form
    setNewTitle("");
    setNewSlug("");
    setNewSummary("");
    setNewBullets("");
  };

  const handleDeleteWriteup = (idx) => {
    if (window.confirm("Are you sure you want to delete this advisory bulletin?")) {
      const updated = writeups.filter((_, i) => i !== idx);
      setWriteups(updated);
      setStoredData("portfolio_writeups", updated);
    }
  };

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setStoredData("portfolio_info", researcherInfo);
    alert("Profile and contact details saved successfully!");
  };

  // Skill Add/Delete
  const handleAddSkill = (name, level, cat) => {
    if (!name.trim()) return;
    const updated = [...skills, { name: name.trim(), level: Number(level) || 80, cat: cat || "Pentest" }];
    setSkills(updated);
    setStoredData("portfolio_skills", updated);
  };

  const handleDeleteSkill = (idx) => {
    const updated = skills.filter((_, i) => i !== idx);
    setSkills(updated);
    setStoredData("portfolio_skills", updated);
  };

  if (!isUnlocked) {
    return (
      <main className="main-wrapper" style={{ minHeight: "80vh", justifyContent: "center", alignItems: "center" }}>
        <div className="bg-ambient-mesh" />
        <div className="bg-dot-grid" />

        <div className="admin-modal" style={{ width: "100%", maxWidth: "460px" }}>
          <span className="admin-title-badge">SAGAR DAHAL CONTROL PANEL (/SAGAR)</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Restricted Access Authenticator</h2>
          <p style={{ fontSize: "0.86rem", color: "var(--text-sub)", lineHeight: "1.5" }}>
            Enter your admin security passcode to unlock management interfaces for advisory writeups, profile parameters, and skill metrics.
          </p>

          <form onSubmit={handleUnlock} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="admin-form-group">
              <label style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: "700" }}>SECURITY PASSCODE</label>
              <input
                type="password"
                placeholder="Enter passcode (Default: sagar2026)..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="admin-input"
                autoFocus
              />
            </div>
            {passError && <span style={{ color: "var(--accent-rose)", fontSize: "0.8rem" }}>{passError}</span>}

            <button type="submit" className="admin-btn">
              Authenticate & Unlock Console
            </button>
          </form>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button type="button" onClick={handleQuickUnlock} style={{ background: "none", border: "none", color: "var(--accent-cyan)", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}>
              Quick Unlock Demo Access
            </button>
            <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "none" }}>
              ← Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-wrapper">
      <div className="bg-ambient-mesh" />
      <div className="bg-dot-grid" />

      {/* Header */}
      <header className="main-header">
        <div className="brand-section">
          <Link href="/" className="brand-title">
            SAGAR DAHAL
          </Link>
          <span className="brand-badge" style={{ color: "var(--accent-amber)", borderColor: "rgba(251, 191, 36, 0.3)", background: "rgba(251, 191, 36, 0.1)" }}>
            CONTROL PANEL (/SAGAR)
          </span>
        </div>
        <nav className="header-nav">
          <Link href="/" className="nav-link">
            Overview
          </Link>
          <Link href="/writeups" className="nav-link">
            Security Advisories
          </Link>
          <button
            onClick={() => {
              setIsUnlocked(false);
              setStoredData("sagar_unlocked", false);
            }}
            className="nav-link admin-link"
            style={{ cursor: "pointer" }}
          >
            Lock Panel 🔒
          </button>
        </nav>
      </header>

      {/* Control Panel Nav Tabs */}
      <nav className="tab-navigation">
        <button
          onClick={() => setActiveAdminTab("writeups")}
          className={`tab-btn ${activeAdminTab === "writeups" ? "active" : ""}`}
        >
          Manage Advisory Writeups ({writeups.length})
        </button>
        <button
          onClick={() => setActiveAdminTab("profile")}
          className={`tab-btn ${activeAdminTab === "profile" ? "active" : ""}`}
        >
          Profile & Contact Info
        </button>
        <button
          onClick={() => setActiveAdminTab("skills")}
          className={`tab-btn ${activeAdminTab === "skills" ? "active" : ""}`}
        >
          Skills & Certifications
        </button>
      </nav>

      {/* Admin Tab 1: Writeups Manager */}
      {activeAdminTab === "writeups" && (
        <section className="cyber-panel">
          <h2 className="panel-title">Publish New Advisory Writeup</h2>

          <form onSubmit={handleAddWriteup} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="contact-label">ARTICLE TITLE</label>
              <input
                required
                type="text"
                className="admin-input"
                placeholder="e.g. Exploiting Deserialization Vectors in Spring Boot Frameworks"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">URL SLUG (UNIQUE)</label>
              <input
                required
                type="text"
                className="admin-input"
                placeholder="e.g. spring-deserialization"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">SEVERITY RATING</label>
              <select
                className="admin-input"
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value)}
              >
                <option value="High">High Severity</option>
                <option value="Medium">Medium Severity</option>
                <option value="Low">Low Severity</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="contact-label">PUBLICATION DATE</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. August 2026"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">TAGS (COMMA SEPARATED)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. RCE, Java, Code Audit"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="contact-label">EXECUTIVE SUMMARY</label>
              <textarea
                required
                className="contact-textarea"
                placeholder="Brief summary of vulnerability mechanism and mitigation..."
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="contact-label">DETAILED BULLET POINTS (ONE PER LINE)</label>
              <textarea
                className="contact-textarea"
                rows={4}
                placeholder="Introduces practical applications during code review&#10;Exploited insecure state flags&#10;Enforces strict validation matrices"
                value={newBullets}
                onChange={(e) => setNewBullets(e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="contact-label">EXTERNAL PUBLICATION URL (MEDIUM / BLOG)</label>
              <input
                type="url"
                className="admin-input"
                value={newSourceUrl}
                onChange={(e) => setNewSourceUrl(e.target.value)}
              />
            </div>

            <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="admin-btn admin-btn-cyan">
                + Publish Advisory Bulletin
              </button>
            </div>
          </form>

          <h2 className="panel-title">Published Advisory Bulletins ({writeups.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {writeups.map((w, idx) => (
              <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "4px" }}>
                    <span className="advisory-id">{w.id}</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: "700" }}>{w.title}</span>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Slug: /writeups/{w.slug} | Date: {w.date}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link href={`/writeups/${w.slug}`} className="advisory-link" target="_blank">
                    View
                  </Link>
                  <button onClick={() => handleDeleteWriteup(idx)} className="admin-btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Admin Tab 2: Profile & Contact Manager */}
      {activeAdminTab === "profile" && (
        <section className="cyber-panel">
          <h2 className="panel-title">Edit Profile & Contact Parameters</h2>

          <form onSubmit={handleSaveProfile} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="admin-form-group">
              <label className="contact-label">FULL NAME</label>
              <input
                type="text"
                className="admin-input"
                value={researcherInfo.name}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, name: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">PROFESSIONAL ROLE</label>
              <input
                type="text"
                className="admin-input"
                value={researcherInfo.role}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, role: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">LOCATION</label>
              <input
                type="text"
                className="admin-input"
                value={researcherInfo.location}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, location: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">RESUME FILENAME (IN PUBLIC/)</label>
              <input
                type="text"
                className="admin-input"
                value={researcherInfo.resume}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, resume: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">SECURE EMAIL ADDRESS</label>
              <input
                type="email"
                className="admin-input"
                value={researcherInfo.email}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, email: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="contact-label">PRIMARY VOIP PHONE NUMBER</label>
              <input
                type="text"
                className="admin-input"
                value={researcherInfo.phone}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, phone: e.target.value })}
              />
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="contact-label">EXECUTIVE BIO SUMMARY</label>
              <textarea
                rows={3}
                className="contact-textarea"
                value={researcherInfo.summary}
                onChange={(e) => setResearcherInfo({ ...researcherInfo, summary: e.target.value })}
              />
            </div>

            <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="admin-btn admin-btn-cyan">
                Save Profile Parameters
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Admin Tab 3: Skills & Certifications */}
      {activeAdminTab === "skills" && (
        <section className="cyber-panel">
          <h2 className="panel-title">Technical Capabilities Skills ({skills.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255, 255, 255, 0.02)", padding: "10px 14px", borderRadius: "8px" }}>
                <span>{s.name} ({s.cat})</span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "700", fontFamily: "var(--font-mono)" }}>{s.level}%</span>
                  <button onClick={() => handleDeleteSkill(i)} className="admin-btn-danger">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="panel-title">Add Technical Skill</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              handleAddSkill(form.skillName.value, form.skillLevel.value, form.skillCat.value);
              form.reset();
            }}
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "12px" }}
          >
            <input required name="skillName" type="text" placeholder="Skill Name (e.g. Rust Development)" className="admin-input" />
            <input required name="skillLevel" type="number" min={1} max={100} defaultValue={80} placeholder="Level %" className="admin-input" />
            <select name="skillCat" className="admin-input">
              <option value="Pentest">Pentest</option>
              <option value="Coding">Coding</option>
              <option value="Systems">Systems</option>
              <option value="Methods">Methods</option>
            </select>
            <button type="submit" className="admin-btn admin-btn-cyan">+ Add Skill</button>
          </form>
        </section>
      )}

      {/* Footer */}
      <footer className="cyber-footer">
        <p>© 2026 SAGAR DAHAL. CONTROL PANEL SYSTEM.</p>
      </footer>
    </main>
  );
}
