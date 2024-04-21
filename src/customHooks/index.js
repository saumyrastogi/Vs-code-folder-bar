import { useState, useEffect } from "react";

export const useLocalStorage = (field) => {
    const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem(field)));

    useEffect(() => {
        if (JSON.parse(localStorage.getItem(field)) != null && localData == null) {
            localStorage.removeItem(key);
        }
        else
            localStorage.setItem(field, JSON.stringify(localData));
    }, [localData]);

    const setData = (data) => {
        setLocalData(data);
    };

    const deleteData = () => {
        if (localData) {
            setLocalData(null);
        }
    }

    return [localData, setData, deleteData];
};

export const useTreeTraversal = (tree) => {
    const [newTree, setNewTree] = useState(tree);
    const insertNode = (name, node, isFolder, searchTree) => {
        let tempTree = { ...searchTree };
        if (node.id == tempTree.id) {
            let newObj = { name, isFolder, id: new Date, children: [] }
            tempTree = { ...tempTree, children: tempTree.children.unshift(newObj) };
            return tempTree;
        }
        else if (tempTree.children.length) {
            let updatedChildren = tempTree.children?.map(child => child.isFolder && insertNode(name, node, isFolder, child));
            tempTree = { ...tempTree, children: updatedChildren };
            setNewTree(tempTree);
        }
    }

    return [newTree, insertNode];
}