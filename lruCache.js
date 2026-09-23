//======================================
// LRU Cache / Problem Solving---
//======================================

class LRUCache {
    //  capacity---
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity must be a positive integer");
        }
        this.capacity = capacity;
        this.cache = new Map();
    }

    // -1 if not found--
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // Delete item and set item---
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    // Put value---
    put(key, value) {
        // delete previous key---
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Delete least Recently Used Key(LRU)---
        else if (this.cache.size >= this.capacity) {
            const leastRecentlyUsedKey = this.cache.keys().next().value;
            console.log(`Cache limit reached (${this.capacity}). Removing LRU key: "${leastRecentlyUsedKey}"`);
            this.cache.delete(leastRecentlyUsedKey);
        }

        // insert new value---
        this.cache.set(key, value);
    }

    // Display Output---
    display() {
        const items = Array.from(this.cache.entries())
            .map(([k, v]) => `${k}:${v}`)
            .join(" -> ");
        console.log(`Current Cache (LRU -> MRU): [ ${items} ]`);
    }
}

// Output Check----> console---
console.log("LRU Cache Demo");

const cache = new LRUCache(3);

console.log('put A = 100');
cache.put("A", 100);
cache.display();

console.log('put B = 200');
cache.put("B", 200);
cache.display();

console.log('put C = 300');
cache.put("C", 300);
cache.display();

console.log('get = A');
cache.get("A");
cache.display();

console.log('put D = 1000000');
cache.put("D", 1000000);
cache.display();

console.log('get A ->', cache.get("A"));
console.log('get B ->', cache.get("B"));
console.log('get C ->', cache.get("C"));
console.log('get D ->', cache.get("D"));

console.log("Demo Complete");

