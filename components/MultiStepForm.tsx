"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Step1MealName from "./Step1MealName";
import Step2ReceiptUpload from "./Step2ReceiptUpload";
import Step3FoodItems from "./Step3FoodItems";
import Step4Participants from "./Step4Participants";

const steps = ["Meal Name", "Receipt Upload", "Food Items", "Participants"];

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    mealName: "",
    receiptImage: null,
    foodItems: [{ item: "", price: "" }],
    tax: "",
    tip: "",
    discount: "",
    participants: ["", ""],
  });

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Convert formData to a URL-safe string
    const formDataString = encodeURIComponent(JSON.stringify(formData));
    router.push(`/result?formData=${formDataString}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1MealName formData={formData} updateFormData={updateFormData} />
        );
      case 1:
        return (
          <Step2ReceiptUpload
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <Step3FoodItems formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return (
          <Step4Participants
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="mb-4">
          <h2 className="text-xl font-semibold pt-6">{steps[currentStep]}</h2>
        </div>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
