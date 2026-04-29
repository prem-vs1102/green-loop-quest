import { CheckCircle2, Circle, Truck, Calendar, PackageCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackingProps {
  status: string;
  pickupDate?: string | null;
  pickupTimeSlot?: string | null;
  trackingNumber?: string | null;
}

const STAGES = [
  { key: "pending", label: "Order Placed", icon: Circle },
  { key: "validated", label: "AI Validated", icon: CheckCircle2 },
  { key: "scheduled", label: "Pickup Scheduled", icon: Calendar },
  { key: "out_for_pickup", label: "Out for Pickup", icon: Truck },
  { key: "collected", label: "Collected", icon: PackageCheck },
  { key: "completed", label: "Recycled", icon: CheckCircle2 },
];

const order = ["pending", "validated", "scheduled", "out_for_pickup", "collected", "completed"];

export const OrderTracking = ({ status, pickupDate, pickupTimeSlot, trackingNumber }: OrderTrackingProps) => {
  const currentIdx = order.indexOf(status);
  const isRejected = status === "rejected" || status === "cancelled";

  return (
    <div className="space-y-4">
      {trackingNumber && (
        <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-4">
          <div>
            <p className="text-sm text-muted-foreground">Tracking Number</p>
            <p className="font-mono font-semibold text-base">{trackingNumber}</p>
          </div>
          {pickupDate && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                <Clock className="w-4 h-4" /> Pickup
              </p>
              <p className="font-semibold">{pickupDate}</p>
              {pickupTimeSlot && <p className="text-sm text-muted-foreground">{pickupTimeSlot}</p>}
            </div>
          )}
        </div>
      )}

      {isRejected ? (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center font-semibold">
          Order {status}
        </div>
      ) : (
        <ol className="relative border-l-2 border-border ml-3 space-y-6 py-2">
          {STAGES.map((stage, idx) => {
            const done = idx <= currentIdx;
            const active = idx === currentIdx;
            const Icon = stage.icon;
            return (
              <li key={stage.key} className="ml-6">
                <span
                  className={cn(
                    "absolute -left-[14px] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-background transition-colors",
                    done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    active && "animate-pulse"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <p className={cn("font-semibold", done ? "text-foreground" : "text-muted-foreground")}>
                  {stage.label}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default OrderTracking;
