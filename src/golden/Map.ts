// === Map (Hash Map) ===
//
// Simple hash map implementation with generic key (string | number) and value types.
// Uses a JS object as backing store.
//
// Steps:
// 1. Store key-value pairs in a plain object.
// 2. get(key): return store[key] or undefined.
// 3. set(key, value): store[key] = value, increment count if new key.
// 4. delete(key): delete store[key], decrement count if existed.
// 5. size(): return count.

export default class MyMap<T extends string | number, V> {
    private store: Record<string, V> = {};
    private count = 0;

    get(key: T): V | undefined {
        return this.store[String(key)];
    }

    set(key: T, value: V): void {
        if (!(String(key) in this.store)) {
            this.count++;
        }
        this.store[String(key)] = value;
    }

    delete(key: T): void {
        if (String(key) in this.store) {
            delete this.store[String(key)];
            this.count--;
        }
    }

    size(): number {
        return this.count;
    }
}
