# Open Campus x StackDaily Brand Challenge

Public contest landing page and brief allocation flow.

## Brief allocation

The current allocation is intentionally a simple placeholder:

1. After the placeholder sign-in, the browser selects one of the five briefs at random.
2. It saves that selection in local storage, so refreshing or returning shows the same brief.

This is not server-side and is not tied to an Open Campus ID. Before production use, the Open Campus ID handoff must pass the user identity and persist the brief allocation against it. That prevents a user receiving a different brief on another device or after browser storage is cleared.

## Run locally

```bash
npm install
npm run dev
```
