import "./DataPageHeader.css";
import React from "react";

export function DataPageHeader({
  transactionHeading,
  addTransactionButton,
  setIsModalOpen,
}) {
  function openModal() {
    setIsModalOpen(true);
  }
  return (
    <div className="transactionHeadingAndButton">
      <span className="transactionHeading">{transactionHeading}</span>
      <button className="addTransactionButton" onClick={openModal}>
        {addTransactionButton}
      </button>
    </div>
  );
}
