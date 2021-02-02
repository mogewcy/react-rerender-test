import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from "react";
import "./styles.css";

import {
  OptionContext,
  OptionProvider,
  ACTION
} from "./hook/useCurrentOptions";

const commitMessage = "去除heroRadio对change的依赖";

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

const isChoosed = (list, id) => {
  return list.map((item) => item.heroId).includes(id);
};

const HeroRadio = React.memo(
  ({ name, heroId, index, changeOption, isChoosed }) => {
    console.log(`组件渲染：HeroRadio，${heroId}`);

    const onClick = useCallback(() => {
      console.log(`点击了英雄: ID：${heroId}`);
      changeOption({
        heroId,
        index,
        name
      });
    }, [changeOption, heroId, index, name]);

    useEffect(() => {
      console.log("changeOption变化");
    }, [changeOption]);

    return (
      <div onClick={onClick}>
        <span>英雄名: {name}</span>

        <span>ID: {heroId} </span>

        <span>是否被选中: {String(isChoosed)}</span>
      </div>
    );
  }
);

function ListContainer({ list, options, changeOption, name }) {
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
            isChoosed={isChoosed(options, item.heroId)}
          >
            {" "}
          </HeroRadio>
        );
      })}
    </div>
  );
}

HeroRadio.displayName = "HeroRadio";

function App() {
  const list = useMemo(() => {
    return originData;
  }, []);

  const [{ choosedOption }, dispatch] = useContext(OptionContext);

  const changeOption = useCallback(
    ({ heroId, ...rest }) => {
      dispatch({
        type: ACTION.change,
        payload: {
          heroId,
          ...rest
        }
      });
    },
    [dispatch]
  );

  console.log(`根组件开始渲染：App`);

  return (
    <div className="App">
      <h1>优化1: 减少HeroRadio组件更新</h1>

      {Object.keys(list).map((key) => {
        return (
          <ListContainer
            list={list[key].list}
            options={choosedOption}
            changeOption={changeOption}
            name={list[key].name}
          >
            {" "}
          </ListContainer>
        );
      })}
    </div>
  );
}

export default () => {
  return (
    <OptionProvider>
      <App> </App>
    </OptionProvider>
  );
};
