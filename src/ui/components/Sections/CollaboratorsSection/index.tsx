import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { Subtitle, Title } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { SwiperButtons } from "../../SwiperButtons";
import { IBanner, IUser } from "@/src/interfaces";
import { getImageUrl } from "@/src/helpers/functions";
import { roles } from "../../modals/ModalAddUser";

const CardRealtor = dynamic(() => import('../../Cards/CardRealtor'), {
    loading: () => null,
});

interface Props {
    realtors: IUser[];
}

export function CollaboratorsSection({ realtors }: Props) {
    const [state, setState] = useState('start');
    const [results, setResults] = useState<IUser[]>([]);

    useEffect(() => {
        if (realtors) {
            setResults(realtors.sort(function (a, b) {
                const roles = ['admin', 'realtor', 'collaborator'];
                const indexA = roles.indexOf(a.role);
                const indexB = roles.indexOf(b.role);
                return indexA - indexB;
            }));
        }
    }, []);

    return (
        <Box
            sx={{
                py: 3
            }}
            component={'section'}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Title variant="h2">Nossa equipe</Title>
                <Subtitle variant="subtitle1">Conheça nossa equipe de pessoas dedicadas a encontrar a melhor solução para suas necessidades imobiliárias.</Subtitle>
            </Box>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
                id={styles.swiper}
                onSlideChange={(swiper) => {
                    { swiper.isBeginning && setState('start') }
                    { swiper.isEnd && setState('end') }
                    { !swiper.isBeginning && !swiper.isEnd && setState('progress') }
                }}
            >
                {results?.map(user => user.role != 'super_admin' && (
                    <SwiperSlide className={styles.swiperSlide}>
                        <CardRealtor
                            image={getImageUrl(user.avatar)}
                            title={user.name}
                            subtitle={roles.find(item => item.enum === user.role).name}
                            link={`/nossa-equipe?pickup=${user.id}&adType=venda`}
                            creci={user?.creci}
                        />
                    </SwiperSlide>
                ))}
                <SwiperButtons state={state} />
            </Swiper>
        </Box>
    )
}

export default CollaboratorsSection;