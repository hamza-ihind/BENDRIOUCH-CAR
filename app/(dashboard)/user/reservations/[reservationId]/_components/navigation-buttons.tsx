import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  selectedCar: any; // You can refine this type as needed
}

const NavigationButtons = ({
  currentStep,
  goToNextStep,
  goToPreviousStep,
  selectedCar,
}: NavigationButtonsProps) => {
  return (
    <div className="mt-8 flex justify-between w-full">
      {currentStep > 1 && (
        <Button variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
      )}
      {currentStep < 3 && (
        <Button
          variant="default"
          onClick={goToNextStep}
          disabled={currentStep === 1 && !selectedCar} // Disable next until car is selected
        >
          {currentStep === 3 ? "Confirmer" : "Suivant"}
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
