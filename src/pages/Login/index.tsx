import React, { useContext } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { FaLock, FaUser } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

import Header from "../Template/Header";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
	let history = useHistory();

	const { currentLogged, signIn } = useContext(AuthContext);

	function redirectIfLogged() {
		if (currentLogged) {
			history.push("/autores");
		}
	}

	redirectIfLogged();

	const handleSubmit = (values: any) => {
		signIn({ username: values.username, password: values.password });
		redirectIfLogged();
	};

	return (
		<>
			<Header />
			<section id="login-page" className="container">
				<Row gutter={24}>
					<Col
						xs={{ span: 12, offset: 6 }}
						md={{ span: 8, offset: 8 }}
					>
						<Form name="signinForm" onFinish={handleSubmit}>
							<Row className="signinInfo">
								<Col span={24} style={{ textAlign: "center" }}>
									<h1>Entrar</h1>
								</Col>
							</Row>

							<Row>
								<Col span={24}>
									<Form.Item
										name="username"
										rules={[
											{
												required: true,
												message:
													"Please input your Username!",
											},
										]}
									>
										<Input
											prefix={<FaUser />}
											placeholder="Username"
										/>
									</Form.Item>
									<Form.Item
										name="password"
										rules={[
											{
												required: true,
												message:
													"Please input your Password!",
											},
										]}
									>
										<Input
											prefix={<FaLock />}
											type="password"
											placeholder="Password"
										/>
									</Form.Item>
								</Col>
							</Row>

							<Form.Item style={{ textAlign: "center" }}>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
								>
									Entrar
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</section>
		</>
	);
};

export default Login;
