# Battledle learning notes

These notes record useful explanations and verified outcomes, not a transcript. Suggested commands are distinguished from commands already run. See [the project guide](../AGENTS.md) for the roadmap and mentoring approach.

## Contents

- [Node.js, npm, and project versions](#nodejs-npm-and-project-versions)
- [Automatic version switching in the terminal](#automatic-version-switching-in-the-terminal)
- [Dependency updates and compatibility](#dependency-updates-and-compatibility)
- [Next.js starter and project files](#nextjs-starter-and-project-files)
- [React components, typed props, and JSX](#react-components-typed-props-and-jsx)
- [Static scores, shared files, and submission order](#static-scores-shared-files-and-submission-order)
- [Local state and click events](#local-state-and-click-events)
- [Parsing and validating a Wordle share result](#parsing-and-validating-a-wordle-share-result)
- [Product direction: shared input and player leaderboard](#product-direction-shared-input-and-player-leaderboard)
- [Sortable player leaderboard prototype](#sortable-player-leaderboard-prototype)
- [Personal score history and file-based routing](#personal-score-history-and-file-based-routing)
- [Tailwind styling and alignment](#tailwind-styling-and-alignment)
- [Git and GitHub workflow](#git-and-github-workflow)
- [Progress and next exercise](#progress-and-next-exercise)

## Node.js, npm, and project versions

These similarly named tools have separate jobs:

- **Node.js is the runtime:** it executes JavaScript outside a web browser. Next.js development tools and server code will run using Node; browser-side code runs in the browser.
- **npm is the package manager:** a package is reusable software, and a dependency is a package a project relies on. npm downloads and manages dependencies such as React and Next.js. It also runs named project scripts: `npm run dev` runs the `dev` entry in [package.json](../package.json).
- **nvm is the version manager:** it installs and selects separate Node installations, each with its own npm and global tools. It helps a school project and a personal project use different Node versions without repeatedly uninstalling and reinstalling Node. It does not manage either project's React or Next.js dependencies.
- **npx runs a package's command:** it comes with npm and can fetch a tool into npm's cache when needed. The setup command was `npx create-next-app@latest battledle-starter --use-npm --no-agents-md`. It runs the Next.js project generator without requiring a global installation. `@latest` requests the package's latest release; `battledle-starter` names a child directory; the flags choose npm and suppress a generated `AGENTS.md`. The user confirmed the generator finished; the generated files were subsequently moved to the project root.

The setup sequence connects the tools: nvm selects Node and its npm; npx runs the project generator; npm then manages the generated project's dependencies and scripts. Refer to [package.json](../package.json) for the actual dependency and script definitions rather than memorizing them.

**Installed versus active:** a version can exist on the computer without being selected in a particular terminal. Each shell has its own environment. Switching Node in one terminal does not automatically change another terminal that is already open.

**Project decision:** [`.nvmrc`](../.nvmrc) pins Battledle to Node **24.22.0**. Naming the version in the project makes its expected runtime explicit and repeatable. That installed Node version currently has npm **12.2.0**. The existing Node **20.17.0** installation can support school projects when it matches their requirements; do not infer a class requirement from its presence.

**npm scope:** npm and packages installed with `npm install -g` belong to the selected Node installation under nvm. Projects selecting the same Node version share that installation's global packages. `.nvmrc` selects Node; it does not independently pin npm. Ordinary project dependencies are tracked in the project's package files and installed locally.

| Command | Where and when to use it | Status |
| --- | --- | --- |
| `pwd` | Any terminal; print the working directory before running project commands. | Suggested user check; user execution not confirmed. |
| `node --version` and `npm --version` | Any terminal; inspect that shell's active tools. | Verified in fresh-shell checks: Node 24.22.0 and npm 12.2.0. |
| `nvm use` | Inside Battledle; select the version recorded in `.nvmrc`. | Available manual alternative to the automatic hook. |
| `nvm use 24.22.0` | Any nvm-enabled shell; explicitly select Battledle's installed version. | Suggested command; installation already exists. |
| `nvm install` | Inside a project with `.nvmrc`; install/select its requested Node version if needed. | Suggested recovery if the requested version is missing. |
| `nvm exec 24.22.0 npm --version` | Run one command with a specified installed Node version. | Run during inspection; returned 12.2.0. |

For a future installation choice, `nvm install --lts` selects the latest LTS release, while `nvm install node` selects the latest release, which may be Current. LTS was recommended for this learning project. Neither command is needed to obtain the already-installed 24.22.0 version.

**References**

- [About npm](https://docs.npmjs.com/about-npm/) — introduces packages, the npm command-line tool, and the registry where packages are published.
- [npx command reference](https://docs.npmjs.com/cli/v11/commands/npx/) — explains running package commands and fetching missing tools into npm's cache.
- [nvm usage and `.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) — project version files and how nvm uses them.
- [Node.js release history](https://nodejs.org/en/about/previous-releases) — explains release lines and LTS status when choosing a runtime.

## Automatic version switching in the terminal

**Chosen approach:** a `load-nvmrc` function in `/Users/zachk/.zshrc` runs at shell startup and through zsh's `chpwd` hook when the working directory changes. The project version stays in [`.nvmrc`](../.nvmrc); the shell integration lives in the user's shell configuration because it must work across school and personal projects.

The hook finds `.nvmrc` in the current directory or its parents, so moving into a project subfolder still uses the project's version. It selects an installed version. If the version is missing, it asks the user to run `nvm install` rather than downloading automatically. Leaving a directory tree governed by `.nvmrc` restores nvm's default version.

The shell configuration was backed up before editing at `/Users/zachk/.zshrc.battledle-backup-20261015-220336-040377`. Look for `load-nvmrc` and its hook registration in `/Users/zachk/.zshrc` to inspect the implementation; the integration was added before the SDKMAN end block.

**Verification completed:** `zsh -n ~/.zshrc` passed the syntax check. A fresh interactive zsh selected Node 24.22.0/npm 12.2.0 in Battledle. Changing to a temporary school fixture selected Node 20.17.0; returning to Battledle restored 24.22.0/npm 12.2.0. These checks verify the integration, not the state of an already-open VS Code terminal.

**Next user action:** run `source ~/.zshrc` in an existing VS Code zsh terminal to reload the configuration, or open a fresh terminal. Then check `node --version` and `npm --version`. If versions are unexpected, first inspect `pwd`, the nearest `.nvmrc`, and whether this shell has loaded nvm; an installed version alone does not prove it is active.

**References**

- [nvm deeper shell integration](https://github.com/nvm-sh/nvm#deeper-shell-integration) — explains the zsh directory-change integration and its relationship to `.nvmrc`.
- [nvm `.nvmrc` lookup](https://github.com/nvm-sh/nvm#nvmrc) — explains how project version files are located and used by nvm commands.

## Dependency updates and compatibility

**Maintenance checkpoint:** the user requested the latest possible dependencies. Registry inspection and installs updated [package.json](../package.json) and [package-lock.json](../package-lock.json). Reported resolved versions include Next.js 16.4.3, React/React DOM 19.3.1, ESLint 9.39.5, and TypeScript 6.0.3. Node type definitions stay on major 24 to match [`.nvmrc`](../.nvmrc), rather than tracking a newer Node major.

The latest ESLint/TypeScript combination produced peer-dependency warnings: the installed `eslint-plugin-import` and `eslint-plugin-jsx-a11y` declare support through ESLint 9, and the installed TypeScript ESLint tooling declares TypeScript support below 6.1. The chosen compromise kept ESLint on major 9 and TypeScript on 6.0. npm also warned that ESLint 9 is deprecated/unsupported; this compatibility compromise may need revisiting when the Next.js lint-tooling dependency chain supports newer versions. Registry metadata and install success do not establish that application checks pass.

| Command run | Where and purpose |
| --- | --- |
| `npm outdated` | Project root; compare installed, wanted, and latest registry versions. Its initial sandboxed attempt hit a DNS failure; an elevated retry succeeded. |
| `npm install next@latest react@latest react-dom@latest` | Project root; update runtime dependencies to the latest registry releases and refresh the lockfile. |
| `npm install --save-dev eslint@9 typescript@6.0` | Project root; select the compatible lint/type-tooling lines after peer warnings. |

`npm view` was also used to inspect package `peerDependencies` and `engines` metadata before choosing versions. Peer dependencies describe expected companion packages; engines describe supported runtime/tool versions. The remaining development dependencies were updated, with the Node-types exception above. npm's automatic install audit reported zero vulnerabilities. The `unrs-resolver` postinstall script remained blocked. No lint, type, build, or browser checks were run for these updates.

**Post-upgrade debugging:** localhost returned an internal server error while the pre-upgrade development server was still running. Its log showed React 19.3.0 in memory alongside installed React DOM 19.3.1, plus `routeModule.ensureInstrumentation` not being a function after the Next.js update. The running process had old framework code mixed with newly installed files. The agent stopped that development session with `Ctrl-C` and ran `npm run dev` again from the project root; the new server reported Next.js 16.4.3. No source or configuration edits were needed.

When a framework upgrade breaks an already-running server, inspect its terminal errors and restart it before changing application code. Package installation updates files on disk; an existing process can retain earlier modules in memory. A narrow HTTP check, `curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000`, returned **200** after an elevated retry (the sandboxed attempt could not connect). Here `-s` suppresses progress output, `-o /dev/null` discards the response body, and `-w` prints the status code. This confirms that the homepage request succeeded, not that browser interactions or production builds pass. No browser, lint, type, or build checks were run for this fix.

**References**

- [npm outdated](https://docs.npmjs.com/cli/v11/commands/npm-outdated) — interpreting installed, wanted, and latest versions.
- [npm view](https://docs.npmjs.com/cli/v11/commands/npm-view) — reading registry metadata such as peer dependencies and engines.
- [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install) — version selectors, development dependencies, and lockfile updates.
- [curl command reference](https://curl.se/docs/manpage.html) — `--silent`, `--output`, and `--write-out` options used for the narrow HTTP status check.

## Next.js starter and project files

**Completed checkpoint:** the user generated a Next.js starter in `battledle-starter`. Using a child folder avoided generator conflicts with existing root files, including `AGENTS.md` and `.nvmrc`. After inspecting for collisions, all generated entries—including hidden entries such as `.git` and `.next`, plus `node_modules`—were moved to the project root, and the empty temporary folder was removed. Existing project documentation and `.nvmrc` were preserved. The project name was updated to `battledle` in the manifest and the lockfile's root package records.

The original starter used Next.js **16.4.2** and React **19.3.0**; see the dependency-update checkpoint above for later versions. Its application directory is `app/` at the root; the earlier roadmap's `src/app/` path was only a proposal. [next.config.ts](../next.config.ts) also contains generated `cacheComponents: true` and `partialPrefetching: true` settings. These generated settings were preserved; no product requirement or user design reasoning is implied by them.

| Project reference | What to look for |
| --- | --- |
| [package.json](../package.json) | The project's name, dependencies, and named scripts. `dev` starts development, `build` creates a production build, `start` serves a production build, and `lint` runs ESLint. |
| [package-lock.json](../package-lock.json) | npm's recorded dependency tree and resolved versions, including dependencies of dependencies. It supports repeatable installation. |
| [app/page.tsx](../app/page.tsx) | The `Home` component supplies the homepage at `/`; this is the first editing exercise. |
| [app/layout.tsx](../app/layout.tsx) | `RootLayout` wraps pages with shared document structure and imports global styles. |
| [app/globals.css](../app/globals.css) | Shared styling and the starter's Tailwind/theme setup. |
| [public/](../public/) | Static assets such as the starter's SVG images. |

**Checks actually run:** `npm run lint` and `npx tsc --noEmit`, both from the project root under Node 24.22.0, passed. Lint checks code against configured rules; TypeScript checks types, and `--noEmit` avoids generating JavaScript output. These checks do not confirm that the app renders in a browser.

**Suggested next command:** run `npm run dev` from `/Users/zachk/Desktop/battledle`, keep that terminal running, and open the local URL it prints. A development server serves the app locally and picks up saved edits. Browser verification remains pending.

**References**

- [Next.js project structure](https://nextjs.org/docs/app/getting-started/project-structure) — explains the roles of `app/`, `public/`, pages, layouts, and configuration files.
- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) — explains project creation and starting the development server.

## React components, typed props, and JSX

**Implementation reference:** [app/page.tsx](../app/page.tsx), specifically `AppIntroProps`, `AppIntro`, and `Home`. The user extracted the heading and description into `AppIntro`, then replaced its fixed description with a `tagline` supplied by `Home`.

- A **component** groups a piece of interface behind a named function. `Home` composes the page using `AppIntro`, so the introduction has a clear boundary in the page code.
- A **prop** is input passed from parent to child. `Home` chooses the tagline; `AppIntro` controls how it is presented. This pattern makes the same presentation usable with different text without editing the child each time.
- `AppIntroProps` describes the input contract: `tagline` must be a string. The destructured parameter reads that property from the props object. TypeScript can flag a missing prop or an incompatible value during development.
- `{tagline}` in the paragraph tells JSX to render the JavaScript value. Text written directly between tags is literal text; curly braces are needed to read a variable there.
- Project component style: typed arrow-function declarations, with a separate default export when needed. See `AppIntro` and `Home` here and `ScoreCard` in [components/ScoreCard.tsx](../components/ScoreCard.tsx). A prop type describes the function's inputs; the arrow function supplies its implementation.
- JSX whitespace is not a reliable layout tool: source line breaks and indentation do not necessarily produce visible spacing. Use an explicit space when text needs one, and CSS spacing utilities for layout between elements.

**Debugging lesson:** a semicolon placed after a component tag inside returned JSX is text content, so it can appear on the page. The semicolon ending the arrow-function variable declaration belongs after its closing brace, outside the JSX. The user corrected this distinction during the props exercise. When unexpected punctuation renders, inspect the returned markup before treating it as a styling problem.

No lint, type, or browser checks were run for this exercise by the note-taker. The project preference is to perform verification when requested.

**References**

- [React: passing props to a component](https://react.dev/learn/passing-props-to-a-component) — passing values from parent to child and destructuring the props object.
- [React: JavaScript in JSX with curly braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces) — distinguishes literal text from JavaScript expressions in markup.
- [React: using TypeScript](https://react.dev/learn/typescript) — explains typed component props and how types describe expected inputs.

## Static scores, shared files, and submission order

The user has progressed from one component with a text prop to a static scoreboard. The current separation keeps data, its shape, presentation, and ordering understandable independently:

| Project reference | Pattern and purpose |
| --- | --- |
| [types/score.ts](../types/score.ts): `Score<TResult>` | Common record fields plus typed game-specific `result`. Fixtures explicitly use only the guess-count portion of `WordleResult`, not fabricated grids. |
| [data/sampleScores.ts](../data/sampleScores.ts): `sampleScores` | An array of `Score` objects, separate from markup. Sample entries are learning fixtures, not finalized valid-game rules. |
| [components/ScoreCard.tsx](../components/ScoreCard.tsx): `ScoreCard`, `ScoreCardProps` | Shared detail-card shell with title/message, optional player/badge, and optional children for game-specific content. |
| [components/ScoreRow.tsx](../components/ScoreRow.tsx): `ScoreRow`, `ScoreRowProps` | Table row selecting player, game name, submission timestamp, and message from `Score` through `Pick`. |
| [components/scoreCards/WordleScoreCard.tsx](../components/scoreCards/WordleScoreCard.tsx): `WordleScoreCard` | Standalone solved-Wordle detail card accepting a real `WordleResult` and optional player, separate from generic table rows. Shown as a valid-result preview directly through `ScoreForm`. |
| [lib/ranking.ts](../lib/ranking.ts): `rankScores` | Historical pure guess-ranking helper, preserved but no longer used by the current scoreboard. |
| [components/ScoreBoard.tsx](../components/ScoreBoard.tsx): `ScoreBoard`, `ScoreBoardProps<T>` | Generic score collection, clear/reset controls, and list rendering through supplied functions. |
| `components/WordleScoreBoard.tsx`: `WordleScoreBoard` (historical; currently absent) | Previously configured the generic board with Wordle sample data, cards, keys, title, and parser feedback. The homepage now uses `ScoreForm` directly; the board module was not restored. |
| [components/ScoreTable.tsx](../components/ScoreTable.tsx): `ScoreTable` | Shared semantic table, column headers, caption, and scroll container around score rows. |
| [components/ScoreForm.tsx](../components/ScoreForm.tsx): `ScoreForm` | Owns player-name and pasted-result inputs, validation feedback, and a parsed Wordle preview. |
| [app/page.tsx](../app/page.tsx): `Home` | Composes the introduction, navigation, `ScoreForm`, and player leaderboard. No score-submission table appears on the homepage. |

**Current ordering decision:** the user replaced visible guess ranking with a submission-date list. The implementation uses newest-first order, a direction the agent stated as an assumption. `submittedAt` is separate from `datePlayed`: submitting a score later does not change which puzzle it belongs to. The sample timestamps are fixtures on October 15 at 18:00, 19:00, and 20:00 UTC, not actual submission history.

**Generic card message:** at the user's request, records gained `message: string` and the sample records gained display text. `ScoreRow` renders the player and that message instead of constructing a guesses sentence. `Pick<Score, ...>` builds its prop type by selecting only the four fields it renders; it does not need game-specific numeric details. The personal-history page uses this row inside `ScoreTable`; the former homepage submission table was removed. Future game-specific formatting can supply suitable messages, but no parser was changed to generate them yet. A Bot's eight-guesses fixture is explicitly labeled a sample result; it does not change the solved Wordle parser's 1–6 rule. No app checks were run.

**JavaScript patterns practiced:** `Score[]` describes an array of `Score` objects. Spread creates a shallow copy before `sort`, because `sort` changes its receiver. `ScoreBoard` calculates `orderedScores` by subtracting the first parsed timestamp from the second, giving descending chronological order. `Date.parse` turns each timestamp string into a numeric time value. This assumes valid timestamp strings; validation has not been added.

`map` calls a callback for each entry and collects the returned JSX. The board no longer passes an index-based rank to cards. React's `key` identifies items across renders; `WordleScoreBoard` currently supplies player names, relying on unique fixture names. Revisit keys when real submission identities exist. Guess-based ranking remains a historical exercise rather than the current list behavior.

**Extraction checkpoint:** the user moved ranking and list rendering from `Home` into `ScoreBoard` and correctly described the flow as ranking the data, then looping over it to render cards. `ScoreBoard` begins with `"use client"`, establishing its client boundary. The heading now reads “Wordle Scores,” avoiding a claim that the fixed sample dates are today's results.

**Debugging lessons:** a component arrow function with a brace-delimited body needs an explicit `return` to supply its JSX. Merely writing JSX inside that body does not return it. The user corrected the missing return in `ScoreBoard`, along with a heading whose opening and closing tag names differed. When extracting a component, check that it returns its markup and that JSX tags match before investigating layout or data flow.

**References**

- [MDN: Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) — converting standardized timestamp strings to numeric time values.
- [React: rendering lists](https://react.dev/learn/rendering-lists) — mapping data to components and choosing keys.
- [JavaScript array sorting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — comparator return values and the fact that sorting changes the array being sorted.
- [React: your first component](https://react.dev/learn/your-first-component) — components return JSX and can be composed inside other components.
- [Next.js: use client](https://nextjs.org/docs/app/api-reference/directives/use-client) — the client boundary required for state and event handling; the directive belongs before imports.
- [TypeScript: Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) — selecting an existing type's fields to describe a component's narrower requirements.
- [React: passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) — composing game-specific card content inside a reusable visual shell.

## Local state and click events

**Implementation reference:** [components/ScoreBoard.tsx](../components/ScoreBoard.tsx), especially `scores`, `setScores`, `handleClearScores`, and `handleResetScores`.

The user first introduced `useState(sampleScores)` and changed ranking to use `scores`; the generic board now initializes from its `initialScores` prop. `useState` returns the current value and a setter function; array destructuring assigns them the names `scores` and `setScores`. The initial array supplies the starting value, while subsequent rendering reads the current state. `orderedScores` is calculated from that state rather than stored separately.

The agent added `handleClearScores`, which passes an empty array to `setScores`, and connected it to one “Clear scores” button above the list. The button acts on the whole scoreboard, so it sits outside `map`; a button inside the callback would repeat for every card. Passing the handler to `onClick` lets React call it when clicked. Calling it during rendering would run it immediately. `type="button"` keeps it from acting as a form submit button if placed inside a form later.

The setter requests a new render, where ordering and mapping use the empty array. This changes component memory, not the imported sample data or a database; a fresh page load initializes it from the sample data again. No browser or automated checks were run for this step.

The next small step added `handleResetScores`, which now restores the `initialScores` prop through the same setter without a page refresh. The two buttons share a flex container. An empty-state paragraph is derived from `scores`: `length` counts array entries, and `=== 0` is a strict equality comparison that produces a boolean without converting types. The `&&` expression includes “No scores yet.” only when that condition is true. Each state update causes the component to calculate ordering and this condition again; neither needs its own state variable. This reset and empty-state step has not been checked in the browser or with automated checks.

**Controlled inputs:** [ScoreForm](../components/ScoreForm.tsx) has a player-name text input and multiline share-result textarea. Each `value` reads its own state; `onChange` reads `event.target.value` and updates that string. Generated IDs connect labels to inputs. The user restored the name field after briefly requesting result-only input. A name is display text, not authenticated identity.

**Direct form integration requested by the user:** the homepage mounts `ScoreForm` directly; the former `GameScoreForm` wrapper and configuration props were removed. The form handles supported-game selection and preview rendering while `WordleGame` retains parsing rules. The unused generic `ScoreBoard` now handles only table data/presentation, with no form or feedback prop. This keeps one mounted homepage form.

`handleSubmit` prevents native navigation, checks Wordle recognition, and parses once. Unsupported or invalid input produces feedback. A successful parse stores `{result, player}` with the trimmed name; that parsed result supplies both summary feedback and `WordleScoreCard`, avoiding a second parse for preview. Changing either input clears feedback and preview. `role="status"` exposes feedback updates to assistive technology. This does not save a record, establish identity, calculate scoring, or validate a puzzle date. No checks were run.

**Function placement discussed:** local handlers live inside `ScoreBoard`, where closures let them access the component's state and setters. A closure is a function together with access to the surrounding variables where it was defined. The pure, reusable `rankScores` stays outside React in its own module. This is a responsibility and scope choice; no performance optimization was needed for these handlers.

Game-specific feedback now lives in `WordleGame`, replacing the earlier standalone `getWordleFeedback` function. The form's `handleSubmit` stays inside `ScoreForm` to access input state, the feedback setter, and parsed preview state.

**Generic board requested by the user:** `ScoreBoardProps<T extends SubmittedScore>` uses `T` as a placeholder for one score's type, shared by the initial array, key selection, and rendering. The constraint requires `submittedAt: string`, enabling common chronological ordering while allowing game-specific fields. The comma in the generic arrow declaration disambiguates it from JSX in a `.tsx` file. Callers supply `getScoreKey` and `renderScore`, plus data and a title. `renderScore` returns a `ReactNode`, the type of renderable React content. A keyed `Fragment` gives each result identity without wrapper HTML. The earlier ranking callback and rank argument were removed when chronology replaced ranking.

`WordleScoreBoard` supplies the Wordle-specific choices. Keeping that configuration in a Client Component keeps ordinary function props within the client boundary when `Home` renders it. The generic board assumes a submission timestamp but no guesses field, card design, or parser. This enables future game setups without implementing other games or combined normalization. The partial fixture type and unused ranking helper still describe Wordle guess results; `ScoreRow` requires only common record fields. No app checks were run for this change.

**References**

- [React: useState](https://react.dev/reference/react/useState) — initial state, the returned value/setter pair, and updates that trigger rendering.
- [React: responding to events](https://react.dev/learn/responding-to-events) — defining handlers and passing a function to an event prop without calling it during rendering.
- [React: conditional rendering](https://react.dev/learn/conditional-rendering) — using a boolean condition with `&&` to include JSX only when needed.
- [React: input](https://react.dev/reference/react-dom/components/input) — controlled inputs, change handlers, and associating labels with inputs.
- [React: textarea](https://react.dev/reference/react-dom/components/textarea) — multiline inputs, row sizing, and the controlled value/change pattern.
- [React: useId](https://react.dev/reference/react/useId) — generating unique accessibility IDs when reusable components appear more than once.
- [MDN: status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) — announcing updated advisory feedback to assistive technology.
- [MDN: closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) — how a nested function accesses variables from its surrounding scope.
- [TypeScript: generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — using a type parameter to preserve relationships between reusable inputs and outputs.
- [React: Fragment](https://react.dev/reference/react/Fragment) — grouping rendered content with a key without adding a DOM wrapper.

## Parsing and validating a Wordle share result

**Implementation references:** [lib/games/WordleGame.ts](../lib/games/WordleGame.ts), `WordleGame.parse`; [types/wordle.ts](../types/wordle.ts), `WordleResult`.

The user supplied an actual example beginning `Wordle 1,946 5/6`, followed by an emoji grid with Discord links. After an initial header-reading step, the user explicitly requested strict emoji and format validation. The parsing method returns numeric `puzzleNumber` and `guesses` plus a `grid` array, or `null` when validation fails. Its union return type (`WordleResult | null`) makes that unsuccessful outcome explicit. `WordleGame.getFeedback` calls it for form feedback; the reusable form has no game import.

The `parse` method trims the text, normalizes Windows CRLF line endings, and splits it into lines. Its anchored header expression requires the `Wordle N G/6` format, accepting an optional star, a positive puzzle number with valid comma grouping or no commas, and guesses 1–6. Capture groups retain puzzle and guess text as strings; commas are removed before `Number` converts them. `Number.isSafeInteger` rejects puzzle numbers JavaScript cannot represent safely as integers.

The remaining lines form the grid, allowing one empty separator line after the header. Row count must equal the guess count. `every` checks each row against a Unicode regular expression requiring exactly five tiles from the standard black, white, yellow, and green palette. The final row must be all green, with no earlier all-green row. Early `null` returns stop processing invalid input instead of returning a partly valid result.

**Class and parsed-data separation:** `WordleGame` groups lightweight `recognizes`, strict `parse`, `formatResult`, and `getFeedback`. Recognition only identifies a possible Wordle prefix; it does not validate the grid. Formatting handles singular “guess” versus plural “guesses.” `WordleResult` remains a plain parsed-data object without methods. After discussing common metadata on game classes, the user accepted storing that metadata on separate records, as described below.

A shared `wordleGame` instance has no player/result metadata assigned and does not retain submissions. The user requested removal of the old parser wrapper and `lib/parsers` directory after the class refactor; the pre-deletion import search found no remaining consumers. `WordleGame` is now the sole parsing implementation. The form calls methods through `wordleGame`, preserving its `this` receiver because the methods call other methods through `this`. The scoring contract now exists, but its Wordle method returns `null` while the formula remains undecided. Validation rules were moved, not expanded; no post-change app checks were run.

**Abstract parent and record separation:** the user accepted keeping game behavior separate from individual score records. [lib/games/Game.ts](../lib/games/Game.ts) defines abstract `Game<TResult>` with readonly `gameName` identity and recognition, parsing, formatting, feedback, and standardized-scoring methods. An abstract class cannot be instantiated directly; concrete subclasses supply those members. `WordleGame extends Game<WordleResult>` specifies its parsed-result type and sets `gameName` to Wordle. Its shared instance is stateless. The earlier parent metadata fields and constructors were removed because a game definition should not represent one player's submission.

The requested `standardScore(result: TResult): number | null` contract requires every concrete game class to provide a scoring method using its own parsed-result type. The intended numeric scale is 1–100; the Wordle implementation currently returns `null` because no formula has been agreed. `null` means uncalculated, distinct from a numeric zero. Its `_result` parameter retains the required typed input while indicating that the placeholder does not use it yet. No score calculation or form/record integration was added, and no checks were run.

[types/score.ts](../types/score.ts) defines `Score<TResult = unknown>` with `player`, `gameName`, `datePlayed`, `submittedAt`, `message`, nullable standardized `score`, and game-specific `result`. The generic preserves a particular game's result shape; later `Score<WordleResult>` can contain real parsed puzzle/guess/grid data. With no type argument, `unknown` prevents assuming a particular result shape. Existing fixtures use `Score<Pick<WordleResult, "guesses">>` because their results only contain guesses; no grids or IDs were fabricated. Sample standardized scores remain `null`, meaning uncalculated, not zero.

The sample data, card props, personal-history key, and unused ranking helper were migrated to the record shape. The card selects common display fields with `Pick`, while the old ranking helper reads `result.guesses`. `player` is still a temporary display name, not an authenticated user ID; this is not a finalized database schema. The split adds no storage or form-to-record submission integration. No app checks were run.

**Current limits:** the parser accepts plain multiline emoji, so the Discord Markdown-linked example is rejected unless pasted as plain tiles. Failed results marked `X` and high-contrast palettes still need explicit support decisions. It does not validate puzzle dates or prove that a result is authentic. No parser tests or app checks were run; these describe the implemented rules, not verified outcomes.

**Wordle-specific detail card:** the user requested `WordleScoreCard`, which accepts a `WordleResult` plus an optional player. It displays the puzzle number, solved guess count, a summary from `wordleGame.formatResult`, and the ordered emoji grid. Generated IDs associate its heading; hidden descriptions explain tile meanings while visual emoji are hidden from assistive technology to avoid duplicate announcements. This is a separate detail presentation from `ScoreRow` table rows. It supports the parser's solved-result shape only and is rendered directly by the homepage form; no fixture grid was fabricated and no app checks were run.

**Card composition:** the user requested `ScoreCard` as the shared visual shell. It owns the article, accessible heading ID, title/player header, optional neutral result badge, message, and spacing/borders. `WordleScoreCard` supplies its formatted title/message/badge through props and places the emoji figure between the component's tags as `children`. `ReactNode` describes that renderable child content. This reuses presentation through component composition, not class inheritance. The previous table-row markup moved into `ScoreRow`, keeping table semantics separate from detail cards. No app checks were run for this refactor.

**Homepage integration:** the homepage contains the direct `ScoreForm`, player leaderboard, and navigation, without a submission scoreboard. The deleted `GameScoreForm` wrapper is no longer needed. `ScoreRow`/`ScoreTable` still provide sample history on `/my-scores`. Only solved Wordle recognition, parsing, and preview are supported; future game selection/renderer registration has not been built. The earlier stale `WordleScoreBoard` import was replaced rather than restoring that missing component. No app checks were run.

**References**

- [MDN: regular-expression groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences) — capture groups and reading their matched values.
- [MDN: Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number) — converting a captured string into a number without `new`.
- [MDN: Array.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) — requiring every grid row to pass the same predicate.
- [MDN: Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) — guarding integer values against JavaScript's numeric precision limits.
- [TypeScript: classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) — inheritance, readonly identity fields, and abstract classes.

## Product direction: shared input and player leaderboard

**Accepted user direction:** the homepage should have one form for share results from any supported game. Parsing should identify the game and produce a structured record suitable for storage. A homepage leaderboard should compare players using their stored records and a standardized score from 1–100. Each game should have its own class containing its custom scoring logic.

The chronological submission list and the player leaderboard serve different purposes: one shows when individual results arrived; the other compares players after game-specific scoring and aggregation. Replacing visible guess ranks in the submission list does not remove the planned leaderboard.

**Proposed implementation approach:** a shared parsing dispatcher can delegate to individual game parsers/classes, keeping the form independent of game rules. This is an architectural proposal for the next steps, not existing functionality. Only the Wordle game class/parser currently exists; the form is configured for its feedback, with no automatic game identification, stored submissions, or standardized scoring.

**Still unresolved:** per-game 1–100 formulas, how multiple records become a player's leaderboard score, participation weighting, and the relevant time windows. No scoring formula or record aggregation rule has been chosen. Obtain actual share examples for each game before implementing its parser.

**Desired review-and-save workflow:** the user wants to enter a player name and share text, have the form identify/validate the result as it changes, and automatically see the valid game's card for review. Submit should be enabled only with a valid name and supported result. The server should validate again, calculate trusted game scores, and save a plain structured record. Show success only after saving succeeds; retain the input when saving fails. Later authentication should supply a durable account ID rather than trusting the entered display name.

**Implementation recommendations, not completed work:** accept pasted, typed, and edited text through the same controlled `onChange` flow; do not restrict the field to paste events. The current small local parser can run immediately without a debounce, which would only add delayed work at this stage. Derive detection, validity, and preview from current input instead of keeping a submitted-input snapshot that can become stale. Avoid reporting an error on every incomplete edit, and make no server calls until Submit. Revisit debouncing if later processing is measurably expensive or requires remote calls. These choices support prompt review while keeping saving a deliberate action.

The current implementation still requires “Read game result” to produce its parsed preview and does not save anything. Automatic preview, Submit gating, server validation, database writes, and post-save success feedback are planned. Game classes remain behavior providers, while `Score<TResult>` is plain submission data for eventual storage; constructing a class instance is not a database save. No application code or checks were performed for this planning discussion.

**References**

- [TypeScript: classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) — class fields and methods for the requested per-game scoring classes; this describes the language tool, not an implemented Battledle scoring design.

## Sortable player leaderboard prototype

**Implementation references:** [components/Leaderboard.tsx](../components/Leaderboard.tsx), `Leaderboard` and `SortField`; [types/player.ts](../types/player.ts), `PlayerStanding`; [data/samplePlayers.ts](../data/samplePlayers.ts), `samplePlayers`.

The user requested a separate homepage leaderboard containing player name, points, and streak, ordered by a selected field. The leaderboard is separate from submission history, which is displayed on `/my-scores`; the homepage submission table has been removed. The client leaderboard accepts player standings as props and keeps only the selected sort field in state, initially total points. A string-literal union limits that field to `totalPoints`, `streak`, or `name`. The select handler checks its string value before setting state, narrowing it to an allowed member.

**Player model clarification:** [types/player.ts](../types/player.ts) now defines `Player` with `id`, `name`, `totalPoints`, `gamePoints`, `gameStreaks`, `bestGames`, `bestPlay`, and `totalPlays`. The user chose explicit total names. `bestGames` contains the game or tied games from which a player earned the most points; `bestPlay` is the ID of the highest-scoring submission, or `null` when unset. Tie handling for best-play submissions and statistics-computation algorithms have not been defined.

At the user's request, `gamePoints: Partial<Record<GameId, number>>` stores accumulated standardized points separately for each game. The same keyed pattern as streaks supports adding a game without adding a dedicated player field. An omitted key represents no entry for that game, such as when it has not been played. This is a type-shape change only: totals are not calculated or populated yet, and the leaderboard projection is unchanged. No checks were run.

`gameStreaks` is `Partial<Record<GameId, GameStreak>>`: `Record` maps game IDs to streak data, while `Partial` permits games without an entry. Each `GameStreak` stores `currentStreak`, `longestStreak`, and nullable `lastPuzzleDate`; this shape does not implement how streaks advance. [types/game.ts](../types/game.ts) defines IDs for planned Wordle, Mini, Connections, and Krillion games; those names do not establish implemented parsing support.

The core `Player` has no single streak. `PlayerStanding` remains a separate temporary leaderboard projection, selecting ID/name/total points and retaining a fixture `streak` while the displayed per-game streak choice remains unresolved. The leaderboard and fixtures now use `totalPoints` for field access, sorting, and labeling. No cross-game streak aggregation, statistics calculation, authentication, or database model was invented, and no app checks were run.

The component copies the players array before sorting. Numeric fields sort highest first using bracket access with the selected field; name sorting uses `localeCompare` for A–Z. Ordering is derived each render, not maintained as a second state array. A labeled select controls the order, generated IDs connect labels/headings, and `aria-sort` marks the active column and direction. Row headers name players; fixture IDs provide React keys. No ordinal ranks or special tie policy were added.

Points and streaks are explicitly display fixtures, not calculated from score records. Fixture IDs are not authenticated account IDs. The sample point totals do not establish how individual standardized 1–100 game scores aggregate into leaderboard points. Streak units/calculation, point aggregation, and time windows remain undecided. This prototype adds no storage, authentication, or derived scoring, and no app checks were run.

**References**

- [TypeScript: narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — using value checks to refine a string to the allowed sort-field union.
- [MDN: aria-sort](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort) — exposing the sorted column and direction to assistive technology.

## Personal score history and file-based routing

**Implementation reference:** [app/my-scores/page.tsx](../app/my-scores/page.tsx), `MyScores`; the homepage links to it with Next.js `Link`.

The user requested a personal scores page before authentication. In the App Router, the `my-scores` folder adds the URL segment and its default-exported `page.tsx` component provides `/my-scores`. This page remains a Server Component: it reads fixtures and renders markup without interactive state. A return link navigates home.

`currentPlayer = "ZBot"` is explicitly temporary demo identity. `filter` keeps matching sample records and creates a new array, so the following newest-first `sort` changes that filtered array rather than `sampleScores`. Each record now renders a `ScoreRow` row within shared `ScoreTable`; the row displays a UTC submission timestamp and `time` carries the machine-readable value through `dateTime`. A conditional empty state handles no matching records.

This displays sample history only. It does not authenticate anyone, persist data, or receive newly submitted results. A player-name comparison is not a durable account ID or an authorization check. Authentication remains a later milestone; no app checks were run for this page.

**References**

- [Next.js: layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) — folder-based routes, page exports, and links between pages.
- [MDN: Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — selecting matching entries into a new shallow array.

## Tailwind styling and alignment

**Implementation references:** [components/ScoreRow.tsx](../components/ScoreRow.tsx) for row/cell styling; [components/ScoreTable.tsx](../components/ScoreTable.tsx) for the table and overflow container; [app/page.tsx](../app/page.tsx) for page layout; [app/globals.css](../app/globals.css) for shared global styling.

Tailwind utilities are CSS rules applied through `className`. Score rows use utilities for cell padding, borders, text, and hover backgrounds; the table container supplies rounding and horizontal overflow. Look at the actual class list for examples instead of maintaining a second copy here.

In a flex row, `items-center` aligns children across the row's cross axis (normally vertically). `gap-6` spaces the children; it does not set their alignment. Text alignment and flex-item alignment solve different problems. When a layout looks wrong, identify the parent layout direction and the axis involved before choosing a utility.

**Table presentation requested by the user:** `ScoreRow` returns a `tr` with four `td` cells: player, game, date inputted, and message. `ScoreTable` owns the shared table, caption, header row, and `tbody`; both `ScoreBoard` and `/my-scores` put score rows inside that body. Rows belong inside a table row group, not directly inside a list or ordinary layout div. `children` lets each caller supply rows while reusing the same column structure. Column headers use `scope="col"`, and the caption is visually hidden with `sr-only` while remaining available to assistive technology.

“Date inputted” means `submittedAt`, not puzzle `datePlayed`. The implementation explicitly labels UTC and uses `toUTCString()` for consistent rendering; this does not settle the product's puzzle-day or leaderboard time-zone policy. Horizontal overflow keeps wide tables scrollable, and padding/borders align cells across rows. No app checks were run for this presentation change.

Current styling uses utilities on components and shared styling in the global stylesheet. Keep styling choices consistent with the project's accepted convention as it evolves.

The user chose to continue using Tailwind while learning the CSS behind the utilities. Explain the underlying layout or style property alongside the class name. For the pasted-result field, inspect the column flex container, gap, border, rounding, and padding utilities in [ScoreForm](../components/ScoreForm.tsx).

**References**

- [MDN: HTML table](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table) — table structure, captions, headers, body rows, and accessibility semantics.
- [Tailwind: styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes) — combining utilities to build a component's appearance.

## Git and GitHub workflow

**Git** records version history locally: a commit captures staged changes with a message. **GitHub** hosts a remote repository so that history can be pushed off the computer and shared. Saving a file, committing it, and pushing it are separate actions. The starter supplied local Git history; the user subsequently reported that the GitHub push is complete. The remote and published contents were not independently verified.

Run project Git commands from `/Users/zachk/Desktop/battledle`. The following remain reusable workflow guidance; the user's completed-push report does not establish which exact commands they used. Replace placeholder values before use.

| Suggested command | Purpose and when to use it |
| --- | --- |
| `git status` | See the current branch and which files are changed, staged, or untracked. |
| `git add <paths>` | Stage the intended files for the next commit. Replace `<paths>` with the files being included. |
| `git commit -m "Describe the change"` | Save the staged snapshot in local history, with a meaningful message. |
| `git remote add origin <repository-url>` | First connection only: name the GitHub repository `origin`. Use the actual repository URL; do not repeat if that remote already exists. |
| `git push -u origin main` | Push local `main` to `origin` and establish its upstream association. This assumes the intended local branch is `main`. |

Never commit credentials, tokens, or other secrets. [.gitignore](../.gitignore) records files Git should ignore; it does not remove secrets already recorded in history.

**References**

- [Git command reference](https://git-scm.com/docs) — official details for status, staging, commits, remotes, and pushing.
- [GitHub: Hello World](https://docs.github.com/en/get-started/using-github/hello-world) — introduces repositories, commits, branches, and the collaboration workflow.

## Progress and next exercise

- Environment setup now includes a project Node version file and verified automatic shell switching. User verification in the existing VS Code terminal remains pending.
- Milestone 1 is complete per the project guide: the user ran the development server and customized the homepage. Historical setup checks do not establish that later changes were verified.
- The user has customized the homepage introduction, extracted `AppIntro`, and completed the typed `tagline` prop exercise in [app/page.tsx](../app/page.tsx). This records actual practice, not assumed mastery or a browser check.
- Session checkpoint: the user implemented a typed static scoreboard, extracted `ScoreCard`, shared the score type and sample data across files, added pure ranking, displayed positions with the `map` index, and practiced Tailwind layout. These implementation observations do not imply production game rules are settled or that fresh checks passed.
- GitHub checkpoint: the user reports that publishing is complete. The remote and published contents were not independently verified; repeating the initial publishing workflow is no longer the immediate exercise.
- No verification was requested for tonight's checkpoint. No fresh lint, type, build, or browser checks were run by the note-taker. The passing setup checks above are historical and do not certify the later scoreboard changes.
- Latest checkpoint: the user extracted `ScoreBoard` and corrected its missing return and mismatched heading tags. No fresh tests, lint, type checks, or browser checks were run for this extraction. Milestone 2 has not been marked complete.
- Local-state checkpoint: generic `ScoreBoard` initializes `scores` from `initialScores` and orders by submission timestamp, newest first, using supplied rendering/key functions. `WordleScoreBoard` supplies Wordle data and behavior, and `Home` renders that configuration. No checks were run for this refactor; no milestone completion is implied.
- Input checkpoint: the homepage directly mounts `ScoreForm` with name and share-result inputs. It recognizes/parses Wordle once, keeps a parsed-result/name preview, and clears feedback/preview on either edit. No records are saved or authenticated; `GameScoreForm` and configurable callback props were removed.
- Mentoring preference update: the user now asks the agent to write each small code change directly in the files and keep explaining it. The guide records this standing preference; the learning roadmap still does not authorize building the whole application at once.
- Parser checkpoint: `WordleGame.parse` validates the solved-result header and plain standard-palette emoji grid; `getFeedback` connects it to the form. The unused old parser wrapper/directory were removed at the user's request. Date validation, failure representation, high-contrast support, and adding scores remain future work; no submission policy has been implemented.
- Product checkpoint: the user chose a shared game-identifying input, structured stored records, and a separate player leaderboard with per-game scoring classes producing 1–100 scores. The first Wordle behavior class now exists; dispatcher design is proposed, while formulas and leaderboard aggregation remain undecided. No implementation or checks were performed for this design discussion.
- Personal-history checkpoint: `/my-scores` displays ZBot's filtered sample records in submission order, with links to/from home. Identity is a temporary fixture; no authentication, persistence, or new submissions were added or verified.
- Leaderboard checkpoint: the homepage now has a separate player table with points/streak/name selection and sample standings. Sorting is implemented; calculating those metrics from records remains unresolved and unimplemented. No checks were run.
- Wordle-card checkpoint: standalone `WordleScoreCard` renders solved parsed results, and the homepage form now previews valid parsed results. The stale homepage board import was replaced with direct `ScoreForm`; the absent board was not restored. No app checks were run.
- On resuming, read the current `Score`, `sampleScores`, `ScoreCard`, `ScoreRow`, `ScoreTable`, `ScoreForm`, `WordleGame`, and `Home` references above before choosing the next small coding exercise with the user.

**References**

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) — official project creation options and instructions for running the development server.
