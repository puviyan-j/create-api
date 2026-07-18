import type { Language, Module } from '../../../types/answers.js';

export async function createrabbitmq() {}

const connectionfile = (module: Module, language: Language) => {
  return `
${module === 'modulejs' ? 'import amqp from "amqplib"' : 'const amqp = require("amqplib")'}

class RabbitConnection {

${
  language === 'typescript'
    ? `
 private connection: null | amqp.ChannelModel;
  private isConnecting: boolean;
  private isClosing: boolean;
  private reconnecting: boolean;`
    : ''
}
  constructor() {
    this.connection = null;
    this.isConnecting = false;
    this.isClosing = false;
    this.reconnecting = false;
  }

  async connect() ${language === 'typescript' ? ': Promise<amqp.ChannelModel | undefined>' : ''} {
    if (this.connection) return this.connection;

    if (this.isConnecting) return;

    this.isConnecting = true;

    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);

      console.log("RabbitMQ connected");

      this.connection.on("close", () => {
        console.log("RabbitMQ connection closed");
        this.connection = null;
        if (!this.isClosing) {
          this.reconnect();
        }
      });

      this.connection.on("error", (err: any) => {
        console.error("RabbitMQ error", err.message);
      });

      return this.connection;
    } catch (err) {
      await this.reconnect();
    } finally {
      this.isConnecting = false;
    }
  }

  async reconnect() {
    if (this.reconnecting) return;
    try {
      this.reconnecting = true;
      while (!this.connection) {
        console.log("Trying RabbitMQ reconnect...");
        try {
          await new Promise((r) => setTimeout(r, 5000));
          await this.connect();
        } catch (error) {
          console.log("Reconnect failed");
        }
      }
    } finally {
      this.reconnecting = false;
    }
  }

  get() {
    if (!this.connection) throw new Error("RabbitMQ not connected");

    return this.connection;
  }

  async close() {
    this.isClosing = true;
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}

${module === 'modulejs' ? 'export default new RabbitConnection();' : 'module.exports = new RabbitConnection()'};`;
};

const channelfile = (module: Module, language: Language) => {
  // import type { Channel, ConfirmChannel } from "amqplib";
  return `
${module === 'modulejs' ? 'import connection from "./connection.js"' : 'const connection = require("./connection")'};

class ChannelManager {
  private channels;
  // private channels: Map<string, Channel | ConfirmChannel>;
  constructor() {
    this.channels = new Map();
  }

  async get(name${language === 'typescript' ? ': string' : ''}, type = "normal") {
    if (this.channels.has(name)) return this.channels.get(name);

    const conn = connection.get();

    const channel =
      type === "confirm"
        ? await conn.createConfirmChannel()
        : await conn.createChannel();

    channel.on("close", () => {
      console.log(\`Channel closed: ${name}\`);
      this.channels.delete(name);
    });

    channel.on("error", (err) => {
       this.channels.delete(name);
      console.log(\`Channel error ${name}:\`, err.message);
    });

    this.channels.set(name, channel);

    return channel;
  }

  clear() {
    this.channels.clear();
  }

  async close() {
    for (const channel of this.channels.values()) {
      await channel.close();
    }

    this.channels.clear();
  }
}

${module === 'modulejs' ? 'export default new ChannelManager()' : 'module.exports = new ChannelManager()'};    
    `;
};

const constants = (module: Module) => {
  if (module === 'modulejs')
    return `export const EXCHANGE = {
  ORDER: "order.exchange",
  PAYMENT: "payment.exchange",
};

export const QUEUE = {
  ORDER_CREATED: "order.created",
  PAYMENT_CREATED: "payment.created",
};

export const ROUTING_KEY = {
  ORDER_CREATED: "order.created",
  PAYMENT_CREATED: "payment.created",
};`;

  return `exports.EXCHANGE = {
  ORDER: "order.exchange",
  PAYMENT: "payment.exchange",
};

exports.QUEUE = {
  ORDER_CREATED: "order.created",
  PAYMENT_CREATED: "payment.created",
};

exports.ROUTING_KEY = {
  ORDER_CREATED: "order.created",
  PAYMENT_CREATED: "payment.created",
};`;
};

const publisher = (module: Module, language: Language) => {
  return `
    ${module === 'modulejs' ? 'import channels from "./channels.js"' : 'const channels = require("./channels.js")'};

async function publish(${language === 'typescript' ? 'exchange: string, key: string, message: any' : 'exchange,key,message'}) {
  const channel = await channels.get("publisher");

  await channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}

 ${module === 'modulejs' ? 'export { publish }' : 'module.exports = { publish }'};
    `;
};

const topology = (module: Module, language: Language) => {
  return `
${module === 'modulejs' ? 'import channelManager from "./channels.js"' : ''};
${module === 'modulejs' ? 'import { EXCHANGE, QUEUE, ROUTING_KEY } from "./constants.js"' : ''};

const topology = [
  {
    exchange: EXCHANGE.ORDER,
    type: "direct",
    queues: [
      {
        name: QUEUE.ORDER_CREATED,
        key: ROUTING_KEY.ORDER_CREATED,
      },
      {
        name: "order.delete",
        key: "order.delete",
      },
    ],
  },
];

async function initialize() {
  const channel = await channelManager.get("publisher");

  for (const item of topology) {
    await channel.assertExchange(item.exchange, item.type, {
      durable: true,
    });

    for (const q of item.queues) {
      if (process.env.NODE_env === "development") {
        await channel.deleteQueue(q.name);
      }
      await channel.assertQueue(q.name, {
        durable: true,
      });

      await channel.bindQueue(q.name, item.exchange, q.key);
    }
  }

  console.log("RabbitMQ topology ready");
}

${module === 'modulejs' ? 'export { initialize }' : ''};

    `;
};

const main = (module: Module, language: Language) => {
  return `
${module === 'modulejs' ?'import  connection from "./connection.js"':'const  connection = require("./connection.js")'};
${module === 'modulejs' ?'import  { consumer, consumerp } from "./consumer.js"':'const  { consumer, consumerp } = require("./consumer.js")'};
${module === 'modulejs' ?'import  { initialize } from "./topology.js"':'const  { initialize } = require("./topology.js")'};

async function rabbitmq() {
  await connection.connect();
  await initialize();
  await consumer();
  await consumerp();
}

async function rabbitclose() {
  await connection.close();
}

${module === 'modulejs'?'export { rabbitmq ,rabbitclose}':'module.exports = { rabbitmq ,rabbitclose}'};`;
};


