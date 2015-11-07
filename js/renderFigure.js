(function () {
    'use strict';
    window.FigureCreator = function () {
        var self = this;
        var z = 1;
        self.createTriangle = function (x, y, color) {

            var triangleGeometry = new THREE.Geometry();
            triangleGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
            triangleGeometry.vertices.push(new THREE.Vector3(-0.7, -0.7, 0.0));
            triangleGeometry.vertices.push(new THREE.Vector3(0.7, -0.7, 0.0));
            triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

            triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(color);
            triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(color);
            triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(color);

            var triangleMaterial = new THREE.MeshBasicMaterial({
                vertexColors: THREE.VertexColors,
                side: THREE.DoubleSide
            });

            var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
            triangleMesh.position.set(x, y, z);
            return triangleMesh;
        };

        self.createPlane = function (x, y, width, height, color, textureUrl) {
                // The creation of the square is done in the same way as the triangle, except that we
                // now need two THREE.Face3s.
                // 1. Instantiate the geometry object
                // 2. Add the vertices
                // 3. Define the faces by setting the vertices indices
                var squareGeometry = new THREE.PlaneGeometry(width,height,1,1);
                var texture = new THREE.ImageUtils.loadTexture(textureUrl);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                var planeMaterial = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
                var plane = new THREE.Mesh(squareGeometry,planeMaterial);
            plane.rotateX(3.15);
                plane.position.x = x;
                plane.position.y = y;
                plane.position.z = z;
            plane.castShadow = true;
                return plane;

        };

        self.createSquare = function (x, y, div, color) {
            div = div || 1;
            // The creation of the square is done in the same way as the triangle, except that we
            // now need two THREE.Face3s.
            // 1. Instantiate the geometry object
            // 2. Add the vertices
            // 3. Define the faces by setting the vertices indices
            var squareGeometry = new THREE.Geometry();


            squareGeometry.vertices.push(new THREE.Vector3(-0.6 / div, 0.6 / div, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(0.6 / div, 0.6 / div, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(0.6 / div, -0.6 / div, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(-0.6 / div, -0.6 / div, 0.0));
            squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
            squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

            var squareMaterial = new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide
            });

            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
            var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
            squareMesh.position.set(x, y, 1.0);
            return squareMesh;
        };

        self.createDoor = function (x, y, div, color) {
            div = div || 1;
            // The creation of the square is done in the same way as the triangle, except that we
            // now need two THREE.Face3s.
            // 1. Instantiate the geometry object
            // 2. Add the vertices
            // 3. Define the faces by setting the vertices indices
            var squareGeometry = new THREE.Geometry();
            squareGeometry.vertices.push(new THREE.Vector3(-0.6 / div, 1.6 / div, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(0.6 / div, 1.6 / div, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(0.6 / div, -0.6 / div, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(-0.6 / div, -0.6 / div, 0.0));
            squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
            squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

            var squareMaterial = new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide
            });

            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
            var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
            squareMesh.position.set(x, y, 1.0);
            return squareMesh;
        };

        self.createCircle = function (radius, segments, x, y, z, color) {
            var material = new THREE.MeshBasicMaterial({
                color: color
            });
            var circleGeometry = new THREE.CircleGeometry(radius, segments);
            var circle = new THREE.Mesh(circleGeometry, material);
            circle.position.x = x;
            circle.position.y = y;
            circle.position.z = z;
            return circle
        };

        self.createCylinder = function (x, y, z, color, textureUrl,radiusTop, radiusBottom, height, radialSegments, heightSegments) {

            var cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);

            var cylinderMaterial = {};
            if (textureUrl) {
                var texture = new THREE.ImageUtils.loadTexture(textureUrl);
                cylinderMaterial = new THREE.MeshLambertMaterial({
                        map: texture,
                        side: THREE.DoubleSide
                    }
                );
            }
            else {
                cylinderMaterial = new THREE.MeshLambertMaterial({
                    vertexColors: color,
                    side: THREE.DoubleSide
                });
            }

            var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            cylinderMesh.position.set(x, y, z);
            cylinderMesh.castShadow = true;
            cylinderMesh.receiveShadow = true;
            return cylinderMesh;
        };

        self.createPyramid = function (x, y, z, color, textureUrl,radiusTop, radiusBottom, height, radialSegments, heightSegments) {
            radiusTop = radiusTop || 0;
            radiusBottom = radiusBottom || 1.5;
            height = height || 1.5;
            radialSegments = radialSegments || 4;
            heightSegments = heightSegments || false;

            var pyramidGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);

            // Coloring the faces with vertex colors is a bit tricky, but allows us to see how to
            // loop through the faces and check whether they have three or four vertices.
            // With a simple 'for'-loop we run through all faces, which are accessed by their index.
            // The 'instanceof' operator gives the possibility to check, whether the current face is
            // a THREE.Face4 or THREE.Face3. Depending on its object type, we set three or four
            // vertex colors. For THREE.Face4 we switch the colors of vertex 1 and 2 for every
            // second face because we want the lower vertices having the same colors as the
            // neighbour face. Vertex 0 and 3 are the upper vertices, which are always red.
            // If WebGL isn't supported and the canvas renderer is used, it ignores the vertex
            // colors. They are only supported by the WebGL renderer (current release of
            // Three.js: 49).
            for (var i = 0; i < pyramidGeometry.faces.length; i++) {
                if (pyramidGeometry.faces[i] instanceof THREE.Face4) {
                    pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(color);
                    if ((i % 2) == 0) {
                        pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(color);
                        pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(color);
                    } else {
                        pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(color);
                        pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(color);
                    }
                    pyramidGeometry.faces[i].vertexColors[3] = new THREE.Color(color);
                } else {
                    pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xffffff);
                    pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(color);
                    pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(color);
                }
            }

            // To activate the vertex color, we have to set 'vertexColors' attribute to
            // 'THREE.VertexColors'. Otherwise they won't be displayed.

            // Create a basic material, supporting vertex colors. Activate the 'doubleSided'
            // attribute to force the rendering of both sides of each face (front and back).
            // This prevents the so called 'backface culling'. Usually, only the side is
            // rendered, whose normal vector points towards the camera. The other side is not
            // rendered (backface culling). But this performance optimization sometimes leads
            // to wholes in the surface. When this happens in your surface, simply set
            // 'doubleSided' to 'true'.
            var pyramidMaterial = {};
            if (textureUrl) {
                var texture = new THREE.ImageUtils.loadTexture(textureUrl);
                pyramidMaterial = new THREE.MeshLambertMaterial({
                        map: texture,
                        side: THREE.DoubleSide
                    }
                );
            }
            else {
                pyramidMaterial = new THREE.MeshLambertMaterial({
                    vertexColors: color,
                    side: THREE.DoubleSide
                });
            }

            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
            var pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
            pyramidMesh.position.set(x, y, z);
            pyramidMesh.rotateY(0.75);
            pyramidMesh.castShadow = true;
            return pyramidMesh;
        };

        self.createCube = function (x, y, z, width, color, textureUrl) {
            var boxGeometry = new THREE.BoxGeometry(width, width, width);

            var boxMaterial = {};
            if (textureUrl) {
                var texture = new THREE.ImageUtils.loadTexture(textureUrl);
                boxMaterial = new THREE.MeshLambertMaterial({
                        map: texture,
                        side: THREE.DoubleSide
                    }
                );
            }
            else {
                var boxMaterials = [
                    new THREE.MeshBasicMaterial({color: color}),
                    new THREE.MeshBasicMaterial({color: 0xD9C400}),
                    new THREE.MeshBasicMaterial({color: 0xD9A4B0}),
                    new THREE.MeshBasicMaterial({color: 0xE9C4B0}),
                    new THREE.MeshBasicMaterial({color: 0x5905B0}),
                    new THREE.MeshBasicMaterial({color: color})
                ];
                boxMaterial = new THREE.MeshBasicMaterial(boxMaterials);
            }
            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
            var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            boxMesh.position.set(x, y, z);
            boxMesh.castShadow = true;
            return boxMesh;
        };

        self.createSphere = function (radius, x, y, z, color, n, textureUrl) {
            var geometry = new THREE.SphereGeometry(radius, n || 100, n || 100);
            var material = {};
            if (textureUrl) {
                var texture = new THREE.ImageUtils.loadTexture(textureUrl);
                if(textureUrl == './textures/sun-texture.jpg' || textureUrl == './textures/face-texture.jpg'){
                    material = new THREE.MeshBasicMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        }
                    );
                }
                else{
                material = new THREE.MeshLambertMaterial({
                        map: texture,
                        side: THREE.DoubleSide
                    }
                );}

            }
            else {
                material = new THREE.MeshLambertMaterial({color: color});
            }

            var sphere = new THREE.Mesh(geometry, material);
            sphere.position.z = z;
            sphere.position.x = x;
            sphere.position.y = y;
            sphere.castShadow = true;
            return sphere;
        };
        return self;
    }
})();