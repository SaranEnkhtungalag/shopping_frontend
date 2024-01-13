type Item = {
    itemID: number,
    itemName: string,
    quantity: number,
    categoryID: Category,
    done: boolean
}

type Category = {
    categoryID: number,
    categoryName: string,
}

type Categorized = Category & {
    items: Item[]
}

export function categorizeItemList(items: Item[]) {
    const keys: number[] = []
    const list = items.reduce((categorizedList: Categorized[], item: Item) => {
        if (!categorizedList) categorizedList = []

        const { categoryID, categoryName } = item.categoryID

        // console.log(keys, `${categoryID}`, keys.includes(`${categoryID}`))
        if (keys.includes(categoryID)) {
            const categoryItemIndex = categorizedList.findIndex((categoryItem) => categoryItem.categoryID === categoryID)
            categorizedList[categoryItemIndex].items.push(item)
        } else {
            keys.push(categoryID)
            categorizedList.push({ categoryID, categoryName, items: [item] })
        }

        return categorizedList
    }, [])

    console.log(list)

    return list || []
}
