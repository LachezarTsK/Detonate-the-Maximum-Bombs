
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private List<Integer>[] graph;

    public int maximumDetonation(int[][] bombs) {
        createGraph(bombs);
        int maxDetonatedBombs = 0;
        int bombID = 0;
        while (bombID < bombs.length && maxDetonatedBombs < bombs.length) {
            maxDetonatedBombs = Math.max(maxDetonatedBombs, depthFirstSearchForDetonatedBombs(bombID, new boolean[bombs.length]));
            ++bombID;
        }
        return maxDetonatedBombs;
    }

    private double distance(int[] firstBomb, int[] secondBomb) {
        return Math.sqrt(Math.pow(firstBomb[0] - secondBomb[0], 2) + Math.pow(firstBomb[1] - secondBomb[1], 2));
    }

    private void createGraph(int[][] bombs) {
        graph = new ArrayList[bombs.length];

        for (int firstBombID = 0; firstBombID < bombs.length; ++firstBombID) {
            graph[firstBombID] = new ArrayList<>();
            int radius = bombs[firstBombID][2];

            for (int secondBombID = 0; secondBombID < bombs.length; ++secondBombID) {
                if (firstBombID != secondBombID && distance(bombs[firstBombID], bombs[secondBombID]) <= radius) {
                    graph[firstBombID].add(secondBombID);
                }
            }
        }
    }

    private int depthFirstSearchForDetonatedBombs(int bombID, boolean[] visited) {
        visited[bombID] = true;
        int countDetonatedBombs = 1;
        for (int neighbour : graph[bombID]) {
            if (!visited[neighbour]) {
                countDetonatedBombs += depthFirstSearchForDetonatedBombs(neighbour, visited);
            }
        }
        return countDetonatedBombs;
    }
}
