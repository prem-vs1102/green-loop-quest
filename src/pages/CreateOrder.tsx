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

const CreateOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecycler, setSelectedRecycler] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [validating, setValidating] = useState(false);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleRecyclerSelect = (recycler: any) => {
    setSelectedRecycler(recycler);
    setStep(3);
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
    if (!imageFile || !selectedType || !selectedRecycler) {
      toast({
        title: "Missing information",
        description: "Please complete all steps",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
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

      // Create order
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      const { error: insertError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          ewaste_type: selectedType as any,
          image_url: publicUrl,
          recycler_name: selectedRecycler.name,
          recycler_address: selectedRecycler.address,
          recycler_lat: selectedRecycler.lat,
          recycler_lng: selectedRecycler.lng,
          status: (isValid ? 'validated' : 'rejected') as any,
          validation_message: `Confidence: ${confidence}%. ${reason}`,
        }]);

      if (insertError) throw insertError;

      toast({
        title: isValid ? "Order Created!" : "Order Rejected",
        description: isValid 
          ? "Your e-waste collection order has been validated and created successfully."
          : `Order rejected: ${reason}`,
        variant: isValid ? "default" : "destructive",
      });

      navigate('/dashboard');
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

        {/* Step 2: Select Recycler */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Nearby Recycler</h2>
            <RecyclerMap onRecyclerSelect={handleRecyclerSelect} />
          </div>
        )}

        {/* Step 3: Upload Image */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upload E-waste Image</h2>
            <Card>
              <CardHeader>
                <CardTitle>Take or upload a photo of your {selectedType}</CardTitle>
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
      </main>

      <Footer />
    </div>
  );
};

export default CreateOrder;