const FileSystem = {
    "/": {
        type: "folder",
        name: "Root",
        children: {
            "C:": {
                type: "folder",
                name: "C:",
                children: {
                    "home": {
                        type: "folder",
                        name: "home",
                        children: {
                            "Desktop": {
                                type: "folder",
                                name: "Desktop",
                                children: {
                                    "readme.txt": { type: "document", name: "readme.txt", size: 1234, modified: "2024-03-01T10:00:00" },
                                    "project-notes.pdf": { type: "pdf", name: "project-notes.pdf", size: 524288, modified: "2024-02-28T14:30:00" },
                                    "todo-list.txt": { type: "document", name: "todo-list.txt", size: 567, modified: "2024-03-10T09:15:00" }
                                }
                            },
                            "Documents": {
                                type: "folder",
                                name: "Documents",
                                children: {
                                    "Resume.docx": { type: "document", name: "Resume.docx", size: 45678, modified: "2024-01-15T11:00:00" },
                                    "Budget-2024.xlsx": { type: "spreadsheet", name: "Budget-2024.xlsx", size: 89012, modified: "2024-02-20T16:45:00" },
                                    "meeting-notes.txt": { type: "document", name: "meeting-notes.txt", size: 3456, modified: "2024-03-05T09:30:00" },
                                    "presentation.pdf": { type: "pdf", name: "presentation.pdf", size: 2097152, modified: "2024-02-14T13:20:00" },
                                    "report-final.docx": { type: "document", name: "report-final.docx", size: 156789, modified: "2024-03-08T17:00:00" }
                                }
                            },
                            "Downloads": {
                                type: "folder",
                                name: "Downloads",
                                children: {
                                    "archive-2024.zip": { type: "archive", name: "archive-2024.zip", size: 52428800, modified: "2024-03-01T12:00:00" },
                                    "installer-v3.exe": { type: "general", name: "installer-v3.exe", size: 104857600, modified: "2024-02-25T10:30:00" },
                                    "ebook-python.pdf": { type: "pdf", name: "ebook-python.pdf", size: 8388608, modified: "2024-01-30T08:45:00" },
                                    "video-tutorial.mp4": { type: "video", name: "video-tutorial.mp4", size: 314572800, modified: "2024-02-18T14:00:00" },
                                    "photo-backup.zip": { type: "archive", name: "photo-backup.zip", size: 209715200, modified: "2024-03-03T20:15:00" },
                                    "font-pack.zip": { type: "archive", name: "font-pack.zip", size: 15728640, modified: "2024-02-10T11:20:00" }
                                }
                            },
                            "Images": {
                                type: "folder",
                                name: "Images",
                                children: {
                                    "27613d0c2369695e6a0dfed9719b43442d666941.webp": {
                                        type: "image",
                                        name: "27613d0c2369695e6a0dfed9719b43442d666941.webp",
                                        size: 245780,
                                        modified: "2024-01-15T10:30:00",
                                        dimensions: { width: 1920, height: 1080 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "artem-lebedev-all.webp": {
                                        type: "image",
                                        name: "artem-lebedev-all.webp",
                                        size: 312456,
                                        modified: "2024-02-10T14:22:00",
                                        dimensions: { width: 2560, height: 1440 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "grant-ritchie-x1w_Q78xNEY-unsplash.webp": {
                                        type: "image",
                                        name: "grant-ritchie-x1w_Q78xNEY-unsplash.webp",
                                        size: 456789,
                                        modified: "2024-01-20T09:15:00",
                                        dimensions: { width: 4000, height: 6000 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "HD-wallpaper-artistic-digital-art-windows-11.webp": {
                                        type: "image",
                                        name: "HD-wallpaper-artistic-digital-art-windows-11.webp",
                                        size: 890123,
                                        modified: "2024-02-05T16:45:00",
                                        dimensions: { width: 3840, height: 2160 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "HD-wallpaper-windows-11-blue-background-abstract-3d-abstract.webp": {
                                        type: "image",
                                        name: "HD-wallpaper-windows-11-blue-background-abstract-3d-abstract.webp",
                                        size: 765432,
                                        modified: "2024-01-28T11:30:00",
                                        dimensions: { width: 3840, height: 2160 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "img2.wallspic.com-tecno_pova-tecno_camon_19_pro_mondrian-tecno-smartphone-tecno_camon_15_pro-720x1280.webp": {
                                        type: "image",
                                        name: "img2.wallspic.com-tecno_pova-tecno_camon_19_pro_mondrian-tecno-smartphone-tecno_camon_15_pro-720x1280.webp",
                                        size: 234567,
                                        modified: "2024-02-12T08:00:00",
                                        dimensions: { width: 720, height: 1280 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "jeremy-bishop-cEeEtjedNls-unsplash.webp": {
                                        type: "image",
                                        name: "jeremy-bishop-cEeEtjedNls-unsplash.webp",
                                        size: 567890,
                                        modified: "2024-01-18T13:20:00",
                                        dimensions: { width: 4000, height: 6000 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "jms-kFHz9Xh3PPU-unsplash.webp": {
                                        type: "image",
                                        name: "jms-kFHz9Xh3PPU-unsplash.webp",
                                        size: 678901,
                                        modified: "2024-02-08T17:10:00",
                                        dimensions: { width: 5472, height: 3648 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "Monthly renders - April 2016.webp": {
                                        type: "image",
                                        name: "Monthly renders - April 2016.webp",
                                        size: 1234567,
                                        modified: "2016-04-30T23:59:00",
                                        dimensions: { width: 1920, height: 1080 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "nottodayrender-0001.webp": {
                                        type: "image",
                                        name: "nottodayrender-0001.webp",
                                        size: 345678,
                                        modified: "2024-02-15T20:30:00",
                                        dimensions: { width: 2560, height: 1440 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    },
                                    "original-f838995e6a0bb16fbfbf6559abc0e152.webp": {
                                        type: "image",
                                        name: "original-f838995e6a0bb16fbfbf6559abc0e152.webp",
                                        size: 456123,
                                        modified: "2024-01-25T12:45:00",
                                        dimensions: { width: 1920, height: 1200 },
                                        lqip: "data:image/webp;base64,UklGRkoGAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                                    }
                                }
                            },
                            "Network": {
                                type: "folder",
                                name: "Network",
                                children: {}
                            },
                            "Sounds": {
                                type: "folder",
                                name: "Sounds",
                                children: {
                                    "background-music.mp3": { type: "audio", name: "background-music.mp3", size: 4194304, modified: "2024-01-20T09:00:00" },
                                    "notification.wav": { type: "audio", name: "notification.wav", size: 524288, modified: "2024-02-05T14:30:00" },
                                    "podcast-episode1.mp3": { type: "audio", name: "podcast-episode1.mp3", size: 31457280, modified: "2024-03-01T07:00:00" },
                                    "ambient-rain.ogg": { type: "audio", name: "ambient-rain.ogg", size: 10485760, modified: "2024-02-14T22:00:00" }
                                }
                            },
                            "Videos": {
                                type: "folder",
                                name: "Videos",
                                children: {
                                    "vacation-2023.mp4": { type: "video", name: "vacation-2023.mp4", size: 734003200, modified: "2023-08-15T18:30:00" },
                                    "screen-recording.webm": { type: "video", name: "screen-recording.webm", size: 52428800, modified: "2024-03-02T11:45:00" },
                                    "movie-night.mkv": { type: "video", name: "movie-night.mkv", size: 1572864000, modified: "2024-02-28T20:00:00" }
                                }
                            }
                        }
                    },
                    "Program Files": {
                        type: "folder",
                        name: "Program Files",
                        children: {
                            "App1": {
                                type: "folder",
                                name: "App1",
                                children: {
                                    "app1.exe": { type: "general", name: "app1.exe", size: 2097152, modified: "2024-01-10T12:00:00" },
                                    "config.json": { type: "code", name: "config.json", size: 1024, modified: "2024-01-10T12:00:00" }
                                }
                            },
                            "App2": {
                                type: "folder",
                                name: "App2",
                                children: {
                                    "app2.exe": { type: "general", name: "app2.exe", size: 5242880, modified: "2024-02-15T09:00:00" }
                                }
                            }
                        }
                    },
                    "Windows": {
                        type: "folder",
                        name: "Windows",
                        children: {
                            "System32": {
                                type: "folder",
                                name: "System32",
                                children: {
                                    "kernel32.dll": { type: "general", name: "kernel32.dll", size: 1048576, modified: "2024-01-01T00:00:00" },
                                    "user32.dll": { type: "general", name: "user32.dll", size: 819200, modified: "2024-01-01T00:00:00" }
                                }
                            }
                        }
                    }
                }
            },
            "D:": {
                type: "folder",
                name: "D:",
                children: {
                    "Games": {
                        type: "folder",
                        name: "Games",
                        children: {
                            "Game1": {
                                type: "folder",
                                name: "Game1",
                                children: {
                                    "game1.exe": { type: "general", name: "game1.exe", size: 52428800, modified: "2024-02-01T10:00:00" },
                                    "data.pak": { type: "archive", name: "data.pak", size: 1073741824, modified: "2024-02-01T10:00:00" }
                                }
                            },
                            "Game2": {
                                type: "folder",
                                name: "Game2",
                                children: {
                                    "launcher.exe": { type: "general", name: "launcher.exe", size: 10485760, modified: "2024-01-20T14:00:00" }
                                }
                            }
                        }
                    },
                    "Projects": {
                        type: "folder",
                        name: "Projects",
                        children: {
                            "webapp": {
                                type: "folder",
                                name: "webapp",
                                children: {
                                    "index.html": { type: "code", name: "index.html", size: 4096, modified: "2024-03-05T16:00:00" },
                                    "style.css": { type: "code", name: "style.css", size: 2048, modified: "2024-03-05T16:00:00" },
                                    "app.js": { type: "code", name: "app.js", size: 8192, modified: "2024-03-05T16:00:00" }
                                }
                            }
                        }
                    }
                }
            },
            "E:": {
                type: "folder",
                name: "E:",
                children: {
                    "Backup": {
                        type: "folder",
                        name: "Backup",
                        children: {
                            "backup-2024-01.tar.gz": { type: "archive", name: "backup-2024-01.tar.gz", size: 536870912, modified: "2024-02-01T00:00:00" },
                            "backup-2024-02.tar.gz": { type: "archive", name: "backup-2024-02.tar.gz", size: 536870912, modified: "2024-03-01T00:00:00" }
                        }
                    }
                }
            },
            "F:": {
                type: "folder",
                name: "F:",
                children: {
                    "Media": {
                        type: "folder",
                        name: "Media",
                        children: {
                            "photos": { type: "folder", name: "photos", children: {} },
                            "videos": { type: "folder", name: "videos", children: {} }
                        }
                    }
                }
            },
            "Google Drive": {
                type: "folder",
                name: "Google Drive",
                children: {
                    "Shared Documents": {
                        type: "folder",
                        name: "Shared Documents",
                        children: {
                            "team-roster.xlsx": { type: "spreadsheet", name: "team-roster.xlsx", size: 32768, modified: "2024-03-01T10:00:00" },
                            "project-plan.docx": { type: "document", name: "project-plan.docx", size: 65536, modified: "2024-02-28T14:00:00" }
                        }
                    },
                    "My Files": {
                        type: "folder",
                        name: "My Files",
                        children: {
                            "notes.txt": { type: "document", name: "notes.txt", size: 2048, modified: "2024-03-08T09:00:00" }
                        }
                    }
                }
            },
            "OneDrive": {
                type: "folder",
                name: "OneDrive",
                children: {
                    "Work": {
                        type: "folder",
                        name: "Work",
                        children: {
                            "invoice-march.pdf": { type: "pdf", name: "invoice-march.pdf", size: 131072, modified: "2024-03-01T08:00:00" },
                            "contracts": {
                                type: "folder",
                                name: "contracts",
                                children: {
                                    "service-agreement.pdf": { type: "pdf", name: "service-agreement.pdf", size: 262144, modified: "2024-01-15T11:00:00" }
                                }
                            }
                        }
                    }
                }
            },
            "Dropbox": {
                type: "folder",
                name: "Dropbox",
                children: {
                    "Photos": {
                        type: "folder",
                        name: "Photos",
                        children: {
                            "vacation": { type: "folder", name: "vacation", children: {} },
                            "family": { type: "folder", name: "family", children: {} }
                        }
                    },
                    "Documents": {
                        type: "folder",
                        name: "Documents",
                        children: {
                            "tax-return-2023.pdf": { type: "pdf", name: "tax-return-2023.pdf", size: 524288, modified: "2024-02-15T10:00:00" }
                        }
                    }
                }
            }
        }
    }
};

// ---------------- Tags & Colors enrichment ----------------
const TAGS_POOL = ['important','work','personal','archived','draft','shared','reference','todo','code','media','document'];
const COLOR_MAP = {
    'important': '#ef4444',
    'work': '#3b82f6',
    'personal': '#22c55e',
    'archived': '#6b7280',
    'draft': '#f59e0b',
    'shared': '#8b5cf6',
    'reference': '#06b6d4',
    'todo': '#f97316',
    'code': '#14b8a6',
    'media': '#a855f7',
    'document': '#eab308'
};

function enrichNode(node, path) {
    const tags = [];
    let color = null;

    const lowerPath = path.toLowerCase();
    const ext = getFileExtension(node.name);

    // Heuristic tagging based on location and type
    if (lowerPath.includes('home/desktop') || lowerPath.includes('home/documents') || lowerPath.includes('home/downloads')) {
        tags.push('personal');
    }
    if (lowerPath.includes('home/documents') || lowerPath.includes('program files') || lowerPath.includes('windows') || lowerPath.includes('projects')) {
        tags.push('work');
    }
    if (lowerPath.includes('downloads')) {
        tags.push('draft');
    }
    if (lowerPath.includes('images') || lowerPath.includes('sounds') || lowerPath.includes('videos') || lowerPath.includes('media')) {
        tags.push('media');
    }
    const codeExts = ['py','js','html','css','json','ts','java','cpp','c','h','sh'];
    if (codeExts.includes(ext)) {
        tags.push('code');
    }
    const docExts = ['pdf','doc','docx','txt','xlsx','xls','csv','ods','rtf','odt'];
    if (docExts.includes(ext)) {
        tags.push('document');
    }

    const importantFiles = ['readme.txt','resume.docx','tax-return-2023.pdf','service-agreement.pdf','project-plan.docx','team-roster.xlsx'];
    if (importantFiles.some(f => lowerPath.includes(f))) {
        tags.push('important');
    }

    if (lowerPath.includes('google drive') || lowerPath.includes('shared') || lowerPath.includes('dropbox') || lowerPath.includes('onedrive')) {
        tags.push('shared');
    }

    node.tags = [...new Set(tags)];

    // Assign color based on first matching tag
    for (const t of node.tags) {
        if (COLOR_MAP[t]) {
            node.color = COLOR_MAP[t];
            break;
        }
    }

    // Recurse
    if (node.children) {
        for (const [name, child] of Object.entries(node.children)) {
            const childPath = path === '/' ? `/${name}` : `${path}/${name}`;
            enrichNode(child, childPath);
        }
    }
}

// Enrich the entire file system
enrichNode(FileSystem['/'], '/');

const FileIcons = {
    folder: "mdi-folder",
    image: "mdi-image",
    video: "mdi-video",
    audio: "mdi-music",
    document: "mdi-file-document",
    pdf: "mdi-file-pdf-box",
    spreadsheet: "mdi-microsoft-excel",
    code: "mdi-code-braces",
    archive: "mdi-folder-zip",
    general: "mdi-file"
};

const ImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
const VideoExtensions = ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm'];
const AudioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];
const DocumentExtensions = ['doc', 'docx', 'txt', 'rtf', 'odt'];
const PdfExtensions = ['pdf'];
const SpreadsheetExtensions = ['xls', 'xlsx', 'csv', 'ods'];
const CodeExtensions = ['js', 'py', 'html', 'css', 'json', 'ts', 'java', 'cpp', 'c', 'h'];
const ArchiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];

function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function getFileType(filename) {
    const ext = getFileExtension(filename);
    if (ImageExtensions.includes(ext)) return 'image';
    if (VideoExtensions.includes(ext)) return 'video';
    if (AudioExtensions.includes(ext)) return 'audio';
    if (DocumentExtensions.includes(ext)) return 'document';
    if (PdfExtensions.includes(ext)) return 'pdf';
    if (SpreadsheetExtensions.includes(ext)) return 'spreadsheet';
    if (CodeExtensions.includes(ext)) return 'code';
    if (ArchiveExtensions.includes(ext)) return 'archive';
    return 'general';
}

function getFileIcon(fileType) {
    return FileIcons[fileType] || FileIcons.general;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getImagePath(filename) {
    return `back-end/Main/Images/${filename}`;
}

function resolvePath(path) {
    if (!path || path === '/') return FileSystem["/"];
    
    const parts = path.split('/').filter(p => p);
    let current = FileSystem["/"];
    
    for (const part of parts) {
        if (current.children && current.children[part]) {
            current = current.children[part];
        } else {
            return null;
        }
    }
    
    return current;
}

const SimulationAPI = {
    getMainDirectories() {
        // Return home directories (Desktop, Documents, Downloads, Images, Sounds, Videos, Network)
        // These are under /C:/home/
        const home = resolvePath('/C:/home');
        if (!home || !home.children) return [];
        
        const directories = [];
        for (const [name, node] of Object.entries(home.children)) {
            directories.push({
                name: name,
                type: node.type,
                icon: getFileIcon(node.type),
                path: `/C:/home/${name}`
            });
        }
        
        return directories;
    },
    
    getFolderContents(path, filters = {}) {
        const folder = resolvePath(path);
        
        if (!folder) {
            return { error: "Path not found", items: [] };
        }
        
        if (folder.type !== "folder") {
            return { error: "Not a folder", items: [] };
        }
        
        let items = [];
        
        for (const [name, node] of Object.entries(folder.children)) {
            const item = {
                name: name,
                type: node.type,
                icon: getFileIcon(node.type),
                path: path === '/' ? `/${name}` : `${path}/${name}`,
                size: node.size || 0,
                modified: node.modified || null,
                tags: node.tags || [],
                color: node.color || null
            };
            
            if (node.type === 'image' && node.dimensions) {
                item.w = node.dimensions.width;
                item.h = node.dimensions.height;
                item.url = getImagePath(name);
                item.lqip = node.lqip;
            }
            
            items.push(item);
        }
        
        // Apply filters
        if (filters.extension) {
            const ext = filters.extension.toLowerCase();
            items = items.filter(item => item.name.toLowerCase().endsWith(ext));
        }
        if (filters.tags && filters.tags.length > 0) {
            items = items.filter(item => (item.tags || []).some(tag => filters.tags.includes(tag)));
        }
        if (filters.colors && filters.colors.length > 0) {
            items = items.filter(item => {
                if (filters.colors.includes('none') && !item.color) return true;
                return filters.colors.includes(item.color);
            });
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            items = items.filter(item => item.name.toLowerCase().includes(q));
        }
        
        items.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
        
        return {
            path: path,
            name: folder.name,
            items: items,
            itemCount: items.length
        };
    },
    
    getFile(path) {
        const file = resolvePath(path);
        
        if (!file) {
            return { error: "File not found" };
        }
        
        const result = {
            name: file.name,
            type: file.type,
            icon: getFileIcon(file.type),
            path: path,
            size: file.size || 0,
            modified: file.modified || null,
            tags: file.tags || [],
            color: file.color || null
        };
        
        if (file.type === 'image' && file.dimensions) {
            result.w = file.dimensions.width;
            result.h = file.dimensions.height;
            result.url = getImagePath(file.name);
        }
        
        return result;
    },
    
    getDirectoryTree() {
        return FileSystem;
    },
    
    pathExists(path) {
        return resolvePath(path) !== null;
    },
    
    isFolder(path) {
        const node = resolvePath(path);
        return node && node.type === 'folder';
    },

    createFolder(parentPath, name) {
        const parent = resolvePath(parentPath);
        if (!parent) {
            return { error: "Parent path not found" };
        }
        if (parent.type !== "folder") {
            return { error: "Parent is not a folder" };
        }
        if (parent.children[name]) {
            return { error: "A folder with that name already exists" };
        }
        const computedPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
        parent.children[name] = {
            type: "folder",
            name: name,
            children: {}
        };
        return { success: true, path: computedPath };
    },

    createFile(parentPath, name) {
        const parent = resolvePath(parentPath);
        if (!parent) {
            return { error: "Parent path not found" };
        }
        if (parent.type !== "folder") {
            return { error: "Parent is not a folder" };
        }
        if (parent.children[name]) {
            return { error: "A file with that name already exists" };
        }
        const computedPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
        const fileType = getFileType(name);
        parent.children[name] = {
            type: fileType,
            name: name,
            size: 0,
            modified: new Date().toISOString()
        };
        return { success: true, path: computedPath };
    },

    deleteItem(path) {
        const node = resolvePath(path);
        if (!node) {
            return { error: "Path not found" };
        }
        if (path === '/') {
            return { error: "Cannot delete root" };
        }
        const parts = path.split('/').filter(p => p);
        const itemName = parts.pop();
        const parentPath = '/' + parts.join('/');
        const parent = resolvePath(parentPath === '//' ? '/' : parentPath);
        if (!parent) {
            return { error: "Parent not found" };
        }
        delete parent.children[itemName];
        return { success: true };
    },

    renameItem(path, newName) {
        const node = resolvePath(path);
        if (!node) {
            return { error: "Path not found" };
        }
        if (path === '/') {
            return { error: "Cannot rename root" };
        }
        const parts = path.split('/').filter(p => p);
        const oldName = parts.pop();
        const parentPath = '/' + parts.join('/');
        const parent = resolvePath(parentPath === '//' ? '/' : parentPath);
        if (!parent) {
            return { error: "Parent not found" };
        }
        if (parent.children[newName]) {
            return { error: "An item with that name already exists" };
        }
        parent.children[newName] = node;
        delete parent.children[oldName];
        node.name = newName;
        if (node.type !== 'folder') {
            node.type = getFileType(newName);
        }
        const computedNewPath = parentPath === '//' ? `/${newName}` : `${parentPath}/${newName}`;
        return { success: true, newPath: computedNewPath };
    },

    copyItem(srcPath, destParentPath) {
        const srcNode = resolvePath(srcPath);
        if (!srcNode) {
            return { error: "Source path not found" };
        }
        const destParent = resolvePath(destParentPath);
        if (!destParent) {
            return { error: "Destination parent not found" };
        }
        if (destParent.type !== "folder") {
            return { error: "Destination is not a folder" };
        }
        const clone = JSON.parse(JSON.stringify(srcNode));
        let name = clone.name;
        const ext = name.includes('.') ? name.substring(name.lastIndexOf('.')) : '';
        const base = ext ? name.substring(0, name.lastIndexOf('.')) : name;
        if (destParent.children[name]) {
            let i = 1;
            do {
                name = `${base} - Copy${i > 1 ? ' ' + i : ''}${ext}`;
                i++;
            } while (destParent.children[name]);
        }
        clone.name = name;
        destParent.children[name] = clone;
        const newPath = destParentPath === '/' ? `/${name}` : `${destParentPath}/${name}`;
        return { success: true, newPath: newPath };
    },

    moveItem(srcPath, destParentPath) {
        const copyResult = this.copyItem(srcPath, destParentPath);
        if (copyResult.error) {
            return copyResult;
        }
        const deleteResult = this.deleteItem(srcPath);
        if (deleteResult.error) {
            return deleteResult;
        }
        return { success: true, newPath: copyResult.newPath };
    },

    searchFiles(query, startPath = "/") {
        const results = [];
        const searchNode = resolvePath(startPath);
        if (!searchNode) {
            return results;
        }
        const lowerQuery = query.toLowerCase();
        function search(node, currentPath) {
            if (node.children) {
                for (const [name, child] of Object.entries(node.children)) {
                    const childPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
                    if (name.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            name: name,
                            path: childPath,
                            type: child.type,
                            icon: getFileIcon(child.type)
                        });
                    }
                    if (child.type === 'folder') {
                        search(child, childPath);
                    }
                }
            }
        }
        search(searchNode, startPath);
        return results;
    },

    getDrives() {
        return [
            { name: 'C:', path: '/C:', used: 120, total: 500, icon: 'mdi-harddisk' },
            { name: 'D:', path: '/D:', used: 250, total: 500, icon: 'mdi-harddisk' },
            { name: 'E:', path: '/E:', used: 75, total: 500, icon: 'mdi-harddisk' },
            { name: 'F:', path: '/F:', used: 50, total: 500, icon: 'mdi-harddisk' }
        ];
    },

    getClouds() {
        return [
            { name: 'Google Drive', path: '/Google Drive', used: 60, total: 100, icon: 'mdi-google-drive' },
            { name: 'OneDrive', path: '/OneDrive', used: 40, total: 100, icon: 'mdi-microsoft-onedrive' },
            { name: 'Dropbox', path: '/Dropbox', used: 80, total: 100, icon: 'mdi-dropbox' }
        ];
    },

    getHomePath() {
        return '/C:/home';
    }
};

const AppState = {
    selectedItems: [],      // Array of { path, name, type, icon }
    clipboard: {            // Clipboard state
        items: [],          // Array of { path, name, type }
        mode: null          // 'copy' or 'cut'
    },
    currentPath: '/',
    currentSort: 'name',    // 'name', 'date', 'size', 'type'
    sortDirection: 'asc',   // 'asc' or 'desc'
    filters: {
        extension: null,
        tags: [],
        colors: [],
        search: ''
    },
    
    // Selection methods
    selectItem(item) {
        if (!this.selectedItems.find(i => i.path === item.path)) {
            this.selectedItems.push(item);
        }
        this.dispatchSelectionChanged();
    },
    
    deselectItem(path) {
        this.selectedItems = this.selectedItems.filter(i => i.path !== path);
        this.dispatchSelectionChanged();
    },
    
    toggleSelection(item) {
        const exists = this.selectedItems.find(i => i.path === item.path);
        if (exists) {
            this.deselectItem(item.path);
        } else {
            this.selectItem(item);
        }
    },
    
    selectAll(items) {
        this.selectedItems = [...items];
        this.dispatchSelectionChanged();
    },
    
    deselectAll() {
        this.selectedItems = [];
        this.dispatchSelectionChanged();
    },
    
    isSelected(path) {
        return this.selectedItems.some(i => i.path === path);
    },
    
    // Clipboard methods
    copyToClipboard(items) {
        this.clipboard = { items: items.map(i => ({ path: i.path, name: i.name, type: i.type })), mode: 'copy' };
        this.dispatchClipboardChanged();
    },
    
    cutToClipboard(items) {
        this.clipboard = { items: items.map(i => ({ path: i.path, name: i.name, type: i.type })), mode: 'cut' };
        this.dispatchClipboardChanged();
    },
    
    clearClipboard() {
        this.clipboard = { items: [], mode: null };
        this.dispatchClipboardChanged();
    },
    
    hasClipboard() {
        return this.clipboard.items.length > 0;
    },
    
    // Sort methods
    setSort(by, direction) {
        this.currentSort = by;
        this.sortDirection = direction;
        window.dispatchEvent(new CustomEvent('sort-changed', { detail: { by, direction } }));
    },

    // Filter methods
    setFilter(type, value) {
      if (this.filters.hasOwnProperty(type)) {
        this.filters[type] = value;
        // Update active tab's filters if tab system exists
        const titleBar = document.querySelector('title-bar');
        if (titleBar && titleBar.activeTabId) {
          const tab = titleBar.tabs.find(t => t.id === titleBar.activeTabId);
          if (tab) {
            if (!tab.filters) tab.filters = { extension: null, tags: [], colors: [], search: '' };
            tab.filters[type] = value;
          }
        }
        this.dispatchFilterChanged();
      }
    },
    setFilters(updates) {
      Object.assign(this.filters, updates);
      // Update active tab's filters if tab system exists
      const titleBar = document.querySelector('title-bar');
      if (titleBar && titleBar.activeTabId) {
        const tab = titleBar.tabs.find(t => t.id === titleBar.activeTabId);
        if (tab) {
          if (!tab.filters) tab.filters = { extension: null, tags: [], colors: [], search: '' };
          Object.assign(tab.filters, updates);
        }
      }
      this.dispatchFilterChanged();
    },
    clearFilters() {
      const cleared = { extension: null, tags: [], colors: [], search: '' };
      this.filters = cleared;
      // Update active tab's filters if tab system exists
      const titleBar = document.querySelector('title-bar');
      if (titleBar && titleBar.activeTabId) {
        const tab = titleBar.tabs.find(t => t.id === titleBar.activeTabId);
        if (tab) {
          tab.filters = { extension: null, tags: [], colors: [], search: '' };
        }
      }
      this.dispatchFilterChanged();
    },

    // Events
    dispatchSelectionChanged() {
        window.dispatchEvent(new CustomEvent('selection-changed', { 
            detail: { selectedItems: this.selectedItems, count: this.selectedItems.length } 
        }));
    },
    
    dispatchClipboardChanged() {
        window.dispatchEvent(new CustomEvent('clipboard-changed', { 
            detail: { clipboard: this.clipboard } 
        }));
    },

    dispatchFilterChanged() {
        window.dispatchEvent(new CustomEvent('filter-changed', {
            detail: { filters: this.filters }
        }));
    }
};

window.AppState = AppState;
window.SimulationAPI = SimulationAPI;
