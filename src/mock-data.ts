import { FileItem } from "./types";

export const MOCK_FILE_SYSTEM: FileItem[] = [
  { 
    name: 'Home', type: 'FOLDER', dateModified: '07:10 AM', size: '--', icon: 'folder', 
    children: [
      { name: 'Dashboard', type: 'FOLDER', dateModified: '07:10 AM', size: '--', icon: 'folder', children: [] },
      { name: 'Projects', type: 'FOLDER', dateModified: 'Yesterday', size: '--', icon: 'folder', children: [] },
      { name: 'README.md', type: 'TYPESCRIPT FILE', dateModified: 'Yesterday', size: '1.2 KB', icon: 'typescript' },
    ]
  },
  {
    name: 'Recent', type: 'FOLDER', dateModified: '07:14 AM', size: '--', icon: 'folder',
    children: [
      { name: 'App.tsx', type: 'TYPESCRIPT FILE', dateModified: '07:14 AM', size: '2.4 KB', icon: 'typescript' },
      { name: 'logo.svg', type: 'IMAGE', dateModified: 'Yesterday', size: '15.8 KB', icon: 'image' },
      { name: 'invoice-2024.pdf', type: 'CSS FILE', dateModified: 'Yesterday', size: '128 KB', icon: 'css' },
    ]
  },
  {
    name: 'Desktop', type: 'FOLDER', dateModified: '1/12/2026', size: '--', icon: 'folder',
    children: [
      { name: 'Screenshots', type: 'FOLDER', dateModified: '1/12/2026', size: '--', icon: 'folder', children: [
        { name: 'shot-01.png', type: 'IMAGE', dateModified: '1/12/2026', size: '1.1 MB', icon: 'image' }
      ] },
      { name: 'Work', type: 'FOLDER', dateModified: '1/10/2026', size: '--', icon: 'folder', children: [] },
      { name: 'Games', type: 'FOLDER', dateModified: '1/1/2026', size: '--', icon: 'folder', children: [] },
      { name: 'setup.exe', type: 'CSS FILE', dateModified: '12/25/2025', size: '2.2 MB', icon: 'css' },
    ]
  },
  {
    name: 'Documents', type: 'FOLDER', dateModified: '1/15/2026', size: '--', icon: 'folder',
    children: [
      { 
        name: 'ComfyUI', type: 'FOLDER', dateModified: '1/12/2026', size: '--', icon: 'folder', 
        children: [
            { name: 'main.js', type: 'TYPESCRIPT FILE', dateModified: '1/12/2026', size: '15 KB', icon: 'typescript' }
        ] 
      },
      { name: 'EasyTune', type: 'FOLDER', dateModified: '1/10/2026', size: '--', icon: 'folder', children: [] },
      { 
        name: 'File explorer', type: 'FOLDER', dateModified: '07:14 AM', size: '--', icon: 'folder',
        children: [
            { name: 'app.component.ts', type: 'TYPESCRIPT FILE', dateModified: '07:14 AM', size: '3.1 KB', icon: 'typescript'}
        ]
      },
      { name: 'App.tsx', type: 'TYPESCRIPT FILE', dateModified: '1/15/2026', size: '2.4 KB', icon: 'typescript' },
      { name: 'index.css', type: 'CSS FILE', dateModified: '1/14/2026', size: '1.1 KB', icon: 'css' },
    ]
  },
  {
    name: 'Downloads', type: 'FOLDER', dateModified: '07:30 AM', size: '--', icon: 'folder',
    children: [
      { name: 'angular_logo.png', type: 'IMAGE', dateModified: '07:30 AM', size: '45 KB', icon: 'image' },
      { name: 'tailwind_docs.pdf', type: 'CSS FILE', dateModified: 'Yesterday', size: '1.8 MB', icon: 'css' },
      { name: 'archive.zip', type: 'ZIP', dateModified: '1/12/2026', size: '24.5 MB', icon: 'zip' },
      { name: 'font_awesome.css', type: 'CSS FILE', dateModified: '1/11/2026', size: '210 KB', icon: 'css' },
    ]
  },
  {
    name: 'Pictures', type: 'FOLDER', dateModified: '1/1/2026', size: '--', icon: 'folder',
    children: [
      { name: 'Vacation', type: 'FOLDER', dateModified: '1/1/2026', size: '--', icon: 'folder', children: [] },
      { name: 'Family', type: 'FOLDER', dateModified: '12/20/2025', size: '--', icon: 'folder', children: [] },
      { name: 'sunset.jpg', type: 'IMAGE', dateModified: '11/30/2025', size: '3.1 MB', icon: 'image' },
      { name: 'profile_pic.png', type: 'IMAGE', dateModified: '10/15/2025', size: '850 KB', icon: 'image' },
    ]
  }
];

export const MOCK_CLOUD_FILES: Record<string, FileItem[]> = {
  'Google Drive': [
    { name: 'Project Docs', type: 'FOLDER', dateModified: '03/15/2026', size: '--', icon: 'folder', children: [], syncStatus: 'synced' },
    { name: 'Meeting Notes.gdoc', type: 'CSS FILE', dateModified: '03/14/2026', size: '12 KB', icon: 'css', syncStatus: 'synced' },
    { name: 'Design Assets.zip', type: 'ZIP', dateModified: '03/10/2026', size: '128 MB', icon: 'zip', syncStatus: 'syncing' },
  ],
  'OneDrive': [
    { name: 'Work', type: 'FOLDER', dateModified: '03/15/2026', size: '--', icon: 'folder', children: [], syncStatus: 'synced' },
    { name: 'Personal', type: 'FOLDER', dateModified: '03/14/2026', size: '--', icon: 'folder', children: [], syncStatus: 'synced' },
    { name: 'Report.docx', type: 'CSS FILE', dateModified: '03/10/2026', size: '2.3 MB', icon: 'css', syncStatus: 'synced' },
    { name: 'presentation-draft.pptx', type: 'IMAGE', dateModified: '03/11/2026', size: '4.1 MB', icon: 'image', syncStatus: 'error' },
  ],
  'Mega': [
    { name: 'Backups', type: 'FOLDER', dateModified: '02/20/2026', size: '--', icon: 'folder', children: [], syncStatus: 'syncing' },
    { name: 'secret-file.txt', type: 'TYPESCRIPT FILE', dateModified: '02/18/2026', size: '5 KB', icon: 'typescript', syncStatus: 'synced' },
  ],
  'Terabox': [
     { name: 'Media', type: 'FOLDER', dateModified: '01/05/2026', size: '--', icon: 'folder', children: [], syncStatus: 'synced' },
  ]
};

export const MOCK_VAULT_FILES: FileItem[] = [
    { name: 'private-keys.txt', type: 'TYPESCRIPT FILE', dateModified: '01/01/2024', size: '2 KB', icon: 'typescript' },
    { name: 'Financials', type: 'FOLDER', dateModified: '02/03/2025', size: '--', icon: 'folder', children: [
        { name: '2024-taxes.pdf', type: 'CSS FILE', dateModified: '02/03/2025', size: '1.5 MB', icon: 'css' }
    ]},
    { name: 'journal.txt', type: 'TYPESCRIPT FILE', dateModified: '12/25/2025', size: '256 KB', icon: 'typescript' },
];
