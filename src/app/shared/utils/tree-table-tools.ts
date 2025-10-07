import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * 樹狀表格節點介面
 */
export interface TreeNodeInterface {
  id: string | number;
  level?: number;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
  [key: string]: NzSafeAny;
}

/**
 * 將樹狀節點轉換為列表
 *
 * @param root 樹狀根節點
 * @returns 扁平化的節點列表
 */
function convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
  const stack: TreeNodeInterface[] = [];
  const array: TreeNodeInterface[] = [];
  const hashMap: Record<string, boolean> = {};
  stack.push({ ...root, level: 0, expand: false, _checked: false });

  while (stack.length !== 0) {
    const node = stack.pop()!;
    visitNode(node, hashMap, array);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ ...node.children[i], level: node.level! + 1, _checked: false, expand: false, parent: node });
      }
    }
  }

  return array;
}

/**
 * 訪問節點並添加到數組
 */
function visitNode(node: TreeNodeInterface, hashMap: Record<string, boolean>, array: TreeNodeInterface[]): void {
  if (!hashMap[node.id]) {
    hashMap[node.id] = true;
    array.push(node);
  }
}

/**
 * 將樹狀數據轉換為 Map 格式
 *
 * @param dataList 樹狀數據列表
 * @returns Map 格式的樹狀數據，key 為節點 id
 */
export const fnTreeDataToMap = function tableToTreeData(dataList: NzSafeAny[]): Record<string, TreeNodeInterface[]> {
  const mapOfExpandedData: Record<string, TreeNodeInterface[]> = {};
  dataList.forEach(item => {
    mapOfExpandedData[item.id] = convertTreeToList(item);
  });
  return mapOfExpandedData;
};

/**
 * 將具有父子關係的扁平數組轉換為樹狀結構
 *
 * @param data 扁平數組，每個元素包含 fatherId 屬性
 * @param fatherId 父節點 ID 的字段名，預設為 'fatherId'
 * @returns 樹狀結構數組
 */
export const fnFlatDataHasParentToTree = function translateDataToTree(data: NzSafeAny[], fatherId = 'fatherId'): NzSafeAny {
  // fatherId=0 的數據為頂層數據
  const parents = data.filter(value => value[fatherId] === 0 || value[fatherId] === null);
  const children = data.filter(value => value[fatherId] !== 0 && value[fatherId] !== null);

  // 遞歸構建樹狀結構
  const translator = (parents: NzSafeAny[], children: NzSafeAny[]): NzSafeAny => {
    parents.forEach(parent => {
      children.forEach((current, index) => {
        if (current[fatherId] === parent.id) {
          const temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          if (typeof parent.children !== 'undefined') {
            parent.children.push(current);
          } else {
            parent.children = [current];
          }
        }
      });
    });
  };

  translator(parents, children);
  return parents;
};

/**
 * 為樹狀結構數據添加層級標記
 *
 * @param array 樹狀數據數組
 * @param levelName 層級字段名，預設為 'level'
 * @param childrenName 子節點字段名，預設為 'children'
 * @returns 添加層級後的樹狀數據
 */
export const fnAddTreeDataGradeAndLeaf = function AddTreeDataGradeAndLeaf(
  array: NzSafeAny[],
  levelName = 'level',
  childrenName = 'children'
): NzSafeAny[] {
  const recursive = (array: NzSafeAny[], level = 0): NzSafeAny => {
    level++;
    return array.map((v: NzSafeAny) => {
      v[levelName] = level;
      const child = v[childrenName];
      if (child && child.length > 0) {
        v.isLeaf = false;
        recursive(child, level);
      } else {
        v.isLeaf = true;
      }
      return v;
    });
  };
  return recursive(array);
};

/**
 * 將樹狀數據扁平化
 *
 * @param dataList 樹狀數據列表
 * @returns 扁平化的節點數組
 */
export const fnFlattenTreeDataByDataList = function flattenTreeData(dataList: NzSafeAny[]): TreeNodeInterface[] {
  const mapOfExpandedData: Record<string, TreeNodeInterface[]> = fnTreeDataToMap(dataList);
  return fnGetFlattenTreeDataByMap(mapOfExpandedData);
};

/**
 * 從 Map 格式獲取扁平化的樹狀數據
 *
 * @param mapOfExpandedData Map 格式的樹狀數據
 * @returns 扁平化的節點數組
 */
export const fnGetFlattenTreeDataByMap = function getFlattenTreeData(
  mapOfExpandedData: Record<string, TreeNodeInterface[]>
): TreeNodeInterface[] {
  const targetArray: TreeNodeInterface[] = [];
  Object.values(mapOfExpandedData).forEach(item => {
    item.forEach(item_1 => {
      targetArray.push(item_1);
    });
  });
  return targetArray;
};
