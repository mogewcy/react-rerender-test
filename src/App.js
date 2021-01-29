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

function App() {
  const list = useMemo(() => {
    return originData;
  }, []);

  const [choosedOption, setChoosedOption] = useState([]);

  const changeOption = useCallback(
    ({ heroId, ...rest }) => {
      const options = [...choosedOption];

      const indexInChoosedOption = options.findIndex(
        (item) => item.heroId === heroId
      );

      if (indexInChoosedOption === -1) {
        //未选择到已选择, 添加到这里
        options.push({
          heroId,
          ...rest
        });
      } else {
        options.splice(indexInChoosedOption, 1); //存在的话就删除
      }

      setChoosedOption(options);

      console.log(indexInChoosedOption);
    },
    [choosedOption]
  );

  console.log(`根组件开始渲染：App`);

  return (
    <div className="App">
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

export default App;
