import { headers } from "../components/Constants/Constants";

export function allTransactionsDataAPI({
  setDebitData,
  setCreditData,
  setAllTransactionsError,
  limit,
  offSetValue,
  transactionsStoreContext,
}) {
  fetch(
    `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offSetValue}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((data) => data.json())

    .then((data) => {
      transactionsStoreContext.addTransactionDataToTransactionList(
        data.transactions
      );

      let debit_Data = [];
      let credit_Data = [];
      data.transactions.forEach((transaction) => {
        transaction.type === "credit"
          ? credit_Data.push(transaction)
          : debit_Data.push(transaction);
      });
      setDebitData(debit_Data);
      setCreditData(credit_Data);
    })

    .catch((err) => {
      setAllTransactionsError(true);
    });
}

export function lastThreeTransactions({ setLastTransactions, setIsError }) {
  fetch(
    "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0",
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((data) => data.json())

    .then((data) => {
      setLastTransactions(data.transactions);
    })

    .catch((err) => {
      setIsError(true);
    });
}

export function totalCreditAndDebitDataAPI({
  setFetchedData,
  setIsLoading,
  setIsLastTransactionsError,
}) {
  fetch("https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals", {
    method: "GET",
    headers: headers,
  })
    .then((data) => data.json())
    .then((data) => {
      setFetchedData(data);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLastTransactionsError(true);
    });
}

export function addTransactionDataAPI(formData, setIsModalOpen) {
  fetch("https://bursting-gelding-24.hasura.app/api/rest/add-transaction", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    },
    body: JSON.stringify({
      name: formData.name,
      type: formData.type,
      category: formData.category,
      amount: formData.amount,
      date: formData.date,
      user_id: 1,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      setIsModalOpen(false);
      console.log(data);
    })
    .catch((err) => console.log(err));
}
