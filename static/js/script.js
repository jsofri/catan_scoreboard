async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to update the scoreboard
async function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear existing entries

    const players = await getData('/data/wins-summary');
    console.log(players);

    // Add each player to the scoreboard
    for (const player of players) {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.username}: ${player.wins}`;
        leaderboardList.appendChild(listItem);
    }
}

// Function to update the scoreboard
async function updateScoreboard() {
    const scoreboardList = document.getElementById('scoreboard-list');
    scoreboardList.innerHTML = ''; // Clear existing entries

    const players = await getData('/data/scores-summary');
    console.log(players);

    // Add each player to the scoreboard
    for (const player of players) {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.username}: ${player.score}`;
        scoreboardList.appendChild(listItem);
    }
}

// Function to render the analytics chart
function renderChart() {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const scores = players.map(player => player.score);
    const names = players.map(player => player.name);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Player Scores',
                data: scores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize scoreboard and chart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
    updateScoreboard();
    renderChart();
});