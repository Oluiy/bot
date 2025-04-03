import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

// Function to generate room buttons dynamically
function generateRoomButtons(hallId: string, prefix: string, floors: number, roomsPerFloor: number) {
  const buttons: InlineKeyboardButton.CallbackButton[] = [];
  
  for (let floor = 1; floor <= floors; floor++) {
    for (let room = 1; room <= roomsPerFloor; room++) {
      const roomNumber = `${prefix}${floor}${room.toString().padStart(2, '0')}`;
      // Use consistent callback data format (e.g., 'd_A_1_01' for room A101 in Daniel Hall)
      // First letter of hallId + prefix + floor + room
      const callbackData = `${hallId.charAt(0)}_${prefix}_${floor}_${room < 10 ? '0' + room : room}`;
      buttons.push(Markup.button.callback(roomNumber, callbackData));
    }
  }
  
  buttons.push(Markup.button.callback('🔙 Back', `back_${hallId}_${prefix}`));
  return Markup.inlineKeyboard(buttons, { columns: 5 });
}

// Function to generate wing buttons
function generateWingButtons(hallId: string, wings: string[]) {
  const buttons = wings.map((wing, index) => 
    Markup.button.callback(`${wing} Wing`, `${hallId.charAt(0)}w${index + 1}`)
  );
  
  buttons.push(Markup.button.callback('🔙 Back', 'back_hall'));
  return Markup.inlineKeyboard(buttons, { columns: 4 });
}

// Generate halls keyboard
const AvailableHall = Markup.inlineKeyboard(
  [
    Markup.button.callback('Daniel', 'daniel'),
    Markup.button.callback('Deborah', 'hall_1'),
    Markup.button.callback('John', 'john'),
    Markup.button.callback('Dorcas', 'hall_2'),
    Markup.button.callback('Joseph', 'joseph'),
    Markup.button.callback('Esther', 'hall_3'),
    Markup.button.callback('Paul', 'paul'),
    Markup.button.callback('Lydia', 'hall_4'),
    Markup.button.callback('Peter', 'peter'),
    Markup.button.callback('Mary', 'hall_5'),
  ],
  { columns: 2 }
);

// Define hall configurations
const hallConfigs = {
  daniel: {
    id: 'daniel',
    wings: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    floors: 4,
    roomsPerFloor: 11
  },
  joseph: {
    id: 'joseph',
    wings: ['A', 'B', 'C', 'D', 'E', 'F'],
    floors: 3,
    roomsPerFloor: 12
  }
  // Add more halls as needed
};

// Generate all wings and rooms for all halls
const hallData: Record<string, {
  wings: ReturnType<typeof generateWingButtons>,
  roomsByWing: Record<string, ReturnType<typeof generateRoomButtons>>
}> = {};

// Process each hall
Object.values(hallConfigs).forEach(hall => {
  // Generate wings for this hall
  const wingsKeyboard = generateWingButtons(hall.id, hall.wings);
  
  // Generate rooms for each wing
  const roomsByWing: Record<string, ReturnType<typeof generateRoomButtons>> = {};
  hall.wings.forEach(wing => {
    const key = `roomsIn${hall.id.charAt(0).toUpperCase() + hall.id.slice(1)}${wing}`;
    roomsByWing[key] = generateRoomButtons(hall.id, wing, hall.floors, hall.roomsPerFloor);
  });
  
  // Store data for this hall
  hallData[hall.id] = {
    wings: wingsKeyboard,
    roomsByWing
  };
});

// Extract Daniel hall data
const danielWings = hallData.daniel.wings;
const {
  roomsInDanielA,
  roomsInDanielB,
  roomsInDanielC,
  roomsInDanielD,
  roomsInDanielE,
  roomsInDanielF,
  roomsInDanielG,
  roomsInDanielH,
} = hallData.daniel.roomsByWing;

// Extract Joseph hall data
const josephWings = hallData.joseph.wings;
const {
  roomsInJosephA,
  roomsInJosephB,
  roomsInJosephC,
  roomsInJosephD,
  roomsInJosephE,
  roomsInJosephF,
  roomsInJosephG,
  roomsInJosephH,
} = hallData.joseph.roomsByWing;

// Export all generated keyboards
export {
  AvailableHall,
  // Daniel Hall exports
  danielWings,
  roomsInDanielA,
  roomsInDanielB,
  roomsInDanielC,
  roomsInDanielD,
  roomsInDanielE,
  roomsInDanielF,
  roomsInDanielG,
  roomsInDanielH,

  
  // Joseph Hall exports
  josephWings,
  roomsInJosephA,
  roomsInJosephB,
  roomsInJosephC,
  roomsInJosephD,
  roomsInJosephE,
  roomsInJosephF,
  roomsInJosephG,
  roomsInJosephH,

};


// import { Markup } from 'telegraf';
// import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

// // Function to generate room buttons dynamically
// function generateRoomButtons(prefix: string, floors: number, roomsPerFloor: number) {
//   const buttons: InlineKeyboardButton.CallbackButton[] = [];
  
//   for (let floor = 1; floor <= floors; floor++) {
//     for (let room = 1; room <= roomsPerFloor; room++) {
//       const roomNumber = `${prefix}${floor}${room.toString().padStart(2, '0')}`;
//       // Use consistent callback data format (e.g., 'd_A_1_01' for room A101)
//       buttons.push(Markup.button.callback(roomNumber, `d_${prefix}_${floor}_${room < 10 ? '0' + room : room}`));
//     }
//   }
  
//   buttons.push(Markup.button.callback('🔙 Back', `back_${prefix}`));
//   return Markup.inlineKeyboard(buttons, { columns: 5 });
// }

// // Function to generate wing buttons
// function generateWingButtons(hallId: string, wings: string[]) {
//   const buttons = wings.map((wing, index) => 
//     Markup.button.callback(`${wing} Wing`, `w${index + 1}`)
//   );
  
//   buttons.push(Markup.button.callback('🔙 Back', 'back_hall'));
//   return Markup.inlineKeyboard(buttons, { columns: 4 });
// }

// // Generate halls keyboard
// const AvailableHall = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('Daniel', 'daniel'),
//     Markup.button.callback('Deborah', 'hall_1'),
//     Markup.button.callback('John', 'john'),
//     Markup.button.callback('Dorcas', 'hall_2'),
//     Markup.button.callback('Joseph', 'joseph'),
//     Markup.button.callback('Esther', 'hall_3'),
//     Markup.button.callback('Paul', 'paul'),
//     Markup.button.callback('Lydia', 'hall_4'),
//     Markup.button.callback('Peter', 'peter'),
//     Markup.button.callback('Mary', 'hall_5'),
//   ],
//   { columns: 2 }
// );

// // Generate wings for Daniel Hall
// const danielWings = generateWingButtons('daniel', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

// // Generate all wings' rooms at once
// const wings = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
// const roomsByWing: { [key: string]: ReturnType<typeof generateRoomButtons> } = {};

// wings.forEach(wing => {
//   roomsByWing[`roomsInDaniel${wing}`] = generateRoomButtons(`${wing}`, 4, 11); // 4 floors, 11 rooms per floor
// });

// // Destructure for export
// const {
//   roomsInDanielA,
//   roomsInDanielB,
//   roomsInDanielC,
//   roomsInDanielD,
//   roomsInDanielE,
//   roomsInDanielF,
//   roomsInDanielG,
//   roomsInDanielH,
// } = roomsByWing;

// export {
//   AvailableHall,
//   danielWings,
//   roomsInDanielA,
//   roomsInDanielB,
//   roomsInDanielC,
//   roomsInDanielD,
//   roomsInDanielE,
//   roomsInDanielF,
//   roomsInDanielG,
//   roomsInDanielH,
// };
// import { Markup } from 'telegraf';

// // all possible halls of residence
// const AvailableHall: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('Daniel', `daniel`),
//     Markup.button.callback('Deborah', `hall_1`),
//     Markup.button.callback('John', `john`),
//     Markup.button.callback('Dorcas', `hall_2`),
//     Markup.button.callback('Joseph', `joseph`),
//     Markup.button.callback('Esther', `hall_3`),
//     Markup.button.callback('Paul', 'paul'),
//     Markup.button.callback('Lydia', `hall_4`),
//     Markup.button.callback('Peter', 'peter'),
//     Markup.button.callback('Mary', `hall_5`),
//   ],
//   { columns: 2 },
// );

// //list of wings
// const danielWings: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('A Wing', 'w1'),
//     Markup.button.callback('B Wing', 'w2'),
//     Markup.button.callback('C Wing', 'w3'),
//     Markup.button.callback('D Wing', 'w4'),
//     Markup.button.callback('E Wing', 'w5'),
//     Markup.button.callback('F Wing', 'w6'),
//     Markup.button.callback('G Wing', 'w7'),
//     Markup.button.callback('H Wing', 'w8'),
//     // Markup.button.callback('A', '1');
//   ],
//   { columns: 4 },
// );

// //All occupied rooms
// const roomsInDanielA: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('A101', 'd1'),
//     Markup.button.callback('A102', 'd2'),
//     Markup.button.callback('A103', 'd3'),
//     Markup.button.callback('A104', 'd4'),
//     Markup.button.callback('A105', 'd5'),
//     Markup.button.callback('A106', 'd6'),
//     Markup.button.callback('A107', 'd7'),
//     Markup.button.callback('A108', 'd8'),
//     Markup.button.callback('A109', 'd9'),
//     Markup.button.callback('A110', 'd10'),
//     Markup.button.callback('A111', 'd11'),
//     Markup.button.callback('A201', 'd21'),
//     Markup.button.callback('A202', 'd22'),
//     Markup.button.callback('A203', 'd23'),
//     Markup.button.callback('A204', 'd24'),
//     Markup.button.callback('A205', 'd25'),
//     Markup.button.callback('A206', 'd26'),
//     Markup.button.callback('A207', 'd27'),
//     Markup.button.callback('A208', 'd28'),
//     Markup.button.callback('A209', 'd29'),
//     Markup.button.callback('A210', 'd210'),
//     Markup.button.callback('A211', 'd211'),
//     Markup.button.callback('A301', 'd31'),
//     Markup.button.callback('A302', 'd32'),
//     Markup.button.callback('A303', 'd33'),
//     Markup.button.callback('A304', 'd34'),
//     Markup.button.callback('A305', 'd35'),
//     Markup.button.callback('A306', 'd36'),
//     Markup.button.callback('A307', 'd37'),
//     Markup.button.callback('A308', 'd38'),
//     Markup.button.callback('A309', 'd39'),
//     Markup.button.callback('A310', 'd310'),
//     Markup.button.callback('A311', 'd311'),
//     Markup.button.callback('A401', 'd41'),
//     Markup.button.callback('A402', 'd42'),
//     Markup.button.callback('A403', 'd43'),
//     Markup.button.callback('A404', 'd44'),
//     Markup.button.callback('A405', 'd45'),
//     Markup.button.callback('A406', 'd46'),
//     Markup.button.callback('A407', 'd47'),
//     Markup.button.callback('A408', 'd48'),
//     Markup.button.callback('A409', 'd49'),
//     Markup.button.callback('A410', 'd410'),
//     Markup.button.callback('A411', 'd411'),
//     Markup.button.callback('🔙 Back', 'd412'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );

// const roomsInDanielB: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('B101', 'dB1'),
//     Markup.button.callback('B102', 'dB2'),
//     Markup.button.callback('B103', 'dB3'),
//     Markup.button.callback('B104', 'dB4'),
//     Markup.button.callback('B105', 'dB5'),
//     Markup.button.callback('B106', 'dB6'),
//     Markup.button.callback('B107', 'dB7'),
//     Markup.button.callback('B108', 'dB8'),
//     Markup.button.callback('B109', 'dB9'),
//     Markup.button.callback('B110', 'dB10'),
//     Markup.button.callback('B111', 'dB11'),
//     Markup.button.callback('B201', 'dB21'),
//     Markup.button.callback('B202', 'dB22'),
//     Markup.button.callback('B203', 'dB23'),
//     Markup.button.callback('B204', 'dB24'),
//     Markup.button.callback('B205', 'dB25'),
//     Markup.button.callback('B206', 'dB26'),
//     Markup.button.callback('B207', 'dB27'),
//     Markup.button.callback('B208', 'dB28'),
//     Markup.button.callback('B209', 'dB29'),
//     Markup.button.callback('B210', 'dB210'),
//     Markup.button.callback('B211', 'dB211'),
//     Markup.button.callback('B301', 'dB31'),
//     Markup.button.callback('B302', 'dB32'),
//     Markup.button.callback('B303', 'dB33'),
//     Markup.button.callback('B304', 'dB34'),
//     Markup.button.callback('B305', 'dB35'),
//     Markup.button.callback('B306', 'dB36'),
//     Markup.button.callback('B307', 'dB37'),
//     Markup.button.callback('B308', 'dB38'),
//     Markup.button.callback('B309', 'dB39'),
//     Markup.button.callback('B310', 'dB310'),
//     Markup.button.callback('B311', 'dB311'),
//     Markup.button.callback('B401', 'dB41'),
//     Markup.button.callback('B402', 'dB42'),
//     Markup.button.callback('B403', 'dB43'),
//     Markup.button.callback('B404', 'dB44'),
//     Markup.button.callback('B405', 'dB45'),
//     Markup.button.callback('B406', 'dB46'),
//     Markup.button.callback('B407', 'dB47'),
//     Markup.button.callback('B408', 'dB48'),
//     Markup.button.callback('B409', 'dB49'),
//     Markup.button.callback('B410', 'dB410'),
//     Markup.button.callback('B411', 'dB411'),
//     Markup.button.callback('🔙 Back', 'dB412'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );

// const roomsInDanielC: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('C101', 'dC1'),
//     Markup.button.callback('C102', 'dC2'),
//     Markup.button.callback('C103', 'dC3'),
//     Markup.button.callback('C104', 'dC4'),
//     Markup.button.callback('C105', 'dC5'),
//     Markup.button.callback('C106', 'dC6'),
//     Markup.button.callback('C107', 'dC7'),
//     Markup.button.callback('C108', 'dC8'),
//     Markup.button.callback('C109', 'dC9'),
//     Markup.button.callback('C110', 'dC10'),
//     Markup.button.callback('C111', 'dC11'),
//     Markup.button.callback('C201', 'dC21'),
//     Markup.button.callback('C202', 'dC22'),
//     Markup.button.callback('C203', 'dC23'),
//     Markup.button.callback('C204', 'dC24'),
//     Markup.button.callback('C205', 'dC25'),
//     Markup.button.callback('C206', 'dC26'),
//     Markup.button.callback('C207', 'dC27'),
//     Markup.button.callback('C208', 'dC28'),
//     Markup.button.callback('C209', 'dC29'),
//     Markup.button.callback('C210', 'dC210'),
//     Markup.button.callback('C211', 'dC211'),
//     Markup.button.callback('C301', 'dC31'),
//     Markup.button.callback('C302', 'dC32'),
//     Markup.button.callback('C303', 'dC33'),
//     Markup.button.callback('C304', 'dC34'),
//     Markup.button.callback('C305', 'dC35'),
//     Markup.button.callback('C306', 'dC36'),
//     Markup.button.callback('C307', 'dC37'),
//     Markup.button.callback('C308', 'dC38'),
//     Markup.button.callback('C309', 'dC39'),
//     Markup.button.callback('C310', 'dC310'),
//     Markup.button.callback('C311', 'dC311'),
//     Markup.button.callback('C401', 'dC41'),
//     Markup.button.callback('C402', 'dC42'),
//     Markup.button.callback('C403', 'dC43'),
//     Markup.button.callback('C404', 'dC44'),
//     Markup.button.callback('C405', 'dC45'),
//     Markup.button.callback('C406', 'dC46'),
//     Markup.button.callback('C407', 'dC47'),
//     Markup.button.callback('C408', 'dC48'),
//     Markup.button.callback('C409', 'dC49'),
//     Markup.button.callback('C410', 'dC410'),
//     Markup.button.callback('C411', 'dC411'),
//     Markup.button.callback('🔙 Back', 'dC412'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );
// const roomsInDanielD: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('D101', 'dD1'),
//     Markup.button.callback('D102', 'dD2'),
//     Markup.button.callback('D103', 'dD3'),
//     Markup.button.callback('D104', 'dD4'),
//     Markup.button.callback('D105', 'dD5'),
//     Markup.button.callback('D106', 'dD6'),
//     Markup.button.callback('D107', 'dD7'),
//     Markup.button.callback('D108', 'dD8'),
//     Markup.button.callback('D109', 'dD9'),
//     Markup.button.callback('D110', 'dD10'),
//     Markup.button.callback('D111', 'dD11'),
//     Markup.button.callback('D201', 'dD21'),
//     Markup.button.callback('D202', 'dD22'),
//     Markup.button.callback('D203', 'dD23'),
//     Markup.button.callback('D204', 'dD24'),
//     Markup.button.callback('D205', 'dD25'),
//     Markup.button.callback('D206', 'dD26'),
//     Markup.button.callback('D207', 'dD27'),
//     Markup.button.callback('D208', 'dD28'),
//     Markup.button.callback('D209', 'dD29'),
//     Markup.button.callback('D210', 'dD210'),
//     Markup.button.callback('D211', 'dD211'),
//     Markup.button.callback('D301', 'dD31'),
//     Markup.button.callback('D302', 'dD32'),
//     Markup.button.callback('D303', 'dD33'),
//     Markup.button.callback('D304', 'dD34'),
//     Markup.button.callback('D305', 'dD35'),
//     Markup.button.callback('D306', 'dD36'),
//     Markup.button.callback('D307', 'dD37'),
//     Markup.button.callback('D308', 'dD38'),
//     Markup.button.callback('D309', 'dD39'),
//     Markup.button.callback('D310', 'dD310'),
//     Markup.button.callback('D311', 'dD311'),
//     Markup.button.callback('D401', 'dD41'),
//     Markup.button.callback('D402', 'dD42'),
//     Markup.button.callback('D403', 'dD43'),
//     Markup.button.callback('D404', 'dD44'),
//     Markup.button.callback('D405', 'dD45'),
//     Markup.button.callback('D406', 'dD46'),
//     Markup.button.callback('D407', 'dD47'),
//     Markup.button.callback('D408', 'dD48'),
//     Markup.button.callback('D409', 'dD49'),
//     Markup.button.callback('D410', 'dD410'),
//     Markup.button.callback('D411', 'dD411'),
//     Markup.button.callback('🔙 Back', 'dD412'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );
// const roomsInDanielE: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('E101', 'dE1'),
//     Markup.button.callback('E102', 'dE2'),
//     Markup.button.callback('E103', 'dE3'),
//     Markup.button.callback('E104', 'dE4'),
//     Markup.button.callback('E105', 'dE5'),
//     Markup.button.callback('E106', 'dE6'),
//     Markup.button.callback('E107', 'dE7'),
//     Markup.button.callback('E108', 'dE8'),
//     Markup.button.callback('E109', 'dE9'),
//     Markup.button.callback('E110', 'dE10'),
//     Markup.button.callback('E111', 'dE11'),
//     Markup.button.callback('E201', 'dE21'),
//     Markup.button.callback('E202', 'dE22'),
//     Markup.button.callback('E203', 'dE23'),
//     Markup.button.callback('E204', 'dE24'),
//     Markup.button.callback('E205', 'dE25'),
//     Markup.button.callback('E206', 'dE26'),
//     Markup.button.callback('E207', 'dE27'),
//     Markup.button.callback('E208', 'dE28'),
//     Markup.button.callback('E209', 'dE29'),
//     Markup.button.callback('E210', 'dE210'),
//     Markup.button.callback('E211', 'dE211'),
//     Markup.button.callback('E301', 'dE31'),
//     Markup.button.callback('E302', 'dE32'),
//     Markup.button.callback('E303', 'dE33'),
//     Markup.button.callback('E304', 'dE34'),
//     Markup.button.callback('E305', 'dE35'),
//     Markup.button.callback('E306', 'dE36'),
//     Markup.button.callback('E307', 'dE37'),
//     Markup.button.callback('E308', 'dE38'),
//     Markup.button.callback('E309', 'dE39'),
//     Markup.button.callback('E310', 'dE310'),
//     Markup.button.callback('E311', 'dE311'),
//     Markup.button.callback('E401', 'dE41'),
//     Markup.button.callback('E402', 'dE42'),
//     Markup.button.callback('E403', 'dE43'),
//     Markup.button.callback('E404', 'dE44'),
//     Markup.button.callback('E405', 'dE45'),
//     Markup.button.callback('E406', 'dE46'),
//     Markup.button.callback('E407', 'dE47'),
//     Markup.button.callback('E408', 'dE48'),
//     Markup.button.callback('E409', 'dE49'),
//     Markup.button.callback('E410', 'dE410'),
//     Markup.button.callback('E411', 'dE411'),
//     Markup.button.callback('🔙 Back', 'dE412'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );
// const roomsInDanielF: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('F101', 'dF1'),
//     Markup.button.callback('F102', 'dF2'),
//     Markup.button.callback('F103', 'dF3'),
//     Markup.button.callback('F104', 'dF4'),
//     Markup.button.callback('F105', 'dF5'),
//     Markup.button.callback('F106', 'dF6'),
//     Markup.button.callback('F107', 'dF7'),
//     Markup.button.callback('F108', 'dF8'),
//     Markup.button.callback('F109', 'dF9'),
//     Markup.button.callback('F110', 'dF10'),
//     Markup.button.callback('F111', 'dF11'),
//     Markup.button.callback('F201', 'dF1'),
//     Markup.button.callback('F202', 'dF2'),
//     Markup.button.callback('F203', 'dF3'),
//     Markup.button.callback('F204', 'dF4'),
//     Markup.button.callback('F205', 'dF5'),
//     Markup.button.callback('F206', 'dF6'),
//     Markup.button.callback('F207', 'dF7'),
//     Markup.button.callback('F208', 'dF8'),
//     Markup.button.callback('F209', 'dF9'),
//     Markup.button.callback('F210', 'dF10'),
//     Markup.button.callback('F211', 'dF11'),
//     Markup.button.callback('F301', 'dF1'),
//     Markup.button.callback('F302', 'dF2'),
//     Markup.button.callback('F303', 'dF3'),
//     Markup.button.callback('F304', 'dF4'),
//     Markup.button.callback('F305', 'dF5'),
//     Markup.button.callback('F306', 'dF6'),
//     Markup.button.callback('F307', 'dF7'),
//     Markup.button.callback('F308', 'dF8'),
//     Markup.button.callback('F309', 'dF9'),
//     Markup.button.callback('F310', 'dF10'),
//     Markup.button.callback('F311', 'dF11'),
//     Markup.button.callback('F401', 'dF1'),
//     Markup.button.callback('F402', 'dF2'),
//     Markup.button.callback('F403', 'dF3'),
//     Markup.button.callback('F404', 'dF4'),
//     Markup.button.callback('F405', 'dF5'),
//     Markup.button.callback('F406', 'dF6'),
//     Markup.button.callback('F407', 'dF7'),
//     Markup.button.callback('F408', 'dF8'),
//     Markup.button.callback('F409', 'dF9'),
//     Markup.button.callback('F410', 'dF10'),
//     Markup.button.callback('F411', 'dF11'),
//     Markup.button.callback('🔙 Back', 'dF12'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );
// const roomsInDanielG: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('G101', 'dG1'),
//     Markup.button.callback('G102', 'dG2'),
//     Markup.button.callback('G103', 'dG3'),
//     Markup.button.callback('G104', 'dG4'),
//     Markup.button.callback('G105', 'dG5'),
//     Markup.button.callback('G106', 'dG6'),
//     Markup.button.callback('G107', 'dG7'),
//     Markup.button.callback('G108', 'dG8'),
//     Markup.button.callback('G109', 'dG9'),
//     Markup.button.callback('G110', 'dG10'),
//     Markup.button.callback('G111', 'dG11'),
//     Markup.button.callback('G201', 'dG1'),
//     Markup.button.callback('G202', 'dG2'),
//     Markup.button.callback('G203', 'dG3'),
//     Markup.button.callback('G204', 'dG4'),
//     Markup.button.callback('G205', 'dG5'),
//     Markup.button.callback('G206', 'dG6'),
//     Markup.button.callback('G207', 'dG7'),
//     Markup.button.callback('G208', 'dG8'),
//     Markup.button.callback('G209', 'dG9'),
//     Markup.button.callback('G210', 'dG10'),
//     Markup.button.callback('G211', 'dG11'),
//     Markup.button.callback('G301', 'dG1'),
//     Markup.button.callback('G302', 'dG2'),
//     Markup.button.callback('G303', 'dG3'),
//     Markup.button.callback('G304', 'dG4'),
//     Markup.button.callback('G305', 'dG5'),
//     Markup.button.callback('G306', 'dG6'),
//     Markup.button.callback('G307', 'dG7'),
//     Markup.button.callback('G308', 'dG8'),
//     Markup.button.callback('G309', 'dG9'),
//     Markup.button.callback('G310', 'dG10'),
//     Markup.button.callback('G311', 'dG11'),
//     Markup.button.callback('G401', 'dG1'),
//     Markup.button.callback('G402', 'dG2'),
//     Markup.button.callback('G403', 'dG3'),
//     Markup.button.callback('G404', 'dG4'),
//     Markup.button.callback('G405', 'dG5'),
//     Markup.button.callback('G406', 'dG6'),
//     Markup.button.callback('G407', 'dG7'),
//     Markup.button.callback('G408', 'dG8'),
//     Markup.button.callback('G409', 'dG9'),
//     Markup.button.callback('G410', 'dG10'),
//     Markup.button.callback('G411', 'dG11'),
//     Markup.button.callback('🔙 Back', 'dG12'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );
// const roomsInDanielH: any = Markup.inlineKeyboard(
//   [
//     Markup.button.callback('H101', 'dH1'),
//     Markup.button.callback('H102', 'dH2'),
//     Markup.button.callback('H103', 'dH3'),
//     Markup.button.callback('H104', 'dH4'),
//     Markup.button.callback('H105', 'dH5'),
//     Markup.button.callback('H106', 'dH6'),
//     Markup.button.callback('H107', 'dH7'),
//     Markup.button.callback('H108', 'dH8'),
//     Markup.button.callback('H109', 'dH9'),
//     Markup.button.callback('H110', 'dH10'),
//     Markup.button.callback('H111', 'dH11'),
//     Markup.button.callback('H201', 'dH1'),
//     Markup.button.callback('H202', 'dH2'),
//     Markup.button.callback('H203', 'dH3'),
//     Markup.button.callback('H204', 'dH4'),
//     Markup.button.callback('H205', 'dH5'),
//     Markup.button.callback('H206', 'dH6'),
//     Markup.button.callback('H207', 'dH7'),
//     Markup.button.callback('H208', 'dH8'),
//     Markup.button.callback('H209', 'dH9'),
//     Markup.button.callback('H210', 'dH10'),
//     Markup.button.callback('H211', 'dH11'),
//     Markup.button.callback('H301', 'dH1'),
//     Markup.button.callback('H302', 'dH2'),
//     Markup.button.callback('H303', 'dH3'),
//     Markup.button.callback('H304', 'dH4'),
//     Markup.button.callback('H305', 'dH5'),
//     Markup.button.callback('H306', 'dH6'),
//     Markup.button.callback('H307', 'dH7'),
//     Markup.button.callback('H308', 'dH8'),
//     Markup.button.callback('H309', 'dH9'),
//     Markup.button.callback('H310', 'dH10'),
//     Markup.button.callback('H311', 'dH11'),
//     Markup.button.callback('H401', 'dH1'),
//     Markup.button.callback('H402', 'dH2'),
//     Markup.button.callback('H403', 'dH3'),
//     Markup.button.callback('H404', 'dH4'),
//     Markup.button.callback('H405', 'dH5'),
//     Markup.button.callback('H406', 'dH6'),
//     Markup.button.callback('H407', 'dH7'),
//     Markup.button.callback('H408', 'dH8'),
//     Markup.button.callback('H409', 'dH9'),
//     Markup.button.callback('H410', 'dH10'),
//     Markup.button.callback('H411', 'dH11'),
//     Markup.button.callback('🔙 Back', 'dH12'),
//   ],
//   // button.map((text, i) => Markup.button.callback(text, `${i + 1}`)),
//   { columns: 5 },
// );

// export {
//   AvailableHall,
//   danielWings,
//   roomsInDanielA,
//   roomsInDanielB,
//   roomsInDanielC,
//   roomsInDanielD,
//   roomsInDanielE,
//   roomsInDanielF,
//   roomsInDanielG,
//   roomsInDanielH,
// };
