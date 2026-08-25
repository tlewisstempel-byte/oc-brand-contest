"use client";

import { useState } from "react";
import "./activation.css";

type PathId = "creator" | "builder" | "investor";

const paths: Record<PathId, { label: string; strap: string; challenge: string; detail: string; reward: string; action: string }> = {
  creator: { label: "CREATOR", strap: "MAKE SOMETHING PEOPLE WANT TO SEE.", challenge: "Create one piece of content using the sponsor’s product.", detail: "Share the result or submit it here. The sponsor decides what gets rewarded.", reward: "creator reward", action: "START THE CREATOR CHALLENGE" },
  builder: { label: "BUILDER", strap: "BUILD SOMETHING WITH IT.", challenge: "Log in. Use the product. Make one useful thing.", detail: "Complete the product action and unlock credits, access, or a builder-only reward.", reward: "product credits", action: "START THE BUILDER CHALLENGE" },
  investor: { label: "INVESTOR", strap: "SEE THE PRODUCT CLEARLY.", challenge: "Answer three questions about the product and where it goes next.", detail: "Show that you understand the opportunity. Unlock the sponsor’s deck or briefing.", reward: "the investor deck", action: "START THE INVESTOR CHALLENGE" }
};

export default function ActivationPage() {
  const [stage, setStage] = useState<"landing" | "demo" | "path" | "challenge" | "reward">("landing");
  const [selectedPath, setSelectedPath] = useState<PathId | null>(null);
  const [completed, setCompleted] = useState(false);
  const path = selectedPath ? paths[selectedPath] : null;

  function choosePath(id: PathId) {
    setSelectedPath(id);
    setCompleted(false);
    setStage("challenge");
  }

  function completeChallenge(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompleted(true);
    setStage("reward");
  }

  return (
    <main className="activation-shell">
      <header className="activation-header">
        <a className="wordmark" href="/" aria-label="StackDaily"><span>stac<span>k</span></span><small>daily</small></a>
        <p>SPONSOR ACTIVATION <span>01</span></p>
      </header>

      {stage === "landing" && <section className="activation-hero">
        <div className="eyebrow">StackDaily / Sponsor Activation</div>
        <h1>TURN ATTENTION<br />INTO <em>ACTION.</em></h1>
        <p className="activation-lead">Give every attendee a reason to choose a path, use your product and unlock something worth having.</p>
        <button className="primary-button activation-cta" onClick={() => setStage("demo")}>SEE THE ATTENDEE JOURNEY <span>→</span></button>
        <div className="activation-proof"><div><strong>PRE</strong><span>Signups before the event</span></div><div><strong>AT</strong><span>A clear action at the booth</span></div><div><strong>POST</strong><span>Product use after they leave</span></div></div>
        <p className="activation-note">Reserve a path before the event. Scan at the booth if you arrive cold. A simple digital layer around the event you already paid for.</p>
        <a className="faq-link" href="/activation/faq">HOW IS THIS DIFFERENT? →</a>
      </section>}

      {stage === "demo" && <section className="activation-demo-intro">
        <div className="demo-kicker"><span>SPONSOR VIEW</span><span>01 / 03</span></div>
        <div className="demo-split"><div><div className="eyebrow">Now show the attendee</div><h2>THE BOOTH<br />IS THE <em>START.</em></h2><p>Before the event, people reserve a path. At the booth, they scan and skip straight in. Either way, they choose what they are, do something useful and unlock the right reward.</p><div className="route-note"><span>BEFORE</span>Reserve your challenge<br /><span>AT THE BOOTH</span>Scan to start</div><button className="primary-button" onClick={() => setStage("path")}>OPEN THE ATTENDEE VIEW <span>→</span></button></div>
          <div className="demo-card demo-card--preview"><div className="demo-card-topline"><span>SPONSOR / LIVE</span><span>STACKDAILY</span></div><div className="demo-card-body"><div className="eyebrow">Your challenge is ready</div><h3>CHOOSE<br />YOUR <em>PATH.</em></h3><p>Do something useful with the product. Unlock the reward that fits.</p><div className="fake-choices"><span>CREATOR</span><span>BUILDER</span><span>INVESTOR</span></div></div></div>
        </div>
      </section>}

      {stage === "path" && <section className="activation-attendee">
        <div className="attendee-topline"><span>STACKDAILY / LIVE CHALLENGE</span><span>AT THE BOOTH OR ONLINE</span></div>
        <div className="attendee-heading"><div className="eyebrow">Your challenge is ready</div><h2>CHOOSE<br />YOUR <em>PATH.</em></h2><p>There is no wrong answer. Pick the thing you actually want to do.</p></div>
        <div className="path-grid">{(Object.keys(paths) as PathId[]).map((id, index) => { const item = paths[id]; return <button className="path-card" key={id} onClick={() => choosePath(id)}><span className="path-number">0{index + 1}</span><span className="path-label">{item.label}</span><span className="path-strap">{item.strap}</span><span className="path-arrow">→</span></button>; })}</div>
        <p className="activation-note">The sponsor sees the path you chose, not just that you scanned a code.</p>
      </section>}

      {stage === "challenge" && path && <section className="activation-attendee challenge-view">
        <button className="back-button" onClick={() => setStage("path")}>← Choose another path</button>
        <div className="attendee-topline"><span>PATH / {path.label}</span><span>CHALLENGE 01</span></div>
        <div className="challenge-layout"><div><div className="eyebrow">{path.label} challenge</div><h2>{path.strap}</h2><p className="challenge-copy">{path.challenge}</p><p className="challenge-detail">{path.detail}</p>
          <form className="mock-form" onSubmit={completeChallenge}>
            {selectedPath === "investor" && <><label htmlFor="market">01 / Who is this product for?</label><select id="market" required defaultValue=""><option value="" disabled>Choose one</option><option>People building faster</option><option>Enterprise procurement teams</option><option>People looking for a new social network</option></select><label htmlFor="signal">02 / What is the strongest signal?</label><select id="signal" required defaultValue=""><option value="" disabled>Choose one</option><option>Product use</option><option>Logo visibility</option><option>Booth footfall</option></select><label htmlFor="next">03 / What do you want next?</label><select id="next" required defaultValue=""><option value="" disabled>Choose one</option><option>The deck</option><option>A founder conversation</option><option>A technical demo</option></select></>}
            {selectedPath === "creator" && <><label htmlFor="post">Paste your post or draft link</label><input id="post" type="url" placeholder="https://x.com/you/status/..." required /><label className="check-row"><input type="checkbox" required /> I made this for the challenge.</label></>}
            {selectedPath === "builder" && <><label htmlFor="builder-email">Email for your builder access</label><input id="builder-email" type="email" placeholder="you@company.com" required /><label className="check-row"><input type="checkbox" required /> I logged in and used the product.</label></>}
            <button className="primary-button" type="submit">{path.action} <span>→</span></button>
          </form>
        </div><div className="reward-preview"><span>WHEN YOU FINISH</span><strong>UNLOCK<br />{path.reward.toUpperCase()}.</strong><small>Reward supplied by the sponsor.</small></div></div>
      </section>}

      {stage === "reward" && path && <section className="activation-attendee reward-view">
        <div className="eyebrow">Challenge complete</div><h2>YOU’RE <em>IN.</em></h2><p>You chose the {path.label.toLowerCase()} path. The sponsor now knows what you came to do—and what to send you next.</p><div className="reward-unlock"><span>YOUR REWARD</span><strong>{selectedPath === "investor" ? "HERE’S THE DECK." : selectedPath === "creator" ? "YOUR AIRDROP IS READY." : "CREDITS UNLOCKED."}</strong><small>{completed ? "Unlocked by StackDaily. Supplied by the sponsor." : "Unlocked by StackDaily."}</small></div><button className="primary-button" onClick={() => setStage("landing")}>BACK TO THE SPONSOR VIEW <span>→</span></button>
      </section>}
    </main>
  );
}
