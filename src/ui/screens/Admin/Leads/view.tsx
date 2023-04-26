import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import { Box, Container, Typography, Button } from "@mui/material";
import { ILead } from "@/src/interfaces";
import { CardPropertyTable } from "@/src/ui/components/Cards/CardPropertyTable";
import { ArrowBack } from "@mui/icons-material";

interface Props {
    lead: ILead;
}

export function LeadView({ lead }: Props) {
    const router = useRouter();
    const [time, setTime] = useState<Date>();

    useEffect(() => {
        const time = new Date(lead.time);
        time.setHours(time.getHours() + 4);
        setTime(time);
    }, []);

    return (
        <Box sx={{
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Box sx={{ mb: 3, width: 400, display: "flex", gap: .5, alignItems: 'center' }}>
                    <Button onClick={() => router.push('/admin/leads')}>
                        <ArrowBack sx={{
                            fontSize: 16,
                            marginRight: 1
                        }} /> Lead detalhes
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <CardPropertyTable property={lead.property} />
                    {lead.name &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 600
                            }}>Nome</Typography>
                            <Typography variant="subtitle2">{lead.name}</Typography>
                        </Box>
                    }
                    {lead.phone &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 600
                            }}>Telefone</Typography>
                            <Typography variant="subtitle2">{lead.phone}</Typography>
                        </Box>
                    }
                    {lead.email &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 600
                            }}>Email</Typography>
                            <Typography variant="subtitle2">{lead.email}</Typography>
                        </Box>
                    }
                    {lead.message &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 600
                            }}>Mensagem</Typography>
                            <Typography variant="subtitle2">{lead.message}</Typography>
                        </Box>
                    }
                    {lead.type &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 600
                            }}>Tipo de lead</Typography>
                            <Typography variant="subtitle2">{lead.type}</Typography>
                        </Box>
                    }
                    {lead.date && lead.time && lead.type === 'visita' &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 600
                            }}>Data da visita</Typography>
                            <Typography variant="subtitle2">{new Date(lead.date).toLocaleDateString()} - {time?.toLocaleTimeString()}</Typography>
                        </Box>
                    }
                </Box>
            </Container>
        </Box>
    )
}