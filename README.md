# React性能优化

### 组件拆分
- App

根组件

- ListContainer

列表组件

- HeroRadio

单个的选项，在选项中可以切换该选项的选中态

### [第一版](https://github.com/mogewcy/react-rerender-test/tree/main)

![](https://cdn.nlark.com/yuque/0/2021/png/126348/1612324853938-c1ab66ca-781c-4251-a39d-72e79c732e50.png)

#### heroRadio中可以更改currentOptions，currentOptions会发生改变，引起了changeOption的改变，所以当操作一个heroRadio时，会引起所有的heroRadio改变


### 第二版
[https://github.com/mogewcy/react-rerender-test/tree/useContext-useReducer](https://github.com/mogewcy/react-rerender-test/tree/useContext-useReducer)
#### 优化点

- 主要是引入了Context和useReducer, 减少了changeOption对currentOption的依赖
#### 优化效果

- changeOption不发生变化，所以只有被操作的heroRadio会发生re-render。但是因为currentOptions的变化，所以所有的ListContainer还是会发生重渲染的
### 第三版
[https://github.com/mogewcy/react-rerender-test/tree/immer](https://github.com/mogewcy/react-rerender-test/tree/immer)
#### 优化点

- 引入了immer, 把isChoosed作为item的数据结构，当改变时只会改变这一项的数据结构
#### 优化效果

- 相比于第二版，因为改变了list的结构，所以ListContainer会发生re-render，但是其他类别下的list不变，所以操作了heroRadio之后，heroRaido以及所在list对应的listContainer组件会发生re-render

![image.png](https://cdn.nlark.com/yuque/0/2021/png/126348/1612323730661-fb9971ec-d91a-4de7-92f1-22d5c632f244.png#align=left&display=inline&height=364&margin=%5Bobject%20Object%5D&name=image.png&originHeight=728&originWidth=1200&size=91948&status=done&style=none&width=600)


### 第四版
[https://github.com/mogewcy/react-rerender-test/tree/immer-reducer-v2](https://github.com/mogewcy/react-rerender-test/tree/immer-reducer-v2)


#### 优化点

- 引入redux + useSelector。为了避免listContainer的重渲染，所以得改一下数据结构，让ListContainer的props也是不可变的，所以抽出来了heroIdMap。另外把list放到了redux的store里，同时用useSelector筛选出组件所需要的数据，能够避免因改动到整个list引起的re-render
#### 优化效果

- 操作heroRadio后，只会re-render发生改变的那个组件，其他组件均不发生重渲染

## 总结

- 减少数据的变动范围，尽量让数据不可变
- 打平数据，减少数据嵌套，避免让一次改动影响到其他数据

## 参考
- [https://mp.weixin.qq.com/s/6SIIi4kx1jbZ7vPCtSCDIw](https://mp.weixin.qq.com/s/6SIIi4kx1jbZ7vPCtSCDIw)

- [https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)

- [https://segmentfault.com/a/1190000017270785](https://segmentfault.com/a/1190000017270785)

- [https://www.yuque.com/marckon/react-redux.cn/usage#2gehtf](https://www.yuque.com/marckon/react-redux.cn/usage#2gehtf)

- [https://juejin.cn/post/6844903865926549511](https://juejin.cn/post/6844903865926549511) 可以多看看

- [https://juejin.cn/post/6919667933861904392](https://juejin.cn/post/6919667933861904392)  可以多看看



