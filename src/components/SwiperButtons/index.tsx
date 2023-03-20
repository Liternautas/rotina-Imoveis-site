import { NextButton } from "./NextButton";
import { PrevButton } from "./PrevButton";
import { ButtonGroup } from "./styles";

export function SwiperButtons({ state }) {
    return (
        <ButtonGroup>
            <PrevButton disabled={state === 'start' && true} />
            <NextButton disabled={state === 'end' && true} />
        </ButtonGroup>
    )
}