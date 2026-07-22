// === Linked List Cycle Detection (Floyd's Tortoise & Hare) ===
//
// Detects if a linked list has a cycle using two pointers moving at
// different speeds. Fast pointer moves 2 steps, slow moves 1 step.
// If they meet, a cycle exists.
//
// Steps:
// 1. Initialize slow and fast pointers at head
// 2. Advance slow by 1, fast by 2 each iteration
// 3. If fast reaches null, no cycle
// 4. If slow == fast, cycle detected
//
// Example:
// Detecting infinite loops in linked-list-based memory allocators
//
export default function has_cycle(head: ListNode<number> | null): boolean {
    if (!head) return false;
    let slow: ListNode<number> | null = head;
    let fast: ListNode<number> | null = head;
    while (fast && fast.next) {
        slow = slow!.next!;
        fast = fast.next!.next ?? null;
        if (slow === fast) return true;
    }
    return false;
}
