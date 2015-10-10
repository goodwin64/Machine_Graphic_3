(function () {
    'use strict';
    var KEY_CODES = {
        left: 65,
        up: 107,
        right: 68,
        down: 109,
        plus: 83,
        minus: 87,
        enter: 13,
        one: 83,
        two: 87
    };
    var UFO_RADIUS = 1;
    var self = {};

    self.scales = {
        x: 'x',
        y: 'y',
        z: 'z'
    };

    self.attractedObject = null;
    self.speed = {};
    self.house = {};
    self.UFO = {};
    var start = function () {
        self.sceneRenderer = new RenderScene();
        self.figureCreator = new FigureCreator();
        self.figureHelper = new FigureHelper();

        self.sceneRenderer.initialize(0x4BB1D8);
        initializeHouse();
        initializeUFO();
        self.sceneRenderer.renderScene();
    };

    var initializeHouse = function () {
        self.grass = self.figureCreator.createSquare(1, -2.8, 0.05, 0x30963F);
        self.grass.rotateX(1.57);
        self.house.window = self.figureCreator.createSquare(-1.6, -2, 2.5, 0x1121F9);
        self.house.window.position.z = 1.76;
        self.house.door = self.figureCreator.createDoor(-2.26, -2.5, 2.5, 0xff0000);
        self.house.door.position.z = 1.4;
        self.house.door.rotateY(1.57);
        self.house.window1 = self.figureCreator.createSquare(-0.73, -1.9, 2.5, 0x00aa00);
        self.house.window1.rotateY(1.57);
        self.house.window1.position.z = 1.4;
        self.house.roof = self.figureCreator.createPyramid(-1.46, -0.75, 1, 0x7D460F);
        self.house.body = self.figureCreator.createCube(-1.5, -2, 1, 1.5, 0xD9C4B0);

        self.sceneRenderer.addFigureToScene(self.house.body);
        self.sceneRenderer.addFigureToScene(self.house.roof);
        self.sceneRenderer.addFigureToScene(self.house.window);
        self.sceneRenderer.addFigureToScene(self.house.window1);
        self.sceneRenderer.addFigureToScene(self.house.door);

        self.sceneRenderer.addFigureToScene(self.grass);
    };
    var initializeUFO = function () {
        self.UFO.body = self.figureCreator.createSphere(UFO_RADIUS, -6, 3, 1.1, 0xd3d3d3, 32);
        self.UFO.roof = self.figureCreator.createSphere(UFO_RADIUS/5, -6, 3, 2.1, 0x100000,32);

        self.sceneRenderer.addFigureToScene(self.UFO.roof);
        self.sceneRenderer.addFigureToScene(self.UFO.body);

        self.sun = self.figureCreator.createSphere(1, 3, 4, 6, 0xffff30, 10);
        self.sceneRenderer.addFigureToScene(self.sun);
        requestAnimationFrame(updateCoords);
    };

    var initialiBlackHole = function () {
        if (!self.UFO.blackHole) {
            self.UFO.blackHole = self.figureCreator.createSphere(1.5
                , self.UFO.body.position.x, self.UFO.body.position.y - 3 * UFO_RADIUS,
                self.UFO.body.position.z, 0x000000);
            self.sceneRenderer.addFigureToScene(self.UFO.blackHole);
        }
        else {
            self.UFO.blackHole.position.x = self.UFO.body.position.x;
            self.UFO.blackHole.position.y = self.UFO.body.position.y - 3 * UFO_RADIUS;
            self.UFO.blackHole.position.z = self.UFO.body.position.z;
        }
        findAttractObject();
    };

    function updateCoords() {
        self.sun.rotateZ(0.1);
        self.sun.rotateY(0.1);
        attractObject();
        self.sceneRenderer.renderScene();

        requestAnimationFrame(updateCoords);
    }

    var calculateSpeed = function () {
        if (!self.attractedObject || !self.UFO.blackHole) {
            self.speed = {};
            return
        }

        var deltaX = self.UFO.blackHole.position.x - self.attractedObject.position.x;
        var deltaY = self.UFO.blackHole.position.y - self.attractedObject.position.y;
        var deltaZ = self.UFO.blackHole.position.z - self.attractedObject.position.z;
        self.speed.xSpeed = 0.015;
        self.speed.ySpeed = deltaY / (deltaX / self.speed.xSpeed) >= 0
            ? deltaY / (deltaX / self.speed.xSpeed)
            : -1 * deltaY / (deltaX / self.speed.xSpeed);
        self.speed.zSpeed = deltaZ / (deltaX / self.speed.xSpeed) >= 0
            ? deltaZ / (deltaX / self.speed.xSpeed)
            : -1 * deltaZ / (deltaX / self.speed.xSpeed);
    };

    var attractObject = function () {
        if (self.attractedObject == null || !self.UFO.blackHole) {
            return;
        }
        var x = self.attractedObject.position.x;
        var y = self.attractedObject.position.y;
        var z = self.attractedObject.position.z;
        var x1 = self.UFO.blackHole.position.x;
        var y1 = self.UFO.blackHole.position.y;
        var z1 = self.UFO.blackHole.position.z;


        var xflag = x - x1 < 0.012 && x - x1 > -0.012;
        var yflag = y - y1 < 0.012 && y - y1 > -0.012;
        var zflag = z - z1 < 0.012 && z - z1 > -0.012;
        if (xflag && yflag && zflag) {
            self.UFO.blackHole.geometry.parameters.radius = self.UFO.blackHole.geometry.parameters.radius + 0.2;
            self.sceneRenderer.deleteFigure(self.house[self.attractedObject.customName]);
            self.house[self.attractedObject.customName] = null;
            if(self.attractedObject.name == 'sun')
            {
                self.sceneRenderer.deleteFigure(self.sun);
                self.sun = null;
            }
            self.attractedObject = null;

            findAttractObject();
            calculateSpeed();
            return;
        }

        if (x < self.UFO.blackHole.position.x) {
            self.attractedObject.position.x += self.speed.xSpeed;
        }
        else {
            self.attractedObject.position.x -= self.speed.xSpeed;
        }
        if (y < self.UFO.blackHole.position.y) {
            self.attractedObject.position.y += self.speed.ySpeed;
        }
        else {
            self.attractedObject.position.y -= self.speed.ySpeed;
        }
        if (z < self.UFO.blackHole.position.z) {
            self.attractedObject.position.z += self.speed.zSpeed;
        }
        else {
            self.attractedObject.position.z -= self.speed.zSpeed;
        }
        self.attractedObject.rotateZ(0.05);
        self.attractedObject.rotateY(0.01);
        self.attractedObject.rotateX(0.05);
    };

    var findAttractObject = function () {
        for (var o in self.house) {
            if (self.house[o] && self.house.hasOwnProperty(o)) {
                self.attractedObject = self.house[o];
                self.attractedObject.customName = o;
                return;
            }
        }
        if(self.sun) {
            self.attractedObject = self.sun;
            self.attractedObject.name = 'sun';
        }
    };

    function keyHandlers(e) {
        var event = window.event ? window.event : e;
        console.log(event.keyCode);
        switch (event.keyCode) {
            case KEY_CODES.left:
            {
                self.figureHelper.updateFigureCoord(self.UFO.roof, self.scales.x, -0.1);
                self.figureHelper.updateFigureCoord(self.UFO.body, self.scales.x, -0.1);
                break;
            }
            case KEY_CODES.right:
            {
                self.figureHelper.updateFigureCoord(self.UFO.roof, self.scales.x, 0.1);
                self.figureHelper.updateFigureCoord(self.UFO.body, self.scales.x, 0.1);
                break;
            }
            case KEY_CODES.up:
            {
                self.figureHelper.updateFigureCoord(self.UFO.roof, self.scales.y, 0.1);
                self.figureHelper.updateFigureCoord(self.UFO.body, self.scales.y, 0.1);
                break;
            }
            case KEY_CODES.down:
            {
                self.figureHelper.updateFigureCoord(self.UFO.roof, self.scales.y, -0.1);
                self.figureHelper.updateFigureCoord(self.UFO.body, self.scales.y, -0.1);
                break;
            }
            case KEY_CODES.plus:
            {
                self.figureHelper.updateFigureCoord(self.UFO.roof, self.scales.z, 0.1);
                self.figureHelper.updateFigureCoord(self.UFO.body, self.scales.z, 0.1);
                break;
            }
            case KEY_CODES.minus:
            {
                self.figureHelper.updateFigureCoord(self.UFO.roof, self.scales.z, -0.1);
                self.figureHelper.updateFigureCoord(self.UFO.body, self.scales.z, -0.1);
                break;
            }
            case KEY_CODES.enter:
            {
                initialiBlackHole();
                calculateSpeed();
                break;
            }
        }
        self.sceneRenderer.renderScene();
    }

    window.addEventListener('load', start);
    document.onkeydown = keyHandlers;
})();