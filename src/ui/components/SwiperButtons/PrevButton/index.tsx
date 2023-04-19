import { ChevronLeft } from "@mui/icons-material";
import { useSwiper } from "swiper/react";
import { Button } from "./styles";

interface Props {
    disabled: boolean;
}

export function PrevButton({disabled}: Props) {
    const swiper = useSwiper();
    return (
        <Button disabled={disabled || swiper.isLocked} variant="contained" onClick={() => swiper.slidePrev()} aria-label="Prev Button">
            <ChevronLeft />
        </Button>
    );
}