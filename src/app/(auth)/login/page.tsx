import { LoginFormComponent } from "@/components/auth/LoginFormComponent";
import AuthPageShell from "@/components/auth/AuthPageShell";

export default function LoginPage() {
  return (
    <AuthPageShell>
      <LoginFormComponent />
    </AuthPageShell>
  );
}
