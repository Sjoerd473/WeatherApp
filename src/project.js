import {Task} from './todo.js'

export const Project = class Project {
    constructor(title = 'Project name'){
        this.title = title
        this.tasks = [];
    }

    makeTask(title, desc, dueDate, priority)  {
        let task = new Task(title, desc, dueDate, priority)
        this.tasks.push(task);
        
    }

    getTask(index){
        return tasks[index]
    }


}
