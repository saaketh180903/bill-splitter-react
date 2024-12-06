import React, { useState } from "react";
import './ExpenseManager.css';


function ExpenseManager({ group, updateGroup }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [splitEqually, setSplitEqually] = useState(true);
  const [splits, setSplits] = useState({});

  const calculateBalances = (balances, expense) => {
    const { amount, payer, splits } = expense;

    // Deduct from the payer
    balances[payer] += amount;

    // Add owed amounts for each member
    Object.keys(splits).forEach((member) => {
      balances[member] -= splits[member];
    });

    return { ...balances };
  };

  const addExpense = () => {
    if (!description || !amount || !payer) {
      alert("Please fill all fields!");
      return;
    }

    const splitAmounts = splitEqually
      ? group.members.reduce((acc, member) => {
          acc[member] = parseFloat(amount) / group.members.length;
          return acc;
        }, {})
      : splits;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      payer,
      splits: splitAmounts,
    };

    const updatedBalances = calculateBalances({ ...group.balances }, newExpense);

    const updatedGroup = {
      ...group,
      expenses: [...group.expenses, newExpense],
      balances: updatedBalances,
    };

    updateGroup(updatedGroup);
    setDescription("");
    setAmount("");
    setPayer("");
    setSplits({});
  };

  return (
    <div>
      <h3>Manage Expenses for {group.groupName}</h3>

      <h4>Balances:</h4>
<ul>
  {group.balances && Object.entries(group.balances).length > 0 ? (
    Object.entries(group.balances).map(([member, balance]) => (
      <li key={member}>
        {member}: {balance > 0 ? `owes ${balance}` : `is owed ${Math.abs(balance)}`}
      </li>
    ))
  ) : (
    <li>No balances available</li>
  )}
</ul>


      <input
        type="text"
        placeholder="Expense Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Payer Name"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      />
      <label>
        Split Equally:
        <input
          type="checkbox"
          checked={splitEqually}
          onChange={() => setSplitEqually((prev) => !prev)}
        />
      </label>

      {!splitEqually &&
        group.members.map((member) => (
          <div key={member}>
            <label>
              {member}:
              <input
                type="number"
                value={splits[member] || ""}
                onChange={(e) =>
                  setSplits((prev) => ({ ...prev, [member]: e.target.value }))
                }
              />
            </label>
          </div>
        ))}

      <button onClick={addExpense}>Add Expense</button>

      <h4>Expenses</h4>
      {group.expenses.length > 0 ? (
        <ul>
          {group.expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} - {expense.amount} paid by {expense.payer}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet.</p>
      )}
    </div>
  );
}

export default ExpenseManager;
