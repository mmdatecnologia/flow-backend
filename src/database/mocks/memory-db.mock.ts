import { Db, MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

export class MemoryDb {
  private server: MongoMemoryServer
  private client: MongoClient
  private db: Db

  async initialize(): Promise<void> {
    this.server = await MongoMemoryServer.create()
    this.client = await MongoClient.connect(this.server.getUri(), { useUnifiedTopology: true })
    this.db = this.client.db('jest')
  }

  async cleanup(): Promise<void> {
    await this.ensureInitialized()
    const collections = await this.db.collections()
    await Promise.all(collections.map(async (collection) => collection.deleteMany({})))
  }

  async shutdown(): Promise<void> {
    await this.client?.close()
    await this.server?.stop()
  }

  getUri(): string {
    return this.server.getUri()
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.server || !this.client || !this.db) {
      await this.initialize()
    }
  }
}
