import { theme } from "@/styles/theme";
import { WhatsApp } from "@mui/icons-material";

export function ButtonWhatsapp() {
    return (
        <a href="https://api.whatsapp.com/send?phone=5564984230113" target="_blank" style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 40,
            background: theme.palette.secondary.main,
            color: '#fff',
            borderRadius: 20
        }}>
            <WhatsApp />
        </a>
    )
}