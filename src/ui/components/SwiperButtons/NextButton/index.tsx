import { ChevronRight } from "@mui/icons-material";
import { useSwiper } from "swiper/react";
import { Button } from "./styles";

interface Props {
    disabled: boolean;
}

export function NextButton({disabled}: Props) {
    const swiper = useSwiper();
    
    return (
        <Button disabled={disabled} variant="contained" onClick={() => swiper.slideNext()} aria-label="Next Button">
            <ChevronRight />
        </Button>
    );
}