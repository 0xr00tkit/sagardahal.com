const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else {
      const ext = path.extname(filePath);
      if (['.html', '.js', '.css', '.txt'].includes(ext)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Calculate dynamic relative path prefix based on file depth in the out folder
        const relativePath = path.relative(path.dirname(filePath), outDir);
        const relativePrefix = relativePath ? relativePath.replace(/\\/g, '/') + '/' : './';
        
        // 1. Replace all absolute references to _next or next with dynamic relative references
        content = content.replace(/\/_next\//g, relativePrefix + 'next/');
        content = content.replace(/_next\//g, relativePrefix + 'next/');
        content = content.replace(/"\/_next/g, `"${relativePrefix}next`);
        content = content.replace(/'\/_next/g, `'${relativePrefix}next`);
        
        // 2. Replace absolute references to other static assets with dynamic relative paths
        const assets = ['favicon.ico', 'globe.svg', 'file.svg', 'window.svg', 'next.svg', 'vercel.svg', 'SagarDahalResume.pdf'];
        assets.forEach(asset => {
          const regex = new RegExp(`"\\/${asset.replace('.', '\\.')}`, 'g');
          content = content.replace(regex, `"${relativePrefix}${asset}`);
          
          const regexSingle = new RegExp(`'\\/${asset.replace('.', '\\.')}`, 'g');
          content = content.replace(regexSingle, `'${relativePrefix}${asset}`);
          
          const regexRaw = new RegExp(`\\/${asset.replace('.', '\\.')}`, 'g');
          content = content.replace(regexRaw, `${relativePrefix}${asset}`);
        });

        // 3. Inject highly robust local Vanilla JS script using Event Delegation
        if (filePath.endsWith('index.html')) {
          const vanillaScript = `
<script>
// Global Event Delegation Engine: Handles local file:// and server rendering contexts robustly
function initEventDelegation() {
  
  // Tab Switcher Controller
  function switchTab(tabId) {
    const tabButtons = document.querySelectorAll('.tab-btn:not(.guide-btn)');
    const sections = document.querySelectorAll('.tab-content-section');

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    sections.forEach(sec => {
      if (sec.id === 'tab-' + tabId) {
        sec.classList.remove('hidden-tab');
      } else {
        sec.classList.add('hidden-tab');
      }
    });

    if (tabId === 'terminal') {
      const cliInput = document.getElementById('cliInput');
      if (cliInput) setTimeout(() => cliInput.focus(), 120);
    }
  }

  // Scramble contacts vector animation
  function triggerRevealContacts(revealBtn) {
    if (revealBtn.classList.contains('scrambling') || revealBtn.textContent.includes('✓')) return;
    
    revealBtn.classList.remove('ready-decrypt');
    revealBtn.classList.add('scrambling');
    revealBtn.textContent = 'DECRYPTING PROFILE...';
    
    const secureVals = document.querySelectorAll('.secure-val');
    let count = 0;
    const scrambledChars = "!@#$%^&*()_+{}[]|;:<>?,./10";
    const targetEmail = "thesagardahal00@gmail.com";
    const targetPhone = "+91-8779367858";
    
    const interval = setInterval(() => {
      secureVals.forEach(node => {
        const isEmail = node.textContent.includes('@') || 
                        (node.previousElementSibling && node.previousElementSibling.textContent.toLowerCase().includes('contact')) || 
                        (node.previousElementSibling && node.previousElementSibling.textContent.toLowerCase().includes('transmission'));
        const targetText = isEmail ? targetEmail : targetPhone;
        node.textContent = targetText
          .split("")
          .map((char, index) => {
            if (index < count) return char;
            if (char === "@" || char === ".") return char;
            return scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
          })
          .join("");
      });
      
      count += 2;
      if (count >= targetEmail.length + 5) {
        clearInterval(interval);
        secureVals.forEach(node => {
          const isEmail = node.textContent.includes('@') || 
                          (node.previousElementSibling && node.previousElementSibling.textContent.toLowerCase().includes('contact')) || 
                          (node.previousElementSibling && node.previousElementSibling.textContent.toLowerCase().includes('transmission'));
          node.textContent = isEmail ? targetEmail : targetPhone;
          node.classList.remove('encrypted');
          node.classList.add('revealed');
        });
        
        revealBtn.classList.remove('scrambling');
        revealBtn.style.display = 'none';
        
        const container = revealBtn.parentElement;
        const statusNode = document.createElement('div');
        statusNode.style.marginTop = '15px';
        statusNode.style.fontSize = '0.8rem';
        statusNode.style.color = 'var(--glow-green)';
        statusNode.style.textAlign = 'center';
        statusNode.style.border = '1px solid var(--glow-green)';
        statusNode.style.borderRadius = '4px';
        statusNode.style.padding = '8px';
        statusNode.style.background = 'rgba(16, 185, 129, 0.04)';
        statusNode.textContent = '[✓] PROFILE CHANNELS REVEALED SECURELY';
        container.appendChild(statusNode);
      }
    }, 40);
  }

  // ROT13 decrypt sandbox logic
  function executeDecryption() {
    const cryptInput = document.querySelector('.crypt-input');
    const previewText = document.querySelector('.cipher-scrambler');
    if (!cryptInput || !previewText) return;
    
    const val = cryptInput.value.trim();
    if (!val) return;
    
    const decrypted = rot13(val);
    let count = 0;
    const scrambledChars = "!@#$%^&*()_+{}[]|;:<>?,./10";
    
    const scrambleInterval = setInterval(() => {
      previewText.textContent = decrypted
        .split("")
        .map((char, index) => {
          if (index < count) return char;
          if (char === "@" || char === ".") return char;
          return scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
        })
        .join("");
        
      count += 2;
      if (count >= decrypted.length + 5) {
        clearInterval(scrambleInterval);
        previewText.textContent = decrypted;
      }
    }, 30);
  }

  function rot13(str) {
    return str.replace(/[a-zA-Z]/g, (c) => {
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      );
    });
  }

  // UNIX Diagnostic CLI Terminal Emulator Logic
  const terminalScreen = document.querySelector('.terminal-screen');

  function appendTerminalLine(kind, text, isLink = false, label = '', url = '') {
    if (!terminalScreen) return;
    const line = document.createElement('div');
    line.className = 'terminal-line ' + kind;
    
    if (kind === 'command') {
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = 'diagnostics:~$';
      line.appendChild(prompt);
      
      const cmdText = document.createTextNode(' ' + text);
      line.appendChild(cmdText);
    } else if (isLink) {
      const leadingText = document.createTextNode('  ' + text + ' ');
      line.appendChild(leadingText);
      
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.style.color = 'var(--glow-cyan)';
      a.style.textDecoration = 'underline';
      a.textContent = label;
      line.appendChild(a);
    } else {
      line.textContent = text;
    }
    
    terminalScreen.appendChild(line);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function executeCommand(rawCommand) {
    const cleanCmd = rawCommand.trim();
    if (!cleanCmd) return;
    
    appendTerminalLine('command', cleanCmd);
    
    const tokens = cleanCmd.split(' ').filter(Boolean);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);
    
    switch (cmd) {
      case 'help':
        appendTerminalLine('system', 'DIAGNOSTICS VECTOR INTERFACES:');
        appendTerminalLine('output', '  whoami       Professional profile information');
        appendTerminalLine('output', '  skills       Offensive security capabilities metrics');
        appendTerminalLine('output', '  certs        Verified security certifications');
        appendTerminalLine('output', '  disclosure   Vulnerability disclosure history');
        appendTerminalLine('output', '  logs         Vulnerability advisory bulletins list');
        appendTerminalLine('output', '  view <id>    Audit specific advisory bulletin (e.g., view ADV-2025-01)');
        appendTerminalLine('output', '  scan         Diagnose system port status');
        appendTerminalLine('output', '  decrypt <c>  Decode standard ROT13 cipher string');
        appendTerminalLine('output', '  links        Professional network connections');
        appendTerminalLine('output', '  clear        Flush terminal history buffer');
        break;
        
      case 'whoami':
      case 'about':
        appendTerminalLine('section', '[CONSULTANT IDENTITY PROFILE]');
        appendTerminalLine('output', 'Name:      Sagar Dahal');
        appendTerminalLine('output', 'Role:      Information Security Consultant');
        appendTerminalLine('output', 'Summary:   Offensive security professional with 3+ years of experience in penetration testing, red teaming, active directory audits, and vulnerability assessment.');
        appendTerminalLine('output', 'Location:  Bongaigaon, Assam, India');
        break;
        
      case 'skills':
        appendTerminalLine('section', '[SKILLS & CAPABILITIES AUDIT]');
        appendTerminalLine('output', '  Web / API Penetration Testing       [█████████░] 90%');
        appendTerminalLine('output', '  Active Directory Attacks & Audits   [█████████░] 85%');
        appendTerminalLine('output', '  Network Infrastructure Security     [████████░░] 80%');
        appendTerminalLine('output', '  Security Code Auditing              [████████░░] 75%');
        appendTerminalLine('output', '  Python / Rust Development           [████████░░] 80%');
        appendTerminalLine('output', '  Linux / Windows Systems Management  [█████████░] 85%');
        appendTerminalLine('output', '  OSINT & Social Engineering          [████████░░] 75%');
        appendTerminalLine('output', '  Risk Assessment & Red Team Ops      [████████░░] 80%');
        break;
        
      case 'certs':
        appendTerminalLine('section', '[VERIFIED SYSTEM CLEARANCES]');
        appendTerminalLine('output', '  [✓] CRTP     - Certified Red Team Professional');
        appendTerminalLine('output', '  [✓] CNSP     - Certified Network Security Practitioner');
        appendTerminalLine('output', '  [✓] CAP      - Certified Authorization Professional');
        appendTerminalLine('output', '  [✓] MCRTA    - Modern Certified Red Team Analyst');
        appendTerminalLine('output', '  [✓] CRTA     - Certified Red Team Analyst');
        break;
        
      case 'disclosure':
        appendTerminalLine('section', '[DISCLOSURE ADVISORIES]');
        appendTerminalLine('output', '  DISCLOSURE: Moneycontrol Vulnerability Disclosure (2023)');
        appendTerminalLine('output', '  STATUS:     PATCHED & REMEDIATED');
        appendTerminalLine('output', '  SUMMARY:    Successfully identified and responsibly disclosed a critical API logic vulnerability exposing personal credentials. Collaborated with technical staff to enforce immediate remediation.');
        break;
        
      case 'logs':
        appendTerminalLine('section', '[SYSTEM SECURITY DISPATCHES]');
        appendTerminalLine('output', '  ADV-2025-01 | [MEDIUM] Understanding Shannon Entropy: Measuring Randomness for Secure Code Auditing');
        appendTerminalLine('output', '    Command: view ADV-2025-01');
        appendTerminalLine('output', '  ADV-2201-02 | [HIGH] Hack The Box Walkthrough: \\\'Toolbox\\\' Escalation Vector');
        appendTerminalLine('output', '    Command: view ADV-2201-02');
        appendTerminalLine('output', '  ADV-2201-03 | [HIGH] Bypassing Email Verification Controls - Hack The Box Logical Walkthrough');
        appendTerminalLine('output', '    Command: view ADV-2201-03');
        break;
        
      case 'view':
        if (!args.length) {
          appendTerminalLine('error', 'Error: Missing advisory bulletin ID. Usage: view <ADV-ID|SLUG>');
          break;
        }
        const targetId = args[0].toLowerCase();
        if (targetId === 'adv-2025-01' || targetId === 'entropy') {
          appendTerminalLine('section', '[BULLETIN ADV-2025-01 DETAILS]');
          appendTerminalLine('output', 'Title:   Understanding Shannon Entropy: Measuring Randomness for Secure Code Auditing');
          appendTerminalLine('output', 'Date:    September 2025');
          appendTerminalLine('output', 'Severity: MEDIUM');
          appendTerminalLine('output', '  [+] Introduces practical applications of Shannon Entropy calculation algorithms during security reviews.');
          appendTerminalLine('output', '  [+] Helps identify weak logic structures in JWT generations, CSRF tokens, session IDs, reset URL parameters, and API keys.');
          appendTerminalLine('output', '  [+] Low-entropy token structures lead to predictable identifiers which attackers can harvest and brute-force.');
          appendTerminalLine('output', '  [+] Outlines a security framework for auditing entropy indices inside authentication microservices.');
          appendTerminalLine('link', 'Source Link:', true, 'Medium Writeup', 'https://thesagardahal.medium.com/');
        } else if (targetId === 'adv-2201-02' || targetId === 'toolbox') {
          appendTerminalLine('section', '[BULLETIN ADV-2201-02 DETAILS]');
          appendTerminalLine('output', 'Title:   Hack The Box Walkthrough: \\\'Toolbox\\\' Escalation Vector');
          appendTerminalLine('output', 'Date:    April 2021');
          appendTerminalLine('output', 'Severity: HIGH');
          appendTerminalLine('output', '  [+] Covers complete active scanning phase up to initial shell and kernel-level root privilege escalation.');
          appendTerminalLine('output', '  [+] Identified misconfigured FTP directories exposing Docker compose parameters and local credential storage.');
          appendTerminalLine('output', '  [+] Leveraged structured SQL injection parameters inside PostgreSQL to achieve remote command execution (RCE).');
          appendTerminalLine('output', '  [+] Conducted docker-escape pivot audit to exploit local group permissions on host controller.');
          appendTerminalLine('link', 'Source Link:', true, 'Medium Writeup', 'https://thesagardahal.medium.com/hack-the-box-toolbox-cef0af5703df');
        } else if (targetId === 'adv-2201-03' || targetId === 'email-bypass') {
          appendTerminalLine('section', '[BULLETIN ADV-2201-03 DETAILS]');
          appendTerminalLine('output', 'Title:   Bypassing Email Verification Controls - Hack The Box Logical Walkthrough');
          appendTerminalLine('output', 'Date:    February 2021');
          appendTerminalLine('output', 'Severity: HIGH');
          appendTerminalLine('output', '  [+] Analyzes client-side state assumptions where server trust boundaries rely heavily on frontend controllers.');
          appendTerminalLine('output', '  [+] Bypassed validation checks inside signup flows by manipulating HTTP state flags during initial registration.');
          appendTerminalLine('output', '  [+] Provides exact proof-of-concept testing logic to isolate race conditions on authentication endpoints.');
          appendTerminalLine('output', '  [+] Recommends absolute enforcement matrices requiring server-side token expiration validations on all privileged methods.');
          appendTerminalLine('link', 'Source Link:', true, 'Medium Writeup', 'https://thesagardahal.medium.com/thesagardahal-bypassing-email-verification-hack-the-box-6af9b3387790');
        } else {
          appendTerminalLine('error', \'Bulletin not found: \' + args.join(\' \'));
        }
        break;
        
      case 'scan':
        appendTerminalLine('system', '[*] Initiating system diagnostics scan...');
        setTimeout(() => appendTerminalLine('output', '  [+] Diagnostics target: localhost [Active ports: 22, 80, 443]'), 400);
        setTimeout(() => appendTerminalLine('output', '  [+] Port 22/tcp   [SSH]      - ACCESS SECURED'), 850);
        setTimeout(() => appendTerminalLine('output', '  [+] Port 80/tcp   [HTTP]     - REDIRECTED TO HTTPS'), 1200);
        setTimeout(() => appendTerminalLine('output', '  [+] Port 443/tcp  [HTTPS]    - GATEWAY SECURE (SSL ACTIVE)'), 1500);
        setTimeout(() => appendTerminalLine('system', '[✓] Diagnostics scan completed cleanly.'), 2000);
        break;
        
      case 'decrypt':
        if (!args.length) {
          appendTerminalLine('error', 'Error: Missing decrypt input string. Usage: decrypt <rot13_token>');
          break;
        }
        const decodedString = rot13(args.join(' '));
        appendTerminalLine('system', \'[✓] Decoded: \' + decodedString);
        break;
        
      case 'links':
        appendTerminalLine('section', '[PROFESSIONAL CHANNELS]');
        appendTerminalLine('link', 'GitHub:   ', true, '0xr00tkit', 'https://github.com/0xr00tkit');
        appendTerminalLine('link', 'LinkedIn: ', true, 'Sagar Dahal', 'https://in.linkedin.com/in/sagar-dahal-b16021203');
        appendTerminalLine('link', 'Medium:   ', true, '@thesagardahal', 'https://thesagardahal.medium.com/');
        break;
        
      case 'clear':
        if (terminalScreen) terminalScreen.innerHTML = '';
        break;
        
      default:
        appendTerminalLine('error', \'Command not found: \\\'\' + cmd + \'\\\'. Type \\\'help\\\' to view diagnostics list.\');
    }
  }

  // --- Global Event Delegation Engine ---

  // Click Event Captures
  document.addEventListener('click', (e) => {
    // 1. Tab buttons click delegation
    const tabBtn = e.target.closest('.tab-btn:not(.guide-btn)');
    if (tabBtn) {
      e.preventDefault();
      e.stopPropagation();
      const tabId = tabBtn.getAttribute('data-tab');
      switchTab(tabId);
      return;
    }

    // 2. System Guide Toggle click delegation
    const guideBtn = e.target.closest('.guide-btn');
    if (guideBtn) {
      e.preventDefault();
      e.stopPropagation();
      guideBtn.classList.toggle('active-guide');
      const quickPanel = document.querySelector('.quick-panel');
      if (guideBtn.classList.contains('active-guide')) {
        guideBtn.textContent = 'SYSTEM GUIDE: ACTIVE';
        if (quickPanel) quickPanel.classList.remove('hidden-tab');
      } else {
        guideBtn.textContent = 'SYSTEM GUIDE: OFF';
        if (quickPanel) quickPanel.classList.add('hidden-tab');
      }
      return;
    }

    // 3. Quick shortcuts click delegation
    const quickBtn = e.target.closest('.quick-panel .quick-cmd-btn');
    if (quickBtn) {
      e.preventDefault();
      e.stopPropagation();
      const text = quickBtn.textContent.trim().toLowerCase();
      let cmd = 'whoami';
      if (text.includes('skills')) cmd = 'skills';
      else if (text.includes('cert')) cmd = 'certs';
      else if (text.includes('advis') || text.includes('bulletin')) cmd = 'logs';
      else if (text.includes('port') || text.includes('diagnos')) cmd = 'scan';
      
      switchTab('terminal');
      executeCommand(cmd);
      return;
    }

    // 4. Dashboard Scramble Reveal profile button click delegation
    const revealBtn = e.target.closest('.profile-card .crypt-btn');
    if (revealBtn) {
      e.preventDefault();
      e.stopPropagation();
      triggerRevealContacts(revealBtn);
      return;
    }

    // 5. Terminal container presets click delegation
    const termQuickBtn = e.target.closest('.terminal-quick-links .quick-cmd-btn');
    if (termQuickBtn) {
      e.preventDefault();
      e.stopPropagation();
      const text = termQuickBtn.textContent.trim().toLowerCase();
      let cmd = 'whoami';
      if (text.includes('skills')) cmd = 'skills';
      else if (text.includes('certs')) cmd = 'certs';
      else if (text.includes('bullet') || text.includes('logs')) cmd = 'logs';
      else if (text.includes('diag') || text.includes('scan')) cmd = 'scan';
      else if (text.includes('disclos') || text.includes('achieve')) cmd = 'disclosure';
      else if (text.includes('link')) cmd = 'links';
      else if (text.includes('clear')) cmd = 'clear';
      
      executeCommand(cmd);
      return;
    }
  });

  // Form Submission Event Captures
  document.addEventListener('submit', (e) => {
    // 1. Diagnostics CLI Console input form submission delegation
    const cliForm = e.target.closest('.terminal-container form');
    if (cliForm) {
      e.preventDefault();
      e.stopPropagation();
      const cliInput = document.getElementById('cliInput');
      if (cliInput) {
        const val = cliInput.value;
        if (val.trim()) {
          executeCommand(val);
          cliInput.value = '';
        }
      }
      return;
    }

    // 2. Cryptographic Sandbox Form submit delegation
    const cryptForm = e.target.closest('.crypt-form');
    if (cryptForm) {
      e.preventDefault();
      e.stopPropagation();
      executeDecryption();
      return;
    }

    // 3. E2E secure contact dispatch form submission delegation
    const messageForm = e.target.closest('.contact-container');
    if (messageForm) {
      e.preventDefault();
      e.stopPropagation();
      alert('Secure channel message transmission successful! Encrypted payload has been dispatched.');
      messageForm.reset();
      return;
    }
  });

  // Form Input Change Event Captures
  document.addEventListener('input', (e) => {
    const cryptInput = e.target.closest('.crypt-input');
    if (cryptInput) {
      const previewText = document.querySelector('.cipher-scrambler');
      if (previewText) {
        previewText.textContent = cryptInput.value || 'gurfntneqnuny00@tznvy.pbz';
      }
    }
  });
  
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEventDelegation);
} else {
  initEventDelegation();
}
</script>
`;
          content = content.replace('</body>', () => vanillaScript + '</body>');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[post-build] Processed: ${path.relative(outDir, filePath)} (relativePrefix: ${relativePrefix})`);
      }
    }
  });
}

if (fs.existsSync(outDir)) {
  console.log('[post-build] Starting asset path conversion and underscore folder bypass processing...');
  
  // First, process all files inside the out folder recursively
  processDirectory(outDir);
  
  // Next, rename the _next folder to next to bypass local browser security blocks on file:// protocol
  const oldNextDir = path.join(outDir, '_next');
  const newNextDir = path.join(outDir, 'next');
  
  if (fs.existsSync(oldNextDir)) {
    if (fs.existsSync(newNextDir)) {
      // Clean up existing next directory if present (e.g. from previous builds)
      fs.rmSync(newNextDir, { recursive: true, force: true });
    }
    fs.renameSync(oldNextDir, newNextDir);
    console.log('[post-build] Successfully renamed _next folder to next.');
  }
  
  console.log('[post-build] Path conversion completed successfully.');
} else {
  console.error('[post-build] Error: out/ directory does not exist.');
}
