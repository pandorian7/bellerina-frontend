import { transactions } from "./stores";

export async function getAll() {
  const res = await fetch("/api/expenses/getAllExpenses");
  let data = await res.json();
  data = preProcess(data);
  return data;
}

export async function addExpense(transaction) {
  const res = await fetch("/api/expenses/addExpense", {
    body: JSON.stringify(transaction),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.status;
}

export async function updateExpense(transaction) {
  const res = await fetch("/api/expenses/updateExpense", {
    body: JSON.stringify(transaction),
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.status;
}

export async function deleteExpense(id) {
  // console.log("deleting");
  const res = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });
  return res.status;
}

export function PostProcess(data) {
  let { amount, description, category, date, type } = data;
  amount = Number(amount);
  if (type == "expense") {
    amount *= -1;
  }
  let processed = {
    amount,
    description,
    category,
    date,
  };
  if (data.id) {
    processed.id = data.id;
  }
  return processed;
}

export function preProcess(data) {
  return data.map((record) => {
    const expence_or_income = record.amount > 0 ? "income" : "expense";
    const isExpense = expence_or_income == "expense";
    const date = new Date(record.date);
    const dateInfo = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    dateInfo["string"] = `${dateInfo.year}, ${months[dateInfo.month - 1]} ${
      dateInfo.day
    }`;

    return {
      ...record,
      dateInfo,
      type: expence_or_income,
      amount: isExpense ? record.amount * -1 : record.amount,
    };
  });
}

export async function update() {
  const data = await getAll();
  transactions.set(data);
}
