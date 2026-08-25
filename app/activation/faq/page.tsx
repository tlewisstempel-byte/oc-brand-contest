import "../activation.css";

const faqs = [
  ["Is this just another QR code?", "No. The QR code is only the door. The product is the path that follows: choose a relevant challenge, take a meaningful action, and unlock a reward that matches the value you can create."],
  ["How is this different to Moongate?", "Moongate is event infrastructure for quests, check-ins, points and rewards. StackDaily is the sponsor-specific layer around it: we create the pre-event reason to attend, the product action, the audience paths and the follow-up signal."],
  ["How is this different to Galxe or Zealy?", "Galxe and Zealy are strong quest and community platforms. They help projects run tasks, referrals and rewards. We use a much smaller, more direct funnel for one event, one product and one commercial action—with the creative and setup done for the sponsor."],
  ["How do we get qualified leads before the event?", "We publish the challenge before the event and let people reserve a path. That gives the sponsor a list of people who have already declared what they want to do: create, build or understand the opportunity. The booth then becomes the moment they activate, not the moment they first appear."],
  ["What does niche down mean here?", "It means we do not treat every attendee as the same lead. A creator gets a content task. A builder gets product access. An investor gets a short quiz and the right briefing. The sponsor sees intent before deciding how to follow up."],
  ["Why give different people different rewards?", "Because different people create different value. A builder may be worth credits and product usage. A creator may be worth public distribution. An investor may be worth a qualified conversation. The reward makes that value exchange obvious."],
  ["What happens if someone never signed up before the event?", "They scan the booth QR code and skip straight to Choose Your Path. The pre-event route is designed to create a warm list; it is not a gate that blocks people who discover the activation in person."],
  ["What does the sponsor have to do?", "Approve the three paths, the challenge for each, and the reward for each. We build the page, the copy, the flow, the content prompts and the report. On the ground, the team needs to explain one sentence and display one QR code."],
];

export default function ActivationFaqPage() {
  return <main className="activation-shell faq-shell">
    <header className="activation-header"><a className="wordmark" href="/activation" aria-label="StackDaily"><span>stac<span>k</span></span><small>daily</small></a><p>SPONSOR ACTIVATION <span>FAQ</span></p></header>
    <section className="faq-hero"><div className="eyebrow">StackDaily / The difference</div><h1>NOT ANOTHER<br /><em>QUEST.</em></h1><p className="activation-lead">A simple way to turn event attention into qualified product action—before the booth, at the booth and after they leave.</p><a className="primary-button activation-cta" href="/activation">SEE THE ACTIVATION <span>→</span></a></section>
    <section className="faq-list"><div className="faq-list-heading"><span>THE SHORT VERSION</span><strong>More signal.<br />Less noise.</strong></div>{faqs.map(([question, answer], index) => <details className="faq-item" key={question}><summary><span>0{index + 1}</span><strong>{question}</strong><b>+</b></summary><p>{answer}</p></details>)}</section>
  </main>;
}
