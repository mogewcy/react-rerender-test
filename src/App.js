import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./styles.css";

const originData = {
  a: {
    name: "法师",
    list: [
      {
        name: "AAAA",
        heroId: "123"
      },
      {
        name: "BBBBB",
        heroId: "674"
      }
    ]
  },
  b: {
    name: "战士",
    list: [
      {
        name: "CCCCC",
        heroId: "899"
      },
      {
        name: "DDDD",
        heroId: "89191"
      }
    ]
  }
};

const HeroRadio = React.memo(
  ({ name, heroId, index, changeOption, isChoosed }) => {
    const onClick = useCallback(() => {
      console.log(`点击了英雄: ID：${heroId}`);
      changeOption({
        heroId
      });
    }, [changeOption, heroId]);

    return (
      <div onClick={onClick}>
        <span>英雄名: {name}</span>

        <span>ID: {heroId} </span>

        <span>是否被选中: {String(isChoosed)}</span>
      </div>
    );
  }
);

function ListContainer({ list, options, changeOption }) {
  return list.map((item, index) => {
    return (
      <HeroRadio
        {...item}
        key={item.heroId}
        index={index}
        changeOption={changeOption}
      >
        {" "}
      </HeroRadio>
    );
  });
}

function App() {
  const list = useMemo(() => {
    return originData;
  }, []);

  const [choosedOption, setChoosedOption] = useState([]);

  const changeOption = useCallback(() => {}, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      {Object.keys(list).map((key) => {
        return (
          <ListContainer
            list={list[key].list}
            options={choosedOption}
            changeOption={changeOption}
          >
            {" "}
          </ListContainer>
        );
      })}
    </div>
  );
}

export default App;
