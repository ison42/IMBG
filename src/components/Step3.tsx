import React, { useEffect, useRef } from 'react';

interface UserData {
  mbti: string;
  birthDate: string;
  wuxing: string;
  calibrationAnswer: string;
}

interface Step3Props {
  userData: UserData;
  onRestart: () => void;
}

const Step3: React.FC<Step3Props> = ({ userData, onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // MBTI昵称映射
  const mbtiNicknames: Record<string, string> = {
    'INFJ': '绿老头',
    'INFP': '小蝴蝶',
    'INTJ': '建筑师',
    'INTP': '科学家',
    'ENFJ': '教导主任',
    'ENFP': '快乐小狗',
    'ENTJ': '霸道总裁',
    'ENTP': '辩论家',
    'ISFJ': '守护者',
    'ISFP': '艺术家',
    'ISTJ': '公务员',
    'ISTP': '手艺人',
    'ESFJ': '大姐姐',
    'ESFP': '表演家',
    'ESTJ': '企业家',
    'ESTP': '冒险家'
  };

  // 有趣的结果标题
  const resultTitles: Record<string, string> = {
    'INFJ': '绿老头的神秘花园',
    'INFP': '小蝴蝶的梦幻之旅',
    'INTJ': '建筑师的思维宫殿',
    'INTP': '科学家的实验室',
    'ENFJ': '教导主任的演讲台',
    'ENFP': '快乐小狗的派对',
    'ENTJ': '霸道总裁的办公室',
    'ENTP': '辩论家的战场',
    'ISFJ': '守护者的温馨小屋',
    'ISFP': '艺术家的工作室',
    'ISTJ': '公务员的办公桌',
    'ISTP': '手艺人的工作坊',
    'ESFJ': '大姐姐的客厅',
    'ESFP': '表演家的舞台',
    'ESTJ': '企业家的会议室',
    'ESTP': '冒险家的丛林'
  };

  // 五行颜色
  const wuxingColors: Record<string, string> = {
    '金': '#FFD700',
    '木': '#228B22',
    '水': '#1E90FF',
    '火': '#FF4500',
    '土': '#CD853F'
  };

  // 绘制角色形象
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 获取五行颜色
    const wuxingColor = wuxingColors[userData.wuxing] || '#999999';

    // 绘制背景
    const gradient = ctx.createRadialGradient(80, 80, 0, 80, 80, 80);
    gradient.addColorStop(0, wuxingColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(80, 80, 80, 0, Math.PI * 2);
    ctx.fill();

    // 绘制角色头部
    ctx.fillStyle = '#FFDAB9';
    ctx.beginPath();
    ctx.arc(80, 80, 50, 0, Math.PI * 2);
    ctx.fill();

    // 绘制眼睛
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(65, 70, 8, 0, Math.PI * 2);
    ctx.arc(95, 70, 8, 0, Math.PI * 2);
    ctx.fill();

    // 绘制嘴巴（根据MBTI类型调整表情）
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3;
    if (userData.mbti.startsWith('E')) {
      // 外向型，微笑
      ctx.beginPath();
      ctx.arc(80, 90, 15, 0, Math.PI);
      ctx.stroke();
    } else {
      // 内向型，平静
      ctx.beginPath();
      ctx.moveTo(65, 90);
      ctx.lineTo(95, 90);
      ctx.stroke();
    }

    // 绘制头发（根据五行调整颜色）
    ctx.fillStyle = wuxingColor;
    ctx.beginPath();
    ctx.arc(80, 40, 40, 0, Math.PI * 2);
    ctx.fill();

    // 绘制装饰元素（根据MBTI类型）
    if (userData.mbti.includes('F')) {
      // 情感型，绘制花朵
      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.arc(40, 40, 10, 0, Math.PI * 2);
      ctx.arc(30, 50, 10, 0, Math.PI * 2);
      ctx.arc(50, 50, 10, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // 思考型，绘制几何图形
      ctx.strokeStyle = '#4682B4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(35, 40);
      ctx.lineTo(45, 30);
      ctx.lineTo(55, 40);
      ctx.lineTo(45, 50);
      ctx.closePath();
      ctx.stroke();
    }
  }, [userData]);

  // 生成性格分析
  const generateAnalysis = () => {
    const mbti = userData.mbti;
    const wuxing = userData.wuxing;

    // 基础MBTI分析
    const mbtiAnalysis: Record<string, string> = {
      'INFJ': '你是一个理想主义者，充满洞察力和同理心，总是在寻找生活的意义和价值。',
      'INFP': '你是一个浪漫的梦想家，重视个人价值观，对世界充满好奇和热情。',
      'INTJ': '你是一个战略思想家，逻辑清晰，目标明确，善于规划和执行。',
      'INTP': '你是一个好奇的思考者，喜欢探索各种可能性，追求知识和真理。',
      'ENFJ': '你是一个热情的领导者，善于理解他人，激励和引导团队。',
      'ENFP': '你是一个充满活力的冒险家，热爱新体验，善于与人建立联系。',
      'ENTJ': '你是一个果断的领导者，目标明确，善于组织和指挥。',
      'ENTP': '你是一个机智的辩论家，喜欢挑战传统，寻找创新的解决方案。',
      'ISFJ': '你是一个忠诚的守护者，关心他人，注重细节，善于照顾他人。',
      'ISFP': '你是一个敏感的艺术家，热爱美和和谐，重视个人体验。',
      'ISTJ': '你是一个可靠的组织者，注重秩序和传统，做事认真负责。',
      'ISTP': '你是一个实用的手艺人，善于解决问题，喜欢动手实践。',
      'ESFJ': '你是一个热情的照顾者，善于与人相处，重视和谐的人际关系。',
      'ESFP': '你是一个活泼的表演者，喜欢在人群中脱颖而出，享受生活的乐趣。',
      'ESTJ': '你是一个务实的管理者，善于组织和执行，重视效率和结果。',
      'ESTP': '你是一个勇敢的冒险家，喜欢挑战，善于应对各种情况。'
    };

    // 五行分析
    const wuxingAnalysis: Record<string, string> = {
      '金': '你具有坚强的意志和明确的目标，做事果断，追求卓越。',
      '木': '你充满活力和创造力，善于创新，具有成长潜力。',
      '水': '你思维灵活，适应力强，善于观察和分析。',
      '火': '你热情开朗，充满能量，具有领导力和感染力。',
      '土': '你稳重踏实，注重实际，善于建设和维护。'
    };

    return `${mbtiAnalysis[mbti] || ''} ${wuxingAnalysis[wuxing] || ''}`;
  };

  // 生成冒险警告
  const generateWarning = () => {
    const mbti = userData.mbti;
    const wuxing = userData.wuxing;

    const warnings: Record<string, string> = {
      'INFJ': '你过于理想主义，容易对现实感到失望，不要把所有事情都看得太重。',
      'INFP': '你情感过于敏感，容易被他人的情绪影响，记得保护好自己的内心。',
      'INTJ': '你过于追求完美，容易陷入分析 paralysis，有时候需要学会放手。',
      'INTP': '你过于理性，容易忽视他人的感受，记得多关注身边人的情绪。',
      'ENFJ': '你过于关注他人，容易忽视自己的需求，记得给自己留出时间。',
      'ENFP': '你过于冲动，容易做出不切实际的决定，记得在行动前多思考。',
      'ENTJ': '你过于强势，容易给他人造成压力，记得学会倾听和妥协。',
      'ENTP': '你过于喜欢争论，容易得罪他人，记得在表达观点时更加温和。',
      'ISFJ': '你过于奉献，容易被他人利用，记得学会拒绝和保护自己。',
      'ISFP': '你过于随性，容易缺乏规划，记得为未来做一些准备。',
      'ISTJ': '你过于传统，容易拒绝变化，记得保持开放的心态。',
      'ISTP': '你过于独立，容易忽视团队合作，记得学会与他人协作。',
      'ESFJ': '你过于在意他人的评价，容易失去自我，记得坚持自己的信念。',
      'ESFP': '你过于追求刺激，容易忽视长远利益，记得为未来做打算。',
      'ESTJ': '你过于严格，容易给他人造成压力，记得多一些宽容和理解。',
      'ESTP': '你过于冒险，容易陷入危险，记得在行动前评估风险。'
    };

    const wuxingWarnings: Record<string, string> = {
      '金': '你过于追求成功，容易忽视过程的重要性，记得享受人生的旅程。',
      '木': '你过于急躁，容易冲动行事，记得保持冷静和耐心。',
      '水': '你过于敏感，容易情绪波动，记得保持情绪稳定。',
      '火': '你过于热情，容易过度消耗自己，记得适当休息和放松。',
      '土': '你过于保守，容易错过机会，记得勇敢尝试新事物。'
    };

    return `${warnings[mbti] || ''} ${wuxingWarnings[wuxing] || ''}`;
  };

  // 生成大师建议
  const generateAdvice = () => {
    const mbti = userData.mbti;
    const wuxing = userData.wuxing;

    const advices: Record<string, string> = {
      'INFJ': '学会放下完美主义，接受生活中的不完美，多与他人分享你的想法。',
      'INFP': '保持你的理想主义，但也要学会面对现实，找到理想与现实的平衡。',
      'INTJ': '不要过于固执己见，学会倾听他人的意见，有时候集体的智慧比个人更强大。',
      'INTP': '不要过于沉迷于理论，多将你的想法付诸实践，让理论与实践相结合。',
      'ENFJ': '在帮助他人的同时，也要照顾好自己的需求，学会自我关怀。',
      'ENFP': '保持你的热情和创造力，但也要学会规划和执行，让梦想成为现实。',
      'ENTJ': '在追求目标的同时，也要关注团队成员的感受，学会人性化管理。',
      'ENTP': '学会控制你的辩论欲望，有时候沉默比争论更有力量。',
      'ISFJ': '学会拒绝不合理的要求，保护好自己的时间和精力。',
      'ISFP': '保持你的艺术感，但也要学会规划和组织，让生活更加有序。',
      'ISTJ': '保持你的责任感，但也要学会灵活应对变化，适应不同的情况。',
      'ISTP': '保持你的独立精神，但也要学会与他人合作，共同完成目标。',
      'ESFJ': '保持你的关怀之心，但也要学会关注自己的感受，不要过度讨好他人。',
      'ESFP': '保持你的活力和热情，但也要学会为未来做规划，实现长期目标。',
      'ESTJ': '保持你的组织能力，但也要学会倾听他人的意见，更加民主地做决策。',
      'ESTP': '保持你的冒险精神，但也要学会评估风险，避免不必要的危险。'
    };

    const wuxingAdvices: Record<string, string> = {
      '金': '在追求成功的同时，也要注重内心的平静，培养一些精神追求。',
      '木': '保持你的活力和创造力，但也要学会耐心等待，让事情自然发展。',
      '水': '保持你的敏感性，但也要学会控制情绪，保持内心的平静。',
      '火': '保持你的热情，但也要学会适度，避免过度消耗自己。',
      '土': '保持你的踏实和稳定，但也要学会接受变化，拥抱新的可能性。'
    };

    return `${advices[mbti] || ''} ${wuxingAdvices[wuxing] || ''}`;
  };

  // 生成毒舌结论
  const generateSnarkyConclusion = () => {
    const mbti = userData.mbti;
    const wuxing = userData.wuxing;

    const conclusions = [
      `作为${mbtiNicknames[mbti]}+${wuxing}命的你，简直就是矛盾的集合体 —— 一边想着拯救世界，一边又想躺在沙发上吃零食。`,
      `你的性格就像${wuxing}做的火锅 —— 看起来很有料，吃起来很带劲，但也可能会烫到舌头。`,
      `别人都说你是${mbtiNicknames[mbti]}，但我觉得你更像是被${wuxing}元素加持的戏精 —— 人生如戏，全靠演技。`,
      `你这种性格，在古代可能是个隐士，在现代可能是个社畜 —— 但不管怎样，你还是你，独一无二的你。`,
      `别以为你是${mbtiNicknames[mbti]}就可以为所欲为，${wuxing}命的你还是要面对现实的 —— 比如明天要上班。`
    ];

    return conclusions[Math.floor(Math.random() * conclusions.length)];
  };

  // 收集测试数据
  const collectUserData = () => {
    try {
      // 从 localStorage 获取现有数据
      const existingData = localStorage.getItem('testResults');
      const testResults = existingData ? JSON.parse(existingData) : [];
      
      // 检查是否已经存在相同的测试结果
      const existingResult = testResults.find((result: any) => {
        return result.mbti === userData.mbti &&
               result.birth_date === userData.birthDate &&
               result.wuxing === userData.wuxing &&
               result.calibration_answer === userData.calibrationAnswer;
      });
      
      // 如果已经存在相同的测试结果，不重复添加
      if (existingResult) {
        console.log('测试数据已存在，无需重复添加:', existingResult);
        return;
      }
      
      // 添加新的测试结果
      const newResult = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        mbti: userData.mbti,
        birth_date: userData.birthDate,
        wuxing: userData.wuxing,
        calibration_answer: userData.calibrationAnswer,
        created_at: new Date().toISOString()
      };
      
      testResults.push(newResult);
      
      // 存储回 localStorage
      localStorage.setItem('testResults', JSON.stringify(testResults));
      
      console.log('数据收集成功:', newResult);
    } catch (error) {
      console.error('数据收集错误:', error);
    }
  };

  // 组件加载时收集数据
  useEffect(() => {
    collectUserData();
  }, []);

  return (
    <div className="result-card">
      <h2 className="result-title">{resultTitles[userData.mbti] || '性格冒险家'}</h2>
      <p className="result-subtitle">{mbtiNicknames[userData.mbti]} + {userData.wuxing}命</p>

      <div className="character-image-container">
        <canvas
          ref={canvasRef}
          className="character-canvas"
          width={160}
          height={160}
        />
      </div>

      <div className="feature-section">
        <div className="feature-title">
          <div className="feature-icon star-icon">⭐</div>
          <span>英雄特质</span>
        </div>
        <div className="feature-content">
          {generateAnalysis()}
        </div>
      </div>

      <div className="feature-section">
        <div className="feature-title">
          <div className="feature-icon warning-icon">⚠️</div>
          <span>冒险警告</span>
        </div>
        <div className="feature-content">
          {generateWarning()}
        </div>
      </div>

      <div className="feature-section">
        <div className="feature-title">
          <div className="feature-icon bulb-icon">💡</div>
          <span>大师建议</span>
        </div>
        <div className="feature-content">
          {generateAdvice()}
        </div>
      </div>

      <div className="highlight-box">
        <div className="talk-title">
          <span>😏 毒舌结论</span>
        </div>
        <div className="talk-content">
          {generateSnarkyConclusion()}
        </div>
      </div>

      <div className="button-container">
        <button className="btn-primary" onClick={onRestart}>
          重新测试
        </button>
      </div>
    </div>
  );
};

export default Step3;