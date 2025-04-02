// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Telegraf, session, Scenes } from 'telegraf';
// import { AuthScene } from './scenes/auth.scene';
// import { MenuScene } from './scenes/menu.scene';
// import { OrderScene } from './scenes/order.scene';
// // import { PaymentScene } from './scenes/payment.scene';
// // import { DeliveryScene } from './scenes/delivery.scene';
// // import { FeedbackScene } from './scenes/feedback.scene';
// // import { UserService } from '../user/user.service';

// @Injectable()
// export class BotService implements OnModuleInit {
//   private readonly bot: Telegraf<Scenes.SceneContext>;
//   private readonly logger = new Logger(BotService.name);
//   private stage: Scenes.Stage<Scenes.SceneContext>;

//   constructor(
//     private configService: ConfigService,
//     private userService: UserService,
//   ) {
//     // Initialize bot with token from configuration
//     this.bot = new Telegraf<Scenes.SceneContext>(
//       process.env.TELEGRAM_BOT_TOKEN as string,
//     );
    
//     // Initialize scenes
//     this.stage = new Scenes.Stage<Scenes.SceneContext>([
//       AuthScene.scene,
//       MenuScene.scene,
//       OrderScene.scene,
//       // PaymentScene.scene,
//       // DeliveryScene.scene,
//       // FeedbackScene.scene,
//     ]);
    
//     // Configure middleware
//     this.bot.use(session());
//     this.bot.use(this.stage.middleware());
    
//     // Setup command handlers
//     this.setupCommands();
//   }

//   async onModuleInit() {
//     // Start bot when application initializes
//     await this.bot.launch();
//     this.logger.log('Telegram bot started successfully');
    
//     // Enable graceful stop
//     process.once('SIGINT', () => this.bot.stop('SIGINT'));
//     process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
//   }

//   private setupCommands() {
//     // Start command
//     this.bot.command('start', async (ctx) => {
//       await ctx.reply(
//         '🥳 Welcome to Sharp Sharp! 🍽\n' +
//         '🚀 Order food from your favorite campus vendors and get it delivered fast!\n' +
//         '📧 Please enter your university email to continue.'
//       );
      
//       // Enter authentication scene
//       return ctx.scene.enter('auth');
//     });
    
//     // Help command
//     this.bot.command('help', (ctx) => {
//       return ctx.reply(
//         'How to use Sharp Sharp Bot:\n' +
//         '/start - Start ordering food\n' +
//         '/menu - View food menu\n' +
//         '/status - Check your order status\n' +
//         '/cancel - Cancel current operation\n' +
//         '/help - Show this help message'
//       );
//     });
    
//     // Menu command
//     this.bot.command('menu', async (ctx) => {
//       const telegramId = ctx.from.id.toString();
      
//       // Check if user is verified
//       const user = await this.userService.findByTelegramId(telegramId);
//       if (!user || !user.verified) {
//         await ctx.reply('Please complete verification first by using /start');
//         return ctx.scene.enter('auth');
//       }
      
//       return ctx.scene.enter('menu');
//     });
    
//     // Status command
//     this.bot.command('status', async (ctx) => {
//       const telegramId = ctx.from.id.toString();
      
//       // Check if user is verified
//       const user = await this.userService.findByTelegramId(telegramId);
//       if (!user || !user.verified) {
//         await ctx.reply('Please complete verification first by using /start');
//         return ctx.scene.enter('auth');
//       }
      
//       // TODO: Implement order status check
//       await ctx.reply('Order status feature coming soon!');
//     });
    
//     // Cancel command
//     this.bot.command('cancel', async (ctx) => {
//       await ctx.reply('Current operation cancelled.');
//       return ctx.scene.leave();
//     });
//   }

//   // Public method to send messages to users by telegram ID
//   async sendMessage(telegramId: string, message: string) {
//     try {
//       await this.bot.telegram.sendMessage(telegramId, message);
//       return true;
//     } catch (error) {
//       this.logger.error(`Failed to send message to ${telegramId}: ${error.message}`);
//       return false;
//     }
//   }
// }