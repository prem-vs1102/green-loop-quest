import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, History, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OrderTracking from "@/components/OrderTracking";

interface Order {
  id: string;
  ewaste_type: string;
  status: string;
  recycler_name: string;
  created_at: string;
  pickup_date?: string | null;
  pickup_time_slot?: string | null;
  tracking_number?: string | null;
  estimated_amount?: number;
  brand?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchOrders();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUser(session.user);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500",
      validated: "bg-green-500",
      scheduled: "bg-blue-400",
      out_for_pickup: "bg-blue-600",
      rejected: "bg-red-500",
      collected: "bg-blue-500",
      completed: "bg-primary",
      cancelled: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const pendingOrders = orders.filter(o => ["pending", "validated", "scheduled", "out_for_pickup", "collected"].includes(o.status));
  const completedOrders = orders.filter(o => ["completed", "cancelled", "rejected"].includes(o.status));

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your e-waste recycling orders</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Leaf className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Order Button - Big & Centered */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={() => navigate("/create-order")}
            size="lg"
            variant="hero"
            className="h-16 px-12 text-xl rounded-2xl shadow-eco-lg"
          >
            <Plus className="w-7 h-7 mr-3" />
            Create New Order
          </Button>
        </div>

        {/* Active Orders */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Active Orders</h2>
          {loading ? (
            <p>Loading...</p>
          ) : pendingOrders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No active orders. Create your first e-waste recycling order!
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {pendingOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
                      <div>
                        <h3 className="text-xl font-semibold capitalize">
                          {order.brand ? `${order.brand} ` : ""}{order.ewaste_type}
                        </h3>
                        <p className="text-sm text-muted-foreground">{order.recycler_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Placed {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <OrderTracking
                      status={order.status}
                      pickupDate={order.pickup_date}
                      pickupTimeSlot={order.pickup_time_slot}
                      trackingNumber={order.tracking_number}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Previous Orders */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No previous orders yet
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold capitalize">{order.ewaste_type}</h3>
                        <p className="text-sm text-muted-foreground">{order.recycler_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;