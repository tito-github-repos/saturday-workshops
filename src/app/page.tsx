import HeroSection from "@/app/components/HeroSection";
import GetInTouch from "./components/contact";
import CoursesOffered from "./components/CoursesOffered";
import FormBooking from "./components/formbooking";
import MentalCalisthenics from "./components/MentalCalisthenics";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CoursesOffered />
      <MentalCalisthenics />
      <div id="appointment-form">
        <FormBooking />
      </div>
      <GetInTouch />
    </>
  );
}