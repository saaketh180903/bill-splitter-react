import React, { useState } from "react";
import './GroupManager.css';


function GroupManager({ groupList = [], setCurrentGroup, addGroup }) {
  const [newGroupName, setNewGroupName] = useState("");
  const [newMembers, setNewMembers] = useState("");

  const handleAddGroup = () => {
    if (newGroupName.trim() && newMembers.trim()) {
      const members = newMembers.split(",").map((member) => member.trim());
      addGroup(newGroupName, members);
      setNewGroupName("");
      setNewMembers("");
    } else {
      alert("Please provide a group name and add at least one member.");
    }
  };

  return (
    <div>
      <h2>Groups</h2>
      <input
        type="text"
        placeholder="New Group Name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add Members (comma-separated)"
        value={newMembers}
        onChange={(e) => setNewMembers(e.target.value)}
      />
      <button onClick={handleAddGroup}>Add Group</button>

      {Array.isArray(groupList) && groupList.length > 0 ? (
        <ul>
          {groupList.map((group) => (
            <li
              key={group.id}
              onClick={() => setCurrentGroup(group)}
              style={{ cursor: "pointer" }}
            >
              {group.groupName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups available. Create one!</p>
      )}
    </div>
  );
}

export default GroupManager;
