# 🎉 Red Packet Rain

[![npm version](https://img.shields.io/npm/v/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-vue)
[![npm version](https://img.shields.io/npm/v/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-react)
[![npm downloads](https://img.shields.io/npm/dm/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-react)
[![npm downloads](https://img.shields.io/npm/dm/red-packet-rain.svg)](https://www.npmjs.com/package/@ahmiao666/red-packet-rain-vue)
[![license](https://img.shields.io/npm/l/red-packet-rain.svg)](https://github.com/ahmiao666/am-red-packet-rain-demo/issues)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

# 红包雨引擎（RedPacketRainEngine）详细文档

## 目录
- [🎉 Red Packet Rain](#-red-packet-rain)
- [红包雨引擎（RedPacketRainEngine）详细文档](#红包雨引擎redpacketrainengine详细文档)
  - [目录](#目录)
  - [简介](#简介)
  - [✨ 特性](#-特性)
  - [📦 安装](#-安装)
  - [核心类型定义（types.ts）](#核心类型定义typests)
    - [RedPacket 红包对象](#redpacket-红包对象)
    - [RedPacketRainConfig 配置参数](#redpacketrainconfig-配置参数)
    - [RedPacketClickEvent 点击事件回调参数](#redpacketclickevent-点击事件回调参数)
    - [AnimationState 动画状态](#animationstate-动画状态)
    - [PerformanceStats 性能统计](#performancestats-性能统计)
    - [Particle 粒子对象](#particle-粒子对象)
    - [ParticleConfig 粒子配置](#particleconfig-粒子配置)
  - [红包雨引擎 API（RedPacketRainEngine.ts）](#红包雨引擎-apiredpacketrainenginets)
    - [构造函数](#构造函数)
    - [公开方法](#公开方法)
    - [事件回调](#事件回调)
  - [如何使用](#如何使用)
    - [基础用法](#基础用法)
    - [自定义红包数据](#自定义红包数据)
    - [特殊红包与自定义判断](#特殊红包与自定义判断)
    - [粒子特效](#粒子特效)
  - [常见问题与注意事项](#常见问题与注意事项)
  - [🐛 常见问题](#-常见问题)
    - [Q: 为什么 FPS 达不到设定值？](#q-为什么-fps-达不到设定值)
    - [Q: 如何优化性能？](#q-如何优化性能)
    - [Q: 移动设备卡顿怎么办？](#q-移动设备卡顿怎么办)

---

## 简介

`RedPacketRainEngine` 是一个高性能、可扩展的红包雨动画引擎，支持自定义红包样式、粒子特效、性能模式、点击事件等丰富功能，适用于 React/Vue/Web 等多种前端场景。

---

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




## 核心类型定义（types.ts）

### RedPacket 红包对象
| 字段         | 类型         | 说明                 |
| ------------ | ------------ | -------------------- |
| id           | string       | 红包唯一标识         |
| x            | number       | x 坐标               |
| y            | number       | y 坐标               |
| width        | number       | 宽度                 |
| height       | number       | 高度                 |
| speed        | number       | 下落速度             |
| rotation     | number       | 旋转角度             |
| rotationSpeed| number       | 旋转速度             |
| scale        | number       | 缩放比例             |
| opacity      | number       | 透明度               |
| collected    | boolean      | 是否已被收集         |
| value        | number?      | 红包金额             |
| type         | string?      | 红包类型（normal/special/bonus）|
| originalData | any?         | 原始自定义数据       |

### RedPacketRainConfig 配置参数
| 字段                | 类型                | 说明 |
|---------------------|---------------------|------|
| containerWidth      | number \| string    | 容器宽度（如 800 或 '100%'）|
| containerHeight     | number \| string    | 容器高度（如 600 或 '100%'）|
| count               | number              | 红包总数（数组模式下自动等于数组长度）|
| density             | number              | 红包生成密度（每秒生成数量）|
| speed               | {min,max}           | 红包下落速度范围|
| size                | {width,height}      | 红包尺寸|
| rotation            | boolean             | 是否启用旋转|
| rotationSpeed       | {min,max}?          | 旋转速度范围|
| enablePerformanceMode| boolean            | 性能模式（低配设备建议开启）|
| enableFrameRateLimit| boolean?            | 是否启用帧率限制|
| debugMode           | boolean?            | 是否开启调试模式|
| maxFPS              | number?             | 性能模式下最大帧率|
| qualityMaxFPS       | number?             | 高质量模式最大帧率|
| clickEffect         | boolean?            | 是否开启点击特效|
| redPacketImage      | string \| HTMLImageElement? | 红包图片|
| customStyles        | object?             | 自定义样式（背景色、边框色）|
| redPackets          | number \| any[]     | 红包数据（数组模式支持自定义字段）|
| isSpecialFn         | function \| string? | 判断特殊红包的函数或字段名|
| isParticle          | boolean?            | 是否启用粒子特效|

### RedPacketClickEvent 点击事件回调参数
| 字段      | 类型     | 说明         |
|-----------|----------|--------------|
| redPacket | RedPacket| 被点击的红包 |
| x         | number   | 点击 x 坐标  |
| y         | number   | 点击 y 坐标  |
| value     | number?  | 红包金额     |

### AnimationState 动画状态
| 字段              | 类型         | 说明         |
|-------------------|--------------|--------------|
| isRunning         | boolean      | 是否正在运行 |
| isPaused          | boolean      | 是否暂停     |
| totalCollected    | number       | 已收集红包数 |
| currentRedPackets | RedPacket[]  | 当前红包列表 |
| fps               | number       | 当前帧率     |

### PerformanceStats 性能统计
| 字段           | 类型   | 说明         |
|----------------|--------|--------------|
| fps            | number | 当前帧率     |
| renderTime     | number | 渲染耗时     |
| updateTime     | number | 更新耗时     |
| totalRedPackets| number | 总收集红包数 |
| activeRedPackets|number | 当前红包数   |

### Particle 粒子对象
| 字段         | 类型     | 说明         |
|--------------|----------|--------------|
| id           | string   | 粒子唯一标识 |
| x, y         | number   | 坐标         |
| vx, vy       | number   | 速度         |
| size         | number   | 大小         |
| initialSize  | number?  | 初始大小     |
| opacity      | number   | 透明度       |
| color        | string   | 颜色         |
| life         | number   | 剩余生命值   |
| maxLife      | number   | 最大生命值   |
| gravity      | number   | 重力         |
| friction     | number   | 摩擦力       |
| rotation     | number   | 旋转角度     |
| rotationSpeed| number   | 旋转速度     |

### ParticleConfig 粒子配置
| 字段    | 类型         | 说明         |
|---------|--------------|--------------|
| count   | number       | 粒子数量     |
| speed   | {min,max}    | 速度范围     |
| size    | {min,max}    | 大小范围     |
| life    | {min,max}    | 生命值范围(ms)|
| colors  | string[]     | 颜色数组     |
| gravity | number       | 重力         |
| friction| number       | 摩擦系数     |
| spread  | number       | 散布角度(弧度)|

---

## 红包雨引擎 API（RedPacketRainEngine.ts）

### 构造函数
```ts
new RedPacketRainEngine(canvas: HTMLCanvasElement, config?: Partial<RedPacketRainConfig>)
```
- `canvas`：目标 Canvas 元素
- `config`：可选，红包雨配置参数

### 公开方法
| 方法名 | 说明 |
|--------|------|
| start() | 开始动画 |
| stop() | 停止动画 |
| pause() | 暂停动画 |
| resume() | 恢复动画 |
| clear() | 清空所有红包和粒子 |
| updateConfig(newConfig) | 更新配置参数（支持动态切换图片、红包数据等）|
| getStats() | 获取性能统计信息 |
| getCollectionStats() | 获取收集红包统计 |
| setPerformanceMode(enabled) | 设置性能模式 |
| getPerformanceMode() | 获取当前性能模式状态 |
| setParticleConfig(config) | 设置粒子特效参数 |
| getParticleConfig() | 获取粒子特效参数 |
| destroy() | 销毁引擎，解绑事件，释放资源 |

### 事件回调
| 方法 | 说明 |
|------|------|
| onRedPacketClick(cb) | 设置红包点击回调，参数为 RedPacketClickEvent |
| onAnimationStateChange(cb) | 设置动画状态变化回调，参数为 AnimationState |
| onPerformanceUpdate(cb) | 设置性能统计回调，参数为 PerformanceStats |

---

## 如何使用

### 基础用法
```ts
import { RedPacketRainEngine } from '你的包路径';

const canvas = document.getElementById('myCanvas');
const engine = new RedPacketRainEngine(canvas, {
  count: 30,
  redPacketImage: '/assets/hongbao.png',
  clickEffect: true,
  debugMode: false,
});
engine.start();
```

### 自定义红包数据
```ts
const redPackets = [
  { id: 'a', value: 88, myFlag: true },
  { id: 'b', value: 66 },
  // ...
];
const engine = new RedPacketRainEngine(canvas, {
  redPackets,
  isSpecialFn: 'myFlag', // 或 (item) => item.myFlag
});
```

### 特殊红包与自定义判断
- `isSpecialFn` 支持传字段名或函数，返回 true 的红包会被标记为 `special`，可用于自定义样式、粒子等。

### 粒子特效
- `isParticle: true` 开启点击粒子特效
- 可通过 `setParticleConfig` 动态调整粒子数量、颜色、重力等

```ts
enigne.setParticleConfig({
  count: 30,
  colors: ['#FFD700', '#FF6B6B'],
  gravity: 0.5,
});
```

---

## 常见问题与注意事项
- **性能模式**：低配设备建议开启 `enablePerformanceMode`，会关闭部分高质量特效。
- **自适应尺寸**：`containerWidth`/`containerHeight` 支持百分比，需保证父容器有明确尺寸。
- **事件解绑**：调用 `destroy()` 可彻底释放资源，防止内存泄漏。
- **调试模式**：`debugMode: true` 可显示边界、点击、帧率等调试信息。
- **红包图片**：支持传入图片 URL 或 HTMLImageElement。
- **红包数据模式**：`redPackets` 支持传数组（自定义数据）或数字（随机生成）。
- **特殊红包**：通过 `isSpecialFn` 灵活标记特殊红包。
- **粒子特效**：高性能设备可关闭性能模式体验更炫酷的粒子。

---


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



