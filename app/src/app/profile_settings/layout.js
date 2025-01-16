import BackArrow from "@/app/components/profile_components/BackArrow";

export default function ProfileSettingsLayout({ children }) {
  return (
    <>
      <BackArrow></BackArrow>
      {children}
    </>
  );
}
