const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.token, totalShards: 2 });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}\nWorking....`));
