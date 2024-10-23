import "./styles.css";
import { DOMgen } from "./DOMgenerator.js"
import { Project } from "./project.js";



function ProjectManager() {
    let projects = [];
    let activeProject = [];
    let container = document.querySelector('.project-container');
    

    const newProject = () => {
        
        let title = document.querySelector('input[name="pTitle"]').value
        let project = new Project(title);
        projects.push(project)
        
        
        
    }

    const newTask = () =>{
        let title = document.querySelector('input[name="title"]').value
        let desc = document.querySelector('input[name="desc"]').value
        let date = document.querySelector('input[name="date"]').value
        let prio = document.querySelector('input[name="prio"]').value 
        activeProject.makeTask(title,desc,date,prio)
     
        taskAdder()

    

    }

    const taskAdder = () => {
        let project = document.querySelector('.tasks')
        project.replaceChildren()
        
        activeProject.tasks.forEach((element, index) => {
        
        
        let div2 = DOMgen.makeDiv('task');
        let div3 = DOMgen.makeDiv()
        let p1 = DOMgen.makePara(element.title)
        let p2 = DOMgen.makePara(element.dueDate)
        let btn = DOMgen.makeButton('This will be a checkbox', 'checkbox')
        let btn2 = DOMgen.makeButton('Delete Task', 'delete-button');
        btn2.addEventListener('click', () =>{
            
            activeProject.tasks.splice(index,1)
            taskAdder()

        })
        
        project.appendChild(div2)
        
        div2.appendChild(btn)
        div2.appendChild(div3)
        div2.appendChild(btn2)
        div3.appendChild(p1)
        div3.appendChild(p2)

        })
    }

    const getProject = () =>{
        return projects
    }

    const getActiveProject = () =>{
        return activeProject
    }

    const focusProject = (index) => {
        activeProject = projects[index]
        let test = document.querySelector('.project-container')
        let test2 = DOMgen.makeDiv('tasks')
        container.replaceChildren();

        let div = DOMgen.makeDiv('project');
        let header = DOMgen.makeHeader(activeProject.title);
        let btn = DOMgen.makeButton('Add Task', 'addTaskBtn');
        
        container.appendChild(div);
        
        div.appendChild(header);
        div.appendChild(test2)
        test.appendChild(btn);

        taskAdder()
     
        

        
    }

  

    return { newProject, focusProject, getProject, newTask, getActiveProject }
}

function BtnAssigner() {
    const projectModal = document.querySelector('.project-modal');
    const createProjectBtn = document.querySelector("#confirmProject")
    const newProjectButton = document.querySelector(".newProjectBtn");
    const addTaskButton = document.querySelector('#confirmTask')
    const taskModalBtn = document.querySelector('.task-modal')

    const projects = ProjectManager()

    // const reactivateAdder = () =>{
        
    // }


    const activateButtons = () => {
        newProjectButton.addEventListener('click', () => {
            projectModal.showModal()
        })
        createProjectBtn.addEventListener('click', () => {
            projects.newProject()
            projects.focusProject(projects.getProject().length - 1)
            createProjectSelector()
            activateTaskButtons()
            projectModal.close()
        })

        addTaskButton.addEventListener('click', () =>{
            projects.newTask()
            taskModalBtn.close()

        })

        document.querySelector('.closeBtn').addEventListener('click', () =>{
            taskModalBtn.close()
        })


    }

    const createProjectSelector = () =>{   
        let index =  projects.getProject().length - 1
        let list = DOMgen.makeListItem()
        let btn = DOMgen.makeButton(`Project ${projects.getProject().length - 1}`, 'projectBtn');
        let parent = document.querySelector('.sidebar-list-middle');
        btn.addEventListener('click', () =>{
            projects.focusProject(index)
            activateTaskButtons()
     
        })
        list.appendChild(btn)
        parent.appendChild(list)

    }

    const activateTaskButtons = () => {
        const taskButtons = document.querySelectorAll('.addTaskBtn')
        taskButtons.forEach((button) => {
            button.addEventListener('click', () =>{
                taskModalBtn.showModal()
            })
        })
    }


    activateButtons()

    return {activateButtons}
}

const test = BtnAssigner()