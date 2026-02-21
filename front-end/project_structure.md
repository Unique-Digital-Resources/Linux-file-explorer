# project folder

index.html
main.css

sections (folder) : 
- title-bar (folder) : 
	- title-bar.js
	- components (folder for js files): 
		- moveable tabs
		- allowed users
		- owner avatar
		- window controls

- directory-bar (folder) : 
	- directory-bar.js
	- components (folder for js files): 
		- directory controls
		- directory path
		- search box

- directories-panel (folder) : 
	- directories-panel.js
	- components (folder for js files): 
		- main dicts
		- favoraties dicts
		- drivers
		- cloud storage

- toolbar (folder) : 
	- toolbar.js
	- components (folder for js files): 
		- new group
		- edit group
		- view group

- folder-contents (folder for folder) : 
	- folder-contents.js
	- ~~components :~~ 

- status-bar (folder) :
	- status-bar.js
	- components (folder for js files): 
		- details group
		- zoom controls group 
		- theme switcher
		- settings

themes (folder) : 
- default (folder for css files) : 
		- title-bar.css
		- directory-bar.css
		- directories-panel.css
		- toolbar.js
		- folder-contents.css
		- status-bar.css

---

# UI Structure

file-manager (root)  
├── title-bar  
│   └── moveable-tabs  
│   ├── allowed-users  
│   ├── owner-avatar  
│   └── window-controls  
├── directory-bar  
│   └── directory-controls  
│   ├── directory-path  
│   └── search-box  
├── content  
│   └── directories-panel  
│   │   └── main-dicts  
│   │   ├── favorites-dicts  
│   │   ├── drivers  
│   │   └── cloud-storage  
│   └── main-panel  
│       ├── toolbar  
│       │   └── new-group  
│       │   ├── edit-group  
│       │   └── view-group  
│       ├── folder-contents  
│       └── status-bar  
│           └── details-group  
│           ├── zoom-controls-group  
│           ├── theme-switcher  
│           └── settings