// components/Step5AllocateFoodItems.tsx
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { FormData } from "../lib/formSchema";
import { Checkbox } from "./ui/checkbox";

export default function Step5AllocateFoodItems() {
  const { control, watch, setValue } = useFormContext<FormData>();

  const foodItems = watch("stepThree.foodItems");
  const participants = watch("stepFour");

  const { fields: allocations } = useFieldArray({
    control,
    name: "stepFive",
  });

  // Use useEffect to initialize allocations
  useEffect(() => {
    if (foodItems && allocations.length !== foodItems.length) {
      const newAllocations = foodItems.map((_, index) => ({
        foodItemIndex: index,
        participantIds: [],
      }));
      setValue("stepFive", newAllocations);
    }
  }, [foodItems, allocations.length, setValue]);

  if (!foodItems || !participants) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-3">
      {foodItems.map((foodItem, foodItemIndex) => (
        <FormField
          key={foodItemIndex}
          control={control}
          name={`stepFive.${foodItemIndex}.participantIds`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">{foodItem.item}</FormLabel>
              {participants.map((participant) => (
                <FormItem
                  key={participant.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(participant.id)}
                      onCheckedChange={(checked) => {
                        const updatedIds = checked
                          ? [...(field.value || []), participant.id]
                          : (field.value || []).filter(
                              (id) => id !== participant.id
                            );
                        field.onChange(updatedIds);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {participant.name}
                  </FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
