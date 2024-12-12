"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Car, Reservation } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Form schema for car selection
const formSchema = z.object({
  carId: z.string().min(1, {
    message: "Car selection is required",
  }),
});

export const CarForm = ({
  initialData,
  reservationId,
}: {
  initialData: Reservation;
  reservationId: string;
}) => {
  const router = useRouter();

  // State to hold car list, selected carId, and selected car's details
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(
    initialData?.carId || null
  );
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); // New state to store selected car
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carId: initialData?.carId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/cars");
        setCars(response.data);

        if (initialData?.carId) {
          const selectedCar = response.data.find(
            (car: Car) => car.id === initialData.carId
          );
          setSelectedCar(selectedCar || null);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [initialData?.carId]);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/reservations/user/${reservationId}`, values);
      toast.success("Reservation updated successfully");
      router.refresh();
      onClose(); // Close the modal after submitting
    } catch (error) {
      toast.error("An error occurred while updating the reservation");
    }
  };

  // Handle car selection change
  const handleCarSelection = (carId: string) => {
    form.setValue("carId", carId);
    setSelectedCarId(carId);
    const car = cars.find((car) => car.id === carId);
    setSelectedCar(car || null); // Update the selected car details
  };

  // Handle modal close
  const onClose = () => {
    setIsModalOpen(false);
  };

  // Handle modal open
  const onOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-[720px] flex items-start justify-between">
      {selectedCar && (
        <div className="w-full h-full flex items-start mt-4 mb-4">
          <Image
            src={selectedCar.imageUrl || ""}
            alt={selectedCar.name || ""}
            width={420}
            height={50}
            className="w-40 h-28 object-cover rounded-md mr-4"
          />
          <div className="h-full flex flex-col justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{selectedCar.name}</h3>
              <p className="text-sm text-gray-500">{selectedCar.model}</p>
            </div>
            <Badge className="mt-6 w-fit">{selectedCar.transmission}</Badge>
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={onOpen}>Select Car</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Car</DialogTitle>
            <DialogDescription>
              Choose a car for your reservation.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="carId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl">Car Selection</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={handleCarSelection}
                        value={selectedCarId || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Car" />
                        </SelectTrigger>
                        <SelectContent>
                          {cars.map((car) => (
                            <SelectItem key={car.id} value={car.id}>
                              {car.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Select
                </Button>
                <Button onClick={onClose}>Close</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
