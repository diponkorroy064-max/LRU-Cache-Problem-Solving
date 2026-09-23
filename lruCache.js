class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity must be a positive integer");
        }
        this.capacity = capacity;
        this.cache = new Map(); // Maintains key insertion/update order
    }

    /**
     * @param {string|number} key
     * @returns {any} value or -1 if not found
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // Access করা আইটেমকে বের করে আবার সেট করছি যেন এটি Most Recently Used হয়ে যায়
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    /**
     * @param {string|number} key
     * @param {any} value
     */
    put(key, value) {
        // যদি কি (key) আগে থেকেই থাকে, ডিলিট করে রি-ইনসার্ট করব (সতেজ করার জন্য)
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // যদি নতুন কি হয় এবং ক্যাপাসিটি ফুল থাকে, তবে সবচেয়ে পুরনো (LRU) টি রিমুভ করব
        else if (this.cache.size >= this.capacity) {
            const leastRecentlyUsedKey = this.cache.keys().next().value;
            console.log(`[EVICTION] Cache limit reached (${this.capacity}). Removing LRU key: "${leastRecentlyUsedKey}"`);
            this.cache.delete(leastRecentlyUsedKey);
        }

        // নতুন কি/ভ্যালু ইনসার্ট
        this.cache.set(key, value);
    }

    /**
     * Helper method to visualize current cache status
     */
    display() {
        const items = Array.from(this.cache.entries())
            .map(([k, v]) => `${k}:${v}`)
            .join(" -> ");
        console.log(`Current Cache (LRU -> MRU): [ ${items} ]`);
    }
}

// ==========================================
// Test Demonstration (Output Check)
// ==========================================
console.log("=== LRU Cache Demo Starting ===\n");

const cache = new LRUCache(2);

console.log('1. put("A", 10)');
cache.put("A", 10);
cache.display();

console.log('\n2. put("B", 20)');
cache.put("B", 20);
cache.display();

console.log('\n3. get("A") ->', cache.get("A")); // A becomes MRU
cache.display();

console.log('\n4. put("C", 30) -> Triggers Eviction (B should be removed)');
cache.put("C", 30);
cache.display();

console.log('\n5. get("B") ->', cache.get("B")); // Expected: -1 (evicted)
console.log('6. get("C") ->', cache.get("C"));   // Expected: 30
console.log('7. get("A") ->', cache.get("A"));   // Expected: 10

console.log("\n=== Demo Complete ===");

