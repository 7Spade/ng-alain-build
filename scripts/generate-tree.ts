#!/usr/bin/env node

/**
 * ng-alain 專案結構樹狀圖生成腳本 
 * 適用於 ng-alain 20.0.2 + Angular 20 + ng-zorro-antd 企業級前端專案
 * 自動生成專案目錄結構報告，用於文件化專案架構
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// ============================================================
// 類型定義 - AI Agent 友好的數據結構
// ============================================================

/**
 * 專案統計數據接口
 */
interface ProjectStatistics {
  totalFiles: number;
  totalDirectories: number;
  totalSize: number;
  filesByType: Record<string, number>;
  filesByAngularType: Record<string, number>;
  directoryDepth: number;
}

/**
 * 目錄節點接口（用於 JSON 輸出）
 */
interface DirectoryNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  size?: number;
  extension?: string;
  angularType?: string;
  children?: DirectoryNode[];
  tags?: string[];
}

/**
 * 目錄用途信息接口
 */
interface DirectoryPurpose {
  path: string;
  purpose: string;
  tags: string[];
  importance: 'critical' | 'high' | 'medium' | 'low';
}

// Angular + ng-alain 專案排除模式
const EXCLUDE_PATTERNS: readonly string[] = [
  // Angular CLI 和編譯產出
  'dist',
  '.angular',
  'angular.json.bak',
  
  // Angular 特定排除
  'e2e',
  'cypress',
  
  // IDE 和編輯器配置
  '.vscode',
  '.idea',
  '.idx',
  '.envrc',
  
  // 構建工具和依賴
  'node_modules',
  '.pnp',
  '.pnp.*',
  '.yarn',
  'build',
  
  // 版本控制
  '.git',
  '.husky',
  
  // Angular 測試和覆蓋率
  'coverage',
  '.nyc_output',
  '__tests__',
  'test',
  'tests',
  '*.spec.ts',
  
  // Angular 開發工具
  '.eslintcache',
  '.stylelintcache',
  '.prettiercache',
  
  // TypeScript 編譯產出
  '*.tsbuildinfo',
  'tsconfig.tsbuildinfo',
  
  // 日誌和臨時文件
  '*.log',
  '*.tmp',
  '*.temp',
  '.modified',
  'npm-debug.log',
  'yarn-error.log',
  
  // 系統文件
  '.DS_Store',
  'Thumbs.db',
  'desktop.ini',
  
  // 環境變量文件
  '.env*',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
  
  // Angular 和 ng-alain 特定檔案
  '*.swp',
  '*.swo',
  '*~',
  
  // Firebase Functions (如果使用)
  '.firebase',
  'firebase-debug.log',
  'firestore-debug.log',
  'functions',
  
  // ng-alain 自動生成文件
  '*.md.map',
  '_cli-tpl',
  
  // 其他開發工具 (移除非 Angular 相關)
  '*.pem',
  '*.key',
  '*.crt',
  '*.p12',
  '*.pfx'
] as const;

// Angular/TypeScript 專案排除的文件擴展名
const EXCLUDE_EXTENSIONS: readonly string[] = [
  // Angular 編譯產出
  '.map',
  '.js.map',
  '.css.map',
  '.scss.map',
  '.less.map',
  '.tsbuildinfo',
  
  // Angular 測試文件
  '.spec.ts',
  '.spec.js',
  
  // 日誌和臨時文件
  '.log',
  '.tmp',
  '.temp',
  '.swp',
  '.swo',
  '~',
  
  // 系統和備份文件
  '.bak',
  '.backup',
  '.orig',
  '.rej',
  
  // 開發工具快取
  '.cache',
  '.lock',
  
  // 證書和密鑰文件 (保留用於生產環境安全)
  '.pem',
  '.key',
  '.crt',
  '.p12',
  '.pfx',
  '.p8',
  '.der'
] as const;

// Angular 特定的重要目錄標識
const ANGULAR_DIRECTORIES: readonly string[] = [
  'src',
  'src/app',
  'src/assets',
  'src/styles',
  'src/environments',
  'libs',  // Angular libraries 目錄
  'projects'  // Angular monorepo projects 目錄
] as const;

// ng-alain 特定目錄標識
const NG_ALAIN_DIRECTORIES: readonly string[] = [
  'src/app/routes',
  'src/app/layout',
  'src/app/core',
  'src/app/shared',
  'src/assets/tmp',
  '_mock',
  'scripts/_ci'
] as const;

// ============================================================
// 目錄用途映射 - 為 AI Agent 提供語義化信息
// ============================================================

/**
 * ng-alain 目錄用途說明映射
 */
const DIRECTORY_PURPOSE_MAP: DirectoryPurpose[] = [
  // 核心目錄
  { path: 'src', purpose: '源代碼根目錄', tags: ['ENTRY', 'SOURCE'], importance: 'critical' },
  { path: 'src/app', purpose: 'Angular 應用主目錄', tags: ['CORE', 'APP'], importance: 'critical' },
  { path: 'src/main.ts', purpose: 'Angular 應用入口文件', tags: ['ENTRY', 'BOOTSTRAP'], importance: 'critical' },
  
  // ng-alain 核心功能
  { path: 'src/app/routes', purpose: '業務路由模塊 - ng-alain 業務邏輯主目錄', tags: ['BUSINESS', 'ROUTES'], importance: 'critical' },
  { path: 'src/app/core', purpose: '核心服務模塊 - 全局服務、攔截器、啟動服務', tags: ['CORE', 'SERVICE'], importance: 'critical' },
  { path: 'src/app/layout', purpose: '布局組件 - basic/blank/passport 三種布局', tags: ['LAYOUT', 'UI'], importance: 'high' },
  { path: 'src/app/shared', purpose: '共用組件和模塊 - 可復用的組件、指令、管道', tags: ['SHARED', 'REUSABLE'], importance: 'high' },
  
  // 資源和配置
  { path: 'src/assets', purpose: '靜態資源目錄 - 圖片、樣式、多語言文件', tags: ['ASSETS', 'STATIC'], importance: 'medium' },
  { path: 'src/environments', purpose: '環境配置文件 - 開發/生產環境配置', tags: ['CONFIG', 'ENV'], importance: 'high' },
  { path: 'src/styles', purpose: '全局樣式文件 - Less 主題和樣式', tags: ['STYLE', 'THEME'], importance: 'medium' },
  
  // Mock 數據
  { path: '_mock', purpose: 'Mock 數據服務 - @delon/mock 假數據接口', tags: ['MOCK', 'DEV'], importance: 'medium' },
  
  // 配置文件
  { path: 'angular.json', purpose: 'Angular CLI 配置文件', tags: ['CONFIG', 'BUILD'], importance: 'critical' },
  { path: 'package.json', purpose: 'NPM 依賴配置文件', tags: ['CONFIG', 'DEP'], importance: 'critical' },
  { path: 'tsconfig.json', purpose: 'TypeScript 編譯配置', tags: ['CONFIG', 'TS'], importance: 'high' },
  { path: 'ng-alain.json', purpose: 'ng-alain 框架配置', tags: ['CONFIG', 'ALAIN'], importance: 'high' },
  
  // 構建和部署
  { path: 'scripts', purpose: '構建和部署腳本', tags: ['BUILD', 'SCRIPT'], importance: 'medium' },
  { path: 'proxy.conf.js', purpose: '開發代理配置', tags: ['CONFIG', 'DEV'], importance: 'low' },
  
  // 文檔和記憶庫
  { path: 'memory-bank', purpose: 'AI 專案知識庫 - 專案文檔和記憶系統', tags: ['DOC', 'AI'], importance: 'high' },
  { path: 'docs', purpose: '專案文檔目錄', tags: ['DOC'], importance: 'low' },
  
  // 業務路由子模塊
  { path: 'src/app/routes/dashboard', purpose: '儀表板頁面 - 數據分析和監控', tags: ['BUSINESS', 'DASHBOARD'], importance: 'high' },
  { path: 'src/app/routes/passport', purpose: '用戶認證頁面 - 登入、註冊、找回密碼', tags: ['BUSINESS', 'AUTH'], importance: 'high' },
  { path: 'src/app/routes/exception', purpose: '異常頁面 - 403/404/500 錯誤頁', tags: ['BUSINESS', 'ERROR'], importance: 'medium' },
  { path: 'src/app/routes/pro', purpose: 'Pro 進階示例 - 表單、列表、詳情頁', tags: ['BUSINESS', 'EXAMPLE'], importance: 'medium' },
  { path: 'src/app/routes/organization', purpose: '組織架構管理模塊', tags: ['BUSINESS', 'ORG'], importance: 'high' }
] as const;

/**
 * 檢查路徑是否應該被排除
 */
function shouldExclude(filePath: string, fileName: string): boolean {
  // 檢查排除模式
  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.includes('*')) {
      // 處理通配符模式
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      if (regex.test(fileName)) {
        return true;
      }
    } else {
      // 精確匹配 - 只檢查文件名，不檢查完整路徑
      // 這樣避免誤傷（例如 'test' 不會排除包含 'test' 的其他路徑）
      if (fileName === pattern) {
        return true;
      }
      // 檢查路徑片段（僅檢查路徑組件，不是 includes）
      const pathParts = filePath.split(path.sep);
      if (pathParts.includes(pattern)) {
        return true;
      }
    }
  }

  // 檢查文件擴展名
  const ext = path.extname(fileName);
  if (EXCLUDE_EXTENSIONS.includes(ext)) {
    return true;
  }

  return false;
}

/**
 * 檢查是否為 Angular 重要目錄
 */
function isAngularDirectory(dirPath: string, dirName: string): boolean {
  const joinedPath = path.join(dirPath, dirName);
  return ANGULAR_DIRECTORIES.some(angularDir => 
    joinedPath.endsWith(angularDir) || joinedPath.includes(`/${angularDir}/`)
  );
}

/**
 * 檢查是否為 ng-alain 特定目錄
 */
function isNgAlainDirectory(dirPath: string, dirName: string): boolean {
  const joinedPath = path.join(dirPath, dirName);
  return NG_ALAIN_DIRECTORIES.some(alainDir => 
    joinedPath.endsWith(alainDir) || joinedPath.includes(`/${alainDir}/`)
  );
}

/**
 * 獲取目錄用途信息
 */
function getDirectoryPurpose(filePath: string): DirectoryPurpose | undefined {
  const normalizedPath = filePath.replace(/\\/g, '/');
  return DIRECTORY_PURPOSE_MAP.find(item => 
    normalizedPath.endsWith(item.path) || normalizedPath.includes(`/${item.path}/`) || normalizedPath.includes(`/${item.path}`)
  );
}

/**
 * 初始化統計數據
 */
function createEmptyStats(): ProjectStatistics {
  return {
    totalFiles: 0,
    totalDirectories: 0,
    totalSize: 0,
    filesByType: {},
    filesByAngularType: {},
    directoryDepth: 0
  };
}

/**
 * 更新統計數據
 */
function updateStats(stats: ProjectStatistics, filePath: string, fileName: string, isDirectory: boolean): void {
  if (isDirectory) {
    stats.totalDirectories++;
  } else {
    stats.totalFiles++;
    
    // 統計文件類型
    const ext = path.extname(fileName).toLowerCase();
    stats.filesByType[ext] = (stats.filesByType[ext] || 0) + 1;
    
    // 統計 Angular 文件類型
    const angularType = getAngularFileType(fileName);
    if (angularType !== '檔案') {
      stats.filesByAngularType[angularType] = (stats.filesByAngularType[angularType] || 0) + 1;
    }
    
    // 累計文件大小
    try {
      const fullPath = path.join(filePath, fileName);
      const fileStats = fs.statSync(fullPath);
      stats.totalSize += fileStats.size;
    } catch {
      // 忽略無法讀取的文件
    }
  }
}

/**
 * 獲取 Angular 文件類型（簡化版）
 */
function getAngularFileType(fileName: string): string {
  if (fileName.includes('.component.')) return 'Angular 組件';
  if (fileName.includes('.service.')) return 'Angular 服務';
  if (fileName.includes('.module.')) return 'Angular 模組';
  if (fileName.includes('.routing.')) return 'Angular 路由';
  if (fileName.includes('.guard.')) return 'Angular 守衛';
  if (fileName.includes('.pipe.')) return 'Angular 管道';
  if (fileName.includes('.directive.')) return 'Angular 指令';
  return '檔案';
}

/**
 * 獲取文件類型說明 (針對 Angular/TypeScript 文件)
 */
function getFileTypeDescription(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  
  const typeDescriptions: Record<string, string> = {
    '.ts': 'TypeScript',
    '.component.ts': 'Angular 組件',
    '.service.ts': 'Angular 服務',
    '.module.ts': 'Angular 模組',
    '.routing.ts': 'Angular 路由',
    '.guard.ts': 'Angular 守衛',
    '.pipe.ts': 'Angular 管道',
    '.directive.ts': 'Angular 指令',
    '.html': 'HTML 模板',
    '.less': 'Less 樣式',
    '.scss': 'SCSS 樣式',
    '.css': 'CSS 樣式',
    '.json': 'JSON 配置',
    '.md': 'Markdown 文檔',
    '.yml': 'YAML 配置',
    '.yaml': 'YAML 配置',
    '.js': 'JavaScript',
    '.mjs': 'ES 模組',
    '.lock': '依賴鎖定',
    '.map': 'Source Map',
    '.ico': '圖示檔案'
  };
  
  // 檢查特定 Angular 文件命名模式
  if (fileName.includes('.component.')) return 'Angular 組件';
  if (fileName.includes('.service.')) return 'Angular 服務';
  if (fileName.includes('.module.')) return 'Angular 模組';
  if (fileName.includes('.routing.')) return 'Angular 路由';
  if (fileName.includes('.guard.')) return 'Angular 守衛';
  if (fileName.includes('.pipe.')) return 'Angular 管道';
  if (fileName.includes('.directive.')) return 'Angular 指令';
  
  return typeDescriptions[ext] || '檔案';
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * 格式化修改時間
 */
function formatModTime(stats: fs.Stats): string {
  const now = new Date();
  const modTime = new Date(stats.mtime);
  const diffMs = now.getTime() - modTime.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}週前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}個月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

/**
 * 生成樹狀結構 - Angular/ng-alain 專用版本（支持統計收集）
 */
function generateTree(
  dirPath: string, 
  prefix: string = '', 
  isLast: boolean = true, 
  depth: number = 0, 
  maxDepth: number = 10,  // 增加深度限制以顯示完整結構
  stats?: ProjectStatistics  // 可選的統計數據收集器
): string {
  if (depth > maxDepth) {
    return prefix + (isLast ? '└── ' : '├── ') + '...(更多內容)\n';
  }
  
  // 更新最大深度
  if (stats && depth > stats.directoryDepth) {
    stats.directoryDepth = depth;
  }

  let result = '';
  let items: fs.Dirent[] = [];
  
  try {
    items = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter((item: fs.Dirent) => !shouldExclude(path.join(dirPath, item.name), item.name));
  } catch (error) {
    console.warn(`⚠️  無法讀取目錄 ${dirPath}:`, error);
    return result;
  }

  items = items.sort((a: fs.Dirent, b: fs.Dirent) => {
      // Angular 重要目錄優先
      const aIsAngular = isAngularDirectory(dirPath, a.name);
      const bIsAngular = isAngularDirectory(dirPath, b.name);
      if (aIsAngular && !bIsAngular) return -1;
      if (!aIsAngular && bIsAngular) return 1;
      
      // ng-alain 目錄其次
      const aIsNgAlain = isNgAlainDirectory(dirPath, a.name);
      const bIsNgAlain = isNgAlainDirectory(dirPath, b.name);
      if (aIsNgAlain && !bIsNgAlain) return -1;
      if (!aIsNgAlain && bIsNgAlain) return 1;
      
      // 目錄優先，然後按名稱排序
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  items.forEach((item: fs.Dirent, index: number) => {
    const isLastItem = index === items.length - 1;
    const currentPrefix = isLast ? '└── ' : '├── ';
    const nextPrefix = isLast ? '    ' : '│   ';
    
    const fullPath = path.join(dirPath, item.name);

    // 更新統計數據
    if (stats) {
      updateStats(stats, dirPath, item.name, item.isDirectory());
    }

    // 添加目錄/文件標識符和標籤
    let displayName = item.name;
    const tags: string[] = [];
    
    // 檢查是否有用途說明
    const purpose = getDirectoryPurpose(fullPath);
    if (purpose) {
      tags.push(...purpose.tags);
    }
    
    if (isAngularDirectory(dirPath, item.name)) {
      tags.push('Angular');
    } else if (isNgAlainDirectory(dirPath, item.name)) {
      tags.push('ng-alain');
    }
    
    // 添加標籤到顯示名稱
    if (tags.length > 0) {
      displayName += ` [${tags.join(', ')}]`;
    }

    result += `${prefix}${currentPrefix}${displayName}`;

    if (item.isDirectory()) {
      result += '/\n';
      const subPath = path.join(dirPath, item.name);
      result += generateTree(subPath, prefix + nextPrefix, isLastItem, depth + 1, maxDepth, stats);
    } else {
      // 添加文件詳細信息
      try {
        const fileStats = fs.statSync(fullPath);
        const size = formatFileSize(fileStats.size);
        const modTime = formatModTime(fileStats);
        const fileType = getFileTypeDescription(item.name);
        result += ` (${size}, ${modTime}, ${fileType})\n`;
      } catch {
        const fileType = getFileTypeDescription(item.name);
        result += ` (${fileType})\n`;
      }
    }
  });

  return result;
}

/**
 * 生成完整的項目結構分析報告 - ng-alain 專用版本（AI Agent 友好）
 */
function generateProjectStructure(): void {
  const rootPath = process.cwd();
  
  // 確保輸出目錄存在
  const outputDir = path.join(rootPath, 'memory-bank');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`🔍 開始生成專案結構樹 (根目錄: ${rootPath})...`);
  
  // 初始化統計數據收集器
  const stats = createEmptyStats();
  const tree = generateTree(rootPath, '', true, 0, 10, stats);
  
  if (!tree || tree.trim().length === 0) {
    console.warn('⚠️  警告: 生成的樹結構為空！');
    console.log('📋 根目錄內容:', fs.readdirSync(rootPath).slice(0, 10).join(', '));
  } else {
    console.log(`✅ 樹結構生成成功 (${tree.split('\n').length} 行)`);
    console.log(`📊 統計: ${stats.totalFiles} 文件, ${stats.totalDirectories} 目錄, ${formatFileSize(stats.totalSize)}`);
  }
  
  const timestamp = new Date().toISOString().split('T')[0];
  const timestampFull = new Date().toISOString();
  const outputPath = path.join(outputDir, `ng-alain-structure.md`);

  // 讀取 package.json 獲取項目信息
  interface ProjectInfo {
    name?: string;
    version?: string;
    description?: string;
    angularVersion?: string;
    ngAlainVersion?: string;
  }
  
  let projectInfo: ProjectInfo = {};
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
    projectInfo = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      angularVersion: packageJson.dependencies?.['@angular/core'] || 'Unknown',
      ngAlainVersion: packageJson.dependencies?.['@delon/abc'] || packageJson.devDependencies?.['ng-alain'] || 'Unknown'
    };
  } catch (error) {
    console.warn('⚠️  無法讀取 package.json:', error);
    projectInfo = {
      name: 'ng-alain',
      version: '20.0.2',
      description: 'ng-zorro-antd admin panel front-end framework',
      angularVersion: '20+',
      ngAlainVersion: '20.0.2'
    };
  }

  // 生成統計摘要
  const fileTypeStats = Object.entries(stats.filesByType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ext, count]) => `  ${ext || '(無副檔名)'}: ${count}`)
    .join('\n');
    
  const angularTypeStats = Object.entries(stats.filesByAngularType)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => `  ${type}: ${count}`)
    .join('\n');
  
  // 生成快速導航索引
  const criticalPaths = DIRECTORY_PURPOSE_MAP
    .filter(item => item.importance === 'critical' || item.importance === 'high')
    .map(item => `- **[${item.tags.join(', ')}]** \`${item.path}\` - ${item.purpose}`)
    .join('\n');
  
  // 生成目錄用途說明
  const directoryPurposes = DIRECTORY_PURPOSE_MAP
    .map(item => {
      const importanceIcon = {
        'critical': '🔴',
        'high': '🟠',
        'medium': '🟡',
        'low': '⚪'
      }[item.importance];
      return `### ${importanceIcon} \`${item.path}\`\n**標籤**: ${item.tags.map(t => `\`${t}\``).join(', ')}  \n**用途**: ${item.purpose}\n`;
    })
    .join('\n');

  const content = `---
# AI Agent 元數據 (YAML Frontmatter)
type: ng-alain-project-structure
format_version: "3.0"
generated_at: "${timestampFull}"
generated_by: "ng-alain-structure-generator"
ai_friendly: true

# 專案基本信息
project:
  name: "${projectInfo.name || 'ng-alain'}"
  version: "${projectInfo.version || '20.0.2'}"
  description: "${projectInfo.description || 'ng-zorro-antd admin panel front-end framework'}"
  framework:
    - "Angular ${projectInfo.angularVersion || '20.3.0'}"
    - "ng-alain ${projectInfo.ngAlainVersion || '20.0.2'}"
    - "ng-zorro-antd 20.3.1"

# 統計摘要 (快速理解專案規模)
statistics:
  total_files: ${stats.totalFiles}
  total_directories: ${stats.totalDirectories}
  total_size_bytes: ${stats.totalSize}
  total_size_human: "${formatFileSize(stats.totalSize)}"
  directory_depth: ${stats.directoryDepth}
  
  # Angular 文件類型統計
  angular_types:
${angularTypeStats.split('\n').map(line => '    ' + line.replace(/^\s*/, '')).join('\n')}
  
  # 文件副檔名統計 (Top 10)
  file_extensions:
${fileTypeStats.split('\n').map(line => '    ' + line.replace(/^\s*/, '')).join('\n')}

# 關鍵路徑標記 (AI 快速定位)
key_paths:
  entry_point: "src/main.ts"
  app_root: "src/app"
  business_routes: "src/app/routes"
  core_services: "src/app/core"
  shared_components: "src/app/shared"
  layouts: "src/app/layout"
  mock_data: "_mock"
  config_files:
    - "angular.json"
    - "package.json"
    - "tsconfig.json"
    - "ng-alain.json"

# 專案標籤 (語義化分類)
tags:
  - "Angular 20"
  - "ng-alain"
  - "ng-zorro-antd"
  - "TypeScript"
  - "Admin Panel"
  - "Enterprise"
  - "@delon"
---

# 📁 ng-alain 專案結構分析報告

> **🤖 AI Agent 友好格式**  
> 此文件包含結構化元數據 (YAML Frontmatter)、統計摘要、快速導航索引  
> 適合 AI Agent 快速理解專案架構和關鍵路徑

---

## 📋 專案概覽

- **專案名稱**: ${projectInfo.name || 'ng-alain'}
- **專案版本**: ${projectInfo.version || '20.0.2'}
- **專案描述**: ${projectInfo.description || 'ng-zorro-antd admin panel front-end framework'}
- **Angular 版本**: ${projectInfo.angularVersion || '20.3.0'}
- **ng-alain 版本**: ${projectInfo.ngAlainVersion || '20.0.2'}
- **Framework**: ng-alain + ng-zorro-antd + @delon/*

---

## 📊 統計摘要 (AI 快速理解)

### 專案規模
- **文件總數**: ${stats.totalFiles}
- **目錄總數**: ${stats.totalDirectories}
- **專案大小**: ${formatFileSize(stats.totalSize)}
- **目錄深度**: ${stats.directoryDepth} 層

### Angular 文件類型分布
\`\`\`
${angularTypeStats}
\`\`\`

### 文件副檔名統計 (Top 10)
\`\`\`
${fileTypeStats}
\`\`\`

---

## 🧭 快速導航索引 (AI 關鍵路徑定位)

${criticalPaths}

---

## 🏗️ 目錄用途說明 (語義化信息)

${directoryPurposes}

---

## 📂 詳細目錄結構 (完整樹狀圖)

\`\`\`
${tree}
\`\`\`

---

## 🎯 Angular 20 + ng-alain 最佳實踐

### 1. 專案結構規範
- ✅ 遵循 ng-alain 目錄命名規範
- ✅ 使用 @delon/* 模組進行功能開發
- ✅ 合理組織 routes 模組化結構

### 2. 代碼組織原則
- ✅ 單一職責原則 (SRP)
- ✅ 依賴注入 (DI) 合理使用
- ✅ 組件重用與模組化設計

### 3. ng-alain 開發規範
- ✅ 使用 ng-zorro-antd 組件庫
- ✅ 遵循 Ant Design 設計規範
- ✅ 充分利用 @delon/* 生態

---

## 🔄 自動化腳本使用

### 手動生成結構報告
\`\`\`bash
npm run structure:generate
\`\`\`

### Git Hook 自動更新
此文件可配置在 Git pre-commit hook 中自動更新，確保專案結構文檔始終保持最新狀態。

### 腳本特色功能 (v3.0 AI 友好版)
- 🤖 **AI Agent 友好**: YAML frontmatter、結構化元數據
- 📊 **統計摘要**: 快速理解專案規模和文件分布
- 🧭 **快速導航**: 關鍵路徑快速定位
- 🏷️ **語義化標籤**: 目錄用途和功能說明
- 🔍 **完整樹狀圖**: 詳細的目錄結構展示

---

*Generated by ng-alain Structure Generator v3.0 (AI-Friendly Edition)*  
*Generated at: ${timestamp}*
`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✅ ng-alain 專案結構驗證報告已完成: ${outputPath}`);
  console.log(`📁 輸出目錄: ${outputDir}`);
  console.log(`🔍 Angular 版本: 20+`);
  console.log(`🎯 ng-alain 版本: 20.0.2`);
}

// 如果直接執行此腳本
if (require.main === module) {
  try {
    generateProjectStructure();
  } catch (error) {
    console.error('❌ 生成 ng-alain 專案結構文檔時發生錯誤:', (error as Error).message);
    process.exit(1);
  }
}

// 導出關鍵函數供其他模組使用
export { generateProjectStructure, generateTree, getFileTypeDescription };