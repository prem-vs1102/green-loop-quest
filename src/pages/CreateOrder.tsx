import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import RecyclerMap from "@/components/RecyclerMap";
import OrderReceipt from "@/components/OrderReceipt";

const ewasteTypes = [
  { value: "laptop", label: "Laptop", icon: "💻" },
  { value: "printer", label: "Printer", icon: "🖨️" },
  { value: "mobile", label: "Mobile Phone", icon: "📱" },
  { value: "tablet", label: "Tablet", icon: "📱" },
  { value: "monitor", label: "Monitor", icon: "🖥️" },
  { value: "keyboard", label: "Keyboard", icon: "⌨️" },
  { value: "mouse", label: "Mouse", icon: "🖱️" },
  { value: "other", label: "Other", icon: "📦" },
];

const brandsByType: Record<string, string[]> = {
  laptop: [
    "Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Razer", 
    "Microsoft Surface", "Samsung", "LG", "Toshiba", "Sony", "Alienware",
    "Huawei", "Xiaomi", "Avita", "iBall", "HCL", "Wipro", "Other"
  ],
  printer: [
    "HP", "Canon", "Epson", "Brother", "Samsung", "Xerox", "Ricoh",
    "Kyocera", "Lexmark", "Konica Minolta", "Panasonic", "Dell", "Other"
  ],
  mobile: [
    "Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Oppo", "Vivo",
    "Google Pixel", "Motorola", "Nokia", "Sony", "Asus", "LG", "HTC",
    "Huawei", "Honor", "Poco", "Infinix", "Tecno", "Lava", "Micromax", "Other"
  ],
  tablet: [
    "Apple iPad", "Samsung", "Lenovo", "Amazon Fire", "Microsoft Surface",
    "Huawei", "Xiaomi", "Oppo", "Realme", "Nokia", "Asus", "Other"
  ],
  monitor: [
    "Dell", "HP", "LG", "Samsung", "BenQ", "Asus", "Acer", "ViewSonic",
    "AOC", "Philips", "Lenovo", "MSI", "Sony", "Other"
  ],
  keyboard: [
    "Logitech", "Dell", "HP", "Microsoft", "Razer", "Corsair", "SteelSeries",
    "HyperX", "Asus ROG", "Cooler Master", "Redragon", "Zebronics", "Other"
  ],
  mouse: [
    "Logitech", "Razer", "Microsoft", "HP", "Dell", "Corsair", "SteelSeries",
    "HyperX", "Asus ROG", "Cooler Master", "Redragon", "Zebronics", "Other"
  ],
  other: ["Unknown", "Generic", "Other"]
};

const calculateEstimatedAmount = (type: string, brand: string): number => {
  const baseAmounts: Record<string, number> = {
    laptop: 2000,
    printer: 800,
    mobile: 1500,
    tablet: 1200,
    monitor: 1000,
    keyboard: 200,
    mouse: 150,
    other: 500
  };

  const brandMultipliers: Record<string, number> = {
    "Apple": 1.5,
    "Dell": 1.3,
    "HP": 1.2,
    "Samsung": 1.3,
    "Lenovo": 1.2,
    "Sony": 1.3,
    "Microsoft Surface": 1.4,
    "Other": 0.8
  };

  const baseAmount = baseAmounts[type] || 500;
  const multiplier = brandMultipliers[brand] || 1.0;
  
  return Math.round(baseAmount * multiplier);
};

const CreateOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRecycler, setSelectedRecycler] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setSelectedBrand("");
    setStep(2);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setStep(3);
  };

  const handleRecyclerSelect = (recycler: any) => {
    setSelectedRecycler(recycler);
    setStep(4);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !selectedType || !selectedBrand || !selectedRecycler) {
      toast({
        title: "Missing information",
        description: "Please complete all steps",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      // Upload image to Supabase Storage with user folder
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Validate image with AI
      setValidating(true);
      const { data: validationData, error: validationError } = await supabase.functions
        .invoke('validate-ewaste-image', {
          body: { imageUrl: publicUrl, ewasteType: selectedType }
        });

      if (validationError) throw validationError;

      const { isValid, confidence, reason } = validationData;
      
      const estimatedAmount = calculateEstimatedAmount(selectedType, selectedBrand);

      // Create order
      const { data: orderData, error: insertError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          ewaste_type: selectedType as any,
          brand: selectedBrand,
          image_url: publicUrl,
          recycler_name: selectedRecycler.name,
          recycler_address: selectedRecycler.address,
          recycler_lat: selectedRecycler.lat,
          recycler_lng: selectedRecycler.lng,
          status: (isValid ? 'validated' : 'rejected') as any,
          validation_message: `Confidence: ${confidence}%. ${reason}`,
          estimated_amount: estimatedAmount,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      if (isValid && orderData) {
        setCreatedOrderId(orderData.id);
        setStep(5); // Move to receipt step
      } else {
        toast({
          title: "Order Rejected",
          description: `Order rejected: ${reason}`,
          variant: "destructive",
        });
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setValidating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <Button 
          variant="ghost" 
          onClick={() => step === 1 ? navigate('/dashboard') : setStep(step - 1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-8">Create New Order</h1>

        {/* Step 1: Select E-waste Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select E-waste Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ewasteTypes.map((type) => (
                <Card 
                  key={type.value}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleTypeSelect(type.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <p className="font-semibold">{type.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Brand */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Brand</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandsByType[selectedType]?.map((brand) => (
                <Card 
                  key={brand}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleBrandSelect(brand)}
                >
                  <CardContent className="p-6 text-center">
                    <p className="font-semibold">{brand}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Recycler */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Nearby Recycler</h2>
            <RecyclerMap onRecyclerSelect={handleRecyclerSelect} />
          </div>
        )}

        {/* Step 4: Upload Image */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upload E-waste Image</h2>
            <Card>
              <CardHeader>
                <CardTitle>Upload photo of your {selectedBrand} {selectedType}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded" />
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-muted-foreground">Click to upload or drag and drop</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outline" className="mt-4" asChild>
                        <span>Choose Image</span>
                      </Button>
                    </label>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={!imageFile || uploading}
                    className="w-full"
                    size="lg"
                  >
                    {uploading || validating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {validating ? "Validating..." : "Uploading..."}
                      </>
                    ) : (
                      "Submit Order"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Order Receipt */}
        {step === 5 && createdOrderId && (
          <div>
            <OrderReceipt orderId={createdOrderId} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CreateOrder;