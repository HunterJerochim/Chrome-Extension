import React, { useState } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./linkManager.css";

const getInitialLinkData = () => {
  const data = localStorage.getItem("link-manager-data");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function LinkManager2() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelectClicked, setIsSelectClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [optionsList, setOptionsList] = useState(() => getInitialLinkData());
  const [newOption, setNewOption] = useState("");
  const [showNewOptionForm, setShowNewOptionForm] = useState(false);
  const [showNewLinkForm, setShowNewLinkForm] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleSelectClick = () => {
    setIsSelectClicked(!isSelectClicked);
    setIsMenuOpen(!isMenuOpen);
    setSelectedOption(false);
    setShowNewLinkForm(false);
    if (isMenuOpen) {
      setShowNewOptionForm(false);
      setSelectedOption(false);
    }
  };

  const cancelAddCategory = () => {
    setShowNewOptionForm(false);
    setIsMenuOpen(true);
  };

  const handleNewOptionChange = (e) => {
    setNewOption(e.target.value);
  };

  const handleNewLinkClick = () => {
    setShowNewLinkForm(true);
  };

  const cancelNewLink = () => {
    setShowNewLinkForm(false);
  };

  const handleNewLinkChange = (e) => {
    setNewLink(e.target.value);
  };

  const handleNewLinkNameChange = (e) => {
    setNewLinkName(e.target.value);
  };

  const handleAddLink = () => {
    const newOption = selectedOption;
    newOption.links.push({ name: newLinkName, link: newLink });
    setSelectedOption(newOption);
    const newOptionsList = [
      ...optionsList.filter((option) => option.name !== newOption.name),
      newOption,
    ];
    setOptionsList(newOptionsList);
    localStorage.setItem("link-manager-data", JSON.stringify(newOptionsList));
    setShowNewLinkForm(false);
    setNewLinkName("");
    setNewLink("");
  };

  // filter method i want everything added that isnt this //

  React.useEffect(() => {
    if (showNewOptionForm && isMenuOpen) {
      setShowNewOptionForm(false);
    }
  }, [isMenuOpen, showNewOptionForm]);

  const handleShowAddCategory = () => {
    setShowNewOptionForm(true);
    setIsMenuOpen(false);
  };

  const cancelCategoryView = () => {
    setSelectedOption(false);
    setIsMenuOpen(true);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowNewOptionForm(false);
    setIsMenuOpen(false);
    setIsSelectClicked(false);
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptionsList = [...optionsList];
      updatedOptionsList.push({ name: newOption, links: [] });
      localStorage.setItem(
        "link-manager-data",
        JSON.stringify(updatedOptionsList)
      );
      setOptionsList(updatedOptionsList);
      setNewOption("");
      setShowNewOptionForm(false);
      setIsMenuOpen(true);
    }
  };

  const handleDeleteOption = () => {
    const newOptionsList = optionsList.filter(
      (option) => option.name !== selectedOption.name
    );
    setOptionsList(newOptionsList);
    localStorage.setItem("link-manager-data", JSON.stringify(newOptionsList));
    setSelectedOption(null);
    setIsMenuOpen(true);
  };

  const handleDeleteLink = (event, linkName) => {
    event.stopPropagation();
    event.preventDefault();
    const newOption = { ...selectedOption };
    newOption.links = newOption.links.filter((link) => link.name !== linkName);
    setSelectedOption(newOption);
    const newOptionsList = optionsList.map((option) =>
      option.name === newOption.name ? newOption : option
    );
    setOptionsList(newOptionsList);
    localStorage.setItem("link-manager-data", JSON.stringify(newOptionsList));
  };

  return (
    <Draggable
      onDrag={() => setDragging(true)}
      onStop={() => setDragging(false)}
    >
      <div
        className="dropdown"
        style={{ pointerEvents: dragging ? "none" : "all" }}
      >
        <div
          className={`select${isSelectClicked ? " select-clicked" : ""}`}
          onClick={handleSelectClick}
        >
          <span className="selected">Link Manager</span>
          <div className={`caret${isMenuOpen ? " caret-rotate" : ""}`}></div>
        </div>

        <ul
          className={`menu transparent-scrollbar-light ${
            isMenuOpen ? "menu-open" : ""
          }`}
        >
          <span className="new-button" onClick={handleShowAddCategory}>
            New
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          </span>
          {optionsList.map((option) => (
            <li
              key={option.name}
              className={`menu-option${
                option.name === selectedOption ? " active" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="option-buttons">
                <div>{option.name}</div>
                <div className="li-caret"></div>
              </div>
            </li>
          ))}
        </ul>

        <div
          className={`selected-category-container ${
            selectedOption && !showNewLinkForm ? "show" : ""
          }`}
        >
          <div className="category-header-container">
            <div className="category-header-left-container">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrow-left-icon"
                onClick={cancelCategoryView}
              />
              <h3 className="selected-option-name">{selectedOption?.name}</h3>
            </div>
            <FontAwesomeIcon
              icon={faMinus}
              className="minus-icon"
              onClick={handleDeleteOption}
            />
          </div>
          <ul className="transparent-scrollbar-light2">
            <span className="new-button-second" onClick={handleNewLinkClick}>
              New
              <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            </span>
            {selectedOption?.links?.map((link) => (
              <a href={link.link} target="_blank" key={link.name}>
                <li>
                  <div className="option-buttons">
                    <div>{link.name}</div>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="minus-icon"
                      onClick={(event) => handleDeleteLink(event, link.name)}
                    />
                  </div>
                </li>
              </a>
            ))}
          </ul>
        </div>

        {!showNewLinkForm && (
          <div
            className={`new-option-container ${
              showNewOptionForm ? "expanded" : ""
            }`}
          >
            <div
              className={`new-option-form ${showNewOptionForm ? "show" : ""}`}
            >
              <input
                type="text"
                value={newOption}
                onChange={handleNewOptionChange}
                placeholder="Add category"
                className="category-input"
              />
              <div className="add-category-button-container">
                <button
                  className="add-category-button"
                  onClick={cancelAddCategory}
                >
                  Cancel
                </button>
                <button
                  className="add-category-button"
                  onClick={handleAddOption}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`new-option-container ${
            showNewLinkForm ? "expanded" : ""
          }`}
        >
          <div className={`new-option-form ${showNewLinkForm ? "show" : ""}`}>
            <input
              type="text"
              value={newLinkName}
              onChange={handleNewLinkNameChange}
              placeholder="Add link name"
              className="category-input"
            />
            <input
              type="text"
              value={newLink}
              onChange={handleNewLinkChange}
              placeholder="Add link"
              className="category-input"
            />
            <div className="add-category-button-container">
              <button className="add-category-button" onClick={cancelNewLink}>
                Cancel
              </button>
              <button className="add-category-button" onClick={handleAddLink}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

// this utilizes optional chaining //
// JSON.parse(localStorage.getItem('tenzies-highscore')); //
