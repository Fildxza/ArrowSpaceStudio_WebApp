# Live preview in VS Code (code on the left, site on the right)

This is a React/Vite app, so it must be previewed through its **dev server**.
Do **not** use the _Live Server_ / _Live Preview_ ("Go Live") extensions — they
only serve plain HTML files and will show a blank page or 404 here.

**Two shortcuts (set up in the developer's VS Code user keybindings — they are not stored in this repository):**

| Keys         | What it does                                            |
| ------------ | ------------------------------------------------------- |
| `Ctrl+Alt+S` | Starts the dev server (`npm run dev`, hot reload)       |
| `Ctrl+Alt+P` | Opens the site in a Simple Browser **beside** your code |

1. Open the folder in VS Code and press **Ctrl+Alt+S**. Wait for the terminal to
   show `Local: http://localhost:5173/`.
2. Press **Ctrl+Alt+P** — the site appears in a panel on the right. Every time
   you save a file the preview updates by itself.

No shortcut? `Ctrl+Shift+P` → **Simple Browser: Show** → `http://localhost:5173`,
then drag the tab to the right side. To recreate the shortcuts on another
machine, add this to _Preferences: Open Keyboard Shortcuts (JSON)_:

```json
[
  {
    "key": "ctrl+alt+p",
    "command": "simpleBrowser.api.open",
    "args": ["http://localhost:5173", { "viewColumn": -2, "preserveFocus": true }]
  },
  {
    "key": "ctrl+alt+s",
    "command": "workbench.action.tasks.runTask",
    "args": "Dev server (live preview)"
  }
]
```

Other options: **F5** → _Live preview — inside VS Code_ (Microsoft Edge Tools
extension) or _Live preview — Edge window_ (supports breakpoints).
If the preview shows a different site, another project is already using port
5173 — stop it (the dev server is pinned to 5173 and will refuse to start).
Settings live in `.vscode/` (`tasks.json`, `launch.json`, `settings.json`).
