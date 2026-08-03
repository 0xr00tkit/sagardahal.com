import React from "react";
import Link from "next/link";
import { INITIAL_WRITEUPS, INITIAL_RESEARCHER_INFO, INITIAL_SOCIALS } from "../../lib/data";

// Next.js Static Export requirement for dynamic route segments
export async function generateStaticParams() {
  return INITIAL_WRITEUPS.map((w) => ({
    slug: w.slug,
  }));
}

export default async function WriteupArticlePage({ params }) {
  const { slug } = await params;
  const advisory = INITIAL_WRITEUPS.find((w) => w.slug === slug || w.id.toLowerCase() === slug.toLowerCase()) || INITIAL_WRITEUPS[0];

  return (
    <main className="main-wrapper">
      <div className="bg-ambient-mesh" />
      <div className="bg-dot-grid" />

      {/* Navigation Header */}
      <header className="main-header">
        <div className="brand-section">
          <Link href="/" className="brand-title">
            SAGAR DAHAL
          </Link>
          <span className="brand-badge">SECURITY ADVISORY READER</span>
        </div>
        <nav className="header-nav">
          <Link href="/" className="nav-link">
            Overview
          </Link>
          <Link href="/writeups" className="nav-link active">
            Security Advisories
          </Link>
          <Link href="/sagar" className="nav-link admin-link">
            Control Panel (/sagar)
          </Link>
        </nav>
      </header>

      {/* Article Header */}
      <article className="cyber-panel">
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <Link href="/writeups" className="advisory-link">
            ← Back to All Advisories
          </Link>
          <span className="advisory-id">{advisory.id} [SEVERITY: {advisory.severity.toUpperCase()}]</span>
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: "800", lineHeight: "1.3", marginBottom: "12px" }}>
          {advisory.title}
        </h1>

        <div style={{ display: "flex", gap: "16px", color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "24px", flexWrap: "wrap", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px" }}>
          <span>PUBLISHED: {advisory.date}</span>
          <span>AUTHOR: {INITIAL_RESEARCHER_INFO.name}</span>
          {advisory.readTime && <span>READ TIME: {advisory.readTime}</span>}
        </div>

        {/* Tags */}
        {advisory.tags && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {advisory.tags.map((t, i) => (
              <span key={i} className="badge cyber-generic">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Executive Summary */}
        {advisory.summary && (
          <div style={{ background: "rgba(56, 189, 248, 0.04)", borderLeft: "4px solid var(--accent-cyan)", padding: "16px 20px", borderRadius: "8px", marginBottom: "28px" }}>
            <span style={{ fontSize: "0.76rem", color: "var(--accent-cyan)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>
              Executive Briefing Summary
            </span>
            <p style={{ fontSize: "0.94rem", color: "var(--text-sub)", lineHeight: "1.6" }}>
              {advisory.summary}
            </p>
          </div>
        )}

        {/* Article Content Bullets */}
        <div className="advisory-content" style={{ gap: "16px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
            Technical Execution Breakdown & Impact Analysis
          </h3>
          {advisory.content.map((bullet, idx) => (
            <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "10px", padding: "16px" }}>
              <p className="advisory-bullet" style={{ fontSize: "0.92rem" }}>
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* External Link */}
        {advisory.sourceUrl && (
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "20px", display: "flex", justifyContent: "flex-end" }}>
            <a href={advisory.sourceUrl} target="_blank" rel="noopener noreferrer" className="crypt-btn" style={{ textDecoration: "none", display: "inline-block", width: "auto" }}>
              View External Publication on Medium ↗
            </a>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="cyber-footer">
        <p>© 2026 SAGAR DAHAL. SECURITY ADVISORY ARTICLE.</p>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "20px" }}>
          <a href={INITIAL_SOCIALS.github} target="_blank" rel="noopener noreferrer">[GITHUB]</a>
          <a href={INITIAL_SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
          <a href={INITIAL_SOCIALS.medium} target="_blank" rel="noopener noreferrer">[MEDIUM]</a>
        </div>
      </footer>
    </main>
  );
}
