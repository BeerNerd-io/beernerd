class TaskManager {
    constructor(tasks) {
        this.tasks = tasks;
    }

    addTask(title) {
        const newTask = {
            id: this.tasks.length + 1,
            title: title,
            completed: false
        };
        this.tasks.push(newTask);
        return newTask;
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }

    getTasks() {
        return this.tasks;
    }
}

// Export the TaskManager class
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = TaskManager;
} else {
    window.TaskManager = TaskManager;
}
