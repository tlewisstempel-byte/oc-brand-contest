"use client";

import { useState } from "react";
import "./activation.css";

type PathId = "creator" | "builder" | "investor";

const paths: Record<PathId, { label: string; strap: string; challenge: string; detail: string; reward: string; action: string }> = {
  creator: { label: "CREATOR", strap: "MAKE A PIECE OF CONTENT WITH THE PRODUCT.", challenge: "Create one piece of content using the sponsor’s product.", detail: "Submit the link. The sponsor sets the reward.", reward: "creator reward", action: "START THE CREATOR CHALLENGE" },
  builder: { label: "BUILDER", strap: "USE THE PRODUCT AND COMPLETE A TASK.", challenge: "Create an account and complete the product task.", detail: "Show product use. The sponsor issues the credits.", reward: "product credits", action: "START THE BUILDER CHALLENGE" },
  investor: { label: "INVESTOR", strap: "ANSWER THE QUESTIONS. OPEN THE DECK.", challenge: "Answer three questions about the product and its market.", detail: "The sponsor shares the deck when the quiz is complete.", reward: "the investor deck", action: "START THE INVESTOR CHALLENGE" }
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
        <div className="eyebrow">StackDaily / Event activation</div>
        <h1>QUALIFY THE PEOPLE<br />WHO REACH<br />YOUR <em>BOOTH.</em></h1>
        <p className="activation-lead">Give each attendee a path that matches how they can use your product. They can reserve it before the event or start at the booth.</p>
        <button className="primary-button activation-cta" onClick={() => setStage("demo")}>SEE THE ATTENDEE FLOW <span>→</span></button>
        <div className="activation-proof"><div><strong>BEFORE</strong><span>Reserve a path</span></div><div><strong>BOOTH</strong><span>Scan to enter</span></div><div><strong>AFTER</strong><span>Complete the product action</span></div></div>
        <p className="activation-note">A digital layer around the event your team already paid for.</p>
        <a className="faq-link" href="/activation/faq">READ THE SPONSOR FAQ →</a>
      </section>}

      {stage === "demo" && <section className="activation-demo-intro">
        <div className="demo-kicker"><span>SPONSOR VIEW</span><span>ATTENDEE FLOW</span></div>
        <div className="demo-split"><div><div className="eyebrow">The route</div><h2>SET THE PATH<br />BEFORE THEY<br /><em>ARRIVE.</em></h2><p>People can reserve a path before the event. Anyone at the booth can scan and enter. The sponsor receives the chosen path and the completed action.</p><div className="route-note"><span>BEFORE</span>Reserve your path<br /><span>AT THE BOOTH</span>Scan to enter</div><button className="primary-button" onClick={() => setStage("path")}>OPEN THE ATTENDEE FLOW <span>→</span></button></div>
          <div className="demo-card demo-card--preview"><div className="demo-card-topline"><span>SPONSOR / LIVE</span><span>STACKDAILY</span></div><div className="demo-card-body"><div className="eyebrow">Your challenge is ready</div><h3>CHOOSE<br />YOUR <em>PATH.</em></h3><p>Do something useful with the product. Unlock the reward that fits.</p><div className="fake-choices"><span>CREATOR</span><span>BUILDER</span><span>INVESTOR</span></div></div></div>
        </div>
      </section>}

      {stage === "path" && <section className="activation-attendee">
        <div className="attendee-topline"><span>STACKDAILY / LIVE CHALLENGE</span><span>AT THE BOOTH OR ONLINE</span></div>
        <div className="attendee-heading"><div className="eyebrow">Your challenge is ready</div><h2>CHOOSE<br />YOUR <em>PATH.</em></h2><p>Pick the route that fits how you want to use the product.</p></div>
        <div className="path-grid">{(Object.keys(paths) as PathId[]).map((id, index) => { const item = paths[id]; return <button className="path-card" key={id} onClick={() => choosePath(id)}><span className="path-number">0{index + 1}</span><span className="path-label">{item.label}</span><span className="path-strap">{item.strap}</span><span className="path-arrow">→</span></button>; })}</div>
        <p className="activation-note">The sponsor receives your path and your completed action.</p>
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
        <div className="eyebrow">Reward ready</div><h2>YOUR <em>REWARD.</em></h2><p>Your {path.label.toLowerCase()} response has been recorded. The sponsor can follow up with the relevant offer.</p><div className="reward-unlock"><span>YOUR REWARD</span><strong>{selectedPath === "investor" ? "HERE’S THE DECK." : selectedPath === "creator" ? "YOUR AIRDROP IS READY." : "CREDITS UNLOCKED."}</strong><small>{completed ? "Unlocked by StackDaily. Supplied by the sponsor." : "Unlocked by StackDaily."}</small></div><button className="primary-button" onClick={() => setStage("landing")}>BACK TO THE SPONSOR VIEW <span>→</span></button>
      </section>}
    </main>
  );
}
