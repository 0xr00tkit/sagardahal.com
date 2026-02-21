<script setup>
import { nextTick, onMounted, reactive, ref, watch } from "vue";

const promptLabel = "root@kali:~$";
const input = ref("");
const inputRef = ref(null);
const outputRef = ref(null);

const profile = {
  name: "Sagar Dahal",
  role: "Security Consultant",
  summary:
    "Offensive security professional with 3 years of experience in penetration testing, red teaming, and vulnerability assessment.",
  location: "Bongaigaon, Assam, India",
  email: "thesagardahal00@gmail.com",
  phone: "+91-8779367858",
  resume: "/SagarDahal_Resume.pdf"
};

const social = {
  github: "https://github.com/0xr00tkit/",
  linkedin: "https://in.linkedin.com/in/sagar-dahal-b16021203",
  medium: "https://thesagardahal.medium.com/"
};

const certifications = ["CRTP", "CNSP", "CAP", "MCRTA", "CRTA"];

const skills = [
  "Pentesting: Web App, API, Mobile, Cloud, Infrastructure, Network Security, Code Audit",
  "Coding: Python, Rust, PHP, C/C++, C#",
  "Systems: Linux, Windows, Active Directory, MySQL",
  "Methods: Red Team Engagements, OSINT, Risk Assessment"
];

const achievement =
  "Moneycontrol Hack (2023): Disclosed a severe security flaw that exposed sensitive user data and helped drive immediate remediation.";

const blogs = [
  {
    id: "1",
    slug: "entropy",
    title: "Understanding Shannon Entropy: Measuring Randomness for Secure Code Auditing",
    date: "September 2025",
    sourceUrl: "https://thesagardahal.medium.com/",
    content: [
      "This article introduces Shannon Entropy and explains why measuring randomness matters during secure code auditing.",
      "Entropy helps identify weak generation logic in tokens, session IDs, reset URLs, API keys, and nonces.",
      "Low-entropy output can reveal predictable patterns that attackers may abuse to bypass security controls.",
      "The blog focuses on practical audit use cases and how entropy can be used as an early warning signal in secure code review workflows."
    ]
  },
  {
    id: "2",
    slug: "toolbox",
    title: "HACK THE BOX - TOOLBOX",
    date: "April 25, 2021",
    sourceUrl: "https://thesagardahal.medium.com/hack-the-box-toolbox-cef0af5703df",
    content: [
      "This walkthrough covers HTB 'Toolbox' from initial reconnaissance to full privilege escalation.",
      "Enumeration identified key services and attack surface, including admin endpoints and exposed FTP content.",
      "Authentication flow testing revealed SQL injection opportunities that enabled controlled access and command execution.",
      "A reverse shell was established and local enumeration confirmed Docker context for further pivoting.",
      "Using discovered credentials and privilege conditions, escalation reached high-privilege access and full machine compromise."
    ]
  },
  {
    id: "3",
    slug: "email-bypass",
    title: "BYPASSING EMAIL VERIFICATION - Hack The Box",
    date: "February 10, 2021",
    sourceUrl: "https://thesagardahal.medium.com/thesagardahal-bypassing-email-verification-hack-the-box-6af9b3387790",
    content: [
      "This write-up shows a logic-focused approach to bypassing email verification in a signup flow.",
      "It starts from invite code generation behavior and continues through registration and state validation testing.",
      "The key issue is server-side verification enforcement gaps, where frontend flow controls are treated as trusted state.",
      "The blog ends with defensive guidance: enforce verification checks server-side on every privileged action."
    ]
  }
];

const history = reactive([]);

const pushEntry = (entry) => history.push(entry);

const printLines = (lines, kind = "output") => {
  lines.forEach((line) => pushEntry({ kind, text: line }));
};

const printLink = (label, url) => {
  pushEntry({ kind: "link", label, url });
};

const printBlog = (blog) => {
  pushEntry({ kind: "section", title: `${blog.title} (${blog.date})` });
  blog.content.forEach((line) => pushEntry({ kind: "output", text: line }));
  printLink("Source", blog.sourceUrl);
};

const commands = {
  help: () => {
    printLines([
      "Available commands:",
      "whoami, about, skills, certs, achievements, blogs, blog <id|slug>, github, medium, linkedin, links, resume, contact, clear, banner, help"
    ]);
  },
  banner: () => {
    printLines([
      "Sagar Dahal Terminal Portfolio",
      "Type 'help' to view commands."
    ], "system");
  },
  whoami: () => {
    pushEntry({ kind: "section", title: "About" });
    printLines([
      `${profile.name} | ${profile.role}`,
      profile.summary,
      `Location: ${profile.location}`,
      `Email: ${profile.email}`,
      `Phone: ${profile.phone}`
    ]);
  },
  about: () => commands.whoami(),
  skills: () => {
    pushEntry({ kind: "section", title: "Skills" });
    printLines(skills);
  },
  certs: () => {
    pushEntry({ kind: "section", title: "Certifications" });
    printLines(certifications.map((cert) => `- ${cert}`));
  },
  achievements: () => {
    pushEntry({ kind: "section", title: "Achievement" });
    printLines([achievement]);
  },
  github: () => printLink("GitHub", social.github),
  medium: () => printLink("Medium", social.medium),
  linkedin: () => printLink("LinkedIn", social.linkedin),
  links: () => {
    pushEntry({ kind: "section", title: "Profiles" });
    printLink("GitHub", social.github);
    printLink("LinkedIn", social.linkedin);
    printLink("Medium", social.medium);
  },
  resume: () => printLink("Resume", profile.resume),
  contact: () => {
    pushEntry({ kind: "section", title: "Contact" });
    printLines([`Email: ${profile.email}`, `Phone: ${profile.phone}`]);
  },
  blogs: () => {
    pushEntry({ kind: "section", title: "Blogs" });
    blogs.forEach((blog) => {
      printLines([`${blog.id}. ${blog.title} (${blog.date})`, `   run: blog ${blog.id}`]);
    });
  },
  blog: (args) => {
    if (!args.length) {
      printLines(["Usage: blog <id|slug>"], "error");
      return;
    }
    const target = args.join(" ").toLowerCase();
    const blog = blogs.find((item) => item.id === target || item.slug === target);
    if (!blog) {
      printLines([`Blog not found: ${target}`], "error");
      return;
    }
    printBlog(blog);
  },
  clear: () => {
    history.splice(0, history.length);
  }
};

const runCommand = (raw) => {
  const value = raw.trim();
  if (!value) return;

  pushEntry({ kind: "command", text: value });

  const [command, ...args] = value.split(/\s+/);
  const key = command.toLowerCase();
  const handler = commands[key];
  if (!handler) {
    printLines([`Command not found: ${command}`, "Type 'help' for available commands."], "error");
    return;
  }
  handler(args);
};

const submit = () => {
  runCommand(input.value);
  input.value = "";
};

watch(
  () => history.length,
  async () => {
    await nextTick();
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight;
    }
  }
);

onMounted(() => {
  commands.banner();
  commands.help();
  inputRef.value?.focus();
});
</script>

<template>
  <div class="app" @click="inputRef?.focus()">
    <div class="stars"></div>
    <div class="terminal">
      <div class="terminal-head">
        <span class="dot red"></span>
        <span class="dot amber"></span>
        <span class="dot green"></span>
        <p>kali@terminal</p>
      </div>

      <div ref="outputRef" class="terminal-output">
        <div v-for="(entry, index) in history" :key="index" class="line" :class="entry.kind">
          <template v-if="entry.kind === 'command'">
            <span class="prompt">{{ promptLabel }}</span>
            <span>{{ entry.text }}</span>
          </template>
          <template v-else-if="entry.kind === 'link'">
            <span class="arrow">></span>
            <span>{{ entry.label }}:</span>
            <a :href="entry.url" target="_blank" rel="noreferrer">{{ entry.url }}</a>
          </template>
          <template v-else-if="entry.kind === 'section'">
            <span class="section-tag">[{{ entry.title }}]</span>
          </template>
          <template v-else>
            <span class="arrow">></span>
            <span>{{ entry.text }}</span>
          </template>
        </div>
      </div>

      <form class="terminal-input" @submit.prevent="submit">
        <label class="prompt" for="cmd">{{ promptLabel }}</label>
        <input
          id="cmd"
          ref="inputRef"
          v-model="input"
          autocomplete="off"
          spellcheck="false"
          placeholder="type a command..."
        />
      </form>
    </div>
  </div>
</template>
