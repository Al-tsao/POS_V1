// Constructor function for AlphaPos
function AlphaPos() { }
// Constructor function for Drinks
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}
const orderLists = document.querySelector('[data-order-lists]')
// new the alphaPos Instance
const alphaPos = new AlphaPos()

// =============新增功能部分開始=============

const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度、冰塊選項內容
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  console.log(drink)
  console.log(drink.price())

  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

// 1. 取得店員選擇的飲料品項、甜度、冰塊選項內容
// Constructor function for Alpha Pos System
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

// 3. 建立飲料實例，並取得飲料價格
Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}


// 4. 將飲料實例產生成左側訂單區的畫面
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}
// =============新增功能部分結束=============

// =============刪除功能部分開始=============
orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  // delete the card element
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

// 刪除功能
AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}
// =============刪除功能部分結束=============
// =============結算功能部分開始=============
AlphaPos.prototype.checkout = function () {
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    console.log(drink)
    console.log(drink.textContent)
  })
}
// =============結算功能部分結束=============
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"')
checkoutButton.addEventListener('click', function () {
  // 1. 計算訂單總金額
  alert(`Total amount of drinks：$${alphaPos.checkout()}`)

  // 2. 清空訂單
  alphaPos.clearOrder(orderLists)
})

// 1. 計算訂單總金額
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}
// 2. 清空訂單
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}
