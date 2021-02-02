import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from "react";

import "./styles.css";

import { useImmer } from "use-immer";

const commitMessage = "引入immer";

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
  ({ name, heroId, index, changeOption, isChoosed, type }) => {
    console.log(`组件渲染：HeroRadio，${heroId}`);

    const onClick = () => {
      console.log(`点击了英雄: ID：${heroId}`);
      changeOption({
        heroId,
        index,
        name,
        type
      });
    };

    useEffect(() => {
      console.log("changeOption变化");
    }, [changeOption]);

    return (
      <div onClick={onClick}>
        <span>英雄名: {name}</span>

        <span>ID: {heroId} </span>

        <span>是否被选中: {String(Boolean(isChoosed))}</span>
      </div>
    );
  }
);

HeroRadio.displayName = "HeroRadio";

const ListContainer = React.memo(({ list, changeOption, name, type }) => {
  console.log(`组件渲染：ListContainer`);

  return (
    <div
      style={{
        marginBottom: 30
      }}
    >
      <span>类别 {name}</span>
      {list.map((item, index) => {
        console.log(`组件循环, ListContainer: Map`);

        return (
          <HeroRadio
            {...item}
            key={item.heroId}
            index={index}
            changeOption={changeOption}
            isChoosed={item.isChoosed}
            type={type}
          >
            {" "}
          </HeroRadio>
        );
      })}
    </div>
  );
});

function App() {
  const [list, setList] = useImmer(originData);

  const changeOption = useCallback(
    (res) => {
      const { index, type } = res;
      setList((draft) => {
        draft[type].list[index].isChoosed = !draft[type].list[index].isChoosed;
      });
    },
    [setList]
  );

  console.log(`根组件开始渲染：App`);

  return (
    <div className="App">
      <h1>优化3: 引入immer</h1>

      {Object.keys(list).map((key) => {
        return (
          <ListContainer
            list={list[key].list}
            changeOption={changeOption}
            name={list[key].name}
            key={key}
            type={key}
          >
            {" "}
          </ListContainer>
        );
      })}
    </div>
  );
}

export default () => {
  return <App> </App>;
};
