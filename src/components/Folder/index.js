import { useState, useEffect } from "react";
import "./styles.css";
import { fileImg, folderImg } from "../../constants/folderData";

function Folder({ folderData, createNewEntity }) {
  const [showFile, setShowFile] = useState(false);
  const [inputField, setInputField] = useState({
    isVisible: false,
    key: ''
  });
  const { isVisible, key } = inputField;
  const { children = [], isFolder, name } = folderData;

  const handleClick = () => {
    setShowFile(!showFile);
  };

  const handleNewEntity = (type = '') => {
    let setVisible = true;
    if (type == key && isVisible) {
      setVisible = false;
    }
    else {
      setShowFile(true);
    }
    setInputField({ isVisible: setVisible, key: type });
  }

  const submitNewEntity = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      createNewEntity(e.target.value, folderData, key == 'folder', folderData);
      setInputField({ isVisible: false, key: '' });
    }
  }

  return (
    <>
      <div className="heading">
        <div className="heading_existing">
          <div
            className="heading_name"
            onClick={() => {
              handleClick();
            }}
          >
            <img src={isFolder ? folderImg : fileImg} />
            {name}
          </div>
          {
            isFolder && <div className="heading_btn_container">
              <button
                onClick={() => handleNewEntity('folder')}>
                Add Folder +
              </button>
              <button
                onClick={() => handleNewEntity('file')}>
                Add File +
              </button>
            </div>
          }
        </div>
        {isVisible && <div className="heading_newentity">
          <img src={key == 'file' ? fileImg : folderImg} />
          <input onBlur={() => { setInputField({ isVisible: false, key: '' }) }} type='text' autoFocus onKeyDown={submitNewEntity} />
        </div>}
      </div>
      <div
        className="folder"
        style={{ display: showFile ? "block" : "none" }}
      >
        {children.length ?
          children.map((folder, index) => (
            <Folder key={index} folderData={folder} createNewEntity={createNewEntity} />
          )) : null}
      </div>
    </>
  );
}

export default Folder;
