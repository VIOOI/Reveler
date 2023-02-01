import { Component, JSX, splitProps } from "solid-js";

type ParagraphPropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLElement>

export const Paragraph: Component<ParagraphPropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<p
			class={`${local.class} 
				m-i1.0 
				m-y-i0.25
			`}
			style={{
				color: local.color || "#fff",
				...local.style as JSX.CSSProperties,
			}}
			{...other}
		>{ local.children }</p>
	);
};