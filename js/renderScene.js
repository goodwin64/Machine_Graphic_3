(function () {
    'use strict';
    window.RenderScene = function () {
        var self = this;
        self.scene = {};
        self.camera = {};
        self.renderer = {};
        var defaultSceneColor = 0xffffff;
        self.initialize = function (sceneColor) {

            initializeScene(sceneColor);
        };

        self.addFigureToScene = function (figure) {
            self.scene.add(figure);
        };

        self.deleteFigure = function(item) {
            self.scene.remove(item);
        };

        /**
         * Render the scene. Map the 3D world to the 2D screen.
         */
        self.renderScene = function () {
            self.renderer.render(self.scene, self.camera);
        };

        /**
         * Initialze the scene.
         */
        function initializeScene(sceneColor) {

            if (Detector.webgl) {
                self.renderer = new THREE.WebGLRenderer({antialias: true});
            }
            self.renderer.setClearColor(sceneColor, 1);

            // Get the size of the inner window (content area) to create a full size renderer
            var canvasWidth = window.innerWidth;
            var canvasHeight = window.innerHeight;

            // Set the renderers size to the content areas size

            self.renderer.setSize(canvasWidth, canvasHeight);
            self.renderer.shadowMapEnabled = true;
            // Get the DIV element from the HTML document by its ID and append the renderers DOM
            // object to it
            document.getElementById("WebGLCanvas").appendChild(self.renderer.domElement);

            // Create the scene, in which all objects are stored (e. g. camera, lights,
            // geometries, ...)
            self.scene = new THREE.Scene();
            var spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.castShadow = true;
            spotLight.position.set( 40, 60, 20 );
            self.scene.add(spotLight );
            self.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
            var controls = new THREE.OrbitControls( self.camera );
            self.camera.position.set(0, 4, 15);
            self.camera.lookAt(self.scene.position);
            self.scene.add(self.camera);
        }

        return self;
    }
})();