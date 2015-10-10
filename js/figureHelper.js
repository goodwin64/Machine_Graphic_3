(function () {
    'use strict';
    window.FigureHelper = function () {
        var self = this;
        var z = 1;

        self.updateFigureCoord = function (item, scale, deltaValue) {
            if (scale == 'x') {
                item.position.x += deltaValue;
            }
            else if (scale == 'y') {
                item.position.y += deltaValue;
            }
            else if (scale == 'z') {
                item.position.z += deltaValue;
            }
        };
        return self;
    }
})();