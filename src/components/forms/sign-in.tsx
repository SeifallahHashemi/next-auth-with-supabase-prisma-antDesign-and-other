"use client";
import React, { useRef } from "react";
import { Button, Checkbox, Col, Form, FormInstance, Input, Row } from "antd";
import { AtSign, Frown, Lock } from "lucide-react";
import { LoginOutlined } from "@ant-design/icons";
import { cn, delayFn } from "@/lib/utils";
import Link from "next/link";
import { TSignInSchema } from "@/lib/types";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const formRef = useRef<FormInstance>(null);
  const rememberStyle: React.CSSProperties = {
    textAlign: "start",
  };
  const forgotStyle: React.CSSProperties = {
    textAlign: "end",
  };
  const onFinish = async (values: TSignInSchema) => {
    const userInput = {
      email: values.email,
      password: values.password,
    };
    console.log(userInput);
    signIn("credentials", { ...userInput, redirect: false }).then(
      (callback) => {
        if (callback?.error) {
          toast.error(callback.error || "Something went wrong", {
            icon: <Frown size={24} strokeWidth={1.85} />,
          });
        }
        if (!callback?.error && callback?.ok) {
          toast.success("logged in successfully");
          delayFn().then(() => {
            router.push("/user");
          });
        }
      },
    );
  };
  return (
    <div>
      <Form
        ref={formRef}
        name="login"
        // className={"login-form"}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: 600, marginInline: "auto", paddingBlock: "2rem" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input a valid gmail address",
              pattern: /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/,
            },
          ]}
          hasFeedback
          // validateStatus="error"
          // help="Something breaks the rule."
          validateFirst={"parallel"}
        >
          <Input
            prefix={<AtSign size={18} strokeWidth={1.95} />}
            placeholder="Email Address"
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message:
                "Minimum eight and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            },
          ]}
          hasFeedback
          // validateStatus="error"
          // help="Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
          validateDebounce={1000}
          // validateTrigger={["onBlur", "onSubmit"]}
        >
          <Input.Password
            prefix={<Lock size={18} strokeWidth={1.9} />}
            type="password"
            placeholder="Password"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Row align={"stretch"} justify={"space-between"}>
            <Col span={12} style={rememberStyle}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} style={forgotStyle}>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Row gutter={[0, 12]} justify={"space-between"}>
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                className={cn("login-form-button text-center w-24")}
                icon={<LoginOutlined />}
                ghost
              >
                Log in
              </Button>
            </Col>
            <Col span={6} style={forgotStyle}>
              Or <Link href={"/sign-up"}>register now!</Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
