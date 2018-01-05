import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Gems3D extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.any,
    rotate: PropTypes.number,
    gap: PropTypes.number
  };

  static defaultProps = {
    width: 200,
    height: 200,
    color: 0xff6f91,
    rotate: 0.005,
    gap: 0.15
  };

  currentPosition = 0;
  currentSpeed = 0;
  renderer = null;
  scene = null;
  camera = null;
  gem = null;

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const canvas = this.el;
    const { width, height, color, rotate, gap } = this.props;

    this.setup({ canvas, width, height, color, gap });
    this.currentSpeed = rotate;

    draw(() => {
      this.gem.rotation.y += this.currentSpeed;
      this.currentPosition = this.gem.rotation.y;
      this.renderer.render(this.scene, this.camera);
    });
  }

  componentWillReceiveProps(nextProps) {
    const canvas = this.el;
    const { width, height, color, rotate, gap } = nextProps;

    this.setup({ canvas, width, height, color, gap });
    this.currentSpeed = rotate;
    this.gem.rotation.y = this.currentPosition;
  }

  setup({ canvas, width, height, color, gap }) {
    const radius = Math.min(width, height) / 2.5;
    const antialias = true;
    const alpha = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias, alpha });
    renderer.setSize(width, height);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      2000
    );
    camera.lookAt(scene.position);
    camera.position.set(0, 0, 1000);

    // Lights
    const light1 = new THREE.AmbientLight(0xffffff, 0.3);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
    const light3 = new THREE.PointLight(0xffffff, 2);
    light2.position.set(0, 0, radius);
    light3.position.set(0, 0, radius);

    // Gem
    const gem = new THREE.Group();
    const group = new THREE.Group();
    const icosahedron = new THREE.IcosahedronGeometry(radius, 0);

    icosahedron.faces.forEach(face => {
      const geo = new THREE.Geometry();
      const vertexA = icosahedron.vertices[face.a].clone();
      const vertexB = icosahedron.vertices[face.b].clone();
      const vertexC = icosahedron.vertices[face.c].clone();

      geo.vertices.push(vertexA);
      geo.vertices.push(vertexB);
      geo.vertices.push(vertexC);
      geo.faces.push(new THREE.Face3(0, 1, 2));
      geo.computeFaceNormals();

      geo.translate(
        (vertexA.x + vertexB.x + vertexC.x) / 3 * gap,
        (vertexA.y + vertexB.y + vertexC.y) / 3 * gap,
        (vertexA.z + vertexB.z + vertexC.z) / 3 * gap
      );

      const mat = new THREE.MeshLambertMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
    });

    group.rotation.set(Math.atan(1.618), 0, 0);
    gem.add(group);
    gem.rotation.set(0.2, 0, 0);

    scene.add(gem);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.gem = gem;
  }

  render() {
    return <canvas ref={el => (this.el = el)} />;
  }
}

const draw = func => {
  window.requestAnimationFrame(draw.bind(null, func));
  func();
};

export default Gems3D;
