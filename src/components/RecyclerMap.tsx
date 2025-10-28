import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation } from "lucide-react";

// Mumbai-based e-waste recyclers
const recyclers = [
  {
    id: 1,
    name: "EcoRecycle Mumbai",
    address: "Andheri East, Mumbai, Maharashtra 400069",
    phone: "+91 22 2673 1234",
    lat: 19.1136,
    lng: 72.8697,
  },
  {
    id: 2,
    name: "Green E-Waste Solutions",
    address: "Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 22 2640 5678",
    lat: 19.0596,
    lng: 72.8295,
  },
  {
    id: 3,
    name: "Mumbai Recycling Hub",
    address: "Powai, Mumbai, Maharashtra 400076",
    phone: "+91 22 2570 9012",
    lat: 19.1197,
    lng: 72.9059,
  },
  {
    id: 4,
    name: "TechCycle India",
    address: "Goregaon West, Mumbai, Maharashtra 400062",
    phone: "+91 22 2876 3456",
    lat: 19.1663,
    lng: 72.8526,
  },
  {
    id: 5,
    name: "Urban E-Waste Center",
    address: "Malad West, Mumbai, Maharashtra 400064",
    phone: "+91 22 2881 7890",
    lat: 19.1864,
    lng: 72.8485,
  },
  {
    id: 6,
    name: "Clean Earth Recyclers",
    address: "Vile Parle East, Mumbai, Maharashtra 400057",
    phone: "+91 22 2612 2345",
    lat: 19.0990,
    lng: 72.8560,
  },
];

interface RecyclerMapProps {
  onRecyclerSelect: (recycler: any) => void;
}

const RecyclerMap = ({ onRecyclerSelect }: RecyclerMapProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (recycler: any) => {
    setSelectedId(recycler.id);
    onRecyclerSelect(recycler);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {recyclers.map((recycler) => (
          <Card 
            key={recycler.id}
            className={`cursor-pointer transition-all ${
              selectedId === recycler.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleSelect(recycler)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{recycler.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{recycler.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{recycler.phone}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${recycler.lat},${recycler.lng}`,
                      '_blank'
                    );
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecyclerMap;