import { Markup } from 'telegraf';

const AvailableHall: any = Markup.inlineKeyboard(
  [
    Markup.button.callback('Daniel', `daniel`),
    Markup.button.callback('Deborah', `hall_1`),
    Markup.button.callback('John', `john`),
    Markup.button.callback('Dorcas', `hall_2`),
    Markup.button.callback('Joseph', `joseph`),
    Markup.button.callback('Esther', `hall_3`),
    Markup.button.callback('Paul', 'paul'),
    Markup.button.callback('Lydia', `hall_4`),
    Markup.button.callback('Peter', 'peter'),
    Markup.button.callback('Mary', `hall_5`),
  ],
  { columns: 2 },
);

const representedWings: any = Markup.inlineKeyboard(
  [
    Markup.button.callback('A Wing', 'w1'),
    Markup.button.callback('B Wing', 'w2'),
    Markup.button.callback('C Wing', 'w3'),
    Markup.button.callback('D Wing', 'w4'),
    Markup.button.callback('E Wing', 'w5'),
    Markup.button.callback('F Wing', 'w6'),
    Markup.button.callback('G Wing', 'w7'),
    Markup.button.callback('H Wing', 'w8'),
    // Markup.button.callback('A', '1');
  ],
  { columns: 4 },
);

const occupiedRooms: any = Markup.inlineKeyboard(
  [
    Markup.button.callback('A101', 'd1'),
    Markup.button.callback('A102', 'd2'),
    Markup.button.callback('A103', 'd3'),
    Markup.button.callback('A104', 'd4'),
    Markup.button.callback('A105', 'd5'),
    Markup.button.callback('A106', 'd6'),
    Markup.button.callback('A107', 'd7'),
    Markup.button.callback('A108', 'd8'),
    Markup.button.callback('A109', 'd9'),
    Markup.button.callback('A110', 'd10'),
    Markup.button.callback('A111', 'd11'),
    Markup.button.callback('🔙 Back', 'd12'),
  ],
  // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
  { columns: 5 },
);

export { AvailableHall, representedWings, occupiedRooms };
