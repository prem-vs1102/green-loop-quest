import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

export const ReCaptcha = ({ onChange }: ReCaptchaProps) => {
  // Note: Replace with your actual reCAPTCHA site key
  // Get this from https://www.google.com/recaptcha/admin
  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // This is a TEST key
  
  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={onChange}
        theme="light"
      />
    </div>
  );
};
