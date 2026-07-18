import { useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-surface dark:bg-surfaceDark">
      <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-5">
        <Sprout size={34} className="text-primary" />
      </div>
      <h1 className="font-display text-2xl font-semibold">This field is empty</h1>
      <p className="text-sm text-ink/55 dark:text-white/55 mt-2 max-w-xs">
        We couldn't find the page you're looking for. Let's get you back to fresh produce.
      </p>
      <Button className="mt-6" onClick={() => navigate("/")}>Back to home</Button>
    </div>
  );
}
