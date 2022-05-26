import { Storage } from "@ionic/storage";

export class IonicStorage {
  private _storage: Storage | null = null;

  public async init() {
    if (this.isInitialized()) {
      return;
    }
    const storage = new Storage();
    this._storage = await storage.create();
  }

  private isInitialized(): boolean {
    return this._storage instanceof Storage;
  }

  public set(key: string, value: unknown) {
    if (!this.isInitialized()) {
      throw new Error("IonicStorage is not initialized");
    }
    return this._storage!.set(key, value);
  }

  public get(key: string) {
    if (!this.isInitialized()) {
      throw new Error("IonicStorage is not initialized");
    }
    return this._storage!.get(key);
  }

  public remove(key: string) {
    if (!this.isInitialized()) {
      throw new Error("IonicStorage is not initialized");
    }
    return this._storage!.remove(key);
  }
}
