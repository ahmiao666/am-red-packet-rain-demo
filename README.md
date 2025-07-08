# 🎉 Red Packet Rain

[![npm version](https://img.shields.io/npm/v/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-vue)
[![npm version](https://img.shields.io/npm/v/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-react)
[![npm downloads](https://img.shields.io/npm/dm/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-react)
[![npm downloads](https://img.shields.io/npm/dm/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-vue)
[![license](https://img.shields.io/npm/l/red-packet-rain.svg)](https://github.com/ahmiao666/am-red-packet-rain-demo/issues)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

一个高性能、跨框架的红包雨组件，支持 React 和 Vue，具有完整的性能控制和诊断功能。

## ✨ 特性

🚀 **高性能渲染** - Canvas 2D 渲染，支持 60-144 FPS  
⚡ **智能性能模式** - 自动对象池管理，内存优化  
🎯 **帧率控制策略** - 严格/自适应/宽松三种策略  
🖥️ **显示器适配** - 自动检测显示器刷新率并优化  
🎛️ **实时配置** - 动态调整红包数量、密度、速度等  
🔍 **调试模式** - 可视化碰撞检测边界和性能诊断  
📱 **移动端支持** - 响应式设计，支持触摸操作  
🌈 **TypeScript** - 完整的类型定义支持  

## 📦 安装

```bash
npm install @ahmiao666/red-packet-rain-react
npm install @ahmiao666/red-packet-rain-vue
```

```bash
yarn add @ahmiao666/red-packet-rain-react
yarn add @ahmiao666/red-packet-rain-vue
```

```bash
pnpm add @ahmiao666/red-packet-rain-react
pnpm add @ahmiao666/red-packet-rain-vue
```

## 🚀 快速开始

### React 使用

```tsx
import React, { useRef } from 'react';
import RedPacketRain, { RedPacketRainRef } from '@ahmiao666/red-packet-rain-react';

function App() {
  const rainRef = useRef<RedPacketRainRef>(null);

  const handleRedPacketClick = (event) => {
    console.log('收集到红包:', event.value);
  };

  return (
    <div>
      <RedPacketRain
        ref={rainRef}
        config={{
          count: 15,
          density: 3,
          enablePerformanceMode: true
        }}
        onRedPacketClick={handleRedPacketClick}
      />
      
      <button onClick={() => rainRef.current?.start()}>
        开始红包雨
      </button>
    </div>
  );
}

export default App;
```

### Vue 使用

```vue
<template>
  <div>
    <VueRedPacketRain
      ref="rainRef"
      :config="config"
      @red-packet-click="handleRedPacketClick"
    />
    
    <button @click="start">开始红包雨</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { VueRedPacketRain } from '@ahmiao666/red-packet-rain-vue';
import type { RedPacketClickEvent } from '@ahmiao666/red-packet-rain-vue';

const rainRef = ref();

const config = reactive({
  count: 15,
  density: 3,
  enablePerformanceMode: true
});

const handleRedPacketClick = (event: RedPacketClickEvent) => {
  console.log('收集到红包:', event.value);
};

const start = () => {
  rainRef.value?.start();
};
</script>
```

## ⚙️ 配置选项

```typescript
interface RedPacketRainConfig {
  // 基本设置
  containerWidth: number;        // 容器宽度
  containerHeight: number;       // 容器高度
  count: number;                 // 红包数量 (5-50)
  density: number;               // 红包密度 (1-10)
  
  // 速度控制
  speed: {
    min: number;                 // 最小速度 (1-5)
    max: number;                 // 最大速度 (3-10)
  };
  
  // 性能设置
  enablePerformanceMode: boolean; // 性能模式
  enableFrameRateLimit: boolean;  // 帧率限制
  frameRateStrategy: 'strict' | 'adaptive' | 'loose'; // 帧率策略
  maxFPS: number;                // 性能模式帧率 (默认60)
  qualityMaxFPS: number;         // 高质量模式帧率 (默认144)
  
  // 调试和特效
  debugMode: boolean;            // 调试模式
  clickEffect: boolean;          // 点击特效
  
  // 外观设置
  rotation: boolean;             // 旋转动画
  size: {
    width: number;               // 红包宽度
    height: number;              // 红包高度
  };
}
```

## 🎮 API 参考

### React 组件 Props

| 属性                     | 类型                                   | 默认值 | 描述             |
| ------------------------ | -------------------------------------- | ------ | ---------------- |
| `config`                 | `Partial<RedPacketRainConfig>`         | `{}`   | 配置对象         |
| `showControls`           | `boolean`                              | `true` | 显示内置控制界面 |
| `autoStart`              | `boolean`                              | `true` | 自动启动         |
| `onRedPacketClick`       | `(event: RedPacketClickEvent) => void` | -      | 红包点击回调     |
| `onAnimationStateChange` | `(state: AnimationState) => void`      | -      | 动画状态变化回调 |
| `onPerformanceUpdate`    | `(stats: PerformanceStats) => void`    | -      | 性能统计回调     |

### React 组件方法

```typescript
interface RedPacketRainRef {
  start(): void;                           // 启动
  stop(): void;                            // 停止
  pause(): void;                           // 暂停
  resume(): void;                          // 恢复
  clear(): void;                           // 清空
  updateConfig(config: Partial<RedPacketRainConfig>): void; // 更新配置
  getStats(): PerformanceStats;            // 获取统计
  togglePerformanceMode(): boolean;        // 切换性能模式
  setPerformanceMode(enabled: boolean): void; // 设置性能模式
  getPerformanceMode(): boolean;           // 获取性能模式
}
```

### Vue 组件

```typescript
// Props
interface VueRedPacketRainProps {
  config?: Partial<RedPacketRainConfig>;
  showControls?: boolean;
  autoStart?: boolean;
}

// Events
interface VueRedPacketRainEmits {
  'red-packet-click': [event: RedPacketClickEvent];
  'animation-state-change': [state: AnimationState];
  'performance-update': [stats: PerformanceStats];
}

// 暴露的方法（通过 ref 调用）
const rainRef = ref();
rainRef.value?.start();
rainRef.value?.stop();
rainRef.value?.updateConfig(newConfig);
```

## 🎯 性能模式对比

| 特性       | 性能模式 | 高质量模式 |
| ---------- | -------- | ---------- |
| 目标帧率   | 60 FPS   | 144 FPS    |
| 渲染复杂度 | 简化     | 完整       |
| 视觉效果   | 基础     | 丰富       |
| 内存使用   | 优化     | 正常       |
| CPU 使用   | 低       | 高         |
| 适用场景   | 低端设备 | 高端设备   |

## 💡 最佳实践

### 根据设备选择配置

```typescript
const getOptimalConfig = (deviceType: 'mobile' | 'desktop') => {
  if (deviceType === 'mobile') {
    return {
      enablePerformanceMode: true,
      maxFPS: 60,
      frameRateStrategy: 'adaptive',
      count: 10,
      density: 2
    };
  } else {
    return {
      enablePerformanceMode: false,
      qualityMaxFPS: 144,
      frameRateStrategy: 'strict',
      count: 20,
      density: 4
    };
  }
};
```

### 事件处理优化

```typescript
const handleRedPacketClick = useCallback((event: RedPacketClickEvent) => {
  // 预计算值
  const value = event.value || 0;
  const isSpecial = event.redPacket.type === 'special';
  
  // 批量更新状态
  setStats(prev => ({
    ...prev,
    collected: prev.collected + 1,
    totalValue: prev.totalValue + value
  }));
}, []);
```

### 内存管理

```typescript
useEffect(() => {
  return () => {
    // 组件卸载时清理资源
    rainRef.current?.stop();
    rainRef.current?.clear();
  };
}, []);
```

## 📊 性能监控

```typescript
const handlePerformanceUpdate = (stats: PerformanceStats) => {
  console.log('性能统计:', {
    fps: stats.fps,                    // 当前 FPS
    renderTime: stats.renderTime,      // 渲染时间 (ms)
    updateTime: stats.updateTime,      // 更新时间 (ms)
    activeRedPackets: stats.activeRedPackets, // 活跃红包数
    totalRedPackets: stats.totalRedPackets    // 总红包数
  });
  
  // 性能警告
  if (stats.fps < 30) {
    console.warn('FPS 过低:', stats.fps);
  }
};
```

## 🌐 浏览器支持

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80
- 移动端浏览器支持

## 📱 移动端优化

```typescript
// 移动端推荐配置
const mobileConfig = {
  enablePerformanceMode: true,
  maxFPS: 60,
  frameRateStrategy: 'adaptive',
  count: 8,
  density: 2,
  speed: { min: 1, max: 3 }
};
```

## 🐛 常见问题

### Q: 为什么 FPS 达不到设定值？
A: 可能原因：
1. 显示器刷新率限制（如 120Hz 显示器最高 120FPS）
2. 设备性能不足
3. 浏览器 VSync 机制限制

### Q: 如何优化性能？
A: 优化建议：
1. 启用性能模式
2. 减少红包数量和密度
3. 使用自适应帧率策略
4. 关闭不必要的视觉效果

### Q: 移动设备卡顿怎么办？
A: 移动端优化：
1. 启用性能模式
2. 设置较低的目标帧率（30-60FPS）
3. 减少红包数量
4. 使用宽松帧率策略
