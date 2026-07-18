import { Bell, Truck, Tag, Sprout, CreditCard } from "lucide-react";
import { EmptyState } from "../../components/ui/Primitives";
import { notifications } from "../../data/mockData";

const ICONS = { order: Truck, deal: Tag, farmer: Sprout, payment: CreditCard };

export default function Notifications() {
  return (
    <div className="px-4 md:px-8 pt-6 max-w-2xl mx-auto pb-6">
      <h1 className="font-display text-2xl font-semibold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up" description="New updates about your orders and deals will show up here." />
      ) : (
        <div className="space-y-2.5">
          {notifications.map((n) => {
            const Icon = ICONS[n.type] || Bell;
            return (
              <div key={n.id} className={`flex gap-3 rounded-2xl p-4 shadow-soft bg-white dark:bg-cardDark ${!n.read ? "ring-1 ring-primary/20" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </div>
                  <p className="text-xs text-ink/55 dark:text-white/55 mt-0.5">{n.body}</p>
                  <p className="text-[11px] text-ink/35 dark:text-white/35 mt-1.5">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
