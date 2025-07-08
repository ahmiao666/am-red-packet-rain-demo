declare module '@ahmiao666/red-packet-rain-vue' {
  import { DefineComponent } from 'vue';

  // 基础类型
  export interface RedPacketRainConfig {
    containerWidth?: number;
    containerHeight?: number;
    count?: number;
    density?: number;
    speed?: { min: number; max: number };
      enablePerformanceMode?: boolean;
  enableFrameRateLimit?: boolean;
  debugMode?: boolean;
    maxFPS?: number;
    qualityMaxFPS?: number;
  }

  export interface RedPacket {
    id: string;
    type: 'normal' | 'special';
    value: number;
    x: number;
    y: number;
  }

  export interface RedPacketClickEvent {
    x: number;
    y: number;
    value: number;
    redPacket: RedPacket;
  }

  export interface AnimationState {
    isRunning: boolean;
  }

  export interface PerformanceStats {
    fps: number;
    renderTime: number;
    updateTime: number;
    totalRedPackets: number;
    activeRedPackets: number;
  }

  export interface RedPacketRainProps {
    config?: RedPacketRainConfig;
    className?: string;
    style?: any;
    autoStart?: boolean;
    showControls?: boolean;
  }

  // Vue组件
  export const RedPacketRain: DefineComponent<RedPacketRainProps, {}, {}, {}, {
    start: () => void;
    stop: () => void;
    getPerformanceMode: () => boolean;
    setPerformanceMode: (enabled: boolean) => void;
    updateConfig: (config: Partial<RedPacketRainConfig>) => void;
  }>;

  export default RedPacketRain;
}
