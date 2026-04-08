import { useEffect, useRef, useCallback } from 'react'

/* ── Scroll reveal ── */
function useReveal() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    targets.forEach(t => obs.observe(t))
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── Smooth scroll ── */
function smoothScrollTo(targetId) {
  const el = document.getElementById(targetId)
  if (!el) return
  const start = window.scrollY
  const end = el.getBoundingClientRect().top + window.scrollY - 80
  const distance = end - start
  const duration = Math.min(1200, Math.max(600, Math.abs(distance) * 0.4))
  let startTime = null
  function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2 }
  function step(ts) {
    if (!startTime) startTime = ts
    const p = Math.min((ts - startTime) / duration, 1)
    window.scrollTo(0, start + distance * ease(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function NextChapter({ targetId, label }) {
  const handleClick = useCallback((e) => { e.preventDefault(); smoothScrollTo(targetId) }, [targetId])
  return (
    <div className="next-chapter">
      <div className="next-chapter-line" />
      <button className="next-chapter-btn" onClick={handleClick}>
        <span className="next-chapter-label">{label}</span>
        <span className="next-chapter-arrow">↓</span>
      </button>
      <div className="next-chapter-line" />
    </div>
  )
}

/* ── Data ── */
const journeyPhases = [
  { emoji: '🚀', phase: 'Fast Execution', time: 'Month 1–2', title: 'First Release in 1.5 Months', desc: 'Delivered the first release of TheTicketBazaar within 1.5 months. Continued rapid iterations post-launch.' },
  { emoji: '🔄', phase: 'Business Exposure', time: 'Month 3–5', title: 'Expanded into Marketing & Sales', desc: 'Shifted into marketing and offline sales. Executed on-ground activations, closed deals, and started handling customer interactions.' },
  { emoji: '🧠', phase: 'Tech Leadership', time: 'Month 6–8', title: 'Took Ownership of Tech', desc: 'Defined architecture, tech stack, and system decisions. Led frontend and backend execution for the platform.' },
  { emoji: '⚡', phase: 'Business Continuity', time: '3-Month Critical Period', title: 'Operated Through PM Exit', desc: 'After the PM exited, operated with just 2 members. Covered product planning, sales, customer handling, and execution. Sustained and grew TheTicketBazaar.' },
  { emoji: '🧩', phase: 'Multi-Domain Impact', time: 'Ongoing', title: 'AI Systems & Client Projects', desc: 'Contributed to AI systems (cloud + deployment), client projects like Titan, Skant, and Farm2Fam, and marketing initiatives.' },
  { emoji: '🌱', phase: 'Current', time: 'Now', title: 'Multi-Product Ownership', desc: 'Driving TheTicketBazaar (growth + scale) and Astrofin (0→1 product planning & research).' },
]

const ownership = [
  { icon: '💻', title: 'Technology', items: ['Full ownership of frontend + backend', 'Architecture and tech stack decisions', 'Delivered 4 major releases', 'Complete UI + system revamp'] },
  { icon: '☁️', title: 'Cloud & Deployment (AI)', items: ['Owned end-to-end deployment infrastructure', 'Managed hosting and system deployments', 'Ensured stability of AI dashboards & services'] },
  { icon: '📈', title: 'Product & Planning', items: ['Defined product direction during gaps', 'Worked on feature planning and improvements', 'Drove user experience decisions'] },
  { icon: '💰', title: 'Business Functions', items: ['Sales and customer support', 'Marketing — offline and digital', 'Social media growth and engagement'] },
  { icon: '🤝', title: 'Client Delivery', items: ['End-to-end delivery for urgent client projects', 'Full lifecycle: requirement → deployment', 'Projects: Titan, Skant, Farm2Fam'] },
  { icon: '🤖', title: 'AI Team Contributions', items: ['Built dashboards and systems', 'Designed landing pages', 'Owned cloud + deployment pipeline'] },
]

const impactStats = [
  { number: '20→1000+', label: 'Monthly users growth' },
  { number: '12→82+', label: 'Transactions growth' },
  { number: '90→620+', label: 'Social media followers' },
  { number: '4', label: 'Major releases shipped' },
]

const strengths = [
  { icon: '🎯', title: 'Extreme Ownership', desc: 'Stepped up across every domain the product needed' },
  { icon: '🔄', title: '0→1 Builder Mindset', desc: 'Built products and systems from scratch' },
  { icon: '⚡', title: 'Cross-Functional Execution', desc: 'Tech + business + client — all in the same day' },
  { icon: '☁️', title: 'Cloud & System Thinking', desc: 'Owned AI deployment infra and system reliability' },
  { icon: '🛡️', title: 'Reliability Under Pressure', desc: 'Sustained business through team gaps and crises' },
  { icon: '💨', title: 'Fast Execution Speed', desc: 'First release in 1.5 months, rapid iterations after' },
]

export default function App() {
  const appRef = useReveal()
  const nav = useCallback((e, id) => { e.preventDefault(); smoothScrollTo(id) }, [])

  return (
    <div className="app" ref={appRef}>

      {/* Nav */}
      <nav className="nav">
        <button className="nav-name" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
          <span>Dhiraj Sahu</span>
        </button>
        <ul className="nav-links">
          <li><a href="#journey" onClick={(e) => nav(e, 'journey')}>Journey</a></li>
          <li><a href="#ownership" onClick={(e) => nav(e, 'ownership')}>Ownership</a></li>
          <li><a href="#crisis" onClick={(e) => nav(e, 'crisis')}>Resilience</a></li>
          <li><a href="#impact" onClick={(e) => nav(e, 'impact')}>Impact</a></li>
          <li><a href="#vision" onClick={(e) => nav(e, 'vision')}>Vision</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-glow one" />
        <div className="hero-bg-glow two" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            Performance Review 2025–26
          </div>
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">
            Dhiraj Sahu<br />
            <span className="gradient-text">Adaptable Builder, Relentless Executor</span>
          </h1>
          <p className="hero-desc">
            I evolved from an execution-focused developer to someone contributing across
            product, tech, and business outcomes — end-to-end. This is that story.
          </p>
          <button className="hero-start-btn" onClick={() => smoothScrollTo('role')}>
            <span>Let's see the Evolution</span>
            <span className="hero-start-arrow">↓</span>
          </button>
        </div>
      </section>

      {/* Ch 1 — Role Evolution */}
      <section className="evolution-section" id="role">
        <div className="chapter-number reveal">Chapter 01 — Role Evolution</div>
        <p className="evolution-narrative reveal delay-1">
          Joined as a <strong>Full Stack Developer</strong> for TheTicketBazaar.
          Transitioned into tech ownership, cloud & deployment lead for AI systems,
          product & planning contributor, and marketing, sales & customer operations executor.
        </p>
        <div className="evolution-timeline reveal delay-2">
          <div className="evo-step">
            <div className="evo-step-label">Hired As</div>
            <div className="evo-step-title">Full Stack Developer</div>
            <div className="evo-step-desc">Building and maintaining TheTicketBazaar — the ticket resale product.</div>
          </div>
          <div className="evo-step">
            <div className="evo-step-label">Grew Into</div>
            <div className="evo-step-title">Tech Owner + Cloud Lead</div>
            <div className="evo-step-desc">Frontend, backend, architecture decisions, plus AI system deployments.</div>
          </div>
          <div className="evo-step highlight">
            <div className="evo-step-label">Today</div>
            <div className="evo-step-title">Product & Business Contributor</div>
            <div className="evo-step-desc">Contributing across tech, product planning, marketing, sales, support, and client delivery.</div>
          </div>
        </div>
      </section>

      <NextChapter targetId="journey" label="Let's see the Journey" />

      {/* Ch 2 — Journey Timeline */}
      <section className="journey-section" id="journey">
        <div className="chapter-number reveal">Chapter 02 — The Journey</div>
        <p className="journey-narrative reveal delay-1">
          Not a straight line — a series of <strong>expansions</strong>. Each phase
          brought new responsibilities, and I adapted to deliver across all of them.
        </p>
        <div className="timeline reveal delay-2">
          {journeyPhases.map((p, i) => (
            <div className={`timeline-item ${i === 3 ? 'crisis' : ''}`} key={i}>
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {i < journeyPhases.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-phase">
                  <span className="timeline-emoji">{p.emoji}</span>
                  <span className="timeline-phase-label">{p.phase}</span>
                  <span className="timeline-time">{p.time}</span>
                </div>
                <h3 className="timeline-title">{p.title}</h3>
                <p className="timeline-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NextChapter targetId="ownership" label="Let's see the Ownership Areas" />

      {/* Ch 3 — Ownership Areas */}
      <section className="contrib-section" id="ownership">
        <div className="chapter-number reveal">Chapter 03 — Ownership Areas</div>
        <p className="contrib-narrative reveal delay-1">
          From core tech to cloud infrastructure to business functions —
          these are the <strong>domains I contributed to</strong> alongside the team.
        </p>
        <div className="contrib-grid reveal delay-2">
          {ownership.map((c, i) => (
            <div className="contrib-card" key={i}>
              <span className="contrib-card-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <ul>
                {c.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <NextChapter targetId="crisis" label="Let's see the Resilience" />

      {/* Ch 4 — Crisis Handling */}
      <section className="crisis-section" id="crisis">
        <div className="chapter-number reveal">Chapter 04 — Crisis & Resilience</div>
        <p className="crisis-narrative reveal delay-1">
          The real test of adaptability isn't when things go well —
          it's <strong>when the team shrinks and the stakes stay the same</strong>.
        </p>
        <div className="crisis-card reveal delay-2">
          <div className="crisis-header">
            <span className="crisis-badge">⚡ Critical Period — 3 Months</span>
            <h3>Operating Through the PM Exit</h3>
          </div>
          <p className="crisis-desc">
            After the Product Manager exited, the entire product was handled by just 2 members.
            I stepped up to cover product planning, sales, customer management, and execution —
            ensuring business continuity and growth didn't stall.
          </p>
          <div className="crisis-covered">
            <div className="crisis-covered-title">Responsibilities covered:</div>
            <div className="crisis-tags">
              <span>Product Planning</span>
              <span>Execution</span>
              <span>Sales</span>
              <span>Customer Management</span>
              <span>Product Decisions</span>
            </div>
          </div>
          <div className="crisis-result">
            <span className="crisis-result-icon">✓</span>
            <span>Business continuity maintained. Growth did not stall.</span>
          </div>
        </div>
      </section>

      <NextChapter targetId="cross" label="Let's see Cross-Team Work" />

      {/* Ch 5 — Cross-Team Contributions */}
      <section className="cases-section" id="cross">
        <div className="chapter-number reveal">Chapter 05 — Cross-Team Contributions</div>
        <p className="cases-narrative reveal delay-1">
          Beyond TheTicketBazaar — I contributed to <strong>multiple teams and projects</strong> whenever
          the need arose.
        </p>
        <div className="case-card reveal delay-2">
          <div>
            <span className="case-tag">AI Team</span>
            <h3>Full Stack for AI Team</h3>
            <p>Built dashboards and systems for the AI team, designed landing pages, and owned the cloud + deployment pipeline for AI services.</p>
          </div>
          <div className="case-outcomes">
            <div className="case-outcome"><span className="check">✓</span>AI dashboards shipped</div>
            <div className="case-outcome"><span className="check">✓</span>Deployment infra owned</div>
            <div className="case-outcome"><span className="check">✓</span>System reliability ensured</div>
          </div>
        </div>
        <div className="case-card reveal delay-3">
          <div>
            <span className="case-tag">Client Projects</span>
            <h3>Titan, Skant & Farm2Fam</h3>
            <p>Delivered under urgency for Titan and Skant. For Farm2Fam, owned the full lifecycle — client communication, requirements, development, and deployment.</p>
          </div>
          <div className="case-outcomes">
            <div className="case-outcome"><span className="check">✓</span>Full lifecycle delivery</div>
            <div className="case-outcome"><span className="check">✓</span>Direct client communication</div>
            <div className="case-outcome"><span className="check">✓</span>Delivered under tight timelines</div>
          </div>
        </div>
      </section>

      <NextChapter targetId="impact" label="Let's see the Impact" />

      {/* Ch 6 — Impact Metrics */}
      <section className="impact-section" id="impact">
        <div className="impact-inner">
          <div className="chapter-number reveal">Chapter 06 — Impact Metrics</div>
          <p className="impact-narrative reveal delay-1">
            The numbers that show what all this adaptability and execution
            <strong> actually added up to</strong>.
          </p>
          <div className="impact-grid reveal delay-2">
            {impactStats.map((s, i) => (
              <div className="impact-stat" key={i}>
                <div className="impact-stat-number">{s.number}</div>
                <div className="impact-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="strengths-row reveal delay-3">
            {strengths.map((s, i) => (
              <div className="strength-cell" key={i}>
                <span className="strength-cell-icon">{s.icon}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NextChapter targetId="vision" label="Let's see the Vision" />

      {/* Ch 7 — Future Vision */}
      <section className="vision-section" id="vision">
        <div className="chapter-number reveal">Chapter 07 — Future Vision</div>
        <p className="vision-narrative reveal delay-1">
          Going forward, I want to contribute not just as a developer, but as someone
          who <strong>directly impacts revenue, product success, and company growth</strong>.
        </p>
        <div className="vision-grid reveal delay-2">
          <div className="vision-card">
            <span className="vision-card-icon">📈</span>
            <h3>Scale TheTicketBazaar</h3>
            <p>
              Target 100–150 stable monthly transactions. Focus on strong buyer + seller
              experience, retention, and repeat usage.
            </p>
          </div>
          <div className="vision-card">
            <span className="vision-card-icon">🚀</span>
            <h3>Build Astrofin (0→1 → PMF)</h3>
            <p>
              Achieve first 100 transacting users. Validate product-market fit,
              strengthen market positioning and user journey.
            </p>
          </div>
          <div className="vision-card">
            <span className="vision-card-icon">💰</span>
            <h3>Revenue Contribution to Atrina</h3>
            <p>
              Bring at least one direct revenue stream through client acquisition
              and meaningful partnerships.
            </p>
          </div>
        </div>
      </section>

      <NextChapter targetId="the-ask" label="Let's Talk Growth" />

      {/* The Ask */}
      <section className="cta-section" id="the-ask">
        <div className="cta-inner reveal">
          <h2>Year Revisited</h2>
          <p className="cta-heart">
            Since we're in the entertainment business — let me put it this way.
            The last 1 year was nothing short of a movie. And to be really very honest,
            more than the story, I loved the cast I'm working with. The team that always
            pushes me to be a tad bit better than I was the previous day. I would've been
            in a shell always if it wasn't for the team I got.
          </p>
          <p className="cta-thanks">
            Special thanks to Amol sir, Keval, Anamika, Yash, Pranjal & Rushi.
          </p>
          <p className="cta-ask">
            I'd love to discuss a role and compensation revision that reflects
            this journey and the contribution I've been able to make.
          </p>
          <button className="cta-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to the Top ↑
          </button>
        </div>
      </section>

      <footer className="footer">
        Dhiraj Sahu · Performance Review 2025–26
      </footer>
    </div>
  )
}
