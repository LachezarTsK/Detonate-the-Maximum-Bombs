
#include <cmath>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    
    vector<vector<int>> graph;
    
public:
    int maximumDetonation(const vector<vector<int>>& bombs) {
        createGraph(bombs);
        int maxDetonatedBombs = 0;
        int bombID = 0;
        while (bombID < bombs.size() && maxDetonatedBombs < bombs.size()) {
            vector<bool> visited(bombs.size());
            maxDetonatedBombs = max(maxDetonatedBombs, depthFirstSearchForDetonatedBombs(bombID, visited));
            ++bombID;
        }
        return maxDetonatedBombs;
    }

private:
    double distance(const vector<int>& firstBomb, const vector<int>& secondBomb) const {
        return sqrt(pow(firstBomb[0] - secondBomb[0], 2) + pow(firstBomb[1] - secondBomb[1], 2));
    }

    void createGraph(const vector<vector<int>>& bombs) {
        graph.resize(bombs.size());

        for (int firstBombID = 0; firstBombID < bombs.size(); ++firstBombID) {
            int radius = bombs[firstBombID][2];

            for (int secondBombID = 0; secondBombID < bombs.size(); ++secondBombID) {
                if (firstBombID != secondBombID && distance(bombs[firstBombID], bombs[secondBombID]) <= radius) {
                    graph[firstBombID].push_back(secondBombID);
                }
            }
        }
    }

    int depthFirstSearchForDetonatedBombs(int bombID, vector<bool>& visited) const {
        visited[bombID] = true;
        int countDetonatedBombs = 1;
        for (int neighbour : graph[bombID]) {
            if (!visited[neighbour]) {
                countDetonatedBombs += depthFirstSearchForDetonatedBombs(neighbour, visited);
            }
        }
        return countDetonatedBombs;
    }
};
