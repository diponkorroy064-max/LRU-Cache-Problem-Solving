# LRU Cache Implementation in JavaScript

A high-performance Least Recently Used (LRU) Cache implementation in JavaScript supporting $O(1)$ average time complexity for both `get` and `put` operations.

## Data Structures Used & Implementation Logic

This implementation utilizes JavaScript's native **`Map`** object. 
In JavaScript, a `Map` remembers the original insertion order of the keys. 

- **`get(key)`**: If the key exists, it is deleted and immediately re-inserted into the `Map`. This moves the key to the end of the `Map` iterator, marking it as the **Most Recently Used (MRU)** item.
- **`put(key, value)`**: If inserting a new key exceeds the designated capacity, the first key of the `Map` iterator (`this.cache.keys().next().value`) is deleted, effectively evicting the **Least Recently Used (LRU)** item.

## Complexity Analysis

- **Time Complexity:**
  - `get(key)`: $O(1)$ average time complexity.
  - `put(key, value)`: $O(1)$ average time complexity.
- **Space Complexity:** $O(C)$ where $C$ is the capacity of the cache.

## How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone this repository:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <YOUR_REPOSITORY_FOLDER>
   
