# Word Counter - Text Analytics Tool

A beautiful, comprehensive word counter application with extensive text analytics. Designed for writers, editors, students, and anyone who needs detailed text statistics.

## Features

### 📊 Basic Counts (100% Accurate)
- Words, characters (with/without spaces)
- Lines

### 🧮 Complexity Analysis (100% Accurate)
- Average word length
- Longest word
- Unique words count

### 🔤 Character Types (100% Accurate)
- Letters (A-Z, a-z)
- Digits (0-9)
- Whitespace characters

### 📈 Word Frequency (100% Accurate)
- Top 10 most common words (>2 characters)
- Visual frequency bars
- Real-time analysis

### 💾 Additional Features
- Auto-save to localStorage (text persists between sessions)
- Copy statistics to clipboard
- Fully responsive design
- Real-time updates as you type
- Clean, editorial-inspired design

**Note:** This tool only includes metrics that can be calculated with 100% accuracy. Error-prone estimates (like reading time, sentence counting, and pattern-based detection) have been intentionally excluded to ensure reliability.

## Deployment to GitHub Pages

### Quick Deploy

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Word Counter app"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/word-counter.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/word-counter/`

### Alternative: Deploy to Existing Repository

If you want to add this to an existing repository:

1. Copy `index.html` to your repository
2. Enable GitHub Pages in repository settings
3. Access at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Local Development

Simply open `index.html` in your web browser. No build process or dependencies required!

```bash
# On Linux/Mac
open index.html

# On Windows
start index.html
```

## Technology Stack

- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **Modern CSS** - Grid, Flexbox, CSS Variables, Animations
- **LocalStorage API** - Automatic text persistence
- **Clipboard API** - Copy statistics feature
- **Google Fonts** - Crimson Pro, JetBrains Mono, Inter

## Use Cases

- **Writers**: Track word counts for articles, essays, novels
- **Students**: Meet assignment word count requirements
- **Editors**: Analyze text complexity and word patterns
- **Content Creators**: Analyze content metrics accurately
- **Developers**: Analyze code comments and documentation
- **Researchers**: Study text patterns and word frequencies

## License

MIT License - see [LICENSE](LICENSE) file for details.

Free to use, modify, and distribute for any purpose.

## Customization

The app uses CSS variables for easy theming. Edit the `:root` section in `index.html`:

```css
:root {
    --bg-primary: #faf8f5;
    --accent-1: #c97b4a;
    /* ... and more */
}
```

---

**Built with care** • Ready to deploy on [GitHub Pages](https://pages.github.com/)
