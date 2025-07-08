import React, { useRef, useState, useCallback } from "react";
import RedPacketRain from "@ahmiao666/red-packet-rain-react";
import type {
  RedPacketRainRef,
  RedPacketClickEvent,
  AnimationState,
  PerformanceStats,
} from "@ahmiao666/red-packet-rain-react";
import "./App.css";

// 定义红包原始数据类型
interface RedPacketData {
  id: string;
  myFlag: boolean;
  value: number;
}

function App() {
  const redPacketRainRef = useRef<RedPacketRainRef>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [clickedCount, setClickedCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [isShowControls, setIsShowControls] = useState(false);
  const [isArrayMode, setIsArrayMode] = useState(true); // 🎯 控制数组模式/随机模式
  const [currentMode, setCurrentMode] = useState(true);
  const [stats, setStats] = useState<PerformanceStats>({
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

  // 红包点击事件处理
  const handleRedPacketClick = useCallback((event: RedPacketClickEvent) => {
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

    setClickedCount((prev) => prev + 1);
    setTotalValue((prev) => prev + (event.value || 0));

    // 显示点击效果
    const clickEffect = document.createElement("div");
    clickEffect.style.position = "fixed";
    clickEffect.style.left = `${event.x}px`;
    clickEffect.style.top = `${event.y}px`;
    clickEffect.style.color = event.redPacket?.type === "special" ? "#fff200" : "#FF6B6B";
    clickEffect.style.fontSize = "24px";
    clickEffect.style.fontWeight = "bold";
    clickEffect.style.pointerEvents = "none";
    clickEffect.style.zIndex = "9999";
    clickEffect.style.animation = "float-up 2s ease-out forwards";
    clickEffect.textContent = `+￥${event.value || 0}`;

    document.body.appendChild(clickEffect);
    setTimeout(() => {
      if (document.body.contains(clickEffect)) {
        document.body.removeChild(clickEffect);
      }
    }, 2000);
  }, []);

  // 动画状态变化事件处理
  const handleAnimationStateChange = useCallback((state: AnimationState) => {
    setIsRunning(state.isRunning);
  }, []);

  // 性能统计更新事件处理
  const handlePerformanceUpdate = useCallback((newStats: PerformanceStats) => {
    setStats(newStats);
  }, []);

  // 外部控制函数
  const handleExternalStart = () => {
    redPacketRainRef.current?.start();
  };

  const handleExternalStop = () => {
    redPacketRainRef.current?.stop();
  };

  const handleTogglePerformanceMode = () => {
    const currentMode = redPacketRainRef.current?.getPerformanceMode();
    redPacketRainRef.current?.setPerformanceMode(!currentMode);
    console.log("性能模式已切换:", !currentMode ? "启用" : "禁用");
    setCurrentMode(!currentMode);
  };

  const handleUpdateConfig = () => {
    redPacketRainRef.current?.updateConfig({
      count: 25,
      density: 5,
      speed: { min: 3, max: 8 },
    });
    console.log("配置已更新为高密度模式");
  };

  const handleResetConfig = () => {
    redPacketRainRef.current?.updateConfig({
      count: 15,
      density: 3,
      speed: { min: 2, max: 5 },
    });
    console.log("配置已重置为默认值");
  };

  // 🎯 切换模式：数组模式 vs 随机模式
  const handleToggleMode = () => {
    setIsArrayMode((prev) => !prev);
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

    redPacketRainRef.current?.updateConfig(newConfig);
    console.log(`切换到${!isArrayMode ? "数组" : "随机"}模式`);
  };

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">React 红包雨 Demo (本地调试版)</h1>

        {/* 统计面板 */}
        <div className="stats-panel">
          <div className="stat-item">
            <div className="stat-value">{isRunning ? "🟢 运行中" : "🔴 已停止"}</div>
            <div className="stat-label">状态</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{isArrayMode ? "📊 数组模式" : "🎲 随机模式"}</div>
            <div className="stat-label">当前模式</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{clickedCount}</div>
            <div className="stat-label">点击次数</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">￥{totalValue}</div>
            <div className="stat-label">累计收益</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.fps}</div>
            <div className="stat-label">FPS</div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="control-panel">
          <button className="control-btn primary" onClick={handleExternalStart}>
            🎬 启动
          </button>
          <button className="control-btn danger" onClick={handleExternalStop}>
            🛑 停止
          </button>
          <button className="control-btn success" onClick={handleToggleMode}>
            {isArrayMode ? "🎲 切换随机" : "📊 切换数组"}
          </button>
          <button className="control-btn purple" onClick={handleTogglePerformanceMode}>
            ⚡ {currentMode ? "普通模式" : "性能模式"}
          </button>
          <button className="control-btn warning" onClick={handleUpdateConfig}>
            🚀 高密度
          </button>
          <button className="control-btn secondary" onClick={handleResetConfig}>
            🔄 重置
          </button>
          <button className="control-btn secondary" onClick={() => setIsShowControls(!isShowControls)}>
            🔄 显示控制
          </button>
        </div>

        {/* 红包雨组件 */}
        <RedPacketRain
          ref={redPacketRainRef}
          config={{
            // 🎯 根据模式动态配置
            redPackets: isArrayMode ? mockRedPackets : undefined,
            isSpecialFn: isArrayMode ? "myFlag" : undefined,
            count: isArrayMode ? undefined : 15, // 数组模式下自动使用数组长度，随机模式下使用15
            density: 2,
            speed: { min: 2, max: 5 },
            enablePerformanceMode: true,
            enableFrameRateLimit: true,
            debugMode: false,
            maxFPS: 60,
            qualityMaxFPS: 120,
            isParticle: true,
          }}
          style={{
            width: "100%",
            height: "100%",
            border: "3px solid red",
          }}
          autoStart={false}
          showControls={isShowControls}
          onRedPacketClick={handleRedPacketClick}
          onAnimationStateChange={handleAnimationStateChange}
          onPerformanceUpdate={handlePerformanceUpdate}
        />
      </div>
    </div>
  );
}

export default App;
