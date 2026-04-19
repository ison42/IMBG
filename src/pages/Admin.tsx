import React, { useState, useEffect } from 'react';

interface TestResult {
  id: string;
  mbti: string;
  birth_date: string;
  wuxing: string;
  calibration_answer: string;
  created_at: string;
}

interface Stats {
  totalTests: number;
  mbtiDistribution: Record<string, number>;
  wuxingDistribution: Record<string, number>;
  testsByDate: Record<string, number>;
}

const Admin: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalTests: 0,
    mbtiDistribution: {},
    wuxingDistribution: {},
    testsByDate: {}
  });

  // 计算统计数据
  const calculateStats = (results: TestResult[]) => {
    const mbtiDistribution: Record<string, number> = {};
    const wuxingDistribution: Record<string, number> = {};
    const testsByDate: Record<string, number> = {};

    results.forEach(result => {
      // MBTI 分布
      if (mbtiDistribution[result.mbti]) {
        mbtiDistribution[result.mbti]++;
      } else {
        mbtiDistribution[result.mbti] = 1;
      }

      // 五行分布
      if (wuxingDistribution[result.wuxing]) {
        wuxingDistribution[result.wuxing]++;
      } else {
        wuxingDistribution[result.wuxing] = 1;
      }

      // 按日期统计
      const date = result.created_at.split('T')[0];
      if (testsByDate[date]) {
        testsByDate[date]++;
      } else {
        testsByDate[date] = 1;
      }
    });

    setStats({
      totalTests: results.length,
      mbtiDistribution,
      wuxingDistribution,
      testsByDate
    });
  };

  // 加载测试数据
  const fetchTestResults = async () => {
    try {
      // 从云端 API 获取测试数据
      const response = await fetch('/api/test-results');
      const testResults = await response.json();
      
      setTestResults(testResults);
      calculateStats(testResults);
    } catch (error) {
      console.error('获取数据错误:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  // 删除测试结果
  const deleteTestResult = async (id: string) => {
    if (!window.confirm('确定要删除这条测试结果吗？')) {
      return;
    }

    try {
      await fetch(`/api/test-results/${id}`, {
        method: 'DELETE'
      });
      
      // 重新加载数据
      await fetchTestResults();
    } catch (error) {
      console.error('删除数据错误:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">测试数据管理</h1>
      
      {/* 统计数据区域 */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">测试统计数据</h2>
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>加载数据中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 总测试次数 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">总测试次数</h3>
              <p className="text-3xl font-bold mt-2">{stats.totalTests}</p>
            </div>
            
            {/* MBTI 分布 */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">MBTI 分布</h3>
              <div className="mt-2 space-y-2">
                {Object.entries(stats.mbtiDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([mbti, count]) => (
                    <div key={mbti} className="flex justify-between">
                      <span>{mbti}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* 五行分布 */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">五行分布</h3>
              <div className="mt-2 space-y-2">
                {Object.entries(stats.wuxingDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([wuxing, count]) => (
                    <div key={wuxing} className="flex justify-between">
                      <span>{wuxing}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* 最近测试日期 */}
            <div className="bg-purple-50 p-6 rounded-lg md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-purple-800">最近测试日期</h3>
              <div className="mt-2 space-y-2">
                {Object.entries(stats.testsByDate)
                  .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                  .slice(0, 7)
                  .map(([date, count]) => (
                    <div key={date} className="flex justify-between">
                      <span>{date}</span>
                      <span className="font-medium">{count} 次</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">测试结果列表</h2>
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>加载数据中...</p>
          </div>
        ) : testResults.length === 0 ? (
          <p className="text-center text-gray-500">暂无测试数据</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4">MBTI</th>
                  <th className="text-left py-3 px-4">出生日期</th>
                  <th className="text-left py-3 px-4">五行</th>
                  <th className="text-left py-3 px-4">校准答案</th>
                  <th className="text-left py-3 px-4">测试时间</th>
                  <th className="text-left py-3 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{result.mbti}</td>
                    <td className="py-3 px-4">{result.birth_date}</td>
                    <td className="py-3 px-4">{result.wuxing}</td>
                    <td className="py-3 px-4">{result.calibration_answer}</td>
                    <td className="py-3 px-4">
                      {new Date(result.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => deleteTestResult(result.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;