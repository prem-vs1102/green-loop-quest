import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Home } from "lucide-react";
import { format } from "date-fns";

interface OrderReceiptProps {
  orderId: string;
}

const OrderReceipt = ({ orderId }: OrderReceiptProps) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (!error && data) {
        setOrder(data);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Order not found</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-eco-lg">
        <CardHeader className="text-center bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gradient">
            Order Confirmed!
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Thank you for contributing to a greener planet
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono text-sm mt-1">{order.id}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-semibold">{format(new Date(order.created_at), 'PPP')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Time</p>
              <p className="font-semibold">{format(new Date(order.created_at), 'p')}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Item Details</h3>
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-semibold capitalize">{order.ewaste_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand:</span>
                <span className="font-semibold">{order.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-semibold capitalize text-primary">{order.status}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Recycler Information</h3>
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{order.recycler_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-sm">{order.recycler_address}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Value</p>
                <p className="text-3xl font-bold text-gradient">
                  ₹{order.estimated_amount.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Reward Points</p>
                <p className="text-2xl font-semibold text-primary">
                  +{Math.round(order.estimated_amount / 10)}
                </p>
              </div>
            </div>
          </div>

          {order.validation_message && (
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Validation Details</p>
              <p className="text-sm mt-1">{order.validation_message}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Your e-waste will be collected within 3-5 business days
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              For any queries, contact support@ecotrack.com
            </p>
          </div>
        </CardContent>
      </Card>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-2xl, .max-w-2xl * {
            visibility: visible;
          }
          .max-w-2xl {
            position: absolute;
            left: 0;
            top: 0;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderReceipt;