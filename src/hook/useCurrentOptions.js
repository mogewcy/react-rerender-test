import React, { useState, createContext, useReducer } from "react";

const OptionContext = createContext();

const IntialState = {
  choosedOption: []
};

const ACTION = {
  change: "change"
};

const genNewCurrentOptions = ({ heroId, choosedOption, ...rest }) => {
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

  return options;
};

const reducer = (state, action) => {
  if (action.type === ACTION.change) {
    const { heroId, ...rest } = action.payload;

    const { choosedOption } = state;

    return {
      choosedOption: genNewCurrentOptions({
        choosedOption,
        heroId,
        ...rest
      })
    };
  }
};

const OptionProvider = ({ children }) => {
  const val = useReducer(reducer, IntialState);

  return (
    <OptionContext.Provider value={val}>{children}</OptionContext.Provider>
  );
};

export { OptionContext, OptionProvider, ACTION };
