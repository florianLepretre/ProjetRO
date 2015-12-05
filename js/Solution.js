/* Authors : Amaury DUBOIS, Florian LEPRETRE
 * Date : 16 / 11 / 2015
 * Version : 0.1
 * Licence : plekoright
 */

"use strict";

var photoList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54];

var photoData = JSON.parse(data);

var albumSize = 55;

var Solution = function () {
    // private attributes and methods
    var value;
    var pageSize;
    var sol;

    var init = function () {
        value = 100000;
        pageSize = 6;
        sol = [];
    };

    var evalPage = function (page) {
        var colorScore = 0,
            distScore = 0,
            tagScore = 0;

        for (var photo = page; photo < page + pageSize; ++photo) {
            if (photo % 2 == 0) {
                colorScore += evalColor(photo, photo + 1);
                tagScore   += evalTags(photo, photo + 1);
            }
        }

        colorScore /= 27;
        tagScore /= 27;

        return (colorScore * 0.2) + (tagScore * 0.8);
    };

    var evalColor = function (photo1, photo2) {
        var redOffset1 = Math.abs(photoData [sol[photo1]]["color1"]["r"] - photoData [sol[photo2]]["color1"]["r"]);
        var blueOffset1 = Math.abs(photoData [sol[photo1]]["color1"]["b"] - photoData [sol[photo2]]["color1"]["b"]);
        var greenOffset1 = Math.abs(photoData [sol[photo1]]["color1"]["g"] - photoData [sol[photo2]]["color1"]["g"]);

        var redOffset2 = Math.abs(photoData [sol[photo1]]["color2"]["r"] - photoData [sol[photo2]]["color2"]["r"]);
        var blueOffset2 = Math.abs(photoData [sol[photo1]]["color2"]["b"] - photoData [sol[photo2]]["color2"]["b"]);
        var greenOffset2 = Math.abs(photoData [sol[photo1]]["color2"]["g"] - photoData [sol[photo2]]["color2"]["g"]);

        var globalOffset = redOffset1 + blueOffset1 + greenOffset1 + redOffset2 + blueOffset2 + greenOffset2;
        var res = ((globalOffset * 100) / 765);
        return (res < 50) ? res *1.5 : res;
    };

    var evalTags = function (photo1, photo2){
        var photo1Tags = photoData[sol[photo1]]["tags"]["classes"];
        var photo2Tags = photoData[sol[photo2]]["tags"]["classes"];
        var differentTags = 0;

        for (var key in photo1Tags){
            if (photo2Tags.indexOf(photo1Tags[key]) == -1){
                differentTags += 1;
            }
        }

        return ((differentTags * 100) / 20);
    };

    // public methods
    this.getSol = function () {
        return sol;
    };

    this.setSol = function (key, value) {
        sol[key] = value;
    };

    this.getValue = function () {
        return value;
    };

    this.setValue = function (val){
        value = val;
    };

    this.setRandomSolution = function () {
        var i;

        photoList.sort(function () {
            return Math.floor(Math.random() * 3) - 1;
        });

        for (i = 0; i < photoList.length; i++) {
            sol[i] = photoList[i];
        }
    };

    this.swap = function () {
        var index1 = Math.floor(Math.random() * albumSize);
        var index2 = Math.floor(Math.random() * albumSize);

        var tmp = sol[index1];

        sol[index1] = sol[index2];
        sol[index2] = tmp;
    };

    this.clone = function (solution) {
        var copySol = solution.getSol();

        for (var key in copySol) {
            this.setSol(key, copySol[key]);
        }

        this.setValue(solution.getValue());
    };

    this.display = function () {
        console.log(sol);
    };

    // eval function
    this.eval = function () {
        value = 0;
        for (var page = 0; page < 9; ++page) {
            value += evalPage(page * pageSize);
        }
    };

    init();
};