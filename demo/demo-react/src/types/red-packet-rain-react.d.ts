declare module "@ahmiao666/red-packet-rain-react" {
  import { FC, RefObject } from "react";

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
    [key: string]: unknown;
  }

  export interface RedPacket {
    id: string;
    type: "normal" | "special";
    value: number;
    x: number;
    y: number;
    [key: string]: unknown;
  }

  export interface RedPacketClickEvent {
    x: number;
    y: number;
    value: number;
    redPacket: RedPacket;
  }

  export interface AnimationState {
    isRunning: boolean;
    [key: string]: unknown;
  }

  export interface PerformanceStats {
    fps: number;
    renderTime: number;
    updateTime: number;
    totalRedPackets: number;
    activeRedPackets: number;
  }

  export interface RedPacketRainRef {
    start: () => void;
    stop: () => void;
    getPerformanceMode: () => boolean;
    setPerformanceMode: (enabled: boolean) => void;
    updateConfig: (config: Partial<RedPacketRainConfig>) => void;
  }

  export interface RedPacketRainProps {
    config?: RedPacketRainConfig;
    className?: string;
    style?: React.CSSProperties;
    autoStart?: boolean;
    showControls?: boolean;
    onRedPacketClick?: (event: RedPacketClickEvent) => void;
    onAnimationStateChange?: (state: AnimationState) => void;
    onPerformanceUpdate?: (stats: PerformanceStats) => void;
  }

  // 主要组件
  const RedPacketRain: FC<RedPacketRainProps & { ref?: RefObject<RedPacketRainRef | null> }>;

  export default RedPacketRain;
}
