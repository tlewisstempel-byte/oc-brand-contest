import "../activation.css";

const faqs = [
  ["What does the QR code do?", "It opens the attendee flow. The person chooses a path, completes the relevant action and receives the sponsor’s reward."],
  ["How does this work with Moongate?", "Moongate provides event infrastructure for quests, check-ins, points and rewards. StackDaily handles the sponsor layer: the pre-event invitation, the product action, the audience paths and the follow-up signal."],
  ["How does this work alongside Galxe or Zealy?", "Galxe and Zealy support quest and community campaigns. StackDaily gives a sponsor a focused activation for one event and one product. We create the flow and prepare the qualification logic with the sponsor."],
  ["What is the core package?", "We create a content plan that gives people a reason to engage with the sponsor before the event. The content leads into the activation, where people choose a path and take the relevant product action."],
  ["Can you help with outbound as well?", "Yes. Outbound can be added for sponsors who want more direct preparation before the event. We can identify relevant people, send them into the content plan and invite them into the activation."],
  ["What happens to people who arrive through the booth?", "They scan the booth QR code and enter the same activation as the pre-nurtured audience. The path selection and product action give the sponsor a consistent way to understand the visit."],
  ["What does the path selection tell the sponsor?", "It records the attendee’s intended use. A creator submits content. A builder uses the product. An investor answers the product quiz. Follow-up can then match the person’s stated interest."],
  ["Why do the rewards change by path?", "The sponsor can reward the contribution that matters to them. Product credits support builders. A creator reward supports distribution. A deck gives an investor the information they requested."],
  ["Can someone start at the booth?", "Yes. They scan the booth QR code and enter the flow. The content plan gives the sponsor a warm audience beforehand, while the booth keeps the experience open to people who discover it in person."],
  ["What does the sponsor have to provide?", "The sponsor approves the audience paths, the action for each path and the reward. StackDaily builds the digital flow and reports the completed actions."],
];

export default function ActivationFaqPage() {
  return <main className="activation-shell faq-shell">
    <header className="activation-header"><a className="wordmark" href="/activation" aria-label="StackDaily"><span>stac<span>k</span></span><small>daily</small></a><p>SPONSOR ACTIVATION <span>FAQ</span></p></header>
    <section className="faq-hero"><div className="eyebrow">StackDaily / Sponsor FAQ</div><h1>BUILD INTEREST<br /><em>BEFORE THE BOOTH.</em></h1><p className="activation-lead">A content-led sponsor activation that gives people a reason to engage before the event and a clear route when they arrive.</p><a className="primary-button activation-cta" href="/activation">SEE THE ACTIVATION FLOW <span>→</span></a></section>
    <section className="faq-list"><div className="faq-list-heading"><span>THE SHORT VERSION</span><strong>Warm leads<br />before arrival.</strong></div>{faqs.map(([question, answer], index) => <details className="faq-item" key={question}><summary><span>0{index + 1}</span><strong>{question}</strong><b>+</b></summary><p>{answer}</p></details>)}</section>
  </main>;
}
