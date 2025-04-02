import { Injectable } from '@nestjs/common';
import { Telegraf, Markup, session, Context } from 'telegraf';
import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { food } from './handlers/menu.handler';
import {
  AvailableHall,
  roomsInDanielA,
  danielWings,
  roomsInDanielB,
  roomsInDanielC,
  roomsInDanielD,
  roomsInDanielE,
  roomsInDanielF,
  roomsInDanielG,
  roomsInDanielH,
} from './handlers/hall.handler';
// import { stringify } from 'querystring';

interface MenuItem {
  name: string;
  price: number;
  vendor: string;
}

@Injectable()
export class BotService {
  private bot: Telegraf;
  // private db: PrismaClient;

  constructor(private prisma: PrismaService) {
    this.bot = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN as string);
    this.initializeHandlers();
    this.bot.use(session());
  }

  private initializeHandlers() {
    // Basic command handlers
    //start the bot
    this.bot.start((ctx) =>
      // const aboutuser = ctx;
      ctx.reply(`Welcome to SharpSharp ${ctx.message.from.first_name}❤️.
        
        \nJust quick info from SharpSharp, We all at SharpSharp cherish you ${ctx.message.from.first_name}🥰
        `),
    );
    // console.log(`User ${.message.from.first_name} started the bot`);

    this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'menu', description: 'View the food menu 🍽️' },
      { command: 'order', description: 'Place an order 🛒' },
      { command: 'deals', description: "Check out today's discounts 💰" },
      { command: 'help', description: 'Show all commands' },
    ]);

    //the help command
    this.bot.help((ctx) =>
      ctx.reply(
        `To place an other click on -/order`,
        Markup.inlineKeyboard([
          [Markup.button.callback('🍔Food', 'category_food')],
        ]),
      ),
    );

    this.bot.command('order', async (ctx) => {
      //to get userId
      const Id: number = ctx.from.id;
      const userId: string = Id.toString();

      //get user firstname
      const firstName: string = ctx.from.first_name;

      //get user lastname
      const lastName: string = ctx.message.from.last_name
        ? ctx.message.from.last_name
        : 'no last name';

        console.log(`${Id}, ${firstName}, ${lastName}`);

      await this.prisma.user.upsert({
        where: { telegramId: userId },
        update: {},
        create: {
          telegramId: userId,
          firstname: firstName,
          lastname: lastName,
        },
      });

      console.log(ctx);
      ctx.reply('choose a category: \n', food);

      this.bot.action('category_food', async (ctx) => {
        await ctx.answerCbQuery(); // Prevents "button loading" animation
        ctx.reply(
          'Select a price range:',
          Markup.inlineKeyboard([
            // [Markup.button.callback(
            //   await this.prisma.menuItem.findMany({
            //     where: {}
            //   }), 'fixate')],
            [Markup.button.callback('💲💲 $10 - $20', 'price_10_20')],
            [Markup.button.callback('💲💲💲 Above $20', 'price_above_20')],
            [Markup.button.callback('🔙 Back', 'go_back')],
          ]),
        );
      });
    });

    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    this.bot.command('oldschool', (ctx) => ctx.reply('Hello'));
    this.bot.hears('Food', (ctx) =>
      ctx.reply(
        'Food is the best thing ever. \n',
        Markup.inlineKeyboard([
          [Markup.button.callback('🍔Food', 'category_food')],
          [Markup.button.callback('🧋Drink', 'drink')],
        ]),
      ),
    );

    this.bot.command('hall', async (ctx) => {
      ctx.replyWithHTML(
        'Thank you for using SharpSharp, We love you💕.\n\n You have ordered and made payments, We appreciate that, therefore proceed to picking the hall to be delivered to.\n\n Thank you',
        AvailableHall,
      );
    });

    //daniel hall
    this.bot.action('daniel', async (ctx) => {
      await ctx.answerCbQuery(); // Prevents "button loading" animation
      ctx.reply('Choose the your wing to be delivered to:', danielWings);
    });

    this.bot.action('w1', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielA);
    });
    this.bot.action('w2', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielB);
    });
    this.bot.action('w3', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielC);
    });
    this.bot.action('w4', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielD);
    });
    this.bot.action('w5', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielE);
    });
    this.bot.action('w6', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielF);
    });
    this.bot.action('w7', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielG);
    });
    this.bot.action('w8', async (ctx) => {
      ctx.reply('Choose the room, thank you: ', roomsInDanielH);
    });


    //Joseph hall
    // this.bot.action('joseph', async (ctx) => {
    //   await ctx.answerCbQuery(); // Prevents "button loading" animation
    //   ctx.reply('Choose the your wing to be delivered to:', danielWings);
    // });

    // this.bot.action('jw1', async (ctx) => {
    //   ctx.reply('Choose the room, thank you: ', roomsInDanielA);
    // });

    // if ()
    this.bot.command('hipster', (ctx) => ctx.reply('λ'));
    console.log('Bot initialized');
  }

  async launch() {
    this.bot.launch();
    process.once('SIGINT', () => this.bot.stop('SIGINT')); // graceful shutdown
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
