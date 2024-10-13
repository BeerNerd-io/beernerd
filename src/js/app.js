// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const projectForm = document.getElementById('project-form');
    const projectsList = document.getElementById('projects');
    
    // Initialize projects array from localStorage or empty array if not present
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    /**
     * Renders all projects to the DOM
     */
    function renderProjects() {
        projectsList.innerHTML = '';
        projects.forEach((project, index) => {
            const projectElement = createProjectElement(project, index);
            projectsList.appendChild(projectElement);
        });
    }

    /**
     * Creates a DOM element for a single project
     * @param {Object} project - The project object
     * @param {number} index - The index of the project in the projects array
     * @returns {HTMLElement} The created project element
     */
    function createProjectElement(project, index) {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.innerHTML = `
            <h2 class="project-title">${escapeHtml(project.title)}</h2>
            <p>${escapeHtml(project.description)}</p>
            <p>Due: ${escapeHtml(project.dueDate)}</p>
            ${createListHtml('Tasks', project.tasks)}
            ${createListHtml('Parts', project.parts)}
            ${createListHtml('Tools', project.tools)}
            ${createListHtml('Resources', project.resources)}
            ${createListHtml('Progress Log', project.progressLog, false)}
            <button onclick="editProject(${index})">Edit</button>
            <button onclick="deleteProject(${index})">Delete</button>
        `;
        return projectElement;
    }

    /**
     * Creates HTML for a list of items
     * @param {string} title - The title of the list
     * @param {Array} items - The array of items
     * @param {boolean} [hasLink=true] - Whether the items have links
     * @returns {string} The HTML string for the list
     */
    function createListHtml(title, items, hasLink = true) {
        return `
            <h3>${escapeHtml(title)}:</h3>
            <ul>${items.map(item => `<li>${escapeHtml(hasLink ? item.name : item)} ${hasLink && item.link ? `<a href="${escapeHtml(item.link)}" target="_blank">(Link)</a>` : ''}</li>`).join('')}</ul>
        `;
    }

    /**
     * Escapes HTML special characters to prevent XSS
     * @param {string} unsafe - The unsafe string
     * @returns {string} The escaped safe string
     */
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * Adds a new project to the projects array and updates localStorage
     * @param {Object} project - The project object to add
     */
    function addProject(project) {
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }

    /**
     * Deletes a project from the projects array
     * @param {number} index - The index of the project to delete
     */
    window.deleteProject = function(index) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }

    /**
     * Sets up event listeners for adding items to a list
     * @param {string} containerId - The ID of the container element
     * @param {string} inputId - The ID of the input element
     * @param {string} linkId - The ID of the link input element
     * @param {string} addButtonId - The ID of the add button element
     * @returns {Array} An array to store the added items
     */
    function setupItemAdder(containerId, inputId, linkId, addButtonId) {
        const container = document.getElementById(containerId);
        const input = document.getElementById(inputId);
        const linkInput = document.getElementById(linkId);
        const addButton = document.getElementById(addButtonId);
        const items = [];

        if (!container || !input || !linkInput || !addButton) {
            console.error(`One or more elements not found for ${containerId}`);
            return items;
        }

        addButton.addEventListener('click', () => {
            const name = input.value.trim();
            const link = linkInput.value.trim();
            if (name !== '') {
                const item = { name, link };
                items.push(item);
                const itemElement = document.createElement('div');
                itemElement.textContent = `${name} ${link ? `(Link: ${link})` : ''}`;
                container.appendChild(itemElement);
                input.value = '';
                linkInput.value = '';
            }
        });

        return items;
    }

    // Setup item adders for tasks, parts, tools, and resources
    const tasks = setupItemAdder('tasks-container', 'task-input', 'task-link', 'add-task');
    const parts = setupItemAdder('parts-container', 'part-input', 'part-link', 'add-part');
    const tools = setupItemAdder('tools-container', 'tool-input', 'tool-link', 'add-tool');
    const resources = setupItemAdder('resources-container', 'resource-input', 'resource-link', 'add-resource');

    // Setup progress log adder
    const progressContainer = document.getElementById('progress-container');
    const progressInput = document.getElementById('progress-input');
    const addProgressButton = document.getElementById('add-progress');
    const progressLog = [];

    if (progressContainer && progressInput && addProgressButton) {
        addProgressButton.addEventListener('click', () => {
            const note = progressInput.value.trim();
            if (note !== '') {
                progressLog.push(note);
                const progressElement = document.createElement('div');
                progressElement.textContent = note;
                progressContainer.appendChild(progressElement);
                progressInput.value = '';
            }
        });
    } else {
        console.error('One or more progress elements not found');
    }

    // Setup form submission
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('project-title');
            const descriptionInput = document.getElementById('project-description');
            const dueDateInput = document.getElementById('project-due-date');

            if (!titleInput || !descriptionInput || !dueDateInput) {
                console.error('One or more required inputs not found');
                return;
            }

            const newProject = {
                title: titleInput.value,
                description: descriptionInput.value,
                dueDate: dueDateInput.value,
                tasks: tasks.slice(),
                parts: parts.slice(),
                tools: tools.slice(),
                resources: resources.slice(),
                progressLog: progressLog.slice()
            };
            addProject(newProject);
            projectForm.reset();
            [tasks, parts, tools, resources, progressLog].forEach(arr => arr.length = 0);
            ['tasks-container', 'parts-container', 'tools-container', 'resources-container', 'progress-container'].forEach(id => {
                const container = document.getElementById(id);
                if (container) container.innerHTML = '';
            });
        });
    } else {
        console.error('Project form not found');
    }

    // Initial render of projects
    renderProjects();

    const editModal = document.getElementById('edit-modal');
    const editProjectForm = document.getElementById('edit-project-form');
    const closeModalSpan = document.querySelector('.close');

    window.editProject = function(index) {
        const project = projects[index];
        editProjectForm.innerHTML = `
            <div class="form-group">
                <label for="edit-project-title">Project Title</label>
                <input type="text" id="edit-project-title" value="${escapeHtml(project.title)}" required>
            </div>
            <div class="form-group">
                <label for="edit-project-description">Description</label>
                <textarea id="edit-project-description" required>${escapeHtml(project.description)}</textarea>
            </div>
            <div class="form-group">
                <label for="edit-project-due-date">Due Date</label>
                <input type="date" id="edit-project-due-date" value="${project.dueDate}" required>
            </div>
            ${createEditListHtml('Tasks', project.tasks)}
            ${createEditListHtml('Parts', project.parts)}
            ${createEditListHtml('Tools', project.tools)}
            ${createEditListHtml('Resources', project.resources)}
            ${createEditListHtml('Progress Log', project.progressLog, false)}
            <button type="submit">Save Changes</button>
        `;
        editProjectForm.dataset.projectIndex = index;
        editModal.style.display = 'block';
    }

    function createEditListHtml(title, items, hasLink = true) {
        const lowercaseTitle = title.toLowerCase().replace(' ', '-');
        return `
            <div class="form-group">
                <label for="edit-${lowercaseTitle}-container">${title}</label>
                <div id="edit-${lowercaseTitle}-container">
                    ${items.map((item, index) => `
                        <div>
                            <input type="text" id="edit-${lowercaseTitle}-name-${index}" name="edit-${lowercaseTitle}-name-${index}" value="${escapeHtml(hasLink ? item.name : item)}" data-index="${index}">
                            ${hasLink ? `<input type="text" id="edit-${lowercaseTitle}-link-${index}" name="edit-${lowercaseTitle}-link-${index}" value="${escapeHtml(item.link || '')}" data-index="${index}">` : ''}
                            <button type="button" onclick="removeEditItem('${lowercaseTitle}', ${index})">Remove</button>
                        </div>
                    `).join('')}
                </div>
                <input type="text" id="edit-${lowercaseTitle}-input" name="edit-${lowercaseTitle}-input" placeholder="Enter ${title.toLowerCase()}">
                ${hasLink ? `<input type="text" id="edit-${lowercaseTitle}-link" name="edit-${lowercaseTitle}-link" placeholder="${title} link (optional)">` : ''}
                <button type="button" onclick="addEditItem('${lowercaseTitle}')">Add ${title}</button>
            </div>
        `;
    }

    window.addEditItem = function(type) {
        const container = document.getElementById(`edit-${type}-container`);
        const input = document.getElementById(`edit-${type}-input`);
        const linkInput = document.getElementById(`edit-${type}-link`);
        const name = input.value.trim();
        const link = linkInput ? linkInput.value.trim() : '';
        if (name !== '') {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <input type="text" value="${escapeHtml(name)}" data-index="${container.children.length}">
                ${linkInput ? `<input type="text" value="${escapeHtml(link)}" data-index="${container.children.length}">` : ''}
                <button type="button" onclick="removeEditItem('${type}', ${container.children.length})">Remove</button>
            `;
            container.appendChild(itemElement);
            input.value = '';
            if (linkInput) linkInput.value = '';
        }
    }

    window.removeEditItem = function(type, index) {
        const container = document.getElementById(`edit-${type}-container`);
        container.removeChild(container.children[index]);
        // Update data-index attributes
        Array.from(container.children).forEach((child, i) => {
            child.querySelector('input').dataset.index = i;
            const linkInput = child.querySelector('input:nth-child(2)');
            if (linkInput) linkInput.dataset.index = i;
            child.querySelector('button').setAttribute('onclick', `removeEditItem('${type}', ${i})`);
        });
    }

    editProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = parseInt(editProjectForm.dataset.projectIndex);
        const updatedProject = {
            title: document.getElementById('edit-project-title').value,
            description: document.getElementById('edit-project-description').value,
            dueDate: document.getElementById('edit-project-due-date').value,
            tasks: getEditedItems('tasks'),
            parts: getEditedItems('parts'),
            tools: getEditedItems('tools'),
            resources: getEditedItems('resources'),
            progressLog: getEditedItems('progress-log', false)
        };
        projects[index] = updatedProject;
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
        editModal.style.display = 'none';
    });

    function getEditedItems(type, hasLink = true) {
        const container = document.getElementById(`edit-${type}-container`);
        if (!container) {
            console.error(`Container not found for ${type}`);
            return [];
        }
        return Array.from(container.children).map(child => {
            const nameInput = child.querySelector('input');
            const linkInput = child.querySelector('input:nth-child(2)');
            return hasLink ? { name: nameInput.value, link: linkInput ? linkInput.value : '' } : nameInput.value;
        });
    }

    closeModalSpan.onclick = () => {
        editModal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    }

    // ... existing code ...
});