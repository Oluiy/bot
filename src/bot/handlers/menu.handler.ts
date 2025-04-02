import { Markup } from 'telegraf';

const food: any = Markup.inlineKeyboard([
  [Markup.button.callback('🍔Food', 'category_food')],
  [Markup.button.callback('🧋Drink', 'drink')],
  [Markup.button.callback('🍪Dessert', 'dessert')],
  [Markup.button.callback('🍿Snack', 'snack')],
  [Markup.button.callback('🍉Fruit', 'other')],
]);


export { food };