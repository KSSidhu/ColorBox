import React from 'react';
import './styles/Page.css';

function Page(props) {
	//Can add logic here for page transform
	return <section className="page">{props.children}</section>;
}

export default Page;
