// import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/Card";
import HeroSection from "../components/sections/HeroSection";
import InsightFlow from "../components/sections/InsightFlow";
import DashboardPreview from "../components/sections/DashboardPreview";
import SignatureMoment from "../components/sections/SignatureMoment";
// import HeroSection from "@/components/sections/HeroSection";
// import InsightFlow from "@/components/sections/InsightFlow";
// import DashboardPreview from "@/components/sections/DashboardPreview";
// import SignatureMoment from "@/components/sections/SignatureMoment";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InsightFlow />
      <DashboardPreview />
      <SignatureMoment />
    </>
  );
}
