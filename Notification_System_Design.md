# Stage 1

## Problem Statement

The campus notification application receives many notifications. Users may miss important notifications because of high volume.

To solve this, we need to display the top 10 most important unread notifications first.

## Approach

I used a Priority Inbox system.

Each notification has:

- id
- title
- weight
- created time
- read status

Only unread notifications are considered.

## Priority Calculation

Priority is calculated using:

Priority Score = Weight + Recency Score

Where:

Recency Score = 100 - hours_old

If the notification is recent, its recency score is high.

If the notification is old, its recency score becomes low.

## Example

A placement notification has high weight.

A recent notification also gets more score.

So a recent placement notification will appear at the top.

## Data Structure Used

I used Heap / Priority Queue.

Python provides heapq module for priority queue.

## Why Heap?

New notifications will keep coming.

Sorting all notifications every time is not efficient.

Using heap helps to get top 10 priority notifications efficiently.

## Steps

1. Create notification objects.
2. Check unread notifications.
3. Calculate priority score.
4. Insert unread notifications into heap.
5. Pop top 10 notifications.
6. Display them.

## Time Complexity

If there are N notifications:

Building heap takes O(N log N)

Getting top 10 takes O(10 log N)

Since we only need top 10 notifications, this is efficient.

## Conclusion

This system displays the top 10 unread priority notifications using weight and recency.