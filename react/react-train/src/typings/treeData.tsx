export interface TreeData {
    name: string,
    key: string,
    type: string,
    collapsed: boolean,
    children?: TreeData[],
    parent: TreeData,
    checked?: boolean,
    loading?: boolean
}