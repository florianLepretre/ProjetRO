/**
 * Created by flepret1 on 17/11/15.
 */

var HillClimberFI = function (maxEval) {

    // private methods and attributes
    var maxEval = maxEval,
        solution = new Solution(),
        sPrim    = new Solution();

    // public methods
    this.run = function (sol) {

        solution.clone(sol);
        sPrim.clone(solution);

        var nbEval = 0;
        var bestValue = 1000;

        while (nbEval < maxEval){
            if (sPrim.getValue() != solution.getValue()){
                sPrim.clone(solution);
            }

            sPrim.swap();
            sPrim.eval();

            if (sPrim.getValue() < bestValue) {
                solution.clone(sPrim);
                bestValue = sPrim.getValue();
            }


            nbEval += 1;
        }

        return solution;
    };
};