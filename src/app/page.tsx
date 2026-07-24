// import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/Card";
// import HeroSection from "@/components/sections/HeroSection";
// import InsightFlow from "@/components/sections/InsightFlow";
// import DashboardPreview from "@/components/sections/DashboardPreview";
// import SignatureMoment from "@/components/sections/SignatureMoment";

export default function Home() {
  return (
    <main className=" max-w-7xl mx-auto">
      {/* <HeroSection />
      <InsightFlow />
      <DashboardPreview />
      <SignatureMoment /> */}

      <section className="py-20 px-8 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" hoverable>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Active this month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">12.5K</p>
            </CardContent>
          </Card>

          <Card variant="glow" hoverable>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>This quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">$48.2K</p>
            </CardContent>
          </Card>

          <Card variant="bordered" hoverable>
            <CardHeader>
              <CardTitle>Growth</CardTitle>
              <CardDescription>Month over month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-text-primary">+23.5%</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
