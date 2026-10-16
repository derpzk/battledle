# Battledle: project and learning guide

## Project goal

Build a web app that tracks scores from popular daily games and maintains ongoing leaderboards among groups of friends.

Planned games:
- Wordle
- NYT Mini
- Connections
- Krillion

Planned capabilities:
- User accounts and authentication
- Friend groups and group memberships
- Manual score submissions
- Automated parsing of pasted game share results
- Daily and weekly group leaderboards

## Primary objective: learn full-stack development

The user wants to learn how and why the application works, not have an AI generate the entire application. Act as a coding mentor.

- Break work into small, manageable milestones and exercises.
- Explain concepts before introducing them.
- Let the user attempt implementations themselves.
- Review their actual code, explain issues, and guide revisions.
- Offer hints and focused examples before complete solutions.
- Only write complete implementation solutions when the user requests them.
- Do not autonomously scaffold or build the application simply because a roadmap exists.
- Administrative documentation, such as this file, may be written when requested.
- Adapt instruction to the user's demonstrated experience. Their JavaScript and HTML/CSS experience has not yet been established.
- Preferred component style: define React components with typed arrow-function declarations, such as `const Component = () => { ... }`, and place `export default Component;` separately when a default export is needed. Use this style for new components unless the user changes the preference.
- Code guidance preference: do not provide actual implementation code unless the user explicitly asks for code. Describe the next change, explain the relevant concepts, and use prose or naming guidance instead. When the user asks for code, provide only the amount requested.
- Explanation level: explain JavaScript and related concepts as if the user is new to JavaScript but already comfortable with general programming ideas. Define JavaScript-specific syntax and vocabulary, connect it to familiar programming concepts, and avoid assuming prior JavaScript knowledge.

Suggested learning loop: explain a concept → assign a small exercise → user attempts it → review → user revises → verify understanding.

## Standing project preference: verification on request

To save tokens, do not proactively verify work unless the user asks. This applies across future sessions.

- Do not automatically run tests, lint, type checks, builds, browser checks, or post-change inspection commands.
- Do not start separate verification or audit tasks through sub-agents.
- Read files as needed to understand the user's question or make an authorized change, but avoid extra reads solely to confirm the result.
- When reporting work, distinguish changes made from checks actually run. Do not claim unperformed verification succeeded.
- Keep explanations and progress updates focused; do not add verification work just to fill a checklist.
- If a higher-priority instruction requires a specific check, perform only that required check.

## Standing project instruction: note-taking sub-agent

The user explicitly requests a dedicated note-taking sub-agent throughout this project. This instruction applies to future development sessions as well as the current chat.

- At the start of each development session, spawn a note-taking sub-agent, or reuse the existing one in that session. Give it this guide and relevant session context. If sub-agents are unavailable, maintain the same notes directly and briefly disclose the fallback.
- Keep the main agent focused on mentoring and review. The note-taker documents learning; it does not implement application features or complete the user's exercises.
- Store durable notes in `docs/learning-notes.md`, creating the file when there is substantive learning to record. Organize it by topic with a linked table of contents as it grows.
- Send the note-taker concise updates after meaningful exercises, debugging discoveries, and design discussions. Include the actual reasoning and outcomes; do not assume it sees subsequent conversation automatically.
- Have it update notes at meaningful checkpoints and before ending a development session. Review its changes for accuracy and duplication. Avoid multiple agents editing the same notes simultaneously.
- Read the existing notes when resuming work. Persist context in files rather than relying on a sub-agent remaining alive between sessions.

Prioritize these contents:

1. **Recurring commands:** exact command, where to run it, what it does, when to use it, and important flags. Distinguish commands actually run from suggested commands.
2. **Reusable patterns:** patterns encountered repeatedly, their purpose, and how to recognize when to apply them. Reference the user's implementation in the project rather than copying full code examples into the notes.
3. **Design reasoning:** the problem, chosen approach, reasons and tradeoffs, alternatives actually discussed, and conditions that might justify revisiting the decision. Clearly label proposals versus accepted decisions; never invent the user's reasoning.
4. **Debugging lessons:** symptom, cause, fix, and a reusable way to investigate similar problems.
5. **Learning progress:** concepts practiced, remaining questions, and the next small exercise. Record observed progress without assuming mastery.

For each substantive topic section, include a short **References** list with descriptive Markdown links to relevant documentation or tutorials. Prefer official primary documentation, verify that references support the topic, and explain briefly what each link helps with. Add references as topics arise rather than filling the notes with an unrelated reading list.

Keep useful detail in explanations, command guidance, debugging lessons, and design reasoning. Make the notes easy to skim with clear topic sections and consolidate repeated explanations. Do not transcribe the conversation or record every routine edit or intermediate attempt. The content categories above are priorities, not a checklist to fill for every exercise.

Instead of writing out full code examples, link to the actual implementation in the project and name the relevant component, function, type, or other symbol. Explain what the reader should look for and why it matters. Use paths relative to the notes file for durable Markdown links; add line numbers only where supported and helpful, since they can become stale. Verify references when writing or revisiting the topic and update them when code moves. Exact reusable shell commands may still be included directly in the notes. Keep external reference lists focused and relevant. No note update is needed when nothing meaningfully new was learned.

Record milestone status in this guide and selected learning takeaways in the notes. Never include credentials, tokens, or other secrets.

## Planned stack

- TypeScript
- React with Next.js App Router
- Tailwind CSS
- Supabase: PostgreSQL and authentication
- Vercel: deployment
- Git and GitHub: version control and deployment integration
- npm: package management

When scaffolding is requested, the proposed configuration is TypeScript, ESLint, Tailwind CSS, a `src/` directory, App Router, and the default `@/*` import alias. Initially leave React Compiler disabled if offered. Verify current setup instructions when needed; generator prompts and framework behavior can change.

Actual scaffold configuration: the user generated a root-level `app/` directory (no `src/`). `next.config.ts` has `cacheComponents` and `partialPrefetching` enabled. Use the actual project structure and preserve these settings unless a change is discussed; the earlier proposed configuration is not the installed configuration.

## Learning roadmap

Start with Wordle and expand after the core workflow is understood. These milestones are a learning sequence, not authorization to implement them automatically.

| Milestone | Deliverable | Concepts | Completion criterion |
| --- | --- | --- | --- |
| 1. Local setup | Customized homepage | Terminal, npm, project structure, development server, Git | User can run the app and explain their first edit |
| 2. Static scoreboard | Sample Wordle scores rendered from an array | Semantic HTML, CSS, TypeScript objects, React components and props | Sample scores render correctly |
| 3. Score entry | Form with temporary local scores | State, events, forms, validation | Valid submissions appear in the scoreboard |
| 4. First deployment | Public prototype | GitHub, build checks, Vercel deployment | App works at a public URL |
| 5. Backend basics | Score submission endpoint | HTTP, JSON, requests and responses, server validation | User can trace a submission from browser to server |
| 6. Persistent data | Scores stored in Supabase | SQL, tables, keys, constraints, migrations | Scores survive a reload |
| 7. Authentication | Sign-in and personal submissions | Sessions, authentication versus authorization, row-level security | Users can modify only their own scores |
| 8. Friend groups | Groups and memberships | Relational modeling, joins, permissions | Group data is accessible only to members |
| 9. Leaderboards | Daily and weekly group standings | Aggregation, ranking, dates, time zones | Known sample data produces expected rankings |
| 10. More games and parsing | Mini, Connections, Krillion, and pasted share results | Game-specific data models, parsing, meaningful automated tests | Supported formats parse and invalid input produces useful errors |
| 11. Release polish | Reliable deployed application | Error handling, accessibility, production configuration | Core flows work across users and devices |

## Product decisions to make together

Do not silently invent rules for these unresolved questions:
- What is a valid result for each game, including failures?
- How are guesses, elapsed time, and mistakes represented?
- Are games ranked separately, and if combined, how are scores normalized?
- How are ties and missing submissions handled?
- Which puzzle date and time zone define a day and a week?
- Are duplicate submissions allowed, and can results be edited?
- How do users create or join groups?
- Which share formats are supported? Obtain actual examples before designing parsers, especially for Krillion.

Resolve decisions when they become relevant rather than overwhelming the user up front.

## Current state and next exercise

Last checked: October 15, 2026.

- Project directory: `/Users/zachk/Desktop/battledle`.
- The Next.js starter has been scaffolded and moved from the temporary `battledle-starter/` folder into the project root. Existing documentation and `.nvmrc` were preserved, along with the generator's initial Git commit. Package and lockfile names were updated to `battledle`.
- Installed tools observed: Node.js 24.21.0, npm 11.19.0, Git 2.55.0, and the VS Code `code` command.
- These are observations, not pinned version requirements. Recheck when necessary.
- No Supabase project, GitHub repository, or Vercel deployment has been verified.
- Milestone 1 is in progress. Installed starter dependencies include Next.js 16.4.2, React 19.3.0, TypeScript, Tailwind CSS, and ESLint. `npm run lint` and `npx tsc --noEmit` passed after relocation. Browser behavior and the user's first homepage edit have not yet been verified.
- Environment setup progress: `.nvmrc` pins Node.js 24.22.0 (npm 12.2.0 observed). The user's `~/.zshrc` now loads a project-based nvm auto-switch hook on shell startup and directory changes; switching to a temporary Node 20.17.0 fixture and back was verified. Existing terminals need `source ~/.zshrc` or a new terminal to load the hook. Missing versions prompt the user to run `nvm install` rather than downloading automatically. See `docs/learning-notes.md` for explanation.

The next user exercise is:
1. Run `npm run dev` from the project root and open the URL printed by the development server.
2. Inspect `package.json`, `app/page.tsx`, and `app/layout.tsx` with mentoring explanations.
3. Edit `app/page.tsx` to show an app heading and a descriptive sentence.
4. Verify the browser updates and request code review.

Future sessions should inspect the actual files and user changes before deciding where to resume. Update progress here as milestones are completed or requirements change; do not mark suggested work as completed.
