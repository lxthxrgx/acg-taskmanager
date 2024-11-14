import React, { useState } from 'react';
import { IWorkspace } from '../model/workspace';
import "../css/workspace.css";

const initialTaskList: IWorkspace[] = [
  {
    id: 1,
    name: "---------------------",
    description: "--------------------------------------------------------------------------",
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
  const [taskList, setTaskList] = useState<IWorkspace[]>(initialTaskList);
  const [editWorkspace, setEditWorkspace] = useState<{ id: number, field: string } | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: number]: { name: string, description: string } }>({});

  const handleAddNew = () => {
    const newWorkspace: IWorkspace = {
      id: taskList.length + 1,
      name: `New Workspace ${taskList.length + 1}`,
      description: "This is a new workspace.",
      image: "/images/default.jpg",
      users: []
    };
    setTaskList([newWorkspace, ...taskList]);
  };

  const handleEdit = (id: number, field: string) => {
    setEditWorkspace({ id, field });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = (id: number, field: string, value: string) => {
    setTaskList(taskList.map(workspace => {
      if (workspace.id === id) {
        return { ...workspace, [field]: value };
      }
      return workspace;
    }));
    setEditWorkspace(null);
    setInputValues((prev) => ({ 
      ...prev, 
      [id]: { 
        ...prev[id], 
        [field]: value
      }
    }));
  };

  const handleCancel = () => {
    setEditWorkspace(null);
  };

  return (
    <div className="MyWorkspace">
      <div className="description">
        <h3>Welcome to Workspace</h3>
      </div>

      <div className="tiles-container">
        <div className="tile add-new-tile" onClick={handleAddNew}>
          <span className="plus-icon">+</span>
          <p>Add New Workspace</p>
        </div>

        {taskList.map((workspace) => (
          <div key={workspace.id} className="tile">
            <img src={workspace.image} alt={workspace.name} />

            {editWorkspace?.id === workspace.id && editWorkspace.field === 'name' ? (
              <input
                type="text"
                value={inputValues[workspace.id]?.name || workspace.name}
                onChange={(e) => handleInputChange(workspace.id, 'name', e.target.value)}
                onBlur={() => handleSave(workspace.id, 'name', inputValues[workspace.id]?.name || workspace.name)}
                autoFocus
              />
            ) : (
              <h3 onClick={() => handleEdit(workspace.id, 'name')}>{workspace.name}</h3>
            )}

            {editWorkspace?.id === workspace.id && editWorkspace.field === 'description' ? (
              <textarea
                value={inputValues[workspace.id]?.description || workspace.description}
                onChange={(e) => handleInputChange(workspace.id, 'description', e.target.value)}
                onBlur={() => handleSave(workspace.id, 'description', inputValues[workspace.id]?.description || workspace.description)}
                autoFocus
              />
            ) : (
              <p onClick={() => handleEdit(workspace.id, 'description')}>{workspace.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkspaceComponent;
