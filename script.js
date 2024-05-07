document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('wordGrid');
    const wordsElement = document.getElementById('words');
    const gridSize = 15; // Adjusted grid size to 15x15
    const words = ['hello', 'world', 'react', 'node', 'array'].map(word => word.toUpperCase()); // Convert words to uppercase to match grid
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill('-'));
    let mouseIsDown = false;
    let currentSelection = [];

    function placeWord(word) {
        let placed = false;
        while (!placed) {
            let direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            let fits = true;

            for (let i = 0; i < word.length; i++) {
                let r = row + (direction ? i : 0);
                let c = col + (direction ? 0 : i);
                if (r >= gridSize || c >= gridSize || grid[r][c] !== '-') {
                    fits = false;
                    break;
                }
            }

            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    let r = row + (direction ? i : 0);
                    let c = col + (direction ? 0 : i);
                    grid[r][c] = word[i];
                }
                placed = true;
            }
        }
    }

    words.forEach(word => placeWord(word));

    // Fill the grid with random uppercase letters where there are still dashes
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '-') {
                grid[row][col] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            }
        }
    }

    // Render the grid
    grid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const letterElement = document.createElement('div');
            letterElement.textContent = letter;
            letterElement.dataset.row = rowIndex;
            letterElement.dataset.col = colIndex;
            letterElement.addEventListener('mousedown', () => {
                mouseIsDown = true;
                selectLetter(letterElement);
            });
            letterElement.addEventListener('mouseover', () => {
                if (mouseIsDown) {
                    selectLetter(letterElement);
                }
            });
            letterElement.addEventListener('mouseup', () => {
                mouseIsDown = false;
            });
            gridElement.appendChild(letterElement);
        });
    });

    document.addEventListener('mouseup', () => {
        mouseIsDown = false;
    });

    function selectLetter(letterElement) {
        if (!letterElement.classList.contains('found')) {
            letterElement.classList.add('selected');
            currentSelection.push(letterElement);
        }
    }

    document.getElementById('submitWord').addEventListener('click', () => {
        const selectedWord = currentSelection.map(el => el.textContent).join('');
        if (words.includes(selectedWord)) {
            currentSelection.forEach(el => {
                el.classList.add('found');
                el.classList.remove('selected');
            });
        } else {
            currentSelection.forEach(el => el.classList.remove('selected'));
        }
        currentSelection = []; // Clear the current selection after verification
    });

    // Display words to be found
    words.forEach(word => {
        const wordElement = document.createElement('li');
        wordElement.textContent = word;
        wordsElement.appendChild(wordElement);
    });
});
