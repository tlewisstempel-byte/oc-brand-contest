import "../activation.css";

const faqs = [
  ["What does the QR code do?", "It opens the attendee flow. The person chooses a path, completes the relevant action and receives the sponsor’s reward."],
  ["How does this work with Moongate?", "Moongate provides event infrastructure for quests, check-ins, points and rewards. StackDaily handles the sponsor layer: the pre-event invitation, the product action, the audience paths and the follow-up signal."],
  ["How does this work alongside Galxe or Zealy?", "Galxe and Zealy support quest and community campaigns. StackDaily gives a sponsor a focused activation for one event and one product. We create the flow and prepare the qualification logic with the sponsor."],
  ["How do qualified leads arrive before the event?", "The challenge is published before the event. People reserve a path and complete a small action linked to the sponsor’s product. The sponsor receives their contact details, selected path and completion status before the booth opens."],
  ["What does the path selection tell the sponsor?", "It records the attendee’s intended use. A creator submits content. A builder uses the product. An investor answers the product quiz. Follow-up can then match the person’s stated interest."],
  ["Why do the rewards change by path?", "The sponsor can reward the contribution that matters to them. Product credits support builders. A creator reward supports distribution. A deck gives an investor the information they requested."],
  ["Can someone start at the booth?", "Yes. They scan the booth QR code and enter the flow. Pre-event registration gives the sponsor a warm list. Booth entry keeps the experience open for people who discover it in person."],
  ["What does the sponsor have to provide?", "The sponsor approves the audience paths, the action for each path and the reward. StackDaily builds the digital flow and reports the completed actions."],
];

export default function ActivationFaqPage() {
  return <main className="activation-shell faq-shell">
    <header className="activation-header"><a className="wordmark" href="/activation" aria-label="StackDaily"><span>stac<span>k</span></span><small>daily</small></a><p>SPONSOR ACTIVATION <span>FAQ</span></p></header>
    <section className="faq-hero"><div className="eyebrow">StackDaily / Sponsor FAQ</div><h1>QUALIFIED PEOPLE<br /><em>BEFORE THE BOOTH.</em></h1><p className="activation-lead">A sponsor activation that starts before the event and records the action each attendee takes.</p><a className="primary-button activation-cta" href="/activation">SEE THE ATTENDEE FLOW <span>→</span></a></section>
    <section className="faq-list"><div className="faq-list-heading"><span>THE SHORT VERSION</span><strong>Qualified leads<br />before arrival.</strong></div>{faqs.map(([question, answer], index) => <details className="faq-item" key={question}><summary><span>0{index + 1}</span><strong>{question}</strong><b>+</b></summary><p>{answer}</p></details>)}</section>
  </main>;
}
