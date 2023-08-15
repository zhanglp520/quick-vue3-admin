import * as XLSX from "xlsx";

/*
 *@Description: 导出文件，请求参数增参数responseType: blob或arraybuffer
 *@Author: 土豆哥
 *@Date: 2022-12-02 01:03:27
 */
export const exportFile = (file: any, fileName: string, type: string) => {
    const blob = new Blob([file], { type });
    const link = document.createElement("a");
    const href = window.URL.createObjectURL(blob);
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
};
export const downloadExcel = (file: any, fileName: string) => {
    exportFile(file, `${fileName}.xlsx`, "application/vnd.ms-excel");
};
export const downloadWord = (file: any, fileName: string) => {
    exportFile(file, `${fileName}.docx`, "application/msword");
};
export const exportExcel = (dataList: any, fileName: string, columns: any) => {
    const list: any = [];
    if (columns) {
        dataList.forEach((element: any) => {
            const item: any = {};
            Object.keys(element).forEach((key) => {
                const obj = columns.filter((x: any) => x.value === key);
                if (obj && obj[0]) {
                    const test = obj[0];
                    item[test.label] = element[key];
                }
            });
            list.push(item);
        });
    } else {
        list.push(...dataList);
    }
    const data = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, data, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};
