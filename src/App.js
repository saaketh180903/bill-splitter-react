import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.js";
import GroupManager from "./components/GroupManager/GroupManager.js";
import ExpenseManager from "./components/ExpenseManager/ExpenseManager.js";
import './App.css';

function App() {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  const addGroup = (groupName, members = []) => {
    const newGroup = {
      id: Date.now(),
      groupName,
      members,
      expenses: [],
      balances: members.reduce((acc, member) => {
        acc[member] = 0;
        return acc;
      }, {}), // Initialize balances for all members
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };
  

  const updateGroup = (updatedGroup) => {
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setGroups(updatedGroups);
    setCurrentGroup(updatedGroup); // Update the current group
  };

  return (
    <div>
      <Navbar />
      <GroupManager
        groupList={groups}
        setCurrentGroup={setCurrentGroup}
        addGroup={addGroup}
      />
      {currentGroup && (
        <ExpenseManager
          group={currentGroup}
          updateGroup={updateGroup}
        />
      )}
    </div>
  );
}

export default App;
