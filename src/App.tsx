import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Admin from './pages/Admin';
import './App.css';

interface UserData {
  mbti: string;
  birthDate: string;
  wuxing: string;
  calibrationAnswer: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    mbti: '',
    birthDate: '',
    wuxing: '',
    calibrationAnswer: ''
  });

  const handleNextStep = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
    // 当进入Step2时，存储出生日期到localStorage
    if (data.birthDate) {
      localStorage.setItem('birthDate', data.birthDate);
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setUserData({
      mbti: '',
      birthDate: '',
      wuxing: '',
      calibrationAnswer: ''
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 主测试流程 */}
          <Route path="/" element={
            <div className="container">
              {/* 步骤指示器 */}
              <div className="step-indicator">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <div className="step-circle">1</div>
                  <span className="step-label">角色创建</span>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <div className="step-circle">2</div>
                  <span className="step-label">冒险测试</span>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">英雄档案</span>
                </div>
              </div>

              {/* 页面标题 */}
              <h1 className="title">性格冒险家</h1>
              <p className="subtitle">准备好探索你的性格冒险了吗？</p>

              {/* 步骤内容 */}
              {currentStep === 1 && (
                <Step1 onNext={handleNextStep} />
              )}
              {currentStep === 2 && (
                <Step2 
                  onNext={handleNextStep} 
                  onPrev={handlePrevStep}
                />
              )}
              {currentStep === 3 && (
                <Step3 
                  userData={userData} 
                  onRestart={handleRestart}
                />
              )}
            </div>
          } />
          
          {/* 管理页面 */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;