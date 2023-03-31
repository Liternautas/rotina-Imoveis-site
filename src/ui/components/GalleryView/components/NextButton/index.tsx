import { useEffect } from "react";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useSwiper } from "swiper/react";
import { Button } from "./styles";

interface Props {
    disabled: boolean;
}

export function NextButton({disabled}: Props) {
    const swiper = useSwiper();
    
    return (
        <Button disabled={disabled} onClick={() => swiper.slideNext()}>
            <ChevronRightOutlined />
        </Button>
    );
}