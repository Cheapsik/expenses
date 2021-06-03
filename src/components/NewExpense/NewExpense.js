import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

toast.configure({
  autoClose: 2000,
  draggable: true,
});

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    if (
      enteredExpenseData.title.trim().length === 0 ||
      enteredExpenseData.amount === 0
    ) {
      toast.error("Enter correct data! 😔", {
        position: "bottom-right",
        pauseOnHover: false,
      });
    } else {
      const expenseData = {
        ...enteredExpenseData,
        id: Math.random().toString(),
      };
      props.onAddExpense(expenseData);
      setIsEditing(false);
      toast.success("Added a expense! 🤗", {
        position: "bottom-right",
        pauseOnHover: false,
      });
    }
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add new expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
