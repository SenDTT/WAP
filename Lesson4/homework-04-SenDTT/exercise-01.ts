// exercise 1

export type Item = { id: string, title: string; };

let data: Readonly<Item[]> = Object.freeze([]);

export function get_items(): readonly Item[] {
    return data;
}

export function add_item(new_item: Item): boolean {
    // add item (if id does not exist)
    if (data.some(item => item.id == new_item.id)) return false;
    
    // return true if item is added successfully, false otherwise
    data = Object.freeze([...data, new_item]);
    return true;
}

export function update_item_title_by_id(id: string, new_title: string): boolean {
    // update the title (if id exist)
    // return true if item is update successfully, false otherwise
    return Object.freeze(data.map(item => {
        if (item.id == id) {
            item.title = new_title;
            return true;
        }
        return false;
    }).some(item => item));
}

export function delete_item_by_id(id: string): boolean {
    // delete the item (if id exist)
    if (data.findIndex(item => item.id === id) < 0) return false;

    // return true if item is deleted successfully, false otherwise
    data = Object.freeze(data.filter(item => item.id !== id));
    return true;

}

export function get_item_title_by_id(id: string): string {
    // return the item title by id (if id exist)
    return data.find(item => item.id == id)?.title || '';
}
