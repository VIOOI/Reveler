import { Component, JSX, splitProps } from "solid-js";

type HeaderTwoPropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLElement>

export const HeaderTwo: Component<HeaderTwoPropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<h2
			class={`${local.class} 
				fz-i1.75 
				m-y-i0.45
			`}
			style={{
				color: local.color || "#fff",
				...local.style as JSX.CSSProperties,
			}}
			{...other}
		>{ local.children }</h2>
	);
};