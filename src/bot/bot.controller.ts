
import { Controller, OnModuleInit } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('telegram')
export class BotController implements OnModuleInit {
  constructor(private readonly botService: BotService) {}

  onModuleInit() {
    // Automatically launch the bot when the module initializes
    this.botService.launch();
    // @Post()
  }
}

