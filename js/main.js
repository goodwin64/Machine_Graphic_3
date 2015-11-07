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
    var TEXTURE_URLS = {
        grassTextureUrl: './textures/grass-texture.jpg',
        treeTextureUrl: './textures/tree-texture.jpg',
        roofTextureUrl: './textures/roof-texture.jpg',
        starTextureUrl: './textures/star-texture.jpg',
        sunTextureUrl: './textures/sun-texture.jpg',
        weaponTextureUrl: './textures/weapon-texture.jpg',
        blackHoleTextureUrl: './textures/blackHole-texture.jpg',
        doorTextureUrl: './textures/door-texture.jpg',
        windowTextureUrl: './textures/window-texture.jpg',
        suitTextureUrl: './textures/suit-texture.jpg',
        faceTextureUrl: './textures/face-texture.jpg',
        leatherTextureUrl: './textures/leather-texture.jpg',
        poleTextureUrl: './textures/pole-texture.jpg'
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
    self.man = {};
    self.UFO = {};

    self.isNeedToEditMan = false;
    var start = function () {
        self.sceneRenderer = new RenderScene();
        self.figureCreator = new FigureCreator();
        self.figureHelper = new FigureHelper();

        self.sceneRenderer.initialize(0x4BB1D8);
        initializeHouse();
        initializeUFO();
        initializeManWithPole();
        self.sceneRenderer.renderScene();
    };

    var initializeManWithPole = function () {
        self.manX = 5;
        self.manY = -1.6;
        self.manZ = -3.65;

        self.man.handAxis = self.man.body = self.figureCreator.createCylinder(self.manX, self.manY, self.manZ, 0xff0000, TEXTURE_URLS.suitTextureUrl, 0, 0.0, 0.7, 20, 20);
        self.man.body = self.figureCreator.createCylinder(self.manX, self.manY, self.manZ, 0xff0000, TEXTURE_URLS.suitTextureUrl, 0.25, 0.17, 0.7, 20, 20);
        self.man.body.receiveShadow = true;
        self.man.body.castShadow = true;
        self.man.head = self.figureCreator.createSphere(0.2, 0, 0.6, 0, 0xffffff, 10, TEXTURE_URLS.faceTextureUrl);
        self.man.head.rotateY(1.4);
        self.man.head.receiveShadow = true;
        self.man.head.castShadow = false;
        self.man.hand1 = self.figureCreator.createCylinder(0.45, -0.05, 0, 0xff0000, TEXTURE_URLS.leatherTextureUrl, 0.06, 0.05, 0.88, 10, 10);
        self.man.hand1.rotateZ(0.6);
        self.man.hand2 = self.figureCreator.createCylinder(-0.43, -0.05, 0, 0xff0000, TEXTURE_URLS.leatherTextureUrl, 0.06, 0.05, 0.88, 10, 10);
        self.man.hand2.rotateZ(-0.6);
        self.man.leg1 = self.figureCreator.createCylinder(0.17, -0.7, 0, 0xff0000, TEXTURE_URLS.leatherTextureUrl, 0.09, 0.05, 0.88, 10, 10);
        self.man.leg1.rotateZ(0.2);
        self.man.leg2 = self.figureCreator.createCylinder(-0.17, -0.7, 0, 0xff0000, TEXTURE_URLS.leatherTextureUrl, 0.09, 0.05, 0.88, 10, 10);
        self.man.leg2.rotateZ(-0.2);

        self.man.body.add(self.man.hand1);
        self.man.body.add(self.man.hand2);
        self.man.body.add(self.man.leg1);
        self.man.body.add(self.man.leg2);
        self.man.body.add(self.man.head);

        self.man.body.rotateY(-1.57);

        self.man.pole = self.figureCreator.createCylinder(
            5, 2.2, -5, 0xff0000, TEXTURE_URLS.poleTextureUrl, 0.5, 0.5, 10, 10, 10);
        self.sceneRenderer.addFigureToScene(self.man.body);
        self.sceneRenderer.addFigureToScene(self.man.pole);


    };

    var initializeHouse = function () {
        self.grass = self.figureCreator.createPlane(1, -2.8, 20, 20, 0xffffff, TEXTURE_URLS.grassTextureUrl);
        self.grass.rotateX(1.57);
        self.grass.castShadow = false;
        self.grass.receiveShadow = true;
        self.house.window = self.figureCreator.createPlane(-1.6, -2, 0.5, 0.5, 0x1121F9, TEXTURE_URLS.windowTextureUrl);
        self.house.window.position.z = 1.76;
        self.house.door = self.figureCreator.createPlane(-0.74, -2.27, 0.6, 1, 0xff0000, TEXTURE_URLS.doorTextureUrl);
        self.house.door.position.z = 0.7;
        self.house.door.rotateY(-1.575);
        self.house.window1 = self.figureCreator.createPlane(-0.73, -1.9, 0.5, 0.5, 0x00aa00, TEXTURE_URLS.windowTextureUrl);
        self.house.window1.rotateY(1.57);
        self.house.window1.position.z = 1.4;
        self.house.roof = self.figureCreator.createPyramid(-1.46, -0.6, 1, 0x7D460F, TEXTURE_URLS.roofTextureUrl);
        self.house.roof.receiveShadow = true;
        self.house.body = self.figureCreator.createCube(-1.5, -2, 1, 1.5, 0xD9C4B0, TEXTURE_URLS.treeTextureUrl);
        self.house.body.receiveShadow = true;
        self.sceneRenderer.addFigureToScene(self.house.body);
        self.sceneRenderer.addFigureToScene(self.house.roof);
        self.sceneRenderer.addFigureToScene(self.house.window);
        self.sceneRenderer.addFigureToScene(self.house.window1);
        self.sceneRenderer.addFigureToScene(self.house.door);

        self.sceneRenderer.addFigureToScene(self.grass);
    };

    var initializeUFO = function () {
        self.UFO.body = self.figureCreator.createSphere(UFO_RADIUS, -6, 3, 1.1, 0xd3d3d3, 32, TEXTURE_URLS.starTextureUrl);
        self.UFO.roof = self.figureCreator.createSphere(UFO_RADIUS / 5, -6, 3, 2.1, 0x100000, 32, TEXTURE_URLS.weaponTextureUrl);
        self.UFO.roof.rotateY(-1.55);
        self.sceneRenderer.addFigureToScene(self.UFO.roof);
        self.sceneRenderer.addFigureToScene(self.UFO.body);

        self.sun = self.figureCreator.createSphere(1.2, 3, 4, 6, 0xffff30, 32, TEXTURE_URLS.sunTextureUrl);
        self.sun.castShadow = false;
        self.sceneRenderer.addFigureToScene(self.sun);

        requestAnimationFrame(updateCoords);
    };

    var initialiBlackHole = function () {
        if (!self.UFO.blackHole) {
            self.UFO.blackHole = self.figureCreator.createSphere(1.5
                , self.UFO.body.position.x, self.UFO.body.position.y - 3 * UFO_RADIUS,
                self.UFO.body.position.z, 0x000000, 100, TEXTURE_URLS.blackHoleTextureUrl);
            self.UFO.blackHole.castShadow = false;
            self.sceneRenderer.addFigureToScene(self.UFO.blackHole);
            self.isNeedToEditMan = true;
        }
        else {
            self.UFO.blackHole.position.x = self.UFO.body.position.x;
            self.UFO.blackHole.position.y = self.UFO.body.position.y - 3 * UFO_RADIUS;
            self.UFO.blackHole.position.z = self.UFO.body.position.z;
        }
        findAttractObject();
    };

    function cutHands() {
        var man = self.man;

        var hand1 = {
            x: man.hand1.position.x,
            y: man.hand1.position.y,
            z: man.hand1.position.z,
            rotationX: man.hand1.rotation.x,
            rotationY: man.hand1.rotation.y,
            rotationZ: man.hand1.rotation.z
        };
        var hand2 = {
            x: man.hand2.position.x,
            y: man.hand2.position.y,
            z: man.hand2.position.z,
            rotationX: man.hand2.rotation.x,
            rotationY: man.hand2.rotation.y,
            rotationZ: man.hand2.rotation.z
        };

        man.body.remove(man.hand1);
        man.body.remove(man.hand2);
        man.handAxis.add(man.hand1);
        man.handAxis.add(man.hand2);
        man.handAxis.position.x= man.body.position.x;
        man.handAxis.position.y= man.body.position.y;
        man.handAxis.position.z= man.body.position.z;
        man.handAxis.rotation.x= man.body.rotation.x;
        man.handAxis.rotation.y= man.body.rotation.y;
        man.handAxis.rotation.z= man.body.rotation.z;
        self.sceneRenderer.addFigureToScene(man.handAxis);
    }

    function rotateMan() {
        if (self.isNeedToEditMan && self.man) {
            //debugger;
            if(self.man.hand2.rotation.z > -1.25){
                self.man.hand2.rotateZ(-0.03);
                self.man.hand2.position.y += 0.009  ;
                return;
            }
            if(self.man.hand1.rotation.z < 2.5){
                self.man.hand1.rotateZ(0.03);
                self.man.hand1.position.y += 0.009;
                return;
            }
            if(self.man.hand2.rotation.z > -2.5){
                self.man.hand2.rotateZ(-0.03);
                self.man.hand2.position.y += 0.009  ;
            }
            if (self.man.body.rotation.x > -1.57) {
                self.man.body.position.y += 0.02;
                self.man.body.rotateZ(0.05);
                self.man.hand2.rotateZ(-0.015);
                self.man.hand2.position.y += 0.0045;
            }
        }
    }

    function updateCoords() {
        rotateMan();
        if (self.sun) {
            self.sun.rotateY(0.1);
        }
        if (self.UFO.blackHole) {
            self.UFO.blackHole.rotateY(0.5);
        }
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
            if (self.attractedObject.name == 'man') {
                self.sceneRenderer.deleteFigure(self.man.body);
                self.man = null;
            }
            if (self.attractedObject.name == 'sun') {
                self.sceneRenderer.deleteFigure(self.sun);
                self.sun = null;
                self.sceneRenderer.deleteFigure(self.sceneRenderer.spotLight);
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
        if (self.man && self.man.body) {
            if(self.isNeedToEditMan) {
                cutHands();
            }
            self.isNeedToEditMan = false;
            self.attractedObject = self.man.body;
            self.attractedObject.name = 'man';
            return;
        }
        if (self.sun) {
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