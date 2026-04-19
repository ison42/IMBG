-- 创建测试结果表
CREATE TABLE IF NOT EXISTS test_results (
    id TEXT PRIMARY KEY,
    mbti TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    wuxing TEXT NOT NULL,
    calibration_answer TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_results_mbti ON test_results(mbti);
CREATE INDEX IF NOT EXISTS idx_test_results_wuxing ON test_results(wuxing);
