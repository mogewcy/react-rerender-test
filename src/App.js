import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from "react";

import "./styles.css";

import { useImmer } from "use-immer";

import produce from "immer";

import { createStore } from "redux";
import { useSelector, Provider, useDispatch } from "react-redux";

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

const ACTION = {
  change: "change"
};

const reducer = produce((draft, action) => {
  if (action.type === ACTION.change) {
    const { index, type } = action.payload;

    draft.data[type]["list"][index].isChoosed = !draft.data[type]["list"][index]
      .isChoosed;
  }
});

const store = createStore(reducer, {
  data: originData,
  heroIdMap: Object.keys(originData).reduce((acc, cur) => {
    acc[cur] = originData[cur].list.map((item) => item.heroId);

    return acc;
  }, {})
});

const HeroRadio = React.memo(({ heroId, index, type }) => {
  console.log(`组件渲染：HeroRadio，${heroId}`);

  const dispatch = useDispatch();

  const { name, isChoosed } = useSelector((state) => {
    const data = state.data[type].list[index];

    return data;
  });

  const onClick = () => {
    console.log(`点击了英雄: ID：${heroId}`);

    dispatch({
      type: ACTION.change,
      payload: {
        index,
        type
      }
    });
  };

  return (
    <div onClick={onClick}>
      <span>英雄名: {name}</span>

      <span>ID: {heroId} </span>

      <span>是否被选中: {String(Boolean(isChoosed))}</span>
    </div>
  );
});

HeroRadio.displayName = "HeroRadio";

const ListContainer = React.memo(({ heros, type }) => {
  console.log(`组件渲染：ListContainer ${type}`);

  return (
    <div
      style={{
        marginBottom: 30
      }}
    >
      <span>类别</span>

      {heros.map((heroId, index) => {
        console.log(`组件循环, ListContainer: Map`);

        return (
          <HeroRadio key={heroId} index={index} type={type} heroId={heroId}>
            {" "}
          </HeroRadio>
        );
      })}
    </div>
  );
});

function App() {
  const heroIdMap = useSelector((state) => {
    return state.heroIdMap;
  });

  console.log(`根组件开始渲染：App`, heroIdMap);

  return (
    <div className="App">
      <h1>优化4: 改变数据结构，引入reducer, 让ListContainer的props不可变</h1>

      {Object.keys(heroIdMap).map((key) => {
        return (
          <ListContainer heros={heroIdMap[key]} key={key} type={key}>
            {" "}
          </ListContainer>
        );
      })}
    </div>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App> </App>;
    </Provider>
  );
};
