import React, { useState, useCallback, useMemo } from "react";

import { Button } from "./components/Button";

const shuffleArray = (arr) => arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

const buttonColors = {
  blue: "#0000ff",
  red: "#ff0000",
};

const Game = ({ data }) => {
  const [prevData, setPrevData] = useState(data);

  const dataSize = useMemo(() => Object.entries(data), [data]);

  const [state, setState] = useState({
    itemsToRender: shuffleArray([...Object.keys(data), ...Object.values(data)]),
    selectedItems: [],
  });

  if (prevData !== data) {
    const countries = Object.keys(data);
    const capitals = Object.values(data);

    setState((prevState) => ({
      ...prevState,
      itemsToRender: shuffleArray([...countries, ...capitals]),
    }));

    setPrevData(data);
  }

  const handleSelectItem = useCallback(
    (item) => {
      setState((prevState) => {
        // same button click
        if (
          prevState.selectedItems.length === 1 &&
          prevState.selectedItems[0] === item
        ) {
          return prevState;
        }

        // select first
        if (
          prevState.selectedItems.length === 0 ||
          prevState.selectedItems.length === 2
        ) {
          return {
            ...prevState,
            selectedItems: [item],
          };
        }

        // select second
        if (
          data[prevState.selectedItems[0]] === item ||
          data[item] === prevState.selectedItems[0]
        ) {
          return {
            ...prevState,
            itemsToRender: prevState.itemsToRender.filter(
              (element) =>
                element !== prevState.selectedItems[0] && element !== item
            ),
            selectedItems: [],
          };
        } else {
          return {
            ...prevState,
            selectedItems: [...prevState.selectedItems, item],
          };
        }
      });
    },
    [data]
  );

  const getButtonColor = (buttonItem, selectedItems) => {
    if (selectedItems.length === 1 && buttonItem === selectedItems[0]) {
      return buttonColors.blue;
    }

    if (selectedItems.length === 2 && selectedItems.includes(buttonItem)) {
      return buttonColors.red;
    }

    return "";
  };

  if (dataSize.length === 0) {
    return null;
  }

  return (
    <div>
      {state.itemsToRender.length > 0 ? (
        state.itemsToRender.map((item) => (
          <Button
            key={item}
            item={item}
            color={getButtonColor(item, state.selectedItems)}
            handleClick={handleSelectItem}
          />
        ))
      ) : (
        <div>Congratulations!</div>
      )}
    </div>
  );
};

function App() {
  const mockData = {
    Germany: "Berlin",
    Azerbaijan: "Baku",
    Poland: "Warsaw",
    France: "Paris",
  };

  return (
    <div className="App">
      <Game data={mockData} />
    </div>
  );
}

export default App;
