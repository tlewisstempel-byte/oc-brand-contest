"use client";

import { FormEvent, useEffect, useState } from "react";

type Step = "landing" | "signup" | "brief";

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

function getBrief() {
  const saved = window.localStorage.getItem("oc-brand-brief");
  if (saved) {
    const existing = briefs.find((brief) => brief.id === saved);
    if (existing) return existing;
  }

  const next = briefs[Math.floor(Math.random() * briefs.length)];
  window.localStorage.setItem("oc-brand-brief", next.id);
  return next;
}

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);

  useEffect(() => {
    const savedBrief = window.localStorage.getItem("oc-brand-brief");
    const savedSignup = window.localStorage.getItem("oc-brand-signup");
    if (savedBrief && savedSignup) {
      setBrief(briefs.find((item) => item.id === savedBrief) ?? null);
    }
  }, []);

  function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    window.localStorage.setItem("oc-brand-signup", email.trim());
    const allocated = getBrief();
    setBrief(allocated);
    setStep("brief");
  }

  function start() {
    setStep(brief ? "brief" : "signup");
  }

  return (
    <main className="site-shell">
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
          <p className="lead">Five fictional brand briefs. One finished hero visual. Your entry could win $500 and be reviewed live by a top AI creative.</p>
          <button className="primary-button" onClick={start}>Take part in the brand contest <span>→</span></button>
          <div className="landing-rule" />
          <div className="stat-row" aria-label="Contest details">
            <div><strong>$500</strong><span>prize pool</span></div>
            <div><strong>5</strong><span>briefs to unlock</span></div>
            <div><strong>07 AUG</strong><span>stream with Amir</span></div>
          </div>
          <p className="fine-print">Create an Open Campus ID to unlock your brief. No specific AI tool required.</p>
        </section>
      )}

      {step === "signup" && (
        <section className="signup-panel">
          <button className="back" onClick={() => setStep("landing")}>← Back</button>
          <div className="eyebrow">Step 01 / Open Campus ID</div>
          <h1>UNLOCK<br />YOUR BRIEF.</h1>
          <p>Sign in to take part. This is a placeholder for the Open Campus ID handoff.</p>
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
              <p>Make your own brand name, one-line description and hero visual. Then quote the challenge post with all three.</p>
            </div>
            <a className="primary-button" href="https://x.com/stackdailyxyz" target="_blank" rel="noreferrer">Open the challenge post <span>→</span></a>
          </div>
          <p className="fine-print">Entries are judged on clarity, originality, visual quality, how well the brand hangs together, and whether anyone would want to follow it.</p>
        </section>
      )}
    </main>
  );
}
