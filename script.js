// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-mode');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark-mode');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

initTheme();
themeToggle.addEventListener('click', toggleTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark-mode', e.matches);
    }
});

// Get DOM elements
const textInput = document.getElementById('textInput');
const clearBtn = document.getElementById('clearBtn');
const copyStatsBtn = document.getElementById('copyStatsBtn');

// Stat elements
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const charNoSpaceCountEl = document.getElementById('charNoSpaceCount');
const lineCountEl = document.getElementById('lineCount');
const avgWordLengthEl = document.getElementById('avgWordLength');
const longestWordEl = document.getElementById('longestWord');
const uniqueWordsEl = document.getElementById('uniqueWords');
const letterCountEl = document.getElementById('letterCount');
const digitCountEl = document.getElementById('digitCount');
const whitespaceCountEl = document.getElementById('whitespaceCount');
const frequencyListEl = document.getElementById('frequencyList');

// Load saved text from localStorage
const savedText = localStorage.getItem('wordCounterText');
if (savedText) {
    textInput.value = savedText;
    analyzeText();
}

// Event listeners
textInput.addEventListener('input', () => {
    analyzeText();
    localStorage.setItem('wordCounterText', textInput.value);
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    localStorage.removeItem('wordCounterText');
    analyzeText();
});

copyStatsBtn.addEventListener('click', copyStatistics);

function analyzeText() {
    const text = textInput.value;

    // Basic counts
    const wordCount = countWords(text);
    const charCount = text.length;
    const charNoSpaceCount = text.replace(/\s/g, '').length;
    const lineCount = countLines(text);

    // Complexity metrics
    const words = getWords(text);
    const avgWordLength = words.length > 0
        ? (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(1)
        : 0.0;
    const longestWord = words.length > 0
        ? Math.max(...words.map(w => w.length))
        : 0;
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;

    // Character types
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const digitCount = (text.match(/\d/g) || []).length;
    const whitespaceCount = (text.match(/\s/g) || []).length;

    // Update DOM with animation
    updateStat(wordCountEl, wordCount);
    updateStat(charCountEl, charCount);
    updateStat(charNoSpaceCountEl, charNoSpaceCount);
    updateStat(lineCountEl, lineCount);
    updateStat(avgWordLengthEl, avgWordLength);
    updateStat(longestWordEl, longestWord);
    updateStat(uniqueWordsEl, uniqueWords);
    updateStat(letterCountEl, letterCount);
    updateStat(digitCountEl, digitCount);
    updateStat(whitespaceCountEl, whitespaceCount);

    // Update frequency analysis
    updateFrequencyAnalysis(words);
}

function updateStat(element, value, unit = '') {
    const statValue = element.querySelector('.stat-unit')?.previousSibling || element;
    if (statValue.textContent !== String(value)) {
        statValue.textContent = value;
        element.classList.add('pulse');
        setTimeout(() => element.classList.remove('pulse'), 300);
    }
    if (unit && element.querySelector('.stat-unit')) {
        element.querySelector('.stat-unit').textContent = unit;
    }
}

function countWords(text) {
    const words = getWords(text);
    return words.length;
}

function getWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0);
}

function countLines(text) {
    if (!text.trim()) return 0;
    return text.split('\n').length;
}

function updateFrequencyAnalysis(words) {
    if (words.length === 0) {
        frequencyListEl.innerHTML = '<div class="empty-state">Start typing to see word frequency analysis...</div>';
        return;
    }

    // Count word frequencies (case-insensitive, filter out very short words)
    const frequency = {};
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (lowerWord.length > 2) { // Only count words longer than 2 characters
            frequency[lowerWord] = (frequency[lowerWord] || 0) + 1;
        }
    });

    // Sort by frequency and get top 10
    const sortedWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    if (sortedWords.length === 0) {
        frequencyListEl.innerHTML = '<div class="empty-state">No words long enough for frequency analysis...</div>';
        return;
    }

    // Find max count for bar width calculation
    const maxCount = sortedWords[0][1];

    // Generate HTML
    frequencyListEl.innerHTML = sortedWords.map(([word, count], index) => {
        const percentage = (count / maxCount) * 100;
        return `
            <div class="frequency-item">
                <span class="frequency-rank">#${index + 1}</span>
                <span class="frequency-word">${word}</span>
                <div class="frequency-bar-container">
                    <div class="frequency-bar" style="width: ${percentage}%"></div>
                </div>
                <span class="frequency-count">${count}×</span>
            </div>
        `;
    }).join('');
}

function copyStatistics() {
    const text = textInput.value;
    const words = getWords(text);

    const stats = `
WORD COUNTER STATISTICS
========================

BASIC COUNTS
• Words: ${wordCountEl.textContent}
• Characters: ${charCountEl.textContent}
• Characters (no spaces): ${charNoSpaceCountEl.textContent}
• Lines: ${lineCountEl.textContent}

COMPLEXITY
• Average Word Length: ${avgWordLengthEl.textContent}
• Longest Word: ${longestWordEl.textContent} characters
• Unique Words: ${uniqueWordsEl.textContent}

CHARACTER TYPES
• Letters: ${letterCountEl.textContent}
• Digits: ${digitCountEl.textContent}
• Whitespace: ${whitespaceCountEl.textContent}
    `.trim();

    navigator.clipboard.writeText(stats).then(() => {
        const originalText = copyStatsBtn.textContent;
        copyStatsBtn.textContent = '✓ Copied!';
        copyStatsBtn.style.background = 'var(--accent-2)';
        copyStatsBtn.style.color = 'white';
        setTimeout(() => {
            copyStatsBtn.textContent = originalText;
            copyStatsBtn.style.background = '';
            copyStatsBtn.style.color = '';
        }, 2000);
    });
}

// Initial analysis if there's saved text
if (savedText) {
    analyzeText();
}
