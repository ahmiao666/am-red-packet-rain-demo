<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { RedPacketRain } from "@ahmiao666/red-packet-rain-vue";
import type { RedPacketClickEvent, AnimationState, PerformanceStats } from "@ahmiao666/red-packet-rain-vue";

// 组件引用
const redPacketRainRef = ref<InstanceType<typeof RedPacketRain> | null>(null);

// 状态管理
const isRunning = ref(false);
const clickedCount = ref(0);
const totalValue = ref(0);
const isArrayMode = ref(true);
const isShowControls = ref(false);
// 统计数据
const stats = reactive<PerformanceStats>({
  fps: 0,
  renderTime: 0,
  updateTime: 0,
  totalRedPackets: 0,
  activeRedPackets: 0,
});

// 模拟红包数据
const mockRedPackets = [
  { id: "id1", myFlag: true, value: 100 }, // 特殊红包
  { id: "id2", myFlag: false, value: 20 },
  { id: "id3", myFlag: true, value: 150 }, // 特殊红包
  { id: "id4", myFlag: false, value: 30 },
  { id: "id5", myFlag: false, value: 200 },
  { id: "id6", myFlag: true, value: 50 }, // 特殊红包
  { id: "id7", myFlag: false, value: 80 },
  { id: "id8", myFlag: false, value: 60 },
  { id: "id9", myFlag: true, value: 120 }, // 特殊红包
  { id: "id10", myFlag: false, value: 40 },
];

// 配置数据
const config = reactive({
  redPackets: isArrayMode ? mockRedPackets : undefined,
  isSpecialFn: isArrayMode ? "myFlag" : undefined,
  count: isArrayMode ? undefined : 15, // 数组模式下自动使用数组长度，随机模式下使用15
  density: 3,
  speed: { min: 2, max: 5 },
  enablePerformanceMode: true,
  enableFrameRateLimit: true,
  debugMode: false,
  maxFPS: 60,
  qualityMaxFPS: 144,
});

// 🎯 切换模式：数组模式 vs 随机模式
const handleToggleMode = () => {
  isArrayMode.value = !isArrayMode.value;
  const newConfig = !isArrayMode
    ? {
        // 切换到数组模式
        redPackets: mockRedPackets,
        isSpecialFn: "myFlag",
        count: undefined, // 清除count，使用数组长度
      }
    : {
        // 切换到随机模式
        redPackets: undefined, // 清除数组
        isSpecialFn: undefined, // 清除特殊判断
        count: 15, // 使用指定count
      };

  redPacketRainRef.value?.updateConfig(newConfig);
  console.log(`切换到${!isArrayMode ? "数组" : "随机"}模式`);
};

// 事件处理函数
const handleRedPacketClick = (event: RedPacketClickEvent) => {
  clickedCount.value++;
  const value = event.value || 0;
  totalValue.value += value;
  const originalData = event.redPacket.originalData as RedPacketData;
    if (originalData) {
      // 🎯 数组模式：有原始数据
      if (event.redPacket.type === "special") {
        console.log("🌟 特殊红包 (数组模式)!!!", {
          id: originalData.id,
          myFlag: originalData.myFlag,
          value: originalData.value,
          type: event.redPacket.type,
        });
      } else {
        console.log("🎁 普通红包 (数组模式)", {
          id: originalData.id,
          myFlag: originalData.myFlag,
          value: originalData.value,
          type: event.redPacket.type,
        });
      }
    } else {
      // 🎯 随机模式：无原始数据，全部是普通红包
      console.log("🎲 随机红包 (随机模式)", {
        id: event.redPacket.id,
        value: event.value,
        type: event.redPacket.type, // 始终为 'normal'
      });
    }

  // 创建点击效果
  createClickEffect(event.x, event.y, value, event.redPacket?.type === "special");
};

const handleAnimationStateChange = (state: AnimationState) => {
  isRunning.value = state.isRunning;
};

const handlePerformanceUpdate = (newStats: PerformanceStats) => {
  Object.assign(stats, newStats);
};

// 创建点击效果
const createClickEffect = (x: number, y: number, value: number, isSpecial: boolean) => {
  const effect = document.createElement("div");
  effect.style.position = "fixed";
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  effect.style.color = isSpecial ? "#FFD700" : "#FF6B6B";
  effect.style.fontSize = "24px";
  effect.style.fontWeight = "bold";
  effect.style.pointerEvents = "none";
  effect.style.zIndex = "9999";
  effect.style.animation = "float-up 2s ease-out forwards";
  effect.textContent = `+￥${value}`;

  document.body.appendChild(effect);
  setTimeout(() => {
    if (document.body.contains(effect)) {
      document.body.removeChild(effect);
    }
  }, 2000);
};

// 外部控制函数
const handleExternalStart = () => {
  redPacketRainRef.value?.start();
};

const handleExternalStop = () => {
  redPacketRainRef.value?.stop();
};

const handleTogglePerformanceMode = () => {
  const currentMode = redPacketRainRef.value?.getPerformanceMode();
  redPacketRainRef.value?.setPerformanceMode(!currentMode);
  config.enablePerformanceMode = !currentMode;
  console.log(`切换到${!currentMode ? "性能" : "高质量"}模式`);
};

const handleUpdateConfig = () => {
  const newConfig = {
    count: 25,
    density: 5,
    speed: { min: 3, max: 8 },
  };
  redPacketRainRef.value?.updateConfig(newConfig);
  Object.assign(config, newConfig);
  console.log("配置更新为高密度模式");
};

const handleResetConfig = () => {
  const defaultConfig = {
    count: 15,
    density: 3,
    speed: { min: 2, max: 5 },
  };
  redPacketRainRef.value?.updateConfig(defaultConfig);
  Object.assign(config, defaultConfig);
  console.log("配置重置为默认值");
};

// 组件挂载
onMounted(() => {
  console.log("Vue红包雨组件已加载");
});
</script>

<template>
  <div class="app">
    <div class="app-container">
      <h1 class="app-title">Vue 红包雨 Demo (本地调试版)</h1>

      <!-- 统计面板 -->
      <div class="stats-panel">
        <div class="stat-item">
          <div class="stat-value">{{ isRunning ? "🟢 运行中" : "🔴 已停止" }}</div>
          <div class="stat-label">状态</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ isArrayMode ? "📊 数组模式" : "🎲 随机模式" }}</div>
          <div class="stat-label">当前模式</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ clickedCount }}</div>
          <div class="stat-label">点击次数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">￥{{ totalValue }}</div>
          <div class="stat-label">累计收益</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.fps }}</div>
          <div class="stat-label">FPS</div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="control-panel">
        <button class="control-btn primary" @click="handleExternalStart">🎬 启动</button>
        <button class="control-btn danger" @click="handleExternalStop">🛑 停止</button>
        <button class="control-btn success" @click="handleToggleMode">
          {{ isArrayMode ? "🎲 切换随机" : "📊 切换数组" }}
        </button>
        <button class="control-btn purple" @click="handleTogglePerformanceMode">⚡ 性能模式</button>
        <button class="control-btn warning" @click="handleUpdateConfig">🚀 高密度</button>
        <button class="control-btn secondary" @click="handleResetConfig">🔄 重置</button>
        <button class="control-btn secondary" @click="() => (isShowControls = !isShowControls)">🔄 显示控制</button>
      </div>

      <!-- Vue红包雨组件 -->
      <div class="red-packet-rain-container">
        <RedPacketRain
          ref="redPacketRainRef"
          :config="config"
          :auto-start="false"
          :show-controls="isShowControls"
          @red-packet-click="handleRedPacketClick"
          @animation-state-change="handleAnimationStateChange"
          @performance-update="handlePerformanceUpdate"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.app-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 1200px;
}

.app-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5em;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-panel {
  background: linear-gradient(135deg, #e8f4f8 0%, #d4e6f1 100%);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 1.8em;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.control-panel {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.control-btn.primary {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
}

.control-btn.danger {
  background: linear-gradient(45deg, #dc3545, #c82333);
  color: white;
}

.control-btn.purple {
  background: linear-gradient(45deg, #6f42c1, #6610f2);
  color: white;
}

.control-btn.warning {
  background: linear-gradient(45deg, #fd7e14, #e55a4e);
  color: white;
}

.control-btn.secondary {
  background: linear-gradient(45deg, #6c757d, #5a6268);
  color: white;
}

.usage-section {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 8px;
  padding: 25px;
  margin-top: 20px;
  color: white;
}

.usage-section h3 {
  margin-top: 0;
  font-size: 1.5em;
}

.code-block {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  overflow: auto;
  white-space: pre-wrap;
}

/* 红包雨组件容器样式 */
.red-packet-rain-container {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  overflow: hidden;
  margin-bottom: 20px;
}

@keyframes float-up {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style>
