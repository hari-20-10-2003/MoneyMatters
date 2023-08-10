import { observable, makeObservable, computed, action } from "mobx";

class TransactionsStore {
  transactionsList;
  debitTotalAmount;
  creditTotalAmount;
  lastTransactionsList;

  constructor() {
    this.transactionsList = [];
    this.lastTransactionsList = [];

    this.debitTotalAmount = "";
    this.creditTotalAmount = "";

    makeObservable(this, {
      transactionsList: observable,
      creditTotalAmount: observable,
      debitTotalAmount: observable,
      lastTransactionsList: observable,

      creditData: computed,
      debitData: computed,

      addTransactionDataToTransactionList: action,
      addTransactionToTransactionLIst: action,
      creditTotalAmountAction: action,
      debitTotalAmountAction: action,
      updateTransaction: action,
      deleteTransaction: action,
      addLastTransactionDataToLastTransactionList: action,
    });
  }

  get creditData() {
    let arrayOfCreditData = this.transactionsList.filter((transaction) => {
      return transaction.type === "credit";
    });
    return arrayOfCreditData;
  }

  get debitData() {
    let arrayOfDebitData = this.transactionsList.filter((transaction) => {
      return transaction.type === "debit";
    });
    return arrayOfDebitData;
  }

  addTransactionDataToTransactionList(transactionsData) {
    this.transactionsList = [...this.transactionsList, ...transactionsData];
  }

  addTransactionToTransactionLIst(transaction) {
    this.transactionsList = [...this.transactionsList, transaction];
  }

  creditTotalAmountAction(creditTotal) {
    this.creditTotalAmount = creditTotal;
  }

  debitTotalAmountAction(debitTotal) {
    this.debitTotalAmount = debitTotal;
  }

  addLastTransactionDataToLastTransactionList(lastTransactionsData) {
    this.lastTransactionsList = [
      ...this.lastTransactionsList,
      ...lastTransactionsData,
    ];
  }

  deleteTransaction(transactionId) {
    let updatedTransactionsList = this.transactionsList.filter(
      (transaction) => {
        return transaction.id !== transactionId;
      }
    );
    this.transactionsList = updatedTransactionsList;
  }

  updateTransaction() {}
}
export default TransactionsStore;
