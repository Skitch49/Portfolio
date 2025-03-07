import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers: [{ provide: Window, useValue: window }],
})
export class AvatarComponent implements AfterViewInit{
  @ViewChild('avatarContainer', { static: true }) avatarContainer!: ElementRef;
  isLoading = true;
  loadProgress = 0;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private isStumbling = false;
  private raycaster = new THREE.Raycaster();
  private avatar!: THREE.Object3D;

  private ymcaAction!: THREE.AnimationAction;
  private typedKeys: string = ''; // Stocke les dernières touches pressées


  constructor(private window: Window) {}
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.initScene();
      this.loadModel();
      this.animate();
    }
  }

  private initScene(): void {
    const container = this.avatarContainer.nativeElement;

    // Initialisation du renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    container.appendChild(this.renderer.domElement);
    
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
      
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // Initialisation de la scène
    this.scene = new THREE.Scene();

    // Caméra
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight
    );
    this.camera.position.set(-0.2, 0.7, 1.2);

    // Contrôles de la caméra
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = true;
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = 0.2;
    this.controls.maxPolarAngle = 1.6;
    this.controls.target = new THREE.Vector3(0, 1.4, 0);
    this.controls.update();

    // Lumières
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
    spotlight.penumbra = 0.5;
    spotlight.position.set(0, 4, 2);
    spotlight.castShadow = true;
    this.scene.add(spotlight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(1, 1, 2);
    keyLight.lookAt(new THREE.Vector3());
    this.scene.add(keyLight);

    this.createPedestal();
  }

  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      '../../../../../assets/models/avatar_final.glb',
      (gltf) => {
        this.avatar = gltf.scene;
        this.avatar.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(this.avatar);

        this.initAnimations(gltf);
        this.isLoading = false;
      },
      (xhr) => {
        this.loadProgress = Math.round((xhr.loaded / xhr.total) * 100);
        console.log(`Loading model... ${this.loadProgress}%`);
      },
      (error) => console.error(error)
    );
  }

  private initAnimations(gltf: any): void {
    this.mixer = new THREE.AnimationMixer(this.avatar);
    const clips = gltf.animations;
    const waveClip = THREE.AnimationClip.findByName(clips, 'waving');
    const stumbleClip = THREE.AnimationClip.findByName(clips, 'stagger');
    const ymcaClip = THREE.AnimationClip.findByName(clips, 'dance');
    const waveAction = this.mixer.clipAction(waveClip);
    const stumbleAction = this.mixer.clipAction(stumbleClip);
    this.ymcaAction = this.mixer.clipAction(ymcaClip);
    this.ymcaAction.clampWhenFinished = true;


    this.avatarContainer.nativeElement.addEventListener(
      'mousedown',
      (ev: MouseEvent) => {
        const coords = new THREE.Vector2(
          (ev.offsetX / this.avatarContainer.nativeElement.clientWidth) * 2 - 1,
          -(ev.offsetY / this.avatarContainer.nativeElement.clientHeight) * 2 +
            1
        );

        this.raycaster.setFromCamera(coords, this.camera);
        const intersections = this.raycaster.intersectObject(this.avatar);

        if (intersections.length > 0 && !this.isStumbling) {
          this.isStumbling = true;
          stumbleAction.reset();
          stumbleAction.play();
          waveAction.crossFadeTo(stumbleAction, 0.3, false);

          setTimeout(() => {
            waveAction.reset();
            waveAction.play();
            stumbleAction.crossFadeTo(waveAction, 1, true);
            setTimeout(() => (this.isStumbling = false), 1000);
          }, 4000);
        }
      }
    );
    waveAction.clampWhenFinished = true; // Garde la dernière frame affichée
    waveAction.play();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const container = this.avatarContainer.nativeElement;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.mixer?.update(this.clock.getDelta());
    this.renderer.render(this.scene, this.camera);
  }

  
  
  private createPedestal(): void {
    const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.castShadow = false;
    groundMesh.receiveShadow = true;
    groundMesh.position.y -= 0.05;
    this.scene.add(groundMesh);
  }
  
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.typedKeys += event.key.toUpperCase();

    if (this.typedKeys.includes('VALD')) {
      this.typedKeys = ''; 
      this.playYMCAAnimation();
    }

    // Limite la mémoire tampon pour éviter les entrées trop longues
    if (this.typedKeys.length > 4) {
      this.typedKeys = this.typedKeys.slice(-4);
    }
  }

  private playYMCAAnimation(): void {
    console.log('Animation YMCA déclenchée !');
    this.ymcaAction.reset();
    this.ymcaAction.play();
  }
}
