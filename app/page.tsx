"use client";

import { FormEvent, useEffect, useState } from "react";

type Step = "landing" | "signup" | "reveal" | "brief";
type RevealPhase = "cycling" | "selected" | "blackout";

type Brief = {
  id: string;
  category: string;
  brief: string;
};

const briefs: Brief[] = [
  {
    id: "food",
    category: "Food",
    brief: "Create a fictional food brand for people who work late and want something quick, satisfying and better than takeaway. Make it modern without making it look like a wellness product."
  },
  {
    id: "automotive",
    category: "Automotive",
    brief: "Create a fictional small electric car brand for people living in crowded cities. Make it desirable, practical and culturally relevant rather than technical."
  },
  {
    id: "fashion",
    category: "Fashion",
    brief: "Create a fictional clothing brand for people moving between work, social plans and late nights. Make it considered and wearable without defaulting to obvious luxury."
  },
  {
    id: "travel-hospitality",
    category: "Travel and hospitality",
    brief: "Create a fictional travel or hospitality brand for people who want to experience a city properly rather than stay somewhere generic. Make it specific, memorable and easy to imagine using."
  },
  {
    id: "consumer-technology",
    category: "Consumer technology",
    brief: "Create a fictional technology brand that solves one everyday frustration. Make it immediately understandable and useful before it feels futuristic."
  }
];

function getUniformRandomIndex(length: number) {
  const range = 2 ** 32;
  const limit = Math.floor(range / length) * length;
  const value = new Uint32Array(1);

  do {
    window.crypto.getRandomValues(value);
  } while (value[0] >= limit);

  return value[0] % length;
}

function getBrief() {
  const saved = window.localStorage.getItem("oc-brand-brief");
  if (saved) {
    const existing = briefs.find((brief) => brief.id === saved);
    if (existing) return existing;
  }

  const next = briefs[getUniformRandomIndex(briefs.length)];
  window.localStorage.setItem("oc-brand-brief", next.id);
  return next;
}

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [revealPhase, setRevealPhase] = useState<RevealPhase>("cycling");

  useEffect(() => {
    const savedBrief = window.localStorage.getItem("oc-brand-brief");
    const savedSignup = window.localStorage.getItem("oc-brand-signup");
    if (savedBrief && savedSignup) {
      setBrief(briefs.find((item) => item.id === savedBrief) ?? null);
    }
  }, []);

  useEffect(() => {
    if (step !== "reveal" || !brief) return;

    const allocatedIndex = briefs.findIndex((item) => item.id === brief.id);
    const sequence = [
      ...briefs.map((_, index) => index),
      ...briefs.map((_, index) => index),
      ...briefs.slice(0, allocatedIndex + 1).map((_, index) => index),
    ];
    const timers: number[] = [];
    let position = 0;

    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const advance = () => {
      position += 1;
      if (position < sequence.length) {
        setRevealIndex(sequence[position]);
        schedule(advance, 240);
        return;
      }

      setRevealIndex(allocatedIndex);
      setRevealPhase("selected");
      schedule(() => {
        setRevealPhase("blackout");
        schedule(() => setStep("brief"), 280);
      }, 620);
    };

    setRevealPhase("cycling");
    setRevealIndex(sequence[0]);
    schedule(advance, 240);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [brief, step]);

  function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    window.localStorage.setItem("oc-brand-signup", email.trim());
    const allocated = getBrief();
    setBrief(allocated);
    setRevealIndex(0);
    setRevealPhase("cycling");
    setStep("reveal");
  }

  function start() {
    setStep(brief ? "brief" : "signup");
  }

  return (
    <main className={`site-shell ${step === "reveal" && revealPhase === "blackout" ? "is-blackout" : ""}`}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="StackDaily">
          <span>stac<span>k</span></span><small>daily</small>
        </a>
        <p>AI brand challenge <span>01</span></p>
      </header>

      {step === "landing" && (
        <section className="landing" id="top">
          <div className="eyebrow">StackDaily x Open Campus</div>
          <h1>GET A BRAND BRIEF.<br />MAKE IT YOURS.<br /><em>WIN $500.</em></h1>
          <p className="lead">Behind this button is a randomised fictional brand brief and your instructions. Your entry could win $500 and be reviewed live by a top AI creative.</p>
          <button className="primary-button" onClick={start}>UNLOCK YOUR BRAND BRIEF TO COMPETE <span>→</span></button>
          <div className="landing-rule" />
          <div className="stat-row" aria-label="Contest details">
            <div><strong>$500</strong><span>prize pool</span></div>
            <div><strong>5</strong><span>briefs to unlock</span></div>
          </div>
          <p className="fine-print">Create an Open Campus ID to unlock your brief. No specific AI tool required.</p>
        </section>
      )}

      {step === "signup" && (
        <section className="signup-panel">
          <button className="back" onClick={() => setStep("landing")}>← Back</button>
          <div className="eyebrow">Step 01 / Open Campus ID</div>
          <h1>UNLOCK<br />YOUR BRIEF.</h1>
          <p>Create your OC ID to unlock your brief. This is a placeholder for the Open Campus ID handoff.</p>
          <form onSubmit={submitSignup}>
            <label htmlFor="email">Email address</label>
            <div className="form-row">
              <input id="email" type="email" placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <button type="submit" className="primary-button">Continue <span>→</span></button>
            </div>
          </form>
          <p className="fine-print">The production version will continue through OC ID, then return here with the same brief.</p>
        </section>
      )}

      {step === "reveal" && brief && (
        <section className={`reveal-panel reveal-${revealPhase}`} aria-live="polite">
          <div className="eyebrow">OC ID CONFIRMED</div>
          <p>ASSIGNING YOUR BRAND BRIEF</p>
          <h1 key={revealIndex}>{briefs[revealIndex].category}</h1>
        </section>
      )}

      {step === "brief" && brief && (
        <section className="brief-panel">
          <div className="brief-topline"><span>YOUR ALLOCATED BRIEF</span><span>{brief.category}</span></div>
          <div className="brief-card">
            <div className="brief-index">0{briefs.findIndex((item) => item.id === brief.id) + 1}</div>
            <div>
              <div className="eyebrow">Your category</div>
              <h1>{brief.category}</h1>
              <p className="brand-line">You create the brand name, one-line description and finished hero visual.</p>
            </div>
          </div>
          <div className="brief-copy">
            <div>
              <span>YOUR JOB</span>
              <p>{brief.brief}</p>
              <p className="job-requirements">Give the brand a name. Write a one-line description for your X post. Create one finished hero visual.</p>
            </div>
          </div>
          <div className="entry-card">
            <div>
              <span>YOUR ENTRY</span>
              <p>Quote the challenge post with your hero visual as the asset. Your copy must include:</p>
              <ul className="entry-requirements">
                <li>the brand name</li>
                <li>the brand's one-liner</li>
                <li>the fact that this is an entry for the @stackdailyxyz $500 brand challenge</li>
              </ul>
            </div>
            <a className="primary-button" href="https://x.com/stackdailyxyz" target="_blank" rel="noreferrer">Open the challenge post <span>→</span></a>
          </div>
          <p className="fine-print">Entries are judged on clear idea, distinctive point of view, visual quality, consistency, and brand potential.</p>
        </section>
      )}
    </main>
  );
}
