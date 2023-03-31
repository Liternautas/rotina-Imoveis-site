import { useEffect } from "react";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { useSwiper } from "swiper/react";
import { Button } from "./styles";

interface Props {
    disabled: boolean;
}

export function PrevButton({disabled}: Props) {
    const swiper = useSwiper();
    return (
        <Button disabled={disabled && true} onClick={() => swiper.slidePrev()}>
            <ChevronLeftOutlined />
        </Button>
    );
}