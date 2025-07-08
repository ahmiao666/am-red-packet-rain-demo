# 红包雨组件 React & Vue 使用指南

## 目录
- [简介](#简介)
- [React 组件用法](#react-组件用法)
  - [Props 参数说明](#props-参数说明)
  - [Ref 方法说明](#ref-方法说明)
  - [类型定义](#类型定义)
  - [完整示例](#完整示例)
  - [事件回调用法](#事件回调用法)
- [Vue 组件用法](#vue-组件用法)
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
```tsx
import RedPacketRain, { RedPacketRainProps, RedPacketRainRef } from '你的包路径';
```

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
- `RedPacketRainConfig`、`RedPacketClickEvent`、`AnimationState`、`PerformanceStats` 等类型详见 [RedPacketRainEngine-API-zh_CN.md](./RedPacketRainEngine-API-zh_CN.md)

### 完整示例
```tsx
import React, { useRef } from 'react';
import RedPacketRain, { RedPacketRainRef } from '你的包路径';

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

## Vue 组件用法

### 引入方式
```ts
import VueRedPacketRain from '你的包路径/src/vue/VueRedPacketRain.vue';
```

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
- `RedPacketRainConfig`、`RedPacketClickEvent`、`AnimationState`、`PerformanceStats` 等类型详见 [RedPacketRainEngine-API-zh_CN.md](./RedPacketRainEngine-API-zh_CN.md)

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
import VueRedPacketRain from '你的包路径/src/vue/VueRedPacketRain.vue';

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
