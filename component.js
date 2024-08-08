/**
 * 1. load data
 * 2. store and manipulate
 * 3. display the data
 * 4. recieve input interactively
 */

class Api {
    getData() {
        return [
            { keyword: 'apple', category: 'fruit' },
            { keyword: 'banana', category: 'fruit' },
            { keyword: 'cherry', category: 'fruit' },
            { keyword: 'american', category: 'cheese' },
            { keyword: 'swiss', category: 'cheese' },
            { keyword: 'brie', category: 'cheese' },
        ]
    }
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
            if(availableItem.keyword === incomingItem.keyword && 
                availableItem.category === incomingItem.category){
                // add to selected
                this.selected.push(availableItem);
                return false;
            }else{
                return true;
            }
        });
    }
    deselect(item) {

    }
}

class View {
    constructor(model) {
        this.model = model;
    }
    render() {
        return "\nAVAILABLE:\n" + this.model.available.map(item => `${item.category} ${item.keyword}`).join("\n") +
            "\nSELECTED:\n" + this.model.selected.map(item => `${item.category} ${item.keyword}`).join("\n");
    }
    select(item) {
        this.model.select(item);
    }
    deselect(item) {
        this.model.deselect(item);
    }
}

// TEST
const api = new Api();
const model = new Model(api.getData());
const view = new View(model);
console.log(view.render()); //BEFORE
view.select({ keyword: 'swiss', category: 'cheese' })
console.log("-----------------");
console.log(view.render()); //AFTER
