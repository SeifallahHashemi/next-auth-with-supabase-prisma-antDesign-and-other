import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import SignUpForm from "@/components/forms/sign-up-form";
import SignIn from "@/components/forms/sign-in";

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <h1>Home</h1>
    </ConfigProvider>
  );
}
