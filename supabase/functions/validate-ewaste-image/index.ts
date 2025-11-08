import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrls, ewasteType, selectedBrand } = await req.json();

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0 || !ewasteType || !selectedBrand) {
      throw new Error('Image URLs (array), e-waste type, and brand are required');
    }

    if (imageUrls.length > 2) {
      throw new Error('Maximum 2 images allowed');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Validating images for e-waste type:', ewasteType, 'brand:', selectedBrand);

    // Build message content array with text and multiple images
    const messageContent: any[] = [
      {
        type: 'text',
        text: `You are an advanced e-waste validation system. Analyze the provided image(s) and determine:
1. If they show a ${ewasteType}
2. If the device brand matches "${selectedBrand}"

CRITICAL INSTRUCTIONS:
- Respond with ONLY a valid JSON object (no markdown, no code blocks)
- Use this EXACT format: {"isValid": true/false, "confidence": 0-100, "reason": "brief explanation", "detectedBrand": "brand name or 'unknown'"}
- Set isValid to TRUE only if BOTH conditions are met: correct device type AND correct brand
- If brand doesn't match, set isValid to FALSE and explain the mismatch in reason
- Be strict with validation`
      }
    ];

    // Add all images to the message content array
    imageUrls.forEach((url: string) => {
      messageContent.push({
        type: 'image_url',
        image_url: { url }
      });
    });

    // Call Lovable AI for image validation
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: messageContent
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI validation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', data);

    let content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    // Remove markdown code blocks if present
    content = content.trim();
    if (content.startsWith('```json')) {
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (content.startsWith('```')) {
      content = content.replace(/```\n?/g, '');
    }
    content = content.trim();

    // Parse the JSON response
    const validation = JSON.parse(content);

    return new Response(
      JSON.stringify(validation),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in validate-ewaste-image:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});