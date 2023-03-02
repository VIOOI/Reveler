import { createEffect, createSignal, onMount, splitProps, VoidComponent } from "solid-js";
import { useUnit } from "effector-solid";

import { $currentRowSlide, $currentSlide } from "@organisms/slider/store";
import { $optBackground, $optTextColor } from "@organisms/slider/options";

import { addedAnimationClass, findAttribute, setAnimation, runScript, startScript, setAnimationOnes } from "./utils";

export type SlideProps = {
	slide: RSlide,
	rowCount: number,
	slideCount: number,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ slide ] = splitProps(props, [ "slide", "rowCount", "slideCount" ]);
	const [ cRow, cSlide ] = useUnit([ $currentSlide, $currentRowSlide ]);
	const options = useUnit({ 
		background: $optBackground,
		text: $optTextColor,
	});

	const [ isRScript, setIsRScript ] = createSignal<Array<boolean>>([]);
	const [ isRAnim, setIsRAnim ] = createSignal<Array<boolean>>([]);
	const [ isOnes, setIsOnes ] = createSignal(false);

	let slideRef: HTMLDivElement;

	onMount(() => {
		startScript(slide, isRScript, setIsRScript);
		addedAnimationClass(slideRef, isRAnim, setIsRAnim, [ "animate", "animate\\.on" ]);
	});

	createEffect(() => { setAnimationOnes(slideRef, cRow, cSlide, slide, isRAnim, setIsRAnim); });
	createEffect(() => { setAnimation(slideRef, cRow, cSlide, slide, isOnes, setIsOnes); });
	createEffect(() => { runScript(cRow, cSlide, slide, isRScript, setIsRScript); });

	return ( 
		<div
			class={`${findAttribute("class", slide.slide) || ""} min-w-screen h-screen p-0`} 
			id="slide"
			ref={slideRef}
			style={{
				background: findAttribute("background", slide.slide) || options.background(),
				color: findAttribute("text", slide.slide) || options.text(),
			}}
			innerHTML={slide.slide.content}
		>
		</div>
	);
};
