# 红包雨组件 React & Vue 使用指南

## 目录
- [红包雨组件 React \& Vue 使用指南](#红包雨组件-react--vue-使用指南)
  - [目录](#目录)
  - [简介](#简介)
  - [React 组件用法](#react-组件用法)
    - [引入方式](#引入方式)
      - [1. 安装依赖](#1-安装依赖)
      - [2. 组件引入](#2-组件引入)
      - [3. Vite/Webpack/TS 支持](#3-vitewebpackts-支持)
    - [Props 参数说明](#props-参数说明)
    - [Ref 方法说明](#ref-方法说明)
    - [类型定义](#类型定义)
      - [RedPacketRainConfig 配置参数](#redpacketrainconfig-配置参数)
      - [RedPacket 红包对象](#redpacket-红包对象)
      - [RedPacketClickEvent 点击事件参数](#redpacketclickevent-点击事件参数)
      - [AnimationState 动画状态](#animationstate-动画状态)
      - [PerformanceStats 性能统计](#performancestats-性能统计)
      - [Particle 粒子对象](#particle-粒子对象)
      - [ParticleConfig 粒子配置](#particleconfig-粒子配置)
    - [完整示例](#完整示例)
    - [事件回调用法](#事件回调用法)
    - [Props 参数说明](#props-参数说明-1)
    - [暴露方法说明](#暴露方法说明)
    - [类型定义](#类型定义-1)
    - [完整示例](#完整示例-1)
    - [事件回调用法](#事件回调用法-1)
  - [常见问题与注意事项](#常见问题与注意事项)

---

## 简介

本指南详细介绍红包雨组件在 React 和 Vue 项目中的集成与使用方法，涵盖所有参数、方法、类型定义、事件回调及常见用法。

---

## React 组件用法

### 引入方式

#### 1. 安装依赖

使用 npm：
```bash
npm install @ahmiao666/red-packet-rain-react
npm install @ahmiao666/red-packet-rain-vue
```
使用 yarn：
```bash
yarn add @ahmiao666/red-packet-rain-react
npm install @ahmiao666/red-packet-rain-vue
```
使用 pnpm：
```bash
pnpm add @ahmiao666/red-packet-rain-react
npm install @ahmiao666/red-packet-rain-vue
```

#### 2. 组件引入

react 方式：
```tsx
import RedPacketRain, { RedPacketRainProps, RedPacketRainRef } from '@ahmiao666/red-packet-rain-react';
import type {
  RedPacketRainRef,
  RedPacketClickEvent,
  AnimationState,
  PerformanceStats,
  ...
} from "@ahmiao666/red-packet-rain-react";
```

CommonJS 方式：
```js
const RedPacketRain = require('dist-core/RedPacketRainEngine.esm.js').default;
```

#### 3. Vite/Webpack/TS 支持
- 推荐使用 Vite、Webpack 等现代构建工具，支持 TypeScript 类型推断。
- 如需类型提示，确保 tsconfig.json 包含 node_modules 类型路径。
- 静态资源（如红包图片）建议放在 public 或 assets 目录下。

### Props 参数说明
| 参数名                | 类型                                   | 说明 |
|----------------------|----------------------------------------|------|
| config               | Partial<RedPacketRainConfig>           | 红包雨配置参数，详见下方类型 |
| className            | string                                 | 容器自定义 class |
| style                | React.CSSProperties                    | 容器自定义样式 |
| autoStart            | boolean                                | 是否自动启动动画，默认 true |
| showControls         | boolean                                | 是否显示控制面板，默认 true |
| onRedPacketClick     | (event: RedPacketClickEvent) => void   | 红包点击回调 |
| onAnimationStateChange | (state: AnimationState) => void       | 动画状态变化回调 |
| onPerformanceUpdate  | (stats: PerformanceStats) => void      | 性能统计回调 |

### Ref 方法说明
通过 `ref` 可获取以下方法：
| 方法名                | 说明 |
|----------------------|------|
| start()              | 开始动画 |
| stop()               | 停止动画 |
| pause()              | 暂停动画 |
| resume()             | 恢复动画 |
| clear()              | 清空红包和粒子 |
| updateConfig(config) | 动态更新配置参数 |
| getStats()           | 获取性能统计信息 |
| getCollectionStats() | 获取收集红包统计 |
| resetCollectionStats()| 重置收集统计 |
| getEngine()          | 获取底层引擎实例 |
| togglePerformanceMode()| 切换性能模式 |
| setPerformanceMode(enabled)| 设置性能模式 |
| getPerformanceMode() | 获取当前性能模式 |

### 类型定义

#### RedPacketRainConfig 配置参数
```ts
export interface RedPacketRainConfig {
  containerWidth: number | string; // 容器宽度
  containerHeight: number | string; // 容器高度
  count: number; // 红包总数
  density: number; // 红包生成密度
  speed: { min: number; max: number }; // 红包下落速度范围
  size: { width: number; height: number }; // 红包尺寸
  rotation?: boolean; // 是否启用旋转
  rotationSpeed?: { min: number; max: number }; // 旋转速度范围
  enablePerformanceMode?: boolean; // 性能模式
  enableFrameRateLimit?: boolean; // 是否启用帧率限制
  debugMode?: boolean; // 调试模式
  maxFPS?: number; // 最大帧率
  qualityMaxFPS?: number; // 高质量最大帧率
  clickEffect?: boolean; // 是否开启点击特效
  redPacketImage?: string | HTMLImageElement; // 红包图片
  customStyles?: { backgroundColor?: string; borderColor?: string }; // 自定义样式
  redPackets?: number | any[]; // 红包数据
  isSpecialFn?: ((item: any) => boolean) | string; // 特殊红包判断
  isParticle?: boolean; // 是否启用粒子特效
}
```

#### RedPacket 红包对象
```ts
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
```

#### RedPacketClickEvent 点击事件参数
```ts
export interface RedPacketClickEvent {
  redPacket: RedPacket;
  x: number;
  y: number;
  value?: number;
}
```

#### AnimationState 动画状态
```ts
export interface AnimationState {
  isRunning: boolean;
  isPaused: boolean;
  totalCollected: number;
  currentRedPackets: RedPacket[];
  fps: number;
}
```

#### PerformanceStats 性能统计
```ts
export interface PerformanceStats {
  fps: number;
  renderTime: number;
  updateTime: number;
  totalRedPackets: number;
  activeRedPackets: number;
}
```

#### Particle 粒子对象
```ts
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
```

#### ParticleConfig 粒子配置
```ts
export interface ParticleConfig {
  count: number;
  speed: { min: number; max: number };
  size: { min: number; max: number };
  life: { min: number; max: number };
  colors: string[];
  gravity: number;
  friction: number;
  spread: number;
}
```

### 完整示例
```tsx
import React, { useRef } from 'react';
import RedPacketRain, { RedPacketRainRef } from '@ahmiao666/red-packet-rain-react';
import type {
  RedPacketRainRef,
  RedPacketClickEvent,
  AnimationState,
  PerformanceStats,
  ...
} from "@ahmiao666/red-packet-rain-react";

const App = () => {
  const rainRef = useRef<RedPacketRainRef>(null);

  const handleRedPacketClick = (event) => {
    console.log('红包被点击:', event);
  };

  return (
    <div>
      <RedPacketRain
        ref={rainRef}
        config={{
          count: 20,
          density: 5,
          redPacketImage: '/assets/hongbao.png',
          isParticle: true,
          debugMode: false,
        }}
        autoStart={true}
        showControls={true}
        onRedPacketClick={handleRedPacketClick}
      />
      <button onClick={() => rainRef.current?.pause()}>暂停</button>
      <button onClick={() => rainRef.current?.resume()}>继续</button>
      <button onClick={() => rainRef.current?.clear()}>清空</button>
    </div>
  );
};
```

### 事件回调用法
```tsx
<RedPacketRain
  onRedPacketClick={(event) => console.log(event)}
  onAnimationStateChange={(state) => console.log(state)}
  onPerformanceUpdate={(stats) => console.log(stats)}
/>
```

---

### Props 参数说明
| 参数名                | 类型                    | 说明 |
|----------------------|-------------------------|------|
| config               | Record<string, any>     | 红包雨配置参数，详见类型说明 |
| className            | string                  | 容器自定义 class |
| style                | Record<string, any>     | 容器自定义样式 |
| autoStart            | boolean                 | 是否自动启动动画，默认 true |
| showControls         | boolean                 | 是否显示控制面板，默认 true |

### 暴露方法说明
通过 `ref` 可获取以下方法：
| 方法名                | 说明 |
|----------------------|------|
| start()              | 开始动画 |
| stop()               | 停止动画 |
| pause()              | 暂停动画 |
| resume()             | 恢复动画 |
| clear()              | 清空红包和粒子 |
| updateConfig(config) | 动态更新配置参数 |
| getStats()           | 获取性能统计信息 |
| getEngine()          | 获取底层引擎实例 |
| togglePerformanceMode()| 切换性能模式 |
| setPerformanceMode(enabled)| 设置性能模式 |
| getPerformanceMode() | 获取当前性能模式 |

### 类型定义

> Vue 组件类型与 React 完全一致，详见上方类型定义。

### 完整示例
```vue
<template>
  <div>
    <VueRedPacketRain
      ref="rainRef"
      :config="{
        count: 20,
        density: 5,
        redPacketImage: '/assets/hongbao.png',
        isParticle: true,
        debugMode: false,
      }"
      :autoStart="true"
      :showControls="true"
      @redPacketClick="onRedPacketClick"
    />
    <button @click="pause">暂停</button>
    <button @click="resume">继续</button>
    <button @click="clear">清空</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueRedPacketRain from '@ahmiao666/red-packet-rain-vue';

const rainRef = ref();

const pause = () => rainRef.value?.pause();
const resume = () => rainRef.value?.resume();
const clear = () => rainRef.value?.clear();

const onRedPacketClick = (event: any) => {
  console.log('红包被点击:', event);
};
</script>
```

### 事件回调用法
```vue
<VueRedPacketRain
  @redPacketClick="onRedPacketClick"
  @animationStateChange="onAnimationStateChange"
  @performanceUpdate="onPerformanceUpdate"
/>
```

---

## 常见问题与注意事项
- **配置参数**：所有红包雨配置参数（如 count、density、speed、isParticle、debugMode 等）均可通过 config 传递，详见类型定义。
- **动态更新**：通过 ref 方法 updateConfig 可动态调整参数，实时生效。
- **事件监听**：React 用 props 传递回调，Vue 用 @事件名 监听。
- **性能模式**：低配设备建议开启 enablePerformanceMode。
- **自定义红包数据**：config.redPackets 支持数组（自定义字段）或数字（随机生成）。
- **特殊红包**：通过 isSpecialFn 字段或函数灵活标记。
- **粒子特效**：isParticle 开启后，点击红包有粒子爆炸效果。
- **调试模式**：debugMode 开启后显示边界、帧率、点击等调试信息。
- **销毁与资源释放**：组件卸载时会自动销毁引擎，无需手动处理。

---

如需更详细的类型说明和底层引擎 API，请查阅 [RedPacketRainEngine-API-zh_CN.md](./RedPacketRainEngine-API-zh_CN.md)。 
