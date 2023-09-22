import {
    ISelectTree,
    ITree,
    IOptions,
    ISelectTreeOptions,
    ITreeOptions
} from "@ainiteam/quick-vue3-ui";
/*
 *@Description: 常用其他工具库
 *@Author: 土豆哥
 *@Date: 2022-12-02 01:28:55
 */

//下拉框格式化
export const selectFormat = (data: any, options: IOptions = {}) => {
    const arr: IOptions[] = [];
    const defaultOptions = {
        label: "label",
        value: "value"
    };
    const label =
        options && options.label ? options.label : defaultOptions.label;
    const value =
        options && options.value ? options.value : defaultOptions.value;
    data.forEach((element: any) => {
        arr.push({
            label: element[label],
            value: element[value]
        });
    });
    return arr;
};

//下拉框树格式化
export const selectTreeFormat = (data: any, options?: ISelectTreeOptions) => {
    const arr: ISelectTree[] = [];
    const defaultOptions = {
        value: "value",
        label: "label",
        children: "children"
    };
    const label =
        options && options.label ? options.label : defaultOptions.label;
    const value =
        options && options.value ? options.value : defaultOptions.value;
    const children =
        options && options.children
            ? options.children
            : defaultOptions.children;
    data.forEach((element: ISelectTree) => {
        const obj: ISelectTree = {
            label: element[label],
            value: element[value],
            children: []
        };
        if (element[children] && element[children].length > 0) {
            obj.children = selectTreeFormat(element[children], options);
        }
        arr.push(obj);
    });
    return arr;
};
//树格式化
export const treeFormat = (data: any, options?: ITreeOptions) => {
    const arr: ITree[] = [];
    const defaultOptions = {
        id: "id",
        label: "label",
        children: "children"
    };
    const label =
        options && options.label ? options.label : defaultOptions.label;
    const id = options && options.id ? options.id : defaultOptions.id;
    const children =
        options && options.children
            ? options.children
            : defaultOptions.children;
    data.forEach((element: ITree) => {
        const obj: ITree = {
            label: element[label],
            id: element[id],
            children: []
        };
        if (element[children] && element[children].length > 0) {
            obj.children = treeFormat(element[children], options);
        }
        arr.push(obj);
    });
    return arr;
};

//列表转下拉框树
export const listToSelectTree = (data: any, pId: any, options?: any) => {
    const defaultOptions = {
        value: "value",
        label: "label",
        pId: "pId",
        sort: "sort"
    };
    const value =
        options && options.value ? options.value : defaultOptions.value;
    const label =
        options && options.label ? options.label : defaultOptions.label;
    const parentId = options && options.pId ? options.pId : defaultOptions.pId;
    const arr: any = [];
    let children = [];
    const nodeData = data.filter((x: any) => x[parentId] === pId);
    nodeData.forEach((element: any) => {
        children = listToSelectTree(data, element[value], options);
        arr.push({
            value: element[value],
            label: element[label],
            children
        });
    });
    return arr;
};

//列表转树
export const listToTree = (data: any, pId: any, options?: any) => {
    const defaultOptions = {
        id: "id",
        label: "label",
        pId: "pId",
        sort: "sort"
    };
    const id = options && options.id ? options.id : defaultOptions.id;
    const label =
        options && options.label ? options.label : defaultOptions.label;
    const parentId = options && options.pId ? options.pId : defaultOptions.pId;
    const arr: any = [];
    let children = [];
    const nodeData = data.filter((x: any) => x[parentId] === pId);
    nodeData.forEach((element: any) => {
        children = listToTree(data, element[id], options);
        arr.push({
            id: element[id],
            label: element[label],
            children
        });
    });
    return arr;
};

//列表转表格树
export const listToTableTree = (data: any, pId: any, options?: any) => {
    const defaultOptions = {
        id: "id",
        pId: "pId",
        sort: "sort"
    };
    const value = options && options.id ? options.id : defaultOptions.id;
    const parentId = options && options.pId ? options.pId : defaultOptions.pId;
    const sort = options && options.sort ? options.sort : defaultOptions.sort;
    const arr: any = [];
    let children = [];
    const nodeData = data.filter((x: any) => x[parentId] === pId);
    const nodeSort = nodeData.sort((a: any, b: any) => {
        return a[sort] - b[sort];
    });
    nodeSort.forEach((element: any) => {
        children = listToTableTree(data, element[value], options);
        arr.push({ ...element, children });
    });
    return arr;
};
// json的key下划线转驼峰
export const toTuofeng = (str: string) => {
    if (!str) {
        return str;
    }
    return str.replace(/"(\w)+":/g, (all) => {
        if (all.indexOf("_") === -1) {
            return all;
        }
        let str1 = "";
        all.split("_").forEach((element, index) => {
            if (index <= 0) {
                str1 += element;
            } else {
                str1 += element.slice(0, 1).toUpperCase() + element.slice(1);
            }
        });
        return str1;
    });
};
export const validatePermission = (val: boolean | undefined) => {
    if (val === true) {
        return true;
    }
    return false;
};
