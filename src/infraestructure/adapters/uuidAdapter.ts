import { v4 as uuidv4 } from 'uuid';
class UUIDv4Adapter {
  private static instance: UUIDv4Adapter;

  private constructor() {}

  public static getInstance(): UUIDv4Adapter {
    if (!UUIDv4Adapter.instance) {
      UUIDv4Adapter.instance = new UUIDv4Adapter();
    }
    return UUIDv4Adapter.instance;
  }

  generate(): string {
    return uuidv4();
  }

  validate(uuid: string): boolean {
    // Basic format validation (8-4-4-4-12)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}

export default UUIDv4Adapter;