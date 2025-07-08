export interface RedPacket {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    rotation: number;
    rotationSpeed: number;
    scale: number;
    opacity: number;
    collected: boolean;
    value?: number;
    type?: "normal" | "special" | "bonus";
    originalData?: any;
}
export interface RedPacketRainConfig {
    containerWidth: number | string;
    containerHeight: number | string;
    count: number;
    density: number;
    speed: {
        min: number;
        max: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation?: boolean;
    rotationSpeed?: {
        min: number;
        max: number;
    };
    enablePerformanceMode?: boolean;
    enableFrameRateLimit?: boolean;
    debugMode?: boolean;
    maxFPS?: number;
    qualityMaxFPS?: number;
    clickEffect?: boolean;
    redPacketImage?: string | HTMLImageElement;
    customStyles?: {
        backgroundColor?: string;
        borderColor?: string;
    };
    redPackets?: number | any[];
    isSpecialFn?: ((item: any) => boolean) | string;
    isParticle?: boolean;
}
export interface RedPacketClickEvent {
    redPacket: RedPacket;
    x: number;
    y: number;
    value?: number;
}
export interface AnimationState {
    isRunning: boolean;
    isPaused: boolean;
    totalCollected: number;
    currentRedPackets: RedPacket[];
    fps: number;
}
export interface PerformanceStats {
    fps: number;
    renderTime: number;
    updateTime: number;
    totalRedPackets: number;
    activeRedPackets: number;
}
export type RedPacketEventCallback = (event: RedPacketClickEvent) => void;
export type AnimationStateCallback = (state: AnimationState) => void;
export type PerformanceCallback = (stats: PerformanceStats) => void;
export interface Particle {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    initialSize?: number;
    opacity: number;
    color: string;
    life: number;
    maxLife: number;
    gravity: number;
    friction: number;
    rotation: number;
    rotationSpeed: number;
}
export interface ParticleConfig {
    count: number;
    speed: {
        min: number;
        max: number;
    };
    size: {
        min: number;
        max: number;
    };
    life: {
        min: number;
        max: number;
    };
    colors: string[];
    gravity: number;
    friction: number;
    spread: number;
}
