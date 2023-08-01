import { useContext } from "react";
import "./SideBarItems.css";
import { CurrentActiveBoardID } from "../../App";

function ReturnSidebarBoardNameAndIcon({
  boardID,
  icon: Icon,
  boardname,
  currentActiveBoardID,
  onChangeTab,
}) {
  return (
    <>
      {boardID === currentActiveBoardID ? (
        <button className="boardNameButtons">
          <div className="boardHighLighter"></div>
          <div className="boardName selectedBoardstyling">
            <Icon fill="#2D60FF" />
            <span className="boardNameText" style={{ color: "#2D60FF" }}>
              {boardname}
            </span>
          </div>
        </button>
      ) : (
        <button
          className="boardNameButtons"
          onClick={() => {
            onChangeTab(boardID);
          }}
        >
          <div className="boardName">
            <Icon />
            <span className="boardNameText">{boardname}</span>
          </div>
        </button>
      )}
    </>
  );
}

export function ReturnSidebarItem({ sideBarBoards, setCurrentActiveBoardID }) {
  let IconAndBoardName = [];
  let currentActiveBoardID = useContext(CurrentActiveBoardID);

  const onChangeTab = (boardID) => {
    setCurrentActiveBoardID(boardID);
  };

  sideBarBoards.forEach((board) => {
    IconAndBoardName.push(
      <ReturnSidebarBoardNameAndIcon
        boardID={board.id}
        icon={board.icon}
        boardname={board.boardName}
        key={board.boardName}
        currentActiveBoardID={currentActiveBoardID}
        onChangeTab={onChangeTab}
      />
    );
  });

  return <div className="boardContainer">{IconAndBoardName}</div>;
}
