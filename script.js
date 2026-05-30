/**
 * Random Tools - Home Screen JavaScript
 * Handles tool listing, search, filtering, and navigation
 */

// Global variables
let tools = [];
let currentFilter = 'all';
let currentSearch = '';

// DOM elements
const toolsGrid = document.getElementById('tools-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const noResults = document.getElementById('no-results');
const filterButtons = document.querySelectorAll('.filter-btn');
const currentYear = document.getElementById('current-year');

// Initialize the page
function init() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();

    // Load tools from inline data (instant)
    loadTools();

    // Setup event listeners
    setupEventListeners();

    // Render initial tools
    renderTools();
}

// Load tools from inline data (instant, no network request)
function loadTools() {
    // Use inline data if available, otherwise fallback to fetch
    if (window.__TOOLS_DATA__) {
        tools = window.__TOOLS_DATA__;
    } else {
        // Fallback for development or if inline data is missing
        console.warn('Using fallback fetch for tools.json');
        tools = [];
    }
    // Filter out disabled tools
    tools = tools.filter(tool => tool.enabled !== false);
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        clearSearchBtn.classList.toggle('hidden', currentSearch === '');
        renderTools();
    });

    // Clear search button
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        clearSearchBtn.classList.add('hidden');
        renderTools();
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            currentFilter = button.dataset.category;
            renderTools();
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape to clear search
        if (e.key === 'Escape' && currentSearch !== '') {
            searchInput.value = '';
            currentSearch = '';
            clearSearchBtn.classList.add('hidden');
            renderTools();
        }

        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Render tools based on current search and filter
function renderTools() {
    // Clear existing tools
    toolsGrid.innerHTML = '';

    // Filter tools
    let filteredTools = tools;

    // Apply category filter
    if (currentFilter !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === currentFilter);
    }

    // Apply search filter
    if (currentSearch !== '') {
        filteredTools = filteredTools.filter(tool => {
            const searchLower = currentSearch.toLowerCase();
            return (
                tool.title.toLowerCase().includes(searchLower) ||
                tool.description.toLowerCase().includes(searchLower) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
                tool.id.toLowerCase().includes(searchLower)
            );
        });
    }

    // Show no results message if no tools match
    noResults.classList.toggle('hidden', filteredTools.length > 0);

    // Render each tool
    filteredTools.forEach((tool, index) => {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);

        // Add animation delay for staggered appearance
        toolCard.style.animationDelay = `${index * 0.05}s`;
    });
}

// Create a tool card element
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.dataset.category = tool.category;
    card.dataset.tags = tool.tags.join(',');

    card.innerHTML = `
        <div class="tool-icon">${tool.icon}</div>
        <h3 class="tool-title">${escapeHtml(tool.title)}</h3>
        <p class="tool-description">${escapeHtml(tool.description)}</p>
        <div class="tool-tags">
            ${tool.tags.map(tag => `<span class="tool-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <a href="${escapeHtml(tool.path)}" class="tool-link">Open Tool</a>
    `;

    return card;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Also run if script is loaded after DOM (for some edge cases)
if (document.readyState !== 'loading') {
    init();
}
