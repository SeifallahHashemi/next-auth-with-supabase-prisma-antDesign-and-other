"use client";
import React, { useRef, useState } from "react";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import {cn, delayFn} from "@/lib/utils";
import { AtSign, Lock } from "lucide-react";
import { TSignupSchema } from "@/lib/types";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const rememberStyle: React.CSSProperties = {
    textAlign: "start",
  };
  const forgotStyle: React.CSSProperties = {
    textAlign: "end",
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const onFinish = async (values: TSignupSchema) => {
    setIsLoading(true);
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    toast.promise(delayFn, {
      loading: 'Loading...',
      success: response.ok && toast.success(data.message || "user created successfully"),
      error: !response.ok && toast.error(data.message || "something went wrong!")
    });

    if (response.ok) {
      formRef.current?.resetFields();
      setIsLoading(false);
      router.push('/sign-in', { scroll: true })
    } else {
      await new Promise((resolve) =>
          setTimeout(() => {
            formRef.current?.resetFields();
            setIsLoading(false);
          }, 1000)
      );
    }
    // if (response.ok) router.back()
  };

  return (
    <Form
      ref={formRef}
      name="sign_up"
      className={"login-form"}
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
        name="username"
        rules={[
          {
            required: true,
            message: "Please input a valid username: at least 8 character, maximum 20 characters",
            pattern: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
          },
        ]}
        hasFeedback
        // validateStatus="error"
        // help="Something breaks the rule."
        validateTrigger={"onBlur"}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
      {/*<Form.Item>
        <Row align={"stretch"} justify={"start"}>
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
      </Form.Item>*/}
      <Form.Item>
        <Row justify={"center"}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className={cn("login-form-button text-center w-full")}
              icon={<SendOutlined />}
              loading={isLoading}
              size={"large"}
              ghost
            >
              Sign Up
            </Button>
          </Col>
          {/*<Col span={6} style={forgotStyle}>
            Or <Link href="">register now!</Link>
          </Col>*/}
        </Row>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;

/*
"use client";
import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { Mail, User2 } from "lucide-react";

const SignUpForm = () => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form className={"container max-w-3xl py-2"} {...formItemLayout} >
      <Form.Item
        name={["user", "name"]}
        label="username"
        rules={[{ required: true }]}
      >
        <Input prefix={<User2 />} allowClear/>
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[{ type: "email", required: true }]}
        hasFeedback
        validateStatus="error"
        help="Something breaks the rule."
      >
        <Input prefix={<Mail />} allowClear/>
      </Form.Item>
      <Form.Item label=" " colon={false} >
        <Button type="primary" htmlType="submit" ghost>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
*/
