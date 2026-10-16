# Battledle learning notes

These notes record useful explanations and verified outcomes, not a transcript. Suggested commands are distinguished from commands already run. See [the project guide](../AGENTS.md) for the roadmap and mentoring approach.

## Contents

- [Node.js, npm, and project versions](#nodejs-npm-and-project-versions)
- [Automatic version switching in the terminal](#automatic-version-switching-in-the-terminal)
- [Next.js starter and project files](#nextjs-starter-and-project-files)
- [React components, typed props, and JSX](#react-components-typed-props-and-jsx)
- [Static scores, shared files, and ranking](#static-scores-shared-files-and-ranking)
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

## Next.js starter and project files

**Completed checkpoint:** the user generated a Next.js starter in `battledle-starter`. Using a child folder avoided generator conflicts with existing root files, including `AGENTS.md` and `.nvmrc`. After inspecting for collisions, all generated entries—including hidden entries such as `.git` and `.next`, plus `node_modules`—were moved to the project root, and the empty temporary folder was removed. Existing project documentation and `.nvmrc` were preserved. The project name was updated to `battledle` in the manifest and the lockfile's root package records.

The installed starter uses Next.js **16.4.2** and React **19.3.0**. Its application directory is `app/` at the root; the earlier roadmap's `src/app/` path was only a proposal. [next.config.ts](../next.config.ts) also contains generated `cacheComponents: true` and `partialPrefetching: true` settings. These generated settings were preserved; no product requirement or user design reasoning is implied by them.

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

## Static scores, shared files, and ranking

The user has progressed from one component with a text prop to a static scoreboard. The current separation keeps data, its shape, presentation, and ordering understandable independently:

| Project reference | Pattern and purpose |
| --- | --- |
| [types/score.ts](../types/score.ts): `Score` | A shared object shape with `player`, `game`, and `playedOn` strings and numeric `guesses`. `playedOn` currently holds a date string; types describe shape, not complete game validation. |
| [data/sampleScores.ts](../data/sampleScores.ts): `sampleScores` | An array of `Score` objects, separate from markup. Sample entries are learning fixtures, not finalized valid-game rules. |
| [components/ScoreCard.tsx](../components/ScoreCard.tsx): `ScoreCard`, `ScoreCardProps` | One score's presentation, accepting a `Score` object and numeric `rank`. Extracting it avoids duplicating markup for each player. |
| [lib/ranking.ts](../lib/ranking.ts): `rankScores` | A pure ordering function: it returns an ordered array without changing the input array. Keeping it outside React separates ranking logic from rendering. |
| [app/page.tsx](../app/page.tsx): `Home` | Calls `rankScores`, then uses `map` to turn each score into a `ScoreCard`. |

**JavaScript patterns practiced:** `Score[]` means an array whose entries have the `Score` shape. Array spread creates a shallow copy before `sort`, because `sort` rearranges its receiver. The comparator subtracts the second score's guesses from the first: a negative result places the first before the second, producing ascending guesses. This ranks the current sample by fewer guesses; it does not settle ties, failures, missing submissions, or ranking across games.

`map` calls a callback for each entry and collects the returned values. Here those values are JSX elements. Its second callback parameter is the zero-based index; adding one produces the visible position passed as `rank`. This is sequential placement, not a shared-rank tie policy. React's `key` serves a different purpose: identifying list items across renders. The current player-name key relies on unique sample names and should be revisited when real submission identities exist.

**References**

- [React: rendering lists](https://react.dev/learn/rendering-lists) — mapping data to components and choosing keys.
- [JavaScript array sorting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — comparator return values and the fact that sorting changes the array being sorted.

## Tailwind styling and alignment

**Implementation references:** [components/ScoreCard.tsx](../components/ScoreCard.tsx) for card styling and its inner flex row; [app/page.tsx](../app/page.tsx) for page layout; [app/globals.css](../app/globals.css) for shared global styling.

Tailwind utilities are CSS rules applied through `className`. The score card combines small utilities for padding, margins, borders, rounding, background, text size, and weight. Look at the actual class list for examples instead of maintaining a second copy here.

In a flex row, `items-center` aligns children across the row's cross axis (normally vertically). `gap-6` spaces the children; it does not set their alignment. Text alignment and flex-item alignment solve different problems. When a layout looks wrong, identify the parent layout direction and the axis involved before choosing a utility.

Current styling uses utilities on components and shared styling in the global stylesheet. Keep styling choices consistent with the project's accepted convention as it evolves.

**References**

- [Tailwind: styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes) — combining utilities to build a component's appearance.

## Git and GitHub workflow

**Git** records version history locally: a commit captures staged changes with a message. **GitHub** hosts a remote repository so that history can be pushed off the computer and shared. Saving a file, committing it, and pushing it are separate actions. The starter already supplied local Git history; a GitHub push is not yet confirmed.

Run project Git commands from `/Users/zachk/Desktop/battledle`. The following are proposed workflow commands; this checkpoint does not record them as executed. Replace placeholder values before use.

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
- Milestone 1 is still in progress. The starter exists at the project root, and lint and type checks have passed; development-server and browser checks remain pending.
- Next: run `npm run dev` at the project root and open its printed URL.
- The user has customized the homepage introduction, extracted `AppIntro`, and completed the typed `tagline` prop exercise in [app/page.tsx](../app/page.tsx). This records actual practice, not assumed mastery or a browser check.
- Session checkpoint: the user implemented a typed static scoreboard, extracted `ScoreCard`, shared the score type and sample data across files, added pure ranking, displayed positions with the `map` index, and practiced Tailwind layout. These implementation observations do not imply production game rules are settled or that fresh checks passed.
- Immediate next step: preserve this session's work in Git and push to GitHub. No completed commit, remote connection, or push is recorded by this checkpoint. Resume the learning roadmap after that workflow; score entry remains a future milestone.

**References**

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) — official project creation options and instructions for running the development server.
