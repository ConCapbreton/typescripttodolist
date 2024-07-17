import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance
  const itemEntryButton = document.getElementById("addItem") as HTMLButtonElement
  itemEntryButton.addEventListener("click", (event: MouseEvent): void => {
    event.preventDefault()
    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim() // trims white spaces on the entry
    if (!newEntryText.length) return

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length -1].id + 1) : 1
    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    template.render(fullList)
  })

  const clearItems = document.getElementById("clearItemButton") as HTMLButtonElement

  clearItems.addEventListener("click", (): void => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)

}

document.addEventListener("DOMContentLoaded", initApp) //dont run Javascript until the DOM is loaded