import { RegisterFormComponent } from "@/components/auth/RegisterFormComponent";
import AuthPageShell from "@/components/auth/AuthPageShell";

export default function RegisterPage() {
  return (
    <AuthPageShell>
      <RegisterFormComponent />
    </AuthPageShell>
  );
}
