export const INITIAL_RESEARCHER_INFO = {
  name: "Sagar Dahal",
  role: "Information Security Consultant",
  summary: "Offensive security professional with 3+ years of experience in penetration testing, red teaming, active directory audits, and vulnerability assessment.",
  location: "Bongaigaon, Assam, India",
  email: "thesagardahal00@gmail.com",
  phone: "+91-8779367858",
  resume: "SagarDahalResume.pdf"
};

export const INITIAL_SOCIALS = {
  github: "https://github.com/0xr00tkit",
  linkedin: "https://in.linkedin.com/in/sagar-dahal-b16021203",
  medium: "https://thesagardahal.medium.com/"
};

export const INITIAL_CERTS = [
  { code: "CRTP", name: "Certified Red Team Professional" },
  { code: "CNSP", name: "Certified Network Security Practitioner" },
  { code: "CAP", name: "Certified Authorization Professional" },
  { code: "MCRTA", name: "Modern Certified Red Team Analyst" },
  { code: "CRTA", name: "Certified Red Team Analyst" }
];

export const INITIAL_SKILLS = [
  { name: "Web / API Penetration Testing", level: 90, cat: "Pentest" },
  { name: "Active Directory Attacks & Audits", level: 85, cat: "Pentest" },
  { name: "Network Infrastructure Security", level: 80, cat: "Pentest" },
  { name: "Security Code Auditing", level: 75, cat: "Coding" },
  { name: "Python / Rust Development", level: 80, cat: "Coding" },
  { name: "Linux / Windows Systems Management", level: 85, cat: "Systems" },
  { name: "OSINT & Social Engineering", level: 75, cat: "Methods" },
  { name: "Risk Assessment & Red Team Ops", level: 80, cat: "Methods" }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    title: "Moneycontrol Vulnerability Disclosure (2023)",
    desc: "Successfully identified and responsibly disclosed a critical API logic flaw exposing personal user details. Advised engineering lead on mitigation strategy, resulting in immediate remediation."
  }
];

export const INITIAL_WRITEUPS = [
  {
    id: "ADV-2025-01",
    slug: "entropy",
    title: "Understanding Shannon Entropy: Measuring Randomness for Secure Code Auditing",
    date: "September 2025",
    sourceUrl: "https://thesagardahal.medium.com/",
    severity: "Medium",
    tags: ["Code Audit", "Cryptography", "Entropy", "JWT"],
    readTime: "6 min read",
    summary: "Practical guide on applying Shannon Entropy calculation algorithms during source code reviews to catch low-entropy JWTs and session tokens.",
    content: [
      "Introduces practical applications of Shannon Entropy calculation algorithms during security reviews.",
      "Helps identify weak logic structures in JWT generations, CSRF tokens, session IDs, reset URL parameters, and API keys.",
      "Low-entropy token structures lead to predictable identifiers which attackers can harvest and brute-force.",
      "Outlines a security framework for auditing entropy indices inside authentication microservices."
    ]
  },
  {
    id: "ADV-2201-02",
    slug: "toolbox",
    title: "Hack The Box Walkthrough: 'Toolbox' Escalation Vector",
    date: "April 2021",
    sourceUrl: "https://thesagardahal.medium.com/hack-the-box-toolbox-cef0af5703df",
    severity: "High",
    tags: ["HTB", "Privilege Escalation", "SQLi", "Docker Escape"],
    readTime: "9 min read",
    summary: "Comprehensive walkthrough of active scanning, PostgreSQL SQL injection to RCE, and local Docker container escapes.",
    content: [
      "Covers complete active scanning phase up to initial shell and kernel-level root privilege escalation.",
      "Identified misconfigured FTP directories exposing Docker compose parameters and local credential storage.",
      "Leveraged structured SQL injection parameters inside PostgreSQL to achieve remote command execution (RCE).",
      "Conducted docker-escape pivot audit to exploit local group permissions on host controller."
    ]
  },
  {
    id: "ADV-2201-03",
    slug: "email-bypass",
    title: "Bypassing Email Verification Controls - Hack The Box Logical Walkthrough",
    date: "February 2021",
    sourceUrl: "https://thesagardahal.medium.com/thesagardahal-bypassing-email-verification-hack-the-box-6af9b3387790",
    severity: "High",
    tags: ["Authentication", "Logic Flaw", "HTB", "Web Security"],
    readTime: "7 min read",
    summary: "In-depth analysis of client-side state assumptions in registration flows and proof-of-concept testing logic.",
    content: [
      "Analyzes client-side state assumptions where server trust boundaries rely heavily on frontend controllers.",
      "Bypassed validation checks inside signup flows by manipulating HTTP state flags during initial registration.",
      "Provides exact proof-of-concept testing logic to isolate race conditions on authentication endpoints.",
      "Recommends absolute enforcement matrices requiring server-side token expiration validations on all privileged methods."
    ]
  }
];

// Helper functions for state initialization & localStorage sync
export const getStoredData = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const setStoredData = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};
