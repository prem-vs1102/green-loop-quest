import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2, CalendarIcon, Clock } from "lucide-react";
import RecyclerMap from "@/components/RecyclerMap";
import OrderReceipt from "@/components/OrderReceipt";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const PICKUP_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
];

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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [pickupSlot, setPickupSlot] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState<string>("");

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
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 2 images
    const selectedFiles = files.slice(0, 2);
    
    if (files.length > 2) {
      toast({
        title: "Too many images",
        description: "Maximum 2 images allowed. Only the first 2 will be used.",
        variant: "destructive",
      });
    }

    setImageFiles(selectedFiles);

    // Generate previews
    const previews: string[] = [];
    let loadedCount = 0;

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        loadedCount++;
        
        if (loadedCount === selectedFiles.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (imageFiles.length === 0 || !selectedType || !selectedBrand || !selectedRecycler || !pickupDate || !pickupSlot) {
      toast({
        title: "Missing information",
        description: "Please complete all steps including pickup scheduling and upload at least 1 image",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(5);
    setProgressLabel("Preparing upload...");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      // Upload all images to Supabase Storage with user folder
      const uploadedUrls: string[] = [];
      const uploadShare = 60; // % of progress dedicated to uploads
      
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}_${i}.${fileExt}`;
        
        setProgressLabel(`Uploading image ${i + 1} of ${imageFiles.length}...`);
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        uploadedUrls.push(publicUrl);
        setProgress(10 + Math.round(((i + 1) / imageFiles.length) * uploadShare));
      }

      // Validate images with AI
      setValidating(true);
      setProgressLabel("AI is analyzing your images...");
      setProgress(75);
      const { data: validationData, error: validationError } = await supabase.functions
        .invoke('validate-ewaste-image', {
          body: { 
            imageUrls: uploadedUrls, 
            ewasteType: selectedType,
            selectedBrand: selectedBrand
          }
        });

      if (validationError) throw validationError;
      setProgress(90);
      setProgressLabel("Finalizing your order...");

      const { isValid, confidence, reason, detectedBrand } = validationData;
      
      const estimatedAmount = calculateEstimatedAmount(selectedType, selectedBrand);

      // Create order
      const { data: orderData, error: insertError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          ewaste_type: selectedType as any,
          brand: selectedBrand,
          image_url: uploadedUrls[0],
          recycler_name: selectedRecycler.name,
          recycler_address: selectedRecycler.address,
          recycler_lat: selectedRecycler.lat,
          recycler_lng: selectedRecycler.lng,
          status: (isValid ? 'scheduled' : 'rejected') as any,
          validation_message: `Confidence: ${confidence}%. ${reason}. Detected brand: ${detectedBrand || 'unknown'}`,
          estimated_amount: estimatedAmount,
          pickup_date: format(pickupDate, 'yyyy-MM-dd'),
          pickup_time_slot: pickupSlot,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setProgress(100);
      setProgressLabel("Done!");

      if (isValid && orderData) {
        setCreatedOrderId(orderData.id);
        setStep(6); // Move to receipt step
      } else {
        toast({
          title: "Order Rejected",
          description: `${reason}${detectedBrand ? ` (Detected: ${detectedBrand})` : ''}`,
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
      setProgress(0);
      setProgressLabel("");
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

        {/* Step 4: Schedule Pickup */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Schedule Pickup</h2>
            <Card>
              <CardHeader>
                <CardTitle>Choose a date and time slot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> Pickup Date
                  </p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full md:w-[280px] justify-start text-left font-normal",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const max = new Date();
                          max.setDate(max.getDate() + 30);
                          return date < today || date > max;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Time Slot
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {PICKUP_SLOTS.map((slot) => (
                      <Card
                        key={slot}
                        onClick={() => setPickupSlot(slot)}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          pickupSlot === slot && "border-primary border-2 bg-primary/5"
                        )}
                      >
                        <CardContent className="p-4 text-center font-medium">
                          {slot}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  disabled={!pickupDate || !pickupSlot}
                  onClick={() => setStep(5)}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Upload Image */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upload E-waste Image</h2>
            <Card>
              <CardHeader>
                <CardTitle>Upload photo of your {selectedBrand} {selectedType}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {imagePreviews.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {imagePreviews.map((preview, idx) => (
                          <img 
                            key={idx} 
                            src={preview} 
                            alt={`Preview ${idx + 1}`} 
                            className="max-h-64 mx-auto rounded" 
                          />
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Upload 1-2 images of your {selectedBrand} {selectedType}</p>
                        <p className="text-xs text-muted-foreground mt-2">Multiple angles help with validation</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outline" className="mt-4" asChild>
                        <span>{imagePreviews.length > 0 ? "Change Images" : "Choose Images (Max 2)"}</span>
                      </Button>
                    </label>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={imageFiles.length === 0 || uploading}
                    className="w-full"
                    size="lg"
                  >
                    {uploading || validating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {validating ? "AI Validating Images..." : "Uploading..."}
                      </>
                    ) : (
                      "Submit Order"
                    )}
                  </Button>

                  {(uploading || validating || progress > 0) && (
                    <div className="space-y-2 animate-fade-in">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">{progressLabel}</span>
                        <span className="font-semibold text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 6: Order Receipt */}
        {step === 6 && createdOrderId && (
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