import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu } from "antd";

const Header: React.FC = () => {
	return (
		<header>
			<Row justify="space-around" align="middle">
				<Col sm={6}></Col>
				<Col lg={12}>
					<Menu mode="horizontal">
						<Menu.Item key={0}>
							<Link to="/autores">Autores</Link>
						</Menu.Item>
						<Menu.Item key={1}>
							<Link to="/obras">Obras</Link>
						</Menu.Item>
					</Menu>
				</Col>
				<Col sm={6}></Col>
			</Row>
		</header>
	);
};

export default Header;
