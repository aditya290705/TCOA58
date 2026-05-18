from datetime import datetime, timedelta
import heapq

class Notification:
    def __init__(self, id, title, weight, created_at, read=False):
        self.id = id
        self.title = title
        self.weight = weight
        self.created_at = created_at
        self.read = read

    def priority_score(self):
        current_time = datetime.now()

        hours_old = (current_time - self.created_at).total_seconds() / 3600

        recency_score = max(0, 100 - hours_old)

        return self.weight + recency_score

    def __lt__(self, other):
        return self.priority_score() > other.priority_score()


def get_top_notifications(notifications, n=10):
    heap = []

    for notification in notifications:
        if not notification.read:
            heapq.heappush(heap, notification)

    top_notifications = []

    for i in range(min(n, len(heap))):
        top_notifications.append(heapq.heappop(heap))

    return top_notifications


notifications = [
    Notification(1, "Placement drive by TCS", 90, datetime.now() - timedelta(hours=1)),
    Notification(2, "College event tomorrow", 50, datetime.now() - timedelta(hours=5)),
    Notification(3, "Exam form submission deadline", 95, datetime.now() - timedelta(hours=2)),
    Notification(4, "Workshop on Cloud Computing", 70, datetime.now() - timedelta(hours=10)),
    Notification(5, "Sports day registration", 40, datetime.now() - timedelta(hours=3)),
    Notification(6, "Amazon internship opportunity", 100, datetime.now() - timedelta(hours=4)),
    Notification(7, "Library book return reminder", 30, datetime.now() - timedelta(hours=6)),
    Notification(8, "Hackathon registration open", 85, datetime.now() - timedelta(hours=8)),
    Notification(9, "Seminar on AI", 60, datetime.now() - timedelta(hours=7)),
    Notification(10, "Project submission deadline", 98, datetime.now() - timedelta(hours=1)),
    Notification(11, "Cultural fest notice", 45, datetime.now() - timedelta(hours=12)),
    Notification(12, "Infosys placement update", 88, datetime.now() - timedelta(hours=2)),
    Notification(13, "Fee payment reminder", 75, datetime.now() - timedelta(hours=9)),
    Notification(14, "Guest lecture notice", 55, datetime.now() - timedelta(hours=11)),
    Notification(15, "Microsoft hiring challenge", 99, datetime.now() - timedelta(hours=3)),
]

top_10 = get_top_notifications(notifications, 10)

print("Top 10 Priority Unread Notifications:\n")

for index, notification in enumerate(top_10, start=1):
    print(index, ".", notification.title)
    print("   Weight:", notification.weight)
    print("   Priority Score:", round(notification.priority_score(), 2))
    print("   Created At:", notification.created_at.strftime("%Y-%m-%d %H:%M:%S"))
    print()