import * as mongoose from "mongoose";

export const databaseProviders = [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<mongoose.Connection> => {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        return connection.connection;
      }
        
    },
  ]