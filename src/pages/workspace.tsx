import React from 'react';
import { IWorkspace } from '../model/workspace';
import "../css/workspace.css";

const TaskList: IWorkspace[] = [
  {
    id: 1,
    name: "Allience Capital Group",
    description: "The workspace was created to track the status of work on the ACG CRM website",
    image: "/images/4.gif",
    users: []
  },
  {
    id: 2,
    name: "Workspace 2",
    description: "Description of workspace 2",
    image: "/images/2.jpg",
    users: []
  }
];

function WorkspaceComponent() {
  return (
    <div className="MyWorkspace">
        <div className="description">
            <h3>Wlcome to Workspace</h3>
            </div>

        <div className="tiles-container">
            {TaskList.map((workspace) => (
                <div key={workspace.id} className="tile">
                <img src={workspace.image} alt={workspace.name} />
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
      </div>
    ))}
  </div>
    </div>
   
  );
}

export default WorkspaceComponent;
