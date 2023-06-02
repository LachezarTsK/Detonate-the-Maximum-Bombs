
/**
 * @param {number[][]} bombs
 * @return {number}
 */
var maximumDetonation = function (bombs) {
    this.graph = Array.from(new Array(bombs.length), () => new Array());
    createGraph(bombs);
    let maxDetonatedBombs = 0;
    let bombID = 0;
    while (bombID < bombs.length && maxDetonatedBombs < bombs.length) {
        maxDetonatedBombs = Math.max(maxDetonatedBombs, depthFirstSearchForDetonatedBombs(bombID, new Array(bombs.length).fill(false)));
        ++bombID;
    }
    return maxDetonatedBombs;
};

/**
 * @param {number} firstBomb
 * @param {number} secondBomb 
 * @return {number} 
 */
function distance(firstBomb, secondBomb) {
    return Math.sqrt(Math.pow(firstBomb[0] - secondBomb[0], 2) + Math.pow(firstBomb[1] - secondBomb[1], 2));
}

/**
 * @param {number[][]} bombs
 * @return {void}
 */
function createGraph(bombs) {
    for (let firstBombID = 0; firstBombID < bombs.length; ++firstBombID) {
        let radius = bombs[firstBombID][2];

        for (let secondBombID = 0; secondBombID < bombs.length; ++secondBombID) {
            if (firstBombID !== secondBombID && distance(bombs[firstBombID], bombs[secondBombID]) <= radius) {
                this.graph[firstBombID].push(secondBombID);
            }
        }
    }
}

/**
 * @param {number} bombID
 * @param {boolean[]} visited 
 * @return {number} 
 */
function depthFirstSearchForDetonatedBombs(bombID, visited) {
    visited[bombID] = true;
    let countDetonatedBombs = 1;
    for (let neighbour of this.graph[bombID]) {
        if (!visited[neighbour]) {
            countDetonatedBombs += depthFirstSearchForDetonatedBombs(neighbour, visited);
        }
    }
    return countDetonatedBombs;
}
