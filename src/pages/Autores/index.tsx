import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

import {
	message,
	Form,
	Input,
	Select,
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

interface Autor {
	id: number;
	nome: string;
	sexo: string;
	email: string;
	dataNascimento: string;
	paisOrigem: string;
	cpf: string;
	obras?: {
		id: number;
		nome: string;
		dataExposicao: string;
		dataPublicacao: string;
		descricao: string;
		imagem: string;
	};
}

const Autores: React.FC = () => {
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

	const [showCpf, showCpfResults] = useState(false);
	const [autores, autoresSet] = useState<Autor[]>([]);

	const handleDelete = async (idAutor: number) => {
		try {
			await api.delete("/autores/" + idAutor, {
				auth: {
					username: "ismael",
					password: "renard",
				},
			});

			loadAutores();

			message.success("Autor removido com sucesso!");
		} catch (error) {
			message.error(error.response.data.message);
		}
	};

	const handleSubmit = async (values: Autor) => {
		const { nome, sexo, email, dataNascimento, paisOrigem, cpf } = values;

		try {
			await api.post(
				"/autores",
				{
					nome,
					sexo,
					email,
					dataNascimento: moment(dataNascimento).format("YYYY-MM-DD"),
					paisOrigem,
					cpf,
				},
				{
					auth: {
						username: "ismael",
						password: "renard",
					},
				}
			);

			loadAutores();

			form.resetFields();

			message.success("Autor cadastrado com sucesso!");
		} catch (error) {
			if (error.response?.data.message !== undefined) {
				message.error(error.response?.data.message);
			} else {
				const errors = error.response?.data;
				errors.forEach((err: any) => {
					message.error(err.error);
				});
			}
		}
	};

	function checkCountry(e: React.FormEvent<HTMLInputElement>) {
		if (e.currentTarget.value === "Brasil") {
			showCpfResults(true);
		} else {
			showCpfResults(false);
		}
	}

	async function loadAutores(): Promise<void> {
		const listAutores = await api.get<Autor[]>("/autores", {
			auth: {
				username: "ismael",
				password: "renard",
			},
		});

		autoresSet(listAutores?.data);
	}

	useEffect(() => {
		loadAutores();
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
								label="Nome do Autor"
								name="nome"
								rules={[
									{
										required: true,
										message:
											"Por favor, informe o nome do autor!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="sexo"
								label="Sexo"
								rules={[
									{
										required: true,
										message: "Informe o sexo do autor!",
									},
								]}
							>
								<Select>
									<Select.Option value="Feminino">
										Feminino
									</Select.Option>
									<Select.Option value="Masculino">
										Masculino
									</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item label="E-mail" name="email">
								<Input type="email" />
							</Form.Item>
							<Form.Item
								name="dataNascimento"
								label="Data de nascimento"
								rules={[
									{
										required: true,
										message:
											"Informe a data de nascimento!",
									},
								]}
							>
								<DatePicker
									format="DD/MM/YYYY"
									disabledDate={disabledDate}
								/>
							</Form.Item>
							<Form.Item
								label="País de Origem"
								name="paisOrigem"
								rules={[
									{
										required: true,
										message:
											"Por favor, informe o país de origem do autor!",
									},
								]}
							>
								<Input onChange={checkCountry} />
							</Form.Item>
							<Form.Item
								className={showCpf ? "show" : "hide"}
								label="CPF"
								name="cpf"
							>
								<Input />
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
			<section id="list-autores" className="container">
				{autores.length ? (
					<Row gutter={[16, 16]}>
						{autores.map((autor) => (
							<Col key={autor.id} xs={24} sm={12} md={8}>
								<Card title={autor.nome}>
									<Paragraph>Sexo: {autor.sexo}</Paragraph>
									{autor.email ? (
										<Paragraph>
											E-mail: {autor.email}
										</Paragraph>
									) : (
										""
									)}
									{autor.cpf ? (
										<Paragraph>CPF: {autor.cpf}</Paragraph>
									) : (
										""
									)}
									<Paragraph>
										Data de Nascimento:{" "}
										{moment(autor.dataNascimento).format(
											"DD/MM/YYYY"
										)}
									</Paragraph>
									<Paragraph>
										País de Origem: {autor.paisOrigem}
									</Paragraph>
									<Button
										onClick={() => handleDelete(autor.id)}
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

export default Autores;
