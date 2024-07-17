import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement
    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
        }
        
        clear(): void {
            this.ul.innerHTML = ""
        }

        render(fullList: FullList): void {
            this.clear()

            fullList.list.forEach(item => {
               const li = document.createElement("li") as HTMLLIElement
               li.className = "item"
               
               const check = document.createElement("input") as HTMLInputElement
               check.type = "checkbox"
               check.id = item.id // no underscore for id as the getter is getting the id
               check.tabIndex = 0
               check.checked = item.checked
               li.append(check)

               check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
               })
            
               const label = document.createElement("label") as HTMLLabelElement
               label.htmlFor = item.id
               label.textContent = item.item
               li.append(label)

               const button = document.createElement("button") as HTMLButtonElement
               button.className = "button"
               button.textContent = "X"
               li.append(button)

               button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList) //not an endless loop as it is inside the event listener
               })

               this.ul.append(li)
               
            })
        }

    }
/*

done (incorrect)
ul - tried to declare a constant but actually needed to declare that this.ul (inside the constructor) was the getElementById
my solution: const uList = getElementById()

render method should render the full list (code in HTML) - incorrect but right logic (tried to do forEach and then return a template literal)



done (correct)
create Class ListTemplate - correct
export default - correct
implement the DOMList interface - correct
make it a singleton (like fulllist) - only need this one template for the entire app
(this refers to private) - correct
clear method clears the HTML in the UL - correct

*/