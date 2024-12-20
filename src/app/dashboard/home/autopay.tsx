import { useUser } from "@/context/user";
import { Switch } from "@/components/ui/switch";

interface AutoPayProps {
  onAutoPayToggle: () => void;
}

export default function AutoPay({ onAutoPayToggle }: AutoPayProps) {
  const { toggle, toggleState } = useUser();

  const handleToggle = () => {
    toggle();
    onAutoPayToggle();
  };

  return (
    <div className="text-sm">
      <Switch checked={toggleState} onCheckedChange={handleToggle} className="text-sm" />
    </div>
  );
}
