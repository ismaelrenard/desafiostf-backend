import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

import {
	Image,
	message,
	Form,
	Input,
	Typography,
	DatePicker,
	Button,
	Row,
	Col,
	Card,
} from "antd";

//import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import Header from "../Template/Header";
import api from "../../services/api";

const { Title, Paragraph } = Typography;

interface Obra {
	id: number;
	nome: string;
	descricao: string;
	imagem: string;
	dataExposicao: string;
	dataPublicacao: string;
	content: Obra[];
}

const Obras: React.FC = () => {
	let history = useHistory();
	const [form] = Form.useForm();
	const { currentLogged } = useContext(AuthContext);

	function redirectNoAuth() {
		if (!currentLogged) {
			history.push("/login");
		}
	}

	redirectNoAuth();

	function disabledDate(current: any) {
		return current && current > moment();
	}

	const [obras, obrasSet] = useState<Obra[]>([]);

	const handleDelete = async (id: number) => {
		try {
			await api.delete("/obras/" + id, {
				auth: {
					username: "ismael",
					password: "renard",
				},
			});

			loadObras();

			message.success("Obra removida com sucesso!");
		} catch (error) {
			message.error(error.response.data.message);
		}
	};

	const handleSubmit = async (values: Obra) => {
		const {
			nome,
			descricao,
			imagem,
			dataExposicao,
			dataPublicacao,
		} = values;
		try {
			const obra = await api.post(
				"/obras",
				{
					nome,
					descricao,
					imagem,
					dataExposicao: moment(dataExposicao).format(
						"YYYY-MM-DDTHH:mm:ss[Z]"
					),
					dataPublicacao: moment(dataPublicacao).format(
						"YYYY-MM-DDTHH:mm:ss[Z]"
					),
				},
				{
					auth: {
						username: "ismael",
						password: "renard",
					},
				}
			);

			loadObras();

			form.resetFields();

			message.success("Obra cadastrada com sucesso!");
		} catch (error) {
			if (error.response?.data.message !== undefined) {
				message.error(error.response?.data.message);
			} else {
				const errors = error.response.data;
				errors.map((err: any) => {
					message.error(err.error);
				});
			}
		}
	};

	async function loadObras(): Promise<void> {
		const listObras = await api.get<any>(
			"/obras?pagina=0&limit=20&search=",
			{
				auth: {
					username: "ismael",
					password: "renard",
				},
			}
		);
		obrasSet(listObras?.data.content);
	}

	useEffect(() => {
		loadObras();
	}, []);

	return (
		<>
			<Header />
			<section id="form-insert" className="container">
				<Form
					name="signinForm"
					form={form}
					onFinish={handleSubmit}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
					layout="horizontal"
					size="large"
				>
					<Row>
						<Col span={24} style={{ textAlign: "center" }}>
							<Title level={3}>
								Informe abaixo os dados do autor
							</Title>
						</Col>
					</Row>

					<Row>
						<Col span={24}>
							<Form.Item
								label="Nome da Obra"
								name="nome"
								rules={[
									{
										required: true,
										message:
											"Por favor, informe o nome da obra!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Imagem da Obra (URL)"
								name="imagem"
								rules={[
									{
										required: true,
										message:
											"Por favor, informe a URL da imagem da obra!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="dataPublicacao"
								label="Data de publicação"
								rules={[
									{
										required: true,
										message:
											"Informe a data de publicação!",
									},
								]}
							>
								<DatePicker
									format="DD/MM/YYYY"
									disabledDate={disabledDate}
								/>
							</Form.Item>
							<Form.Item
								name="dataExposicao"
								label="Data de exposição"
								rules={[
									{
										required: true,
										message: "Informe a data de exposição!",
									},
								]}
							>
								<DatePicker
									format="DD/MM/YYYY"
									disabledDate={disabledDate}
								/>
							</Form.Item>
							<Form.Item
								label="Descrição"
								name="descricao"
								rules={[
									{
										required: true,
										message:
											"Por favor, informe a descrição da obra!",
									},
								]}
							>
								<Input.TextArea />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[24, 24]}>
						<Col span={24}>
							<Form.Item style={{ textAlign: "center" }}>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
								>
									Cadastrar
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</section>
			<section id="list-obras" className="container">
				{obras.length ? (
					<Row gutter={[16, 16]}>
						{obras.map((obra) => (
							<Col key={obra.id} xs={24} sm={12} md={8}>
								<Card title={obra.nome}>
									<Paragraph style={{ textAlign: "center" }}>
										<Image width={200} src={obra.imagem} />
									</Paragraph>
									<Paragraph>
										Descrição: {obra.descricao}
									</Paragraph>
									<Paragraph>
										Data de publicação:{" "}
										{moment(obra.dataPublicacao).format(
											"DD/MM/YYYY"
										)}
									</Paragraph>
									<Paragraph>
										Data de exposição:{" "}
										{moment(obra.dataExposicao).format(
											"DD/MM/YYYY"
										)}
									</Paragraph>
									<Button
										onClick={() => handleDelete(obra.id)}
										type="primary"
										danger
										shape="circle"
										icon={<DeleteOutlined />}
									/>
								</Card>
							</Col>
						))}
					</Row>
				) : (
					""
				)}
			</section>
		</>
	);
};

export default Obras;
