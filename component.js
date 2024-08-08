/**
 * 1. load data
 * 2. store and manipulate
 * 3. display the data
 * 4. recieve input interactively
 */

function lettersOnly(s) {
    return s.replaceAll(/[^a-zA-Z]/g, "");
}
//test
console.log("lettersOnly", lettersOnly("Now is the (12:00) time."));
console.log("lettersOnly", lettersOnly("123 is the only number!!!"));

function isSameText(a, b) {
    return lettersOnly(a).toLowerCase() === lettersOnly(b).toLowerCase();
}
function startsWith(haystack, needle) {
    return lettersOnly(haystack).toLowerCase().indexOf(lettersOnly(needle).toLowerCase()) === 0;
}
function containsText(haystack, needle) {
    return lettersOnly(haystack).toLowerCase().indexOf(lettersOnly(needle).toLowerCase()) !== -1;
}
//test
console.log("isSameText", isSameText("Now is the (12:00) time.", "now is the time"));
console.log("isSameText", isSameText("Now is the (12:00) time.", "now is zthe time"));

class Api {
    getData() {
        //fake fetch()
        return [
            { popularity: 666, keyword: 'apple', category: 'fruit' },
            { popularity: 333, keyword: 'banana', category: 'fruit' },
            { popularity: 444, keyword: 'cherry', category: 'fruit' },
            { popularity: 111, keyword: 'american', category: 'cheese' },
            { popularity: 555, keyword: 'swiss', category: 'cheese' },
            { popularity: 999, keyword: 'brie', category: 'cheese' },
        ]
    }
    getCategory(category) {
        return this.getData().filter(item => isSameText(item.category, category))
    }
}
function hasSamePropertyValues(a, b, propertiesList = []) {
    for (const p of propertiesList) {
        if (!isSameText(a[p], b[p])) {
            return false;
        }
    }
    return true;
}
class Model {
    constructor(data) {
        this.available = data;
        this.selected = [];
    }
    select(incomingItem) {
        // find from available
        // remove from available
        this.available = this.available.filter(availableItem => {
            if (
                hasSamePropertyValues(
                    availableItem,
                    incomingItem,
                    [
                        "keyword",
                        "category"
                    ]
                )
            ) {
                // add to selected
                this.selected.push(availableItem);
                return false;
            } else {
                return true;
            }
        });
    }

    deselect(incomingItem) {
        this.selected = this.selected.filter(selectedItem => {
            if (
                hasSamePropertyValues(
                    selectedItem,
                    incomingItem,
                    [
                        "keyword",
                        "category"
                    ]
                )
            ) {
                this.available.push(incomingItem);
                return false;
            } else {
                return true;
            }
        });
    }
}

class View {
    constructor(model) {
        this.model = model;
    }
    item(item) {
        return `\t${item.category}: ${item.keyword}`;
    }
    list(name, list) {
        return `
${name.toUpperCase()}:
${list.map(this.item).join("\n")}
        `;
    }
    render() {
        return this.list("AVAILABLE", this.model.available) + this.list("SELECTED", this.model.selected);
    }
    onChange(){
        this.render();
        console.log("onChange", this);
    }
    select(item) {
        this.model.select(item);
        this.onChange();
    }
    deselect(item) {
        this.model.deselect(item);
        this.onChange();
    }
}

// TEST
class Item {
    constructor(keyword = "", category = "") {
        this.keyword = keyword;
        this.category = category;
    }
}
const api = new Api();
const model = new Model(api.getData());
const view = new View(model);

console.log("\n--- INITIAL STATE ---");
console.log(view.render()); //BEFORE

view.select(new Item('swiss', 'cheese'));
view.select(new Item('cherry', 'fruit'));
view.select(new Item('apple', 'fruit'));
view.select(new Item('american', 'cheese'));

console.log("\n--- AFTER SELECTING ---");
console.log(view.render());

view.deselect(new Item('apple', 'fruit'));
view.deselect(new Item('american', 'cheese'));

console.log("\n--- AFTER REMOVING ---");
console.log(view.render()); 
