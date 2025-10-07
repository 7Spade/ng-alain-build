/**
 * 專案功能 Mock 資料
 *
 * @description 用於本地開發和測試的模擬數據
 */

import { MockRequest } from '@delon/mock';

import type { Project, ProjectFile, ProjectMember, ProjectActivity } from '../src/app/features/projects/models';

// Mock 專案列表
const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'ng-alain 管理系統',
    description: '基於 Angular 20 和 ng-zorro-antd 的企業級管理系統',
    ownerId: 'user-1',
    ownerType: 'personal',
    organizationId: null,
    fileCount: 156,
    storageUsed: 45678900, // ~45 MB
    memberCount: 1,
    status: 'active',
    visibility: 'private',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-07'),
    lastActivityAt: new Date('2025-10-07'),
    tags: ['angular', 'admin', 'enterprise'],
    category: 'web-app',
    avatar: './assets/logo.svg',
    color: '#1890ff'
  },
  {
    id: 'proj-2',
    name: 'API 文檔系統',
    description: '自動生成 RESTful API 文檔的工具',
    ownerId: 'user-1',
    ownerType: 'personal',
    organizationId: null,
    fileCount: 89,
    storageUsed: 23456789, // ~23 MB
    memberCount: 1,
    status: 'active',
    visibility: 'public',
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2025-10-05'),
    lastActivityAt: new Date('2025-10-05'),
    tags: ['api', 'documentation', 'tools'],
    category: 'tools',
    avatar: './assets/tmp/img/1.png',
    color: '#52c41a'
  },
  {
    id: 'proj-3',
    name: '數據分析平台',
    description: '企業級數據分析和可視化平台',
    ownerId: 'org-1',
    ownerType: 'organization',
    organizationId: 'org-1',
    fileCount: 234,
    storageUsed: 123456789, // ~123 MB
    memberCount: 5,
    status: 'active',
    visibility: 'internal',
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-10-06'),
    lastActivityAt: new Date('2025-10-06'),
    tags: ['data', 'analytics', 'visualization'],
    category: 'analytics',
    avatar: './assets/tmp/img/2.png',
    color: '#722ed1'
  }
];

// Mock 專案檔案
const mockFiles: Record<string, ProjectFile[]> = {
  'proj-1': [
    {
      id: 'file-1',
      projectId: 'proj-1',
      name: 'README.md',
      path: '/',
      size: 1024,
      mimeType: 'text/markdown',
      uploadedBy: 'user-1',
      uploadedByName: 'Admin',
      uploadedAt: new Date('2025-10-01'),
      downloadUrl: '/api/files/file-1/download',
      downloadCount: 5,
      status: 'done',
      isImage: false,
      isFolder: false
    },
    {
      id: 'file-2',
      projectId: 'proj-1',
      name: 'logo.png',
      path: '/assets',
      size: 45678,
      mimeType: 'image/png',
      uploadedBy: 'user-1',
      uploadedByName: 'Admin',
      uploadedAt: new Date('2025-10-02'),
      downloadUrl: '/api/files/file-2/download',
      downloadCount: 12,
      status: 'done',
      thumbnailUrl: './assets/logo.svg',
      isImage: true,
      isFolder: false
    },
    {
      id: 'folder-1',
      projectId: 'proj-1',
      name: 'documents',
      path: '/',
      size: 0,
      mimeType: 'folder',
      uploadedBy: 'user-1',
      uploadedByName: 'Admin',
      uploadedAt: new Date('2025-10-01'),
      downloadCount: 0,
      status: 'done',
      isImage: false,
      isFolder: true
    }
  ]
};

// Mock 專案成員
const mockMembers: Record<string, ProjectMember[]> = {
  'proj-1': [
    {
      id: 'member-1',
      projectId: 'proj-1',
      userId: 'user-1',
      userName: 'Admin',
      userAvatar: './assets/tmp/img/avatar.svg',
      userEmail: 'admin@example.com',
      role: 'owner',
      joinedAt: new Date('2025-10-01')
    }
  ],
  'proj-3': [
    {
      id: 'member-3-1',
      projectId: 'proj-3',
      userId: 'user-1',
      userName: 'Admin',
      userAvatar: './assets/tmp/img/avatar.svg',
      userEmail: 'admin@example.com',
      role: 'owner',
      joinedAt: new Date('2025-08-01')
    },
    {
      id: 'member-3-2',
      projectId: 'proj-3',
      userId: 'user-2',
      userName: 'Developer A',
      userAvatar: './assets/tmp/img/1.png',
      userEmail: 'dev-a@example.com',
      role: 'admin',
      joinedAt: new Date('2025-08-05'),
      invitedBy: 'user-1',
      invitedByName: 'Admin'
    }
  ]
};

// Mock 專案活動
const mockActivities: Record<string, ProjectActivity[]> = {
  'proj-1': [
    {
      id: 'activity-1',
      projectId: 'proj-1',
      userId: 'user-1',
      userName: 'Admin',
      userAvatar: './assets/tmp/img/avatar.svg',
      action: 'create',
      targetType: 'project',
      targetId: 'proj-1',
      targetName: 'ng-alain 管理系統',
      description: '創建專案',
      createdAt: new Date('2025-10-01')
    },
    {
      id: 'activity-2',
      projectId: 'proj-1',
      userId: 'user-1',
      userName: 'Admin',
      userAvatar: './assets/tmp/img/avatar.svg',
      action: 'upload',
      targetType: 'file',
      targetId: 'file-1',
      targetName: 'README.md',
      description: '上傳檔案 README.md',
      createdAt: new Date('2025-10-01')
    },
    {
      id: 'activity-3',
      projectId: 'proj-1',
      userId: 'user-1',
      userName: 'Admin',
      userAvatar: './assets/tmp/img/avatar.svg',
      action: 'upload',
      targetType: 'file',
      targetId: 'file-2',
      targetName: 'logo.png',
      description: '上傳檔案 logo.png',
      createdAt: new Date('2025-10-02')
    }
  ]
};

export const PROJECT_API = {
  // 獲取個人專案列表
  'GET /api/users/me/projects': (_req: MockRequest) => {
    const personalProjects = mockProjects.filter(p => p.ownerType === 'personal');
    return {
      list: personalProjects,
      total: personalProjects.length
    };
  },

  // 獲取組織專案列表
  'GET /api/organizations/:orgId/projects': (req: MockRequest) => {
    const orgId = req.params.orgId;
    const orgProjects = mockProjects.filter(p => p.organizationId === orgId);
    return {
      list: orgProjects,
      total: orgProjects.length
    };
  },

  // 獲取專案詳情
  'GET /api/projects/:id': (req: MockRequest) => {
    const project = mockProjects.find(p => p.id === req.params.id);
    return project || { error: 'Project not found', status: 404 };
  },

  // 創建專案（個人）
  'POST /api/users/me/projects': (req: MockRequest) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ...req.body,
      ownerId: 'user-1',
      ownerType: 'personal',
      organizationId: null,
      fileCount: 0,
      storageUsed: 0,
      memberCount: 1,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityAt: new Date()
    };
    mockProjects.push(newProject);
    return newProject;
  },

  // 創建專案（組織）
  'POST /api/organizations/:orgId/projects': (req: MockRequest) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ...req.body,
      ownerId: 'user-1',
      ownerType: 'organization',
      organizationId: req.params.orgId,
      fileCount: 0,
      storageUsed: 0,
      memberCount: 1,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityAt: new Date()
    };
    mockProjects.push(newProject);
    return newProject;
  },

  // 更新專案
  'PUT /api/projects/:id': (req: MockRequest) => {
    const project = mockProjects.find(p => p.id === req.params.id);
    if (project) {
      Object.assign(project, req.body, { updatedAt: new Date() });
      return project;
    }
    return { error: 'Project not found', status: 404 };
  },

  // 刪除專案
  'DELETE /api/projects/:id': (req: MockRequest) => {
    const index = mockProjects.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
      mockProjects.splice(index, 1);
      return { success: true };
    }
    return { error: 'Project not found', status: 404 };
  },

  // 歸檔專案
  'POST /api/projects/:id/archive': (req: MockRequest) => {
    const project = mockProjects.find(p => p.id === req.params.id);
    if (project) {
      project.status = 'archived';
      project.updatedAt = new Date();
      return project;
    }
    return { error: 'Project not found', status: 404 };
  },

  // 獲取專案統計
  'GET /api/projects/:id/stats': (req: MockRequest) => {
    const project = mockProjects.find(p => p.id === req.params.id);
    if (project) {
      return {
        fileCount: project.fileCount,
        storageUsed: project.storageUsed,
        memberCount: project.memberCount,
        activityCount: mockActivities[project.id]?.length || 0
      };
    }
    return { error: 'Project not found', status: 404 };
  },

  // 獲取專案檔案列表
  'GET /api/projects/:id/files': (req: MockRequest) => {
    const projectId = req.params.id;
    const files = mockFiles[projectId] || [];
    const path = req.queryString.path || '/';
    const filteredFiles = files.filter(f => f.path === path);

    return {
      files: filteredFiles,
      total: filteredFiles.length,
      currentPath: path
    };
  },

  // 上傳檔案
  'POST /api/projects/:id/files': (req: MockRequest) => {
    const newFile: ProjectFile = {
      id: `file-${Date.now()}`,
      projectId: req.params.id,
      name: req.body.name || `file-${Date.now()}`,
      path: req.body.path || '/',
      size: Math.floor(Math.random() * 1000000),
      mimeType: 'application/octet-stream',
      uploadedBy: 'user-1',
      uploadedByName: 'Admin',
      uploadedAt: new Date(),
      downloadCount: 0,
      status: 'done',
      isImage: false,
      isFolder: false
    };

    if (!mockFiles[req.params.id]) {
      mockFiles[req.params.id] = [];
    }
    mockFiles[req.params.id].push(newFile);

    return newFile;
  },

  // 刪除檔案
  'DELETE /api/projects/:projectId/files/:fileId': (req: MockRequest) => {
    const { projectId, fileId } = req.params;
    if (mockFiles[projectId]) {
      const index = mockFiles[projectId].findIndex(f => f.id === fileId);
      if (index !== -1) {
        mockFiles[projectId].splice(index, 1);
        return { success: true };
      }
    }
    return { error: 'File not found', status: 404 };
  },

  // 獲取專案成員列表
  'GET /api/projects/:id/members': (req: MockRequest) => {
    const projectId = req.params.id;
    const members = mockMembers[projectId] || [];

    return {
      members,
      total: members.length
    };
  },

  // 邀請成員
  'POST /api/projects/:id/members': (req: MockRequest) => {
    const newMember: ProjectMember = {
      id: `member-${Date.now()}`,
      projectId: req.params.id,
      userId: req.body.userId,
      userName: `User ${req.body.userId}`,
      userAvatar: './assets/tmp/img/avatar.svg',
      userEmail: `user${req.body.userId}@example.com`,
      role: req.body.role || 'member',
      joinedAt: new Date(),
      invitedBy: 'user-1',
      invitedByName: 'Admin'
    };

    if (!mockMembers[req.params.id]) {
      mockMembers[req.params.id] = [];
    }
    mockMembers[req.params.id].push(newMember);

    return newMember;
  },

  // 移除成員
  'DELETE /api/projects/:projectId/members/:memberId': (req: MockRequest) => {
    const { projectId, memberId } = req.params;
    if (mockMembers[projectId]) {
      const index = mockMembers[projectId].findIndex(m => m.id === memberId);
      if (index !== -1) {
        mockMembers[projectId].splice(index, 1);
        return { success: true };
      }
    }
    return { error: 'Member not found', status: 404 };
  },

  // 更新成員角色
  'PUT /api/projects/:projectId/members/:memberId': (req: MockRequest) => {
    const { projectId, memberId } = req.params;
    if (mockMembers[projectId]) {
      const member = mockMembers[projectId].find(m => m.id === memberId);
      if (member) {
        member.role = req.body.role;
        return member;
      }
    }
    return { error: 'Member not found', status: 404 };
  },

  // 獲取專案活動
  'GET /api/projects/:id/activities': (req: MockRequest) => {
    const projectId = req.params.id;
    const activities = mockActivities[projectId] || [];

    return {
      activities,
      total: activities.length
    };
  }
};
