// Leaderboard Data
const leaderboardData = [
    { rank: 1, name: "Proprietary Agent (HIL)", solved: 14, successRate: 5700, llm: "Sonnet-4.5" },
    { rank: 2, name: "Human Team 1", solved: 13, successRate: 5400, llm: "N/A" },
    { rank: 3, name: "Proprietary Agent", solved: 12, successRate: 4900, llm: "Sonnet-4.5" },
    { rank: 4, name: "Claude Code", solved: 11, successRate: 4600, llm: "Sonnet-4.5" },
    { rank: 5, name: "Human Team 2", solved: 11, successRate: 4600, llm: "N/A" },
    { rank: 6, name: "Human team 3", solved: 11, successRate: 4400, llm: "N/A" },
    { rank: 7, name: "Proprietary Agent", solved: 10, successRate: 4300, llm: "Opus-4.1"},
    { rank: 8, name: "Human Team 4", solved: 10, successRate: 4100, llm: "N/A" },
];

// Initialize leaderboard
function initLeaderboard() {
    renderLeaderboard();
}

// Render leaderboard table
function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');

    tbody.innerHTML = '';

    leaderboardData.forEach(entry => {
        const row = document.createElement('tr');

        let rankBadgeClass = '';
        if (entry.rank === 1) rankBadgeClass = 'rank-1';
        else if (entry.rank === 2) rankBadgeClass = 'rank-2';
        else if (entry.rank === 3) rankBadgeClass = 'rank-3';

        row.innerHTML = `
            <td><span class="rank-badge ${rankBadgeClass}">${entry.rank}</span></td>
            <td><strong>${entry.name}</strong></td>
            <td>${entry.solved}</td>
            <td>${entry.successRate}</td>
            <td>${entry.llm}</td>
        `;

        tbody.appendChild(row);
    });
}

// Copy BibTeX to clipboard
function copyBibtex() {
    const bibtexCode = document.getElementById('bibtex-code').textContent;

    navigator.clipboard.writeText(bibtexCode).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;

        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#059669';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please select and copy manually.');
    });
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    initLeaderboard();

    // Add active state to nav links on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.borderBottom = '';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.borderBottom = '2px solid var(--primary-color)';
            }
        });
    });
});

// Make copyBibtex function globally available
window.copyBibtex = copyBibtex;
