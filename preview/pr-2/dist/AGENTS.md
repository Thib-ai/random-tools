# AI Agents Guidance

This file provides instructions and constraints for AI agents (like Vibe Code) working on the `random-tools` repository.

## Repository Purpose

This is a GitHub Pages site hosting various browser-based tools that run entirely in the browser (client-side JavaScript). Each tool should be:

- **Self-contained**: No server-side processing required
- **Browser-compatible**: Works in modern browsers without dependencies
- **Offline-capable**: Should work without internet connection once loaded
- **Fast**: Minimal dependencies, optimized for performance

## Project Structure

```
random-tools/
├── index.html          # Home page with tool listing
├── styles.css          # Global styles
├── script.js           # Home page JavaScript
├── tools.json          # Tool metadata and configuration
├── AGENTS.md           # This file
└── tools/
    ├── tool-name/      # Individual tool directories
    │   └── index.html  # Tool implementation
    └── ...
```

## Tool Development Guidelines

### For New Tools

1. **Directory Structure**: Create a new directory under `tools/` with a descriptive name (kebab-case)
2. **Entry Point**: Each tool must have an `index.html` file
3. **Metadata**: Add the tool to `tools.json` with:
   - `id`: Unique identifier (kebab-case)
   - `title`: Display name
   - `description`: Brief description
   - `icon`: Emoji for visual identification
   - `category`: One of: `web`, `text`, `code`, `utility`
   - `tags`: Array of relevant keywords
   - `path`: Relative path from repo root (e.g., `tools/tool-name/index.html`)
   - `enabled`: `true` to show on home page

4. **Standards**:
   - Use semantic HTML5
   - Follow accessibility best practices (ARIA labels, keyboard navigation)
   - Responsive design (mobile-first)
   - Minimal external dependencies
   - Clean, readable code

### Tool Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Name | Random Tools</title>
    <link rel="stylesheet" href="../../styles.css">
    <style>
        /* Tool-specific styles */
    </style>
</head>
<body>
    <header>
        <h1>Tool Name</h1>
        <p>Brief description</p>
        <a href="../../" class="back-link">← Back to Tools</a>
    </header>
    
    <main>
        <!-- Tool content -->
    </main>
    
    <footer>
        <p><a href="../../">Random Tools</a></p>
    </footer>
    
    <script>
        // Tool-specific JavaScript
    </script>
</body>
</html>
```

## Workflow

### Adding a New Tool

1. Create tool directory: `mkdir tools/new-tool`
2. Create `tools/new-tool/index.html` with the tool implementation
3. Add tool metadata to `tools.json`
4. Test locally by opening the HTML file in a browser
5. Commit and push to `main` branch
6. GitHub Pages will auto-deploy via workflow

### Updating Existing Tools

1. Modify the tool's files in its directory
2. Update `tools.json` if metadata changes
3. Test changes locally
4. Commit and push to `main`

## GitHub Pages

- **Deployment**: Automatic via GitHub Actions workflow (`.github/workflows/deploy-pages.yml`)
- **Source**: `main` branch, root directory
- **URL**: `https://thib-ai.github.io/random-tools/`
- **Trigger**: Push to `main` branch or manual workflow dispatch

## Agent Instructions

### Do

- Follow existing code style and patterns
- Use semantic HTML and CSS
- Ensure all tools work offline
- Add proper error handling
- Include input validation
- Optimize for performance
- Test in multiple browsers when possible
- Update `tools.json` when adding/removing tools
- Use relative paths for internal links

### Don't
n- Add server-side code or APIs
- Include large external libraries without justification
- Break existing functionality
- Modify files outside the tool's directory without reason
- Use proprietary licenses for code
- Add tracking or analytics without permission

## Testing

Agents should verify:

1. **Home Page**:
   - All tools display correctly
   - Search functionality works
   - Category filtering works
   - Responsive on different screen sizes

2. **Individual Tools**:
   - Load without errors
   - Function as intended
   - Handle edge cases gracefully
   - Work on mobile devices

3. **Deployment**:
   - GitHub Pages workflow runs successfully
   - Site is accessible at the GitHub Pages URL

## Communication

When working on this repository:

- Be concise and direct
- Explain changes clearly
- Report any issues found
- Suggest improvements when relevant
- Respect the repository's purpose and constraints

## Example Workflow for Agents

```
User: "Add a new tool for X"

Agent:
1. Analyze requirements
2. Check if similar tool exists
3. Create tool directory and implementation
4. Add to tools.json
5. Test locally
6. Commit with descriptive message
7. Push to main (triggers deployment)
8. Report completion and URL
```

## Version Control

- Use descriptive commit messages
- Keep commits focused and atomic
- Reference issues or requests when applicable
- Use branch naming: `feature/tool-name`, `fix/tool-name`, `refactor/tool-name`

## Security

- Sanitize all user inputs
- Escape HTML to prevent XSS
- Don't include sensitive data
- Use HTTPS for any external resources
- Validate all inputs before processing
