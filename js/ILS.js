/**
 * Created by flepret1 on 18/11/15.
 */
var ILS = function (ls) {

    // attributes and private methods
    var localSearch = ls,
        solution = new Solution();

    // public methods
    this.run = function (sol) {
        solution.clone(sol);
        solution.clone(localSearch.run(solution));

        var bestSolution = new Solution();
        bestSolution.clone(solution);

        var bestValue = bestSolution.getValue();
        var fail = 0;

        while (fail < 15) {
            solution.swap();
            solution.swap();
            solution.swap();
            solution.swap();
            solution.swap();

            solution.clone(localSearch.run(solution));

            if (solution.getValue() < bestValue) {
                bestSolution.clone(solution);
                bestValue = bestSolution.getValue();
            } else {
                fail++;
                solution.clone(bestSolution);
            }
        }
        return bestSolution;
    };
};