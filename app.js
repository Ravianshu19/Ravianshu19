/* ----------------------------------------------------
   RaviOS v4.0 INTERACTIVE ENGINE
   Aesthetic: Apple Vision Pro x Linear x Cyberpunk 2077
---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initMouseSpotlight();
  initTiltEffect();
  initTerminal();
  initProcessSimulation();
  initAmbientAudio();
});

/* ====================================================
   1. SYSTEM CLOCK
   ==================================================== */
function initClock() {
  const clockEl = document.getElementById('os-clock');
  if (!clockEl) return;
  
  function updateTime() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}:${secs}`;
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}

/* ====================================================
   2. MOUSE SPOTLIGHT GLOW
   ==================================================== */
function initMouseSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;
  
  window.addEventListener('mousemove', (e) => {
    // Update global CSS variables for radial gradient spotlights
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* ====================================================
   3. SPATIAL UI 3D TILT EFFECT
   ==================================================== */
function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      
      // Calculate local mouse position on the card (0 to width/height)
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize to -0.5 to 0.5 range
      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;
      
      // Compute tilt angles (max 8 degrees tilt for premium look)
      const tiltX = (normY * -8).toFixed(2);
      const tiltY = (normX * 8).toFixed(2);
      
      // Set localized mouse coords for the card's inner glow gradient
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Apply 3D rotation and translate offset
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Smoothly reset transformations when cursor exits card
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ====================================================
   4. INTERACTIVE TERMINAL
   ==================================================== */
function initTerminal() {
  const termBody = document.getElementById('terminal-body');
  const termOutput = document.getElementById('terminal-output');
  const termInput = document.getElementById('terminal-input');
  
  if (!termBody || !termOutput || !termInput) return;
  
  // Clicking the terminal panel focuses the hidden input field
  termBody.addEventListener('click', () => {
    termInput.focus();
  });
  
  // Command registry mapping inputs to response strings or generator functions
  const commands = {
    help: () => `
RaviOS v4.0.2 Command Telemetry Directory:
  whoami      - Print core developer credentials
  skills      - Query integrated technical capabilities
  projects    - List active digital system threads
  telemetry   - Run local system & agent diagnostics
  connect     - Establish link vectors (Gmail, GitHub)
  clear       - Wipe terminal database scrollback
  help        - Read this operation directory
`,
    whoami: () => `
$ whoami
------------------------------------------------
USER: Ravi Anshu
ROLE: AI Backend & ML Engineer
MOTTO: "Building intelligent systems, one commit at a time."
------------------------------------------------
Currently engineering autonomous search agents, real-time
financial sentiment pipelines, and large-scale data 
analytics frameworks.
`,
    skills: () => `
$ query_matrix --capabilities
------------------------------------------------
AI & MACHINE LEARNING / AGENTIC SYSTEMS
  - Python (Core Engine)
  - LangChain / LangGraph (Autonomous Multi-Agent planning)
  - Transformers & NLP (Sentiment analysis, FinBERT models)
  - Pandas / NumPy / Scikit-Learn (Pipelines & Regression)
  - Data Visualizations (Matplotlib, Seaborn, Streamlit dashboards)

BACKEND ARCHITECTURE & DEVTOOLS
  - FastAPI (REST APIs / Microservices)
  - Redis (Caching / Message Broker)
  - Celery (Distributed Job Queues)
  - PostgreSQL / MongoDB (Structured & NoSQL data)
  - Docker & Git (Process isolation & control)
  - Model Context Protocol (MCP) server design
`,
    projects: () => `
$ list_active_threads
------------------------------------------------
🟢 Agentic Research Workflow [Active]
   - Autonomous AI multi-agent research workflow built with LangGraph.
   - Coordinates planning, web scraping, and content synthesis to generate verified reports.
   - Link: <a href="https://github.com/Ravianshu19/AI-ML/tree/main/01-Agentic-Research-Workflow" target="_blank" class="cyan-text">github.com/Ravianshu19/AI-ML/.../01-Agentic-Research-Workflow</a>

🟢 Electric Vehicles Market Analysis [Data Science]
   - Large-scale data analysis and market intelligence platform.
   - Explores EV registrations, clean energy adoption patterns, and utility data.
   - Link: <a href="https://github.com/Ravianshu19/Data-Science/tree/main/Electric-Vehicles-Market-Analysis" target="_blank" class="cyan-text">github.com/Ravianshu19/Data-Science/.../Electric-Vehicles-Market-Analysis</a>

🟢 Financial Market Intelligence [Active]
   - Real-time financial data aggregation and sentiment intelligence platform.
   - Ingests news streams, evaluates sentiments, and maps financial indicators.
   - Link: <a href="https://github.com/Ravianshu19/Financial-Market-Intelligence" target="_blank" class="cyan-text">github.com/Ravianshu19/Financial-Market-Intelligence</a>
`,
    telemetry: () => {
      const cpu = (60 + Math.random() * 20).toFixed(1);
      const ram = (10.5 + Math.random() * 2).toFixed(1);
      const latency = Math.floor(10 + Math.random() * 15);
      return `
$ systemctl status --diagnostics
------------------------------------------------
COGNITIVE THREAD: RaviOS_v4.0.2_Production
LATENCY:          ${latency}ms
CPU_UTILIZATION:  ${cpu}%
MEMORY_USED:      ${ram} GB / 16.0 GB
NET_THROUGHPUT:   948 Mbps (ENCRYPTED)
RESEARCH_QUEUE:   Active LangGraph threads running
FINANCIAL_STREAM: NewsAPI aggregation pipeline online
------------------------------------------------
ALL CORE PORTFOLIO CHANNELS OPERATIVE.
`;
    },
    connect: () => `
$ establish_comms
------------------------------------------------
LINK VECTOR 1: email -> <a href="mailto:ravianshu278@gmail.com" class="cyan-text">ravianshu278@gmail.com</a>
LINK VECTOR 2: github -> <a href="https://github.com/Ravianshu19" target="_blank" class="cyan-text">github.com/Ravianshu19</a>
------------------------------------------------
INITIATE CONTACT PROTOCOLS.
`
  };
  
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const fullCmd = termInput.value.trim();
      termInput.value = '';
      
      if (!fullCmd) return;
      
      // Echo the typed prompt
      const promptLine = document.createElement('div');
      promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span class="terminal-prompt">ravios@Ravianshu19:~#</span> ${fullCmd}`;
      termOutput.appendChild(promptLine);
      
      // Parse command name (case-insensitive)
      const cmdParts = fullCmd.toLowerCase().split(' ');
      const mainCmd = cmdParts[0];
      
      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line';
      
      if (mainCmd === 'clear') {
        termOutput.innerHTML = '';
      } else if (commands[mainCmd]) {
        responseLine.innerHTML = commands[mainCmd]();
        termOutput.appendChild(responseLine);
      } else {
        responseLine.className = 'terminal-line text-error';
        responseLine.textContent = `Command not recognized: '${fullCmd}'. Type 'help' for directories.`;
        termOutput.appendChild(responseLine);
      }
      
      // Auto scroll terminal to the bottom
      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}

/* ====================================================
   5. TELEMETRY PROCESS SIMULATOR
   ==================================================== */
function initProcessSimulation() {
  const bars = document.querySelectorAll('.process-bar');
  const statuses = document.querySelectorAll('.process-status.blinking');
  
  setInterval(() => {
    // Fluctuates progress bars slightly to simulate active calculations
    bars.forEach(bar => {
      if (bar.classList.contains('progress-slate')) return; // idle
      
      const currentWidth = parseFloat(bar.style.width);
      // Fluctuate by +/- 5% (clamp between 50% and 95%)
      const delta = (Math.random() - 0.5) * 8;
      let newWidth = Math.max(50, Math.min(95, currentWidth + delta));
      bar.style.width = `${newWidth.toFixed(1)}%`;
    });
    
    // Simulate updating latency display in status bar
    const latencyEl = document.querySelector('.telemetry-latency');
    if (latencyEl) {
      const newLatency = Math.floor(11 + Math.random() * 8);
      latencyEl.textContent = `PING: ${newLatency}ms`;
    }
  }, 2500);
}

/* ====================================================
   6. AMBIENT LO-FI AUDIO SYNTHESIZER
   ==================================================== */
function initAmbientAudio() {
  const soundBtn = document.getElementById('sound-btn');
  const recordVinyl = document.querySelector('.record-vinyl');
  const visBars = document.querySelectorAll('.vis-bar');
  
  if (!soundBtn) return;
  
  let audioCtx = null;
  let synthNodes = []; // store oscillators and gain nodes
  let isPlaying = false;
  
  soundBtn.addEventListener('click', () => {
    if (!isPlaying) {
      // Start synthesiser
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      playAmbientChord();
      soundBtn.querySelector('.btn-icon').textContent = '🔊';
      soundBtn.querySelector('.btn-text').textContent = 'MUTE AUDIO';
      recordVinyl.classList.add('spinning');
      
      visBars.forEach(bar => bar.classList.add('playing'));
      isPlaying = true;
    } else {
      // Stop synthesiser
      stopAmbientChord();
      soundBtn.querySelector('.btn-icon').textContent = '🔇';
      soundBtn.querySelector('.btn-text').textContent = 'UNMUTE AUDIO';
      recordVinyl.classList.remove('spinning');
      
      visBars.forEach(bar => bar.classList.remove('playing'));
      isPlaying = false;
    }
  });
  
  function playAmbientChord() {
    // Generate a warm, immersive lo-fi synthesizer drone using Web Audio API
    // Chord: C2 (65.41Hz), G2 (97.99Hz), C3 (130.81Hz), E3 (164.81Hz)
    const frequencies = [65.41, 97.99, 130.81, 164.81];
    
    // Main Volume gain node
    const masterGain = audioCtx.createGain();
    // Lowpass filter to make it sound warm, soft, and lo-fi (spatial ambient)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, audioCtx.currentTime); // filter out higher frequencies
    filter.Q.setValueAtTime(2, audioCtx.currentTime);
    
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime); // fade in from silence
    masterGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 3.0); // 3 second fade in
    
    // Connect nodes
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    synthNodes.push(masterGain, filter);
    
    frequencies.forEach((freq, idx) => {
      // Oscillators: triangle wave for warm organic texture
      const osc = audioCtx.createOscillator();
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      // Detune slightly for lush chorus effect
      osc.detune.setValueAtTime((Math.random() - 0.5) * 12, audioCtx.currentTime);
      
      // Local oscillator gain node (individual note balancing)
      const oscGain = audioCtx.createGain();
      oscGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.25, audioCtx.currentTime);
      
      // Slow LFO modulation for volume swells
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, audioCtx.currentTime); // very slow oscillation (0.1Hz - 0.3Hz)
      lfoGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      
      osc.connect(oscGain);
      oscGain.connect(filter);
      
      osc.start();
      lfo.start();
      
      synthNodes.push(osc, lfo, oscGain, lfoGain);
    });
  }
  
  function stopAmbientChord() {
    // Fade out gain node smoothly to prevent sudden audio clicks
    const masterGain = synthNodes[0];
    if (masterGain && audioCtx) {
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8); // 800ms fade out
      setTimeout(() => {
        // Disconnect and stop all active nodes
        synthNodes.forEach(node => {
          try {
            node.stop();
          } catch(e) {}
          try {
            node.disconnect();
          } catch(e) {}
        });
        synthNodes = [];
      }, 900);
    }
  }
}
