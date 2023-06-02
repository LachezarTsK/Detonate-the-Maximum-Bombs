
using System;
using System.Collections.Generic;

public class Solution
{
    private List<int>[] graph;
    public int MaximumDetonation(int[][] bombs)
    {
        createGraph(bombs);
        int maxDetonatedBombs = 0;
        int bombID = 0;
        while (bombID < bombs.Length && maxDetonatedBombs < bombs.Length)
        {
            maxDetonatedBombs = Math.Max(maxDetonatedBombs, depthFirstSearchForDetonatedBombs(bombID, new bool[bombs.Length]));
            ++bombID;
        }
        return maxDetonatedBombs;
    }

    private void createGraph(int[][] bombs)
    {
        graph = new List<int>[bombs.Length];

        for (int firstBombID = 0; firstBombID < bombs.Length; ++firstBombID)
        {
            graph[firstBombID] = new List<int>();
            int radius = bombs[firstBombID][2];

            for (int secondBombID = 0; secondBombID < bombs.Length; ++secondBombID)
            {
                if (firstBombID != secondBombID && distance(bombs[firstBombID], bombs[secondBombID]) <= radius)
                {
                    graph[firstBombID].Add(secondBombID);
                }
            }
        }
    }

    private double distance(int[] firstBomb, int[] secondBomb)
    {
        return Math.Sqrt(Math.Pow(firstBomb[0] - secondBomb[0], 2) + Math.Pow(firstBomb[1] - secondBomb[1], 2));
    }

    private int depthFirstSearchForDetonatedBombs(int bombID, bool[] visited)
    {
        visited[bombID] = true;
        int countDetonatedBombs = 1;
        foreach (int neighbour in graph[bombID])
        {
            if (!visited[neighbour])
            {
                countDetonatedBombs += depthFirstSearchForDetonatedBombs(neighbour, visited);
            }
        }
        return countDetonatedBombs;
    }
}
